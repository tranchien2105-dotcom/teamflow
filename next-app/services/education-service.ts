import clientApi from "@/lib/api-client";

export type School = {
    id: string;
    name: string;
    short_name: string | null;
    location: string | null;
};

export type Education = {
    id: string;
    school: School;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string | null;
    description: string | null;
};

export type CreateEducationData = {
    school_id: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date?: string;
    description?: string;
};

export async function getSchools(): Promise<School[]> {
    const { data } = await clientApi.get("/schools");

    return data;
}

export async function getEducations(): Promise<Education[]> {
    const { data } = await clientApi.get("/educations");

    return data.data ?? data;
}

export async function getEducation(
    id: string
): Promise<Education> {
    const { data } = await clientApi.get(
        `/educations/${id}`
    );

    return data.data ?? data;
}

export async function createEducation(
    body: CreateEducationData
): Promise<Education> {
    const { data } = await clientApi.post(
        "/educations",
        body
    );

    return data.data ?? data;
}

export async function updateEducation(
    id: string,
    body: CreateEducationData
): Promise<Education> {
    const { data } = await clientApi.put(
        `/educations/${id}`,
        body
    );

    return data.data ?? data;
}

export async function deleteEducation(
    id: string
): Promise<void> {
    await clientApi.delete(`/educations/${id}`);
}