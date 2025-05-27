"use client";

import React from 'react'
import { Mail, Phone, Linkedin, Calendar, ExternalLink, Award, Code, User, GraduationCap } from 'lucide-react';
import { ResumeTemplateProps } from './util';
const ResumeFirst: React.FC<ResumeTemplateProps> = ({ resumeData }) => {


    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    const formatDateRange = (startDate: string, endDate: string) => {
        const start = formatDate(startDate);
        const end = endDate ? formatDate(endDate) : 'Present';
        return `${start} - ${end}`;
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold mb-2">{resumeData.contactInformation.name}</h1>
                        {resumeData.summary && (
                            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">{resumeData.summary}</p>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2 text-sm">
                        {resumeData.contactInformation.email && (
                            <div className="flex items-center space-x-2">
                                <Mail size={16} />
                                <span>{resumeData.contactInformation.email}</span>
                            </div>
                        )}
                        {resumeData.contactInformation.phone && (
                            <div className="flex items-center space-x-2">
                                <Phone size={16} />
                                <span>{resumeData.contactInformation.phone}</span>
                            </div>
                        )}
                        {resumeData.contactInformation.linkedin && (
                            <div className="flex items-center space-x-2">
                                <Linkedin size={16} />
                                <a href={resumeData.contactInformation.linkedin} className="hover:text-blue-200 transition-colors">
                                    LinkedIn Profile
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Work Experience Section */}
                {resumeData.workExperience.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center mb-6">
                            <User className="mr-3 text-blue-600" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1">Work Experience</h2>
                        </div>
                        {resumeData.workExperience.map((job, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                                        <p className="text-lg text-blue-600 font-medium">{job.company}</p>
                                    </div>
                                    <div className="flex items-center text-gray-600 mt-1 md:mt-0">
                                        <Calendar size={16} className="mr-2" />
                                        <span className="text-sm">{formatDateRange(job.startDate || '', job.endDate || '')}</span>
                                    </div>
                                </div>
                                {job.description && (
                                    <p className="text-gray-700 mb-3 leading-relaxed">{job.description}</p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="list-disc list-inside text-gray-700 mb-3 space-y-1">
                                        {job.achievements.map((achievement, idx) => (
                                            <li key={idx} className="leading-relaxed">{achievement}</li>
                                        ))}
                                    </ul>
                                )}
                                {job.technologies && job.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {job.technologies.map((tech, idx) => (
                                            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills Section */}
                {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                    <section className="mb-8">
                        <div className="flex items-center mb-6">
                            <Code className="mr-3 text-blue-600" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1">Skills</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {resumeData.skills.technical.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.technical.map((skill, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {resumeData.skills.soft.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Soft Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.soft.map((skill, index) => (
                                            <span key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {resumeData.projects.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center mb-6">
                            <Code className="mr-3 text-blue-600" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1">Projects</h2>
                        </div>
                        {resumeData.projects.map((project, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                                    {project.link && (
                                        <a href={project.link} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mt-1 md:mt-0">
                                            <ExternalLink size={16} className="mr-1" />
                                            <span className="text-sm">View Project</span>
                                        </a>
                                    )}
                                </div>
                                {project.description && (
                                    <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                                )}
                                {project.achievements && project.achievements.length > 0 && (
                                    <ul className="list-disc list-inside text-gray-700 mb-3 space-y-1">
                                        {project.achievements.map((achievement, idx) => (
                                            <li key={idx} className="leading-relaxed">{achievement}</li>
                                        ))}
                                    </ul>
                                )}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Education Section */}
                {resumeData.education.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center mb-6">
                            <GraduationCap className="mr-3 text-blue-600" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1">Education</h2>
                        </div>
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                                        <p className="text-lg text-blue-600 font-medium">{edu.institution}</p>
                                    </div>
                                    <div className="flex flex-col items-end mt-1 md:mt-0">
                                        {edu.graduationDate && (
                                            <div className="flex items-center text-gray-600">
                                                <Calendar size={16} className="mr-2" />
                                                <span className="text-sm">{formatDate(edu.graduationDate)}</span>
                                            </div>
                                        )}
                                        {edu.gpa && (
                                            <span className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</span>
                                        )}
                                    </div>
                                </div>
                                {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                                    <div>
                                        <p className="text-gray-700 font-medium mb-2">Relevant Coursework:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.relevantCoursework.map((course, idx) => (
                                                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Certifications Section */}
                {resumeData.certifications && resumeData.certifications.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center mb-6">
                            <Award className="mr-3 text-blue-600" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1">Certifications</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {resumeData.certifications.map((cert, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-800 mb-1">{cert.name}</h3>
                                    <p className="text-blue-600 text-sm mb-2">{cert.issuer}</p>
                                    <div className="text-xs text-gray-600">
                                        {cert.date && <p>Issued: {formatDate(cert.date)}</p>}
                                        {cert.expiryDate && <p>Expires: {formatDate(cert.expiryDate)}</p>}
                                        {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages and Achievements Row */}
                {(resumeData.languages.length > 0 || resumeData.achievements.length > 0) && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Languages Section */}
                        {resumeData.languages.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1 mb-4">Languages</h2>
                                <div className="space-y-2">
                                    {resumeData.languages.map((language, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-gray-800">
                                                {typeof language === 'string' ? language : language.name}
                                            </span>
                                            {typeof language === 'object' && language.proficiency && (
                                                <span className="text-gray-600 text-sm">{language.proficiency}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Additional Achievements Section */}
                        {resumeData.achievements.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-1 mb-4">Achievements</h2>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    {resumeData.achievements.map((achievement, index) => (
                                        <li key={index} className="leading-relaxed">{achievement}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResumeFirst
