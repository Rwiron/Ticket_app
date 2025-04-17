import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const Clock = ({ className }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return (
      <>
        <span className="font-bold">{hours}</span>
        <span className="text-blue-400 mx-1">:</span>
        <span className="font-bold">{minutes}</span>
        <span className="text-blue-400 mx-1">:</span>
        <span className="font-bold">{seconds}</span>
        <span className="text-xs ml-2 text-purple-400 font-medium">{ampm}</span>
      </>
    );
  };

  return (
    <div className={`flex items-center ${className || ""}`}>
      <div className="mr-3 text-blue-400">
        <FaClock />
      </div>
      <div className="flex items-baseline">{formatTime(time)}</div>
    </div>
  );
};

export default Clock;
