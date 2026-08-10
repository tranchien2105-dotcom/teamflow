"use client";

import type { CvData } from "@/services/cv-service";

interface ModernTemplateProps {
    cv: CvData;
}

function formatDate(date: string | null | undefined) {
    if (!date) {
        return null;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(parsedDate);
}

function formatDateRange(
    startDate: string | null | undefined,
    endDate: string | null | undefined
) {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    if (!start && !end) {
        return null;
    }

    if (!start) {
        return end;
    }

    if (!end) {
        return `${start} - Present`;
    }

    return `${start} - ${end}`;
}

function SectionTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="cv-modern-title">
            {children}
        </div>
    );
}

function SidebarTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {children}
            </h2>

            <div className="h-px flex-1 bg-white/10" />
        </div>
    );
}

export default function ModernTemplate({
    cv,
}: ModernTemplateProps) {
    const profile = cv.profile;

    return (
        <div
            className="
                cv-document
                w-full
                overflow-hidden
                bg-white
                text-slate-800
                shadow-lg
                print:shadow-none
            "
            style={{
                printColorAdjust: "exact",
                WebkitPrintColorAdjust: "exact",
            }}
        >
            <div className="grid grid-cols-[220px_minmax(0,1fr)]">
                {/* =====================================================
                    SIDEBAR
                ====================================================== */}
                <aside
                    className="
                        cv-modern-sidebar
                        bg-slate-900
                        px-6
                        py-8
                        text-white
                    "
                    style={{
                        printColorAdjust: "exact",
                        WebkitPrintColorAdjust: "exact",
                    }}
                >
                    {/* =================================================
                        PROFILE
                    ================================================== */}
                    {profile && (
                        <div className="text-center">
                            {profile.avatar_url ? (
                                <div className="mb-5 flex justify-center">
                                    <img
                                        src={profile.avatar_url}
                                        alt={profile.full_name}
                                        className="
                                            h-24
                                            w-24
                                            rounded-full
                                            object-cover
                                            ring-4
                                            ring-white/10
                                        "
                                    />
                                </div>
                            ) : (
                                <div
                                    className="
                                        mx-auto
                                        mb-5
                                        flex
                                        h-24
                                        w-24
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-slate-700
                                        text-2xl
                                        font-bold
                                        text-white
                                        ring-4
                                        ring-white/10
                                    "
                                >
                                    {profile.full_name
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>
                            )}

                            <h1
                                className="
                                    break-words
                                    text-[21px]
                                    font-bold
                                    leading-tight
                                    tracking-tight
                                "
                            >
                                {profile.full_name}
                            </h1>

                            {profile.title && (
                                <p className="mt-2 text-[12px] leading-5 text-slate-300">
                                    {profile.title}
                                </p>
                            )}
                        </div>
                    )}

                    {/* =================================================
                        CONTACT
                    ================================================== */}
                    {profile && (
                        <section className="mt-8">
                            <SidebarTitle>
                                Contact
                            </SidebarTitle>

                            <div className="mt-4 space-y-3 text-[12px] leading-5 text-slate-300">
                                {profile.phone && (
                                    <div className="flex gap-3">
                                        <span className="mt-0.5 shrink-0 text-slate-500">
                                            ☎
                                        </span>

                                        <span className="break-words">
                                            {profile.phone}
                                        </span>
                                    </div>
                                )}

                                {profile.address && (
                                    <div className="flex gap-3">
                                        <span className="mt-0.5 shrink-0 text-slate-500">
                                            ●
                                        </span>

                                        <span className="break-words">
                                            {profile.address}
                                        </span>
                                    </div>
                                )}

                                {profile.github_url && (
                                    <a
                                        href={profile.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            flex
                                            gap-3
                                            transition
                                            hover:text-white
                                        "
                                    >
                                        <span className="shrink-0 text-slate-500">
                                            ↗
                                        </span>

                                        <span className="break-all">
                                            GitHub
                                        </span>
                                    </a>
                                )}

                                {profile.linkedin_url && (
                                    <a
                                        href={profile.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            flex
                                            gap-3
                                            transition
                                            hover:text-white
                                        "
                                    >
                                        <span className="shrink-0 text-slate-500">
                                            ↗
                                        </span>

                                        <span className="break-all">
                                            LinkedIn
                                        </span>
                                    </a>
                                )}

                                {profile.website_url && (
                                    <a
                                        href={profile.website_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            flex
                                            gap-3
                                            transition
                                            hover:text-white
                                        "
                                    >
                                        <span className="shrink-0 text-slate-500">
                                            ↗
                                        </span>

                                        <span className="break-all">
                                            Website
                                        </span>
                                    </a>
                                )}
                            </div>
                        </section>
                    )}

                    {/* =================================================
                        SKILLS
                    ================================================== */}
                    {cv.skills.length > 0 && (
                        <section className="mt-8">
                            <SidebarTitle>
                                Skills
                            </SidebarTitle>

                            <div className="cv-modern-skills mt-4">
                                {cv.skills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="cv-modern-skill"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* =================================================
                        EDUCATION
                    ================================================== */}
                    {cv.educations.length > 0 && (
                        <section className="mt-8">
                            <SidebarTitle>
                                Education
                            </SidebarTitle>

                            <div className="mt-4 space-y-5">
                                {cv.educations.map((education) => (
                                    <div key={education.id}>
                                        <h3 className="text-[12px] font-semibold leading-5 text-white">
                                            {education.school?.name ||
                                                "Education"}
                                        </h3>

                                        {education.degree && (
                                            <p className="mt-1 text-[11px] leading-4 text-slate-300">
                                                {education.degree}

                                                {education.field_of_study && (
                                                    <>
                                                        {" · "}
                                                        {
                                                            education.field_of_study
                                                        }
                                                    </>
                                                )}
                                            </p>
                                        )}

                                        {formatDateRange(
                                            education.start_date,
                                            education.end_date
                                        ) && (
                                            <p className="mt-1 text-[10px] text-slate-500">
                                                {formatDateRange(
                                                    education.start_date,
                                                    education.end_date
                                                )}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* =================================================
                        CERTIFICATES
                    ================================================== */}
                    {cv.certificates.length > 0 && (
                        <section className="mt-8">
                            <SidebarTitle>
                                Certificates
                            </SidebarTitle>

                            <div className="mt-4 space-y-5">
                                {cv.certificates.map(
                                    (certificate) => (
                                        <div
                                            key={certificate.id}
                                        >
                                            <h3 className="text-[12px] font-semibold leading-5 text-white">
                                                {certificate.name}
                                            </h3>

                                            {certificate.organization && (
                                                <p className="mt-1 text-[11px] leading-4 text-slate-300">
                                                    {
                                                        certificate.organization
                                                    }
                                                </p>
                                            )}

                                            {certificate.issue_date && (
                                                <p className="mt-1 text-[10px] text-slate-500">
                                                    {formatDate(
                                                        certificate.issue_date
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}
                </aside>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <main className="min-w-0 px-8 py-9">
                    {/* =================================================
                        PROFILE
                    ================================================== */}
                    {profile?.bio && (
                        <section className="cv-modern-section">
                            <SectionTitle>
                                Profile
                            </SectionTitle>

                            <p className="mt-4 text-[13px] leading-6 text-slate-600">
                                {profile.bio}
                            </p>
                        </section>
                    )}

                    {/* =================================================
                        EXPERIENCE
                    ================================================== */}
                    {cv.experiences.length > 0 && (
                        <section className="cv-modern-section mt-8">
                            <SectionTitle>
                                Experience
                            </SectionTitle>

                            <div className="mt-5 space-y-7">
                                {cv.experiences.map(
                                    (experience) => (
                                        <article
                                            key={experience.id}
                                            className="
                                                cv-modern-experience
                                                relative
                                                border-l
                                                border-slate-200
                                                pl-5
                                            "
                                        >
                                            {/* Timeline dot */}
                                            <div
                                                className="
                                                    absolute
                                                    -left-[5px]
                                                    top-1
                                                    h-2
                                                    w-2
                                                    rounded-full
                                                    bg-slate-900
                                                    ring-4
                                                    ring-white
                                                "
                                            />

                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                                                    <div className="min-w-0">
                                                        <h3 className="break-words text-[15px] font-bold leading-5 text-slate-900">
                                                            {
                                                                experience.position
                                                            }
                                                        </h3>

                                                        <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                                            {
                                                                experience.company
                                                            }

                                                            {experience.location && (
                                                                <>
                                                                    {" · "}
                                                                    {
                                                                        experience.location
                                                                    }
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>

                                                    {formatDateRange(
                                                        experience.start_date,
                                                        experience.end_date
                                                    ) && (
                                                        <p className="shrink-0 text-[11px] font-medium text-slate-400">
                                                            {formatDateRange(
                                                                experience.start_date,
                                                                experience.end_date
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {experience.employment_type && (
                                                    <span
                                                        className="
                                                            w-fit
                                                            rounded-full
                                                            bg-slate-100
                                                            px-2
                                                            py-0.5
                                                            text-[10px]
                                                            font-medium
                                                            text-slate-500
                                                        "
                                                    >
                                                        {
                                                            experience.employment_type
                                                        }
                                                    </span>
                                                )}

                                                {experience.description && (
                                                    <div className="mt-1 whitespace-pre-line text-[12.5px] leading-6 text-slate-600">
                                                        {
                                                            experience.description
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* =================================================
                        PROJECTS
                    ================================================== */}
                    {cv.projects.length > 0 && (
                        <section className="cv-modern-section mt-9">
                            <SectionTitle>
                                Projects
                            </SectionTitle>

                            <div className="mt-5 space-y-5">
                                {cv.projects.map((project) => {
                                    const technologies =
                                        project.technologies ?? [];

                                    return (
                                        <article
                                            key={project.id}
                                            className="
                                                cv-modern-project
                                                p-4
                                            "
                                        >
                                            <div className="flex flex-col justify-between gap-2 sm:flex-row">
                                                <div className="min-w-0">
                                                    <h3 className="break-words text-[15px] font-bold text-slate-900">
                                                        {
                                                            project.title
                                                        }
                                                    </h3>

                                                    {project.status && (
                                                        <p className="mt-1 text-[11px] font-medium text-slate-400">
                                                            {
                                                                project.status
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {(project.github_url ||
                                                    project.demo_url) && (
                                                    <div className="flex shrink-0 gap-3 text-[11px]">
                                                        {project.github_url && (
                                                            <a
                                                                href={
                                                                    project.github_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="
                                                                    font-semibold
                                                                    text-slate-700
                                                                    underline
                                                                    decoration-slate-300
                                                                    underline-offset-2
                                                                    hover:text-slate-900
                                                                "
                                                            >
                                                                GitHub ↗
                                                            </a>
                                                        )}

                                                        {project.demo_url && (
                                                            <a
                                                                href={
                                                                    project.demo_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="
                                                                    font-semibold
                                                                    text-slate-700
                                                                    underline
                                                                    decoration-slate-300
                                                                    underline-offset-2
                                                                    hover:text-slate-900
                                                                "
                                                            >
                                                                Demo ↗
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {project.summary && (
                                                <p className="mt-3 text-[12.5px] leading-6 text-slate-600">
                                                    {
                                                        project.summary
                                                    }
                                                </p>
                                            )}

                                            {project.content && (
                                                <p className="mt-2 whitespace-pre-line text-[12.5px] leading-6 text-slate-600">
                                                    {
                                                        project.content
                                                    }
                                                </p>
                                            )}

                                            {technologies.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {technologies.map(
                                                        (
                                                            technology
                                                        ) => (
                                                            <span
                                                                key={
                                                                    technology.id
                                                                }
                                                                className="
                                                                    rounded
                                                                    bg-slate-100
                                                                    px-2
                                                                    py-1
                                                                    text-[10px]
                                                                    font-medium
                                                                    text-slate-600
                                                                "
                                                            >
                                                                {
                                                                    technology.name
                                                                }
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* =================================================
                        INTERESTS
                    ================================================== */}
                    <section className="cv-modern-section mt-9">
                        <SectionTitle>
                            Interests
                        </SectionTitle>

                        <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                            <li className="flex gap-2 text-[12.5px] leading-5 text-slate-600">
                                <span className="text-slate-400">
                                    •
                                </span>

                                <span>
                                    Exploring AI tools for
                                    software development
                                </span>
                            </li>

                            <li className="flex gap-2 text-[12.5px] leading-5 text-slate-600">
                                <span className="text-slate-400">
                                    •
                                </span>

                                <span>
                                    Backend technologies and
                                    scalable system design
                                </span>
                            </li>

                            <li className="flex gap-2 text-[12.5px] leading-5 text-slate-600">
                                <span className="text-slate-400">
                                    •
                                </span>

                                <span>
                                    Open-source communities
                                    and tech learning
                                </span>
                            </li>

                            <li className="flex gap-2 text-[12.5px] leading-5 text-slate-600">
                                <span className="text-slate-400">
                                    •
                                </span>

                                <span>
                                    Reading, badminton,
                                    fitness, and running
                                </span>
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}
