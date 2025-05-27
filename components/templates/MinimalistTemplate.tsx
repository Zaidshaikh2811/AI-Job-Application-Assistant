import { ResumeTemplateProps } from "./util";

export const MinimalistTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
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
        <div className="max-w-4xl mx-auto bg-white shadow-sm border">
            <div className="border-b-4 border-gray-900 p-8">
                <h1 className="text-4xl font-light text-gray-900 mb-2">
                    {resumeData.contactInformation.name}
                </h1>
                {resumeData.summary && (
                    <p className="text-gray-600 text-lg mb-6 font-light leading-relaxed max-w-3xl">
                        {resumeData.summary}
                    </p>
                )}
                <div className="flex flex-wrap gap-8 text-sm text-gray-600">
                    {resumeData.contactInformation.email && (
                        <span>{resumeData.contactInformation.email}</span>
                    )}
                    {resumeData.contactInformation.phone && (
                        <span>{resumeData.contactInformation.phone}</span>
                    )}
                    {resumeData.contactInformation.linkedin && (
                        <span>LinkedIn Profile</span>
                    )}
                </div>
            </div>

            <div className="p-8 space-y-10">
                {resumeData.workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-light text-gray-900 mb-6 uppercase tracking-wider border-b border-gray-200 pb-2">
                            Experience
                        </h2>
                        {resumeData.workExperience.map((job, index) => (
                            <div key={index} className="mb-8 last:mb-0">
                                <div className="flex justify-between items-baseline mb-2">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{job.jobTitle}</h3>
                                        <p className="text-gray-600">{job.company}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {formatDateRange(job.startDate ?? '', job.endDate ?? '')}
                                    </span>
                                </div>
                                {job.description && (
                                    <p className="text-gray-700 mb-3 font-light leading-relaxed">{job.description}</p>
                                )}
                                {job.achievements && job.achievements.length > 0 && (
                                    <ul className="space-y-1 mb-4">
                                        {job.achievements.map((achievement, idx) => (
                                            <li key={idx} className="text-gray-700 font-light leading-relaxed">
                                                • {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {job.technologies && job.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {job.technologies.map((tech, idx) => (
                                            <span key={idx} className="text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded">
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
                        <h2 className="text-xl font-light text-gray-900 mb-6 uppercase tracking-wider border-b border-gray-200 pb-2">
                            Skills
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {resumeData.skills.technical.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">Technical</h3>
                                    <div className="space-y-1">
                                        {resumeData.skills.technical.map((skill, index) => (
                                            <span key={index} className="inline-block text-gray-700 font-light mr-4">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {resumeData.skills.soft.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">Soft Skills</h3>
                                    <div className="space-y-1">
                                        {resumeData.skills.soft.map((skill, index) => (
                                            <span key={index} className="inline-block text-gray-700 font-light mr-4">
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
                        <h2 className="text-xl font-light text-gray-900 mb-6 uppercase tracking-wider border-b border-gray-200 pb-2">
                            Education
                        </h2>
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                </div>
                                <div className="text-right">
                                    {edu.graduationDate && (
                                        <span className="text-sm text-gray-500">{formatDate(edu.graduationDate)}</span>
                                    )}
                                    {edu.gpa && (
                                        <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};
