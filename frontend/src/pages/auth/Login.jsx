import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Social from "../../components/Social";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login with:", form);
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuthLayout>
      <AuthCard title="Welcome Back">
        <p className="text-gray-500 text-center mb-8">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. Your email@example.com"
          />

          <div className="space-y-1">
            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your secret *password*"
            />
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={form.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <Button
            title={isLoading ? "Logging in..." : "Login"}
            type="submit"
            disabled={isLoading}
            buttonBg="bg-[#00b2ef] w-full text-white font-semibold hover:bg-[#0098d4]"
          />
        </form>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
