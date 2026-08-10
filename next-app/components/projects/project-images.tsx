"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProjectImage {
    id: string;
    project_id?: string;
    image_url: string;
    caption: string | null;
    sort_order: number;
}

interface ProjectImagesProps {
    projectId: string;
}

interface ImageFormData {
    image_url: string;
    caption: string;
    sort_order: number;
}

const initialForm: ImageFormData = {
    image_url: "",
    caption: "",
    sort_order: 0,
};

export default function ProjectImages({
    projectId,
}: ProjectImagesProps) {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [images, setImages] = useState<ProjectImage[]>([]);

    const [form, setForm] =
        useState<ImageFormData>(initialForm);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [editingForm, setEditingForm] =
        useState<ImageFormData>(initialForm);

    const [isLoading, setIsLoading] =
        useState(true);

    const [isAdding, setIsAdding] =
        useState(false);

    const [isUpdating, setIsUpdating] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState<string | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Load Images
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!projectId) {
            setIsLoading(false);
            return;
        }

        async function loadImages() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `/api/projects/${projectId}/images`,
                    {
                        cache: "no-store",
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ??
                            "Failed to load project images."
                    );
                }

                setImages(
                    (data.data ?? []).sort(
                        (
                            a: ProjectImage,
                            b: ProjectImage
                        ) =>
                            a.sort_order -
                            b.sort_order
                    )
                );
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Failed to load project images.";

                setError(message);

                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadImages();
    }, [projectId]);

    /*
    |--------------------------------------------------------------------------
    | Add Image
    |--------------------------------------------------------------------------
    */

    async function handleAddImage() {
        const imageUrl =
            form.image_url.trim();

        const caption =
            form.caption.trim();

        if (!imageUrl) {
            toast.error(
                "Please enter an image URL."
            );

            return;
        }

        setIsAdding(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/projects/${projectId}/images`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        image_url: imageUrl,
                        caption:
                            caption || null,
                        sort_order:
                            form.sort_order,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                        "Failed to add project image."
                );
            }

            const newImage =
                data.data as ProjectImage;

            setImages((current) =>
                [
                    ...current,
                    newImage,
                ].sort(
                    (a, b) =>
                        a.sort_order -
                        b.sort_order
                )
            );

            setForm({
                ...initialForm,
                sort_order:
                    images.length + 1,
            });

            toast.success(
                "Project image added successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to add project image.";

            setError(message);

            toast.error(message);
        } finally {
            setIsAdding(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Start Editing
    |--------------------------------------------------------------------------
    */

    function startEditing(
        image: ProjectImage
    ) {
        setEditingId(image.id);

        setEditingForm({
            image_url:
                image.image_url,
            caption:
                image.caption ?? "",
            sort_order:
                image.sort_order,
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Cancel Editing
    |--------------------------------------------------------------------------
    */

    function cancelEditing() {
        setEditingId(null);

        setEditingForm(
            initialForm
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Update Image
    |--------------------------------------------------------------------------
    */

    async function handleUpdateImage(
        imageId: string
    ) {
        const imageUrl =
            editingForm.image_url.trim();

        const caption =
            editingForm.caption.trim();

        if (!imageUrl) {
            toast.error(
                "Image URL is required."
            );

            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/projects/${projectId}/images/${imageId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        image_url:
                            imageUrl,
                        caption:
                            caption || null,
                        sort_order:
                            editingForm.sort_order,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                        "Failed to update project image."
                );
            }

            const updatedImage =
                data.data as ProjectImage;

            setImages((current) =>
                current
                    .map((image) =>
                        image.id ===
                            imageId
                            ? updatedImage
                            : image
                    )
                    .sort(
                        (a, b) =>
                            a.sort_order -
                            b.sort_order
                    )
            );

            cancelEditing();

            toast.success(
                "Project image updated successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update project image.";

            setError(message);

            toast.error(message);
        } finally {
            setIsUpdating(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Image
    |--------------------------------------------------------------------------
    */

    async function handleDeleteImage(
        imageId: string
    ) {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this image?"
            );

        if (!confirmed) {
            return;
        }

        setDeletingId(imageId);
        setError(null);

        try {
            const response = await fetch(
                `/api/projects/${projectId}/images/${imageId}`,
                {
                    method: "DELETE",
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                        "Failed to delete project image."
                );
            }

            setImages((current) =>
                current.filter(
                    (image) =>
                        image.id !==
                        imageId
                )
            );

            if (
                editingId ===
                imageId
            ) {
                cancelEditing();
            }

            toast.success(
                "Project image deleted successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to delete project image.";

            setError(message);

            toast.error(message);
        } finally {
            setDeletingId(null);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* =====================================================
                Header
            ====================================================== */}

            <div className="border-b border-slate-100 px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Project Images
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Add screenshots and
                            other images related
                            to this project.
                        </p>
                    </div>

                    <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-600">
                        {images.length}
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* =================================================
                    Error
                ================================================== */}

                {error && (
                    <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                            !
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-red-700">
                                Something went wrong
                            </p>

                            <p className="mt-1 text-xs text-red-600">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* =================================================
                    Add Image
                ================================================== */}

                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-slate-800">
                            Add New Image
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Add a screenshot,
                            preview, or any
                            other image related
                            to this project.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_1fr_100px_auto]">
                        {/* Image URL */}

                        <div>
                            <label
                                htmlFor="project-image-url"
                                className="mb-2 block text-xs font-medium text-slate-600"
                            >
                                Image URL
                            </label>

                            <input
                                id="project-image-url"
                                type="url"
                                value={
                                    form.image_url
                                }
                                onChange={(
                                    event
                                ) =>
                                    setForm(
                                        (
                                            current
                                        ) => ({
                                            ...current,
                                            image_url:
                                                event
                                                    .target
                                                    .value,
                                        })
                                    )
                                }
                                placeholder="https://example.com/image.png"
                                disabled={
                                    isAdding
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                            />
                        </div>

                        {/* Caption */}

                        <div>
                            <label
                                htmlFor="project-image-caption"
                                className="mb-2 block text-xs font-medium text-slate-600"
                            >
                                Caption
                            </label>

                            <input
                                id="project-image-caption"
                                type="text"
                                value={
                                    form.caption
                                }
                                onChange={(
                                    event
                                ) =>
                                    setForm(
                                        (
                                            current
                                        ) => ({
                                            ...current,
                                            caption:
                                                event
                                                    .target
                                                    .value,
                                        })
                                    )
                                }
                                placeholder="Dashboard screenshot"
                                disabled={
                                    isAdding
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                            />
                        </div>

                        {/* Sort Order */}

                        <div>
                            <label
                                htmlFor="project-image-sort"
                                className="mb-2 block text-xs font-medium text-slate-600"
                            >
                                Order
                            </label>

                            <input
                                id="project-image-sort"
                                type="number"
                                min={0}
                                value={
                                    form.sort_order
                                }
                                onChange={(
                                    event
                                ) =>
                                    setForm(
                                        (
                                            current
                                        ) => ({
                                            ...current,
                                            sort_order:
                                                Number(
                                                    event
                                                        .target
                                                        .value
                                                ),
                                        })
                                    )
                                }
                                disabled={
                                    isAdding
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                            />
                        </div>

                        {/* Add Button */}

                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={
                                    handleAddImage
                                }
                                disabled={
                                    isAdding
                                }
                                className="h-10 w-full rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isAdding
                                    ? "Adding..."
                                    : "+ Add"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    Images
                ================================================== */}

                <div className="mt-6">
                    {/* Loading */}

                    {isLoading ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map(
                                (item) => (
                                    <div
                                        key={
                                            item
                                        }
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                    >
                                        <div className="aspect-video animate-pulse bg-slate-100" />

                                        <div className="space-y-2 p-4">
                                            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />

                                            <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : images.length ===
                      0 ? (
                        /* Empty */

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                                🖼️
                            </div>

                            <h3 className="mt-4 text-sm font-semibold text-slate-800">
                                No project images
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
                                Add screenshots,
                                previews, or
                                other images
                                to showcase
                                your project.
                            </p>
                        </div>
                    ) : (
                        /* Image Grid */

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {images.map(
                                (
                                    image
                                ) => (
                                    <article
                                        key={
                                            image.id
                                        }
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                                    >
                                        {/* =================================================
                                            Image Preview
                                        ================================================== */}

                                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                                            <img
                                                src={
                                                    image.image_url
                                                }
                                                alt={
                                                    image.caption ??
                                                    "Project image"
                                                }
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />

                                            {/* Sort Order */}

                                            <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                                                #
                                                {
                                                    image.sort_order
                                                }
                                            </div>

                                            {/* Delete */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteImage(
                                                        image.id
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    image.id
                                                }
                                                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-slate-600 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                aria-label="Delete image"
                                            >
                                                {deletingId ===
                                                image.id
                                                    ? "..."
                                                    : "×"}
                                            </button>
                                        </div>

                                        {/* =================================================
                                            Content
                                        ================================================== */}

                                        <div className="p-4">
                                            {editingId ===
                                            image.id ? (
                                                /* ================================
                                                   Edit Mode
                                                ================================= */

                                                <div className="space-y-4">
                                                    {/* URL */}

                                                    <div>
                                                        <label
                                                            htmlFor={`edit-image-url-${image.id}`}
                                                            className="mb-2 block text-xs font-medium text-slate-600"
                                                        >
                                                            Image URL
                                                        </label>

                                                        <input
                                                            id={`edit-image-url-${image.id}`}
                                                            type="url"
                                                            value={
                                                                editingForm.image_url
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                setEditingForm(
                                                                    (
                                                                        current
                                                                    ) => ({
                                                                        ...current,
                                                                        image_url:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    })
                                                                )
                                                            }
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                                                        />
                                                    </div>

                                                    {/* Caption */}

                                                    <div>
                                                        <label
                                                            htmlFor={`edit-image-caption-${image.id}`}
                                                            className="mb-2 block text-xs font-medium text-slate-600"
                                                        >
                                                            Caption
                                                        </label>

                                                        <input
                                                            id={`edit-image-caption-${image.id}`}
                                                            type="text"
                                                            value={
                                                                editingForm.caption
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                setEditingForm(
                                                                    (
                                                                        current
                                                                    ) => ({
                                                                        ...current,
                                                                        caption:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    })
                                                                )
                                                            }
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            placeholder="Image caption"
                                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                                                        />
                                                    </div>

                                                    {/* Sort Order */}

                                                    <div>
                                                        <label
                                                            htmlFor={`edit-image-sort-${image.id}`}
                                                            className="mb-2 block text-xs font-medium text-slate-600"
                                                        >
                                                            Order
                                                        </label>

                                                        <input
                                                            id={`edit-image-sort-${image.id}`}
                                                            type="number"
                                                            min={
                                                                0
                                                            }
                                                            value={
                                                                editingForm.sort_order
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                setEditingForm(
                                                                    (
                                                                        current
                                                                    ) => ({
                                                                        ...current,
                                                                        sort_order:
                                                                            Number(
                                                                                event
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                    })
                                                                )
                                                            }
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                                                        />
                                                    </div>

                                                    {/* Buttons */}

                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            onClick={() =>
                                                                handleUpdateImage(
                                                                    image.id
                                                                )
                                                            }
                                                            className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {isUpdating
                                                                ? "Saving..."
                                                                : "Save Changes"}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            onClick={
                                                                cancelEditing
                                                            }
                                                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* ================================
                                                   View Mode
                                                ================================= */

                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-semibold text-slate-800">
                                                            {image.caption ||
                                                                "Untitled image"}
                                                        </p>

                                                        <p className="mt-1 truncate text-xs text-slate-400">
                                                            {
                                                                image.image_url
                                                            }
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startEditing(
                                                                image
                                                            )
                                                        }
                                                        className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}