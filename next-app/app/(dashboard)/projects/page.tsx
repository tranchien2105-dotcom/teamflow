import Link from "next/link";

import { getProjects } from "@/services/project-service";
import ProjectCard from "@/components/projects/project-card";

export default async function ProjectsPage() {
    const response = await getProjects();

    const projects = response.data;

    const totalProjects = response.total;
    const featuredProjects = projects.filter(
        (project) => project.featured
    ).length;

    const activeProjects = projects.filter(
        (project) => project.status === "active"
    ).length;

    const completedProjects = projects.filter(
        (project) => project.status === "completed"
    ).length;

    return (
        <div className="min-h-full bg-slate-50/70">
            <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">

                {/* Header */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>Workspace</span>
                            <span>/</span>
                            <span className="text-slate-900">
                                Projects
                            </span>
                        </div>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Projects
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage and track all your projects in one place.
                        </p>
                    </div>

                    <Link
                        href="/projects/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                    >
                        <span className="text-lg leading-none">+</span>
                        Create Project
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Total Projects
                        </p>

                        <div className="mt-2 flex items-end justify-between">
                            <p className="text-3xl font-bold text-slate-900">
                                {totalProjects}
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                                P
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Active
                        </p>

                        <div className="mt-2 flex items-end justify-between">
                            <p className="text-3xl font-bold text-slate-900">
                                {activeProjects}
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                A
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Completed
                        </p>

                        <div className="mt-2 flex items-end justify-between">
                            <p className="text-3xl font-bold text-slate-900">
                                {completedProjects}
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                ✓
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Featured
                        </p>

                        <div className="mt-2 flex items-end justify-between">
                            <p className="text-3xl font-bold text-slate-900">
                                {featuredProjects}
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                ★
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-900">
                            All Projects
                        </h2>

                        <p className="mt-0.5 text-sm text-slate-500">
                            {totalProjects} projects found
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            All
                        </button>

                        <button
                            type="button"
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Active
                        </button>

                        <button
                            type="button"
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Completed
                        </button>
                    </div>
                </div>

                {/* Projects */}
                {projects.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                            P
                        </div>

                        <h3 className="mt-4 font-semibold text-slate-900">
                            No projects yet
                        </h3>

                        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                            Create your first project to start organizing
                            your work.
                        </p>

                        <Link
                            href="/projects/create"
                            className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                            Create your first project
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
