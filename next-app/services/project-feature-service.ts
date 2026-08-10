import { createServerApi } from "@/lib/server-axios";
import type { ProjectFeature } from "@/types/project-feature";

interface ProjectFeaturesResponse {
    data: ProjectFeature[];
}

interface ProjectFeatureResponse {
    message?: string;
    data: ProjectFeature;
}

export async function getProjectFeatures(
    projectId: string
): Promise<ProjectFeature[]> {
    const api = await createServerApi();

    const { data } =
        await api.get<ProjectFeaturesResponse>(
            `/api/projects/${projectId}/features`
        );

    return data.data;
}