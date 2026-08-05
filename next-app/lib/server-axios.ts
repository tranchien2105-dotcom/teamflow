import axios from "axios";
import { cookies } from "next/headers";

export async function createServerApi() {
    const token = (await cookies()).get("token")?.value;
    
    return axios.create({
        baseURL: process.env.LARAVEL_API_URL,
        headers: {
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
}