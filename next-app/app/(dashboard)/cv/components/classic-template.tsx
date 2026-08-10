"use client";

import type { CvData } from "@/services/cv-service";

interface ClassicTemplateProps {
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

export default function ClassicTemplate({
    cv,
}: ClassicTemplateProps) {
    return (
        <div
            className="
                cv-document
                bg-white
                px-8
                py-10
                shadow-sm
                sm:px-10
                sm:py-12
            "
        >
            {/* =========================
                HEADER
            ========================== */}

            {cv.profile && (
                <header className="cv-header text-center">
                    <h1 className="text-[32px] font-bold leading-tight">
                        {cv.profile.full_name}
                    </h1>

                    {cv.profile.title && (
                        <p className="mt-2 text-[19px] font-normal">
                            {cv.profile.title}
                        </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px]">
                        {/* PHONE */}

                        {cv.profile.phone && (
                            <span className="inline-flex items-center gap-1.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 4.5c0-.828.672-1.5 1.5-1.5h2.25a1.5 1.5 0 0 1 1.455 1.136l1.01 4.04a1.5 1.5 0 0 1-.75 1.683l-1.5.75a12.03 12.03 0 0 0 6.67 6.67l.75-1.5a1.5 1.5 0 0 1 1.683-.75l4.04 1.01A1.5 1.5 0 0 1 20.25 17.5v2.25a1.5 1.5 0 0 1-1.5 1.5C9.775 21.25 2.25 13.725 2.25 4.5Z"
                                    />
                                </svg>

                                <span>
                                    {cv.profile.phone}
                                </span>
                            </span>
                        )}

                        {/* ADDRESS */}

                        {cv.profile.address && (
                            <span className="inline-flex items-center gap-1.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>

                                <span>
                                    {cv.profile.address}
                                </span>
                            </span>
                        )}

                        {/* GITHUB */}

                        {cv.profile.github_url && (
                            <a
                                href={cv.profile.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                >
                                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.75.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.17a10.97 10.97 0 0 1 5.77 0c2.2-1.48 3.17-1.17 3.17-1.17.63 1.58.23 2.75.11 3.04.74.8.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                </svg>

                                <span>GitHub</span>
                            </a>
                        )}

                        {/* LINKEDIN */}

                        {cv.profile.linkedin_url && (
                            <a
                                href={cv.profile.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                >
                                    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.68H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.57V8.99H3.56v11.46ZM22.23 0H1.77C.79 0 0 .79 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46C23.21 24 24 23.21 24 22.23V1.77C24 .79 23.21 0 22.23 0Z" />
                                </svg>

                                <span>LinkedIn</span>
                            </a>
                        )}

                        {/* WEBSITE */}

                        {cv.profile.website_url && (
                            <a
                                href={cv.profile.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9.5"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        d="M2.5 12h19"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        d="M12 2.5c2.5 2.6 3.8 5.8 3.8 9.5S14.5 18.9 12 21.5c-2.5-2.6-3.8-5.8-3.8-9.5S9.5 5.1 12 2.5Z"
                                    />
                                </svg>

                                <span>Website</span>
                            </a>
                        )}
                    </div>
                </header>
            )}

            {/* =========================
                OBJECTIVE
            ========================== */}

            {cv.profile?.bio && (
                <section className="cv-section mt-12">
                    <h2 className="cv-section-title">
                        Objective
                    </h2>

                    <p className="text-[15px] leading-7">
                        {cv.profile.bio}
                    </p>
                </section>
            )}

            {/* =========================
                EDUCATION
            ========================== */}

            {cv.educations.length > 0 && (
                <section className="cv-section mt-8">
                    <h2 className="cv-section-title">
                        Education
                    </h2>

                    <div>
                        {cv.educations.map((education) => (
                            <div
                                key={education.id}
                                className="cv-entry"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-[16px] font-bold">
                                            {education.school?.name}
                                        </h3>

                                        {education.degree && (
                                            <p className="mt-4 text-[15px]">
                                                {education.degree}

                                                {education.field_of_study && (
                                                    <>
                                                        {" - "}
                                                        {
                                                            education.field_of_study
                                                        }
                                                    </>
                                                )}
                                            </p>
                                        )}

                                        {education.description && (
                                            <p className="mt-3 text-[15px] leading-7">
                                                {
                                                    education.description
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <p className="shrink-0 text-right text-[15px]">
                                        {formatDateRange(
                                            education.start_date,
                                            education.end_date
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                WORK EXPERIENCE
            ========================== */}

            {cv.experiences.length > 0 && (
                <section className="cv-section mt-8">
                    <h2 className="cv-section-title">
                        Work Experience
                    </h2>

                    <div>
                        {cv.experiences.map((experience) => (
                            <div
                                key={experience.id}
                                className="cv-entry"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-[16px] font-bold">
                                            {experience.position}
                                        </h3>

                                        <p className="mt-1 text-[15px]">
                                            {experience.company}

                                            {experience.location && (
                                                <>
                                                    {" · "}
                                                    {
                                                        experience.location
                                                    }
                                                </>
                                            )}
                                        </p>

                                        {experience.employment_type && (
                                            <p className="mt-1 text-[14px]">
                                                {
                                                    experience.employment_type
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <p className="shrink-0 text-right text-[15px]">
                                        {formatDateRange(
                                            experience.start_date,
                                            experience.end_date
                                        )}
                                    </p>
                                </div>

                                {experience.description && (
                                    <div className="mt-3 whitespace-pre-line text-[15px] leading-7">
                                        {
                                            experience.description
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                PROJECTS
            ========================== */}

            {cv.projects.length > 0 && (
                <section className="cv-section mt-8">
                    <h2 className="cv-section-title">
                        Activities
                    </h2>

                    <div>
                        {cv.projects.map((project) => {
                            const technologies =
                                project.technologies ?? [];

                            return (
                                <div
                                    key={project.id}
                                    className="cv-entry"
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        <div>
                                            <h3 className="text-[16px] font-bold">
                                                {project.title}
                                            </h3>

                                            {project.status && (
                                                <p className="mt-1 text-[15px]">
                                                    {project.status}
                                                </p>
                                            )}
                                        </div>

                                        <div className="shrink-0 text-right text-[14px]">
                                            {project.github_url && (
                                                <a
                                                    href={
                                                        project.github_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline"
                                                >
                                                    GitHub
                                                </a>
                                            )}

                                            {project.github_url &&
                                                project.demo_url && (
                                                    <span className="mx-2">
                                                        |
                                                    </span>
                                                )}

                                            {project.demo_url && (
                                                <a
                                                    href={
                                                        project.demo_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline"
                                                >
                                                    Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {project.summary && (
                                        <p className="mt-3 text-[15px] leading-7">
                                            <span className="font-bold">
                                                Description:
                                            </span>{" "}
                                            {project.summary}
                                        </p>
                                    )}

                                    {project.content && (
                                        <p className="mt-3 whitespace-pre-line text-[15px] leading-7">
                                            {project.content}
                                        </p>
                                    )}

                                    {technologies.length > 0 && (
                                        <div className="mt-4 text-[15px]">
                                            <span className="font-bold">
                                                Technology:
                                            </span>

                                            <div className="mt-1">
                                                {technologies.map(
                                                    (
                                                        technology,
                                                        index
                                                    ) => (
                                                        <span
                                                            key={
                                                                technology.id
                                                            }
                                                        >
                                                            {
                                                                technology.name
                                                            }

                                                            {index <
                                                                technologies.length -
                                                                1 && (
                                                                    <span>
                                                                        ,{" "}
                                                                    </span>
                                                                )}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* =========================
                SKILLS
            ========================== */}

            {cv.skills.length > 0 && (
                <section className="cv-section mt-8">
                    <h2 className="cv-section-title">
                        Skills
                    </h2>

                    <div className="space-y-2 text-[15px] leading-7">
                        <p>
                            <span className="font-bold">
                                Technical:
                            </span>{" "}
                            {cv.skills
                                .map((skill) => skill.name)
                                .join(", ")}
                        </p>
                    </div>
                </section>
            )}

            {/* =========================
                CERTIFICATES
            ========================== */}

            {cv.certificates.length > 0 && (
                <section className="cv-section mt-8">
                    <h2 className="cv-section-title">
                        Certificates
                    </h2>

                    <div>
                        {cv.certificates.map((certificate) => (
                            <div
                                key={certificate.id}
                                className="cv-entry"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-[16px] font-bold">
                                            {certificate.name}
                                        </h3>

                                        {certificate.organization && (
                                            <p className="mt-1 text-[15px]">
                                                {
                                                    certificate.organization
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {certificate.issue_date && (
                                        <p className="shrink-0 text-right text-[15px]">
                                            {formatDate(
                                                certificate.issue_date
                                            )}
                                        </p>
                                    )}
                                </div>

                                {certificate.credential_id && (
                                    <p className="mt-2 text-[14px]">
                                        Credential ID:{" "}
                                        {
                                            certificate.credential_id
                                        }
                                    </p>
                                )}

                                {certificate.description && (
                                    <p className="mt-2 text-[15px] leading-7">
                                        {
                                            certificate.description
                                        }
                                    </p>
                                )}

                                {certificate.credential_url && (
                                    <a
                                        href={
                                            certificate.credential_url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-[14px] underline"
                                    >
                                        View Credential
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                INTERESTS
            ========================== */}

            <section className="cv-section mt-8">
                <h2 className="cv-section-title">
                    Interests
                </h2>

                <ul className="list-disc space-y-1 pl-5 text-[15px] leading-7">
                    <li>
                        Exploring AI tools for software
                        development
                    </li>

                    <li>
                        Backend technologies and
                        scalable system design
                    </li>

                    <li>
                        Open-source communities and tech
                        learning
                    </li>

                    <li>
                        Reading, badminton, fitness, and
                        running
                    </li>
                </ul>
            </section>
        </div>
    );
}