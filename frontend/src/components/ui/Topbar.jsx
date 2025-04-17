// components/dashui/Topbar.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBell,
  FaEnvelope,
  FaSearch,
  FaBars,
  FaPowerOff,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaAngleDown,
} from "react-icons/fa";
import Clock from "./Clock";

const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);
  const logoutConfirmRef = useRef(null);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
    setDropdownOpen(false);
  };

  const confirmLogout = async () => {
    try {
      setShowLogoutConfirm(false);
      await logout();
      navigate("/login");
    } catch {
      // Error is already handled in the AuthContext
      navigate("/login");
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const navigateToProfile = () => {
    setDropdownOpen(false);
    navigate("/dashboard/profile");
  };

  const navigateToSettings = () => {
    setDropdownOpen(false);
    navigate("/dashboard/settings");
  };

  const navigateToHelp = () => {
    setDropdownOpen(false);
    navigate("/dashboard/help");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (
        logoutConfirmRef.current &&
        !logoutConfirmRef.current.contains(event.target) &&
        showLogoutConfirm
      ) {
        setShowLogoutConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutConfirm]);

  return (
    <header className="w-full bg-white shadow-sm px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-10">
      {/* Left section with menu burger and logo on mobile */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-[#00b2ef] lg:hidden"
        >
          <FaBars size={20} />
        </button>

        <h1 className="text-lg font-semibold text-gray-800 lg:hidden">
          MMI Tickets
        </h1>
      </div>

      {/* Clock Component */}
      <div className="flex-1 flex justify-center">
        <Clock className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100" />
      </div>

      {/* Search Bar - Hidden on mobile */}
      {/* <div className="relative flex-1 max-w-md hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tickets..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00b2ef] focus:border-[#00b2ef]"
        />
      </div> */}

      {/* Right side icons */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* <div className="relative hidden sm:block">
          <FaBell className="text-gray-500 hover:text-[#00b2ef] cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-[#e8c745] rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
            0
          </span>
        </div> */}

        {/* <div className="relative hidden sm:block">
          <FaEnvelope className="text-gray-500 hover:text-[#00b2ef] cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-[#0ca74f] rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
            5
          </span>
        </div> */}

        {/* Help Center Button */}
        <button
          onClick={navigateToHelp}
          className="hidden md:flex items-center text-gray-600 hover:text-[#00b2ef] transition-colors"
        >
          <FaQuestionCircle className="text-lg" />
          <span className="ml-2 text-sm font-medium">Help</span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#00b2ef] flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <span className="hidden md:flex items-center">
              <span className="text-sm font-medium mr-1">{user?.name}</span>
              <FaAngleDown
                className={`text-gray-500 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800 text-center">
                  {user?.role}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <button
                onClick={navigateToProfile}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="mr-3 text-gray-500" />
                <span>My Profile</span>
              </button>

              <button
                onClick={navigateToSettings}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="mr-3 text-gray-500" />
                <span>Settings</span>
              </button>

              <button
                onClick={navigateToHelp}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaQuestionCircle className="mr-3 text-gray-500" />
                <span>Help Center</span>
              </button>

              <div className="border-t border-gray-100 mt-1"></div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <FaPowerOff className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={logoutConfirmRef}
            className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-md transform transition-all"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <FaPowerOff className="text-red-500 text-xl" />
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Confirm Logout
            </h3>

            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md transition-colors text-white font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
