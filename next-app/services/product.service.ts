import clientApi from "../lib/api-client";

export interface GetProductsParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
}

export async function getProducts(params?: GetProductsParams) {
    const { data } = await clientApi.get("/products", {
        params,
    });

    return data;
}

export async function getProduct(id: number) {
    const { data } = await clientApi.get(`/products/${id}`);
    return data;
}

export async function createProduct(body: any) {
    const { data } = await clientApi.post("/products", body);
    return data;
}

export async function updateProduct(id: number, body: any) {
    const { data } = await clientApi.put(`/products/${id}`, body);
    return data;
}

export async function deleteProduct(id: number) {
    const { data } = await clientApi.delete(`/products/${id}`);
    return data;
}