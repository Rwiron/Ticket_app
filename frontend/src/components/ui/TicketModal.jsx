import React, { useEffect, useState } from "react";
import { getTicketById } from "../../services/ticket/ticketService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const TicketModal = ({ ticketId, isOpen, onClose }) => {
  const { token } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId, isOpen]);

  const fetchTicketDetails = async () => {
    setLoading(true);
    try {
      const data = await getTicketById(ticketId, token);
      setTicket(data);
    } catch (error) {
      toast.error("Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{ticket.description}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                Status: <strong>{ticket.status}</strong>
              </p>
              <p>
                Priority: <strong>{ticket.priority}</strong>
              </p>
              <p>
                Created:{" "}
                <strong>{new Date(ticket.created_at).toLocaleString()}</strong>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
