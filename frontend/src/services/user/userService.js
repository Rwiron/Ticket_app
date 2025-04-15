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
