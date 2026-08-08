"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    getExperiences,
    deleteExperience,
    type Experience,
} from "@/services/experience-service";
import ExperienceForm from "@/components/experience/ExperienceForm";

export default function ExperiencesPage() {
    const [experiences, setExperiences] = useState<
        Experience[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] = useState<
        string | null
    >(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [editingExperience, setEditingExperience] =
        useState<Experience | null>(null);

    const [deleteTarget, setDeleteTarget] =
        useState<Experience | null>(null);

    async function loadExperiences() {
        try {
            const data = await getExperiences();

            setExperiences(data);
        } catch (error) {
            console.error(
                "Failed to load experiences:",
                error
            );

            toast.error(
                "Failed to load experiences."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadExperiences();
    }, []);

    const handleAdd = () => {
        setEditingExperience(null);
        setIsFormOpen(true);
    };

    const handleEdit = (experience: Experience) => {
        setEditingExperience(experience);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingExperience(null);
    };

    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        const id = deleteTarget.id;

        try {
            setDeletingId(id);

            await deleteExperience(id);

            setExperiences((prev) =>
                prev.filter(
                    (experience) =>
                        experience.id !== id
                )
            );

            toast.success(
                "Experience deleted successfully."
            );

            setDeleteTarget(null);
        } catch (error) {
            console.error(
                "Failed to delete experience:",
                error
            );

            toast.error(
                "Failed to delete experience. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    };

    /**
     * Format API date.
     *
     * API:
     * 2022-01-03
     *
     * Display:
     * Jan 2022
     */
    const formatDisplayDate = (
        value?: string | null
    ): string => {
        if (!value) {
            return "Present";
        }

        const date = new Date(
            `${value.substring(0, 10)}T00:00:00Z`
        );

        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
            timeZone: "UTC",
        });
    };

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
                            className="h-40 animate-pulse rounded-xl border bg-white"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="mx-auto w-full max-w-5xl space-y-8">
                {/* Header */}
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Experience
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your professional work
                            experience.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleAdd}
                        className="
                            inline-flex h-10
                            items-center justify-center
                            rounded-lg
                            bg-primary px-4
                            text-sm font-medium
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
                        + Add Experience
                    </button>
                </div>

                {/* Empty State */}
                {experiences.length === 0 ? (
                    <div
                        className="
                            flex min-h-[320px]
                            flex-col items-center
                            justify-center
                            rounded-xl
                            border border-dashed
                            bg-white
                            px-6
                            text-center
                        "
                    >
                        <div
                            className="
                                mb-4 flex h-12 w-12
                                items-center justify-center
                                rounded-full
                                bg-gray-100
                                text-xl
                            "
                        >
                            💼
                        </div>

                        <h2 className="text-base font-semibold text-gray-900">
                            No experience yet
                        </h2>

                        <p className="mt-1 max-w-sm text-sm text-gray-500">
                            Add your first work experience
                            to build your professional
                            profile.
                        </p>

                        <button
                            type="button"
                            onClick={handleAdd}
                            className="
                                mt-5 inline-flex h-9
                                items-center
                                justify-center
                                rounded-lg
                                border border-gray-200
                                bg-white px-4
                                text-sm font-medium
                                text-gray-700
                                shadow-sm
                                transition-all
                                hover:bg-gray-50
                                hover:text-gray-900
                                hover:shadow
                            "
                        >
                            Add Experience
                        </button>
                    </div>
                ) : (
                    /* Experience List */
                    <div className="space-y-4">
                        {experiences.map(
                            (experience) => (
                                <article
                                    key={experience.id}
                                    className="
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white p-5
                                        shadow-sm
                                        transition-all
                                        hover:border-gray-300
                                        hover:shadow-md
                                    "
                                >
                                    {/* Top */}
                                    <div
                                        className="
                                            flex flex-col
                                            gap-5
                                            sm:flex-row
                                            sm:items-start
                                            sm:justify-between
                                        "
                                    >
                                        {/* Company / Position */}
                                        <div className="flex min-w-0 gap-4">
                                            <div
                                                className="
                                                    flex h-11
                                                    w-11 shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-gray-100
                                                    text-lg
                                                "
                                            >
                                                💼
                                            </div>

                                            <div className="min-w-0">
                                                <h2 className="truncate text-base font-semibold text-gray-900">
                                                    {
                                                        experience.position
                                                    }
                                                </h2>

                                                <p className="mt-0.5 text-sm font-medium text-gray-700">
                                                    {
                                                        experience.company
                                                    }
                                                </p>

                                                {experience.location && (
                                                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                                                        <span>
                                                            📍
                                                        </span>

                                                        {
                                                            experience.location
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Date / Employment */}
                                        <div className="shrink-0 sm:text-right">
                                            <p className="text-sm font-medium text-gray-700">
                                                {formatDisplayDate(
                                                    experience.start_date
                                                )}

                                                {" — "}

                                                {formatDisplayDate(
                                                    experience.end_date
                                                )}
                                            </p>

                                            {experience.employment_type && (
                                                <span
                                                    className="
                                                        mt-2
                                                        inline-flex
                                                        rounded-full
                                                        border
                                                        border-gray-200
                                                        bg-gray-50
                                                        px-2.5 py-1
                                                        text-xs
                                                        font-medium
                                                        text-gray-600
                                                    "
                                                >
                                                    {
                                                        experience.employment_type
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {experience.description && (
                                        <div className="mt-5 border-t border-gray-100 pt-4">
                                            <p className="whitespace-pre-line text-sm leading-6 text-gray-600">
                                                {
                                                    experience.description
                                                }
                                            </p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div
                                        className="
                                            mt-5 flex
                                            items-center
                                            justify-end gap-2
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
                                                    experience
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                experience.id
                                            }
                                            className="
                                                rounded-md
                                                border
                                                border-gray-200
                                                bg-white
                                                px-3 py-1.5
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
                                                setDeleteTarget(
                                                    experience
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                experience.id
                                            }
                                            className="
                                                rounded-md
                                                border
                                                border-red-200
                                                bg-white
                                                px-3 py-1.5
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
                                            experience.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                )}

                {/* Add / Edit Form */}
                <ExperienceForm
                    open={isFormOpen}
                    experience={editingExperience}
                    onClose={handleCloseForm}
                    onSuccess={loadExperiences}
                />
            </div>

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div
                    className="
                        fixed inset-0 z-[60]
                        flex items-center
                        justify-center
                        bg-black/40 px-4
                    "
                    onMouseDown={(e) => {
                        if (
                            e.target ===
                                e.currentTarget &&
                            !deletingId
                        ) {
                            setDeleteTarget(null);
                        }
                    }}
                >
                    <div
                        className="
                            w-full max-w-md
                            rounded-xl
                            bg-white
                            shadow-2xl
                        "
                    >
                        {/* Modal Content */}
                        <div className="px-6 py-5">
                            <div className="flex items-start gap-4">
                                <div
                                    className="
                                        flex h-10 w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-red-50
                                        text-red-600
                                    "
                                >
                                    ⚠️
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Delete experience?
                                    </h2>

                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                        Are you sure you
                                        want to delete{" "}
                                        <span className="font-medium text-gray-700">
                                            {
                                                deleteTarget.position
                                            }
                                        </span>{" "}
                                        at{" "}
                                        <span className="font-medium text-gray-700">
                                            {
                                                deleteTarget.company
                                            }
                                        </span>
                                        ?
                                    </p>

                                    <p className="mt-2 text-xs text-gray-400">
                                        This action cannot
                                        be undone.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 border-t px-6 py-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteTarget(null)
                                }
                                disabled={Boolean(
                                    deletingId
                                )}
                                className="
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-4 py-2
                                    text-sm font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={Boolean(
                                    deletingId
                                )}
                                className="
                                    rounded-lg
                                    bg-red-600
                                    px-4 py-2
                                    text-sm font-medium
                                    text-white
                                    shadow-sm
                                    transition
                                    hover:bg-red-700
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                {deletingId
                                    ? "Deleting..."
                                    : "Delete Experience"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
