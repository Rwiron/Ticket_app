// components/dashui/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";

const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Tickets", path: "/dashboard/tickets", icon: <FaTicketAlt /> },
  { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  { name: "Help", path: "/dashboard/help", icon: <FaQuestionCircle /> },
];

const Sidebar = ({ closeSidebar }) => {
  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col shadow-md h-[calc(100vh)]">
      <div className="flex items-center justify-between py-6 px-6 border-b border-white/10">
        <div className="text-xl font-bold flex items-center">
          <span className="text-[#00b2ef] mr-2">MMI</span>
          <span>Tickets</span>
        </div>
        {/* Close button only shown on mobile */}
        <button
          onClick={closeSidebar}
          className="text-white p-1 hover:text-[#00b2ef] lg:hidden"
        >
          <FaTimes size={18} />
        </button>
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
          <p className="text-xs text-white/60">Need assistance?</p>
          <button className="mt-2 text-sm text-[#e8c745] hover:underline">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
