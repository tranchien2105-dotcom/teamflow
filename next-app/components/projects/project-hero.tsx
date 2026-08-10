import Link from "next/link";
import type { ProjectDetail } from "@/types/project";

interface ProjectHeroProps {
    project: ProjectDetail;
}

const statusStyles: Record<string, string> = {
    draft: "bg-slate-100 text-slate-700 ring-slate-200",
    active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    completed: "bg-blue-50 text-blue-700 ring-blue-200",
    archived: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function ProjectHero({ project }: ProjectHeroProps) {
    const statusClass =
        statusStyles[project.status] ??
        "bg-slate-100 text-slate-700 ring-slate-200";

    return (
        <>
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <Link
                    href="/projects"
                    className="transition hover:text-slate-900"
                >
                    Projects
                </Link>
                <span>/</span>
                <span className="truncate text-slate-900">
                    {project.title}
                </span>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 lg:h-80">
                    {project.cover_image ? (
                        <img
                            src={project.cover_image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-4xl font-bold text-white backdrop-blur">
                                {project.title.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="flex flex-wrap gap-2">
                            <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass}`}
                            >
                                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                                {project.status}
                            </span>

                            {project.featured && (
                                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800">
                                    <span className="mr-1 text-amber-500">
                                        ★
                                    </span>
                                    Featured
                                </span>
                            )}
                        </div>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                            {project.title}
                        </h1>

                        <p className="mt-1 text-sm text-slate-300">
                            /{project.slug}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-2xl text-sm leading-6 text-slate-500">
                        {project.summary ||
                            "No project summary has been added yet."}
                    </p>

                    <div className="flex shrink-0 gap-2">
                        <Link
                            href={`/projects/${project.id}/edit`}
                            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                            Edit Project
                        </Link>

                        <Link
                            href="/projects"
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Back
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}