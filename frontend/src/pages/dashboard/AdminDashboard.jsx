import React, { useState, useEffect } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";
import AdminTicketDetailModal from "../../components/ui/AdminTicketDetailModal";
import { useAuth } from "../../context/AuthContext";
import {
  getAdminTicketStats,
  getAllTickets,
} from "../../services/ticket/ticketService";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUsers,
  FaServer,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [adminStats, setAdminStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    resolved: 0,
    high_priority: 0,
    users: 0,
  });
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminTicketStats(token);
        console.log("API response:", data); // Debug log
        setAdminStats(data);
        setError(null);
      } catch (error) {
        console.error("Error loading admin stats", error);
        setError(error.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    const fetchAllTickets = async () => {
      try {
        const tickets = await getAllTickets(token);
        console.log("All tickets:", tickets); // Debug log
        setAllTickets(tickets || []);
      } catch (error) {
        console.error("Error fetching all tickets", error);
        // We won't set the main error state here to avoid hiding stats
      }
    };

    fetchStats();
    fetchAllTickets();
  }, [token]);

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTicketUpdated = (updatedTicket) => {
    // If updatedTicket is null, it means the ticket was deleted
    if (!updatedTicket) {
      // Remove the ticket from the list
      const updatedTickets = allTickets.filter(
        (ticket) => ticket.id !== selectedTicketId
      );
      setAllTickets(updatedTickets);
      setModalOpen(false);
    } else {
      // Update the ticket in the list
      const updatedTickets = allTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      );
      setAllTickets(updatedTickets);
    }

    // Refresh stats
    fetchStats();
  };

  const fetchStats = async () => {
    try {
      const data = await getAdminTicketStats(token);
      setAdminStats(data);
    } catch (error) {
      console.error("Error refreshing admin stats", error);
    }
  };

  return (
    <>
      <SectionHeader
        title="Admin Dashboard"
        subtitle="Manage tickets, users, and system performance"
        actionButton="System Settings"
      />

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          icon={<FaTicketAlt />}
          title="Total Tickets"
          value={adminStats.total?.toString() || "0"}
          loading={loading}
        />
        <StatCard
          icon={<FaUsers />}
          title="Active Users"
          value={adminStats.users?.toString() || "0"}
          loading={loading}
        />
        <StatCard
          icon={<FaClock />}
          title="In Progress"
          value={adminStats.in_progress?.toString() || "0"}
          loading={loading}
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          title="High Priority"
          value={adminStats.high_priority?.toString() || "0"}
          loading={loading}
        />
      </div>

      {/* Main Content Area - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Ticket Status Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ticket Status Overview
            </h3>
            <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center px-4 w-full">
                <p className="text-gray-500 mb-4">
                  Ticket distribution by status
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {adminStats.open || 0}
                    </div>
                    <div className="text-sm text-blue-700">Open</div>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {adminStats.in_progress || 0}
                    </div>
                    <div className="text-sm text-yellow-700">In Progress</div>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {adminStats.resolved || 0}
                    </div>
                    <div className="text-sm text-green-700">Resolved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Tickets Table */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                All Tickets
              </h3>
              <a href="#" className="text-[#00b2ef] text-sm hover:underline">
                Manage Tickets
              </a>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full px-4 sm:px-0">
                <TicketTable
                  tickets={allTickets}
                  onRowClick={handleTicketClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 sm:space-y-8">
          {/* User Activity */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Active Users
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between pb-3 border-b border-gray-100"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#00b2ef]/10 flex items-center justify-center text-[#00b2ef] mr-3">
                      <FaUsers size={12} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">User {item}</p>
                      <p className="text-xs text-gray-500">
                        Last active: 10 min ago
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Online
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-[#00b2ef] hover:underline">
              View All Users
            </button>
          </div>

          {/* System Alerts */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              System Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm font-medium text-yellow-800">
                  Scheduled Maintenance
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Tomorrow at 02:00 AM
                </p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm font-medium text-blue-800">
                  New Update Available
                </p>
                <p className="text-xs text-blue-700 mt-1">Version 2.4.0</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <p className="text-sm font-medium text-green-800">
                  Database Backup Complete
                </p>
                <p className="text-xs text-green-700 mt-1">Today at 04:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Ticket Detail Modal */}
      <AdminTicketDetailModal
        ticketId={selectedTicketId}
        open={modalOpen}
        onClose={handleCloseModal}
        onTicketUpdated={handleTicketUpdated}
      />
    </>
  );
};

export default AdminDashboard;
