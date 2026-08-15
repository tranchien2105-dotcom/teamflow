import Link from "next/link";
import { notFound } from "next/navigation";

import { getPublicProject } from "@/services/project-service";

import ScrollReveal from "@/components/public/scroll-reveal";
import PageLoader from "@/components/public/PageLoader";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProjectPage({
    params,
}: ProjectPageProps) {
    const { slug } = await params;

    let project;

    try {
        project = await getPublicProject(slug);
    } catch (error) {
        console.error(
            "Failed to fetch public project:",
            error
        );

        notFound();
    }

    return (
        <>
            <PageLoader />

            <main className="mx-auto max-w-5xl bg-[#111111] px-6 pb-24 sm:px-10 lg:px-12">

                {/* =====================================================
                    BACK
                ====================================================== */}

                <ScrollReveal delay={100}>
                    <div className="pt-12">
                        <Link
                            href="/"
                            className="font-mono text-xs text-amber-400 transition hover:text-amber-300"
                        >
                            ← Back to portfolio
                        </Link>
                    </div>
                </ScrollReveal>

                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="py-20">

                    <ScrollReveal delay={150}>
                        <p className="font-mono text-xs text-amber-400">
                            {project.featured
                                ? "Featured Project"
                                : "Project"}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={250}>
                        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-zinc-100 sm:text-5xl lg:text-6xl">
                            {project.title}
                        </h1>
                    </ScrollReveal>

                    {project.summary && (
                        <ScrollReveal delay={350}>
                            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400">
                                {project.summary}
                            </p>
                        </ScrollReveal>
                    )}

                    <ScrollReveal delay={450}>
                        <div className="mt-8 flex flex-wrap gap-4">

                            {project.demo_url && (
                                <a
                                    href={project.demo_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        inline-flex
                                        border
                                        border-amber-400
                                        px-5
                                        py-3
                                        font-mono
                                        text-xs
                                        text-amber-400
                                        transition
                                        hover:bg-amber-400/10
                                    "
                                >
                                    Live Demo ↗
                                </a>
                            )}

                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        inline-flex
                                        border
                                        border-zinc-700
                                        px-5
                                        py-3
                                        font-mono
                                        text-xs
                                        text-zinc-300
                                        transition
                                        hover:border-amber-400
                                        hover:text-amber-400
                                    "
                                >
                                    GitHub ↗
                                </a>
                            )}

                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={550}>
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] text-zinc-600">

                            {project.started_at && (
                                <span>
                                    Started:{" "}
                                    {formatDate(project.started_at)}
                                </span>
                            )}

                            {project.completed_at && (
                                <span>
                                    Completed:{" "}
                                    {formatDate(
                                        project.completed_at
                                    )}
                                </span>
                            )}

                            {project.status && (
                                <span>
                                    Status: {project.status}
                                </span>
                            )}

                        </div>
                    </ScrollReveal>

                </section>

                {/* =====================================================
                    COVER
                ====================================================== */}

                {project.cover_image && (
                    <ScrollReveal>
                        <section>

                            <div className="relative aspect-[16/9] overflow-hidden rounded border border-zinc-800">

                                <img
                                    src={project.cover_image}
                                    alt={project.title}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition
                                        duration-700
                                        hover:scale-[1.02]
                                    "
                                />

                            </div>

                        </section>
                    </ScrollReveal>
                )}

                {/* =====================================================
                    CONTENT
                ====================================================== */}

                {project.content && (
                    <section className="py-20">

                        <ScrollReveal>
                            <SectionHeading
                                number="01."
                                title="About This Project"
                            />
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="mt-10 max-w-3xl">
                                <p className="whitespace-pre-line text-sm leading-8 text-zinc-400 sm:text-base">
                                    {project.content}
                                </p>
                            </div>
                        </ScrollReveal>

                    </section>
                )}

                {/* =====================================================
                    FEATURES
                ====================================================== */}

                {project.features.length > 0 && (
                    <section className="py-20">

                        <ScrollReveal>
                            <SectionHeading
                                number="02."
                                title="Key Features"
                            />
                        </ScrollReveal>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2">

                            {project.features.map(
                                (feature, index) => (
                                    <ScrollReveal
                                        key={feature.id}
                                        delay={index * 100}
                                    >
                                        <article
                                            className="
                                                group
                                                h-full
                                                border
                                                border-zinc-800
                                                bg-[#1a1a1a]
                                                p-6
                                                transition
                                                duration-300
                                                hover:-translate-y-1
                                                hover:border-amber-400/30
                                            "
                                        >
                                            <div className="flex items-start gap-4">

                                                <span className="mt-1 font-mono text-amber-400">
                                                    ▹
                                                </span>

                                                <div>

                                                    <h3 className="font-semibold text-zinc-100 transition group-hover:text-amber-400">
                                                        {feature.title}
                                                    </h3>

                                                    {feature.description && (
                                                        <p className="mt-3 text-sm leading-7 text-zinc-400">
                                                            {
                                                                feature.description
                                                            }
                                                        </p>
                                                    )}

                                                </div>

                                            </div>
                                        </article>
                                    </ScrollReveal>
                                )
                            )}

                        </div>

                    </section>
                )}

                {/* =====================================================
                    TECHNOLOGIES
                ====================================================== */}

                {project.technologies.length > 0 && (
                    <section className="py-20">

                        <ScrollReveal>
                            <SectionHeading
                                number="03."
                                title="Technologies"
                            />
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4">

                                {project.technologies.map(
                                    (technology) => (
                                        <div
                                            key={technology.id}
                                            className="flex items-center gap-3 font-mono text-xs text-zinc-400"
                                        >
                                            <span className="text-amber-400">
                                                ▹
                                            </span>

                                            {technology.name}
                                        </div>
                                    )
                                )}

                            </div>
                        </ScrollReveal>

                    </section>
                )}

                {/* =====================================================
                    GALLERY
                ====================================================== */}

                {project.images.length > 0 && (
                    <section className="py-20">

                        <ScrollReveal>
                            <SectionHeading
                                number="04."
                                title="Project Gallery"
                            />
                        </ScrollReveal>

                        <div className="mt-10 space-y-10">

                            {project.images.map(
                                (image, index) => (
                                    <ScrollReveal
                                        key={image.id}
                                        delay={index * 100}
                                    >
                                        <div>

                                            <div className="relative aspect-[16/10] overflow-hidden rounded border border-zinc-800">

                                                <img
                                                    src={image.image_url}
                                                    alt={
                                                        image.caption ??
                                                        project.title
                                                    }
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                        transition
                                                        duration-500
                                                        hover:scale-[1.02]
                                                    "
                                                />

                                            </div>

                                            {image.caption && (
                                                <p className="mt-3 font-mono text-xs text-zinc-600">
                                                    {image.caption}
                                                </p>
                                            )}

                                        </div>
                                    </ScrollReveal>
                                )
                            )}

                        </div>

                    </section>
                )}

                {/* =====================================================
                    LINKS
                ====================================================== */}

                {project.links.length > 0 && (
                    <section className="py-20">

                        <ScrollReveal>
                            <SectionHeading
                                number="05."
                                title="Links"
                            />
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="mt-8 flex flex-wrap gap-5">

                                {project.links.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            inline-flex
                                            items-center
                                            border
                                            border-zinc-800
                                            px-4
                                            py-3
                                            font-mono
                                            text-xs
                                            text-amber-400
                                            transition
                                            hover:border-amber-400
                                            hover:bg-amber-400/5
                                        "
                                    >
                                        {link.label} ↗
                                    </a>
                                ))}

                            </div>
                        </ScrollReveal>

                    </section>
                )}

                {/* =====================================================
                    BACK
                ====================================================== */}

                <ScrollReveal>

                    <div className="border-t border-zinc-800 pt-10">

                        <Link
                            href="/"
                            className="font-mono text-xs text-amber-400 transition hover:text-amber-300"
                        >
                            ← Back to portfolio
                        </Link>

                    </div>

                </ScrollReveal>

            </main>
        </>
    );
}

function SectionHeading({
    number,
    title,
}: {
    number: string;
    title: string;
}) {
    return (
        <div className="flex items-center gap-4">

            <span className="font-mono text-sm text-amber-400">
                {number}
            </span>

            <h2 className="whitespace-nowrap text-xl font-bold tracking-tight text-zinc-100">
                {title}
            </h2>

            <span className="h-px flex-1 bg-zinc-800" />

        </div>
    );
}

function formatDate(date: string): string {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(parsedDate);
}
