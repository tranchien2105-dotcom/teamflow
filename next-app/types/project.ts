import type { Technology } from "@/types/technology";
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
    created_at: string;
    updated_at: string;
    technologies?: Technology[];
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface ProjectTechnology {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
}

export interface ProjectFeature {
    id: string;
    title: string;
    description: string | null;
    sort_order: number;
}

export interface ProjectImage {
    id: string;
    image_url: string;
    caption: string | null;
    sort_order: number;
}

export interface ProjectLink {
    id: string;
    label: string;
    url: string;
    type: string | null;
    sort_order: number;
}

export interface ProjectDetail extends Project {
    features: ProjectFeature[];
    images: ProjectImage[];
    links: ProjectLink[];
    technologies: ProjectTechnology[];
}