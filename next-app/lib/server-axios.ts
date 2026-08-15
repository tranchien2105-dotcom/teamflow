import axios from "axios";
import { cookies } from "next/headers";

function getLaravelApiBaseUrl() {
    const baseUrl =
        process.env.LARAVEL_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://laravel:8000";

    return baseUrl.replace(/\/$/, "");
}

export async function createServerApi() {
    const token = (await cookies()).get("token")?.value;

    const decodedToken = token ? decodeURIComponent(token) : null;

    return axios.create({
        baseURL: getLaravelApiBaseUrl(),
        headers: {
            Accept: "application/json",
            ...(decodedToken
                ? {
                      Authorization: `Bearer ${decodedToken}`,
                  }
                : {}),
        },
        withCredentials: true,
    });
}

export async function getCurrentUser() {
    const api = await createServerApi();

    const { data } = await api.get("/api/me");

    return data;
}