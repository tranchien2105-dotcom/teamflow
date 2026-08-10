import type { ProjectDetail } from "@/types/project";

interface ProjectInfoProps {
    project: ProjectDetail;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                Project Information
            </h2>

            <div className="mt-5 divide-y divide-slate-100">
                <div className="flex justify-between py-3 first:pt-0">
                    <span className="text-sm text-slate-500">Status</span>
                    <span className="text-sm font-medium capitalize text-slate-900">
                        {project.status}
                    </span>
                </div>

                <div className="flex justify-between py-3">
                    <span className="text-sm text-slate-500">Started</span>
                    <span className="text-sm font-medium text-slate-900">
                        {project.started_at || "—"}
                    </span>
                </div>

                <div className="flex justify-between py-3">
                    <span className="text-sm text-slate-500">Completed</span>
                    <span className="text-sm font-medium text-slate-900">
                        {project.completed_at || "—"}
                    </span>
                </div>

                <div className="flex justify-between py-3">
                    <span className="text-sm text-slate-500">Created</span>
                    <span className="text-sm font-medium text-slate-900">
                        {new Date(project.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </section>
    );
}