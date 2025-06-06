

import { ResumeTemplateProps } from "./util";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { styles } from "@/lib/style";



const executiveStyles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 0,
    },
    header: {
        borderTopWidth: 8,
        borderTopColor: '#f59e0b',
        padding: 30,
        textAlign: 'center',
    },
    executiveName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 15,
    },
    executiveContact: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    executiveSummary: {
        fontSize: 12,
        color: '#374151',
        lineHeight: 1.4,
        textAlign: 'left',
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderLeftWidth: 4,
        borderLeftColor: '#f59e0b',
        paddingLeft: 15,
        fontStyle: 'italic',
    },
    executiveSection: {
        marginBottom: 25,
    },
    executiveSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        borderBottomWidth: 2,
        borderBottomColor: '#f59e0b',
        paddingBottom: 6,
        marginBottom: 15,
        textAlign: 'center',
    },
    executiveJobContainer: {
        backgroundColor: '#f9fafb',
        padding: 20,
        marginBottom: 15,
        borderRadius: 8,
    },
    achievementHeader: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    achievementsList: {
        marginBottom: 12,
    },
    executiveAchievement: {
        fontSize: 10,
        color: '#374151',
        marginBottom: 4,
        marginLeft: 15,
    },
    executiveGrid: {
        flexDirection: 'row',
        gap: 25,
    },
    executiveColumn: {
        flex: 1,
    },
    executiveColumnTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
        borderBottomWidth: 2,
        borderBottomColor: '#f59e0b',
        paddingBottom: 4,
        marginBottom: 12,
    },
    executiveSkillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    executiveTechnicalSkill: {
        backgroundColor: '#fef3c7',
        color: '#1f2937',
        fontSize: 9,
        padding: 6,
        borderRadius: 3,
    },
    executiveSoftSkill: {
        backgroundColor: '#f3f4f6',
        color: '#1f2937',
        fontSize: 9,
        padding: 6,
        borderRadius: 3,
    },
    executiveEducation: {
        backgroundColor: '#f9fafb',
        padding: 12,
        marginBottom: 8,
        borderRadius: 6,
    },
});

export const ExecutiveTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {


    return (
        <Document>
            <Page size="A4" style={executiveStyles.page}>
                <View style={executiveStyles.header}>
                    <Text style={executiveStyles.executiveName}>
                        {resumeData.contactInformation.name}
                    </Text>
                    <View style={executiveStyles.executiveContact}>
                        {resumeData.contactInformation.email && (
                            <Text style={styles.contactItem}>{resumeData.contactInformation.email}</Text>
                        )}
                        {resumeData.contactInformation.phone && (
                            <Text style={styles.contactItem}>{resumeData.contactInformation.phone}</Text>
                        )}
                        {resumeData.contactInformation.linkedin && (
                            <Text style={styles.contactItem}>LinkedIn</Text>
                        )}
                    </View>
                    {resumeData.summary && (
                        <Text style={executiveStyles.executiveSummary}>{resumeData.summary}</Text>
                    )}
                </View>

                <View style={styles.content}>
                    {resumeData.workExperience.length > 0 && (
                        <View style={executiveStyles.executiveSection}>
                            <Text style={executiveStyles.executiveSectionTitle}>
                                PROFESSIONAL EXPERIENCE
                            </Text>
                            {resumeData.workExperience.map((job, index) => (
                                <View key={index} style={executiveStyles.executiveJobContainer}>
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
                                        <View style={executiveStyles.achievementsList}>
                                            <Text style={executiveStyles.achievementHeader}>Key Achievements:</Text>
                                            {job.achievements.map((achievement, idx) => (
                                                <Text key={idx} style={executiveStyles.executiveAchievement}>
                                                    ★ {achievement}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={executiveStyles.executiveGrid}>
                        {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                            <View style={executiveStyles.executiveColumn}>
                                <Text style={executiveStyles.executiveColumnTitle}>CORE COMPETENCIES</Text>
                                {resumeData.skills.technical.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.skillTitle}>Technical Expertise</Text>
                                        <View style={executiveStyles.executiveSkillsGrid}>
                                            {resumeData.skills.technical.map((skill, index) => (
                                                <Text key={index} style={executiveStyles.executiveTechnicalSkill}>
                                                    {skill}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                                {resumeData.skills.soft.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.skillTitle}>Leadership Skills</Text>
                                        <View style={executiveStyles.executiveSkillsGrid}>
                                            {resumeData.skills.soft.map((skill, index) => (
                                                <Text key={index} style={executiveStyles.executiveSoftSkill}>
                                                    {skill}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </View>
                        )}

                        {resumeData.education.length > 0 && (
                            <View style={executiveStyles.executiveColumn}>
                                <Text style={executiveStyles.executiveColumnTitle}>EDUCATION</Text>
                                {resumeData.education.map((edu, index) => (
                                    <View key={index} style={executiveStyles.executiveEducation}>
                                        <Text style={styles.jobTitle}>{edu.degree}</Text>
                                        <Text style={styles.company}>{edu.institution}</Text>
                                        <View style={styles.jobHeader}>
                                            {edu.graduationDate && (
                                                <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                                            )}
                                            {edu.gpa && (
                                                <Text style={styles.dateRange}>GPA: {edu.gpa}</Text>
                                            )}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};