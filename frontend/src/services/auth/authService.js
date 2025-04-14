// src/services/auth/authService.js
import axios from "axios";

// Set your base URL from the .env file
const API_URL = import.meta.env.VITE_API_BASE_URL + "/auth";

// REGISTER user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // return success response
  } catch (error) {
    // If Laravel returns validation error
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error("Network error");
    }
  }
};


export const checkEmailAvailability = async (email) => {
  try {
    const res = await axios.get(`${API_URL}/check-email`, {
      params: { email }
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Email check failed");
    } else {
      throw new Error("Network error during email check");
    }
  }
};
