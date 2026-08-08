"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
    deleteSkill,
    getSkills,
    type Skill,
    type SkillCategory,
} from "@/services/skill-service";
import SkillForm from "@/components/skill/SkillForm";

const categories: {
    value: "All" | SkillCategory;
    label: string;
}[] = [
        { value: "All", label: "All Skills" },
        { value: "Backend", label: "Backend" },
        { value: "Frontend", label: "Frontend" },
        { value: "Database", label: "Database" },
        { value: "DevOps", label: "DevOps" },
        { value: "Testing", label: "Testing" },
        { value: "Tools", label: "Tools" },
        { value: "Other", label: "Other" },
    ];

const categoryIcons: Record<SkillCategory, string> = {
    Backend: "⚙️",
    Frontend: "🎨",
    Database: "🗄️",
    DevOps: "🚀",
    Testing: "🧪",
    Tools: "🛠️",
    Other: "✨",
};

const levelWidth: Record<string, string> = {
    Beginner: "w-1/4",
    Intermediate: "w-2/4",
    Advanced: "w-3/4",
    Expert: "w-full",
};

const levelLabel: Record<string, string> = {
    Beginner: "Beginner",
    Intermediate: "Intermediate",
    Advanced: "Advanced",
    Expert: "Expert",
};

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] =
        useState<"All" | SkillCategory>("All");

    const [isFormOpen, setIsFormOpen] =
        useState(false);

    const [editingSkill, setEditingSkill] =
        useState<Skill | null>(null);

    const [deletingId, setDeletingId] =
        useState<string | null>(null);

    const [deleteTarget, setDeleteTarget] =
        useState<Skill | null>(null);

    async function loadSkills() {
        try {
            const data = await getSkills();

            setSkills(data);
        } catch (error) {
            console.error(
                "Failed to load skills:",
                error
            );

            toast.error(
                "Failed to load skills."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSkills();
    }, []);

    const filteredSkills = useMemo(() => {
        if (selectedCategory === "All") {
            return skills;
        }

        return skills.filter(
            (skill) =>
                skill.category ===
                selectedCategory
        );
    }, [skills, selectedCategory]);

    const handleAdd = () => {
        setEditingSkill(null);
        setIsFormOpen(true);
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingSkill(null);
    };

    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeletingId(deleteTarget.id);

            await deleteSkill(
                deleteTarget.id
            );

            setSkills((prev) =>
                prev.filter(
                    (skill) =>
                        skill.id !==
                        deleteTarget.id
                )
            );

            toast.success(
                "Skill deleted successfully."
            );

            setDeleteTarget(null);
        } catch (error) {
            console.error(
                "Failed to delete skill:",
                error
            );

            toast.error(
                "Failed to delete skill. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-6xl space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-200" />

                        <div className="h-4 w-72 animate-pulse rounded-lg bg-gray-100" />
                    </div>

                    <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
                </div>

                <div className="h-12 w-full animate-pulse rounded-xl bg-gray-100" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map(
                        (item) => (
                            <div
                                key={item}
                                className="h-48 animate-pulse rounded-2xl border bg-white"
                            />
                        )
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-6xl space-y-7">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
                            ✨
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                                Skills
                            </h1>

                            <p className="mt-0.5 text-sm text-gray-500">
                                Showcase your technical expertise.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-semibold text-gray-900">
                            {skills.length}
                        </span>

                        <span>
                            {skills.length === 1
                                ? "skill"
                                : "skills"}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <span className="text-base">
                        +
                    </span>

                    Add Skill
                </button>
            </div>

            {/* Category Filter */}
            <div className="overflow-x-auto">
                <div className="inline-flex min-w-full gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 sm:min-w-0">
                    {categories.map(
                        (category) => {
                            const active =
                                selectedCategory ===
                                category.value;

                            return (
                                <button
                                    key={
                                        category.value
                                    }
                                    type="button"
                                    onClick={() =>
                                        setSelectedCategory(
                                            category.value
                                        )
                                    }
                                    className={`
                                        whitespace-nowrap
                                        rounded-lg
                                        px-3.5 py-2
                                        text-sm
                                        font-medium
                                        transition
                                        ${active
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-500 hover:text-gray-800"
                                        }
                                    `}
                                >
                                    {category.label}
                                </button>
                            );
                        }
                    )}
                </div>
            </div>

            {/* Empty State */}
            {skills.length === 0 ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                        ✨
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Build your skill set
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                        Add the technologies and tools
                        you know to showcase your
                        professional expertise.
                    </p>

                    <button
                        type="button"
                        onClick={handleAdd}
                        className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
                    >
                        Add your first skill
                    </button>
                </div>
            ) : filteredSkills.length === 0 ? (
                <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center">
                    <div className="text-3xl">
                        🔍
                    </div>

                    <h2 className="mt-3 text-base font-semibold text-gray-900">
                        No skills in this category
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Try another category.
                    </p>
                </div>
            ) : (
                /* Skill Grid */
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filteredSkills.map(
                        (skill) => (
                            <article
                                key={skill.id}
                                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                            >
                                {/* Top */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                                            {
                                                categoryIcons[
                                                skill
                                                    .category
                                                ]
                                            }
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-base font-semibold text-gray-900">
                                                {
                                                    skill.name
                                                }
                                            </h2>

                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-xs font-medium text-gray-500">
                                                    {
                                                        skill.category
                                                    }
                                                </span>

                                                <span className="h-1 w-1 rounded-full bg-gray-300" />

                                                <span className="text-xs text-gray-400">
                                                    {
                                                        skill.years_of_experience
                                                    }{" "}
                                                    {skill.years_of_experience ===
                                                        1
                                                        ? "year"
                                                        : "years"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu */}
                                    <div className="flex shrink-0 gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    skill
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                skill.id
                                            }
                                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                            title="Edit"
                                        >
                                            ✎
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDeleteTarget(
                                                    skill
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                skill.id
                                            }
                                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                            title="Delete"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>

                                {/* Level */}
                                <div className="mt-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-500">
                                            Proficiency
                                        </span>

                                        <span className="text-xs font-semibold text-gray-700">
                                            {
                                                levelLabel[
                                                skill.level
                                                ]
                                            }
                                        </span>
                                    </div>

                                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className={`
                                                h-full
                                                rounded-full
                                                bg-gray-900
                                                transition-all
                                                ${levelWidth[
                                                skill
                                                    .level
                                                ]
                                                }
                                            `}
                                        />
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-xs text-gray-400">
                                        Experience
                                    </span>

                                    <span className="text-sm font-semibold text-gray-800">
                                        {
                                            skill.years_of_experience
                                        }{" "}
                                        {skill.years_of_experience ===
                                            1
                                            ? "year"
                                            : "years"}
                                    </span>
                                </div>
                            </article>
                        )
                    )}
                </div>
            )}

            {/* Form */}
            <SkillForm
                open={isFormOpen}
                skill={editingSkill}
                onClose={handleCloseForm}
                onSuccess={loadSkills}
            />

            {/* Delete Modal */}
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
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
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">
                            🗑
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            Delete skill?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Are you sure you want to
                            delete{" "}
                            <span className="font-semibold text-gray-700">
                                {deleteTarget.name}
                            </span>
                            ? This action cannot be
                            undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteTarget(
                                        null
                                    )
                                }
                                disabled={
                                    Boolean(
                                        deletingId
                                    )
                                }
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
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
                                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {deletingId
                                    ? "Deleting..."
                                    : "Delete Skill"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}