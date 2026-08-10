import { createServerApi } from "@/lib/server-axios";
import type { Technology } from "@/types/technology";

export async function getTechnologies(): Promise<Technology[]> {
    const api = await createServerApi();

    const { data } = await api.get<{
        data: Technology[];
    }>("/api/technologies");

    return data.data;
}

export async function getTechnology(
    id: string
): Promise<Technology> {
    const api = await createServerApi();

    const { data } = await api.get<{
        data: Technology;
    }>(`/api/technologies/${id}`);

    return data.data;
}