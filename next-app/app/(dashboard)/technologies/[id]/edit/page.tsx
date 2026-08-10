import { notFound } from "next/navigation";

import TechnologyForm from "@/components/technology/TechnologyForm";
import { getTechnology } from "@/services/technology-service";

interface EditTechnologyPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditTechnologyPage({
    params,
}: EditTechnologyPageProps) {
    const { id } = await params;

    let technology;

    try {
        technology = await getTechnology(id);
    } catch (error) {
        console.error(
            "Failed to fetch technology:",
            error
        );

        notFound();
    }

    if (!technology) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}

                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                        <span>Technologies</span>

                        <span>/</span>

                        <span className="text-slate-700">
                            Edit
                        </span>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-200">
                            <svg
                                className="h-6 w-6"
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
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Edit Technology
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Update{" "}
                                <span className="font-medium text-slate-700">
                                    {technology.name}
                                </span>{" "}
                                information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}

                <TechnologyForm
                    mode="edit"
                    technology={technology}
                />
            </div>
        </main>
    );
}