import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;


export const getUserById = async (userId, token) => {
  try {
    const res = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; 
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
};

// aba user bose
export const getAllUsers = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

   
    return res.data.users || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};




export const updateProfile = async (userData, token) => {
  try {
    const res = await axios.put(`${API_URL}/user/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};



export const logoutUser = async () => {
  try {
    // Get token from local storage
    const token = localStorage.getItem('token');
    
    // Set authorization header with token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.post(`${API_URL}/logout`, {}, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Logout failed");
    } else {
      throw new Error("Network error during logout");
    }
  }
};