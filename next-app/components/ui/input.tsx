interface InputProps {
    label: string;
    type: "text" | "email" | "password";
    placeholder: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    label,
    type,
    placeholder,
    required,
    value,
    onChange,
}: InputProps) {
    return (
        <div>
            <label>{label}</label>

            <input
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}