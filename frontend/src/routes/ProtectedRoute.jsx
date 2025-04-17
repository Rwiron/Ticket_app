import { Navigate, Outlet, useLocation } from "react-router-dom";
import { showWarning } from "../utils/toast";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !token) {
    showWarning(
      "You don't have permission to access this page. Please log in."
    );
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
