import { Award, Briefcase, Code, ExternalLink, Globe, GraduationCap, Linkedin, Mail, Phone } from "lucide-react";
import { ResumeTemplateProps } from "./util";

export const CreativeTwoColumnTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
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
        <div className="max-w-6xl mx-auto bg-white shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Sidebar */}
                <div className="lg:w-1/3 bg-gradient-to-b from-emerald-600 to-teal-700 text-white p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">{resumeData.contactInformation.name}</h1>
                        <div className="space-y-3">
                            {resumeData.contactInformation.email && (
                                <div className="flex items-center space-x-3">
                                    <Mail size={18} />
                                    <span className="text-sm">{resumeData.contactInformation.email}</span>
                                </div>
                            )}
                            {resumeData.contactInformation.phone && (
                                <div className="flex items-center space-x-3">
                                    <Phone size={18} />
                                    <span className="text-sm">{resumeData.contactInformation.phone}</span>
                                </div>
                            )}
                            {resumeData.contactInformation.linkedin && (
                                <div className="flex items-center space-x-3">
                                    <Linkedin size={18} />
                                    <span className="text-sm">LinkedIn</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <Code size={20} className="mr-2" />
                                Skills
                            </h2>
                            {resumeData.skills.technical.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3 text-emerald-200">Technical</h3>
                                    <div className="space-y-2">
                                        {resumeData.skills.technical.map((skill, index) => (
                                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded px-3 py-1 text-sm">
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {resumeData.skills.soft.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3 text-emerald-200">Soft Skills</h3>
                                    <div className="space-y-2">
                                        {resumeData.skills.soft.map((skill, index) => (
                                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded px-3 py-1 text-sm">
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {resumeData.languages.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <Globe size={20} className="mr-2" />
                                Languages
                            </h2>
                            <div className="space-y-2">
                                {resumeData.languages.map((language, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-sm">
                                            {typeof language === 'string' ? language : language.name}
                                        </span>
                                        {typeof language === 'object' && language.proficiency && (
                                            <span className="text-sm text-emerald-200">{language.proficiency}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {resumeData.certifications && resumeData.certifications.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <Award size={20} className="mr-2" />
                                Certifications
                            </h2>
                            <div className="space-y-3">
                                {resumeData.certifications.map((cert, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded p-3">
                                        <h3 className="font-semibold text-sm">{cert.name}</h3>
                                        <p className="text-emerald-200 text-xs">{cert.issuer}</p>
                                        {cert.date && <p className="text-xs">{formatDate(cert.date)}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Content */}
                <div className="lg:w-2/3 p-8">
                    {resumeData.summary && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Summary</h2>
                            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                        </div>
                    )}

                    {resumeData.workExperience.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <Briefcase size={24} className="mr-3 text-emerald-600" />
                                Work Experience
                            </h2>
                            {resumeData.workExperience.map((job, index) => (
                                <div key={index} className="mb-8 last:mb-0 border-l-4 border-emerald-500 pl-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>
                                            <p className="text-emerald-600 font-semibold">{job.company}</p>
                                        </div>
                                        <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                                            {formatDateRange(job.startDate || '', job.endDate || '')}
                                        </span>
                                    </div>
                                    {job.description && (
                                        <p className="text-gray-700 mb-3">{job.description}</p>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <ul className="space-y-1 mb-4">
                                            {job.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-emerald-600 mr-2">▸</span>
                                                    <span className="text-gray-700">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {job.technologies && job.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {job.technologies.map((tech, idx) => (
                                                <span key={idx} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {resumeData.projects.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <Code size={24} className="mr-3 text-emerald-600" />
                                Projects
                            </h2>
                            {resumeData.projects.map((project, index) => (
                                <div key={index} className="mb-6 last:mb-0 bg-gray-50 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                                        {project.link && (
                                            <ExternalLink size={16} className="text-emerald-600" />
                                        )}
                                    </div>
                                    {project.description && (
                                        <p className="text-gray-700 mb-3">{project.description}</p>
                                    )}
                                    {project.achievements && project.achievements.length > 0 && (
                                        <ul className="space-y-1 mb-3">
                                            {project.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-emerald-600 mr-2">•</span>
                                                    <span className="text-gray-700">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, idx) => (
                                                <span key={idx} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {resumeData.education.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <GraduationCap size={24} className="mr-3 text-emerald-600" />
                                Education
                            </h2>
                            {resumeData.education.map((edu, index) => (
                                <div key={index} className="mb-4 last:mb-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                                            <p className="text-emerald-600">{edu.institution}</p>
                                        </div>
                                        <div className="text-right">
                                            {edu.graduationDate && (
                                                <span className="text-gray-500 text-sm">{formatDate(edu.graduationDate)}</span>
                                            )}
                                            {edu.gpa && (
                                                <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};