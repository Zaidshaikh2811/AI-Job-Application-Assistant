import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ResumeTemplateProps } from './util';
import { styles } from '@/lib/style';



export const ClassicBlueTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {



    console.log('ClassicBlueTemplate resumeData:', resumeData);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.name}>{resumeData.contactInformation.name}</Text>
                            {resumeData.summary && (
                                <Text style={styles.summary}>{resumeData.summary}</Text>
                            )}
                        </View>
                        <View style={styles.contactInfo}>
                            {resumeData.contactInformation.email && (
                                <Text style={styles.contactItem}>{resumeData.contactInformation.email}</Text>
                            )}
                            {resumeData.contactInformation.phone && (
                                <Text style={styles.contactItem}>{resumeData.contactInformation.phone}</Text>
                            )}
                            {resumeData.contactInformation.linkedin && (
                                <Text style={styles.contactItem}>LinkedIn Profile</Text>
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    {resumeData.workExperience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Work Experience</Text>
                            {resumeData.workExperience.map((job, index) => (
                                <View key={index} style={styles.jobContainer}>
                                    <View style={styles.jobHeader}>
                                        <View>
                                            <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                                            <Text style={styles.company}>{job.company}</Text>
                                        </View>
                                        <Text style={styles.dateRange}>
                                            {job.startDate+" "+ job.endDate}

                                        </Text>
                                    </View>
                                    {job.description && (
                                        <Text style={styles.description}>{job.description}</Text>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <View style={styles.achievements}>
                                            {job.achievements.map((achievement, idx) => (
                                                <Text key={idx} style={styles.achievement}>• {achievement}</Text>
                                            ))}
                                        </View>
                                    )}
                                    {job.technologies && job.technologies.length > 0 && (
                                        <View style={styles.technologies}>
                                            {job.technologies.map((tech, idx) => (
                                                <Text key={idx} style={styles.tech}>{tech}</Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Skills</Text>
                            <View style={styles.skillsGrid}>
                                {resumeData.skills.technical.length > 0 && (
                                    <View style={styles.skillColumn}>
                                        <Text style={styles.skillTitle}>Technical Skills</Text>
                                        <View style={styles.skillsContainer}>
                                            {resumeData.skills.technical.map((skill, index) => (
                                                <Text key={index} style={styles.technicalSkill}>{skill}</Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                                {resumeData.skills.soft.length > 0 && (
                                    <View style={styles.skillColumn}>
                                        <Text style={styles.skillTitle}>Soft Skills</Text>
                                        <View style={styles.skillsContainer}>
                                            {resumeData.skills.soft.map((skill, index) => (
                                                <Text key={index} style={styles.softSkill}>{skill}</Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}

                    {resumeData.education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Education</Text>
                            {resumeData.education.map((edu, index) => (
                                <View key={index} style={styles.jobContainer}>
                                    <View style={styles.jobHeader}>
                                        <View>
                                            <Text style={styles.jobTitle}>{edu.degree}</Text>
                                            <Text style={styles.company}>{edu.institution}</Text>
                                        </View>
                                        <View>
                                            {edu.graduationDate && (
                                                <Text style={styles.dateRange}>{edu.graduationDate}</Text>
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
