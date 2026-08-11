import apiClient from "@/lib/api-client";

export interface DashboardUser {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
}

export interface DashboardProfile {
    id?: string;
    user_id?: number;
    full_name?: string | null;
    title?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
}

export interface DashboardStats {
    experiences: number;
    educations: number;
    skills: number;
    projects: number;
    certificates: number;
    blog_posts: number;
}

export interface RecentExperience {
    id: string;
    company?: string | null;
    position?: string | null;
    location?: string | null;
    employment_type?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

export interface FeaturedProject {
    id: string;
    title?: string | null;
    slug?: string | null;
    summary?: string | null;
    cover_image?: string | null;
    github_url?: string | null;
    demo_url?: string | null;
    featured?: boolean;
    status?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
}

export interface RecentProject {
    id: string;
    title?: string | null;
    slug?: string | null;
    summary?: string | null;
    cover_image?: string | null;
    featured?: boolean;
    status?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
}

export interface RecentBlogPost {
    id: string;
    title?: string | null;
    slug?: string | null;
    excerpt?: string | null;
    cover_image?: string | null;
    published_at?: string | null;
    created_at?: string | null;
}

export interface RecentCertificate {
    id: number;
    name?: string | null;
    organization?: string | null;
    credential_id?: string | null;
    issue_date?: string | null;
    credential_url?: string | null;
}

export interface DashboardData {
    user: DashboardUser;
    profile: DashboardProfile | null;
    stats: DashboardStats;
    recent_experiences: RecentExperience[];
    featured_projects: FeaturedProject[];
    recent_projects: RecentProject[];
    recent_blog_posts: RecentBlogPost[];
    recent_certificates: RecentCertificate[];
}

interface DashboardResponse {
    data: DashboardData;
}

export async function getDashboard(): Promise<DashboardData> {
    const response = await apiClient.get<DashboardResponse>(
        "/dashboard"
    );

    return response.data.data;
}
