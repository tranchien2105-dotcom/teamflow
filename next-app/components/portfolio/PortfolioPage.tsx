import Image from "next/image";
import Link from "next/link";

import type { PortfolioData } from "@/services/portfolio-service";

interface PortfolioPageProps {
    portfolio: PortfolioData;
}

function formatDate(date: string | null) {
    if (!date) {
        return "Present";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(parsedDate);
}

export default function PortfolioPage({
    portfolio,
}: PortfolioPageProps) {
    const user = portfolio.user;
    const profile = portfolio.profile;

    const experiences = portfolio.experiences;

    const projects = portfolio.projects.filter(
        (project) => project.featured,
    );

    const technologies = portfolio.skills;

    return (
        <main className="mx-auto max-w-6xl bg-[#0a192f] px-6 pb-24 sm:px-10 lg:px-12">
            {/* HERO */}
            <section className="flex min-h-[calc(100vh-5rem)] items-center py-24">
                <div className="max-w-3xl">
                    <p className="font-mono text-sm text-teal-300">
                        Hi, my name is
                    </p>

                    <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-slate-100 sm:text-5xl lg:text-6xl">
                        {profile?.full_name ?? user.name}.
                    </h1>

                    <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-400 sm:text-4xl lg:text-5xl">
                        {profile?.title ?? "Software Engineer"}
                    </h2>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                        {profile?.bio}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="#work"
                            className="inline-flex items-center border border-teal-300 px-5 py-3 font-mono text-xs text-teal-300 transition hover:bg-teal-300/10"
                        >
                            Check out my work
                        </Link>

                        {profile?.cv_url && (
                            <a
                                href={profile.cv_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center border border-slate-700 px-5 py-3 font-mono text-xs text-slate-300 transition hover:border-teal-300 hover:text-teal-300"
                            >
                                View CV
                            </a>
                        )}
                    </div>

                    <div className="mt-8 flex items-center gap-5 text-xs">
                        {profile?.github_url && (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 transition hover:text-teal-300"
                            >
                                GitHub ↗
                            </a>
                        )}

                        {profile?.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 transition hover:text-teal-300"
                            >
                                LinkedIn ↗
                            </a>
                        )}

                        {profile?.website_url && (
                            <a
                                href={profile.website_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 transition hover:text-teal-300"
                            >
                                Website ↗
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section
                id="about"
                className="scroll-mt-24 py-24"
            >
                <SectionHeading
                    number="01."
                    title="About Me"
                />

                <div className="mt-10 grid gap-10 md:grid-cols-[1fr_0.7fr]">
                    <div>
                        <p className="text-sm leading-7 text-slate-400 sm:text-base">
                            {profile?.bio}
                        </p>

                        <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                            My background is primarily focused on backend
                            engineering, REST APIs, databases and scalable
                            application architecture. I am currently expanding
                            my expertise into modern full-stack development
                            with Next.js, React and TypeScript.
                        </p>

                        <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                            I enjoy building software that is simple to
                            understand, reliable in production and easy to
                            maintain as the system grows.
                        </p>
                    </div>

                    <div className="md:pl-6">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">
                            Technologies
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                            {technologies
                                .slice(0, 6)
                                .map((technology) => (
                                    <div
                                        key={technology.id}
                                        className="flex items-center gap-3 font-mono text-xs text-slate-400"
                                    >
                                        <span className="text-teal-300">
                                            ▹
                                        </span>

                                        {technology.name}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE */}
            <section
                id="experience"
                className="scroll-mt-24 py-24"
            >
                <SectionHeading
                    number="02."
                    title="Where I've Worked"
                />

                <div className="mt-12 space-y-12">
                    {experiences.map((experience) => (
                        <article
                            key={experience.id}
                            className="group grid gap-4 sm:grid-cols-[150px_1fr]"
                        >
                            <p className="pt-1 font-mono text-[11px] uppercase tracking-wide text-slate-500">
                                {formatDate(experience.start_date)} —{" "}
                                {formatDate(experience.end_date)}
                            </p>

                            <div>
                                <h3 className="text-base font-semibold text-slate-100">
                                    {experience.position}{" "}
                                    <span className="text-teal-300">
                                        @ {experience.company}
                                    </span>
                                </h3>

                                {experience.employment_type && (
                                    <p className="mt-1 font-mono text-[11px] text-slate-500">
                                        {experience.employment_type}
                                        {experience.location
                                            ? ` · ${experience.location}`
                                            : ""}
                                    </p>
                                )}

                                <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-400">
                                    {experience.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* WORK */}
            <section
                id="work"
                className="scroll-mt-24 py-24"
            >
                <SectionHeading
                    number="03."
                    title="Some Things I've Built"
                />

                <div className="mt-14 space-y-24">
                    {projects.map((project, index) => {
                        const projectImage =
                            project.cover_image ??
                            project.images[0]?.image_url ??
                            null;

                        return (
                            <Link
                                key={project.id}
                                href={`/project/${project.slug}`}
                                className="group block"
                            >
                                <article
                                    className={`grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center ${
                                        index % 2 === 1
                                            ? "lg:[&>div:first-child]:order-2"
                                            : ""
                                    }`}
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden rounded bg-[#112240] lg:aspect-[16/9]">
                                        {projectImage ? (
                                            <Image
                                                src={projectImage}
                                                alt={project.title}
                                                fill
                                                className="object-contain grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-[#112240] font-mono text-xs text-slate-500">
                                                No project image
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-[#0a192f]/40 transition group-hover:bg-transparent" />
                                    </div>

                                    <div>
                                        <p className="font-mono text-[11px] text-teal-300">
                                            Featured Project
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold text-slate-100 transition group-hover:text-teal-300">
                                            {project.title}
                                        </h3>

                                        <div className="relative z-10 mt-4 rounded bg-[#112240] p-5 shadow-xl">
                                            <p className="text-sm leading-7 text-slate-400">
                                                {project.summary}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                                            {project.technologies.map(
                                                (technology) => (
                                                    <span
                                                        key={technology.id}
                                                        className="font-mono text-[11px] text-slate-400"
                                                    >
                                                        {technology.name}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>

            </section>

            {/* TECHNOLOGIES */}
            <section className="py-24">
                <SectionHeading
                    number="04."
                    title="Technologies"
                />

                <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4">
                    {technologies.map((technology) => (
                        <div
                            key={technology.id}
                            className="flex items-center gap-3 text-sm text-slate-400"
                        >
                            <span className="font-mono text-teal-300">
                                ▹
                            </span>

                            {technology.name}
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT */}
            <section
                id="contact"
                className="scroll-mt-24 py-32"
            >
                <div className="max-w-xl">
                    <p className="font-mono text-xs text-teal-300">
                        05. What's Next?
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-100 sm:text-4xl">
                        Get In Touch
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                        I'm currently open to new opportunities and
                        interesting projects. Whether you have a question or
                        just want to say hello, feel free to reach out.
                    </p>

                    {profile?.linkedin_url && (
                        <a
                            href={profile.linkedin_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex border border-teal-300 px-6 py-3 font-mono text-xs text-teal-300 transition hover:bg-teal-300/10"
                        >
                            Say Hello
                        </a>
                    )}
                </div>
            </section>
        </main>
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
            <span className="font-mono text-sm text-teal-300">
                {number}
            </span>

            <h2 className="whitespace-nowrap text-xl font-bold tracking-tight text-slate-100">
                {title}
            </h2>

            <span className="h-px flex-1 bg-slate-800" />
        </div>
    );
}
