import React from "react";

interface InputProps {
    label?: string;
    type?: "text" | "email" | "password" | "number";
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export default function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
}: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-2
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
            />
        </div>
    );
}