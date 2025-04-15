import React, { useState } from "react";
import DashboardLayout from "../../components/ui/DashboardLayout";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";
import Button from "../../components/Button";
import CreateTicketModal from "../../components/ui/CreateTicketModal";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUserCog,
  FaSync,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user, switchRole } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle successful ticket creation
  const handleTicketCreated = () => {
    // Trigger a refresh of both the stats and the ticket table
    setRefreshTrigger(Date.now());
  };

  return (
    <>
      <DashboardLayout>
        <div className="mb-6 flex items-center justify-between">
          {/* <Button
            title={
              <div className="flex items-center">
                <FaSync className="mr-2" />
                <span>Refresh Data</span>
              </div>
            }
            onClick={() => setRefreshTrigger(Date.now())}
            buttonBg="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
          /> */}

          <Button
            title={
              <div className="flex items-center">
                <FaUserCog className="mr-2" />
                <span>
                  Switch to {user?.role === "it_admin" ? "Employee" : "Admin"}{" "}
                  View
                </span>
              </div>
            }
            onClick={switchRole}
            buttonBg="bg-[#0f172a] text-white hover:bg-[#1e293b]"
          />
        </div>

        <SectionHeader
          title="Dashboard Overview"
          subtitle="Track and manage your support tickets efficiently"
          actionButton="Create Ticket"
          onActionClick={openModal}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <StatCard
            icon={<FaTicketAlt />}
            title="Total Tickets"
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
            title="In Progress"
            statType="in_progress"
            refreshTrigger={refreshTrigger}
          />
          <StatCard
            icon={<FaExclamationTriangle />}
            title="Open Tickets"
            statType="open"
            refreshTrigger={refreshTrigger}
          />
        </div>

        {/* Ticket Table */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">My Tickets</h3>
            <Button
              title="Create Ticket"
              onClick={openModal}
              buttonBg="bg-[#00b2ef] text-white hover:bg-[#00b2ef]/90"
            />
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full px-4 sm:px-0">
              <TicketTable refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Using CreateTicketModal for ticket creation form */}
      <CreateTicketModal
        open={isModalOpen}
        handleClose={closeModal}
        onSuccess={handleTicketCreated}
      />
    </>
  );
};

export default Dashboard;
