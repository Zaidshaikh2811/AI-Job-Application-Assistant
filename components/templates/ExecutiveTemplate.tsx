
import { Linkedin, Mail, Phone, Trophy } from "lucide-react";
import { ResumeTemplateProps } from "./util";


export const ExecutiveTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
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
            <div className="border-t-8 border-amber-500 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        {resumeData.contactInformation.name}
                    </h1>
                    <div className="flex justify-center space-x-8 text-gray-600 mb-6">
                        {resumeData.contactInformation.email && (
                            <div className="flex items-center">
                                <Mail size={18} className="mr-2" />
                                <span>{resumeData.contactInformation.email}</span>
                            </div>
                        )}
                        {resumeData.contactInformation.phone && (
                            <div className="flex items-center">
                                <Phone size={18} className="mr-2" />
                                <span>{resumeData.contactInformation.phone}</span>
                            </div>
                        )}
                        {resumeData.contactInformation.linkedin && (
                            <div className="flex items-center">
                                <Linkedin size={18} className="mr-2" />
                                <span>LinkedIn</span>
                            </div>
                        )}
                    </div>
                    {resumeData.summary && (
                        <div className="max-w-4xl mx-auto">
                            <p className="text-gray-700 text-lg leading-relaxed italic border-l-4 border-amber-500 pl-6 text-left">
                                {resumeData.summary}
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-12">
                    {resumeData.workExperience.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b-2 border-amber-500 pb-4">
                                PROFESSIONAL EXPERIENCE
                            </h2>
                            {resumeData.workExperience.map((job, index) => (
                                <div key={index} className="mb-10 last:mb-0">
                                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{job.jobTitle}</h3>
                                                <p className="text-xl text-amber-600 font-semibold">{job.company}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
                                                    {formatDateRange(job.startDate ?? '', job.endDate ?? '')}
                                                </span>
                                            </div>
                                        </div>
                                        {job.description && (
                                            <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                                                {job.description}
                                            </p>
                                        )}
                                        {job.achievements && job.achievements.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="font-bold text-gray-800 mb-2">Key Achievements:</h4>
                                                <ul className="space-y-2">
                                                    {job.achievements.map((achievement, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <Trophy className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={16} />
                                                            <span className="text-gray-700">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {job.technologies && job.technologies.length > 0 && (
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-2">Technologies:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.technologies.map((tech, idx) => (
                                                        <span key={idx} className="bg-white border border-amber-300 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    <div className="grid md:grid-cols-2 gap-12">
                        {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-amber-500 pb-2">
                                    CORE COMPETENCIES
                                </h2>
                                {resumeData.skills.technical.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-3">Technical Expertise</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {resumeData.skills.technical.map((skill, index) => (
                                                <div key={index} className="bg-amber-50 text-gray-800 px-3 py-2 rounded text-sm font-medium">
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {resumeData.skills.soft.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-3">Leadership Skills</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {resumeData.skills.soft.map((skill, index) => (
                                                <div key={index} className="bg-gray-100 text-gray-800 px-3 py-2 rounded text-sm font-medium">
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {resumeData.education.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-amber-500 pb-2">
                                    EDUCATION
                                </h2>
                                {resumeData.education.map((edu, index) => (
                                    <div key={index} className="mb-6 last:mb-0 bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                                        <p className="text-amber-600 font-semibold">{edu.institution}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            {edu.graduationDate && (
                                                <span className="text-gray-600 text-sm">{formatDate(edu.graduationDate)}</span>
                                            )}
                                            {edu.gpa && (
                                                <span className="text-gray-600 text-sm font-medium">GPA: {edu.gpa}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};