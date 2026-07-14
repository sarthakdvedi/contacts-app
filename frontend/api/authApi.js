import { apiClient } from "./apiClient";

export function registerUser(userData) {
    return apiClient("/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
}

export function loginUser(userData) {
    return apiClient("/users/login", {
        method: "POST",
        body: JSON.stringify(userData),
    });
}

export function getCurrentUser() {
    return apiClient("/users/current");
}