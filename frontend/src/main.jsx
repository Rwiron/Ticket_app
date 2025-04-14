// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material Tailwind custom theme
const theme = {
  button: {
    defaultProps: {
      color: "blue",
      variant: "filled",
    },
    styles: {
      variants: {
        filled: {
          blue: {
            background: "bg-[#00b2ef]",
            color: "text-white",
            shadow: "shadow-none",
            hover: "hover:bg-[#00b2ef]/90",
            focus: "focus:ring focus:ring-[#00b2ef]/50",
          },
        },
      },
    },
  },
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer position="top-center" autoClose={4000} />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
