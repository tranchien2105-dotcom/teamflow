"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    createSkill,
    updateSkill,
    type Skill,
    type SkillCategory,
    type SkillLevel,
} from "@/services/skill-service";

interface SkillFormProps {
    open: boolean;
    skill: Skill | null;
    onClose: () => void;
    onSuccess: () => void;
}

type FormData = {
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    years_of_experience: number;
};

const emptyForm: FormData = {
    name: "",
    category: "Backend",
    level: "Intermediate",
    years_of_experience: 0,
};

const categories: {
    value: SkillCategory;
    label: string;
    icon: string;
}[] = [
        {
            value: "Backend",
            label: "Backend",
            icon: "⚙️",
        },
        {
            value: "Frontend",
            label: "Frontend",
            icon: "🎨",
        },
        {
            value: "Database",
            label: "Database",
            icon: "🗄️",
        },
        {
            value: "DevOps",
            label: "DevOps",
            icon: "🚀",
        },
        {
            value: "Testing",
            label: "Testing",
            icon: "🧪",
        },
        {
            value: "Tools",
            label: "Tools",
            icon: "🛠️",
        },
        {
            value: "Other",
            label: "Other",
            icon: "✨",
        },
    ];

const levels: {
    value: SkillLevel;
    label: string;
    description: string;
}[] = [
        {
            value: "Beginner",
            label: "Beginner",
            description: "Learning the basics",
        },
        {
            value: "Intermediate",
            label: "Intermediate",
            description: "Can work independently",
        },
        {
            value: "Advanced",
            label: "Advanced",
            description: "Strong professional experience",
        },
        {
            value: "Expert",
            label: "Expert",
            description: "Deep expertise",
        },
    ];

export default function SkillForm({
    open,
    skill,
    onClose,
    onSuccess,
}: SkillFormProps) {
    const [form, setForm] =
        useState<FormData>(emptyForm);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const isEdit = Boolean(skill);

    useEffect(() => {
        if (skill) {
            setForm({
                name: skill.name ?? "",
                category:
                    skill.category ?? "Backend",
                level:
                    skill.level ?? "Intermediate",
                years_of_experience:
                    skill.years_of_experience ?? 0,
            });
        } else {
            setForm(emptyForm);
        }

        setError("");
    }, [skill, open]);

    if (!open) {
        return null;
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!form.name.trim()) {
            setError("Skill name is required.");
            return;
        }

        if (
            form.years_of_experience < 0 ||
            form.years_of_experience > 50
        ) {
            setError(
                "Years of experience must be between 0 and 50."
            );
            return;
        }

        setError("");
        setLoading(true);

        try {
            const payload = {
                name: form.name.trim(),
                category: form.category,
                level: form.level,
                years_of_experience:
                    form.years_of_experience,
            };

            if (skill) {
                await updateSkill(
                    skill.id,
                    payload
                );

                toast.success(
                    "Skill updated successfully."
                );
            } else {
                await createSkill(payload);

                toast.success(
                    "Skill added successfully."
                );
            }

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error(
                "Failed to save skill:",
                error
            );

            const message =
                error?.response?.data?.message ??
                "Failed to save skill. Please try again.";

            setError(message);

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg">
                                ✨
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {isEdit
                                        ? "Edit Skill"
                                        : "Add Skill"}
                                </h2>

                                <p className="mt-0.5 text-sm text-gray-500">
                                    {isEdit
                                        ? "Update your skill information."
                                        : "Add a skill to your professional profile."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-6">
                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Skill Name */}
                        <div>
                            <label
                                htmlFor="skill-name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Skill name
                            </label>

                            <input
                                id="skill-name"
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                    setForm(
                                        (prev) => ({
                                            ...prev,
                                            name: e.target
                                                .value,
                                        })
                                    )
                                }
                                placeholder="e.g. Laravel"
                                required
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <p className="mt-0.5 text-xs text-gray-400">
                                    Choose where this skill belongs.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {categories.map(
                                    (category) => {
                                        const selected =
                                            form.category ===
                                            category.value;

                                        return (
                                            <button
                                                key={
                                                    category.value
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setForm(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            category:
                                                                category.value,
                                                        })
                                                    )
                                                }
                                                className={`
                                                    flex items-center gap-2
                                                    rounded-xl border
                                                    px-3 py-2.5
                                                    text-left text-sm
                                                    transition
                                                    ${selected
                                                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                    }
                                                `}
                                            >
                                                <span>
                                                    {
                                                        category.icon
                                                    }
                                                </span>

                                                <span className="font-medium">
                                                    {
                                                        category.label
                                                    }
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* Level */}
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Proficiency level
                                </label>

                                <p className="mt-0.5 text-xs text-gray-400">
                                    How confident are you with this skill?
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {levels.map(
                                    (level) => {
                                        const selected =
                                            form.level ===
                                            level.value;

                                        return (
                                            <button
                                                key={
                                                    level.value
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setForm(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            level: level.value,
                                                        })
                                                    )
                                                }
                                                className={`
                                                    rounded-xl border
                                                    px-4 py-3
                                                    text-left
                                                    transition
                                                    ${selected
                                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className={`
                                                            text-sm font-semibold
                                                            ${selected
                                                                ? "text-primary"
                                                                : "text-gray-800"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            level.label
                                                        }
                                                    </span>

                                                    {selected && (
                                                        <span className="text-primary">
                                                            ✓
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {
                                                        level.description
                                                    }
                                                </p>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* Years */}
                        <div>
                            <div className="mb-2">
                                <label
                                    htmlFor="years-of-experience"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Years of experience
                                </label>

                                <p className="mt-0.5 text-xs text-gray-400">
                                    How long have you worked with this skill?
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="years-of-experience"
                                    type="number"
                                    min={0}
                                    max={50}
                                    value={
                                        form.years_of_experience
                                    }
                                    onChange={(e) =>
                                        setForm(
                                            (prev) => ({
                                                ...prev,
                                                years_of_experience:
                                                    Number(
                                                        e.target
                                                            .value
                                                    ),
                                            })
                                        )
                                    }
                                    className="h-11 w-28 rounded-xl border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                />

                                <span className="text-sm text-gray-500">
                                    years
                                </span>

                                <div className="ml-auto hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {form.years_of_experience}{" "}
                                        {form.years_of_experience ===
                                            1
                                            ? "year"
                                            : "years"}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Experience
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : isEdit
                                    ? "Save Changes"
                                    : "Add Skill"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}