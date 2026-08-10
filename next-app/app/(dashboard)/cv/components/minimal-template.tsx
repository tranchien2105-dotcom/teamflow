import type { CvData } from "@/services/cv-service";

interface CvMinimalTemplateProps {
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

export default function CvMinimalTemplate({
    cv,
}: CvMinimalTemplateProps) {
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
                <header className="border-b border-gray-300 pb-6">
                    <h1 className="text-[30px] font-bold tracking-tight text-gray-900">
                        {cv.profile.full_name}
                    </h1>

                    {cv.profile.title && (
                        <p className="mt-1 text-[17px] text-gray-600">
                            {cv.profile.title}
                        </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-600">
                        {cv.profile.phone && (
                            <span>{cv.profile.phone}</span>
                        )}

                        {cv.profile.address && (
                            <span>{cv.profile.address}</span>
                        )}

                        {cv.profile.github_url && (
                            <a
                                href={cv.profile.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                GitHub
                            </a>
                        )}

                        {cv.profile.linkedin_url && (
                            <a
                                href={cv.profile.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                LinkedIn
                            </a>
                        )}

                        {cv.profile.website_url && (
                            <a
                                href={cv.profile.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Website
                            </a>
                        )}
                    </div>
                </header>
            )}

            {/* =========================
                PROFILE / OBJECTIVE
            ========================== */}

            {cv.profile?.bio && (
                <section className="cv-section mt-7">
                    <h2 className="cv-section-title">
                        Profile
                    </h2>

                    <p className="text-[14px] leading-6 text-gray-700">
                        {cv.profile.bio}
                    </p>
                </section>
            )}

            {/* =========================
                EXPERIENCE
            ========================== */}

            {cv.experiences.length > 0 && (
                <section className="cv-section mt-7">
                    <h2 className="cv-section-title">
                        Experience
                    </h2>

                    <div>
                        {cv.experiences.map((experience) => (
                            <article
                                key={experience.id}
                                className="cv-entry"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-[15px] font-semibold text-gray-900">
                                            {experience.position}
                                        </h3>

                                        <p className="mt-1 text-[14px] text-gray-700">
                                            {experience.company}

                                            {experience.location && (
                                                <>
                                                    {" · "}
                                                    {experience.location}
                                                </>
                                            )}
                                        </p>

                                        {experience.employment_type && (
                                            <p className="mt-1 text-[12px] text-gray-500">
                                                {
                                                    experience.employment_type
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <p className="shrink-0 text-right text-[12px] text-gray-500">
                                        {formatDateRange(
                                            experience.start_date,
                                            experience.end_date
                                        )}
                                    </p>
                                </div>

                                {experience.description && (
                                    <div className="mt-2 whitespace-pre-line text-[13px] leading-6 text-gray-700">
                                        {experience.description}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                PROJECTS
            ========================== */}

            {cv.projects.length > 0 && (
                <section className="cv-section mt-7">
                    <h2 className="cv-section-title">
                        Projects
                    </h2>

                    <div>
                        {cv.projects.map((project) => (
                            <article
                                key={project.id}
                                className="cv-entry"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-[15px] font-semibold text-gray-900">
                                            {project.title}
                                        </h3>

                                        {project.status && (
                                            <p className="mt-1 text-[12px] text-gray-500">
                                                {project.status}
                                            </p>
                                        )}
                                    </div>

                                    <div className="shrink-0 text-right text-[12px]">
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
                                    <p className="mt-2 text-[13px] leading-6 text-gray-700">
                                        {project.summary}
                                    </p>
                                )}

                                {project.content && (
                                    <p className="mt-2 whitespace-pre-line text-[13px] leading-6 text-gray-700">
                                        {project.content}
                                    </p>
                                )}

                                {project.technologies &&
                                    project.technologies.length > 0 && (
                                        <p className="mt-2 text-[12px] text-gray-600">
                                            <span className="font-semibold text-gray-800">
                                                Technologies:
                                            </span>{" "}
                                            {project.technologies
                                                .map(
                                                    (technology) =>
                                                        technology.name
                                                )
                                                .join(", ")}
                                        </p>
                                    )}
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                EDUCATION
            ========================== */}

            {cv.educations.length > 0 && (
                <section className="cv-section mt-7">
                    <h2 className="cv-section-title">
                        Education
                    </h2>

                    <div>
                        {cv.educations.map((education) => (
                            <article
                                key={education.id}
                                className="cv-entry"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-[15px] font-semibold text-gray-900">
                                            {education.school?.name}
                                        </h3>

                                        {education.degree && (
                                            <p className="mt-1 text-[14px] text-gray-700">
                                                {
                                                    education.degree
                                                }

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
                                    </div>

                                    <p className="shrink-0 text-right text-[12px] text-gray-500">
                                        {formatDateRange(
                                            education.start_date,
                                            education.end_date
                                        )}
                                    </p>
                                </div>

                                {education.description && (
                                    <p className="mt-2 text-[13px] leading-6 text-gray-700">
                                        {education.description}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                SKILLS
            ========================== */}

            {cv.skills.length > 0 && (
                <section className="cv-section mt-7">
                    <h2 className="cv-section-title">
                        Skills
                    </h2>

                    <div className="text-[13px] leading-6 text-gray-700">
                        {cv.skills.map((skill, index) => (
                            <span key={skill.id}>
                                {skill.name}

                                {index <
                                    cv.skills.length - 1 && (
                                        <span className="mx-1">
                                            ·
                                        </span>
                                    )}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                CERTIFICATES
            ========================== */}

            {cv.certificates.length > 0 && (
                <section className="cv-section mt-7">
                    <h2 className="cv-section-title">
                        Certificates
                    </h2>

                    <div>
                        {cv.certificates.map((certificate) => (
                            <article
                                key={certificate.id}
                                className="cv-entry"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-[15px] font-semibold text-gray-900">
                                            {
                                                certificate.name
                                            }
                                        </h3>

                                        {certificate.organization && (
                                            <p className="mt-1 text-[13px] text-gray-700">
                                                {
                                                    certificate.organization
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {certificate.issue_date && (
                                        <p className="shrink-0 text-right text-[12px] text-gray-500">
                                            {formatDate(
                                                certificate.issue_date
                                            )}
                                        </p>
                                    )}
                                </div>

                                {certificate.credential_id && (
                                    <p className="mt-1 text-[12px] text-gray-500">
                                        Credential ID:{" "}
                                        {
                                            certificate.credential_id
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
                                        className="mt-1 inline-block text-[12px] underline"
                                    >
                                        View Credential
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
                INTERESTS
            ========================== */}

            <section className="cv-section mt-7">
                <h2 className="cv-section-title">
                    Interests
                </h2>

                <p className="text-[13px] leading-6 text-gray-700">
                    AI tools, backend technologies, scalable
                    system design, open-source communities,
                    reading, badminton, fitness, and running.
                </p>
            </section>
        </div>
    );
}