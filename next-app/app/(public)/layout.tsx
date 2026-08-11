import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Chiến — Software Engineer",
    description:
        "Personal portfolio of Chiến, a Software Engineer specializing in Laravel, PHP, Next.js and modern web applications.",
};

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-white text-slate-950">
            <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                    <Link
                        href="/"
                        className="text-lg font-bold tracking-[-0.03em] text-slate-950"
                    >
                        CHIẾN
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <Link
                            href="/"
                            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                        >
                            Home
                        </Link>

                        <Link
                            href="/projects"
                            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                        >
                            Projects
                        </Link>

                        <Link
                            href="/blog"
                            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                        >
                            Blog
                        </Link>

                        <Link
                            href="/cv"
                            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                        >
                            CV
                        </Link>

                        <Link
                            href="/#about"
                            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                        >
                            About
                        </Link>
                    </nav>

                    <Link
                        href="/#contact"
                        className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 md:inline-flex"
                    >
                        Let's Talk
                    </Link>

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
                        aria-label="Open menu"
                    >
                        <span className="flex flex-col gap-1.5">
                            <span className="block h-px w-5 bg-slate-900" />
                            <span className="block h-px w-5 bg-slate-900" />
                            <span className="block h-px w-3.5 bg-slate-900" />
                        </span>
                    </button>
                </div>
            </header>

            <main>{children}</main>

            <footer className="border-t border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <Link
                                href="/"
                                className="text-lg font-bold tracking-[-0.03em]"
                            >
                                CHIẾN
                            </Link>

                            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                                Software Engineer focused on building practical,
                                maintainable and scalable web applications.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                            <Link
                                href="/"
                                className="transition hover:text-slate-950"
                            >
                                Home
                            </Link>

                            <Link
                                href="/projects"
                                className="transition hover:text-slate-950"
                            >
                                Projects
                            </Link>

                            <Link
                                href="/blog"
                                className="transition hover:text-slate-950"
                            >
                                Blog
                            </Link>

                            <Link
                                href="/cv"
                                className="transition hover:text-slate-950"
                            >
                                CV
                            </Link>

                            <a
                                href="mailto:tranchien021@gmail.com"
                                className="transition hover:text-slate-950"
                            >
                                Email
                            </a>

                            <a
                                href="https://github.com/tranchien2105-dotcom"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-slate-950"
                            >
                                GitHub
                            </a>

                            <a
                                href="https://www.linkedin.com/in/chi%E1%BA%BFn-tr%E1%BA%A7n-9229081a9/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-slate-950"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-400">
                        © {new Date().getFullYear()} Chiến. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}