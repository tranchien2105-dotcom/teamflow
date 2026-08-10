import clientApi from "@/lib/api-client";

export type CvTemplate =
    | "classic"
    | "modern"
    | "minimal";

export interface CvProfile {
    id: string;
    full_name: string;
    title: string | null;
    bio: string | null;
    avatar_url: string | null;
    cv_url: string | null;
    cv_template: CvTemplate;
    phone: string | null;
    address: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    website_url: string | null;
}

export interface CvSkill {
    id: number;
    name: string;
    category: string | null;
    level: string | null;
    years_of_experience: number | null;
}

export interface CvExperience {
    id: string;
    company: string;
    position: string;
    location: string | null;
    employment_type: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
}

export interface CvEducation {
    id: number;
    school_id: number | null;
    degree: string | null;
    field_of_study: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    school?: {
        id: number;
        name: string;
    } | null;
}

export interface CvProject {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    content: string | null;
    cover_image: string | null;
    github_url: string | null;
    demo_url: string | null;
    featured: boolean;
    status: string | null;
    started_at: string | null;
    completed_at: string | null;

    features?: {
        id: string | number;
        title?: string;
        description?: string | null;
    }[];

    technologies?: {
        id: string | number;
        name: string;
    }[];

    links?: {
        id: string | number;
        label: string;
        url: string;
    }[];
}

export interface CvCertificate {
    id: number;
    name: string;
    organization: string | null;
    credential_id: string | null;
    issue_date: string | null;
    credential_url: string | null;
    description: string | null;
}

export interface CvData {
    profile: CvProfile | null;
    skills: CvSkill[];
    experiences: CvExperience[];
    educations: CvEducation[];
    projects: CvProject[];
    certificates: CvCertificate[];
}

export async function getCv(): Promise<CvData> {
    const response = await clientApi.get<CvData>("/cv");

    return response.data;
}

export async function updateCvTemplate(
    template: CvTemplate
): Promise<{
    message: string;
    template: CvTemplate;
}> {
    const response = await clientApi.put<{
        message: string;
        template: CvTemplate;
    }>("/cv/template", {
        template,
    });

    return response.data;
}