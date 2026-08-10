export type CvTemplate = | "classic" | "modern" | "minimal";

export interface Profile {
    id: string;
    full_name: string | null;
    title: string | null;
    bio: string | null;
    avatar_url: string | null;
    cv_url: string | null;
    cv_template: CvTemplate
    phone: string | null;
    address: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    website_url: string | null;
    created_at: string;
    updated_at: string;
}