import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaTicketAlt } from "react-icons/fa";

const BaseModal = ({
  open,
  handleClose,
  title,
  children,
  icon = <FaTicketAlt />,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"></div>

      <div
        className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl transform transition-all duration-300 p-0 overflow-hidden"
        style={{
          maxHeight: "90vh",
          transform: open ? "scale(1)" : "scale(0.95)",
          margin: "0 auto",
          zIndex: 10000,
          boxShadow: "0 25px 50px -12px rgba(0, 178, 239, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient background and pattern */}
        <div className="relative p-6 bg-gradient-to-r from-[#00b2ef] to-[#0080cb] text-white overflow-hidden">
          {/* Abstract pattern overlay */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute top-10 right-20 w-12 h-12 rounded-full bg-white"></div>
            <div className="absolute bottom-0 right-10 w-20 h-20 rounded-full bg-white"></div>
          </div>

          <div className="relative">
            <h3 className="text-xl font-bold flex items-center">
              {icon && (
                <span className="mr-3 text-white bg-white/20 p-2 rounded-lg">
                  {icon}
                </span>
              )}
              {title || "Modal"}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-white hover:text-gray-200 transition-colors bg-white/20 p-1.5 rounded-lg hover:bg-white/30"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div
          className="p-6 overflow-y-auto bg-gray-50"
          style={{ maxHeight: "calc(90vh - 80px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
