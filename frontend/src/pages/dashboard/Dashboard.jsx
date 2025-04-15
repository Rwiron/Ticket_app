import React from "react";
import DashboardLayout from "../../components/ui/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {user?.role === "it_admin" ? <AdminDashboard /> : <EmployeeDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
