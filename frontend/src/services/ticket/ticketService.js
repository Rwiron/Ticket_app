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




// export const getTicketById = async (ticketId, token) => {
//   try {
//     const res = await axios.get(`${API_URL}/tickets/${ticketId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return res.data.ticket;
//   } catch (err) {
//     throw new Error(err.response?.data?.message || "Failed to fetch ticket details");
//   }
// };




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

export const getTicketById = async (ticketId, token) => {
  const res = await axios.get(`${API_URL}/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.ticket;
};



export const getComments = async (ticketId, token) => {
  const res = await axios.get(`${API_URL}/tickets/${ticketId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.comments;
};



export const postComment = async (ticketId, message, token) => {
  const res = await axios.post(
    `${API_URL}/tickets/${ticketId}/comments`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.comment;
};



export const getAdminTicketStats = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/admin/ticket-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    // Return the stats property directly from the response, not the entire data object
    if (res.data && res.data.stats) {
      return res.data.stats;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    console.error("Admin stats error:", err);
    if (err.response?.status === 403) {
      throw new Error("Unauthorized. You do not have permission to access admin resources.");
    }
    throw new Error(err.response?.data?.message || "Failed to fetch admin stats");
  }
};


export const getAllTickets = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/ticketing`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.tickets;
  } catch (err) {
    console.error("Error fetching tickets:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch tickets");
  }
};

export const updateTicket = async (ticketId, updateData, token) => {
  try {
    const res = await axios.put(`${API_URL}/ticketing/${ticketId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.ticket;
  } catch (err) {
    console.error("Error updating ticket:", err);
    throw new Error(err.response?.data?.message || "Failed to update ticket");
  }
};

export const deleteTicket = async (ticketId, token) => {
  try {
    const res = await axios.delete(`${API_URL}/ticketing/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting ticket:", err);
    throw new Error(err.response?.data?.message || "Failed to delete ticket");
  }
};
