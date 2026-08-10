import type { ProjectDetail } from "@/types/project";

interface Props {
    project: ProjectDetail;
}

export default function ProjectFeatures({ project }: Props) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                Features
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Key features included in this project
            </p>

            <div className="mt-5 space-y-3">
                {project.features.length > 0 ? (
                    project.features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-semibold text-slate-600 shadow-sm">
                                {feature.sort_order}
                            </div>

                            <div>
                                <h3 className="font-medium text-slate-900">
                                    {feature.title}
                                </h3>
                                {feature.description && (
                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        {feature.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500">
                        No features added yet.
                    </p>
                )}
            </div>
        </section>
    );
}