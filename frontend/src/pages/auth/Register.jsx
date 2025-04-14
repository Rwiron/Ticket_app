import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {
  registerUser,
  checkEmailAvailability,
} from "../../services/auth/authService";
import { showSuccess, showError } from "../../utils/toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(""); // "available", "taken", or ""
  const [passwordErrors, setPasswordErrors] = useState({
    tooShort: false,
    mismatch: false,
    match: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));

    // Reset email status when typing
    if (e.target.name === "email") {
      if (!value || value.length < 5) {
        setEmailStatus("");
        return;
      }

      if (value && value.includes("@")) {
        setEmailStatus("checking");
        debounceEmailCheck(value);
      }
    }

    // Password validation
    if (e.target.name === "password") {
      setPasswordErrors((prev) => ({
        ...prev,
        tooShort: value.length > 0 && value.length < 5,
        mismatch:
          form.password_confirmation && value !== form.password_confirmation,
        match:
          form.password_confirmation &&
          value.length >= 5 &&
          value === form.password_confirmation,
      }));
    }

    // Check for password confirmation match
    if (e.target.name === "password_confirmation") {
      setPasswordErrors((prev) => ({
        ...prev,
        mismatch: form.password && value && form.password !== value,
        match:
          form.password && form.password.length >= 5 && form.password === value,
      }));
    }
  };

  // Debounce logic
  const debounceEmailCheck = useCallback(
    debounce(async (email) => {
      if (!email || !email.includes("@")) {
        setEmailStatus("");
        return;
      }

      try {
        setEmailStatus("checking"); // Add a checking state
        const res = await checkEmailAvailability(email);
        console.log("Email check response:", res);
        if (res.available) {
          setEmailStatus("available");
        } else {
          setEmailStatus("taken");
        }
      } catch (error) {
        console.error("Email check error:", error);
        setEmailStatus("error");
      }
    }, 500),
    []
  );

  // Debounce helper
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (form.password.length < 5) {
      showError("Password must be at least 5 characters");
      setPasswordErrors((prev) => ({ ...prev, tooShort: true }));
      return;
    }

    if (form.password !== form.password_confirmation) {
      showError("Passwords do not match");
      setPasswordErrors((prev) => ({ ...prev, mismatch: true }));
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerUser(form);
      console.log("Success:", res);
      showSuccess("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      showError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard title="Create Your Account">
        <p className="text-gray-500 text-center mb-8">
          Join us today and start using our platform
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            rightIcon={
              emailStatus === "checking" ? (
                <span className="text-gray-500">Checking...</span>
              ) : emailStatus === "available" ? (
                <span className="text-green-500">✓ Available</span>
              ) : emailStatus === "taken" ? (
                <span className="text-red-500">✗ Already taken</span>
              ) : emailStatus === "error" ? (
                <span className="text-orange-500">Check failed</span>
              ) : null
            }
          />
          {emailStatus === "available" && (
            <span className="text-green-500 text-sm mt-1">
              Great! You can use this email to register.
            </span>
          )}
          {emailStatus === "taken" && (
            <h1 className="text-red-500 text-sm mt-1 text-bold">
              This email is already registered. Please use a different email
            </h1>
          )}
          {emailStatus === "error" && (
            <span className="text-orange-500 text-sm mt-1">
              Could not verify email availability. Please try again.
            </span>
          )}
          <div>
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              autoComplete="new-password"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              }
            />
            {passwordErrors.tooShort && (
              <span className="text-red-500 text-sm mt-1 block">
                Password must be at least 5 characters
              </span>
            )}
          </div>
          <div>
            <InputField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Re-type your password"
              autoComplete="new-password"
              rightIcon={
                <div className="flex items-center space-x-2">
                  {form.password_confirmation &&
                    (passwordErrors.match ? (
                      <span className="text-green-500">✓ Match</span>
                    ) : passwordErrors.mismatch ? (
                      <span className="text-red-500">✗ No match</span>
                    ) : null)}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
              }
            />
            {passwordErrors.mismatch && (
              <span className="text-red-500 text-sm mt-1 block">
                Passwords do not match
              </span>
            )}
            {passwordErrors.match && (
              <span className="text-green-500 text-sm mt-1 block">
                Passwords match
              </span>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={form.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              required
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            title={isLoading ? "Creating Account..." : "Create Account"}
            type="submit"
            disabled={isLoading}
            buttonBg="bg-[#0ca74f] w-full text-white font-semibold hover:bg-[#099a46]"
          />
        </form>

        {/* <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or register with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Facebook
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Apple
            </button>
          </div>
        </div> */}

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;
