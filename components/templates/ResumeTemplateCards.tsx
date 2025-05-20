
import { Certification, Education, Project, ResumeData, WorkExperience } from "@/lib/types/resume";


const ResumeTemplateCards = ({ data }: { data: ResumeData }) => {




    return (
        <div className="w-fit mx-auto   bg-gray-50 h-fit">


            <div
                className="bg-white p-8 rounded-lg shadow-md font-sans text-gray-800"

                style={{
                    lineHeight: 1.5,
                    fontSize: '12pt'
                }}
            >
                {/* Header Section */}
                <header className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2" style={{ fontSize: '18pt' }}>{data.contactInformation.name}</h1>
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <span>{data.contactInformation.email}</span>
                        <span>•</span>
                        <span>{data.contactInformation.phone}</span>
                        {data.contactInformation.linkedin && (
                            <>
                                <span>•</span>
                                <span className="text-blue-600">{data.contactInformation.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//i, '')}</span>
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

                {/* Summary Section */}
                {data.summary && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ fontSize: '14pt' }}>PROFESSIONAL SUMMARY</h2>
                        <p className="text-justify">{data.summary}</p>
                    </section>
                )}

                {/* Work Experience Section - Critical for ATS */}
                {Array.isArray(data.workExperience) && data.workExperience.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ fontSize: '14pt' }}>PROFESSIONAL EXPERIENCE</h2>
                        {data.workExperience.map((we: WorkExperience, i: number) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold">{we.title}</h3>
                                    <span className="text-sm">
                                        {we.startDate} - {we.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <p className="font-medium">{we.company}</p>
                                    {we.location && <span className="text-sm">{we.location}</span>}
                                </div>
                                {we.description && (
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        {we.description.split('\n').filter(Boolean).map((desc: string, idx: number) => (
                                            <li key={idx}>{desc}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills Section - Important for keyword matching */}
                {Array.isArray(data.skills) && data.skills.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ fontSize: '14pt' }}>SKILLS</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill: string, i: number) => (
                                <span key={i} className="bg-gray-100 px-3 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section - Often required by ATS */}
                {data.education && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ fontSize: '14pt' }}>EDUCATION</h2>
                        {Array.isArray(data.education) ? (
                            data.education.map((edu: Education, i: number) => (
                                <div key={i} className="mb-3">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold">{edu.degree}</h3>
                                        <span className="text-sm">
                                            {edu.year}
                                        </span>
                                    </div>
                                    <p className="font-medium">{edu.institution}</p>
                                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                </div>
                            ))
                        ) : (
                            <p className="whitespace-pre-line">{data.education}</p>
                        )}
                    </section>
                )}

                {/* Projects Section */}
                {data.projects && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ fontSize: '14pt' }}>PROJECTS</h2>
                        {Array.isArray(data.projects) ? (
                            <ul className="list-disc pl-5 space-y-2">
                                {data.projects.map((project: Project, i: number) => (
                                    <li key={i}>
                                        <strong>{project.name}</strong>: {project.description}
                                        {project.technologies && (
                                            <div className="text-sm mt-1">
                                                <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="whitespace-pre-line">{data.projects}</p>
                        )}
                    </section>
                )}

                {/* Certifications Section */}
                {data.certifications && (
                    <section className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ fontSize: '14pt' }}>CERTIFICATIONS</h2>
                        {Array.isArray(data.certifications) ? (
                            <ul className="list-disc pl-5 space-y-1">
                                {data.certifications.map((cert: Certification, i: number) => (
                                    <li key={i}>
                                        <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="whitespace-pre-line">{data.certifications}</p>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default ResumeTemplateCards;