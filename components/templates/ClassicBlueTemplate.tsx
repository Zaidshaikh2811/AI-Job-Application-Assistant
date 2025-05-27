
import { Calendar, Code, GraduationCap, Linkedin, Mail, Phone, User } from "lucide-react";
import { ResumeTemplateProps } from "./util";

export const ClassicBlueTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
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
        <div className="max-w-4xl mx-auto bg-white shadow-lg">
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
                                <span>LinkedIn Profile</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-8">
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
                                        <span className="text-sm">{formatDateRange(job.startDate, job.endDate ?? '')}</span>
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
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};