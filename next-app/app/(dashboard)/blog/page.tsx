"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    deleteBlogPost,
    getBlogPosts,
    type BlogPost,
} from "@/services/blog-post-service";
import BlogPostForm from "@/components/blog/BlogPostForm";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] =
        useState<string | null>(null);

    const [isFormOpen, setIsFormOpen] =
        useState(false);

    const [editingPost, setEditingPost] =
        useState<BlogPost | null>(null);

    const [deleteTarget, setDeleteTarget] =
        useState<BlogPost | null>(null);

    /*
     * Check blog post status
     */
    const getPostStatus = (post: BlogPost) => {
        if (!post.published_at) {
            return "Draft";
        }

        const publishedAt = new Date(
            post.published_at
        );

        const now = new Date();

        if (publishedAt > now) {
            return "Scheduled";
        }

        return "Published";
    };

    /*
     * Load blog posts
     */
    async function loadBlogPosts() {
        try {
            const data = await getBlogPosts();

            setPosts(data);
        } catch (error) {
            console.error(
                "Failed to load blog posts:",
                error
            );

            toast.error(
                "Failed to load blog posts."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBlogPosts();
    }, []);

    /*
     * Add
     */
    const handleAdd = () => {
        setEditingPost(null);
        setIsFormOpen(true);
    };

    /*
     * Edit
     */
    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setIsFormOpen(true);
    };

    /*
     * Close form
     */
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingPost(null);
    };

    /*
     * Open delete confirmation
     */
    const handleDeleteClick = (
        post: BlogPost
    ) => {
        setDeleteTarget(post);
    };

    /*
     * Close delete confirmation
     */
    const handleCloseDelete = () => {
        if (deletingId) {
            return;
        }

        setDeleteTarget(null);
    };

    /*
     * Delete
     */
    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeletingId(
                deleteTarget.id
            );

            await deleteBlogPost(
                deleteTarget.id
            );

            setPosts((prev) =>
                prev.filter(
                    (post) =>
                        post.id !==
                        deleteTarget.id
                )
            );

            toast.success(
                "Blog post deleted successfully."
            );

            setDeleteTarget(null);
        } catch (error) {
            console.error(
                "Failed to delete blog post:",
                error
            );

            toast.error(
                "Failed to delete blog post. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    };

    /*
     * Loading
     */
    if (loading) {
        return (
            <div className="mx-auto w-full max-w-5xl space-y-8">
                <div>
                    <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />

                    <div className="mt-2 h-4 w-72 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="
                                h-48
                                animate-pulse
                                rounded-xl
                                border
                                bg-white
                            "
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl space-y-8">
            {/* Header */}
            <div
                className="
                    mt-5
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div>
                    <h1
                        className="
                            text-2xl
                            font-semibold
                            tracking-tight
                            text-gray-900
                        "
                    >
                        Blog
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your blog posts and articles.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                    className="
                        inline-flex
                        h-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-primary
                        px-4
                        text-sm
                        font-medium
                        text-primary-foreground
                        shadow-sm
                        transition-all
                        hover:bg-primary/90
                        hover:shadow
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                        focus:ring-offset-2
                    "
                >
                    + Add Blog Post
                </button>
            </div>

            {/* Empty State */}
            {posts.length === 0 ? (
                <div
                    className="
                        flex
                        min-h-[320px]
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        bg-white
                        px-6
                        text-center
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-100
                            text-xl
                        "
                    >
                        📝
                    </div>

                    <h2 className="text-base font-semibold text-gray-900">
                        No blog posts yet
                    </h2>

                    <p className="mt-1 max-w-sm text-sm text-gray-500">
                        Write your first article to
                        showcase your knowledge and
                        experience.
                    </p>

                    <button
                        type="button"
                        onClick={handleAdd}
                        className="
                            mt-5
                            inline-flex
                            h-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-4
                            text-sm
                            font-medium
                            text-gray-700
                            shadow-sm
                            transition-all
                            hover:bg-gray-50
                            hover:text-gray-900
                            hover:shadow
                        "
                    >
                        Add Blog Post
                    </button>
                </div>
            ) : (
                /* Blog List */
                <div className="space-y-4">
                    {posts.map((post) => {
                        const status =
                            getPostStatus(post);

                        return (
                            <article
                                key={post.id}
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    shadow-sm
                                    transition-all
                                    hover:border-gray-300
                                    hover:shadow-md
                                "
                            >
                                {/* Cover Image */}
                                {post.cover_image && (
                                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={
                                                post.cover_image
                                            }
                                            alt={
                                                post.title
                                            }
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />
                                    </div>
                                )}

                                <div className="p-5">
                                    {/* Top */}
                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            sm:flex-row
                                            sm:items-start
                                            sm:justify-between
                                        "
                                    >
                                        <div className="min-w-0">
                                            <h2
                                                className="
                                                    text-lg
                                                    font-semibold
                                                    leading-6
                                                    text-gray-900
                                                "
                                            >
                                                {post.title}
                                            </h2>

                                            <p
                                                className="
                                                    mt-1
                                                    text-sm
                                                    text-gray-400
                                                "
                                            >
                                                /{post.slug}
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`
                                                inline-flex
                                                shrink-0
                                                rounded-full
                                                border
                                                px-2.5
                                                py-1
                                                text-xs
                                                font-medium
                                                ${
                                                    status ===
                                                    "Published"
                                                        ? "border-green-200 bg-green-50 text-green-700"
                                                        : status ===
                                                            "Scheduled"
                                                          ? "border-blue-200 bg-blue-50 text-blue-700"
                                                          : "border-gray-200 bg-gray-50 text-gray-600"
                                                }
                                            `}
                                        >
                                            {status}
                                        </span>
                                    </div>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <p
                                            className="
                                                mt-4
                                                line-clamp-2
                                                text-sm
                                                leading-6
                                                text-gray-600
                                            "
                                        >
                                            {
                                                post.excerpt
                                            }
                                        </p>
                                    )}

                                    {/* Meta */}
                                    <div
                                        className="
                                            mt-5
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-x-5
                                            gap-y-2
                                            border-t
                                            border-gray-100
                                            pt-4
                                        "
                                    >
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span>
                                                📅
                                            </span>

                                            <span>
                                                {post.published_at
                                                    ? new Date(
                                                          post.published_at
                                                      ).toLocaleString()
                                                    : "Not published"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span>
                                                🕒
                                            </span>

                                            <span>
                                                Created{" "}
                                                {new Date(
                                                    post.created_at
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div
                                        className="
                                            mt-5
                                            flex
                                            items-center
                                            justify-end
                                            gap-2
                                            border-t
                                            border-gray-100
                                            pt-4
                                        "
                                    >
                                        {/* Edit */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    post
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                post.id
                                            }
                                            className="
                                                rounded-md
                                                border
                                                border-gray-200
                                                bg-white
                                                px-3
                                                py-1.5
                                                text-sm
                                                font-medium
                                                text-gray-700
                                                shadow-sm
                                                transition-all
                                                hover:bg-gray-50
                                                hover:text-gray-900
                                                hover:shadow
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >
                                            Edit
                                        </button>

                                        {/* Delete */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteClick(
                                                    post
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                post.id
                                            }
                                            className="
                                                rounded-md
                                                border
                                                border-red-200
                                                bg-white
                                                px-3
                                                py-1.5
                                                text-sm
                                                font-medium
                                                text-red-600
                                                shadow-sm
                                                transition-all
                                                hover:bg-red-50
                                                hover:text-red-700
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >
                                            {deletingId ===
                                                post.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            {/* Add / Edit Form */}
            <BlogPostForm
                open={isFormOpen}
                post={editingPost}
                onClose={handleCloseForm}
                onSuccess={loadBlogPosts}
            />

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[60]
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        px-4
                    "
                    onMouseDown={(e) => {
                        if (
                            e.target ===
                                e.currentTarget &&
                            !deletingId
                        ) {
                            handleCloseDelete();
                        }
                    }}
                >
                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-xl
                            bg-white
                            p-6
                            shadow-xl
                        "
                    >
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                bg-red-50
                                text-lg
                            "
                        >
                            ⚠️
                        </div>

                        <h2
                            className="
                                mt-4
                                text-lg
                                font-semibold
                                text-gray-900
                            "
                        >
                            Delete blog post?
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-gray-500
                            "
                        >
                            Are you sure you want to
                            delete{" "}
                            <span className="font-medium text-gray-700">
                                {deleteTarget.title}
                            </span>
                            ? This action cannot be
                            undone.
                        </p>

                        <div
                            className="
                                mt-6
                                flex
                                justify-end
                                gap-3
                            "
                        >
                            <button
                                type="button"
                                onClick={
                                    handleCloseDelete
                                }
                                disabled={Boolean(
                                    deletingId
                                )}
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
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleDelete
                                }
                                disabled={Boolean(
                                    deletingId
                                )}
                                className="
                                    rounded-lg
                                    bg-red-600
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    shadow-sm
                                    hover:bg-red-700
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                {deletingId
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
