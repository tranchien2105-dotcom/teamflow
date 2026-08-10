import Link from "next/link";

import TechnologyActions from "@/components/technology/TechnologyActions";
import { getTechnologies } from "@/services/technology-service";

export default async function TechnologiesPage() {
    const technologies = await getTechnologies();

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* =========================
                    Page Header
                ========================== */}

                <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="relative px-6 py-7 sm:px-8">
                        {/* Decorative background */}

                        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-slate-100 blur-3xl" />

                        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-200">
                                    <svg
                                        className="h-7 w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 7.5L12 12l8-4.5M12 12v9"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                            Technologies
                                        </h1>

                                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                            {technologies.length}{" "}
                                            {technologies.length === 1
                                                ? "technology"
                                                : "technologies"}
                                        </span>
                                    </div>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                        Manage the technologies and tools
                                        used across your projects and
                                        portfolio.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/technologies/create"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-200"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 5v14M5 12h14"
                                    />
                                </svg>

                                Add Technology
                            </Link>
                        </div>
                    </div>
                </div>

                {/* =========================
                    Stats
                ========================== */}

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Total
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {technologies.length}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Technologies available
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    With Icons
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {
                                        technologies.filter(
                                            (technology) =>
                                                Boolean(
                                                    technology.icon
                                                )
                                        ).length
                                    }
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Technologies with icons
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20h-2.55v-.1a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 008.1 15a1.7 1.7 0 00-1.56-1.03h-.1v-2.55h.1A1.7 1.7 0 008.1 10.4a1.7 1.7 0 00-.34-1.88L7.7 8.46l1.8-1.8.06.06a1.7 1.7 0 001.88.34 1.7 1.7 0 001.03-1.56V5h2.55v.1a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.88-.34l.06-.06 1.8 1.8-.06.06a1.7 1.7 0 00-.34 1.88 1.7 1.7 0 001.56 1.03h.1v2.55h-.1A1.7 1.7 0 0019.4 15z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Portfolio
                                </p>

                                <p className="mt-2 text-lg font-bold text-slate-900">
                                    Tech Stack
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Ready to assign to projects
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 7h16M4 12h16M4 17h10"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================
                    Technology List
                ========================== */}

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    {/* Section Header */}

                    <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Technology Stack
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Technologies available for your
                                projects.
                            </p>
                        </div>

                        {technologies.length > 0 && (
                            <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                                {technologies.length} total
                            </span>
                        )}
                    </div>

                    {technologies.length === 0 ? (
                        /* =========================
                            Empty State
                        ========================== */

                        <div className="px-6 py-20 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                                <svg
                                    className="h-8 w-8"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 12l8-4.5M12 12v9M12 12L4 7.5"
                                    />
                                </svg>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-slate-900">
                                No technologies yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Add technologies such as Laravel,
                                Next.js, PostgreSQL, Docker, Redis
                                and more to build your project stack.
                            </p>

                            <Link
                                href="/technologies/create"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 5v14M5 12h14"
                                    />
                                </svg>

                                Add your first technology
                            </Link>
                        </div>
                    ) : (
                        /* =========================
                            List
                        ========================== */

                        <div className="divide-y divide-slate-100">
                            {technologies.map(
                                (technology) => (
                                    <div
                                        key={technology.id}
                                        className="group flex flex-col gap-5 px-6 py-5 transition duration-200 hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        {/* Technology Info */}

                                        <div className="flex min-w-0 items-center gap-4">
                                            {/* Icon */}

                                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-600 transition duration-200 group-hover:border-slate-300 group-hover:bg-white group-hover:shadow-sm">
                                                {technology.icon ? (
                                                    <span className="max-w-full truncate px-2 text-center text-xs font-semibold">
                                                        {
                                                            technology.icon
                                                        }
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {technology.name
                                                            .charAt(
                                                                0
                                                            )
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}

                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="truncate text-sm font-semibold text-slate-900">
                                                        {
                                                            technology.name
                                                        }
                                                    </h3>

                                                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                                                        Technology
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                                    <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-500">
                                                        /
                                                        {
                                                            technology.slug
                                                        }
                                                    </span>

                                                    {technology.icon && (
                                                        <span className="text-xs text-slate-400">
                                                            Icon:{" "}
                                                            {
                                                                technology.icon
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}

                                        <div className="flex shrink-0 items-center gap-2 sm:opacity-80 sm:transition sm:group-hover:opacity-100">
                                            <Link
                                                href={`/technologies/${technology.id}/edit`}
                                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 20h9"
                                                    />

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4 11.5-11.5z"
                                                    />
                                                </svg>

                                                Edit
                                            </Link>

                                            <TechnologyActions
                                                technologyId={
                                                    technology.id
                                                }
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
