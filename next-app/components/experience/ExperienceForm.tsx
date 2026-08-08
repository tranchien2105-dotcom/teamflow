"use client";

import { useEffect, useState } from "react";
import {
    createExperience,
    updateExperience,
    type Experience,
} from "@/services/experience-service";

interface ExperienceFormProps {
    open: boolean;
    experience: Experience | null;
    onClose: () => void;
    onSuccess: () => void;
}

type FormData = {
    company: string;
    position: string;
    location: string;
    employment_type: string;
    start_date: string;
    end_date: string;
    description: string;
};

const emptyForm: FormData = {
    company: "",
    position: "",
    location: "",
    employment_type: "",
    start_date: "",
    end_date: "",
    description: "",
};

export default function ExperienceForm({
    open,
    experience,
    onClose,
    onSuccess,
}: ExperienceFormProps) {
    const [form, setForm] = useState<FormData>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEdit = Boolean(experience);

    useEffect(() => {
        if (experience) {
            setForm({
                company: experience.company ?? "",
                position: experience.position ?? "",
                location: experience.location ?? "",
                employment_type: experience.employment_type ?? "",
                start_date: experience.start_date ?? "",
                end_date: experience.end_date ?? "",
                description: experience.description ?? "",
            });
        } else {
            setForm(emptyForm);
        }

        setError("");
    }, [experience, open]);

    if (!open) {
        return null;
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const payload = {
                company: form.company,
                position: form.position,
                location: form.location || undefined,
                employment_type: form.employment_type || undefined,
                start_date: form.start_date,
                end_date: form.end_date || undefined,
                description: form.description || undefined,
            };

            if (experience) {
                await updateExperience(experience.id, payload);
            } else {
                await createExperience(payload);
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to save experience:", error);
            setError("Failed to save experience. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !loading) {
                    onClose();
                }
            }}
        >
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {isEdit
                                ? "Edit Experience"
                                : "Add Experience"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {isEdit
                                ? "Update your professional experience."
                                : "Add a new professional experience."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Company / Position */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="company"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Company
                                </label>

                                <input
                                    id="company"
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. FinViet"
                                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="position"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Position
                                </label>

                                <input
                                    id="position"
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Backend Developer"
                                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        {/* Location / Employment Type */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="location"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Location
                                </label>

                                <input
                                    id="location"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Ho Chi Minh City"
                                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="employment_type"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Employment Type
                                </label>

                                <select
                                    id="employment_type"
                                    name="employment_type"
                                    value={form.employment_type}
                                    onChange={handleChange}
                                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="">Select type</option>
                                    <option value="Full-time">
                                        Full-time
                                    </option>
                                    <option value="Part-time">
                                        Part-time
                                    </option>
                                    <option value="Contract">
                                        Contract
                                    </option>
                                    <option value="Internship">
                                        Internship
                                    </option>
                                    <option value="Freelance">
                                        Freelance
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="start_date"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Start Date
                                </label>

                                <input
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    value={form.start_date}
                                    onChange={handleChange}
                                    required
                                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="end_date"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    End Date
                                </label>

                                <input
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    value={form.end_date}
                                    onChange={handleChange}
                                    disabled={!form.start_date}
                                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50"
                                />

                                <label className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                    <input
                                        type="checkbox"
                                        checked={!form.end_date}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setForm((prev) => ({
                                                    ...prev,
                                                    end_date: "",
                                                }));
                                            }
                                        }}
                                    />
                                    Currently working here
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Describe your responsibilities, achievements, technologies..."
                                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t px-6 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : isEdit
                                    ? "Update Experience"
                                    : "Add Experience"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}