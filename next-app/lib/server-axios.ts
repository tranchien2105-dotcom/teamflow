import axios from "axios";
import { cookies } from "next/headers";

function getLaravelApiBaseUrl() {
    const baseUrl = process.env.LARAVEL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://host.docker.internal:8080";
    return baseUrl.replace(/\/$/, "");
}

export async function createServerApi() {
    const token = (await cookies()).get("token")?.value;

    return axios.create({
        baseURL: getLaravelApiBaseUrl(),
        headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        withCredentials: true,
    });
}