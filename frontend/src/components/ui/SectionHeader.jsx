// components/dashui/SectionHeader.jsx
import React from "react";

const SectionHeader = ({ title, subtitle, actionButton }) => {
  return (
    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-500 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {actionButton && (
        <button className="px-4 py-2 bg-[#00b2ef] text-white rounded-lg hover:bg-[#00b2ef]/90 transition-colors text-sm font-medium self-start sm:self-auto whitespace-nowrap">
          {actionButton}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
