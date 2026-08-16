import Link from "next/link";

import {
    getDefaultPortfolio,
} from "@/services/portfolio-service";

import ScrollReveal from "@/components/public/scroll-reveal";
import PageLoader from "@/components/public/PageLoader";

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

export default async function HomePage() {
    const portfolio = await getDefaultPortfolio();

    const user = portfolio.user;
    const profile = portfolio.profile;

    const experiences = portfolio.experiences;

    const projects = portfolio.projects.filter(
        (project) => project.featured
    );

    const technologies = portfolio.skills;

    return (
        <>
            {/* =====================================================
                PAGE LOADER
            ====================================================== */}

            <PageLoader />

            <main className="mx-auto max-w-6xl bg-[#111111] px-6 pb-24 sm:px-10 lg:px-12">

                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="flex min-h-[calc(100vh-5rem)] items-center py-24">
                    <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">

                        {/* HERO CONTENT */}

                        <div className="max-w-3xl">

                            <ScrollReveal delay={100}>
                                <p className="font-mono text-sm text-amber-400">
                                    Hi, my name is
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={200}>
                                <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-zinc-100 sm:text-5xl lg:text-6xl">
                                    {profile?.full_name ?? user.name}.
                                </h1>
                            </ScrollReveal>

                            <ScrollReveal delay={300}>
                                <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-zinc-500 sm:text-4xl lg:text-5xl">
                                    {profile?.title ?? "Software Engineer"}
                                </h2>
                            </ScrollReveal>

                            <ScrollReveal delay={400}>
                                <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                                    {profile?.bio}
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={500}>
                                <div className="mt-8 flex flex-wrap gap-4">

                                    <Link
                                        href="#work"
                                        className="
                                            inline-flex
                                            items-center
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
                                        Check out my work
                                    </Link>

                                    {profile?.cv_url && (
                                        <a
                                            href={profile.cv_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="
                                                inline-flex
                                                items-center
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
                                            View CV
                                        </a>
                                    )}

                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="mt-8 flex items-center gap-5 text-xs">

                                    {profile?.github_url && (
                                        <a
                                            href={profile.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-zinc-600 transition hover:text-amber-400"
                                        >
                                            GitHub ↗
                                        </a>
                                    )}

                                    {profile?.linkedin_url && (
                                        <a
                                            href={profile.linkedin_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-zinc-600 transition hover:text-amber-400"
                                        >
                                            LinkedIn ↗
                                        </a>
                                    )}

                                    {profile?.website_url && (
                                        <a
                                            href={profile.website_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-zinc-600 transition hover:text-amber-400"
                                        >
                                            Website ↗
                                        </a>
                                    )}

                                </div>
                            </ScrollReveal>

                        </div>

                        {/* HERO IMAGE */}

                        <ScrollReveal delay={400}>
                            <div className="group relative mx-auto h-72 w-72 sm:h-80 sm:w-80 lg:h-[380px] lg:w-[380px]">

                                {/* Glow */}

                                <div
                                    className="
                                        absolute
                                        -inset-3
                                        rounded-full
                                        bg-amber-400/5
                                        blur-2xl
                                        transition-all
                                        duration-500
                                        group-hover:bg-amber-400/10
                                    "
                                />

                                {/* Image frame */}

                                <div
                                    className="
                                        relative
                                        h-full
                                        w-full
                                        overflow-hidden
                                        rounded-full
                                        border-2
                                        border-amber-400/60
                                        bg-[#1a1a1a]
                                        transition-all
                                        duration-500
                                        group-hover:scale-[1.02]
                                        group-hover:border-amber-400
                                        group-hover:shadow-[0_0_30px_rgba(251,191,36,0.16)]
                                    "
                                >
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt={
                                                profile?.full_name ??
                                                user.name
                                            }
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center font-mono text-xs text-zinc-600">
                                            No profile image
                                        </div>
                                    )}

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-amber-400/5
                                            transition-opacity
                                            duration-500
                                            group-hover:opacity-0
                                        "
                                    />
                                </div>

                            </div>
                        </ScrollReveal>

                    </div>
                </section>

                {/* =====================================================
                    ABOUT
                ====================================================== */}

                <section
                    id="about"
                    className="scroll-mt-24 py-24"
                >
                    <ScrollReveal>
                        <SectionHeading
                            number="01."
                            title="About Me"
                        />
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_0.7fr]">

                            <div>

                                <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                                    {profile?.bio}
                                </p>

                                <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
                                    My background is primarily focused on backend
                                    engineering, REST APIs, databases and scalable
                                    application architecture. I am currently
                                    expanding my expertise into modern full-stack
                                    development with Next.js, React and TypeScript.
                                </p>

                                <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
                                    I enjoy building software that is simple to
                                    understand, reliable in production and easy to
                                    maintain as the system grows.
                                </p>

                            </div>

                            <div className="md:pl-6">

                                <p className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
                                    Technologies
                                </p>

                                <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">

                                    {technologies.slice(0, 20).map(
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
                            </div>

                        </div>
                    </ScrollReveal>
                </section>

                {/* =====================================================
                    EXPERIENCE
                ====================================================== */}

                <section
                    id="experience"
                    className="scroll-mt-24 py-24"
                >
                    <ScrollReveal>
                        <SectionHeading
                            number="02."
                            title="Where I've Worked"
                        />
                    </ScrollReveal>

                    <div className="mt-12 space-y-12">

                        {experiences.map((experience, index) => (
                            <ScrollReveal
                                key={experience.id}
                                delay={index * 100}
                            >
                                <article className="group grid gap-4 sm:grid-cols-[150px_1fr]">

                                    <p className="pt-1 font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                                        {formatDate(experience.start_date)}
                                        {" — "}
                                        {formatDate(experience.end_date)}
                                    </p>

                                    <div>

                                        <h3 className="text-base font-semibold text-zinc-100">
                                            {experience.position}{" "}
                                            <span className="text-amber-400">
                                                @ {experience.company}
                                            </span>
                                        </h3>

                                        {experience.employment_type && (
                                            <p className="mt-1 font-mono text-[11px] text-zinc-600">
                                                {experience.employment_type}
                                                {experience.location
                                                    ? ` · ${experience.location}`
                                                    : ""}
                                            </p>
                                        )}

                                        <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-7 text-zinc-400">
                                            {experience.description}
                                        </p>

                                    </div>

                                </article>
                            </ScrollReveal>
                        ))}

                    </div>
                </section>

                {/* =====================================================
                    WORK
                ====================================================== */}

                <section
                    id="work"
                    className="scroll-mt-24 py-24"
                >
                    <ScrollReveal>
                        <SectionHeading
                            number="03."
                            title="Some Things I've Built"
                        />
                    </ScrollReveal>

                    <div className="mt-14 space-y-24">

                        {projects.map((project, index) => {

                            const projectImage =
                                project.cover_image ??
                                project.images[0]?.image_url ??
                                null;

                            return (
                                <ScrollReveal
                                    key={project.id}
                                    delay={100}
                                >
                                    <Link
                                        href={`/project/${project.slug}`}
                                        className="group block"
                                    >
                                        <article
                                            className={`
                                                grid
                                                gap-8
                                                lg:grid-cols-[1.2fr_0.8fr]
                                                lg:items-center
                                                ${
                                                    index % 2 === 1
                                                        ? "lg:[&>div:first-child]:order-2"
                                                        : ""
                                                }
                                            `}
                                        >

                                            {/* PROJECT IMAGE */}

                                            <div className="relative aspect-[16/10] overflow-hidden rounded bg-[#1a1a1a] lg:aspect-[16/9]">

                                                {projectImage ? (
                                                    <img
                                                        src={projectImage}
                                                        alt={project.title}
                                                        className="
                                                            absolute
                                                            inset-0
                                                            h-full
                                                            w-full
                                                            object-contain
                                                            grayscale
                                                            transition
                                                            duration-500
                                                            group-hover:scale-105
                                                            group-hover:grayscale-0
                                                        "
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center bg-[#1a1a1a] font-mono text-xs text-zinc-600">
                                                        No project image
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-[#111111]/40 transition group-hover:bg-transparent" />

                                            </div>

                                            {/* PROJECT CONTENT */}

                                            <div>

                                                <p className="font-mono text-[11px] text-amber-400">
                                                    {project.featured
                                                        ? "Featured Project"
                                                        : "Project"}
                                                </p>

                                                <h3 className="mt-2 text-xl font-bold text-zinc-100 transition group-hover:text-amber-400">
                                                    {project.title}
                                                </h3>

                                                <div className="relative z-10 mt-4 rounded bg-[#1a1a1a] p-5 shadow-xl">

                                                    <p className="text-sm leading-7 text-zinc-400">
                                                        {project.summary}
                                                    </p>

                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">

                                                    {project.technologies.map(
                                                        (technology) => (
                                                            <span
                                                                key={technology.id}
                                                                className="font-mono text-[11px] text-zinc-500"
                                                            >
                                                                {technology.name}
                                                            </span>
                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        </article>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}

                    </div>

                </section>

                {/* =====================================================
                    TECHNOLOGIES
                ====================================================== */}

                <section className="py-24">

                    <ScrollReveal>
                        <SectionHeading
                            number="04."
                            title="Technologies"
                        />
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4">

                            {technologies.map((technology) => (
                                <div
                                    key={technology.id}
                                    className="flex items-center gap-3 text-sm text-zinc-400"
                                >
                                    <span className="font-mono text-amber-400">
                                        ▹
                                    </span>

                                    {technology.name}
                                </div>
                            ))}

                        </div>
                    </ScrollReveal>

                </section>

                {/* =====================================================
                    CONTACT
                ====================================================== */}

                <section
                    id="contact"
                    className="scroll-mt-24 py-32"
                >

                    <ScrollReveal>

                        <div className="max-w-xl">

                            <p className="font-mono text-xs text-amber-400">
                                05. What's Next?
                            </p>

                            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-zinc-100 sm:text-4xl">
                                Get In Touch
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
                                I'm currently open to new opportunities and
                                interesting projects. Whether you have a question
                                or just want to say hello, feel free to reach out.
                            </p>

                            {profile?.linkedin_url && (
                                <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        mt-8
                                        inline-flex
                                        border
                                        border-amber-400
                                        px-6
                                        py-3
                                        font-mono
                                        text-xs
                                        text-amber-400
                                        transition
                                        hover:bg-amber-400/10
                                    "
                                >
                                    Say Hello
                                </a>
                            )}

                        </div>

                    </ScrollReveal>

                </section>

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
