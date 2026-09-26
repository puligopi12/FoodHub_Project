import { apiRequest } from "./apiClient";

const API_URL = "/api/foods";


// =====================================================
// GET ALL FOOD ITEMS
// Login is NOT required
// =====================================================

export const getAllFoods = async () => {

    const response = await apiRequest(API_URL, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch food items: ${response.status}`
        );
    }

    return await response.json();
};


// =====================================================
// GET FOOD BY ID
// Login is NOT required
// =====================================================

export const getFoodById = async (id) => {

    const response = await apiRequest(
        `${API_URL}/${id}`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Food item not found: ${response.status}`
        );
    }

    return await response.json();
};


// =====================================================
// ADD NEW FOOD
// Admin login is required
// =====================================================

export const addFood = async (food) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first.");
    }

    const response = await apiRequest(API_URL, {
        method: "POST",
        body: JSON.stringify(food),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to add food: ${response.status}`
        );
    }

    return await response.json();
};


// =====================================================
// UPDATE FOOD
// Admin login is required
// =====================================================

export const updateFood = async (id, food) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first.");
    }

    const response = await apiRequest(
        `${API_URL}/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(food),
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to update food: ${response.status}`
        );
    }

    return await response.json();
};


// =====================================================
// DELETE FOOD
// Admin login is required
// =====================================================

export const deleteFood = async (id) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first.");
    }

    const response = await apiRequest(
        `${API_URL}/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to delete food: ${response.status}`
        );
    }

    return true;
};