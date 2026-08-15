import { createServerApi } from "@/lib/server-axios";

/**
 * User
 */
export interface PortfolioUser {
    id: number;
    name: string;
    username: string;
}

/**
 * Profile
 */
export interface Profile {
    id: string;
    full_name: string;
    title: string;
    bio: string | null;
    avatar_url: string | null;
    cv_url: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    website_url: string | null;
}

/**
 * Experience
 */
export interface Experience {
    id: string;
    company: string;
    position: string;
    location: string | null;
    employment_type: string;
    start_date: string;
    end_date: string | null;
    description: string | null;
}

/**
 * Skill
 */
export interface Skill {
    id: number;
    name: string;
    category: string;
    level: string;
    years_of_experience: number;
}

/**
 * Education
 */
export interface Education {
    id: string;
    school: {
        id: string;
        name: string;
        short_name: string;
        location: string;
    };
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string | null;
    description: string | null;
}

/**
 * Technology
 */
export interface Technology {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
}

/**
 * Project Feature
 */
export interface ProjectFeature {
    id: string;
    title: string;
    description: string | null;
    sort_order: number;
}

/**
 * Project Image
 */
export interface ProjectImage {
    id: string;
    image_url: string;
    caption: string | null;
    sort_order: number;
}

/**
 * Project Link
 */
export interface ProjectLink {
    id: string;
    label: string;
    url: string;
    type: string;
    sort_order: number;
}

/**
 * Project
 */
export interface Project {
    id: string;

    title: string;
    slug: string;

    summary: string | null;
    content: string | null;

    cover_image: string | null;

    github_url: string | null;
    demo_url: string | null;

    featured: boolean;
    status: string;

    started_at: string | null;
    completed_at: string | null;

    features: ProjectFeature[];
    images: ProjectImage[];
    technologies: Technology[];
    links: ProjectLink[];

    created_at?: string;
    updated_at?: string;
}

/**
 * Certificate
 */
export interface Certificate {
    id: number;

    name: string;
    organization: string;

    credential_id: string | null;
    issue_date: string;

    credential_url: string | null;
    description: string | null;

    created_at?: string;
    updated_at?: string;
}

/**
 * Blog Post
 */
export interface BlogPost {
    id: string;

    user_id?: number;

    title: string;
    slug: string;

    excerpt: string | null;
    content: string;

    cover_image: string | null;

    published_at: string | null;

    created_at?: string;
    updated_at?: string;
}

/**
 * Complete Portfolio
 */
export interface PortfolioData {
    user: PortfolioUser;

    profile: Profile | null;

    experiences: Experience[];

    skills: Skill[];

    educations: Education[];

    projects: Project[];

    certificates: Certificate[];

    blog_posts: BlogPost[];
}

/**
 * API Response
 */
interface PortfolioResponse {
    data: PortfolioData;
}

/**
 * Get default public portfolio.
 *
 * GET /api/portfolio
 *
 * The backend currently uses:
 * tran-minh-chien as the default portfolio.
 */

export async function getDefaultPortfolio(): Promise<PortfolioData> {
    const api = await createServerApi();

    const response = await api.get<PortfolioResponse>(
        "/api/portfolio/default",
    );
    
    return response.data.data;
}

export async function getPortfolio(
    username: string,
): Promise<PortfolioData> {
    const api = await createServerApi();

    const response = await api.get<PortfolioResponse>(
        `/api/portfolio/${encodeURIComponent(username)}`,
    );

    return response.data.data;
}