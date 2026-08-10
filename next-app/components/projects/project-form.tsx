"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Project } from "@/types/project";
import type { Technology } from "@/types/technology";

import ProjectImages from "./project-images";
import ProjectLinks from "./project-links";

interface ProjectFormData {
    title: string;
    slug: string;
    summary: string;
    content: string;
    cover_image: string;
    github_url: string;
    demo_url: string;
    featured: boolean;
    status: string;
    started_at: string;
    completed_at: string;
}

interface ProjectFeature {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    sort_order: number;
}

interface ProjectFormProps {
    mode?: "create" | "edit";
    project?: Project;
}

const initialForm: ProjectFormData = {
    title: "",
    slug: "",
    summary: "",
    content: "",
    cover_image: "",
    github_url: "",
    demo_url: "",
    featured: false,
    status: "draft",
    started_at: "",
    completed_at: "",
};

function projectToForm(
    project: Project
): ProjectFormData {
    return {
        title: project.title ?? "",
        slug: project.slug ?? "",
        summary: project.summary ?? "",
        content: project.content ?? "",
        cover_image: project.cover_image ?? "",
        github_url: project.github_url ?? "",
        demo_url: project.demo_url ?? "",
        featured: Boolean(project.featured),
        status: project.status ?? "draft",
        started_at: project.started_at
            ? project.started_at.substring(0, 10)
            : "",
        completed_at: project.completed_at
            ? project.completed_at.substring(0, 10)
            : "",
    };
}

export default function ProjectForm({
    mode = "create",
    project,
}: ProjectFormProps) {
    const router = useRouter();

    /*
    |--------------------------------------------------------------------------
    | Project Form
    |--------------------------------------------------------------------------
    */

    const [form, setForm] =
        useState<ProjectFormData>(
            project
                ? projectToForm(project)
                : initialForm
        );

    /*
    |--------------------------------------------------------------------------
    | Technologies
    |--------------------------------------------------------------------------
    */

    const [technologies, setTechnologies] =
        useState<Technology[]>([]);

    const [
        selectedTechnologyIds,
        setSelectedTechnologyIds,
    ] = useState<string[]>(
        project?.technologies?.map(
            (technology: Technology) =>
                technology.id
        ) ?? []
    );

    /*
    |--------------------------------------------------------------------------
    | Features
    |--------------------------------------------------------------------------
    */

    const [features, setFeatures] =
        useState<ProjectFeature[]>([]);

    const [newFeatureTitle, setNewFeatureTitle] =
        useState("");

    const [
        newFeatureDescription,
        setNewFeatureDescription,
    ] = useState("");

    const [editingFeatureId, setEditingFeatureId] =
        useState<string | null>(null);

    const [
        editingFeatureTitle,
        setEditingFeatureTitle,
    ] = useState("");

    const [
        editingFeatureDescription,
        setEditingFeatureDescription,
    ] = useState("");

    const [isFeatureLoading, setIsFeatureLoading] =
        useState(false);

    const [isAddingFeature, setIsAddingFeature] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Form State
    |--------------------------------------------------------------------------
    */

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [validationErrors, setValidationErrors] =
        useState<Record<string, string[]>>({});

    const isEdit = mode === "edit";

    /*
    |--------------------------------------------------------------------------
    | Load Technologies
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        async function loadTechnologies() {
            try {
                const response = await fetch(
                    "/api/technologies",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load technologies."
                    );
                }

                const result =
                    await response.json();

                setTechnologies(
                    result.data ?? result
                );
            } catch (error) {
                console.error(
                    "Failed to load technologies:",
                    error
                );

                toast.error(
                    "Failed to load technologies."
                );
            }
        }

        loadTechnologies();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Load Features
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!project?.id) {
            setFeatures([]);
            return;
        }

        async function loadFeatures() {
            setIsFeatureLoading(true);

            try {
                if (!project?.id) {
                    return;
                }

                const response = await fetch(
                    `/api/projects/${project.id}/features`,
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load project features."
                    );
                }

                const result =
                    await response.json();

                setFeatures(
                    result.data ?? []
                );
            } catch (error) {
                console.error(
                    "Failed to load features:",
                    error
                );

                toast.error(
                    "Failed to load project features."
                );
            } finally {
                setIsFeatureLoading(false);
            }
        }

        loadFeatures();
    }, [project?.id]);

    /*
    |--------------------------------------------------------------------------
    | Sync Project When Edit Data Changes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (project) {
            setForm(projectToForm(project));

            setSelectedTechnologyIds(
                project.technologies?.map(
                    (technology: Technology) =>
                        technology.id
                ) ?? []
            );
        }
    }, [project]);

    /*
    |--------------------------------------------------------------------------
    | Form Change
    |--------------------------------------------------------------------------
    */

    function handleChange(
        field: keyof ProjectFormData,
        value: string | boolean
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        if (validationErrors[field]) {
            setValidationErrors((current) => {
                const updated = {
                    ...current,
                };

                delete updated[field];

                return updated;
            });
        }

        if (error) {
            setError(null);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Technology Selection
    |--------------------------------------------------------------------------
    */

    function toggleTechnology(
        technologyId: string
    ) {
        setSelectedTechnologyIds((current) => {
            if (
                current.includes(
                    technologyId
                )
            ) {
                return current.filter(
                    (id) =>
                        id !== technologyId
                );
            }

            return [
                ...current,
                technologyId,
            ];
        });
    }

    function clearTechnologies() {
        setSelectedTechnologyIds([]);
    }

    /*
    |--------------------------------------------------------------------------
    | Add Feature
    |--------------------------------------------------------------------------
    */

    async function addFeature() {
        if (!project?.id) {
            toast.error(
                "Create the project first before adding features."
            );

            return;
        }

        const title =
            newFeatureTitle.trim();

        const description =
            newFeatureDescription.trim();

        if (!title) {
            toast.error(
                "Feature title is required."
            );

            return;
        }

        setIsAddingFeature(true);

        try {
            const response = await fetch(
                `/api/projects/${project.id}/features`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        description:
                            description ||
                            null,
                        sort_order:
                            features.length,
                    }),
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ??
                    "Failed to create feature."
                );
            }

            setFeatures((current) => [
                ...current,
                result.data,
            ]);

            setNewFeatureTitle("");
            setNewFeatureDescription("");

            toast.success(
                "Feature added successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to create feature.";

            toast.error(message);
        } finally {
            setIsAddingFeature(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Start Editing Feature
    |--------------------------------------------------------------------------
    */

    function startEditingFeature(
        feature: ProjectFeature
    ) {
        setEditingFeatureId(
            feature.id
        );

        setEditingFeatureTitle(
            feature.title
        );

        setEditingFeatureDescription(
            feature.description ?? ""
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Cancel Editing Feature
    |--------------------------------------------------------------------------
    */

    function cancelEditingFeature() {
        setEditingFeatureId(null);
        setEditingFeatureTitle("");
        setEditingFeatureDescription("");
    }

    /*
    |--------------------------------------------------------------------------
    | Update Feature
    |--------------------------------------------------------------------------
    */

    async function updateFeature(
        featureId: string
    ) {
        if (!project?.id) {
            return;
        }

        const title =
            editingFeatureTitle.trim();

        const description =
            editingFeatureDescription.trim();

        if (!title) {
            toast.error(
                "Feature title is required."
            );

            return;
        }

        try {
            const response = await fetch(
                `/api/projects/${project.id}/features/${featureId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        description:
                            description ||
                            null,
                    }),
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ??
                    "Failed to update feature."
                );
            }

            setFeatures((current) =>
                current.map(
                    (feature) =>
                        feature.id ===
                            featureId
                            ? result.data
                            : feature
                )
            );

            cancelEditingFeature();

            toast.success(
                "Feature updated successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update feature.";

            toast.error(message);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Feature
    |--------------------------------------------------------------------------
    */

    async function deleteFeature(
        featureId: string
    ) {
        if (!project?.id) {
            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this feature?"
            );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `/api/projects/${project.id}/features/${featureId}`,
                {
                    method: "DELETE",
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ??
                    "Failed to delete feature."
                );
            }

            setFeatures((current) =>
                current.filter(
                    (feature) =>
                        feature.id !==
                        featureId
                )
            );

            if (
                editingFeatureId ===
                featureId
            ) {
                cancelEditingFeature();
            }

            toast.success(
                "Feature deleted successfully."
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to delete feature.";

            toast.error(message);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Submit Project
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);
        setError(null);
        setValidationErrors({});

        try {
            /*
            |--------------------------------------------------------------------------
            | Validate Edit Project ID
            |--------------------------------------------------------------------------
            */

            if (
                isEdit &&
                !project?.id
            ) {
                throw new Error(
                    "Project ID is missing."
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Create / Update Project
            |--------------------------------------------------------------------------
            */

            const url = isEdit
                ? `/api/projects/${project?.id}`
                : "/api/projects";

            const response = await fetch(
                url,
                {
                    method: isEdit
                        ? "PUT"
                        : "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        form
                    ),
                }
            );

            const data =
                await response.json();

            /*
            |--------------------------------------------------------------------------
            | Validation Error
            |--------------------------------------------------------------------------
            */

            if (!response.ok) {
                if (
                    response.status ===
                    422
                ) {
                    setValidationErrors(
                        data.errors ?? {}
                    );

                    return;
                }

                throw new Error(
                    data.message ||
                    `Failed to ${isEdit
                        ? "update"
                        : "create"
                    } project.`
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Get Project ID
            |--------------------------------------------------------------------------
            */

            const projectId =
                data.data?.id ??
                project?.id;

            if (!projectId) {
                throw new Error(
                    "Project ID was not returned."
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Sync Technologies
            |--------------------------------------------------------------------------
            */

            const technologyResponse =
                await fetch(
                    `/api/projects/${projectId}/technologies`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(
                            {
                                technology_ids:
                                    selectedTechnologyIds,
                            }
                        ),
                    }
                );

            const technologyData =
                await technologyResponse.json();

            if (
                !technologyResponse.ok
            ) {
                throw new Error(
                    technologyData.message ??
                    "Failed to update project technologies."
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Success
            |--------------------------------------------------------------------------
            */

            toast.success(
                isEdit
                    ? "Project updated successfully."
                    : "Project created successfully."
            );

            router.push(
                `/projects/${projectId}`
            );

            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong.";

            setError(message);

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Input Classes
    |--------------------------------------------------------------------------
    */

    function getInputClass(
        field: keyof ProjectFormData
    ) {
        return `
            h-11 w-full rounded-lg border bg-white
            px-3 text-sm text-slate-900
            outline-none transition
            placeholder:text-slate-400
            ${validationErrors[field]
                ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                : "border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            }
        `;
    }

    function getTextareaClass(
        field: keyof ProjectFormData
    ) {
        return `
            w-full rounded-lg border bg-white
            px-3 py-3 text-sm text-slate-900
            outline-none transition
            placeholder:text-slate-400
            ${validationErrors[field]
                ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                : "border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            }
        `;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* =====================================================
                General Error
            ====================================================== */}

            {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-semibold">
                        !
                    </div>

                    <div>
                        <p className="text-sm font-semibold">
                            {isEdit
                                ? "Unable to update project"
                                : "Unable to create project"}
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                </div>
            )}

            {/* =====================================================
                Basic Information
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Basic information about your project.
                    </p>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    {/* Title */}

                    <div className="space-y-2">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium text-slate-700"
                        >
                            Project Title
                        </label>

                        <input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={(event) =>
                                handleChange(
                                    "title",
                                    event.target.value
                                )
                            }
                            placeholder="e.g. TeamFlow"
                            className={getInputClass(
                                "title"
                            )}
                        />

                        {validationErrors.title && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .title[0]
                                }
                            </p>
                        )}
                    </div>

                    {/* Slug */}

                    <div className="space-y-2">
                        <label
                            htmlFor="slug"
                            className="text-sm font-medium text-slate-700"
                        >
                            Slug
                        </label>

                        <input
                            id="slug"
                            name="slug"
                            value={form.slug}
                            onChange={(event) =>
                                handleChange(
                                    "slug",
                                    event.target.value
                                )
                            }
                            placeholder="teamflow"
                            className={getInputClass(
                                "slug"
                            )}
                        />

                        <p className="text-xs text-slate-400">
                            Used in the project URL.
                        </p>

                        {validationErrors.slug && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .slug[0]
                                }
                            </p>
                        )}
                    </div>

                    {/* Summary */}

                    <div className="space-y-2 md:col-span-2">
                        <label
                            htmlFor="summary"
                            className="text-sm font-medium text-slate-700"
                        >
                            Summary
                        </label>

                        <textarea
                            id="summary"
                            name="summary"
                            value={form.summary}
                            onChange={(event) =>
                                handleChange(
                                    "summary",
                                    event.target.value
                                )
                            }
                            placeholder="Briefly describe what this project does..."
                            rows={3}
                            className={`${getTextareaClass(
                                "summary"
                            )} resize-none`}
                        />

                        {validationErrors.summary && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .summary[0]
                                }
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                Project Details
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Project Details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Describe the project and its main purpose.
                    </p>
                </div>

                <div className="p-6">
                    <label
                        htmlFor="content"
                        className="text-sm font-medium text-slate-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="content"
                        name="content"
                        value={form.content}
                        onChange={(event) =>
                            handleChange(
                                "content",
                                event.target.value
                            )
                        }
                        placeholder="Write a detailed description of your project..."
                        rows={8}
                        className={`${getTextareaClass(
                            "content"
                        )} mt-2 resize-y leading-6`}
                    />

                    {validationErrors.content && (
                        <p className="mt-2 text-xs font-medium text-red-600">
                            {
                                validationErrors
                                    .content[0]
                            }
                        </p>
                    )}
                </div>
            </section>

            {/* =====================================================
                Technologies
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Technologies
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Select the technologies used in this project.
                            </p>
                        </div>

                        {selectedTechnologyIds.length >
                            0 && (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                    {
                                        selectedTechnologyIds.length
                                    }{" "}
                                    selected
                                </span>
                            )}
                    </div>
                </div>

                <div className="p-6">
                    {technologies.length ===
                        0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                ⚡
                            </div>

                            <p className="mt-4 text-sm font-semibold text-slate-700">
                                No technologies available
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                Create a technology first
                                before assigning it to
                                this project.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {technologies.map(
                                (
                                    technology
                                ) => {
                                    const selected =
                                        selectedTechnologyIds.includes(
                                            technology.id
                                        );

                                    return (
                                        <button
                                            key={
                                                technology.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                toggleTechnology(
                                                    technology.id
                                                )
                                            }
                                            className={`
                                                group flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200
                                                ${selected
                                                    ? "border-slate-900 bg-slate-900 text-white shadow-md"
                                                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                                                }
                                            `}
                                        >
                                            <div
                                                className={`
                                                    flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition
                                                    ${selected
                                                        ? "bg-white/10 text-white ring-1 ring-white/20"
                                                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                                                    }
                                                `}
                                            >
                                                {technology.icon ? (
                                                    <span className="text-base">
                                                        {
                                                            technology.icon
                                                        }
                                                    </span>
                                                ) : (
                                                    technology.name
                                                        .charAt(
                                                            0
                                                        )
                                                        .toUpperCase()
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p
                                                    className={`
                                                        truncate text-sm font-semibold
                                                        ${selected
                                                            ? "text-white"
                                                            : "text-slate-800"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        technology.name
                                                    }
                                                </p>

                                                <p
                                                    className={`
                                                        mt-0.5 truncate text-xs
                                                        ${selected
                                                            ? "text-slate-300"
                                                            : "text-slate-400"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        technology.slug
                                                    }
                                                </p>
                                            </div>

                                            <div
                                                className={`
                                                    flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition
                                                    ${selected
                                                        ? "border-white bg-white text-slate-900"
                                                        : "border-slate-300 bg-white"
                                                    }
                                                `}
                                            >
                                                {selected && (
                                                    <svg
                                                        className="h-3 w-3"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 12l4 4L19 8"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    )}

                    {selectedTechnologyIds.length >
                        0 && (
                            <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs text-white">
                                        ✓
                                    </div>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-slate-900">
                                            {
                                                selectedTechnologyIds.length
                                            }
                                        </span>{" "}
                                        technolog
                                        {selectedTechnologyIds.length >
                                            1
                                            ? "ies"
                                            : "y"}{" "}
                                        selected
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        clearTechnologies
                                    }
                                    className="text-xs font-semibold text-slate-500 transition hover:text-red-600"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                </div>
            </section>

            {/* =====================================================
                Project Features
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Project Features
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Define the main features and capabilities of this project.
                            </p>
                        </div>

                        {features.length >
                            0 && (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                    {
                                        features.length
                                    }{" "}
                                    {features.length ===
                                        1
                                        ? "feature"
                                        : "features"}
                                </span>
                            )}
                    </div>
                </div>

                <div className="p-6">
                    {!project?.id ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                ✨
                            </div>

                            <p className="mt-4 text-sm font-semibold text-slate-700">
                                Save the project first
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                After creating the project,
                                you can add and manage its
                                features here.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Add Feature */}

                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                                <div className="mb-4">
                                    <h3 className="text-sm font-semibold text-slate-800">
                                        Add New Feature
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Add a feature that describes an important capability of this project.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="new-feature-title"
                                            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                                        >
                                            Feature Title
                                        </label>

                                        <input
                                            id="new-feature-title"
                                            value={
                                                newFeatureTitle
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setNewFeatureTitle(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Authentication"
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="new-feature-description"
                                            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                                        >
                                            Description
                                        </label>

                                        <input
                                            id="new-feature-description"
                                            value={
                                                newFeatureDescription
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setNewFeatureDescription(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Brief description..."
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={
                                            addFeature
                                        }
                                        disabled={
                                            isAddingFeature ||
                                            !newFeatureTitle.trim()
                                        }
                                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isAddingFeature ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-lg leading-none">
                                                    +
                                                </span>
                                                Add Feature
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Feature List */}

                            <div className="mt-6">
                                {isFeatureLoading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(
                                            (
                                                item
                                            ) => (
                                                <div
                                                    key={
                                                        item
                                                    }
                                                    className="h-24 animate-pulse rounded-xl bg-slate-100"
                                                />
                                            )
                                        )}
                                    </div>
                                ) : features.length ===
                                    0 ? (
                                    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-lg">
                                            ✨
                                        </div>

                                        <p className="mt-4 text-sm font-semibold text-slate-700">
                                            No features yet
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Add your first project feature above.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {features.map(
                                            (
                                                feature,
                                                index
                                            ) => {
                                                const isEditing =
                                                    editingFeatureId ===
                                                    feature.id;

                                                return (
                                                    <div
                                                        key={
                                                            feature.id
                                                        }
                                                        className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                                                    >
                                                        {isEditing ? (
                                                            <div className="space-y-4">
                                                                <div className="grid gap-4 md:grid-cols-2">
                                                                    <div>
                                                                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                                            Title
                                                                        </label>

                                                                        <input
                                                                            value={
                                                                                editingFeatureTitle
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setEditingFeatureTitle(
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                                            Description
                                                                        </label>

                                                                        <input
                                                                            value={
                                                                                editingFeatureDescription
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setEditingFeatureDescription(
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-end gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={
                                                                            cancelEditingFeature
                                                                        }
                                                                        className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                                                    >
                                                                        Cancel
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            updateFeature(
                                                                                feature.id
                                                                            )
                                                                        }
                                                                        className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                                                                    >
                                                                        Save Changes
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-start gap-4">
                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                                                                    {String(
                                                                        index +
                                                                        1
                                                                    ).padStart(
                                                                        2,
                                                                        "0"
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0 flex-1">
                                                                    <h3 className="text-sm font-semibold text-slate-900">
                                                                        {
                                                                            feature.title
                                                                        }
                                                                    </h3>

                                                                    {feature.description && (
                                                                        <p className="mt-1 text-sm leading-6 text-slate-500">
                                                                            {
                                                                                feature.description
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>

                                                                <div className="flex shrink-0 items-center gap-2 opacity-0 transition group-hover:opacity-100">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            startEditingFeature(
                                                                                feature
                                                                            )
                                                                        }
                                                                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            deleteFeature(
                                                                                feature.id
                                                                            )
                                                                        }
                                                                        className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* =====================================================
                Project Images
            ====================================================== */}

            {!project?.id ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                        🖼️
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                        Save the project first
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                        After creating the project, you can upload
                        and manage project images here.
                    </p>
                </div>
            ) : (
                <ProjectImages projectId={project.id} />
            )}

            {/* =====================================================
                Project Links
            ====================================================== */}

            {!project?.id ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                        🔗
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                        Save the project first
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                        After creating the project, you can add
                        GitHub repositories, live demos, and other
                        project-related links.
                    </p>
                </div>
            ) : (
                <ProjectLinks projectId={project.id} />
            )}

            {/* =====================================================
                Cover Image
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Cover Image
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Set the main image used to represent this project.
                    </p>
                </div>

                <div className="p-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="cover_image"
                            className="text-sm font-medium text-slate-700"
                        >
                            Cover Image URL
                        </label>

                        <input
                            id="cover_image"
                            name="cover_image"
                            type="url"
                            value={form.cover_image}
                            onChange={(event) =>
                                handleChange(
                                    "cover_image",
                                    event.target.value
                                )
                            }
                            placeholder="https://..."
                            className={getInputClass(
                                "cover_image"
                            )}
                        />

                        {validationErrors.cover_image && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .cover_image[0]
                                }
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                Timeline
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Timeline
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Set the project start and completion dates.
                    </p>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    {/* Started */}

                    <div className="space-y-2">
                        <label
                            htmlFor="started_at"
                            className="text-sm font-medium text-slate-700"
                        >
                            Started At
                        </label>

                        <input
                            id="started_at"
                            name="started_at"
                            type="date"
                            value={form.started_at}
                            onChange={(event) =>
                                handleChange(
                                    "started_at",
                                    event.target.value
                                )
                            }
                            className={getInputClass(
                                "started_at"
                            )}
                        />

                        {validationErrors.started_at && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .started_at[0]
                                }
                            </p>
                        )}
                    </div>

                    {/* Completed */}

                    <div className="space-y-2">
                        <label
                            htmlFor="completed_at"
                            className="text-sm font-medium text-slate-700"
                        >
                            Completed At
                        </label>

                        <input
                            id="completed_at"
                            name="completed_at"
                            type="date"
                            value={form.completed_at}
                            onChange={(event) =>
                                handleChange(
                                    "completed_at",
                                    event.target.value
                                )
                            }
                            className={getInputClass(
                                "completed_at"
                            )}
                        />

                        {validationErrors.completed_at && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .completed_at[0]
                                }
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                Settings
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Settings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Configure the visibility and current status.
                    </p>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    {/* Status */}

                    <div className="space-y-2">
                        <label
                            htmlFor="status"
                            className="text-sm font-medium text-slate-700"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            name="status"
                            value={form.status}
                            onChange={(event) =>
                                handleChange(
                                    "status",
                                    event.target.value
                                )
                            }
                            className={getInputClass(
                                "status"
                            )}
                        >
                            <option value="draft">
                                Draft
                            </option>

                            <option value="active">
                                Active
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                            <option value="archived">
                                Archived
                            </option>
                        </select>

                        {validationErrors.status && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .status[0]
                                }
                            </p>
                        )}
                    </div>

                    {/* Featured */}

                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300 hover:bg-slate-50">
                        <div>
                            <p className="text-sm font-medium text-slate-800">
                                Featured Project
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Highlight this project on your portfolio.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(event) =>
                                handleChange(
                                    "featured",
                                    event.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                        />
                    </label>
                </div>
            </section>

            {/* =====================================================
                Actions
            ====================================================== */}

            <div className="sticky bottom-0 z-10 -mx-6 border-t border-slate-200 bg-white/90 px-6 py-4 backdrop-blur lg:-mx-8 lg:px-8">
                <div className="mx-auto flex max-w-5xl items-center justify-end gap-3">
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                            router.push(
                                "/projects"
                            )
                        }
                        className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                {isEdit
                                    ? "Updating..."
                                    : "Creating..."}
                            </>
                        ) : (
                            <>
                                {isEdit
                                    ? "Update Project"
                                    : "Create Project"}

                                <span>
                                    →
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
