"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Award,
    BriefcaseBusiness,
    ChevronRight,
    FileText,
    FolderKanban,
    GraduationCap,
    Layers3,
    LayoutDashboard,
    LogOut,
    Mail,
    PenLine,
    User,
    Zap,
} from "lucide-react";

import { authService } from "@/services/auth.service";
import type { User as UserType } from "@/types/auth";

const navigation = [
    {
        label: "Overview",
        items: [
            {
                href: "/dashboard",
                label: "Dashboard",
                icon: LayoutDashboard,
            },
        ],
    },

    {
        label: "Profile",
        items: [
            {
                href: "/profile",
                label: "Profile",
                icon: User,
            },
            {
                href: "/cv",
                label: "CV",
                icon: FileText,
            },
            {
                href: "/experiences",
                label: "Experience",
                icon: BriefcaseBusiness,
            },
            {
                href: "/educations",
                label: "Education",
                icon: GraduationCap,
            },
            {
                href: "/skills",
                label: "Skills",
                icon: Zap,
            },
            {
                href: "/certificates",
                label: "Certificates",
                icon: Award,
            },
        ],
    },

    {
        label: "Portfolio",
        items: [
            {
                href: "/projects",
                label: "Projects",
                icon: FolderKanban,
            },
            {
                href: "/technologies",
                label: "Technologies",
                icon: Layers3,
            },
        ],
    },

    {
        label: "Content",
        items: [
            {
                href: "/blog",
                label: "Blog",
                icon: PenLine,
            },
            {
                href: "/messages",
                label: "Messages",
                icon: Mail,
            },
        ],
    },
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState<UserType | null>(null);

    const [isLoggingOut, setIsLoggingOut] =
        useState(false);

    useEffect(() => {
        async function getUser() {
            try {
                const data = await authService.me();

                setUser(data.user);
            } catch (error) {
                console.error(
                    "Failed to get user:",
                    error
                );
            }
        }

        getUser();
    }, []);

    async function logout() {
        if (isLoggingOut) {
            return;
        }

        setIsLoggingOut(true);

        try {
            await authService.logout();

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );

            setIsLoggingOut(false);
        }
    }

    const displayName =
        user?.profile?.full_name ||
        user?.name ||
        "User";

    const avatarUrl =
        user?.profile?.avatar_url;

    function isActive(href: string) {
        if (href === "/dashboard") {
            return pathname === href;
        }

        return (
            pathname === href ||
            pathname.startsWith(`${href}/`)
        );
    }

    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
            {/* =========================
                Logo
            ========================== */}

            <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-5">
                <Link
                    href="/dashboard"
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm transition duration-200 group-hover:scale-105 group-hover:shadow-md">
                        <span className="text-sm font-bold">
                            T
                        </span>
                    </div>

                    <div className="leading-none">
                        <p className="text-[17px] font-bold tracking-tight text-slate-900">
                            Team
                            <span className="text-blue-600">
                                Flow
                            </span>
                        </p>

                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                            Workspace
                        </p>
                    </div>
                </Link>
            </div>

            {/* =========================
                Navigation
            ========================== */}

            <nav className="flex-1 overflow-y-auto px-3 py-5">
                <div className="space-y-7">
                    {navigation.map((section) => (
                        <div key={section.label}>
                            {/* Section Label */}

                            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                {section.label}
                            </p>

                            {/* Items */}

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const active =
                                        isActive(
                                            item.href
                                        );

                                    const Icon =
                                        item.icon;

                                    return (
                                        <Link
                                            key={
                                                item.href
                                            }
                                            href={
                                                item.href
                                            }
                                            className={`
                                                group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                                                ${
                                                    active
                                                        ? "bg-slate-900 text-white shadow-sm"
                                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                }
                                            `}
                                        >
                                            {/* Active indicator */}

                                            {active && (
                                                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-blue-500" />
                                            )}

                                            {/* Icon */}

                                            <span
                                                className={`
                                                    flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition
                                                    ${
                                                        active
                                                            ? "bg-white/10 text-white"
                                                            : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-slate-700"
                                                    }
                                                `}
                                            >
                                                <Icon
                                                    className="h-[17px] w-[17px]"
                                                    strokeWidth={
                                                        1.8
                                                    }
                                                />
                                            </span>

                                            {/* Label */}

                                            <span className="flex-1 truncate">
                                                {
                                                    item.label
                                                }
                                            </span>

                                            {/* Arrow */}

                                            <ChevronRight
                                                className={`
                                                    h-4 w-4 transition-all duration-200
                                                    ${
                                                        active
                                                            ? "translate-x-0 opacity-100 text-slate-300"
                                                            : "-translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                    }
                                                `}
                                                strokeWidth={
                                                    1.8
                                                }
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>

            {/* =========================
                User Section
            ========================== */}

            <div className="shrink-0 border-t border-slate-200 p-3">
                {user && (
                    <div className="mb-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <div className="flex items-center gap-3">
                            {/* Avatar */}

                            {avatarUrl ? (
                                <img
                                    src={
                                        avatarUrl
                                    }
                                    alt={
                                        displayName
                                    }
                                    className="h-10 w-10 shrink-0 rounded-xl object-cover ring-2 ring-white"
                                />
                            ) : (
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700 ring-2 ring-white">
                                    {displayName
                                        .charAt(
                                            0
                                        )
                                        .toUpperCase()}
                                </div>
                            )}

                            {/* User Info */}

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {
                                        displayName
                                    }
                                </p>

                                <p className="mt-0.5 truncate text-xs text-slate-500">
                                    {
                                        user.email
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Logout */}

                <button
                    type="button"
                    disabled={
                        isLoggingOut
                    }
                    onClick={logout}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition duration-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-red-100">
                        <LogOut
                            className="h-[17px] w-[17px]"
                            strokeWidth={
                                1.8
                            }
                        />
                    </span>

                    <span>
                        {isLoggingOut
                            ? "Signing out..."
                            : "Sign out"}
                    </span>
                </button>
            </div>
        </aside>
    );
}