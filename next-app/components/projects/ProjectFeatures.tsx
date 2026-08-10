"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { ProjectFeature } from "@/types/project-feature";

interface ProjectFeaturesProps {
    projectId: string;
}

interface FeatureForm {
    title: string;
    description: string;
    sort_order: number;
}

const initialForm: FeatureForm = {
    title: "",
    description: "",
    sort_order: 0,
};

export default function ProjectFeatures({
    projectId,
}: ProjectFeaturesProps) {
    const [features, setFeatures] = useState<
        ProjectFeature[]
    >([]);

    const [form, setForm] =
        useState<FeatureForm>(initialForm);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function loadFeatures() {
        try {
            setIsLoading(true);

            const response = await fetch(
                `/api/projects/${projectId}/features`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                        "Failed to load features."
                );
            }

            setFeatures(data.data ?? []);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to load features.";

            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadFeatures();
    }, [projectId]);

    function handleChange(
        field: keyof FeatureForm,
        value: string | number
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function resetForm() {
        setForm(initialForm);
        setEditingId(null);
    }

    function handleEdit(
        feature: ProjectFeature
    ) {
        setEditingId(feature.id);

        setForm({
            title: feature.title,
            description:
                feature.description ?? "",
            sort_order: feature.sort_order,
        });
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!form.title.trim()) {
            toast.error(
                "Feature title is required."
            );

            return;
        }

        try {
            setIsSubmitting(true);

            const url = editingId
                ? `/api/projects/${projectId}/features/${editingId}`
                : `/api/projects/${projectId}/features`;

            const response = await fetch(url, {
                method: editingId
                    ? "PUT"
                    : "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    title: form.title.trim(),
                    description:
                        form.description.trim() ||
                        null,
                    sort_order:
                        Number(form.sort_order) || 0,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                        "Failed to save feature."
                );
            }

            toast.success(
                editingId
                    ? "Feature updated successfully."
                    : "Feature created successfully."
            );

            resetForm();

            await loadFeatures();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong.";

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(
        featureId: string
    ) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this feature?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `/api/projects/${projectId}/features/${featureId}`,
                {
                    method: "DELETE",
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                        "Failed to delete feature."
                );
            }

            toast.success(
                "Feature deleted successfully."
            );

            if (editingId === featureId) {
                resetForm();
            }

            await loadFeatures();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to delete feature.";

            toast.error(message);
        }
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}

            <div className="border-b border-slate-100 px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Project Features
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Add the main features and
                            capabilities of this project.
                        </p>
                    </div>

                    <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-100 px-3 text-sm font-semibold text-slate-700">
                        {features.length}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_360px]">
                {/* Feature list */}

                <div className="min-w-0">
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="animate-pulse rounded-xl border border-slate-200 p-4"
                                    >
                                        <div className="h-4 w-1/3 rounded bg-slate-200" />

                                        <div className="mt-3 h-3 w-2/3 rounded bg-slate-100" />
                                    </div>
                                )
                            )}
                        </div>
                    ) : features.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                ✦
                            </div>

                            <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                No features yet
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                                Add the key features of
                                your project using the
                                form.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {features.map(
                                (
                                    feature,
                                    index
                                ) => (
                                    <div
                                        key={
                                            feature.id
                                        }
                                        className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
                                                {index +
                                                    1}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
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

                                                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                                                        #
                                                        {
                                                            feature.sort_order
                                                        }
                                                    </span>
                                                </div>

                                                <div className="mt-3 flex items-center gap-2 opacity-100 transition lg:opacity-0 lg:group-hover:opacity-100">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                feature
                                                            )
                                                        }
                                                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                feature.id
                                                            )
                                                        }
                                                        className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* Form */}

                <div className="h-fit rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="mb-5">
                        <h3 className="text-sm font-semibold text-slate-900">
                            {editingId
                                ? "Edit Feature"
                                : "Add Feature"}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Define a feature that
                            represents an important
                            capability of this project.
                        </p>
                    </div>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="feature-title"
                                className="text-xs font-semibold text-slate-700"
                            >
                                Title
                            </label>

                            <input
                                id="feature-title"
                                value={
                                    form.title
                                }
                                onChange={(
                                    event
                                ) =>
                                    handleChange(
                                        "title",
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="e.g. Real-time collaboration"
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="feature-description"
                                className="text-xs font-semibold text-slate-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="feature-description"
                                value={
                                    form.description
                                }
                                onChange={(
                                    event
                                ) =>
                                    handleChange(
                                        "description",
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="Describe what this feature does..."
                                rows={4}
                                className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="feature-sort-order"
                                className="text-xs font-semibold text-slate-700"
                            >
                                Sort Order
                            </label>

                            <input
                                id="feature-sort-order"
                                type="number"
                                min={0}
                                value={
                                    form.sort_order
                                }
                                onChange={(
                                    event
                                ) =>
                                    handleChange(
                                        "sort_order",
                                        Number(
                                            event
                                                .target
                                                .value
                                        )
                                    )
                                }
                                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={
                                    isSubmitting
                                }
                                className="inline-flex flex-1 items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? "Saving..."
                                    : editingId
                                      ? "Update Feature"
                                      : "Add Feature"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={
                                        resetForm
                                    }
                                    disabled={
                                        isSubmitting
                                    }
                                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}