import { Briefcase, Code, GraduationCap, Linkedin, Mail, Phone, Star } from "lucide-react";
import { ResumeTemplateProps } from "./util";

export const ModernDarkTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
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
        <div className="max-w-4xl mx-auto bg-gray-900 text-white shadow-2xl">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                    {resumeData.contactInformation.name}
                </h1>
                {resumeData.summary && (
                    <p className="text-gray-100 text-xl leading-relaxed mb-6">{resumeData.summary}</p>
                )}
                <div className="flex flex-wrap gap-6 text-sm">
                    {resumeData.contactInformation.email && (
                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <Mail size={16} />
                            <span>{resumeData.contactInformation.email}</span>
                        </div>
                    )}
                    {resumeData.contactInformation.phone && (
                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <Phone size={16} />
                            <span>{resumeData.contactInformation.phone}</span>
                        </div>
                    )}
                    {resumeData.contactInformation.linkedin && (
                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <Linkedin size={16} />
                            <span>LinkedIn</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8 space-y-8">
                {resumeData.workExperience.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold text-purple-400 mb-6 flex items-center">
                            <Briefcase className="mr-3" size={28} />
                            Experience
                        </h2>
                        {resumeData.workExperience.map((job, index) => (
                            <div key={index} className="mb-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{job.jobTitle}</h3>
                                        <p className="text-purple-400 text-lg font-semibold">{job.company}</p>
                                    </div>
                                    <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full">
                                        {formatDateRange(job.startDate ?? '', job.endDate ?? '')}
                                    </span>
                                </div>
                                {job.description && (
                                    <p className="text-gray-300 mb-4 leading-relaxed">{job.description}</p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="space-y-2 mb-4">
                                        {job.achievements.map((achievement, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <Star className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={16} />
                                                <span className="text-gray-300">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {job.technologies && job.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {job.technologies.map((tech, idx) => (
                                            <span key={idx} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                    <section>
                        <h2 className="text-3xl font-bold text-purple-400 mb-6 flex items-center">
                            <Code className="mr-3" size={28} />
                            Skills
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {resumeData.skills.technical.length > 0 && (
                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-bold text-blue-400 mb-4">Technical</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.technical.map((skill, index) => (
                                            <span key={index} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {resumeData.skills.soft.length > 0 && (
                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-bold text-green-400 mb-4">Soft Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.soft.map((skill, index) => (
                                            <span key={index} className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
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
                    <section>
                        <h2 className="text-3xl font-bold text-purple-400 mb-6 flex items-center">
                            <GraduationCap className="mr-3" size={28} />
                            Education
                        </h2>
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                        <p className="text-purple-400 text-lg">{edu.institution}</p>
                                    </div>
                                    <div className="text-right">
                                        {edu.graduationDate && (
                                            <span className="text-gray-400 text-sm">{formatDate(edu.graduationDate)}</span>
                                        )}
                                        {edu.gpa && (
                                            <p className="text-gray-400 text-sm">GPA: {edu.gpa}</p>
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