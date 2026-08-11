import { Profile } from "@/types/profile";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: string 
    created_at: string;
    updated_at: string;
    profile: Profile | null;
}

export interface LoginResponse {
    token: string;
    token_type: string;
    expires_in?: number;
    user: User;
}