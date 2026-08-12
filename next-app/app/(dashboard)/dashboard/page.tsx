"use client";

import { useEffect, useState } from "react";
import {
    Award,
    BriefcaseBusiness,
    FileText,
    FolderKanban,
    GraduationCap,
    UserRound,
    Zap,
} from "lucide-react";
import apiClient from "@/lib/api-client";

interface DashboardStats {
    experiences: number;
    educations: number;
    skills: number;
    projects: number;
    certificates: number;
    blog_posts: number;
}

interface DashboardUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface DashboardProfile {
    full_name: string | null;
    title: string | null;
    avatar_url: string | null;
}

interface DashboardProject {
    id: string;
    title: string;
    summary: string | null;
    cover_image: string | null;
    featured: boolean;
    status: string | null;
    started_at: string | null;
    completed_at: string | null;
}

interface DashboardBlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image: string | null;
    published_at: string | null;
}

interface DashboardExperience {
    id: string;
    company: string | null;
    position: string | null;
    employment_type: string | null;
    start_date: string | null;
    end_date: string | null;
}

interface DashboardCertificate {
    id: number;
    name: string;
    organization: string | null;
    issue_date: string | null;
}

interface DashboardData {
    user: DashboardUser;
    profile: DashboardProfile | null;
    stats: DashboardStats;
    recent_experiences: DashboardExperience[];
    featured_projects: DashboardProject[];
    recent_projects: DashboardProject[];
    recent_blog_posts: DashboardBlogPost[];
    recent_certificates: DashboardCertificate[];
}

interface DashboardResponse {
    data: DashboardData;
}

export default function DashboardPage() {
    const [dashboard, setDashboard] =
        useState<DashboardData | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    await apiClient.get<DashboardResponse>(
                        "/admin/dashboard"
                    );

                setDashboard(response.data.data);
            } catch (error: any) {
                console.error(error);

                setError(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to load dashboard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800" />

                        <p className="text-sm text-gray-500">
                            Loading dashboard...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !dashboard) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                            <FileText className="h-5 w-5 text-red-500" />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            Failed to load dashboard
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {error || "No dashboard data available."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const stats = dashboard.stats;

    const statCards = [
        {
            title: "Projects",
            value: stats.projects,
            description: "Total projects",
            icon: FolderKanban,
        },
        {
            title: "Blog Posts",
            value: stats.blog_posts,
            description: "Published and drafted posts",
            icon: FileText,
        },
        {
            title: "Certificates",
            value: stats.certificates,
            description: "Professional certificates",
            icon: Award,
        },
        {
            title: "Experiences",
            value: stats.experiences,
            description: "Work experience records",
            icon: BriefcaseBusiness,
        },
        {
            title: "Educations",
            value: stats.educations,
            description: "Education records",
            icon: GraduationCap,
        },
        {
            title: "Skills",
            value: stats.skills,
            description: "Technical skills",
            icon: Zap,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">

                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Overview
                        </p>

                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage and monitor your portfolio content.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                            <UserRound className="h-4 w-4 text-gray-600" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                {dashboard.profile?.full_name ||
                                    dashboard.user.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                {dashboard.user.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}

                <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {statCards.map((stat) => (
                            <StatCard
                                key={stat.title}
                                title={stat.title}
                                value={stat.value}
                                description={stat.description}
                                icon={stat.icon}
                            />
                        ))}
                    </div>
                </div>

                {/* Main content */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    {/* Recent Experiences */}

                    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <SectionHeader
                            icon={
                                <BriefcaseBusiness className="h-4 w-4" />
                            }
                            title="Recent Experience"
                            subtitle={`${dashboard.recent_experiences.length} records`}
                        />

                        <div className="divide-y divide-gray-100">
                            {dashboard.recent_experiences.length > 0 ? (
                                dashboard.recent_experiences.map(
                                    (experience) => (
                                        <div
                                            key={experience.id}
                                            className="p-5 transition hover:bg-gray-50"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900">
                                                        {experience.position ||
                                                            "Position"}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {experience.company ||
                                                            "Company"}
                                                    </p>
                                                </div>

                                                <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                    {experience.employment_type ||
                                                        "Work"}
                                                </span>
                                            </div>

                                            <p className="mt-3 text-xs text-gray-400">
                                                {formatDate(
                                                    experience.start_date
                                                )}{" "}
                                                —{" "}
                                                {formatDate(
                                                    experience.end_date
                                                )}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <EmptyState message="No experience records." />
                            )}
                        </div>
                    </section>

                    {/* Featured Projects */}

                    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <SectionHeader
                            icon={
                                <FolderKanban className="h-4 w-4" />
                            }
                            title="Featured Projects"
                            subtitle={`${dashboard.featured_projects.length} projects`}
                        />

                        <div className="divide-y divide-gray-100">
                            {dashboard.featured_projects.length > 0 ? (
                                dashboard.featured_projects.map(
                                    (project) => (
                                        <div
                                            key={project.id}
                                            className="p-5 transition hover:bg-gray-50"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-semibold text-gray-900">
                                                        {project.title}
                                                    </h3>

                                                    {project.summary && (
                                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                                            {
                                                                project.summary
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {project.status && (
                                                    <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium capitalize text-green-700">
                                                        {
                                                            project.status
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-3 flex gap-4 text-xs text-gray-400">
                                                {project.started_at && (
                                                    <span>
                                                        Started{" "}
                                                        {formatDate(
                                                            project.started_at
                                                        )}
                                                    </span>
                                                )}

                                                {project.completed_at && (
                                                    <span>
                                                        Completed{" "}
                                                        {formatDate(
                                                            project.completed_at
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <EmptyState message="No featured projects." />
                            )}
                        </div>
                    </section>

                    {/* Recent Blog Posts */}

                    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <SectionHeader
                            icon={
                                <FileText className="h-4 w-4" />
                            }
                            title="Recent Blog Posts"
                            subtitle={`${dashboard.recent_blog_posts.length} posts`}
                        />

                        <div className="divide-y divide-gray-100">
                            {dashboard.recent_blog_posts.length > 0 ? (
                                dashboard.recent_blog_posts.map(
                                    (post) => (
                                        <div
                                            key={post.id}
                                            className="p-5 transition hover:bg-gray-50"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-semibold text-gray-900">
                                                        {post.title}
                                                    </h3>

                                                    {post.excerpt && (
                                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                                            {post.excerpt}
                                                        </p>
                                                    )}
                                                </div>

                                                <span className="shrink-0 text-xs text-gray-400">
                                                    {formatFullDate(
                                                        post.published_at
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <EmptyState message="No blog posts available." />
                            )}
                        </div>
                    </section>

                    {/* Certificates */}

                    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <SectionHeader
                            icon={
                                <Award className="h-4 w-4" />
                            }
                            title="Recent Certificates"
                            subtitle={`${dashboard.recent_certificates.length} certificates`}
                        />

                        <div className="divide-y divide-gray-100">
                            {dashboard.recent_certificates.length > 0 ? (
                                dashboard.recent_certificates.map(
                                    (certificate) => (
                                        <div
                                            key={certificate.id}
                                            className="p-5 transition hover:bg-gray-50"
                                        >
                                            <h3 className="text-sm font-semibold text-gray-900">
                                                {certificate.name}
                                            </h3>

                                            {certificate.organization && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {
                                                        certificate.organization
                                                    }
                                                </p>
                                            )}

                                            <p className="mt-2 text-xs text-gray-400">
                                                Issued{" "}
                                                {formatFullDate(
                                                    certificate.issue_date
                                                )}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <EmptyState message="No certificates available." />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

/* =================================
   Stat Card
================================= */

function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
}) {
    return (
        <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        {value.toLocaleString()}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                        {description}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-gray-900 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

/* =================================
   Section Header
================================= */

function SectionHeader({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    {icon}
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-400">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =================================
   Empty State
================================= */

function EmptyState({
    message,
}: {
    message: string;
}) {
    return (
        <div className="px-5 py-10 text-center">
            <p className="text-sm text-gray-400">
                {message}
            </p>
        </div>
    );
}

/* =================================
   Date Helpers
================================= */

function formatDate(date?: string | null): string {
    if (!date) {
        return "Present";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

function formatFullDate(date?: string | null): string {
    if (!date) {
        return "-";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}