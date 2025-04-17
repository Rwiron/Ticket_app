import { useState } from "react";
import DashboardLayout from "../../components/ui/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaBell,
  FaShieldAlt,
  FaDesktop,
  FaCheck,
  FaToggleOn,
  FaToggleOff,
  FaPalette,
  FaMoon,
  FaSun,
  FaGlobe,
} from "react-icons/fa";
import Clock from "../../components/ui/Clock";

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    app: true,
    updates: true,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [language, setLanguage] = useState("english");

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ""}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Change your name from profile page
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Your primary email address
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Language & Region
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="french">French</option>
                  <option value="spanish">Spanish</option>
                  <option value="german">German</option>
                  <option value="kinyarwanda">Kinyarwanda</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:border-transparent"
                  defaultValue="UTC+2"
                >
                  <option value="UTC+0">UTC+0 (London)</option>
                  <option value="UTC+1">UTC+1 (Paris, Berlin)</option>
                  <option value="UTC+2">UTC+2 (Kigali, Johannesburg)</option>
                  <option value="UTC+3">UTC+3 (Moscow, Nairobi)</option>
                  <option value="UTC-5">UTC-5 (New York)</option>
                  <option value="UTC-8">UTC-8 (Los Angeles)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Theme</h3>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`flex-1 p-4 flex flex-col items-center border rounded-lg transition-all ${
                    !darkMode
                      ? "border-[#00b2ef] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FaSun
                    className={`text-4xl mb-3 ${
                      !darkMode ? "text-[#00b2ef]" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">Light Mode</span>
                  {!darkMode && (
                    <span className="inline-flex items-center mt-2 text-[#00b2ef] text-sm">
                      <FaCheck className="mr-1" /> Active
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setDarkMode(true)}
                  className={`flex-1 p-4 flex flex-col items-center border rounded-lg transition-all ${
                    darkMode
                      ? "border-[#00b2ef] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FaMoon
                    className={`text-4xl mb-3 ${
                      darkMode ? "text-[#00b2ef]" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">Dark Mode</span>
                  {darkMode && (
                    <span className="inline-flex items-center mt-2 text-[#00b2ef] text-sm">
                      <FaCheck className="mr-1" /> Active
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Display Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Compact Mode</p>
                    <p className="text-sm text-gray-500">
                      Reduce spacing and padding for a denser look
                    </p>
                  </div>
                  <button
                    onClick={() => setCompactMode(!compactMode)}
                    className="text-2xl"
                  >
                    {compactMode ? (
                      <FaToggleOn className="text-[#00b2ef]" />
                    ) : (
                      <FaToggleOff className="text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Large Text</p>
                    <p className="text-sm text-gray-500">
                      Increase font size for better readability
                    </p>
                  </div>
                  <button className="text-2xl">
                    <FaToggleOff className="text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Animations</p>
                    <p className="text-sm text-gray-500">
                      Enable animations throughout the interface
                    </p>
                  </div>
                  <button className="text-2xl">
                    <FaToggleOn className="text-[#00b2ef]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("email")}
                    className="text-2xl"
                  >
                    {notifications.email ? (
                      <FaToggleOn className="text-[#00b2ef]" />
                    ) : (
                      <FaToggleOff className="text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">
                      Browser Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Show notifications in your browser
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("browser")}
                    className="text-2xl"
                  >
                    {notifications.browser ? (
                      <FaToggleOn className="text-[#00b2ef]" />
                    ) : (
                      <FaToggleOff className="text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">
                      App Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Show in-app notifications
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("app")}
                    className="text-2xl"
                  >
                    {notifications.app ? (
                      <FaToggleOn className="text-[#00b2ef]" />
                    ) : (
                      <FaToggleOff className="text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Updates & News</p>
                    <p className="text-sm text-gray-500">
                      Receive updates about new features and announcements
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("updates")}
                    className="text-2xl"
                  >
                    {notifications.updates ? (
                      <FaToggleOn className="text-[#00b2ef]" />
                    ) : (
                      <FaToggleOff className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-[#00b2ef] text-white rounded-lg hover:bg-[#0092c5] focus:outline-none focus:ring-2 focus:ring-[#00b2ef] focus:ring-offset-2 transition-colors">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Data Sharing</p>
                    <p className="text-sm text-gray-500">
                      Control how your data is used and shared
                    </p>
                  </div>
                  <button className="text-2xl">
                    <FaToggleOff className="text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Activity Logs</p>
                    <p className="text-sm text-gray-500">
                      Manage your activity history
                    </p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                    View Logs
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Account Actions
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">
                      Export Your Data
                    </p>
                    <p className="text-sm text-gray-500">
                      Download all your data in a compatible format
                    </p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                    Export
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-gray-500">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Settings Header */}
        <div className="bg-gradient-to-r from-[#00b2ef] to-[#0077b6] rounded-xl shadow-lg p-6 md:p-8 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-12 -mr-12 z-0"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -mb-10 -ml-10 z-0"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-blue-100 max-w-3xl">
              Customize your experience with MMI Tickets. Configure your
              personal preferences, notification settings, and privacy options.
            </p>
          </div>
        </div>

        {/* Settings Content - Tabs & Panel */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Tab Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center p-3 mb-2 rounded-lg text-left transition-all ${
                  activeTab === "general"
                    ? "bg-blue-50 text-[#00b2ef]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <FaUser className="mr-3" />
                <span className="font-medium">General</span>
              </button>
              <button
                onClick={() => setActiveTab("appearance")}
                className={`w-full flex items-center p-3 mb-2 rounded-lg text-left transition-all ${
                  activeTab === "appearance"
                    ? "bg-blue-50 text-[#00b2ef]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <FaPalette className="mr-3" />
                <span className="font-medium">Appearance</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center p-3 mb-2 rounded-lg text-left transition-all ${
                  activeTab === "notifications"
                    ? "bg-blue-50 text-[#00b2ef]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <FaBell className="mr-3" />
                <span className="font-medium">Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full flex items-center p-3 mb-2 rounded-lg text-left transition-all ${
                  activeTab === "privacy"
                    ? "bg-blue-50 text-[#00b2ef]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <FaShieldAlt className="mr-3" />
                <span className="font-medium">Privacy & Security</span>
              </button>
            </div>

            {/* Settings Clock */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-5 mt-4 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-[#00b2ef] p-2 rounded-lg shadow-md">
                  <FaDesktop className="text-white" />
                </div>
                <h3 className="font-medium text-white ml-3">Current Time</h3>
              </div>
              <div className="rounded-lg bg-gray-800 p-4 border border-gray-700">
                <div className="flex justify-center">
                  <Clock className="justify-center text-3xl text-[#00b2ef]" />
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-[#00b2ef] to-[#0ca74f] mt-4 rounded-full"></div>
                <p className="text-xs text-[#e8c745] mt-3 text-center">
                  Local system time
                </p>
              </div>
            </div>
          </div>

          {/* Settings Content Panel */}
          <div className="md:w-3/4">{renderTabContent()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
