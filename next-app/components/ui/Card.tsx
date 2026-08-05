import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export default function Card({
    children,
    className = "",
}: CardProps) {
    return (
        <div
            className={`
        rounded-xl
        border
        bg-white
        p-6
        shadow-md
        ${className}
      `}
        >
            {children}
        </div>
    );
}