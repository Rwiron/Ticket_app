// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Default user examples for testing
const defaultUsers = {
  admin: {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "it_admin",
  },
  employee: {
    id: 2,
    name: "Employee User",
    email: "employee@example.com",
    role: "employee",
  },
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : defaultUsers.employee; // Default to employee for testing
  });

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const saveSession = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Switch role for testing purposes
  const switchRole = () => {
    const newRole = user?.role === "it_admin" ? "employee" : "it_admin";
    const newUser = {
      ...user,
      role: newRole,
      ...defaultUsers[newRole === "it_admin" ? "admin" : "employee"],
    };
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setToken,
        setUser,
        saveSession,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// This allows you to use useAuth() in components
export const useAuth = () => useContext(AuthContext);
