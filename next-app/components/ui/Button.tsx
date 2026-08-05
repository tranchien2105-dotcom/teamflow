import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    className = "",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-2
        text-white
        font-medium
        hover:bg-blue-700
        transition
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        ${className}
      `}
        >
            {children}
        </button>
    );
}