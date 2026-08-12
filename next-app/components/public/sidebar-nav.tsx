"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavigationItem = {
    number: string;
    label: string;
    href: string;
};

interface SidebarNavProps {
    navigation: NavigationItem[];
}

export default function SidebarNav({
    navigation,
}: SidebarNavProps) {
    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        const sections = navigation
            .map((item) => document.getElementById(item.label.toLowerCase()))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio,
                    );

                if (visible[0]) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );

        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [navigation]);

    return (
        <nav className="mt-12">
            <ul className="space-y-5">
                {navigation.map((item) => {
                    const sectionId = item.label.toLowerCase();
                    const isActive = activeSection === sectionId;

                    return (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className={`group flex items-center gap-4 ${
                                    isActive
                                        ? "text-slate-100"
                                        : "text-slate-500"
                                }`}
                            >
                                <span
                                    className={`h-px transition-all duration-300 ${
                                        isActive
                                            ? "w-14 bg-teal-300"
                                            : "w-8 bg-slate-600 group-hover:w-14 group-hover:bg-slate-300"
                                    }`}
                                />

                                <span
                                    className={`font-mono text-xs font-bold uppercase tracking-[0.18em] transition ${
                                        isActive
                                            ? "text-slate-100"
                                            : "group-hover:text-slate-200"
                                    }`}
                                >
                                    {item.number} {item.label}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
