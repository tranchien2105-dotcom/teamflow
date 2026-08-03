interface ButtonProps {
    text: string;
    type: "button" | "submit";
}

export default function Button({ text, type }: ButtonProps) {
    return (
        <button type={type}>
            {text}
        </button>
    );
}