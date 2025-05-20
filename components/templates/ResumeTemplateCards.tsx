"use client"

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ContactInformation {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
}

interface WorkExperience {
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

interface Education {
    degree: string;
    institution: string;
    year: string;
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
    personalName?: string;
    contactInformation: ContactInformation;
    location?: string;
    summary?: string;
    workExperience?: WorkExperience[];
    skills?: string[];
    education?: Education[] | string;
    projects?: Project[] | string;
    certifications?: Certification[] | string;
}

const ATSFriendlyResume = ({ data }: { data: ResumeData }) => {
    const pdfRef = useRef<HTMLDivElement>(null);
    console.log(data);


    const generatePdf = async () => {
        if (!pdfRef.current) return;

        const element = pdfRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${(data.personalName ?? "Resume").replace(/\s+/g, '_')}_Resume.pdf`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">ATS-Friendly Resume</h1>
                <button
                    onClick={generatePdf}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
                    aria-label="Download resume as PDF"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                </button>
            </div>

            {/* ATS-Optimized Resume Content */}
            <div
                className="bg-white p-8 rounded-lg shadow-md font-sans text-gray-800"
                ref={pdfRef}
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

export default ATSFriendlyResume;