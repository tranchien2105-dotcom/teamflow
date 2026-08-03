"use client"; // This is a client component

import { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const checkValidation = () => {
        return email.trim() !== "" && password.trim() !== "";
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!checkValidation()) {
            e.preventDefault();
            alert("Vui lòng nhập đầy đủ thông tin");
        }
    };

    return (
        <div>
            <form action="/api/login" method="POST" onSubmit={handleSubmit}>
                <Input
                    label="Email: "
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password: "
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button text="Login" type="submit" />
            </form>
        </div>
    );
}