import React from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUsers,
  FaServer,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <>
      <SectionHeader
        title="Admin Dashboard"
        subtitle="Manage tickets, users, and system performance"
        actionButton="System Settings"
      />

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard icon={<FaTicketAlt />} title="Total Tickets" value="42" />
        <StatCard icon={<FaUsers />} title="Active Users" value="128" />
        <StatCard icon={<FaServer />} title="System Status" value="Healthy" />
        <StatCard
          icon={<FaExclamationTriangle />}
          title="Critical Issues"
          value="2"
        />
      </div>

      {/* Main Content Area - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* System Status Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              System Performance
            </h3>
            <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center px-4">
                <p className="text-gray-500 mb-2">
                  Performance metrics will be connected with API data
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#00b2ef] mr-2"></div>
                    <span className="text-xs">CPU</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#0ca74f] mr-2"></div>
                    <span className="text-xs">Memory</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#e8c745] mr-2"></div>
                    <span className="text-xs">Network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Active Tickets
              </h3>
              <a href="#" className="text-[#00b2ef] text-sm hover:underline">
                View All
              </a>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full px-4 sm:px-0">
                <TicketTable />
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
    </>
  );
};

export default AdminDashboard;
