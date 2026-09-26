const API_BASE_URL = "http://localhost:8080";

export const apiRequest = async (endpoint, options = {}) => {
    let token = localStorage.getItem("token");

    const makeRequest = async (accessToken) => {
        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        };

        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        return fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });
    };

    // First request
    let response = await makeRequest(token);

    // If access token is expired
    if (response.status === 401) {

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            return response;
        }

        // Ask backend for a new access token
        const refreshResponse = await fetch(
            `${API_BASE_URL}/api/auth/refresh-token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                }),
            }
        );

        if (!refreshResponse.ok) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            return response;
        }

        const refreshData = await refreshResponse.json();

        const newToken = refreshData.token;

        // Save new access token
        localStorage.setItem("token", newToken);

        // Retry original request with new token
        response = await makeRequest(newToken);
    }

    return response;
};