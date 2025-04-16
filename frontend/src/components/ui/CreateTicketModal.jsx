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
    {
      value: "low",
      label: "Low",
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      borderClass: "border-blue-300",
      ringClass: "ring-blue-500",
      icon: <div className="h-2 w-2 rounded-full bg-blue-500"></div>,
    },
    {
      value: "medium",
      label: "Medium",
      bgClass: "bg-amber-100",
      textClass: "text-amber-800",
      borderClass: "border-amber-300",
      ringClass: "ring-amber-500",
      icon: <div className="h-2 w-2 rounded-full bg-amber-500"></div>,
    },
    {
      value: "high",
      label: "High",
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      borderClass: "border-red-300",
      ringClass: "ring-red-500",
      icon: <div className="h-2 w-2 rounded-full bg-red-500"></div>,
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
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-28 h-28 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mb-6 shadow-md">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
              <FaClipboardCheck className="text-white w-10 h-10" />
            </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form area */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start mb-5 animate-fadeIn">
                  <FaInfoCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="animate-fadeIn animation-delay-100">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={ticketData.title}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all shadow-sm"
                  placeholder="Enter ticket title"
                  required
                />
              </div>

              <div className="animate-fadeIn animation-delay-200">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={ticketData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3.5 bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all resize-none shadow-sm"
                  placeholder="Describe the issue in detail"
                  required
                ></textarea>
              </div>

              <div className="animate-fadeIn animation-delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        cursor-pointer rounded-xl p-3.5 transition-all transform hover:scale-105 duration-200
                        ${
                          ticketData.priority === option.value
                            ? `${option.bgClass} border-2 ${option.borderClass} shadow-md`
                            : "bg-gray-50/70 border border-gray-200 hover:bg-gray-100"
                        }
                        flex items-center justify-center
                      `}
                    >
                      <div className="text-center">
                        <div className="flex justify-center mb-1.5">
                          {ticketData.priority === option.value ? (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center border-2 border-current">
                              {option.icon}
                            </div>
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            ticketData.priority === option.value
                              ? option.textClass
                              : "text-gray-600"
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 animate-fadeIn animation-delay-500">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:translate-y-[-2px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <FaPlus size={14} />
                      <span>Create Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-medium mb-4 flex items-center border-b pb-3 text-gray-800">
                <FaTasks className="mr-2 text-blue-500" />
                Priority Information
              </h3>

              <div className="space-y-4">
                {priorityOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center p-3 rounded-lg ${option.bgClass} ${option.borderClass} border`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${option.textClass} bg-current mr-3`}
                    ></div>
                    <div>
                      <p className={`font-medium ${option.textClass}`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-600">
                        {option.value === "low" &&
                          "Minor issues, can be addressed later"}
                        {option.value === "medium" &&
                          "Important, should be addressed soon"}
                        {option.value === "high" &&
                          "Critical, requires immediate attention"}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between gap-3 pt-4 border-t border-gray-200 mt-4">
                  <Button
                    title="Cancel"
                    onClick={handleClose}
                    buttonBg="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-xl flex-1 shadow-sm"
                    type="button"
                  />
                  <Button
                    title={isSubmitting ? "Submitting..." : "Create"}
                    buttonBg={`${
                      isSubmitting ? "bg-[#00b2ef]/70" : "bg-[#00b2ef]"
                    } text-white hover:bg-[#00b2ef]/90 transition-colors rounded-xl flex-1 shadow-md`}
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 animate-fadeIn animation-delay-600 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="text-amber-500 mr-2" />
                Tips for a Great Ticket
              </h3>
              <ul className="text-sm text-gray-700 space-y-3">
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                    <FaCheck className="text-green-600 text-xs" />
                  </div>
                  <span>
                    Be specific and provide clear steps to reproduce issues
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                    <FaCheck className="text-green-600 text-xs" />
                  </div>
                  <span>
                    Include screenshots or error messages if available
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                    <FaCheck className="text-green-600 text-xs" />
                  </div>
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
