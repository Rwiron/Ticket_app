// components/dashui/Topbar.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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

const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="relative hidden sm:block">
          <FaBell className="text-gray-500 hover:text-[#00b2ef] cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-[#e8c745] rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
            3
          </span>
        </div>

        <div className="relative hidden sm:block">
          <FaEnvelope className="text-gray-500 hover:text-[#00b2ef] cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-[#0ca74f] rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
            5
          </span>
        </div>

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

              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="mr-3 text-gray-500" />
                <span>My Profile</span>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="mr-3 text-gray-500" />
                <span>Settings</span>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaQuestionCircle className="mr-3 text-gray-500" />
                <span>Help Center</span>
              </a>

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
    </header>
  );
};

export default Topbar;
