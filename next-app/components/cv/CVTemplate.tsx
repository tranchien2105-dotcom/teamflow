import type { CvData } from "@/services/cv-service";

interface CVTemplateProps {
    cv: CvData;
}

function formatDate(
    date: string | null
): string {
    if (!date) {
        return "Present";
    }

    return new Date(date).toLocaleDateString(
        "en-US",
        {
            month: "short",
            year: "numeric",
        }
    );
}

export default function CVTemplate({
    cv,
}: CVTemplateProps) {
    const { profile } = cv;

    return (
        <div
            id="cv-document"
            className="
                mx-auto
                min-h-[1123px]
                w-full
                max-w-[794px]
                bg-white
                px-12
                py-12
                text-gray-900
            "
        >
            {/* Header */}
            {profile && (
                <header>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {profile.full_name}
                    </h1>

                    {profile.title && (
                        <p className="mt-1 text-lg text-gray-600">
                            {profile.title}
                        </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        {profile.phone && (
                            <span>
                                {profile.phone}
                            </span>
                        )}

                        {profile.address && (
                            <span>
                                {profile.address}
                            </span>
                        )}

                        {profile.github_url && (
                            <span>
                                GitHub
                            </span>
                        )}

                        {profile.linkedin_url && (
                            <span>
                                LinkedIn
                            </span>
                        )}

                        {profile.website_url && (
                            <span>
                                Website
                            </span>
                        )}
                    </div>

                    {profile.bio && (
                        <p className="mt-5 text-sm leading-6 text-gray-600">
                            {profile.bio}
                        </p>
                    )}
                </header>
            )}

            {/* Experience */}
            {cv.experiences.length > 0 && (
                <section className="mt-10">
                    <SectionTitle>
                        Experience
                    </SectionTitle>

                    <div className="mt-5 space-y-6">
                        {cv.experiences.map(
                            (experience) => (
                                <article
                                    key={
                                        experience.id
                                    }
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        <div>
                                            <h3 className="font-semibold">
                                                {
                                                    experience.position
                                                }
                                            </h3>

                                            <p className="mt-0.5 text-sm text-gray-600">
                                                {
                                                    experience.company
                                                }

                                                {experience.location &&
                                                    ` · ${experience.location}`}
                                            </p>

                                            {experience.employment_type && (
                                                <p className="mt-0.5 text-xs text-gray-500">
                                                    {
                                                        experience.employment_type
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="shrink-0 text-right text-xs text-gray-500">
                                            <div>
                                                {formatDate(
                                                    experience.start_date
                                                )}
                                            </div>

                                            <div>
                                                {formatDate(
                                                    experience.end_date
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {experience.description && (
                                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                                            {
                                                experience.description
                                            }
                                        </p>
                                    )}
                                </article>
                            )
                        )}
                    </div>
                </section>
            )}

            {/* Skills */}
            {cv.skills.length > 0 && (
                <section className="mt-10">
                    <SectionTitle>
                        Skills
                    </SectionTitle>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {cv.skills.map((skill) => (
                            <span
                                key={skill.id}
                                className="
                                    rounded
                                    bg-gray-100
                                    px-2.5
                                    py-1
                                    text-xs
                                    font-medium
                                    text-gray-700
                                "
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {cv.projects.length > 0 && (
                <section className="mt-10">
                    <SectionTitle>
                        Projects
                    </SectionTitle>

                    <div className="mt-5 space-y-6">
                        {cv.projects.map(
                            (project) => (
                                <article
                                    key={
                                        project.id
                                    }
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-semibold">
                                            {
                                                project.title
                                            }
                                        </h3>

                                        {project.featured && (
                                            <span className="text-xs text-gray-500">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {project.summary && (
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            {
                                                project.summary
                                            }
                                        </p>
                                    )}

                                    {project.technologies &&
                                        project
                                            .technologies
                                            .length >
                                            0 && (
                                            <p className="mt-2 text-xs text-gray-500">
                                                {project.technologies
                                                    .map(
                                                        (
                                                            technology
                                                        ) =>
                                                            technology.name
                                                    )
                                                    .join(
                                                        " · "
                                                    )}
                                            </p>
                                        )}

                                    <div className="mt-2 flex gap-3 text-xs">
                                        {project.github_url && (
                                            <a
                                                href={
                                                    project.github_url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-gray-700 hover:underline"
                                            >
                                                GitHub
                                            </a>
                                        )}

                                        {project.demo_url && (
                                            <a
                                                href={
                                                    project.demo_url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-gray-700 hover:underline"
                                            >
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                </section>
            )}

            {/* Education */}
            {cv.educations.length > 0 && (
                <section className="mt-10">
                    <SectionTitle>
                        Education
                    </SectionTitle>

                    <div className="mt-5 space-y-5">
                        {cv.educations.map(
                            (education) => (
                                <article
                                    key={
                                        education.id
                                    }
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        <div>
                                            <h3 className="font-semibold">
                                                {
                                                    education.degree
                                                }
                                            </h3>

                                            <p className="mt-0.5 text-sm text-gray-600">
                                                {education
                                                    .school
                                                    ?.name ??
                                                    "School"}
                                            </p>

                                            {education.field_of_study && (
                                                <p className="text-sm text-gray-500">
                                                    {
                                                        education.field_of_study
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="shrink-0 text-right text-xs text-gray-500">
                                            <div>
                                                {formatDate(
                                                    education.start_date
                                                )}
                                            </div>

                                            <div>
                                                {formatDate(
                                                    education.end_date
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {education.description && (
                                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                                            {
                                                education.description
                                            }
                                        </p>
                                    )}
                                </article>
                            )
                        )}
                    </div>
                </section>
            )}

            {/* Certificates */}
            {cv.certificates.length > 0 && (
                <section className="mt-10">
                    <SectionTitle>
                        Certifications
                    </SectionTitle>

                    <div className="mt-5 space-y-4">
                        {cv.certificates.map(
                            (certificate) => (
                                <article
                                    key={
                                        certificate.id
                                    }
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">
                                                {
                                                    certificate.name
                                                }
                                            </h3>

                                            {certificate.organization && (
                                                <p className="text-sm text-gray-600">
                                                    {
                                                        certificate.organization
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {certificate.issue_date && (
                                            <span className="shrink-0 text-xs text-gray-500">
                                                {formatDate(
                                                    certificate.issue_date
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {certificate.credential_id && (
                                        <p className="mt-1 text-xs text-gray-500">
                                            Credential ID:{" "}
                                            {
                                                certificate.credential_id
                                            }
                                        </p>
                                    )}
                                </article>
                            )
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}

function SectionTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <h2
            className="
                border-b
                border-gray-300
                pb-2
                text-sm
                font-bold
                uppercase
                tracking-widest
            "
        >
            {children}
        </h2>
    );
}
