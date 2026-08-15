import { createServerApi } from "@/lib/server-axios";
import type {
    PaginatedResponse,
    Project,
    ProjectDetail,
} from "@/types/project";

export interface ProjectFeature {
    id: number;
    title: string;
    description: string | null;
}

export interface ProjectImage {
    id: number;
    image_url: string;
    caption: string | null;
}

export interface Technology {
    id: number;
    name: string;
    category?: string | null;
}

export interface ProjectLink {
    id: number;
    label: string;
    url: string;
}

export interface PublicProject {
    id: number;
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

    created_at: string;
    updated_at: string;
}

export async function getProjects(): Promise<
    PaginatedResponse<Project>
> {
    const api = await createServerApi();

    const { data } = await api.get<PaginatedResponse<Project>>(
        "/api/projects"
    );

    return data;
}

export async function getProject(
    id: string
): Promise<ProjectDetail> {
    const api = await createServerApi();

    const { data } = await api.get<{
        data: ProjectDetail;
    }>(`/api/projects/${id}`);

    return data.data;
}

export async function getPublicProject(
    slug: string
): Promise<PublicProject> {
    const api = await createServerApi();

    const { data } = await api.get<{
        data: PublicProject;
    }>(
        `/api/portfolio/projects/${encodeURIComponent(slug)}`
    );

    return data.data;
}