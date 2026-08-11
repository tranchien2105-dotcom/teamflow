import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        title: "TeamFlow",
        category: "Full-stack platform",
        description:
            "A modern platform for managing teams, projects, profiles and professional portfolios.",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85",
        tags: ["Next.js", "Laravel", "PostgreSQL"],
        href: "/projects/teamflow",
    },
    {
        title: "E-Commerce Platform",
        category: "Web application",
        description:
            "A complete e-commerce system with product management, categories, cart and administration.",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
        tags: ["Laravel", "Vue.js", "MySQL"],
        href: "/projects/ecommerce",
    },
    {
        title: "Developer Portfolio",
        category: "Personal website",
        description:
            "A clean portfolio experience designed to showcase engineering work, experience and writing.",
        image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        href: "/projects/portfolio",
    },
];

const technologies = [
    "PHP",
    "Laravel",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Git",
    "REST API",
    "Linux",
];

const posts = [
    {
        date: "Aug 08, 2026",
        title: "Building a full-stack application with Next.js and Laravel",
        category: "Development",
    },
    {
        date: "Jul 29, 2026",
        title: "What I learned building REST APIs with Laravel",
        category: "Laravel",
    },
    {
        date: "Jul 18, 2026",
        title: "Understanding PostgreSQL indexes and query performance",
        category: "Database",
    },
];

export default function HomePage() {
    return (
        <main className="bg-white text-slate-950">
            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative overflow-hidden border-b border-slate-200">
                <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-50 blur-3xl" />

                <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
                    <div>
                        <div className="mb-8 flex items-center gap-3">
                            <span className="h-2 w-2 bg-emerald-500" />

                            <span className="text-sm font-medium text-slate-500">
                                Available for opportunities
                            </span>
                        </div>

                        <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Software Engineer
                        </p>

                        <h1 className="max-w-5xl text-5xl font-bold leading-[0.94] tracking-[-0.065em] sm:text-6xl lg:text-[82px]">
                            I build digital
                            <span className="block text-slate-300">
                                experiences.
                            </span>
                        </h1>

                        <p className="mt-9 max-w-xl text-lg leading-8 text-slate-600">
                            Backend-focused developer passionate about
                            building reliable systems, clean APIs and
                            modern web applications.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                href="#projects"
                                className="group inline-flex items-center gap-4 bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-600"
                            >
                                Explore my work

                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/cv"
                                className="inline-flex items-center border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-800 transition hover:border-slate-950"
                            >
                                View CV
                            </Link>
                        </div>

                        <div className="mt-10 flex gap-7 text-sm">
                            <a
                                href="#"
                                className="text-slate-500 transition hover:text-slate-950"
                            >
                                GitHub ↗
                            </a>

                            <a
                                href="#"
                                className="text-slate-500 transition hover:text-slate-950"
                            >
                                LinkedIn ↗
                            </a>

                            <a
                                href="mailto:tranchien021@gmail.com"
                                className="text-slate-500 transition hover:text-slate-950"
                            >
                                Email ↗
                            </a>
                        </div>
                    </div>

                    {/* HERO IMAGE */}

                    <div className="relative mx-auto w-full max-w-[520px]">
                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                            <Image
                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85"
                                alt="Developer workspace"
                                fill
                                priority
                                className="object-cover grayscale-[15%] transition duration-700 hover:scale-[1.02]"
                                sizes="(max-width: 1024px) 90vw, 500px"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 p-7 text-white">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                                    Backend → Full-stack
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
                                    Building with purpose.
                                </h2>
                            </div>
                        </div>

                        <div className="absolute -bottom-5 -left-5 hidden border border-slate-200 bg-white px-5 py-4 md:block">
                            <p className="text-xs text-slate-400">
                                Currently working with
                            </p>

                            <p className="mt-1 text-sm font-bold">
                                Laravel + Next.js
                            </p>
                        </div>

                        <div className="absolute -right-4 -top-4 h-24 w-24 border border-blue-200" />
                    </div>
                </div>
            </section>

            {/* =====================================================
                STACK
            ====================================================== */}

            <section className="border-b border-slate-800 bg-slate-950 text-white">
                <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
                    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                        {technologies.slice(0, 7).map((technology) => (
                            <span
                                key={technology}
                                className="text-sm font-medium text-slate-400 transition hover:text-white"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                ABOUT
            ====================================================== */}

            <section className="border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
                    <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                About me
                            </p>
                        </div>

                        <div>
                            <h2 className="max-w-4xl text-3xl font-bold leading-[1.1] tracking-[-0.045em] sm:text-5xl">
                                I like turning complicated problems into
                                simple, reliable software.
                            </h2>

                            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-500">
                                My background is primarily in PHP and Laravel,
                                with a strong focus on backend architecture,
                                REST APIs, databases and application design.
                                Recently, I have been expanding into Next.js,
                                React and TypeScript to build complete
                                full-stack products.
                            </p>

                            <div className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                                {[
                                    "Backend Development",
                                    "API Design",
                                    "Database Architecture",
                                    "Full-stack Development",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="border-t border-slate-200 pt-4 text-sm font-medium text-slate-700"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                PROJECTS
            ====================================================== */}

            <section id="projects" className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                Selected work
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-[-0.055em] sm:text-6xl">
                                Things I've built.
                            </h2>
                        </div>

                        <Link
                            href="/projects"
                            className="font-semibold text-slate-700 transition hover:text-blue-600"
                        >
                            View all projects →
                        </Link>
                    </div>

                    <div className="mt-14 grid gap-x-8 gap-y-16 lg:grid-cols-2">
                        {projects.map((project, index) => (
                            <Link
                                key={project.title}
                                href={project.href}
                                className={`group ${
                                    index === 0 ? "lg:col-span-2" : ""
                                }`}
                            >
                                <article>
                                    <div
                                        className={`relative overflow-hidden bg-slate-200 ${
                                            index === 0
                                                ? "aspect-[16/8]"
                                                : "aspect-[16/10]"
                                        }`}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition duration-700 group-hover:scale-105"
                                            sizes={
                                                index === 0
                                                    ? "100vw"
                                                    : "(max-width: 1024px) 100vw, 50vw"
                                            }
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-9">
                                            <div className="flex items-end justify-between gap-6">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                                                        {project.category}
                                                    </p>

                                                    <h3 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                                                        {project.title}
                                                    </h3>

                                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                                                        {project.description}
                                                    </p>

                                                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                                                        {project.tags.map(
                                                            (tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="border-b border-white/30 pb-1 text-xs font-medium text-slate-200"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <span className="hidden text-4xl font-light transition duration-300 group-hover:translate-x-2 sm:block">
                                                    ↗
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                TECHNOLOGIES
            ====================================================== */}

            <section className="border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
                    <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                Toolbox
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-[-0.05em]">
                                Technologies
                                <br />
                                I work with.
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 border-l border-t border-slate-200 sm:grid-cols-3">
                            {technologies.map((technology) => (
                                <div
                                    key={technology}
                                    className="group flex min-h-[100px] items-end border-b border-r border-slate-200 p-5 transition duration-300 hover:bg-slate-950"
                                >
                                    <div>
                                        <span className="mb-3 block h-px w-7 bg-blue-500 transition-all duration-300 group-hover:w-12" />

                                        <span className="text-sm font-semibold text-slate-700 transition group-hover:text-white">
                                            {technology}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                BLOG
            ====================================================== */}

            <section className="border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                Writing
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-[-0.055em] sm:text-6xl">
                                Notes & thoughts.
                            </h2>
                        </div>

                        <Link
                            href="/blog"
                            className="font-semibold text-slate-700 transition hover:text-blue-600"
                        >
                            View all articles →
                        </Link>
                    </div>

                    <div className="mt-14 grid gap-0 border-l border-t border-slate-200 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.title}
                                href="/blog"
                                className="group border-b border-r border-slate-200 p-7 transition hover:bg-slate-50"
                            >
                                <article className="flex min-h-[280px] flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
                                            {post.category}
                                        </span>

                                        <span className="text-slate-300 transition group-hover:text-slate-950">
                                            ↗
                                        </span>
                                    </div>

                                    <div className="mt-auto">
                                        <p className="text-xs font-medium text-slate-400">
                                            {post.date}
                                        </p>

                                        <h3 className="mt-3 text-xl font-bold leading-7 tracking-[-0.025em] text-slate-900">
                                            {post.title}
                                        </h3>

                                        <span className="mt-8 inline-block text-sm font-semibold text-slate-600 transition group-hover:text-blue-600">
                                            Read article →
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                CONTACT
            ====================================================== */}

            <section id="contact" className="bg-slate-950">
                <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
                    <div className="relative overflow-hidden border border-slate-800 px-7 py-16 sm:px-12 lg:px-20 lg:py-20">
                        <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 border border-blue-500/20" />

                        <div className="relative max-w-3xl">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                                Get in touch
                            </p>

                            <h2 className="mt-5 text-4xl font-bold leading-[1] tracking-[-0.055em] text-white sm:text-6xl">
                                Have an idea?
                                <span className="block text-slate-500">
                                    Let's build it.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-xl text-base leading-7 text-slate-400">
                                Whether you're building a product, improving
                                an existing system or looking for a developer,
                                feel free to reach out.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-3">
                                <a
                                    href="mailto:tranchien021@gmail.com"
                                    className="inline-flex bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-blue-500 hover:text-white"
                                >
                                    Start a conversation →
                                </a>

                                <a
                                    href="#"
                                    className="inline-flex border border-slate-700 px-7 py-4 text-sm font-bold text-white transition hover:border-slate-400"
                                >
                                    GitHub ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
