import React, { useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaSync,
} from "react-icons/fa";
import Button from "../../components/Button";
import TicketStatusBar from "../../components/ui/TicketStatusBar";
import DidYouKnow from "../../components/ui/DidYouKnow";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

  // Manual refresh option for dashboard data
  const handleManualRefresh = () => {
    setRefreshTrigger(Date.now());
  };

  const navigate = useNavigate();

  return (
    <>
      <SectionHeader
        title="My Tickets Dashboard"
        subtitle="Track and manage your support requests"
        actionButton="Create Ticket"
        refreshButton={
          <div className="flex items-center">
            <FaSync className="mr-2" />
            <span>Refresh Data</span>
          </div>
        }
        onRefreshClick={handleManualRefresh}
      />

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          icon={<FaTicketAlt />}
          title="My Tickets"
          statType="total"
          refreshTrigger={refreshTrigger}
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Resolved"
          statType="resolved"
          refreshTrigger={refreshTrigger}
        />
        <StatCard
          icon={<FaClock />}
          title="Pending"
          statType="pending"
          refreshTrigger={refreshTrigger}
        />
        <StatCard icon={<FaStar />} title="Satisfaction" value="92%" />
      </div>

      {/* Main Content Area - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* My Tickets */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                My Tickets
              </h3>
              <a href="#" className="text-[#00b2ef] text-sm hover:underline">
                View All
              </a>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full px-4 sm:px-0">
                <TicketTable refreshTrigger={refreshTrigger} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#00b2ef]/10 text-[#00b2ef] hover:bg-[#00b2ef]/20 transition">
                <FaTicketAlt size={24} className="mb-2" />
                <span className="text-xs font-medium">New Ticket</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#0ca74f]/10 text-[#0ca74f] hover:bg-[#0ca74f]/20 transition">
                <FaCheckCircle size={24} className="mb-2" />
                <span className="text-xs font-medium">My Resolved</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#e8c745]/10 text-[#e8c745] hover:bg-[#e8c745]/20 transition">
                <FaClock size={24} className="mb-2" />
                <span className="text-xs font-medium">Pending</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <FaStar size={24} className="mb-2" />
                <span className="text-xs font-medium">Rate Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 sm:space-y-8">
          <TicketStatusBar refreshTrigger={refreshTrigger} />

          <DidYouKnow />

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Contact our support team for assistance with your tickets.
            </p>
            <button
              onClick={() => navigate("/dashboard/contact")}
              className="w-full py-2 bg-[#00b2ef] text-white rounded-lg hover:bg-[#00b2ef]/90 transition-colors text-sm font-medium"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
