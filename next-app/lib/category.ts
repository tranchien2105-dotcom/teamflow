import api from "@/lib/api-client";

export interface Category {
    id: number;
    name: string;
}

export async function getCategories() {
    const { data } = await api.get<Category[]>("/categories");
    return data;
}