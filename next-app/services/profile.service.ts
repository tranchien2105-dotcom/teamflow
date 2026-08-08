import clientApi from "@/lib/api-client";

export interface CreateProfileRequest {
    full_name?: string;
    title?: string;
    bio?: string;
    avatar_url?: string;
    cv_url?: string;
    phone?: string;
    address?: string;
    github_url?: string;
    linkedin_url?: string;
    website_url?: string;
}

export interface ProfileResponse {
    message: string;
    profile: {
        id: string;
        user_id: string;
        full_name: string | null;
        title: string | null;
        bio: string | null;
        avatar_url: string | null;
        cv_url: string | null;
        phone: string | null;
        address: string | null;
        github_url: string | null;
        linkedin_url: string | null;
        website_url: string | null;
        created_at: string;
        updated_at: string;
    };
}

export const profileService = {
    async create(
        data: CreateProfileRequest
    ): Promise<ProfileResponse> {
        const { data: response } =
            await clientApi.post<ProfileResponse>(
                "/profile",
                data
            );

        return response;
    },

    async update(
        data: CreateProfileRequest
    ): Promise<ProfileResponse> {
        const { data: response } =
            await clientApi.put<ProfileResponse>(
                "/profile",
                data
            );

        return response;
    },
};
