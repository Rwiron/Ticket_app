// components/dashui/StatCard.jsx
import React, { useState, useEffect } from "react";
import { getTicketStats } from "../../services/ticket/ticketService";
import { useAuth } from "../../context/AuthContext";

const StatCard = ({ icon, title, value, statType, refreshTrigger }) => {
  const { token } = useAuth();
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setCount(value);
      return;
    }

    if (statType && token) {
      fetchTicketStats();
    }
  }, [statType, token, value, refreshTrigger]);

  const fetchTicketStats = async () => {
    try {
      setIsLoading(true);
      const stats = await getTicketStats(token);

      const computed = {
        total: stats.total || 0,
        open: stats.open || 0,
        in_progress: stats.in_progress || 0,
        closed: stats.resolved || 0,
        resolved: stats.resolved || 0,
        pending: (stats.open || 0) + (stats.in_progress || 0),
        high_priority: stats.high_priority || 0,
      };

      setCount(computed[statType] ?? 0);
    } catch (err) {
      console.error("StatCard Error:", err);
      setCount("Err");
    } finally {
      setIsLoading(false);
    }
  };

  const borderColors = {
    total: "border-blue-500",
    open: "border-amber-500",
    closed: "border-green-500",
    resolved: "border-green-500",
    in_progress: "border-purple-500",
    pending: "border-amber-500",
    high_priority: "border-red-500",
  };

  const iconColors = {
    total: "text-blue-500",
    open: "text-amber-500",
    closed: "text-green-500",
    resolved: "text-green-500",
    in_progress: "text-purple-500",
    pending: "text-amber-500",
    high_priority: "text-red-500",
  };

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${
        borderColors[statType] || "border-blue-500"
      } hover:shadow-md transition-all`}
    >
      <div className="flex items-center gap-4">
        <div className={`${iconColors[statType] || "text-blue-500"} text-2xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          {isLoading ? (
            <div className="h-6 w-10 bg-gray-200 animate-pulse rounded mt-1" />
          ) : (
            <p className="text-xl font-bold text-gray-800">{count ?? value}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
