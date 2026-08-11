"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Award,
    BriefcaseBusiness,
    CalendarDays,
    ChevronRight,
    FileText,
    FolderKanban,
    GraduationCap,
    Mail,
    MapPin,
    User,
    Zap,
} from "lucide-react";

import apiClient from "@/lib/api-client";

interface Profile {
    id?: string;
    user_id?: number;
    full_name?: string | null;
    title?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    cv_url?: string | null;
    phone?: string | null;
    address?: string | null;
    github_url?: string | null;
    linkedin_url?: string | null;
    website_url?: string | null;
    cv_template?: string | null;
}

interface Experience {
    id: string;
    user_id?: number;
    company?: string | null;
    position?: string | null;
    location?: string | null;
    employment_type?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    description?: string | null;
}

interface Education {
    id: number;
    user_id?: number;
    school_id?: number | null;
    degree?: string | null;
    field_of_study?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    description?: string | null;
}

interface Skill {
    id: number;
    user_id?: number;
    name?: string | null;
    category?: string | null;
    level?: string | null;
    years_of_experience?: number | null;
}

interface Project {
    id: string;
    user_id?: number;
    title?: string | null;
    slug?: string | null;
    summary?: string | null;
    content?: string | null;
    cover_image?: string | null;
    github_url?: string | null;
    demo_url?: string | null;
    featured?: boolean;
    status?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
}

interface Certificate {
    id: number;
    user_id?: number;
    name?: string | null;
    organization?: string | null;
    credential_id?: string | null;
    issue_date?: string | null;
    credential_url?: string | null;
    description?: string | null;
}

interface BlogPost {
    id: string;
    user_id?: number;
    title?: string | null;
    slug?: string | null;
    excerpt?: string | null;
    content?: string | null;
    cover_image?: string | null;
    published_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    created_at: string;
    updated_at: string;

    profile?: Profile | null;
    experiences?: Experience[];
    educations?: Education[];
    skills?: Skill[];
    projects?: Project[];
    blog_posts?: BlogPost[];
    certificates?: Certificate[];
}

interface UserResponse {
    data: AdminUser;
}

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

function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function AdminUserDetailPage() {
    const params = useParams();
    const router = useRouter();

    const userId = params.id as string;

    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await apiClient.get<UserResponse>(
                    `/admin/users/${userId}`
                );

                setUser(response.data.data);
            } catch (error: any) {
                console.error(error);

                setError(
                    error?.response?.data?.message ||
                        "Failed to load user."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-900 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex min-h-[500px] items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

                            <p className="text-sm text-slate-500">
                                Loading user...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-900 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/users")}
                        className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to users
                    </button>

                    <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                            <User className="h-5 w-5" />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-slate-900">
                            Unable to load user
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {error || "User not found."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const displayName =
        user.profile?.full_name || user.name || "User";

    const avatarUrl = user.profile?.avatar_url;

    const experiences = user.experiences || [];
    const educations = user.educations || [];
    const skills = user.skills || [];
    const projects = user.projects || [];
    const certificates = user.certificates || [];
    const blogPosts = user.blog_posts || [];

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-6 text-slate-900 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* Back */}

                <button
                    type="button"
                    onClick={() => router.push("/admin/users")}
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to users
                </button>

                {/* User Header */}

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

                    {/* Cover */}

                    <div className="h-28 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300" />

                    {/* User Info */}

                    <div className="px-6 pb-6 lg:px-8">
                        <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            <div className="flex items-end gap-4">

                                {/* Avatar */}

                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={displayName}
                                        className="h-24 w-24 shrink-0 rounded-2xl border-4 border-white bg-slate-100 object-cover shadow-sm"
                                    />
                                ) : (
                                    <div
                                        className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white text-xl font-bold shadow-sm ${
                                            user.role === "admin"
                                                ? "bg-purple-50 text-purple-600"
                                                : "bg-blue-50 text-blue-600"
                                        }`}
                                    >
                                        {getInitials(displayName)}
                                    </div>
                                )}

                                {/* Name */}

                                <div className="pb-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                            {displayName}
                                        </h1>

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                user.role === "admin"
                                                    ? "bg-purple-50 text-purple-700"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {user.role === "admin"
                                                ? "Administrator"
                                                : "User"}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {user.email}
                                    </p>

                                    {user.profile?.title && (
                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                            {user.profile.title}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Joined */}

                            <div className="flex items-center gap-2 pb-1 text-sm text-slate-500">
                                <CalendarDays className="h-4 w-4" />

                                Joined{" "}
                                {formatFullDate(user.created_at)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Overview */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    {/* Email */}

                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <Mail className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 truncate text-sm font-medium text-slate-900">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Role */}

                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                <User className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Role
                                </p>

                                <p className="mt-1 text-sm font-medium capitalize text-slate-900">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Joined */}

                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                <CalendarDays className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Joined
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-900">
                                    {formatFullDate(user.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile */}

                <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <SectionHeader
                        icon={<User className="h-4 w-4" />}
                        title="Profile"
                        subtitle="Personal information"
                    />

                    <div className="p-6">
                        {user.profile ? (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* Full Name */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Full Name
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-900">
                                        {user.profile.full_name ||
                                            displayName}
                                    </p>
                                </div>

                                {/* Title */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Title
                                    </p>

                                    <p className="mt-1 text-sm text-slate-600">
                                        {user.profile.title || "-"}
                                    </p>
                                </div>

                                {/* Phone */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm text-slate-600">
                                        {user.profile.phone || "-"}
                                    </p>
                                </div>

                                {/* Address */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Address
                                    </p>

                                    <div className="mt-1 flex items-start gap-1.5 text-sm text-slate-600">
                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                                        <span>
                                            {user.profile.address || "-"}
                                        </span>
                                    </div>
                                </div>

                                {/* GitHub */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        GitHub
                                    </p>

                                    <p className="mt-1 truncate text-sm text-slate-600">
                                        {user.profile.github_url || "-"}
                                    </p>
                                </div>

                                {/* LinkedIn */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        LinkedIn
                                    </p>

                                    <p className="mt-1 truncate text-sm text-slate-600">
                                        {user.profile.linkedin_url || "-"}
                                    </p>
                                </div>

                                {/* Website */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Website
                                    </p>

                                    <p className="mt-1 truncate text-sm text-slate-600">
                                        {user.profile.website_url || "-"}
                                    </p>
                                </div>

                                {/* Bio */}

                                <div className="md:col-span-2">
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Bio
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                                        {user.profile.bio ||
                                            "No bio provided."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <EmptyState message="No profile information available." />
                        )}
                    </div>
                </section>

                {/* Experience */}

                <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <SectionHeader
                        icon={
                            <BriefcaseBusiness className="h-4 w-4" />
                        }
                        title="Experience"
                        subtitle={`${experiences.length} experience${
                            experiences.length !== 1 ? "s" : ""
                        }`}
                    />

                    <div className="p-6">
                        {experiences.length > 0 ? (
                            <div className="space-y-6">
                                {experiences.map((experience) => (
                                    <div
                                        key={experience.id}
                                        className="relative border-l border-slate-200 pl-6"
                                    >
                                        <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-white bg-slate-400 ring-1 ring-slate-300" />

                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-900">
                                                    {experience.position ||
                                                        "Position"}
                                                </h3>

                                                <p className="mt-0.5 text-sm font-medium text-slate-600">
                                                    {experience.company ||
                                                        "Company"}
                                                </p>

                                                {experience.employment_type && (
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {
                                                            experience.employment_type
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <span className="text-xs text-slate-400">
                                                {formatDate(
                                                    experience.start_date
                                                )}{" "}
                                                –{" "}
                                                {formatDate(
                                                    experience.end_date
                                                )}
                                            </span>
                                        </div>

                                        {experience.description && (
                                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                                                {experience.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No experience records." />
                        )}
                    </div>
                </section>

                {/* Education */}

                <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <SectionHeader
                        icon={
                            <GraduationCap className="h-4 w-4" />
                        }
                        title="Education"
                        subtitle={`${educations.length} education record${
                            educations.length !== 1 ? "s" : ""
                        }`}
                    />

                    <div className="p-6">
                        {educations.length > 0 ? (
                            <div className="space-y-5">
                                {educations.map((education) => (
                                    <div
                                        key={education.id}
                                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-900">
                                                    {education.degree ||
                                                        "Education"}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-600">
                                                    {education.school_id
                                                        ? `School #${education.school_id}`
                                                        : "School not specified"}
                                                </p>

                                                {education.field_of_study && (
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {
                                                            education.field_of_study
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <span className="text-xs text-slate-400">
                                                {formatDate(
                                                    education.start_date
                                                )}{" "}
                                                –{" "}
                                                {formatDate(
                                                    education.end_date
                                                )}
                                            </span>
                                        </div>

                                        {education.description && (
                                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                                {education.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No education records." />
                        )}
                    </div>
                </section>

                {/* Skills */}

                <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <SectionHeader
                        icon={<Zap className="h-4 w-4" />}
                        title="Skills"
                        subtitle={`${skills.length} skill${
                            skills.length !== 1 ? "s" : ""
                        }`}
                    />

                    <div className="p-6">
                        {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                                    >
                                        <span className="text-sm font-medium text-slate-700">
                                            {skill.name ||
                                                "Unnamed skill"}
                                        </span>

                                        {skill.level && (
                                            <span className="ml-2 text-xs text-slate-400">
                                                {skill.level}
                                            </span>
                                        )}

                                        {skill.years_of_experience !==
                                            null &&
                                            skill.years_of_experience !==
                                                undefined &&
                                            skill.years_of_experience > 0 && (
                                                <span className="ml-2 text-xs text-slate-400">
                                                    {
                                                        skill.years_of_experience
                                                    }{" "}
                                                    yrs
                                                </span>
                                            )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No skills added." />
                        )}
                    </div>
                </section>

                {/* Projects */}

                <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <SectionHeader
                        icon={<FolderKanban className="h-4 w-4" />}
                        title="Projects"
                        subtitle={`${projects.length} project${
                            projects.length !== 1 ? "s" : ""
                        }`}
                    />

                    <div className="p-6">
                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="group rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold text-slate-900">
                                                    {project.title ||
                                                        "Untitled Project"}
                                                </h3>

                                                {project.status && (
                                                    <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium capitalize text-slate-500">
                                                        {project.status}
                                                    </span>
                                                )}

                                                {project.summary && (
                                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                                                        {project.summary}
                                                    </p>
                                                )}
                                            </div>

                                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                                            {project.started_at && (
                                                <span>
                                                    Started{" "}
                                                    {formatFullDate(
                                                        project.started_at
                                                    )}
                                                </span>
                                            )}

                                            {project.completed_at && (
                                                <span>
                                                    Completed{" "}
                                                    {formatFullDate(
                                                        project.completed_at
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No projects available." />
                        )}
                    </div>
                </section>

                {/* Certificates */}

                <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <SectionHeader
                        icon={<Award className="h-4 w-4" />}
                        title="Certificates"
                        subtitle={`${certificates.length} certificate${
                            certificates.length !== 1 ? "s" : ""
                        }`}
                    />

                    <div className="p-6">
                        {certificates.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {certificates.map((certificate) => (
                                    <div
                                        key={certificate.id}
                                        className="rounded-xl border border-slate-200 p-4"
                                    >
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            {certificate.name ||
                                                "Untitled Certificate"}
                                        </h3>

                                        {certificate.organization && (
                                            <p className="mt-1 text-sm text-slate-600">
                                                {certificate.organization}
                                            </p>
                                        )}

                                        {certificate.credential_id && (
                                            <p className="mt-1 text-xs text-slate-400">
                                                Credential:{" "}
                                                {
                                                    certificate.credential_id
                                                }
                                            </p>
                                        )}

                                        {certificate.issue_date && (
                                            <p className="mt-2 text-xs text-slate-400">
                                                Issued{" "}
                                                {formatFullDate(
                                                    certificate.issue_date
                                                )}
                                            </p>
                                        )}

                                        {certificate.description && (
                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {
                                                    certificate.description
                                                }
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No certificates available." />
                        )}
                    </div>
                </section>

                {/* Blog Posts */}

                <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <SectionHeader
                        icon={<FileText className="h-4 w-4" />}
                        title="Blog Posts"
                        subtitle={`${blogPosts.length} post${
                            blogPosts.length !== 1 ? "s" : ""
                        }`}
                    />

                    <div className="p-6">
                        {blogPosts.length > 0 ? (
                            <div className="space-y-4">
                                {blogPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="overflow-hidden rounded-xl border border-slate-200 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                                    >
                                        <div className="flex flex-col sm:flex-row">

                                            {/* Cover */}

                                            {post.cover_image && (
                                                <img
                                                    src={post.cover_image}
                                                    alt={
                                                        post.title ||
                                                        "Blog post"
                                                    }
                                                    className="h-40 w-full object-cover sm:h-auto sm:w-48"
                                                />
                                            )}

                                            <div className="min-w-0 flex-1 p-4">
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-semibold text-slate-900">
                                                            {post.title}
                                                        </h3>

                                                        {post.slug && (
                                                            <p className="mt-1 truncate text-xs text-slate-400">
                                                                /{post.slug}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="shrink-0 text-xs text-slate-400">
                                                        {formatFullDate(
                                                            post.published_at
                                                        )}
                                                    </div>
                                                </div>

                                                {post.excerpt && (
                                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                {post.content && (
                                                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                                                        {post.content}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No blog posts available." />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

/* =================================
   Section Header
================================= */

interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

function SectionHeader({
    icon,
    title,
    subtitle,
}: SectionHeaderProps) {
    return (
        <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        {icon}
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            {title}
                        </h2>

                        <p className="text-xs text-slate-400">
                            {subtitle}
                        </p>
                    </div>
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
        <div className="py-8 text-center">
            <p className="text-sm text-slate-400">
                {message}
            </p>
        </div>
    );
}
