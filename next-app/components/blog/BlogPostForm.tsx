"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    createBlogPost,
    updateBlogPost,
    type BlogPost,
    type CreateBlogPostData,
} from "@/services/blog-post-service";

interface BlogPostFormProps {
    open: boolean;
    post: BlogPost | null;
    onClose: () => void;
    onSuccess: () => void | Promise<void>;
}

interface BlogPostFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published_at: string;
}

const initialForm: BlogPostFormData = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    published_at: "",
};

/*
 * Generate slug from title
 *
 * Example:
 * "Học Next.js cơ bản"
 * -> "hoc-nextjs-co-ban"
 */
function generateSlug(title: string): string {
    return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function BlogPostForm({
    open,
    post,
    onClose,
    onSuccess,
}: BlogPostFormProps) {
    const [form, setForm] =
        useState<BlogPostFormData>(initialForm);

    const [saving, setSaving] = useState(false);

    const isEditing = Boolean(post);

    /*
     * Load data when editing
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        if (post) {
            setForm({
                title: post.title ?? "",
                slug: post.slug ?? "",
                excerpt: post.excerpt ?? "",
                content: post.content ?? "",
                cover_image:
                    post.cover_image ?? "",
                published_at: post.published_at
                    ? post.published_at.slice(0, 16)
                    : "",
            });
        } else {
            setForm(initialForm);
        }
    }, [open, post]);

    /*
     * Close with reset
     */
    const handleClose = () => {
        if (saving) {
            return;
        }

        setForm(initialForm);

        onClose();
    };

    /*
     * Change field
     */
    const handleChange = (
        field: keyof BlogPostFormData,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /*
     * Change title
     *
     * Only automatically generate slug
     * when creating a new post.
     *
     * When editing:
     * keep the existing slug.
     */
    const handleTitleChange = (
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            title: value,
            ...(isEditing
                ? {}
                : {
                      slug: generateSlug(value),
                  }),
        }));
    };

    /*
     * Submit
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!form.title.trim()) {
            toast.error("Title is required.");
            return;
        }

        /*
         * Always generate slug from title
         * if slug is empty.
         */
        const slug =
            form.slug.trim() ||
            generateSlug(form.title);

        if (!slug) {
            toast.error(
                "Unable to generate slug from title."
            );
            return;
        }

        try {
            setSaving(true);

            const body: CreateBlogPostData = {
                title: form.title.trim(),
                slug,
                excerpt:
                    form.excerpt.trim() ||
                    undefined,
                content:
                    form.content.trim() ||
                    undefined,
                cover_image:
                    form.cover_image.trim() ||
                    undefined,
                published_at:
                    form.published_at || null,
            };

            if (isEditing && post) {
                await updateBlogPost(
                    post.id,
                    body
                );

                toast.success(
                    "Blog post updated successfully."
                );
            } else {
                await createBlogPost(body);

                toast.success(
                    "Blog post created successfully."
                );
            }

            await onSuccess();

            handleClose();
        } catch (error) {
            console.error(
                "Failed to save blog post:",
                error
            );

            toast.error(
                isEditing
                    ? "Failed to update blog post. Please try again."
                    : "Failed to create blog post. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-4
                py-6
            "
            onMouseDown={(event) => {
                if (
                    event.target ===
                        event.currentTarget &&
                    !saving
                ) {
                    handleClose();
                }
            }}
        >
            <div
                className="
                    flex
                    max-h-[90vh]
                    w-full
                    max-w-2xl
                    flex-col
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow-xl
                "
            >
                {/* Header */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-6
                        py-4
                    "
                >
                    <div>
                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-gray-900
                            "
                        >
                            {isEditing
                                ? "Edit Blog Post"
                                : "Add Blog Post"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {isEditing
                                ? "Update your blog post."
                                : "Create a new blog post."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={saving}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-md
                            text-lg
                            text-gray-400
                            transition-colors
                            hover:bg-gray-100
                            hover:text-gray-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="
                        overflow-y-auto
                        px-6
                        py-5
                    "
                >
                    <div className="space-y-5">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="blog-title"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Title
                            </label>

                            <input
                                id="blog-title"
                                type="text"
                                value={form.title}
                                onChange={(event) =>
                                    handleTitleChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter blog title"
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label
                                htmlFor="blog-slug"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Slug
                            </label>

                            <input
                                id="blog-slug"
                                type="text"
                                value={form.slug}
                                onChange={(event) =>
                                    handleChange(
                                        "slug",
                                        event.target.value
                                    )
                                }
                                placeholder="my-blog-post"
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />

                            <p className="mt-1 text-xs text-gray-400">
                                Slug is generated automatically
                                from the title. You can edit it
                                manually if needed.
                            </p>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label
                                htmlFor="blog-excerpt"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Excerpt
                            </label>

                            <textarea
                                id="blog-excerpt"
                                value={form.excerpt}
                                onChange={(event) =>
                                    handleChange(
                                        "excerpt",
                                        event.target.value
                                    )
                                }
                                placeholder="Short description of the post"
                                rows={3}
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    resize-none
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    leading-6
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label
                                htmlFor="blog-content"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Content
                            </label>

                            <textarea
                                id="blog-content"
                                value={form.content}
                                onChange={(event) =>
                                    handleChange(
                                        "content",
                                        event.target.value
                                    )
                                }
                                placeholder="Write your blog post..."
                                rows={10}
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    resize-y
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    leading-6
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label
                                htmlFor="blog-cover-image"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Cover Image URL
                            </label>

                            <input
                                id="blog-cover-image"
                                type="url"
                                value={
                                    form.cover_image
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "cover_image",
                                        event.target.value
                                    )
                                }
                                placeholder="https://..."
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Published At */}
                        <div>
                            <label
                                htmlFor="blog-published-at"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Published At
                            </label>

                            <input
                                id="blog-published-at"
                                type="datetime-local"
                                value={
                                    form.published_at
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "published_at",
                                        event.target.value
                                    )
                                }
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />

                            <p className="mt-1 text-xs text-gray-400">
                                Leave empty to save this
                                post as a draft.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        className="
                            mt-6
                            flex
                            justify-end
                            gap-3
                            border-t
                            border-gray-100
                            pt-5
                        "
                    >
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={saving}
                            className="
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-gray-700
                                transition-colors
                                hover:bg-gray-50
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                inline-flex
                                min-w-28
                                items-center
                                justify-center
                                rounded-lg
                                bg-primary
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-primary-foreground
                                shadow-sm
                                transition-all
                                hover:bg-primary/90
                                hover:shadow
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {saving
                                ? "Saving..."
                                : isEditing
                                    ? "Update"
                                    : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
