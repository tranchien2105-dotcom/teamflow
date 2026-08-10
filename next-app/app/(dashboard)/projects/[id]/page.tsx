import { getProject } from "@/services/project-service";

import ProjectHero from "@/components/projects/project-hero";
import ProjectInfo from "@/components/projects/project-info";
import ProjectTechnologies from "@/components/projects/project-technologies";
import ProjectFeatures from "@/components/projects/project-features";
import ProjectGallery from "@/components/projects/project-gallery";

interface ProjectDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}
export default async function ProjectDetailPage({
    params,
}: ProjectDetailPageProps) {
    const { id } = await params;

    const project = await getProject(id);

    return (
        <div className="min-h-full bg-slate-50/70">
            <div className="mx-auto max-w-7xl space-y-6 p-6 lg:p-8">
                <ProjectHero project={project} />

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">
                                About this project
                            </h2>

                            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                                {project.content ||
                                    "No detailed description available."}
                            </p>
                        </section>

                        <ProjectTechnologies project={project} />

                        <ProjectFeatures project={project} />

                        <ProjectGallery project={project} />
                    </div>

                    <aside className="space-y-6">
                        <ProjectInfo project={project} />

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Project Links
                            </h2>

                            <div className="mt-5 space-y-2">
                                {project.links?.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-slate-800">
                                                {link.label}
                                            </p>

                                            {link.type && (
                                                <p className="text-xs capitalize text-slate-400">
                                                    {link.type}
                                                </p>
                                            )}
                                        </div>

                                        <span className="text-slate-400">
                                            ↗
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}