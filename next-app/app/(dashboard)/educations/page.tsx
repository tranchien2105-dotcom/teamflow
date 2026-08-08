"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    deleteEducation,
    getEducations,
    type Education,
} from "@/services/education-service";
import EducationForm from "@/components/education/EducationForm";

export default function EducationPage() {
    const [educations, setEducations] = useState<Education[]>(
        []
    );

    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] = useState<string | null>(
        null
    );

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [editingEducation, setEditingEducation] =
        useState<Education | null>(null);

    const [deleteTarget, setDeleteTarget] =
        useState<Education | null>(null);

    async function loadEducations() {
        try {
            const data = await getEducations();

            setEducations(data);
        } catch (error) {
            console.error(
                "Failed to load educations:",
                error
            );

            toast.error(
                "Failed to load educations."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEducations();
    }, []);

    /*
     * Add
     */
    const handleAdd = () => {
        setEditingEducation(null);
        setIsFormOpen(true);
    };

    /*
     * Edit
     */
    const handleEdit = (
        education: Education
    ) => {
        setEditingEducation(education);
        setIsFormOpen(true);
    };

    /*
     * Close form
     */
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingEducation(null);
    };

    /*
     * Open delete confirmation
     */
    const handleDeleteClick = (
        education: Education
    ) => {
        setDeleteTarget(education);
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
            setDeletingId(deleteTarget.id);

            await deleteEducation(
                deleteTarget.id
            );

            setEducations((prev) =>
                prev.filter(
                    (education) =>
                        education.id !==
                        deleteTarget.id
                )
            );

            toast.success(
                "Education deleted successfully."
            );

            setDeleteTarget(null);
        } catch (error) {
            console.error(
                "Failed to delete education:",
                error
            );

            toast.error(
                "Failed to delete education. Please try again."
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
                                h-44
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
                        Education
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your educational background.
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
                    + Add Education
                </button>
            </div>

            {/* Empty State */}
            {educations.length === 0 ? (
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
                        🎓
                    </div>

                    <h2 className="text-base font-semibold text-gray-900">
                        No education yet
                    </h2>

                    <p className="mt-1 max-w-sm text-sm text-gray-500">
                        Add your educational background to
                        build your professional profile.
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
                        Add Education
                    </button>
                </div>
            ) : (
                /* Education List */
                <div className="space-y-4">
                    {educations.map(
                        (education) => (
                            <article
                                key={education.id}
                                className="
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    p-5
                                    shadow-sm
                                    transition-all
                                    hover:border-gray-300
                                    hover:shadow-md
                                "
                            >
                                {/* Top */}
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-5
                                        sm:flex-row
                                        sm:items-start
                                        sm:justify-between
                                    "
                                >
                                    {/* School */}
                                    <div className="flex min-w-0 gap-4">
                                        <div
                                            className="
                                                flex
                                                h-11
                                                w-11
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-gray-100
                                                text-lg
                                            "
                                        >
                                            🎓
                                        </div>

                                        <div className="min-w-0">
                                            <h2
                                                className="
                                                    text-base
                                                    font-semibold
                                                    text-gray-900
                                                "
                                            >
                                                {
                                                    education
                                                        .school
                                                        ?.name
                                                }
                                            </h2>

                                            {education
                                                .school
                                                ?.short_name && (
                                                    <p className="mt-0.5 text-sm font-medium text-gray-700">
                                                        {
                                                            education
                                                                .school
                                                                .short_name
                                                        }
                                                    </p>
                                                )}

                                            {education
                                                .school
                                                ?.location && (
                                                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                                                        <span>
                                                            📍
                                                        </span>

                                                        {
                                                            education
                                                                .school
                                                                .location
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="shrink-0 sm:text-right">
                                        <p className="text-sm font-medium text-gray-700">
                                            {education.start_date}
                                            {" — "}
                                            {education.end_date ??
                                                "Present"}
                                        </p>

                                        <span
                                            className="
                                                mt-2
                                                inline-flex
                                                rounded-full
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                px-2.5
                                                py-1
                                                text-xs
                                                font-medium
                                                text-gray-600
                                            "
                                        >
                                            {
                                                education.degree
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Field */}
                                <div
                                    className="
                                        mt-5
                                        border-t
                                        border-gray-100
                                        pt-4
                                    "
                                >
                                    <p className="text-sm font-medium text-gray-900">
                                        {
                                            education.field_of_study
                                        }
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Field of Study
                                    </p>
                                </div>

                                {/* Description */}
                                {education.description && (
                                    <div className="mt-4">
                                        <p
                                            className="
                                                whitespace-pre-line
                                                text-sm
                                                leading-6
                                                text-gray-600
                                            "
                                        >
                                            {
                                                education.description
                                            }
                                        </p>
                                    </div>
                                )}

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
                                                education
                                            )
                                        }
                                        disabled={
                                            deletingId ===
                                            education.id
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
                                                education
                                            )
                                        }
                                        disabled={
                                            deletingId ===
                                            education.id
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
                                            education.id
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
            <EducationForm
                open={isFormOpen}
                education={
                    editingEducation
                }
                onClose={
                    handleCloseForm
                }
                onSuccess={
                    loadEducations
                }
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
                            Delete education?
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
                            delete your education at{" "}
                            <span className="font-medium text-gray-700">
                                {
                                    deleteTarget
                                        .school
                                        ?.short_name ??
                                    deleteTarget
                                        .school
                                        ?.name
                                }
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
                                disabled={
                                    Boolean(
                                        deletingId
                                    )
                                }
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
                                disabled={
                                    Boolean(
                                        deletingId
                                    )
                                }
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