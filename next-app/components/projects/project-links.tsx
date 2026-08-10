"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProjectLink {
    id: string;
    project_id?: string;
    label: string;
    url: string;
    type: string | null;
    sort_order: number;
}

interface ProjectLinksProps {
    projectId: string;
}

interface LinkFormData {
    label: string;
    url: string;
    type: string;
    sort_order: number;
}

const initialForm: LinkFormData = {
    label: "",
    url: "",
    type: "",
    sort_order: 0,
};

export default function ProjectLinks({
    projectId,
}: ProjectLinksProps) {
    const [links, setLinks] = useState<ProjectLink[]>([]);


    const [form, setForm] =
        useState<LinkFormData>(initialForm);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [editingForm, setEditingForm] =
        useState<LinkFormData>(initialForm);

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
    | Load Links
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!projectId) {
            setIsLoading(false);
            return;
        }

        async function loadLinks() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `/api/projects/${projectId}/links`,
                    {
                        cache: "no-store",
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ??
                        "Failed to load project links."
                    );
                }

                const loadedLinks =
                    (data.data ?? []) as ProjectLink[];

                setLinks(
                    [...loadedLinks].sort(
                        (a, b) =>
                            a.sort_order -
                            b.sort_order
                    )
                );
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Failed to load project links.";

                setError(message);

                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadLinks();
    }, [projectId]);

    /*
    |--------------------------------------------------------------------------
    | Add Link
    |--------------------------------------------------------------------------
    */

    async function handleAddLink() {
        const label =
            form.label.trim();

        const url =
            form.url.trim();

        const type =
            form.type.trim();

        if (!label) {
            toast.error(
                "Please enter a link label."
            );

            return;
        }

        if (!url) {
            toast.error(
                "Please enter a URL."
            );

            return;
        }

        if (!projectId) {
            toast.error(
                "Project ID is missing."
            );

            return;
        }

        setIsAdding(true);
        setError(null);

        try {
            const nextSortOrder =
                links.length > 0
                    ? Math.max(
                        ...links.map(
                            (link) =>
                                link.sort_order
                        )
                    ) + 1
                    : 0;

            const response =
                await fetch(
                    `/api/projects/${projectId}/links`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            label,
                            url,
                            type:
                                type || null,
                            sort_order:
                                form.sort_order ??
                                nextSortOrder,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    "Failed to add project link."
                );
            }

            const newLink =
                data.data as ProjectLink;

            setLinks((current) =>
                [
                    ...current,
                    newLink,
                ].sort(
                    (a, b) =>
                        a.sort_order -
                        b.sort_order
                )
            );

            setForm({
                ...initialForm,
                sort_order:
                    nextSortOrder + 1,
            });

            toast.success(
                "Project link added successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to add project link.";

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
        link: ProjectLink
    ) {
        setEditingId(link.id);

        setEditingForm({
            label: link.label,
            url: link.url,
            type: link.type ?? "",
            sort_order:
                link.sort_order,
        });

        setError(null);
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
    | Update Link
    |--------------------------------------------------------------------------
    */

    async function handleUpdateLink(
        linkId: string
    ) {
        const label =
            editingForm.label.trim();

        const url =
            editingForm.url.trim();

        const type =
            editingForm.type.trim();

        if (!label) {
            toast.error(
                "Link label is required."
            );

            return;
        }

        if (!url) {
            toast.error(
                "URL is required."
            );

            return;
        }

        if (!projectId) {
            toast.error(
                "Project ID is missing."
            );

            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response =
                await fetch(
                    `/api/projects/${projectId}/links/${linkId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            label,
                            url,
                            type:
                                type ||
                                null,
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
                    "Failed to update project link."
                );
            }

            const updatedLink =
                data.data as ProjectLink;

            setLinks((current) =>
                current
                    .map((link) =>
                        link.id ===
                            linkId
                            ? updatedLink
                            : link
                    )
                    .sort(
                        (a, b) =>
                            a.sort_order -
                            b.sort_order
                    )
            );

            cancelEditing();

            toast.success(
                "Project link updated successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update project link.";

            setError(message);

            toast.error(message);
        } finally {
            setIsUpdating(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Link
    |--------------------------------------------------------------------------
    */

    async function handleDeleteLink(
        linkId: string
    ) {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this link?"
            );

        if (!confirmed) {
            return;
        }

        if (!projectId) {
            toast.error(
                "Project ID is missing."
            );

            return;
        }

        setDeletingId(linkId);
        setError(null);

        try {
            const response =
                await fetch(
                    `/api/projects/${projectId}/links/${linkId}`,
                    {
                        method: "DELETE",
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    "Failed to delete project link."
                );
            }

            setLinks((current) =>
                current.filter(
                    (link) =>
                        link.id !==
                        linkId
                )
            );

            if (
                editingId ===
                linkId
            ) {
                cancelEditing();
            }

            toast.success(
                "Project link deleted successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to delete project link.";

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

            {/* Header */}

            <div className="border-b border-slate-100 px-6 py-5">
                <div className="flex items-center justify-between gap-4">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Project Links
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Add GitHub repositories, live demos, or other
                            project-related links.
                        </p>
                    </div>

                    <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-600">
                        {links.length}
                    </div>

                </div>
            </div>

            <div className="p-6">

                {/* Error */}

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

                {/* Add Link */}

                {/*
                IMPORTANT:
                Do NOT use <form> here because ProjectLinks
                is already rendered inside ProjectForm's <form>.
            */}

                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5">

                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-slate-800">
                            Add New Link
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Add a repository, live demo, portfolio, or other
                            useful project link.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_1fr_140px_100px_auto]">

                        {/* Label */}

                        <div>
                            <label
                                htmlFor="project-link-label"
                                className="mb-2 block text-xs font-medium text-slate-600"
                            >
                                Label
                            </label>

                            <input
                                id="project-link-label"
                                type="text"
                                value={
                                    form.label
                                }
                                onChange={(
                                    event
                                ) =>
                                    setForm(
                                        (
                                            current
                                        ) => ({
                                            ...current,
                                            label: event
                                                .target
                                                .value,
                                        })
                                    )
                                }
                                placeholder="GitHub"
                                disabled={
                                    isAdding
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                            />
                        </div>

                        {/* URL */}

                        <div>
                            <label
                                htmlFor="project-link-url"
                                className="mb-2 block text-xs font-medium text-slate-600"
                            >
                                URL
                            </label>

                            <input
                                id="project-link-url"
                                type="url"
                                value={
                                    form.url
                                }
                                onChange={(
                                    event
                                ) =>
                                    setForm(
                                        (
                                            current
                                        ) => ({
                                            ...current,
                                            url: event
                                                .target
                                                .value,
                                        })
                                    )
                                }
                                placeholder="https://github.com/..."
                                disabled={
                                    isAdding
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                            />
                        </div>

                        {/* Type */}

                        <div>
                            <label
                                htmlFor="project-link-type"
                                className="mb-2 block text-xs font-medium text-slate-600"
                            >
                                Type
                            </label>

                            <input
                                id="project-link-type"
                                type="text"
                                value={
                                    form.type
                                }
                                onChange={(
                                    event
                                ) =>
                                    setForm(
                                        (
                                            current
                                        ) => ({
                                            ...current,
                                            type: event
                                                .target
                                                .value,
                                        })
                                    )
                                }
                                placeholder="github"
                                disabled={
                                    isAdding
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                            />
                        </div>

                        {/* Sort Order */}

                        <div>
                            <label
                                htmlFor="project-link-sort"
                                className="mb-2 block text-xs font-medium text-slate-600"
                            >
                                Order
                            </label>

                            <input
                                id="project-link-sort"
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
                                    handleAddLink
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

                {/* Links */}

                <div className="mt-6">

                    {/* Loading */}

                    {isLoading ? (
                        <div className="space-y-3">

                            {[1, 2, 3].map(
                                (item) => (
                                    <div
                                        key={
                                            item
                                        }
                                        className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
                                    >
                                        <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-100" />

                                        <div className="flex-1 space-y-2">

                                            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />

                                            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />

                                        </div>
                                    </div>
                                )
                            )}

                        </div>
                    ) : links.length === 0 ? (

                        /* Empty */

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                                🔗
                            </div>

                            <h3 className="mt-4 text-sm font-semibold text-slate-800">
                                No project links
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
                                Add GitHub repositories, live demos, or other
                                links to showcase your project.
                            </p>

                        </div>

                    ) : (

                        /* Link List */

                        <div className="space-y-3">

                            {links.map(
                                (link) => (
                                    <article
                                        key={
                                            link.id
                                        }
                                        className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                    >

                                        {editingId ===
                                            link.id ? (

                                            /* Edit Mode */

                                            <div className="space-y-4">

                                                <div className="grid gap-4 md:grid-cols-2">

                                                    {/* Label */}

                                                    <div>
                                                        <label
                                                            htmlFor={`edit-link-label-${link.id}`}
                                                            className="mb-2 block text-xs font-medium text-slate-600"
                                                        >
                                                            Label
                                                        </label>

                                                        <input
                                                            id={`edit-link-label-${link.id}`}
                                                            type="text"
                                                            value={
                                                                editingForm.label
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                setEditingForm(
                                                                    (
                                                                        current
                                                                    ) => ({
                                                                        ...current,
                                                                        label: event
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

                                                    {/* URL */}

                                                    <div>
                                                        <label
                                                            htmlFor={`edit-link-url-${link.id}`}
                                                            className="mb-2 block text-xs font-medium text-slate-600"
                                                        >
                                                            URL
                                                        </label>

                                                        <input
                                                            id={`edit-link-url-${link.id}`}
                                                            type="url"
                                                            value={
                                                                editingForm.url
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                setEditingForm(
                                                                    (
                                                                        current
                                                                    ) => ({
                                                                        ...current,
                                                                        url: event
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

                                                    {/* Type */}

                                                    <div>
                                                        <label
                                                            htmlFor={`edit-link-type-${link.id}`}
                                                            className="mb-2 block text-xs font-medium text-slate-600"
                                                        >
                                                            Type
                                                        </label>

                                                        <input
                                                            id={`edit-link-type-${link.id}`}
                                                            type="text"
                                                            value={
                                                                editingForm.type
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                setEditingForm(
                                                                    (
                                                                        current
                                                                    ) => ({
                                                                        ...current,
                                                                        type: event
                                                                            .target
                                                                            .value,
                                                                    })
                                                                )
                                                            }
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            placeholder="github"
                                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-100"
                                                        />
                                                    </div>

                                                    {/* Sort Order */}

                                                    <div>
                                                        <label
                                                            htmlFor={`edit-link-sort-${link.id}`}
                                                            className="mb-2 block text-xs font-medium text-slate-600"
                                                        >
                                                            Order
                                                        </label>

                                                        <input
                                                            id={`edit-link-sort-${link.id}`}
                                                            type="number"
                                                            min={0}
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

                                                </div>

                                                {/* Buttons */}

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isUpdating
                                                        }
                                                        onClick={
                                                            cancelEditing
                                                        }
                                                        className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isUpdating
                                                        }
                                                        onClick={() =>
                                                            handleUpdateLink(
                                                                link.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {isUpdating
                                                            ? "Saving..."
                                                            : "Save Changes"}
                                                    </button>

                                                </div>

                                            </div>

                                        ) : (

                                            /* View Mode */

                                            <div className="flex items-center gap-4">

                                                {/* Icon */}

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg">
                                                    🔗
                                                </div>

                                                {/* Content */}

                                                <div className="min-w-0 flex-1">

                                                    <div className="flex items-center gap-2">

                                                        <p className="truncate text-sm font-semibold text-slate-800">
                                                            {
                                                                link.label
                                                            }
                                                        </p>

                                                        {link.type && (
                                                            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                                                {
                                                                    link.type
                                                                }
                                                            </span>
                                                        )}

                                                    </div>

                                                    <a
                                                        href={
                                                            link.url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-1 block truncate text-xs text-slate-400 transition hover:text-slate-700 hover:underline"
                                                    >
                                                        {
                                                            link.url
                                                        }
                                                    </a>

                                                </div>

                                                {/* Order */}

                                                <div className="hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 sm:block">
                                                    #
                                                    {
                                                        link.sort_order
                                                    }
                                                </div>

                                                {/* Actions */}

                                                <div className="flex shrink-0 gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startEditing(
                                                                link
                                                            )
                                                        }
                                                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteLink(
                                                                link.id
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            link.id
                                                        }
                                                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {deletingId ===
                                                            link.id
                                                            ? "..."
                                                            : "Delete"}
                                                    </button>

                                                </div>

                                            </div>
                                        )}

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
