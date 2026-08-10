"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    updateCvTemplate,
    type CvTemplate,
} from "@/services/cv-service";

interface CvTemplateSelectorProps {
    value: CvTemplate;
    onChange: (template: CvTemplate) => void;
}

const templates: {
    value: CvTemplate;
    label: string;
    description: string;
}[] = [
    {
        value: "classic",
        label: "Classic",
        description: "Traditional & professional",
    },
    {
        value: "modern",
        label: "Modern",
        description: "Clean & contemporary",
    },
    {
        value: "minimal",
        label: "Minimal",
        description: "Simple & focused",
    },
];

export default function CvTemplateSelector({
    value,
    onChange,
}: CvTemplateSelectorProps) {
    const [savingTemplate, setSavingTemplate] =
        useState<CvTemplate | null>(null);

    const handleChange = async (template: CvTemplate) => {
        if (template === value || savingTemplate) {
            return;
        }

        try {
            setSavingTemplate(template);

            await updateCvTemplate(template);

            onChange(template);
        } catch (error) {
            console.error(
                "Failed to update CV template:",
                error
            );

            toast.error(
                "Failed to update CV template."
            );
        } finally {
            setSavingTemplate(null);
        }
    };

    return (
        <div className="no-print mb-6">
            {/* HEADER */}
            <div className="mb-4">
                <h2 className="text-sm font-semibold text-gray-900">
                    CV Template
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Choose a layout for your CV.
                </p>
            </div>

            {/* TEMPLATES */}
            <div className="grid gap-3 sm:grid-cols-3">
                {templates.map((template) => {
                    const selected =
                        template.value === value;

                    const saving =
                        savingTemplate ===
                        template.value;

                    return (
                        <button
                            key={template.value}
                            type="button"
                            disabled={
                                savingTemplate !== null
                            }
                            onClick={() =>
                                handleChange(
                                    template.value
                                )
                            }
                            className={[
                                "group relative rounded-xl border p-4 text-left transition-all",
                                "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                                "disabled:cursor-not-allowed",
                                selected
                                    ? "border-slate-900 bg-slate-50 shadow-sm"
                                    : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm",
                            ].join(" ")}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-gray-900">
                                    {template.label}
                                </span>

                                {selected && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white">
                                        ✓
                                    </span>
                                )}

                                {saving && (
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-slate-900" />
                                )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                {template.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
