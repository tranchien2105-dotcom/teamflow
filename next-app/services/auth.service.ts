import clientApi from "@/lib/api-client";
import { LoginRequest } from "@/types/auth";

export const authService = {
    async login(data: LoginRequest) {
        const { data: response } = await clientApi.post("/auth/login", data);

        return response;
    },

    async me() {
        const { data } = await clientApi.get("/auth/me");

        return data;
    },

    async logout() {
        const { data } = await clientApi.post("/auth/logout");

        return data;
    },
};