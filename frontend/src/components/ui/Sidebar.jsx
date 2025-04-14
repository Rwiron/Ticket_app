// components/dashui/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
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
} from "react-icons/fa";

import { logo } from "../../assets/index";

// Admin navigation links
const adminNavLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Tickets", path: "/dashboard/tickets", icon: <FaTicketAlt /> },
  { name: "Users", path: "/dashboard/users", icon: <FaUsers /> },
  { name: "System", path: "/dashboard/system", icon: <FaServer /> },
  { name: "Reports", path: "/dashboard/reports", icon: <FaChartBar /> },
  { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
];

// Employee navigation links - Only showing Dashboard
const employeeNavLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Messages", path: "/dashboard/messages", icon: <FaComment /> },
  { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  // Comment: Other links removed as requested
];

const Sidebar = ({ closeSidebar }) => {
  const { user } = useAuth();

  const navLinks = user?.role === "it_admin" ? adminNavLinks : employeeNavLinks;

  return (
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
              user?.role === "it_admin" ? "bg-[#e8c745]/20" : "bg-[#00b2ef]/20"
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
            onClick={() => window.innerWidth < 1024 && closeSidebar?.()}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-[#00b2ef]/20 text-[#00b2ef]"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            <span className="mr-3">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-white/60 mb-2">Need assistance?</p>
          <Button
            title="Contact Support"
            buttonBg="bg-transparent text-[#e8c745] hover:bg-[#e8c745]/20 py-2 w-full"
            onClick={() => {}}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
