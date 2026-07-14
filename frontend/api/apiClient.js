const BASE_URL = import.meta.env.VITE_API_URL;

//LocalStorage se token nikalne ka kaam Frontend ka hai.
//Frontend us token ko HTTP Authorization Header me daal kar backend ko request bhejta hai.

export async function apiClient(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "API request failed");
    }

    return data;
}