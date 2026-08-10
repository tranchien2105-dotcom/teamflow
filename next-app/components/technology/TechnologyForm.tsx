"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Technology } from "@/types/technology";

interface TechnologyFormData {
    name: string;
    slug: string;
    icon: string;
}

interface TechnologyFormProps {
    mode?: "create" | "edit";
    technology?: Technology;
}

const initialForm: TechnologyFormData = {
    name: "",
    slug: "",
    icon: "",
};

function technologyToForm(
    technology: Technology
): TechnologyFormData {
    return {
        name: technology.name ?? "",
        slug: technology.slug ?? "",
        icon: technology.icon ?? "",
    };
}

/**
 * Generate a URL-friendly slug from technology name.
 *
 * Examples:
 * React Native       -> react-native
 * Laravel Framework  -> laravel-framework
 * Vue.js             -> vue-js
 */
function generateSlug(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function TechnologyForm({
    mode = "create",
    technology,
}: TechnologyFormProps) {
    const router = useRouter();

    const isEdit = mode === "edit";

    const [form, setForm] =
        useState<TechnologyFormData>(
            technology
                ? technologyToForm(technology)
                : initialForm
        );

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [validationErrors, setValidationErrors] =
        useState<Record<string, string[]>>({});

    useEffect(() => {
        if (technology) {
            setForm(
                technologyToForm(technology)
            );
        }
    }, [technology]);

    function handleNameChange(value: string) {
        setForm((current) => ({
            ...current,
            name: value,
            slug: generateSlug(value),
        }));

        if (validationErrors.name) {
            setValidationErrors((current) => {
                const updated = { ...current };

                delete updated.name;

                return updated;
            });
        }

        if (validationErrors.slug) {
            setValidationErrors((current) => {
                const updated = { ...current };

                delete updated.slug;

                return updated;
            });
        }

        if (error) {
            setError(null);
        }
    }

    function handleChange(
        field: keyof TechnologyFormData,
        value: string
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        if (validationErrors[field]) {
            setValidationErrors((current) => {
                const updated = { ...current };

                delete updated[field];

                return updated;
            });
        }

        if (error) {
            setError(null);
        }
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);
        setError(null);
        setValidationErrors({});

        try {
            if (isEdit && !technology?.id) {
                throw new Error(
                    "Technology ID is missing."
                );
            }

            const url = isEdit
                ? `/api/technologies/${technology?.id}`
                : "/api/technologies";

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setValidationErrors(
                        data.errors ?? {}
                    );

                    toast.error(
                        isEdit
                            ? "Unable to update technology."
                            : "Unable to create technology."
                    );

                    return;
                }

                throw new Error(
                    data.message ||
                        `Failed to ${
                            isEdit
                                ? "update"
                                : "create"
                        } technology.`
                );
            }

            const technologyId =
                data.data?.id ??
                technology?.id;

            if (!technologyId) {
                throw new Error(
                    "Technology ID was not returned."
                );
            }

            toast.success(
                isEdit
                    ? "Technology updated successfully."
                    : "Technology created successfully."
            );

            router.push("/technologies");
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

    function getInputClass(
        field: keyof TechnologyFormData
    ) {
        return `
            h-12 w-full rounded-xl border bg-white
            px-4 text-sm text-slate-900
            outline-none transition-all duration-200
            placeholder:text-slate-400
            ${
                validationErrors[field]
                    ? "border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            }
        `;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* =========================
                General Error
            ========================== */}

            {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-sm font-bold">
                        !
                    </div>

                    <div>
                        <p className="text-sm font-semibold">
                            {isEdit
                                ? "Unable to update technology"
                                : "Unable to create technology"}
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                </div>
            )}

            {/* =========================
                Technology Information
            ========================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}

                <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/70 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 12l8-4.5M12 12v9M12 12L4 7.5"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Technology Information
                            </h2>

                            <p className="mt-0.5 text-sm text-slate-500">
                                Add information about
                                the technology.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    {/* Name */}

                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Technology Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(event) =>
                                handleNameChange(
                                    event.target
                                        .value
                                )
                            }
                            placeholder="e.g. Laravel"
                            className={getInputClass(
                                "name"
                            )}
                        />

                        <p className="text-xs text-slate-400">
                            Enter the name of the
                            technology.
                        </p>

                        {validationErrors.name && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .name[0]
                                }
                            </p>
                        )}
                    </div>

                    {/* Icon */}

                    <div className="space-y-2">
                        <label
                            htmlFor="icon"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Icon
                        </label>

                        <input
                            id="icon"
                            name="icon"
                            value={form.icon}
                            onChange={(event) =>
                                handleChange(
                                    "icon",
                                    event.target
                                        .value
                                )
                            }
                            placeholder="e.g. ⚡"
                            className={getInputClass(
                                "icon"
                            )}
                        />

                        <p className="text-xs text-slate-400">
                            You can use an emoji or
                            icon identifier.
                        </p>

                        {validationErrors.icon && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .icon[0]
                                }
                            </p>
                        )}
                    </div>

                    {/* Slug */}

                    <div className="space-y-2 md:col-span-2">
                        <label
                            htmlFor="slug"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Slug
                        </label>

                        <div className="relative">
                            <input
                                id="slug"
                                name="slug"
                                value={form.slug}
                                readOnly
                                tabIndex={-1}
                                className="
                                    h-12 w-full rounded-xl
                                    border border-slate-200
                                    bg-slate-50
                                    px-4 pr-12
                                    font-mono text-sm
                                    text-slate-600
                                    outline-none
                                "
                            />

                            <div className="absolute inset-y-0 right-4 flex items-center">
                                <svg
                                    className="h-4 w-4 text-slate-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2"
                                    />

                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="11"
                                        rx="2"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 10V7a4 4 0 018 0v3"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">
                                Automatically generated
                                from the technology name.
                            </span>
                        </div>

                        {validationErrors.slug && (
                            <p className="text-xs font-medium text-red-600">
                                {
                                    validationErrors
                                        .slug[0]
                                }
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* =========================
                Preview
            ========================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Preview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        This is how the technology will
                        appear in your workspace.
                    </p>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-5">
                        <div className="flex items-center gap-4">
                            {/* Technology Icon */}

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg font-bold text-slate-600 shadow-sm">
                                {form.icon ? (
                                    <span>
                                        {
                                            form.icon
                                        }
                                    </span>
                                ) : form.name ? (
                                    form.name
                                        .charAt(
                                            0
                                        )
                                        .toUpperCase()
                                ) : (
                                    "?"
                                )}
                            </div>

                            {/* Information */}

                            <div>
                                <p className="text-base font-semibold text-slate-900">
                                    {form.name ||
                                        "Technology Name"}
                                </p>

                                <p className="mt-1 font-mono text-xs text-slate-400">
                                    {form.slug ||
                                        "technology-slug"}
                                </p>
                            </div>
                        </div>

                        {/* Status */}

                        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 sm:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            <span className="text-xs font-medium text-emerald-700">
                                Technology
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                Actions
            ========================== */}

            <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                    <p className="hidden text-xs text-slate-400 sm:block">
                        {isEdit
                            ? "Changes will be saved to this technology."
                            : "Your technology will be added to the workspace."}
                    </p>

                    <div className="ml-auto flex items-center gap-3">
                        {/* Cancel */}

                        <button
                            type="button"
                            disabled={
                                isSubmitting
                            }
                            onClick={() =>
                                router.push(
                                    "/technologies"
                                )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                            className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
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
                                        ? "Update Technology"
                                        : "Create Technology"}

                                    <span className="text-base">
                                        →
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
