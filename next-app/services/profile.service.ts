import clientApi from "@/lib/api-client";
import type { Profile } from "@/types/profile";

export interface CreateProfileRequest {
    full_name?: string;
    title?: string;
    bio?: string;
    phone?: string;
    address?: string;
    github_url?: string;
    linkedin_url?: string;
    website_url?: string;
}

export interface ProfileResponse {
    message: string;
    profile: Profile;
}

export const profileService = {
    async create(
        data: FormData
    ): Promise<ProfileResponse> {
        const { data: response } =
            await clientApi.post<ProfileResponse>(
                "/profile",
                data
            );

        return response;
    },

    async update(
        data: FormData
    ): Promise<ProfileResponse> {
        const { data: response } =
            await clientApi.post<ProfileResponse>(
                "/profile",
                data
            );

        return response;
    },
};