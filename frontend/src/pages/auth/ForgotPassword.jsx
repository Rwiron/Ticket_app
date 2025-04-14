import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import Button from "../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Send password reset link to:", email);
  };

  return (
    <AuthLayout>
      <AuthCard title="Forgot Password">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
          />
          <Button
            title="Send Reset Link"
            type="submit"
            buttonBg="bg-[#e8c745] text-white font-semibold"
          />
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;
