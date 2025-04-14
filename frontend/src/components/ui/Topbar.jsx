// components/dashui/Topbar.jsx
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBell, FaEnvelope, FaSearch, FaBars } from "react-icons/fa";

const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
      <div className="relative flex-1 max-w-md hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tickets..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00b2ef] focus:border-[#00b2ef]"
        />
      </div>

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

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#00b2ef] flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <button
              onClick={handleLogout}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
