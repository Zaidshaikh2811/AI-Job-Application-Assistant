/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const ResumeTableLayout = ({ data }: { data: any }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded shadow text-sm text-gray-800">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">{data.contactInformation?.personalName}</h1>
                <p>
                    {data.contactInformation?.email}
                    {data.contactInformation?.email && data.contactInformation?.phone && ' | '}
                    {data.contactInformation?.phone}
                </p>
                {data.contactInformation?.linkedin && <p>{data.contactInformation.linkedin}</p>}
                {data.location && <p>{data.location}</p>}
            </div>

            {/* Summary */}
            {data.summary && (
                <>
                    <h2 className="font-semibold text-lg border-b mb-2">Summary</h2>
                    <p className="mb-4 whitespace-pre-line">
                        {typeof data.summary === 'string' ? data.summary : JSON.stringify(data.summary)}
                    </p>
                </>
            )}

            {/* Experience Table */}
            {Array.isArray(data.workExperience) && data.workExperience.length > 0 && (
                <>
                    <h2 className="font-semibold text-lg border-b mb-2">Experience</h2>
                    <table className="w-full mb-6 border text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Title</th>
                                <th className="p-2">Company</th>
                                <th className="p-2">Duration</th>
                                <th className="p-2">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.workExperience.map((we: any, i: number) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{we.title}</td>
                                    <td className="p-2">{we.company}</td>
                                    <td className="p-2">{we.startDate} - {we.endDate || "Present"}</td>
                                    <td className="p-2">{we.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Skills Table */}
            {data.skills && (
                <>
                    <h2 className="font-semibold text-lg border-b mb-2">Skills</h2>
                    <table className="w-full mb-6 border text-left text-sm">
                        <tbody>
                            <tr>
                                {Array.isArray(data.skills)
                                    ? data.skills.map((skill: string, i: number) => (
                                        <td key={i} className="p-2 border">{skill}</td>
                                    ))
                                    : <td className="p-2 border">{data.skills}</td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {/* Education Table */}
            {Array.isArray(data.education) && data.education.length > 0 && (
                <>
                    <h2 className="font-semibold text-lg border-b mb-2">Education</h2>
                    <table className="w-full mb-6 border text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Degree</th>
                                <th className="p-2">Institution</th>
                                <th className="p-2">Year</th>
                                <th className="p-2">GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.education.map((edu: any, i: number) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{edu.degree}</td>
                                    <td className="p-2">{edu.institution}</td>
                                    <td className="p-2">{edu.year}</td>
                                    <td className="p-2">{edu.gpa || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Certifications Table */}
            {Array.isArray(data.certifications) && data.certifications.length > 0 && (
                <>
                    <h2 className="font-semibold text-lg border-b mb-2">Certifications</h2>
                    <table className="w-full mb-6 border text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Issuer</th>
                                <th className="p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.certifications.map((cert: any, i: number) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{cert.name}</td>
                                    <td className="p-2">{cert.issuer}</td>
                                    <td className="p-2">{cert.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ResumeTableLayout;

