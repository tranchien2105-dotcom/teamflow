import { createServerApi } from "@/lib/server-axios";
import type { PaginatedResponse, Project, ProjectDetail } from "@/types/project";

export async function getProjects(): Promise<PaginatedResponse<Project>> {
    const api = await createServerApi();

    const { data } = await api.get<PaginatedResponse<Project>>(
        "/api/projects"
    );

    return data;
}

export async function getProject(id: string): Promise<ProjectDetail> {
    const api = await createServerApi();

    const { data } = await api.get<{ data: ProjectDetail }>(
        `/api/projects/${id}`
    );

    return data.data;
}

