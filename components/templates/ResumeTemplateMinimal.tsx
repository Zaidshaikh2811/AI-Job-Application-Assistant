interface ContactInformation {
    personalName: string;
    email: string;
    phone: string;
    linkedin?: string;
}

interface WorkExperience {
    jobTitle?: string;
    title?: string;
    startDate: string;
    endDate?: string;
    company: string;
    location?: string;
    description?: string | string[];
}

interface Education {
    degree: string;
    year: string;
    institution: string;
    gpa?: string;
}

interface Project {
    name: string;
    description: string;
    technologies?: string[];
}

interface Certification {
    name: string;
    issuer: string;
    date: string;
}

interface ResumeData {
    contactInformation: ContactInformation;
    location?: string;
    summary?: string;
    workExperience?: WorkExperience[];
    skills?: string[];
    education?: Education[] | string;
    projects?: Project[] | string;
    certifications?: Certification[] | string;
}

const ATSFriendlyResume = ({ data }: { data: ResumeData }) => (
    <div className="bg-white w-fit p-4 mt-20 mx-auto">


        <div className="p-6 max-w-2xl mx-auto font-sans text-gray-800" style={{ fontSize: '11pt', lineHeight: 1.5 }}>
            {/* Header Section */}
            <header className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-1">{data.contactInformation.personalName}</h1>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                    <span>{data.contactInformation.email}</span>
                    <span>•</span>
                    <span>{data.contactInformation.phone}</span>
                    {data.contactInformation.linkedin && (
                        <>
                            <span>•</span>
                            <span>{data.contactInformation.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//i, 'linkedin.com/in/')}</span>
                        </>
                    )}
                    {data.location && (
                        <>
                            <span>•</span>
                            <span>{data.location}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                    <p className="text-justify">{data.summary}</p>
                </section>
            )}

            {/* Work Experience - Most important for ATS */}
            {Array.isArray(data.workExperience) && data.workExperience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROFESSIONAL EXPERIENCE</h2>
                    {data.workExperience.map((we: WorkExperience, i: number) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold">{we.jobTitle || we.title}</h3>
                                <span className="text-sm">
                                    {we.startDate} – {we.endDate || 'Present'}
                                </span>
                            </div>
                            <div className="flex justify-between items-baseline mb-1">
                                <p className="font-medium">{we.company}</p>
                                {we.location && <span className="text-sm">{we.location}</span>}
                            </div>
                            {we.description && (
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {typeof we.description === 'string'
                                        ? we.description.split('\n').filter(Boolean).map((desc: string, idx: number) => (
                                            <li key={idx}>{desc}</li>
                                        ))
                                        : we.description.map((desc: string, idx: number) => (
                                            <li key={idx}>{desc}</li>
                                        ))
                                    }
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills - Important for keyword matching */}
            {Array.isArray(data.skills) && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
                    <div className="flex flex-wrap gap-1">
                        {data.skills.map((skill: string, i: number) => (
                            <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
                    {Array.isArray(data.education) ? (
                        data.education.map((edu: Education, i: number) => (
                            <div key={i} className="mb-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <span className="text-sm">{edu.year}</span>
                                </div>
                                <p className="font-medium">{edu.institution}</p>
                                {edu.gpa && <p>GPA: {edu.gpa}</p>}
                            </div>
                        ))
                    ) : (
                        <p>{data.education}</p>
                    )}
                </section>
            )}

            {/* Projects */}
            {data.projects && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROJECTS</h2>
                    {Array.isArray(data.projects) ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {data.projects.map((project: Project, i: number) => (
                                <li key={i}>
                                    <strong>{project.name}</strong>: {project.description}
                                    {project.technologies && (
                                        <div className="text-sm mt-0.5">
                                            <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{data.projects}</p>
                    )}
                </section>
            )}

            {/* Certifications */}
            {data.certifications && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">CERTIFICATIONS</h2>
                    {Array.isArray(data.certifications) ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {data.certifications.map((cert: Certification, i: number) => (
                                <li key={i}>
                                    <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{data.certifications}</p>
                    )}
                </section>
            )}

        </div>
    </div>
);

export default ATSFriendlyResume;