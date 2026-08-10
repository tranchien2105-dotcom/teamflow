"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    getCv,
    type CvData,
    type CvTemplate,
} from "@/services/cv-service";

import CvTemplateSelector from "./components/cv-template-selector";
import ClassicTemplate from "./components/classic-template";
import ModernTemplate from "./components/modern-template";
import CvMinimalTemplate from "./components/minimal-template";

export default function CvPage() {
    const [cv, setCv] = useState<CvData | null>(null);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        async function loadCv() {
            try {
                const data = await getCv();

                setCv(data);
            } catch (error) {
                console.error(
                    "Failed to load CV:",
                    error
                );

                toast.error(
                    "Failed to load CV data."
                );
            } finally {
                setLoading(false);
            }
        }

        loadCv();
    }, []);

    const handleTemplateChange = (
        template: CvTemplate
    ) => {
        setCv((current) => {
            if (!current || !current.profile) {
                return current;
            }

            return {
                ...current,

                profile: {
                    ...current.profile,
                    cv_template: template,
                },
            };
        });
    };

    const handleExportPdf = () => {
        if (exporting) {
            return;
        }

        setExporting(true);

        document.body.classList.add(
            "cv-printing"
        );

        window.setTimeout(() => {
            window.print();

            window.setTimeout(() => {
                document.body.classList.remove(
                    "cv-printing"
                );

                setExporting(false);
            }, 500);
        }, 100);
    };

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-5xl p-6">
                <div className="h-[1000px] animate-pulse bg-gray-100" />
            </div>
        );
    }

    if (!cv) {
        return (
            <div className="mx-auto w-full max-w-5xl p-6">
                <div className="border border-dashed p-10 text-center">
                    <p className="text-gray-500">
                        Unable to load CV data.
                    </p>
                </div>
            </div>
        );
    }

    const selectedTemplate: CvTemplate =
        cv.profile?.cv_template ?? "classic";

    return (
        <div className="cv-page mx-auto w-full max-w-5xl p-6">
            {/* =====================================================
                PREVIEW HEADER
            ====================================================== */}
            <div className="no-print mb-6 flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        CV Preview
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Preview your CV before exporting it.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleExportPdf}
                    disabled={exporting}
                    className="
                        inline-flex
                        h-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-900
                        px-5
                        text-sm
                        font-medium
                        text-white
                        shadow-sm
                        transition
                        hover:bg-slate-800
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {exporting
                        ? "Preparing..."
                        : "Export PDF"}
                </button>
            </div>

            {/* =====================================================
                TEMPLATE SELECTOR
            ====================================================== */}
            <CvTemplateSelector
                value={selectedTemplate}
                onChange={handleTemplateChange}
            />

            {/* =====================================================
                CV DOCUMENT
            ====================================================== */}

            {selectedTemplate === "classic" && (
                <ClassicTemplate cv={cv} />
            )}

            {selectedTemplate === "modern" && (
                <ModernTemplate cv={cv} />
            )}

            {selectedTemplate === "minimal" && (
                <CvMinimalTemplate cv={cv} />
            )}
        </div>
    );
}
