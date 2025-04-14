import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Reset password for:", form.email);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <AuthLayout>
      <AuthCard title="Reset Your Password">
        {!isSubmitted ? (
          <>
            <p className="text-gray-500 text-center mb-8">
              Enter your email address and we'll send you a link to reset your
              password
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
              />

              <Button
                title={isLoading ? "Sending..." : "Send Reset Link"}
                type="submit"
                disabled={isLoading}
                buttonBg="bg-[#00b2ef] w-full text-white font-semibold hover:bg-[#0098d4]"
              />
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mb-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Check your email
            </h3>
            <p className="text-gray-500 mb-6">
              We've sent a password reset link to <strong>{form.email}</strong>.
              The link will expire in 30 minutes.
            </p>
            <Button
              title="Back to Login"
              onClick={() => navigate("/login")}
              buttonBg="bg-[#00b2ef] w-full text-white font-semibold hover:bg-[#0098d4]"
            />
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPassword;
