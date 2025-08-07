// src/api/userFormApi.js

const BASE_URL = "http://localhost:5000/api/UserForm"; // or from env

export const checkCIF = async (cif) => {
    try {
        const response = await fetch(`${BASE_URL}/check-cif?cif=${cif}`);
        if (!response.ok) throw new Error("CIF check failed");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error checking CIF:", error);
        return { exists: false }; // fallback
    }
};