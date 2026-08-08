import clientApi from "@/lib/api-client";

export interface Experience {
    id: string;
    company: string;
    position: string;
    location: string | null;
    employment_type: string | null;
    start_date: string;
    end_date: string | null;
    description: string | null;
}

export interface CreateExperienceData {
    company: string;
    position: string;
    location?: string;
    employment_type?: string;
    start_date: string;
    end_date?: string | null;
    description?: string;
}

export async function getExperiences() {
    const { data } = await clientApi.get<Experience[]>(
        "/experiences"
    );

    return data;
}

export async function getExperience(id: string) {
    const { data } = await clientApi.get<Experience>(
        `/experiences/${id}`
    );

    return data;
}

export async function createExperience(
    body: CreateExperienceData
) {
    const { data } = await clientApi.post<Experience>(
        "/experiences",
        body
    );

    return data;
}

export async function updateExperience(
    id: string,
    body: CreateExperienceData
) {
    const { data } = await clientApi.put<Experience>(
        `/experiences/${id}`,
        body
    );

    return data;
}

export async function deleteExperience(id: string) {
    await clientApi.delete(
        `/experiences/${id}`
    );
}

