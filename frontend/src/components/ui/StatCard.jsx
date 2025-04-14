// components/dashui/StatCard.jsx
import React from "react";

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#00b2ef] hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className="text-[#00b2ef] text-2xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
