interface ContactInformation {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    location?: string;
}

interface WorkExperience {
    jobTitle: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    description: string | string[];
}

interface Education {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
}

interface Certification {
    name: string;
    issuer: string;
    date: string;
}

interface Project {
    name: string;
    description: string;
    technologies?: string[];
}

interface ResumeData {
    contactInformation: ContactInformation;
    summary: string;
    skills: string[];
    workExperience: WorkExperience[];
    education: Education | Education[] | string;
    certifications: Certification[] | string;
    projects: Project[] | string;
}

const ResumeTemplateClassicATS = ({ data }: { data: ResumeData }) => (
    <div className="max-w-5xl mx-auto my-6 font-sans text-gray-800" style={{ fontSize: '11pt' }}>
        {/* Header Section */}
        <header className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">{data.contactInformation.name}</h1>
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
                {data.contactInformation.location && (
                    <>
                        <span>•</span>
                        <span>{data.contactInformation.location}</span>
                    </>
                )}
            </div>
        </header>

        <div className="flex flex-col md:flex-row border rounded shadow-md">
            {/* Left Sidebar */}
            <aside className="w-full md:w-1/3 bg-gray-100 p-6">
                {/* Skills Section */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
                    <div className="flex flex-wrap gap-1">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="bg-gray-200 px-2 py-0.5 rounded text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
                    {Array.isArray(data.education) ? (
                        data.education.map((edu, i) => (
                            <div key={i} className="mb-3">
                                <h3 className="font-semibold">{edu.degree}</h3>
                                <p className="text-sm">{edu.institution}</p>
                                <p className="text-xs text-gray-600">{edu.year}</p>
                                {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
                            </div>
                        ))
                    ) : typeof data.education === 'string' ? (
                        <p className="text-sm">{data.education}</p>
                    ) : (
                        <div className="mb-3">
                            <h3 className="font-semibold">{data.education.degree}</h3>
                            <p className="text-sm">{data.education.institution}</p>
                            <p className="text-xs text-gray-600">{data.education.year}</p>
                            {data.education.gpa && <p className="text-xs">GPA: {data.education.gpa}</p>}
                        </div>
                    )}
                </section>

                {/* Certifications Section */}
                {data.certifications && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">CERTIFICATIONS</h2>
                        {Array.isArray(data.certifications) ? (
                            <ul className="space-y-1 text-sm">
                                {data.certifications.map((cert, i) => (
                                    <li key={i}>
                                        <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm">{data.certifications}</p>
                        )}
                    </section>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-full md:w-2/3 p-6">
                {/* Summary Section */}
                {data.summary && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                        <p className="text-justify">{data.summary}</p>
                    </section>
                )}

                {/* Work Experience Section */}
                {data.workExperience?.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROFESSIONAL EXPERIENCE</h2>
                        {data.workExperience.map((we, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold">{we.jobTitle}</h3>
                                    <span className="text-sm">
                                        {we.startDate} – {we.endDate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <p className="font-medium">{we.company}</p>
                                    {we.location && <span className="text-sm">{we.location}</span>}
                                </div>
                                {we.description && (
                                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                        {typeof we.description === 'string'
                                            ? we.description.split('\n').filter(Boolean).map((desc, idx) => (
                                                <li key={idx}>{desc}</li>
                                            ))
                                            : we.description.map((desc, idx) => (
                                                <li key={idx}>{desc}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects Section */}
                {data.projects && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROJECTS</h2>
                        {Array.isArray(data.projects) ? (
                            <ul className="space-y-2">
                                {data.projects.map((project, i) => (
                                    <li key={i} className="text-sm">
                                        <strong>{project.name}</strong>: {project.description}
                                        {project.technologies && (
                                            <div className="mt-0.5">
                                                <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm">{data.projects}</p>
                        )}
                    </section>
                )}
            </main>
        </div>
    </div>
);

export default ResumeTemplateClassicATS;