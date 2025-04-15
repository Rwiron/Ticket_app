
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/auth";

// REGISTER user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; 
  } catch (error) {
   
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



export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Network error during login");
    }
  }
};


export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "OTP verification failed");
    } else {
      throw new Error("Network error during OTP verification");
    }
  }
};


export const resendOtp = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/resend-otp`, { email });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to resend OTP");
    } else {
      throw new Error("Network error during resend");
    }
  }
};


export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to send reset link");
    } else {
      throw new Error("Network error");
    }
  }
};


export const resetPassword = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Reset failed");
    } else {
      throw new Error("Network error");
    }
  }
};







