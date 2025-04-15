import React, { useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaComment,
  FaStar,
  FaSync,
} from "react-icons/fa";
import Button from "../../components/Button";
import TicketStatusBar from "../../components/ui/TicketStatusBar";

const EmployeeDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

  // Automatically refresh every 10 seconds
  /* useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger(Date.now());
    }, 10000); // 10000ms = 10 seconds

    return () => clearInterval(interval); // Clear on unmount
  }, []); */

  // Manual refresh option
  const handleManualRefresh = () => {
    setRefreshTrigger(Date.now());
  };

  return (
    <>
      {/* <div className="mb-6 flex justify-end">
        <Button
          title={
            <div className="flex items-center">
              <FaSync className="mr-2" />
              <span>Refresh Data</span>
            </div>
          }
          onClick={() => setRefreshTrigger(Date.now())}
          buttonBg="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
        />
      </div> */}

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
          {/* Status Updates */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Updates
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00b2ef]/10 flex items-center justify-center text-[#00b2ef]">
                    <FaComment size={12} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      New response on Ticket #{item + 1000}
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-[#00b2ef] hover:underline">
              View All Updates
            </button>
          </div>
          {/* Ticket Status */}
          {/* <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ticket Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Open</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#00b2ef] h-2 rounded-full"
                    style={{ width: "38%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#e8c745] h-2 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Resolved</span>
                  <span className="text-sm font-medium">5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0ca74f] h-2 rounded-full"
                    style={{ width: "62%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div> */}
          <TicketStatusBar refreshTrigger={refreshTrigger} />
          {/* Help & Support */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Contact our support team for assistance with your tickets.
            </p>
            <button className="w-full py-2 bg-[#00b2ef] text-white rounded-lg hover:bg-[#00b2ef]/90 transition-colors text-sm font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
