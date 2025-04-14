import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { resendOtp, verifyOtp } from "../../services/auth/authService";
import { useAuth } from "../../context/AuthContext";

const OtpVerification = () => {
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const location = useLocation();
  const email = location.state?.email || "";
  const { saveSession } = useAuth();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1);
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    // Get pasted data
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content contains only digits
    if (!/^\d+$/.test(pastedData)) {
      toast.error("Please paste only numbers");
      return;
    }

    const newOtpValues = [...otpValues];
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtpValues[i] = pastedData[i];
    }

    setOtpValues(newOtpValues);

    if (pastedData.length < 6 && inputRefs.current[pastedData.length]) {
      inputRefs.current[pastedData.length].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otpValues.some((v) => v === "")) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }

    const otp = otpValues.join("");
    setIsLoading(true);

    try {
      const res = await verifyOtp({ email, otp });
      toast.success("OTP verified successfully!");

      saveSession(res.token, res.user);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      await resendOtp(email); // 🧠 use the email from location.state
      toast.success("OTP has been resent to your email.");
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard title="OTP Verification">
        <p className="text-gray-500 text-center mb-8">
          We've sent a verification code to your email. Please enter it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otpValues.map((value, index) => (
              <input
                key={index}
                type="text"
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : null}
                className="w-10 h-12 sm:w-12 sm:h-14 rounded-lg border-2 border-gray-300 text-center text-xl font-bold focus:border-[#00b2ef] focus:ring-1 focus:ring-[#00b2ef] focus:outline-none transition-all"
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <Button
            title={isLoading ? "Verifying..." : "Verify OTP"}
            type="submit"
            disabled={isLoading || otpValues.some((v) => v === "")}
            buttonBg="bg-[#00b2ef] text-white font-semibold w-full hover:bg-[#00a3d6] transition-colors py-3 rounded-lg"
          />
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Didn't get the code?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-[#00b2ef] hover:underline font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default OtpVerification;
