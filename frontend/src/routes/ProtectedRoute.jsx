import { Navigate, Outlet, useLocation } from "react-router-dom";
import { showWarning } from "../utils/toast";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    showWarning(
      "You don't have permission to access this page. Please log in."
    );
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
