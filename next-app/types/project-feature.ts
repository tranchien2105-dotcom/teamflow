export interface ProjectFeature {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
}