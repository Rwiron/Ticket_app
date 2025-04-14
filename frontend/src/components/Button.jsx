import React from "react";

const Button = ({
  title,
  type = "button",
  disabled = false,
  buttonBg = "",
  onClick,
}) => {
  const handleClick = (e) => {
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`
        px-6
        py-3
        rounded-2xl
        font-semibold
        text-sm
        transition-all
        duration-300
        cursor-pointer
        ease-in-out
        hover:scale-[1.03]
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:text-gray-400
        disabled:bg-gray-300
        w-fit
        h-fit
        ${buttonBg}
      `}
    >
      {title}
    </button>
  );
};

export default Button;
