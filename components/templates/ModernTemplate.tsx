import { Calendar, Code, Mail, MapPin, Phone, Users } from "lucide-react";

interface ModernTemplateProps {
    data: {
        personalInfo: {
            name: string;
            title: string;
            email: string;
            phone: string;
            location: string;
        };
        summary: string;
        experience: Array<{
            position: string;
            company: string;
            duration: string;
            location: string;
            achievements: string[];
        }>;
        skills: {
            technical: string[];
            soft: string[];
        };
        education: Array<{
            degree: string;
            school: string;
            year: string;
            gpa: string;
        }>;
        projects: Array<{
            name: string;
            description: string;
            technologies: string[];
        }>;
    };
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                    {data.personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-center md:text-left flex-1">
                    <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name}</h1>
                    <p className="text-xl mb-4 opacity-90">{data.personalInfo.title}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>{data.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>{data.personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{data.personalInfo.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8 space-y-8">
            {/* Summary */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>

            {/* Experience */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Experience</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                                    <p className="text-blue-600 font-medium">{exp.company}</p>
                                </div>
                                <div className="text-gray-600 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {exp.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {exp.location}
                                    </div>
                                </div>
                            </div>
                            <ul className="space-y-1 text-gray-700">
                                {exp.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-2">•</span>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Skills</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Code size={18} />
                            Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.technical.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Users size={18} />
                            Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.soft.map((skill, index) => (
                                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Education & Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Education */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Education</h2>
                    {data.education.map((edu, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                            <p className="text-blue-600">{edu.school}</p>
                            <p className="text-gray-600">{edu.year} • GPA: {edu.gpa}</p>
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Projects</h2>
                    <div className="space-y-4">
                        {data.projects.map((project, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
                                <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);