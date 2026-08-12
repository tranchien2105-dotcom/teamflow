import Link from "next/link";

import { getProject } from "@/services/project-service";
import ProjectForm from "@/components/projects/project-form";

interface EditProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProjectPage({
    params,
}: EditProjectPageProps) {
    const { id } = await params;

    const project = await getProject(id);

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

                        <Link
                            href={`/projects/${project.id}`}
                            className="transition hover:text-slate-900"
                        >
                            {project.title}
                        </Link>

                        <span>/</span>

                        <span className="text-slate-900">
                            Edit
                        </span>
                    </div>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                        Edit Project
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Update your project information and content.
                    </p>
                </div>

                <ProjectForm
                    mode="edit"
                    project={project}
                />
            </div>
        </div>
    );
}