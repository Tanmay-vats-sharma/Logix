import React from "react";
import { cn } from "../../lib/utils";

const Button = ({ value, className = "", onClick = () => {}  }) => {
  return (
    <button
      className={cn("bg-purple-500 text-white font-semibold rounded-lg border-2 border-purple-500 shadow-md neon-purple-shadow hover:bg-purple-700 transition duration-300 flex items-center justify-center h-10 w-36 lg:w-40 ", className)}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
