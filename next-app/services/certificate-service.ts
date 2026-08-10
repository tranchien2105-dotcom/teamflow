import clientApi from "@/lib/api-client";

export type Certificate = {
    id: number;
    user_id: number;
    name: string;
    organization: string | null;
    credential_id: string | null;
    issue_date: string | null;
    credential_url: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
};

export type CreateCertificateData = {
    name: string;
    organization?: string;
    credential_id?: string;
    issue_date?: string | null;
    credential_url?: string;
    description?: string;
};

/*
 * Get all certificates
 */
export async function getCertificates(): Promise<Certificate[]> {
    const { data } = await clientApi.get(
        "/certificates"
    );

    return data.data ?? data;
}

/*
 * Get single certificate
 */
export async function getCertificate(
    id: number
): Promise<Certificate> {
    const { data } = await clientApi.get(
        `/certificates/${id}`
    );

    return data.data ?? data;
}

/*
 * Create certificate
 */
export async function createCertificate(
    body: CreateCertificateData
): Promise<Certificate> {
    const { data } = await clientApi.post(
        "/certificates",
        body
    );

    return data.data ?? data;
}

/*
 * Update certificate
 */
export async function updateCertificate(
    id: number,
    body: CreateCertificateData
): Promise<Certificate> {
    const { data } = await clientApi.put(
        `/certificates/${id}`,
        body
    );

    return data.data ?? data;
}

/*
 * Delete certificate
 */
export async function deleteCertificate(
    id: number
): Promise<void> {
    await clientApi.delete(
        `/certificates/${id}`
    );
}
