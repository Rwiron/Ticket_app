import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/ui/DashboardLayout";
import { updateProfile } from "../../services/user/userService";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

const ProfilePage = () => {
  const { user, token, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  // Independent display state to ensure UI updates
  const [displayUser, setDisplayUser] = useState({});

  // Initialize display data whenever user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
      });
      // Set local display state
      setDisplayUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (
      formData.password &&
      formData.password !== formData.password_confirmation
    ) {
      toast.error("Passwords do not match");
      return;
    }

    // Create request data (only include password if provided)
    const requestData = {
      name: formData.name,
      email: formData.email,
    };

    // Only include password fields if the user entered a password
    if (formData.password) {
      requestData.password = formData.password;
      requestData.password_confirmation = formData.password_confirmation;
    }

    setLoading(true);

    try {
      const updatedUser = await updateProfile(requestData, token);

      // Create a merged user object with the updated data
      const mergedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        ...updatedUser,
      };

      // Update context user state
      setUser(mergedUser);

      // Also update our local display state
      setDisplayUser(mergedUser);

      // Update localStorage directly to ensure persistence
      localStorage.setItem("user", JSON.stringify(mergedUser));

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        password: "",
        password_confirmation: "",
      }));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="max-w-5xl mx-auto">
        {/* Profile Header with User Avatar */}
        <div className="bg-gradient-to-r from-[#00b2ef] to-[#0077b6] rounded-xl shadow-lg p-8 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-12 -mr-12 z-0"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -mb-10 -ml-10 z-0"></div>

          <div className="flex flex-col md:flex-row items-center z-10 relative">
            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-[#00b2ef] text-4xl font-bold shadow-md mb-4 md:mb-0 md:mr-6">
              {displayUser?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{displayUser?.name}</h1>
              <p className="text-blue-100 mt-1">{displayUser?.email}</p>
              <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                {displayUser?.role || "User"}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">
              Update Profile
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your personal information and security settings
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#00b2ef] transition-colors"
                  >
                    <FaUser className="mr-2 text-gray-400 group-focus-within:text-[#00b2ef] transition-colors" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#00b2ef] transition-colors"
                  >
                    <FaEnvelope className="mr-2 text-gray-400 group-focus-within:text-[#00b2ef] transition-colors" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Divider with text */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-sm text-gray-500">
                    Password Settings
                  </span>
                </div>
              </div>

              {/* Password Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="password"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#00b2ef] transition-colors"
                  >
                    <FaLock className="mr-2 text-gray-400 group-focus-within:text-[#00b2ef] transition-colors" />
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:border-transparent transition-all duration-200"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to keep your current password
                  </p>
                </div>

                <div className="group">
                  <label
                    htmlFor="password_confirmation"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2 group-focus-within:text-[#00b2ef] transition-colors"
                  >
                    <FaCheckCircle className="mr-2 text-gray-400 group-focus-within:text-[#00b2ef] transition-colors" />
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <p className="font-medium text-blue-800 mb-2">
                    Password requirements:
                  </p>
                  <ul className="space-y-1 text-blue-700">
                    <li className="flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          formData.password.length >= 8
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          /[A-Z]/.test(formData.password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      One uppercase letter
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          /[0-9]/.test(formData.password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      One number
                    </li>
                    <li className="flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          /[^A-Za-z0-9]/.test(formData.password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      One special character
                    </li>
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-[#00b2ef] to-[#0077b6] text-white rounded-lg hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:ring-offset-2 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
