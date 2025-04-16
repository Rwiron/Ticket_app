import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthLayout from "../../components/AuthLayout";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { showSuccess, showError } from "../../utils/toast";
import { resetPassword } from "../../services/auth/authService";

const ResetingPass = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Extract token & email from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const token = params.get("token");

    if (!email || !token) {
      showError("Invalid or expired reset link");
      navigate("/forgot-password");
      return;
    }

    setForm((prev) => ({
      ...prev,
      email,
      token,
    }));
  }, [location]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await resetPassword(form);
      showSuccess(res.message || "Password has been reset successfully!");
      navigate("/login");
    } catch (err) {
      showError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthCard title="Reset Your Password">
        <p className="text-gray-500 text-center mb-6">
          Enter your new password to reset your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            readOnly
          />
          <InputField
            label="New Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter a new password"
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="Confirm new password"
          />

          <Button
            title={isLoading ? "Resetting..." : "Reset Password"}
            type="submit"
            disabled={isLoading}
            buttonBg="bg-[#0ca74f] w-full text-white font-semibold hover:bg-[#099a46]"
          />
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetingPass;
