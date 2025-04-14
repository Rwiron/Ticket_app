import React from "react";
import DashboardLayout from "../../components/ui/DashboardLayout";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <SectionHeader
        title="Dashboard Overview"
        subtitle="Track and manage your support tickets efficiently"
        actionButton="Create Ticket"
      />

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard icon={<FaTicketAlt />} title="Total Tickets" value="24" />
        <StatCard icon={<FaCheckCircle />} title="Resolved" value="18" />
        <StatCard icon={<FaClock />} title="Pending" value="4" />
        <StatCard icon={<FaExclamationTriangle />} title="Critical" value="2" />
      </div>

      {/* Main Content Area - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Ticket Distribution Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ticket Distribution
            </h3>
            <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center px-4">
                <p className="text-gray-500 mb-2">
                  Charts will be connected with API data later
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#00b2ef] mr-2"></div>
                    <span className="text-xs">Open</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#0ca74f] mr-2"></div>
                    <span className="text-xs">Resolved</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#e8c745] mr-2"></div>
                    <span className="text-xs">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Tickets
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
          {/* Performance */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Response Time
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Average First Response
                  </span>
                  <span className="text-sm font-medium">1h 30m</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#00b2ef] h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Average Resolution
                  </span>
                  <span className="text-sm font-medium">8h 15m</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0ca74f] h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Customer Satisfaction
                  </span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#e8c745] h-2 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00b2ef]/10 flex items-center justify-center text-[#00b2ef]">
                    <FaTicketAlt size={12} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Ticket #{item + 1000} updated
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-[#00b2ef] hover:underline">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
