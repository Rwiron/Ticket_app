// components/dashui/UserProfileMenu.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

const UserProfileMenu = () => {
  const { user, logout } = useAuth();

  return (
    <div className="relative">
      <div className="text-sm text-gray-700 font-semibold">{user?.name}</div>
      <button
        onClick={logout}
        className="text-sm text-red-500 hover:underline mt-1"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfileMenu;
