// components/dashui/Sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHome,
  FaTicketAlt,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaTimes,
  FaServer,
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaComment,
  FaStar,
  FaHeadset,
  FaUserCircle,
} from "react-icons/fa";
import { RiCodeSSlashLine } from "react-icons/ri";

import { logo } from "../../assets/index";

// Admin navigation links
const adminNavLinks = [
  { name: "Home", path: "/dashboard", exact: true, icon: <FaHome /> },
  { name: "Profile", path: "/dashboard/profile", icon: <FaUserCircle /> },
  { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  { name: "Help Center", path: "/dashboard/help", icon: <FaQuestionCircle /> },
];

// Employee navigation links - Only showing Dashboard
const employeeNavLinks = [
  { name: "Dashboard", path: "/dashboard", exact: true, icon: <FaHome /> },
  { name: "Contact", path: "/dashboard/contact", icon: <FaHeadset /> },
  { name: "Profile", path: "/dashboard/profile", icon: <FaUserCircle /> },
  { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  { name: "Help Center", path: "/dashboard/help", icon: <FaQuestionCircle /> },
  // Comment: Other links removed as requested
];

const Sidebar = ({ closeSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navLinks = user?.role === "it_admin" ? adminNavLinks : employeeNavLinks;

  // Check if current path is exactly "/dashboard" for dashboard link
  const isExactDashboard = location.pathname === "/dashboard";

  return (
    <>
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col shadow-md h-[calc(100vh)]">
        <div className="border-b border-white/10">
          {/* Logo section */}
          <div className="relative flex flex-col items-center py-6 px-6">
            {/* Close button only shown on mobile */}
            <button
              onClick={closeSidebar}
              className="text-white p-1 hover:text-[#00b2ef] lg:hidden absolute right-4 top-4"
            >
              <FaTimes size={18} />
            </button>

            <div className="mb-4">
              <img src={logo} alt="MMI Logo" className="h-14" />
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full text-white ${
                user?.role === "it_admin"
                  ? "bg-[#e8c745]/20"
                  : "bg-[#00b2ef]/20"
              }`}
            >
              Military Medical Insurance
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              to={link.path}
              key={link.name}
              end={link.exact}
              onClick={() => window.innerWidth < 1024 && closeSidebar?.()}
              className={({ isActive }) => {
                // Special case for Dashboard to ensure it's only active on exact match
                if (
                  link.name === "Dashboard" &&
                  !isExactDashboard &&
                  link.exact
                ) {
                  return "flex items-center px-4 py-3 rounded-lg font-medium transition-all hover:bg-white/10 text-white";
                }

                return `flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-[#00b2ef]/20 text-[#00b2ef]"
                    : "hover:bg-white/10 text-white"
                }`;
              }}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Version Display */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-center py-2 px-3 bg-white/5 rounded-lg backdrop-blur-sm transition-all hover:bg-white/10">
            <RiCodeSSlashLine className="text-[#00b2ef] mr-2" />
            <span className="text-xs font-medium bg-gradient-to-r from-[#00b2ef] to-[#2dd4bf] bg-clip-text text-transparent">
              v1.0.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
