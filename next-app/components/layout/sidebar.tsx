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
    PanelLeftClose,
    PanelLeftOpen,
    PenLine,
    ShieldCheck,
    User,
    Users,
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
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

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
        <aside
            className={`
                flex h-screen shrink-0 flex-col
                border-r border-slate-200 bg-white
                transition-all duration-300 ease-in-out
                ${isCollapsed ? "w-20" : "w-64"}
            `}
        >
            {/* =========================
                Header / Logo
            ========================== */}

            <div
                className={`
                    flex h-16 shrink-0 items-center
                    border-b border-slate-200
                    ${isCollapsed
                        ? "justify-center px-3"
                        : "justify-between px-5"
                    }
                `}
            >
                {/* Logo */}

                <Link
                    href="/dashboard"
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm transition duration-200 group-hover:scale-105 group-hover:shadow-md">
                        <span className="text-sm font-bold">
                            T
                        </span>
                    </div>

                    {!isCollapsed && (
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
                    )}
                </Link>

                {/* Collapse Button */}

                {!isCollapsed && (
                    <button
                        type="button"
                        onClick={() =>
                            setIsCollapsed(true)
                        }
                        title="Collapse sidebar"
                        aria-label="Collapse sidebar"
                        className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-lg
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                    >
                        <PanelLeftClose
                            className="h-[18px] w-[18px]"
                            strokeWidth={1.8}
                        />
                    </button>
                )}

                {/* Open Button */}

                {isCollapsed && (
                    <button
                        type="button"
                        onClick={() =>
                            setIsCollapsed(false)
                        }
                        title="Expand sidebar"
                        aria-label="Expand sidebar"
                        className="
                            absolute left-[72px]
                            top-4 z-10
                            flex h-8 w-8
                            items-center justify-center
                            rounded-lg
                            border border-slate-200
                            bg-white
                            text-slate-400
                            shadow-sm
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                    >
                        <PanelLeftOpen
                            className="h-[18px] w-[18px]"
                            strokeWidth={1.8}
                        />
                    </button>
                )}
            </div>

            {/* =========================
                Navigation
            ========================== */}

            <nav className="flex-1 overflow-y-auto px-3 py-5">
                <div className="space-y-7">
                    {navigation.map((section) => (
                        <div key={section.label}>
                            {/* Section Label */}

                            {!isCollapsed && (
                                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                    {section.label}
                                </p>
                            )}

                            {/* Items */}

                            <div className="space-y-1">
                                {section.items.map(
                                    (item) => {
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
                                                title={
                                                    isCollapsed
                                                        ? item.label
                                                        : undefined
                                                }
                                                className={`
                                                    group relative flex items-center
                                                    rounded-xl py-2.5
                                                    text-sm font-medium
                                                    transition-all duration-200
                                                    ${
                                                        isCollapsed
                                                            ? "justify-center px-2"
                                                            : "gap-3 px-3"
                                                    }
                                                    ${
                                                        active
                                                            ? "bg-slate-900 text-white shadow-sm"
                                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                    }
                                                `}
                                            >
                                                {/* Active Indicator */}

                                                {active && (
                                                    <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-blue-500" />
                                                )}

                                                {/* Icon */}

                                                <span
                                                    className={`
                                                        flex h-8 w-8 shrink-0
                                                        items-center justify-center
                                                        rounded-lg transition
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

                                                {!isCollapsed && (
                                                    <span className="flex-1 truncate">
                                                        {
                                                            item.label
                                                        }
                                                    </span>
                                                )}

                                                {/* Arrow */}

                                                {!isCollapsed && (
                                                    <ChevronRight
                                                        className={`
                                                            h-4 w-4
                                                            transition-all duration-200
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
                                                )}
                                            </Link>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    ))}

                    {/* =========================
                        Administration
                    ========================== */}

                    {user?.role === "admin" && (
                        <div>
                            {!isCollapsed && (
                                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                    Administration
                                </p>
                            )}

                            <Link
                                href="/admin/users"
                                title={
                                    isCollapsed
                                        ? "Users"
                                        : undefined
                                }
                                className={`
                                    group relative flex items-center
                                    rounded-xl py-2.5
                                    text-sm font-medium
                                    transition-all duration-200
                                    ${
                                        isCollapsed
                                            ? "justify-center px-2"
                                            : "gap-3 px-3"
                                    }
                                    ${
                                        isActive(
                                            "/admin/users"
                                        )
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }
                                `}
                            >
                                {isActive(
                                    "/admin/users"
                                ) && (
                                    <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-indigo-500" />
                                )}

                                <span
                                    className={`
                                        flex h-8 w-8 shrink-0
                                        items-center justify-center
                                        rounded-lg transition
                                        ${
                                            isActive(
                                                "/admin/users"
                                            )
                                                ? "bg-indigo-100 text-indigo-600"
                                                : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-slate-700"
                                        }
                                    `}
                                >
                                    <Users
                                        className="h-[17px] w-[17px]"
                                        strokeWidth={
                                            1.8
                                        }
                                    />
                                </span>

                                {!isCollapsed && (
                                    <>
                                        <span className="flex-1 truncate">
                                            Users
                                        </span>

                                        <ChevronRight
                                            className={`
                                                h-4 w-4
                                                transition-all duration-200
                                                ${
                                                    isActive(
                                                        "/admin/users"
                                                    )
                                                        ? "translate-x-0 opacity-100 text-indigo-400"
                                                        : "-translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                }
                                            `}
                                            strokeWidth={
                                                1.8
                                            }
                                        />
                                    </>
                                )}
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* =========================
                Bottom Section
            ========================== */}

            <div className="shrink-0 border-t border-slate-200 p-3">
                {/* Admin Console */}

                {user?.role === "admin" && (
                    <div
                        className={`
                            mb-3 rounded-xl
                            border border-indigo-100
                            bg-indigo-50/60
                            ${
                                isCollapsed
                                    ? "flex justify-center p-2"
                                    : "p-3"
                            }
                        `}
                        title={
                            isCollapsed
                                ? "Administrator"
                                : undefined
                        }
                    >
                        <div
                            className={`
                                flex items-center
                                ${
                                    isCollapsed
                                        ? "justify-center"
                                        : "gap-3"
                                }
                            `}
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                                <ShieldCheck
                                    className="h-[18px] w-[18px]"
                                    strokeWidth={1.8}
                                />
                            </div>

                            {!isCollapsed && (
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-indigo-900">
                                        Administrator
                                    </p>

                                    <p className="mt-0.5 text-[11px] leading-4 text-indigo-600">
                                        Manage workspace
                                        users
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Current User */}

                {user && (
                    <div
                        className={`
                            mb-2 rounded-xl
                            border border-slate-100
                            bg-slate-50
                            ${
                                isCollapsed
                                    ? "flex justify-center p-2"
                                    : "p-3"
                            }
                        `}
                        title={
                            isCollapsed
                                ? displayName
                                : undefined
                        }
                    >
                        <div
                            className={`
                                flex items-center
                                ${
                                    isCollapsed
                                        ? "justify-center"
                                        : "gap-3"
                                }
                            `}
                        >
                            {/* Avatar */}

                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
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

                            {!isCollapsed && (
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
                            )}
                        </div>
                    </div>
                )}

                {/* Logout */}

                <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={logout}
                    title={
                        isCollapsed
                            ? isLoggingOut
                                ? "Signing out..."
                                : "Sign out"
                            : undefined
                    }
                    className={`
                        group flex w-full items-center
                        rounded-xl py-2.5
                        text-sm font-medium
                        text-slate-500
                        transition duration-200
                        hover:bg-red-50 hover:text-red-600
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        ${
                            isCollapsed
                                ? "justify-center px-2"
                                : "gap-3 px-3"
                        }
                    `}
                >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-red-100">
                        <LogOut
                            className="h-[17px] w-[17px]"
                            strokeWidth={1.8}
                        />
                    </span>

                    {!isCollapsed && (
                        <span>
                            {isLoggingOut
                                ? "Signing out..."
                                : "Sign out"}
                        </span>
                    )}
                </button>
            </div>
        </aside>
    );
}
