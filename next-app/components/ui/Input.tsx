
import React from "react";

interface InputProps {
    label?: string;
    name?: string;
    type?: "text" | "email" | "password" | "number";
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export default function Input({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <input
                id={name}
                name={name}
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
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                "
            />
        </div>
    );
}
