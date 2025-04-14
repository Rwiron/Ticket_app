// src/components/ui/ModalStyle.jsx
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaTicketAlt } from "react-icons/fa";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { createTicket } from "../../services/ticket/ticketService";
import { useAuth } from "../../context/AuthContext";
import { showSuccess, showError } from "../../utils/toast";

const ModalStyle = ({ open, handleClose, title, onSuccess }) => {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset form when modal is closed
  useEffect(() => {
    if (!open) {
      setTicketData({
        title: "",
        description: "",
        priority: "medium",
      });
      setError("");
      setSuccess(false);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validate inputs
      if (!ticketData.title.trim() || !ticketData.description.trim()) {
        setError("Title and description are required");
        setIsSubmitting(false);
        return;
      }

      // Call the API
      await createTicket(ticketData, token);
      setSuccess(true);
      showSuccess("Ticket created successfully!");

      // Call onSuccess callback if provided
      if (typeof onSuccess === "function") {
        onSuccess();
      }

      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err) {
      const errorMessage = err.message || "Failed to create ticket";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-white/30 transition-all duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl transform transition-all duration-300 p-0 overflow-hidden"
        style={{
          maxHeight: "90vh",
          transform: open ? "scale(1)" : "scale(0.95)",
          margin: "0 auto",
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient background */}
        <div className="relative p-6 bg-gradient-to-r from-[#00b2ef] to-[#0080cb] text-white">
          <h3 className="text-xl font-bold flex items-center">
            <FaTicketAlt className="mr-2 text-white animate-pulse" />
            {title || "Create Ticket"}
          </h3>
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-white hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Ticket Created!
              </h3>
              <p className="text-gray-600 text-center">
                Your ticket has been submitted successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <InputField
                label="Title"
                name="title"
                value={ticketData.title}
                onChange={handleChange}
                placeholder="Brief description of the issue"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={ticketData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Provide detailed information about your issue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b2ef] placeholder:text-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <div className="relative">
                  <select
                    name="priority"
                    value={ticketData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b2ef] bg-white appearance-none pr-10"
                  >
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  title="Cancel"
                  onClick={handleClose}
                  buttonBg="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                  type="button"
                />
                <Button
                  title={isSubmitting ? "Submitting..." : "Create Ticket"}
                  buttonBg={`${
                    isSubmitting ? "bg-[#00b2ef]/70" : "bg-[#00b2ef]"
                  } text-white hover:bg-[#00b2ef]/90 transition-colors`}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalStyle;
