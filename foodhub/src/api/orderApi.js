import { apiRequest } from "./apiClient";

const API_URL = "/api/orders";


// =====================================================
// CREATE ORDER
// =====================================================

export const createOrder = async (orderData) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login before placing an order.");
    }

    const response = await apiRequest(API_URL, {
        method: "POST",

        body: JSON.stringify(orderData),
    });

    if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
            errorText || `Failed to create order: ${response.status}`
        );
    }

    return await response.json();
};


// =====================================================
// GET MY ORDERS
// =====================================================

export const getMyOrders = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login to view your orders.");
    }

    const response = await apiRequest(
        `${API_URL}/my-orders`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
            errorText || `Failed to fetch orders: ${response.status}`
        );
    }

    return await response.json();
};