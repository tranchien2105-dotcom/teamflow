"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authService } from "@/services/auth.service";
import { User } from "@/types/auth";

const navigation = [
    {
        label: "Workspace",
        items: [
            {
                href: "/dashboard",
                label: "Dashboard",
                icon: "▦",
            },
            {
                href: "/profile",
                label: "Profile",
                icon: "○",
            },
            {
                href: "/experiences",
                label: "Experience",
                icon: "💼",
            },
            {
                href: "/educations",
                label: "Education",
                icon: "🎓",
            },
            {
                href: "/skills",
                label: "Skills",
                icon: "⚡",
            },
            {
                href: "/projects",
                label: "Projects",
                icon: "▤",
            },
            {
                href: "/certificates",
                label: "Certificates",
                icon: "🏆",
            },
        ],
    },
    {
        label: "Content",
        items: [
            {
                href: "/blog",
                label: "Blog",
                icon: "✎",
            },
            {
                href: "/messages",
                label: "Messages",
                icon: "✉",
            },
        ],
    },
];

export default function Sidebar() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUser() {
            try {
                const data = await authService.me();

                setUser(data.user);
            } catch (error) {
                console.error("Failed to get user:", error);
            }
        }

        getUser();
    }, []);

    async function logout() {
        try {
            await authService.logout();

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const displayName =
        user?.profile?.full_name || user?.name || "User";

    const avatarUrl = user?.profile?.avatar_url;

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-white">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <Link
                    href="/dashboard"
                    className="text-xl font-bold tracking-tight"
                >
                    Team<span className="text-blue-600">Flow</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-5">
                {navigation.map((section) => (
                    <div
                        key={section.label}
                        className="mb-6"
                    >
                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {section.label}
                        </p>

                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <span className="w-5 text-center">
                                        {item.icon}
                                    </span>

                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User */}
            <div className="border-t p-3">
                {user && (
                    <div className="flex items-center gap-3 rounded-lg p-2">
                        {/* Avatar */}
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={displayName}
                                className="h-9 w-9 shrink-0 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                {displayName
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}

                        {/* User information */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-gray-900">
                                {displayName}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>
                )}

                {/* Logout */}
                <button
                    onClick={logout}
                    className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                    <span className="w-5 text-center">↪</span>
                    Sign out
                </button>
            </div>
        </aside>
    );
}
