
import { useLocation, Navigate } from "react-router-dom";

const ResetPasswordGuard = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const email = params.get("email");

  // If missing, redirect
  if (!token || !email) {
    return <Navigate to="/forgot-password" replace />;
  }

  return children;
};

export default ResetPasswordGuard;
