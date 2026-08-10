import type { ProjectDetail } from "@/types/project";

interface Props {
    project: ProjectDetail;
}

export default function ProjectTechnologies({ project }: Props) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                Technologies
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Technologies used in this project
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
                {project.technologies.length > 0 ? (
                    project.technologies.map((technology) => (
                        <div
                            key={technology.id}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-bold text-slate-500 shadow-sm">
                                {technology.name.charAt(0).toUpperCase()}
                            </span>

                            <span className="text-sm font-medium text-slate-700">
                                {technology.name}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500">
                        No technologies added yet.
                    </p>
                )}
            </div>
        </section>
    );
}