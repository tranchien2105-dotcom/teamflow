import Link from "next/link";

import type { Project } from "@/types/project";

interface ProjectCardProps {
    project: Project;
}

const statusStyles: Record<string, string> = {
    draft: "bg-slate-100 text-slate-600 ring-slate-200",
    active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    completed: "bg-blue-50 text-blue-700 ring-blue-200",
    archived: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function ProjectCard({
    project,
}: ProjectCardProps) {
    const statusClass =
        statusStyles[project.status] ??
        "bg-slate-100 text-slate-600 ring-slate-200";

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            {/* Cover */}
            <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
                {project.cover_image ? (
                    <img
                        src={project.cover_image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl font-bold text-white shadow-lg backdrop-blur">
                            {project.title.charAt(0).toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Featured */}
                {project.featured && (
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
                        <span className="text-amber-500">★</span>
                        Featured
                    </div>
                )}

                {/* Status */}
                <div className="absolute right-4 top-4">
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass}`}
                    >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                        {project.status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <Link
                            href={`/projects/${project.id}`}
                            className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900 transition hover:text-slate-600"
                        >
                            {project.title}
                        </Link>

                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                            {project.slug}
                        </p>
                    </div>

                    <Link
                        href={`/projects/${project.id}/edit`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                        aria-label={`Edit ${project.title}`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                        </svg>
                    </Link>
                </div>

                {/* Summary */}
                <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                    {project.summary ||
                        "No project description has been added yet."}
                </p>

                {/* Date */}
                <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                    >
                        <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                        />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>

                    <span>
                        {project.started_at
                            ? `Started ${project.started_at}`
                            : "Start date not set"}
                    </span>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-100" />

                {/* Footer */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-3.5 w-3.5"
                                >
                                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                                </svg>
                                GitHub
                            </a>
                        )}

                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-3.5 w-3.5"
                                >
                                    <path d="M15 3h6v6" />
                                    <path d="M10 14 21 3" />
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                </svg>
                                Demo
                            </a>
                        )}
                    </div>

                    <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                    >
                        View
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
