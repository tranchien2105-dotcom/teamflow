"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [showHeader, setShowHeader] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show navbar at the top
            if (currentScrollY <= 50) {
                setShowHeader(true);
                lastScrollY = currentScrollY;
                return;
            }

            // Ignore tiny movements
            if (Math.abs(currentScrollY - lastScrollY) < 8) {
                return;
            }

            // Scroll down -> hide navbar
            if (currentScrollY > lastScrollY) {
                setShowHeader(false);
                setMobileMenuOpen(false);
            }

            // Scroll up -> show navbar
            if (currentScrollY < lastScrollY) {
                setShowHeader(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#0a192f] text-slate-100 antialiased">
            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <header
                className={`fixed inset-x-0 top-0 z-50 h-20 bg-[#0a192f]/90 backdrop-blur transition-transform duration-300 lg:h-24 ${showHeader ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="flex h-full items-center justify-between px-5 sm:px-8 lg:px-14">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group relative inline-flex h-10 w-10 items-center justify-center font-mono text-xl font-bold text-teal-300"
                        aria-label="Home"
                    >
                        {/* Border animation */}
                        <span
                            className="
                    absolute inset-0
                    rounded-full
                    border-[3px] border-teal-300
                    transition-all duration-300 ease-out
                    group-hover:scale-110
                    group-hover:-translate-y-0.5
                    group-hover:shadow-[-3px_0_10px_rgba(45,212,191,0.45)]
                "
                        />

                        {/* Logo */}
                        <span
                            className="
                    relative z-10
                    transition-all duration-300 ease-out
                    group-hover:-translate-y-0.5
                    group-hover:scale-95
                    group-hover:text-teal-200
                    group-hover:drop-shadow-[-2px_0_5px_rgba(45,212,191,0.7)]
                "
                        >
                            C
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:block">
                        <ol className="flex items-center gap-5 font-mono text-xs lg:gap-7">
                            <li>
                                <Link
                                    href="/#about"
                                    className="text-slate-300 transition hover:text-teal-300"
                                >
                                    <span className="text-teal-300">01.</span>{" "}
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/#experience"
                                    className="text-slate-300 transition hover:text-teal-300"
                                >
                                    <span className="text-teal-300">02.</span>{" "}
                                    Experience
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/#work"
                                    className="text-slate-300 transition hover:text-teal-300"
                                >
                                    <span className="text-teal-300">03.</span>{" "}
                                    Work
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/#contact"
                                    className="text-slate-300 transition hover:text-teal-300"
                                >
                                    <span className="text-teal-300">04.</span>{" "}
                                    Contact
                                </Link>
                            </li>

                            <li className="ml-2">
                                <a
                                    href="/cv.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex border border-teal-300 px-5 py-3 text-teal-300 transition hover:bg-teal-300/10"
                                >
                                    Resume
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </header>

            {/* =====================================================
                LEFT SOCIAL SIDEBAR
            ====================================================== */}

            <aside className="fixed bottom-0 left-4 z-40 hidden w-24 lg:block">
                <div className="flex flex-col items-center gap-6">
                    {/* GitHub */}

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="text-slate-400 transition hover:-translate-y-1 hover:text-teal-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6a4.6 4.6 0 0 0-1-3.5A4.2 4.2 0 0 0 19.9 2S18.6 1.5 15 3.5a13.4 13.4 0 0 0-6 0C5.4 1.5 4.1 2 4.1 2a4.2 4.2 0 0 0 .9 3A4.6 4.6 0 0 0 4 8.5c0 4.5 3 6 6 6a4.8 4.8 0 0 0-1 3.5v4" />
                            <path d="M9 18c-4.5 2-5-2-7-2" />
                        </svg>
                    </a>

                    {/* Instagram */}

                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="text-slate-400 transition hover:-translate-y-1 hover:text-teal-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                width="20"
                                height="20"
                                x="2"
                                y="2"
                                rx="5"
                                ry="5"
                            />

                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

                            <line
                                x1="17.5"
                                x2="17.51"
                                y1="6.5"
                                y2="6.5"
                            />
                        </svg>
                    </a>

                    {/* Twitter */}

                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Twitter"
                        className="text-slate-400 transition hover:-translate-y-1 hover:text-teal-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.6 4.3 9 4.4-.9-4.2 4-6.7 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                    </a>

                    {/* LinkedIn */}

                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="text-slate-400 transition hover:-translate-y-1 hover:text-teal-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />

                            <rect
                                width="4"
                                height="12"
                                x="2"
                                y="9"
                            />

                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>

                    {/* Email */}

                    <a
                        href="mailto:your.email@example.com"
                        aria-label="Email"
                        className="text-slate-400 transition hover:-translate-y-1 hover:text-teal-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                width="20"
                                height="16"
                                x="2"
                                y="4"
                                rx="2"
                            />

                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </a>

                    {/* Vertical line */}

                    <span className="mt-2 h-24 w-px bg-slate-500" />
                </div>
            </aside>

            {/* =====================================================
                RIGHT EMAIL SIDEBAR
            ====================================================== */}

            <aside className="fixed bottom-0 right-0 z-40 hidden w-24 lg:block">
                <div className="flex flex-col items-center">
                    <a
                        href="mailto:your.email@example.com"
                        className="mb-8 font-mono text-xs tracking-[0.2em] text-slate-400 transition hover:-translate-y-1 hover:text-teal-300"
                        style={{
                            writingMode: "vertical-rl",
                        }}
                    >
                        tranchien02@gmail.com
                    </a>

                    <span className="h-24 w-px bg-slate-500" />
                </div>
            </aside>

            {/* =====================================================
                PAGE CONTENT
            ====================================================== */}

            {children}
        </div>
    );
}