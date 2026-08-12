import Link from "next/link";

import ProjectForm from "@/components/projects/project-form";

export default function CreateProjectPage() {
    return (
        <div className="min-h-full bg-slate-50/70">
            <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link
                            href="/projects"
                            className="transition hover:text-slate-900"
                        >
                            Projects
                        </Link>

                        <span>/</span>

                        <span className="text-slate-900">
                            Create
                        </span>
                    </div>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                        Create Project
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Create a new project for your portfolio.
                    </p>
                </div>

                <ProjectForm mode="create" />
            </div>
        </div>
    );
}