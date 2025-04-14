import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const createTicket = async (ticketData, token) => {
  try {
    const res = await axios.post(`${API_URL}/tickets`, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create ticket");
  }
};


export const getMyTickets = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/my-tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.tickets || [];
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch your tickets");
  }
};




export const getTicketById = async (ticketId, token) => {
  try {
    const res = await axios.get(`${API_URL}/tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.ticket;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch ticket details");
  }
};




export const getTicketStats = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/ticket-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.stats; // return only the stats object
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch ticket stats");
  }
};
