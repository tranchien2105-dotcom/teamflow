import type { ProjectDetail } from "@/types/project";

interface Props {
    project: ProjectDetail;
}

export default function ProjectGallery({ project }: Props) {
    if (!project.images.length) {
        return null;
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                Project Gallery
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Screenshots and project visuals
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {project.images.map((image) => (
                    <div
                        key={image.id}
                        className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                    >
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={image.image_url}
                                alt={image.caption || project.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                        </div>

                        {image.caption && (
                            <div className="px-3 py-2.5 text-xs text-slate-500">
                                {image.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}