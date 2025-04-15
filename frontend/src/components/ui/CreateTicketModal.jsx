import React, { useState, useEffect } from "react";
import {
  FaTicketAlt,
  FaTasks,
  FaInfoCircle,
  FaLightbulb,
  FaChevronRight,
  FaClipboardCheck,
} from "react-icons/fa";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { createTicket } from "../../services/ticket/ticketService";
import { useAuth } from "../../context/AuthContext";
import { showSuccess, showError } from "../../utils/toast";
import BaseModal from "./BaseModal";

const CreateTicketModal = ({ open, handleClose, onSuccess }) => {
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
    { value: "low", label: "Low", color: "bg-blue-100 text-blue-800" },
    { value: "medium", label: "Medium", color: "bg-amber-100 text-amber-800" },
    { value: "high", label: "High", color: "bg-red-100 text-red-800" },
  ];

  return (
    <BaseModal
      open={open}
      handleClose={handleClose}
      title="Create Ticket"
      icon={<FaTicketAlt className="animate-pulse" />}
    >
      {success ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-5 shadow-md">
            <FaClipboardCheck className="text-green-500 w-12 h-12" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Ticket Created!
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Your ticket has been submitted successfully. Our team will review it
            shortly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form area */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start mb-5">
                  <FaInfoCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium mb-5 text-gray-800 border-b pb-3 flex items-center">
                    <FaTicketAlt className="mr-2 text-blue-500" />
                    Ticket Details
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={ticketData.title}
                        onChange={handleChange}
                        placeholder="Brief description of the issue"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 placeholder:text-gray-400 bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={ticketData.description}
                        onChange={handleChange}
                        rows="8"
                        placeholder="Provide detailed information about your issue"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 placeholder:text-gray-400 resize-none bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-4 flex items-center border-b pb-3">
                <FaTasks className="mr-2 text-blue-500" />
                Ticket Options
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {priorityOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border-2 transition-all ${
                          ticketData.priority === option.value
                            ? `${option.color} border-current`
                            : "border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={option.value}
                          checked={ticketData.priority === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <Button
                      title="Cancel"
                      onClick={handleClose}
                      buttonBg="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors w-full"
                      type="button"
                    />
                    <Button
                      title={isSubmitting ? "Submitting..." : "Create Ticket"}
                      buttonBg={`${
                        isSubmitting ? "bg-[#00b2ef]/70" : "bg-[#00b2ef]"
                      } text-white hover:bg-[#00b2ef]/90 transition-colors w-full`}
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm">
              <h4 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                <FaLightbulb className="mr-2 text-blue-500" />
                Tips for Fast Resolution
              </h4>
              <ul className="text-xs text-blue-700 space-y-2">
                <li className="flex items-start">
                  <FaChevronRight className="text-blue-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Be clear and specific about your issue</span>
                </li>
                <li className="flex items-start">
                  <FaChevronRight className="text-blue-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Include steps to reproduce if applicable</span>
                </li>
                <li className="flex items-start">
                  <FaChevronRight className="text-blue-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Mention any error messages you received</span>
                </li>
                <li className="flex items-start">
                  <FaChevronRight className="text-blue-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span>Set priority based on your needs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
};

export default CreateTicketModal;
