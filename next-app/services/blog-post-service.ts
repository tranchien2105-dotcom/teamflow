import clientApi from "@/lib/api-client";

export type BlogPost = {
    id: string;
    user_id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    cover_image: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export type CreateBlogPostData = {
    title: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    cover_image?: string;
    published_at?: string | null;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
    const { data } = await clientApi.get("/blog");

    return data.data ?? data;
}

export async function getBlogPost(
    id: string
): Promise<BlogPost> {
    const { data } = await clientApi.get(
        `/blog/${id}`
    );

    return data.data ?? data;
}

export async function createBlogPost(
    body: CreateBlogPostData
): Promise<BlogPost> {
    const { data } = await clientApi.post(
        "/blog",
        body
    );

    return data.data ?? data;
}

export async function updateBlogPost(
    id: string,
    body: CreateBlogPostData
): Promise<BlogPost> {
    const { data } = await clientApi.put(
        `/blog/${id}`,
        body
    );

    return data.data ?? data;
}

export async function deleteBlogPost(
    id: string
): Promise<void> {
    await clientApi.delete(`/blog/${id}`);
}

