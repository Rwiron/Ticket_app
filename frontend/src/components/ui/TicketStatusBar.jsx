// src/components/ui/TicketStatusBar.jsx
import React, { useEffect, useState } from "react";
import { getTicketStats } from "../../services/ticket/ticketService";
import { useAuth } from "../../context/AuthContext";

const TicketStatusBar = ({ refreshTrigger }) => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    open: 0,
    in_progress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getTicketStats(token);
        setStats({
          open: res.open || 0,
          in_progress: res.in_progress || 0,
          resolved: res.resolved || 0,
        });
      } catch (err) {
        console.error("Failed to fetch ticket status:", err.message);
      }
    };

    if (token) fetchStats();
  }, [refreshTrigger, token]);

  const total = stats.open + stats.in_progress + stats.resolved || 1;

  const getPercent = (val) => ((val / total) * 100).toFixed(1) + "%";

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Ticket Status
      </h3>
      <div className="space-y-4">
        <StatusRow
          label="Open"
          value={stats.open}
          color="bg-[#00b2ef]"
          width={getPercent(stats.open)}
        />
        <StatusRow
          label="In Progress"
          value={stats.in_progress}
          color="bg-[#e8c745]"
          width={getPercent(stats.in_progress)}
        />
        <StatusRow
          label="Resolved"
          value={stats.resolved}
          color="bg-[#0ca74f]"
          width={getPercent(stats.resolved)}
        />
      </div>
    </div>
  );
};

const StatusRow = ({ label, value, color, width }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`${color} h-2 rounded-full`} style={{ width }}></div>
    </div>
  </div>
);

export default TicketStatusBar;
