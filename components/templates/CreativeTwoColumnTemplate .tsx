"use client"

import { ResumeTemplateProps } from "./util";

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from "@/lib/style";


const twoColumnStyles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    sidebar: {
        width: '35%',
        backgroundColor: '#059669',
        padding: 25,
        color: 'white',
    },
    mainContent: {
        width: '65%',
        padding: 25,
    },
    sidebarName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    sidebarSection: {
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sidebarItem: {
        fontSize: 10,
        marginBottom: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 6,
        borderRadius: 3,
    },
    mainSection: {
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#059669',
        paddingBottom: 4,
    },
    projectContainer: {
        backgroundColor: '#f9fafb',
        padding: 12,
        marginBottom: 12,
        borderRadius: 4,
    },
    projectTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 6,
    },
});

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
        <Document>
            <Page size="A4" style={twoColumnStyles.page}>
                <View style={twoColumnStyles.sidebar}>
                    <Text style={twoColumnStyles.sidebarName}>{resumeData.contactInformation.name}</Text>

                    <View style={twoColumnStyles.sidebarSection}>
                        <Text style={twoColumnStyles.sidebarTitle}>Contact</Text>
                        {resumeData.contactInformation.email && (
                            <Text style={twoColumnStyles.sidebarItem}>{resumeData.contactInformation.email}</Text>
                        )}
                        {resumeData.contactInformation.phone && (
                            <Text style={twoColumnStyles.sidebarItem}>{resumeData.contactInformation.phone}</Text>
                        )}
                        {resumeData.contactInformation.linkedin && (
                            <Text style={twoColumnStyles.sidebarItem}>LinkedIn</Text>
                        )}
                    </View>

                    {resumeData.skills.technical.length > 0 && (
                        <View style={twoColumnStyles.sidebarSection}>
                            <Text style={twoColumnStyles.sidebarTitle}>Technical Skills</Text>
                            {resumeData.skills.technical.map((skill, index) => (
                                <Text key={index} style={twoColumnStyles.sidebarItem}>{skill}</Text>
                            ))}
                        </View>
                    )}

                    {resumeData.skills.soft.length > 0 && (
                        <View style={twoColumnStyles.sidebarSection}>
                            <Text style={twoColumnStyles.sidebarTitle}>Soft Skills</Text>
                            {resumeData.skills.soft.map((skill, index) => (
                                <Text key={index} style={twoColumnStyles.sidebarItem}>{skill}</Text>
                            ))}
                        </View>
                    )}

                    {resumeData.languages.length > 0 && (
                        <View style={twoColumnStyles.sidebarSection}>
                            <Text style={twoColumnStyles.sidebarTitle}>Languages</Text>
                            {resumeData.languages.map((language, index) => (
                                <Text key={index} style={twoColumnStyles.sidebarItem}>
                                    {typeof language === 'string' ? language : `${language.name} - ${language.proficiency}`}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>

                <View style={twoColumnStyles.mainContent}>
                    {resumeData.summary && (
                        <View style={twoColumnStyles.mainSection}>
                            <Text style={twoColumnStyles.mainTitle}>Professional Summary</Text>
                            <Text style={styles.description}>{resumeData.summary}</Text>
                        </View>
                    )}

                    {resumeData.workExperience.length > 0 && (
                        <View style={twoColumnStyles.mainSection}>
                            <Text style={twoColumnStyles.mainTitle}>Work Experience</Text>
                            {resumeData.workExperience.map((job, index) => (
                                <View key={index} style={styles.jobContainer}>
                                    <View style={styles.jobHeader}>
                                        <View>
                                            <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                                            <Text style={styles.company}>{job.company}</Text>
                                        </View>
                                        <Text style={styles.dateRange}>
                                            {formatDateRange(job.startDate || '', job.endDate || '')}
                                        </Text>
                                    </View>
                                    {job.description && (
                                        <Text style={styles.description}>{job.description}</Text>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <View style={styles.achievements}>
                                            {job.achievements.map((achievement, idx) => (
                                                <Text key={idx} style={styles.achievement}>▸ {achievement}</Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {resumeData.projects.length > 0 && (
                        <View style={twoColumnStyles.mainSection}>
                            <Text style={twoColumnStyles.mainTitle}>Projects</Text>
                            {resumeData.projects.map((project, index) => (
                                <View key={index} style={twoColumnStyles.projectContainer}>
                                    <Text style={twoColumnStyles.projectTitle}>{project.name}</Text>
                                    {project.description && (
                                        <Text style={styles.description}>{project.description}</Text>
                                    )}
                                    {project.achievements && project.achievements.length > 0 && (
                                        <View style={styles.achievements}>
                                            {project.achievements.map((achievement, idx) => (
                                                <Text key={idx} style={styles.achievement}>• {achievement}</Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {resumeData.education.length > 0 && (
                        <View style={twoColumnStyles.mainSection}>
                            <Text style={twoColumnStyles.mainTitle}>Education</Text>
                            {resumeData.education.map((edu, index) => (
                                <View key={index} style={styles.jobContainer}>
                                    <View style={styles.jobHeader}>
                                        <View>
                                            <Text style={styles.jobTitle}>{edu.degree}</Text>
                                            <Text style={styles.company}>{edu.institution}</Text>
                                        </View>
                                        <View>
                                            {edu.graduationDate && (
                                                <Text style={styles.dateRange}>{formatDate(edu.graduationDate)}</Text>
                                            )}
                                            {edu.gpa && (
                                                <Text style={styles.dateRange}>GPA: {edu.gpa}</Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};







