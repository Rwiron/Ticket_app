// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import GettingStarted from "./pages/auth/GettingStarted";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ResetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Login from "./pages/auth/Login";
import NotFound from "./pages/errors/NotFound";
import OtpVerification from "./pages/auth/OtpVerification";
import Dashboard from "./pages/dashboard/Dashboard";
import Contact from "./pages/dashboard/Contact";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import HelpPage from "./pages/dashboard/HelpPage";
import ResetingPass from "./pages/auth/ResetingPass";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPasswordGuard from "./guards/ResetPasswordGuard";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GettingStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password/" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />

      {/* Reset Password Guard */}
      <Route
        path="/reset-password"
        element={
          <ResetPasswordGuard>
            <ResetingPass />
          </ResetPasswordGuard>
        }
      />

      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/contact" element={<Contact />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/help" element={<HelpPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
