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
            <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
                <div>
                    <p className="text-sm font-semibold text-slate-500">
                        Projects
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                        Edit Project
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Update your project information,
                        links and project details.
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