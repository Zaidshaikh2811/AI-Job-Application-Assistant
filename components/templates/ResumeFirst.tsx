"use client";

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


// Type definitions
interface ContactInformation {
    name: string;
    email?: string;
    phone?: string;
    linkedin?: string;
}

interface WorkExperience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string | null;
    description?: string;
    achievements?: string[];
    technologies?: string[];
}

interface Skills {
    technical: string[];
    soft: string[];
}

interface Project {
    name: string;
    description?: string;
    achievements?: string[];
    technologies?: string[];
    link?: string;
}

interface Education {
    degree: string;
    institution: string;
    graduationDate?: string;
    gpa?: string;
    relevantCoursework?: string[];
}

interface Certification {
    name: string;
    issuer: string;
    date?: string;
    expiryDate?: string;
    credentialId?: string;
}

interface Language {
    name: string;
    proficiency?: string;
}

interface ResumeData {
    contactInformation: ContactInformation;
    summary?: string;
    workExperience: WorkExperience[];
    skills: Skills;
    projects: Project[];
    education: Education[];
    certifications?: Certification[];
    languages: Language[];
    achievements: string[];
}



// PDF Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 1.5,
    },
    viewer: {
        width: '100%',
        height: '100vh'
    },
    header: {
        backgroundColor: '#1e3a8a', // Darker blue for better print contrast
        color: 'white',
        padding: 20,
        marginBottom: 20,
        borderRadius: 4,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    nameSection: {
        flex: 2,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    summary: {
        fontSize: 12,
        lineHeight: 1.5,
        color: '#f0f9ff', // Lighter blue for better readability
    },
    contactSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    contactItem: {
        fontSize: 10,
        marginBottom: 6,
        color: '#f0f9ff',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e3a8a', // Matching header color
        marginBottom: 12,
        paddingBottom: 4,
        borderBottomWidth: 1.5,
        borderBottomColor: '#1e3a8a',
        letterSpacing: 0.5,
    },
    section: {
        marginBottom: 20,
        paddingHorizontal: 2,
    },
    workItem: {
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e7eb',
        borderBottomStyle: 'dashed',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    jobTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    company: {
        fontSize: 12,
        color: '#1e3a8a',
        marginBottom: 4,
        fontWeight: 'medium',
    },
    dateRange: {
        fontSize: 10,
        color: '#4b5563',
        fontStyle: 'italic',
    },
    description: {
        fontSize: 11,
        color: '#374151',
        marginBottom: 6,
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    achievementsList: {
        marginBottom: 8,
        paddingLeft: 4,
    },
    achievement: {
        fontSize: 10,
        color: '#374151',
        marginBottom: 3,
        paddingLeft: 10,
        lineHeight: 1.4,
    },
    techStack: {
        flexDirection: 'column',
        marginBottom: 8,
    },
    techRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 4,
    },
    techItem: {
        fontSize: 9,
        backgroundColor: '#f3f4f6',
        color: '#374151',
        padding: 3,
        borderRadius: 3,
        marginRight: 4,
        marginBottom: 2,
        borderWidth: 0.5,
        borderColor: '#e5e7eb',
    },
    skillsContainer: {
        flexDirection: 'column',
    },
    skillCategory: {
        marginBottom: 12,
    },
    skillCategoryTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 6,
    },
    skillItem: {
        fontSize: 10,
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        padding: 3,
        borderRadius: 4,
        marginBottom: 3,
        marginRight: 4,
    },
    softSkillItem: {
        fontSize: 10,
        backgroundColor: '#dcfce7',
        color: '#166534',
        padding: 3,
        borderRadius: 4,
        marginBottom: 3,
        marginRight: 4,
    },
    educationItem: {
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e7eb',
        borderBottomStyle: 'dashed',
    },
    degree: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    institution: {
        fontSize: 12,
        color: '#1e3a8a',
        marginBottom: 4,
    },
    gpa: {
        fontSize: 10,
        color: '#4b5563',
        fontStyle: 'italic',
    },
    certificationGrid: {
        flexDirection: 'column',
    },
    certificationItem: {
        width: '100%',
        borderColor: '#e5e7eb',
        borderWidth: 0.5,
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#f9fafb',
    },
    certName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    certIssuer: {
        fontSize: 10,
        color: '#1e3a8a',
        marginBottom: 4,
    },
    certDetails: {
        fontSize: 9,
        color: '#4b5563',
        lineHeight: 1.4,
    },
    bottomSection: {
        flexDirection: 'column',
        marginTop: 10,
    },
    bottomSectionItem: {
        marginBottom: 20,
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        paddingBottom: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f3f4f6',
    },
    languageName: {
        fontSize: 11,
        color: '#1f2937',
        fontWeight: 'medium',
    },
    languageProficiency: {
        fontSize: 10,
        color: '#4b5563',
        fontStyle: 'italic',
    },
    achievementItem: {
        fontSize: 11,
        color: '#374151',
        marginBottom: 4,
        paddingLeft: 8,
        lineHeight: 1.4,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#9ca3af',
        borderTopWidth: 0.5,
        borderTopColor: '#e5e7eb',
        paddingTop: 10,
    },
});

// PDF Resume Document Component
const ResumeFirst: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => (

    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.nameSection}>
                        <Text style={styles.name}>{resumeData.contactInformation.name}</Text>
                        {resumeData.summary && (
                            <Text style={styles.summary}>{resumeData.summary}</Text>
                        )}
                    </View>
                    <View style={styles.contactSection}>
                        {resumeData.contactInformation.email && (
                            <Text style={styles.contactItem}>✉️ {resumeData.contactInformation.email}</Text>
                        )}
                        {resumeData.contactInformation.phone && (
                            <Text style={styles.contactItem}>📱 {resumeData.contactInformation.phone}</Text>
                        )}
                        {resumeData.contactInformation.linkedin && (
                            <Text style={styles.contactItem}>💼 {resumeData.contactInformation.linkedin}</Text>
                        )}
                    </View>
                </View>
            </View>

            {/* Work Experience */}
            {resumeData.workExperience && resumeData.workExperience.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Work Experience</Text>
                    {resumeData.workExperience.map((job, index) => (
                        <View key={index} style={[styles.workItem, index === resumeData.workExperience.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                            <View style={styles.jobHeader}>
                                <View>
                                    <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                                    <Text style={styles.company}>{job.company}</Text>
                                </View>
                                <Text style={styles.dateRange}>
                                    {job.startDate +" "+ job.endDate}
                                </Text>
                            </View>
                            {job.description && (
                                <Text style={styles.description}>{job.description}</Text>
                            )}
                            {job.achievements && job.achievements.length > 0 && (
                                <View style={styles.achievementsList}>
                                    {job.achievements.map((achievement, idx) => (
                                        <Text key={idx} style={styles.achievement}>• {achievement}</Text>
                                    ))}
                                </View>
                            )}
                            {job.technologies && job.technologies.length > 0 && (
                                <View style={styles.techStack}>
                                    <Text style={[styles.description, { fontWeight: 'medium', marginBottom: 2 }]}>Technologies:</Text>
                                    <View style={styles.techRow}>
                                        {job.technologies.map((tech, idx) => (
                                            <Text key={idx} style={styles.techItem}>{tech}</Text>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {/* Skills */}
            {resumeData.skills && (resumeData.skills.technical?.length > 0 || resumeData.skills.soft?.length > 0) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {resumeData.skills.technical && resumeData.skills.technical.length > 0 && (
                            <View style={styles.skillCategory}>
                                <Text style={styles.skillCategoryTitle}>Technical Skills</Text>
                                <Text style={styles.description}>
                                    {resumeData.skills.technical.join(' • ')}
                                </Text>
                            </View>
                        )}
                        {resumeData.skills.soft && resumeData.skills.soft.length > 0 && (
                            <View style={styles.skillCategory}>
                                <Text style={styles.skillCategoryTitle}>Soft Skills</Text>
                                <Text style={styles.description}>
                                    {resumeData.skills.soft.join(' • ')}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            )}

            {/* Projects */}
            {resumeData.projects && resumeData.projects.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {resumeData.projects.map((project, index) => (
                        <View key={index} style={[styles.workItem, index === resumeData.projects.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                            <View style={styles.jobHeader}>
                                <Text style={styles.jobTitle}>{project.name}</Text>
                                {project.link && (
                                    <Text style={styles.dateRange}>🔗 View Project</Text>
                                )}
                            </View>
                            {project.description && (
                                <Text style={styles.description}>{project.description}</Text>
                            )}
                            {project.achievements && project.achievements.length > 0 && (
                                <View style={styles.achievementsList}>
                                    {project.achievements.map((achievement, idx) => (
                                        <Text key={idx} style={styles.achievement}>• {achievement}</Text>
                                    ))}
                                </View>
                            )}
                            {project.technologies && project.technologies.length > 0 && (
                                <View style={styles.techStack}>
                                    <Text style={[styles.description, { fontWeight: 'medium', marginBottom: 2 }]}>Technologies:</Text>
                                    <View style={styles.techRow}>
                                        {project.technologies.map((tech, idx) => (
                                            <Text key={idx} style={styles.techItem}>{tech}</Text>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {resumeData.education.map((edu, index) => (
                        <View key={index} style={[styles.educationItem, index === resumeData.education.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                            <View style={styles.jobHeader}>
                                <View>
                                    <Text style={styles.degree}>{edu.degree}</Text>
                                    <Text style={styles.institution}>{edu.institution}</Text>
                                </View>
                                <View>
                                    {edu.graduationDate && (
                                        <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                                    )}
                                    {edu.gpa && (
                                        <Text style={styles.gpa}>GPA: {edu.gpa}</Text>
                                    )}
                                </View>
                            </View>
                            {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                                <View>
                                    <Text style={[styles.description, { fontWeight: 'bold', marginBottom: 4 }]}>Relevant Coursework:</Text>
                                    <Text style={styles.description}>
                                        {edu.relevantCoursework.join(' • ')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {/* Certifications */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Certifications</Text>
                    <View style={styles.certificationGrid}>
                        {resumeData.certifications.map((cert, index) => (
                            <View key={index} style={styles.certificationItem}>
                                <Text style={styles.certName}>{cert.name}</Text>
                                <Text style={styles.certIssuer}>{cert.issuer}</Text>
                                <View>
                                    {cert.date && (
                                        <Text style={styles.certDetails}>Issued: {cert.date}</Text>
                                    )}
                                    {cert.expiryDate && (
                                        <Text style={styles.certDetails}>Expires: {cert.expiryDate}</Text>
                                    )}
                                    {cert.credentialId && (
                                        <Text style={styles.certDetails}>ID: {cert.credentialId}</Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Languages and Achievements */}
            {((resumeData.languages && resumeData.languages.length > 0) || (resumeData.achievements && resumeData.achievements.length > 0)) && (
                <View style={styles.bottomSection}>
                    {resumeData.languages && resumeData.languages.length > 0 && (
                        <View style={styles.bottomSectionItem}>
                            <Text style={styles.sectionTitle}>Languages</Text>
                            {resumeData.languages.map((language, index) => (
                                <View key={index} style={styles.languageItem}>
                                    <Text style={styles.languageName}>{language.name}</Text>
                                    {language.proficiency && (
                                        <Text style={styles.languageProficiency}>{language.proficiency}</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {resumeData.achievements && resumeData.achievements.length > 0 && (
                        <View style={styles.bottomSectionItem}>
                            <Text style={styles.sectionTitle}>Achievements</Text>
                            {resumeData.achievements.map((achievement, index) => (
                                <Text key={index} style={styles.achievementItem}>• {achievement}</Text>
                            ))}
                        </View>
                    )}
                </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Generated with Career Path Recommender | {new Date().toLocaleDateString()}</Text>
            </View>
        </Page>
    </Document>

);

export default ResumeFirst;