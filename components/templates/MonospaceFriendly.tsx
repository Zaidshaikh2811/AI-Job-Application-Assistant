/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const MonospaceFriendly = ({ data }: { data: any }) => {
    console.log(data);

    const renderListOrString = (value: any) => {
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return value;
    };

    return (
        <div className="font-mono text-sm p-6 bg-white text-black">
            {/* Contact Info */}
            {data.contactInformation?.personalName && (
                <h1 className="text-center text-xl font-bold mb-2">
                    {data.contactInformation.personalName}
                </h1>
            )}
            {(data.contactInformation?.email || data.contactInformation?.phone) && (
                <p className="text-center mb-6">
                    {data.contactInformation.email}
                    {data.contactInformation.email && data.contactInformation.phone && ' | '}
                    {data.contactInformation.phone}
                </p>
            )}

            {/* Summary */}
            {data.summary && (
                <>
                    <h2 className="border-b font-semibold mb-1">Summary</h2>
                    <p className="mb-4 whitespace-pre-line">{data.summary}</p>
                </>
            )}

            {/* Experience */}
            {Array.isArray(data.workExperience) && data.workExperience.length > 0 && (
                <>
                    <h2 className="border-b font-semibold mb-1">Experience</h2>
                    {data.workExperience.map((we: any, i: number) => (
                        <div key={i} className="mb-3">
                            <p>{we.title} - {we.company}</p>
                            <p>{we.startDate} - {we.endDate || 'Present'} | {we.location}</p>
                            {we.description && (
                                <p className="whitespace-pre-line mt-1">{we.description}</p>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* Education */}
            {Array.isArray(data.education) && data.education.length > 0 && (
                <>
                    <h2 className="border-b font-semibold mb-1">Education</h2>
                    {data.education.map((edu: any, i: number) => (
                        <div key={i} className="mb-2">
                            <p>{edu.degree} - {edu.institution}</p>
                            <p>
                                {edu.year}
                                {edu.gpa && ` | GPA: ${edu.gpa}`}
                            </p>
                        </div>
                    ))}
                </>
            )}

            {/* Certifications */}
            {Array.isArray(data.certifications) && data.certifications.length > 0 && (
                <>
                    <h2 className="border-b font-semibold mb-1">Certifications</h2>
                    {data.certifications.map((cert: any, i: number) => (
                        <div key={i} className="mb-2">
                            <p>{cert.name} - {cert.issuer}</p>
                            <p>{cert.date}</p>
                        </div>
                    ))}
                </>
            )}

            {/* Skills */}
            {(Array.isArray(data.skills) && data.skills.length > 0) || typeof data.skills === 'string' ? (
                <>
                    <h2 className="border-b font-semibold mb-1">Skills</h2>
                    <p className="mb-2">{renderListOrString(data.skills)}</p>
                </>
            ) : null}
        </div>
    );
};

export default MonospaceFriendly;
