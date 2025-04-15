import React, { useState, useEffect } from "react";
import {
  FaTicketAlt,
  FaTasks,
  FaInfoCircle,
  FaLightbulb,
  FaCheck,
  FaClipboardCheck,
  FaPlus,
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
    category: "",
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
        category: "",
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
    {
      value: "low",
      label: "Low",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-300",
      ringClass: "ring-blue-500",
    },
    {
      value: "medium",
      label: "Medium",
      bgClass: "bg-amber-100",
      textClass: "text-amber-800",
      borderClass: "border-amber-300",
      ringClass: "ring-amber-500",
    },
    {
      value: "high",
      label: "High",
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      borderClass: "border-red-300",
      ringClass: "ring-red-500",
    },
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
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start mb-5">
                  <FaInfoCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="animate-fadeIn animation-delay-100">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={ticketData.title}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all"
                  placeholder="Enter ticket title"
                  required
                />
              </div>

              <div className="animate-fadeIn animation-delay-200">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={ticketData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all resize-none"
                  placeholder="Describe the issue in detail"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn animation-delay-300">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={ticketData.category}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="improvement">Improvement</option>
                    <option value="task">Task</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {priorityOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() =>
                          setTicketData((prev) => ({
                            ...prev,
                            priority: option.value,
                          }))
                        }
                        className={`
                          cursor-pointer rounded-lg p-3 transition-all
                          ${
                            ticketData.priority === option.value
                              ? `${option.bgClass} border ${option.borderClass} ring-2 ${option.ringClass} shadow-sm`
                              : "bg-white border border-gray-200 hover:bg-gray-50"
                          }
                          flex items-center justify-center
                        `}
                      >
                        <div className="text-center">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              ticketData.priority === option.value
                                ? option.bgClass
                                : "bg-gray-200"
                            } mx-auto mb-1`}
                          ></div>
                          <span
                            className={`text-xs font-medium capitalize ${
                              ticketData.priority === option.value
                                ? option.textClass
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 animate-fadeIn animation-delay-500">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <FaClipboardCheck size={14} />
                      <span>Create Ticket</span>
                    </>
                  )}
                </button>
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
                            ? `${option.bgClass} ${option.textClass} border-current`
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

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200 mt-5 animate-fadeIn animation-delay-600">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <FaLightbulb className="text-amber-500 mr-2" />
                Tips for a Great Ticket
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>
                    Be specific and provide clear steps to reproduce issues
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>
                    Include screenshots or error messages if available
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Set appropriate priority based on impact</span>
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
