import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Modern background with animated shapes */}
      <div className="absolute inset-0 bg-gray-50 z-0">
        <motion.div
          className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-[#00b2ef]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 -right-10 w-60 h-60 rounded-full bg-[#e8c745]/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-3/4 left-1/3 w-40 h-40 rounded-full bg-[#0ca74f]/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="w-full max-w-md p-8 mx-auto text-center backdrop-blur-sm bg-white/60 rounded-2xl shadow-lg z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <motion.h1
            className="text-9xl font-bold text-[#00b2ef]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>
          <motion.div
            className="h-2 w-24 mx-auto my-6 bg-[#e8c745]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          ></motion.div>
          <motion.h2
            className="text-2xl font-semibold mb-4 text-[#0ca74f]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Page Not Found
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Button
            title="Go Back"
            onClick={handleClick}
            buttonBg="bg-[#00b2ef] hover:bg-[#00a0d5] text-white"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
