import clientApi from "@/lib/api-client";

export type SkillCategory =
    | "Backend"
    | "Frontend"
    | "Database"
    | "DevOps"
    | "Testing"
    | "Tools"
    | "Other";

export type SkillLevel =
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Expert";

export interface Skill {
    id: string;
    user_id: number;
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    years_of_experience: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateSkillData {
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    years_of_experience: number;
}

export interface UpdateSkillData
    extends CreateSkillData {}

export async function getSkills(): Promise<Skill[]> {
    const { data } = await clientApi.get(
        "/skills"
    );

    return data;
}

export async function getSkill(
    id: string
): Promise<Skill> {
    const { data } = await clientApi.get(
        `/skills/${id}`
    );

    return data;
}

export async function createSkill(
    body: CreateSkillData
): Promise<Skill> {
    const { data } = await clientApi.post(
        "/skills",
        body
    );

    return data;
}

export async function updateSkill(
    id: string,
    body: UpdateSkillData
): Promise<Skill> {
    const { data } = await clientApi.put(
        `/skills/${id}`,
        body
    );

    return data;
}

export async function deleteSkill(
    id: string
): Promise<void> {
    await clientApi.delete(
        `/skills/${id}`
    );
}