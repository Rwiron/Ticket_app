import React from "react";
import GettingStarted from "./pages/auth/GettingStarted";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ResetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/errors/NotFound";
import OtpVerification from "./pages/auth/OtpVerification";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={4000} />
      <Routes>
        <Route path="/" element={<GettingStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
