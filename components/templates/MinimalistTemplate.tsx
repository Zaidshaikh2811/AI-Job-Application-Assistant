
import { ResumeTemplateProps } from "./util";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';



const minimalistStyles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 0,
    },
    header: {
        borderBottomWidth: 4,
        borderBottomColor: '#111827',
        padding: 32,
    },
    name: {
        fontSize: 28,
        fontWeight: 'light',
        color: '#111827',
        marginBottom: 8,
    },
    summary: {
        color: '#6b7280',
        fontSize: 12,
        marginBottom: 20,
        lineHeight: 1.4,
        fontWeight: 'light',
    },
    contactContainer: {
        flexDirection: 'row',
        gap: 20,
        fontSize: 10,
        color: '#6b7280',
    },
    content: {
        padding: 32,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'light',
        color: '#111827',
        textTransform: 'uppercase',
        letterSpacing: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 4,
        marginBottom: 15,
    },
    jobContainer: {
        marginBottom: 24,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'medium',
        color: '#111827',
    },
    company: {
        fontSize: 11,
        color: '#6b7280',
    },
    dateRange: {
        fontSize: 10,
        color: '#9ca3af',
    },
    description: {
        fontSize: 10,
        color: '#374151',
        marginBottom: 8,
        fontWeight: 'light',
        lineHeight: 1.3,
    },
    achievement: {
        fontSize: 10,
        color: '#374151',
        fontWeight: 'light',
        marginBottom: 3,
        lineHeight: 1.3,
    },
    techContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 8,
    },
    techTag: {
        fontSize: 8,
        color: '#6b7280',
        borderWidth: 1,
        borderColor: '#d1d5db',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 2,
    },
    skillsGrid: {
        flexDirection: 'row',
        gap: 32,
    },
    skillColumn: {
        flex: 1,
    },
    skillTitle: {
        fontSize: 12,
        fontWeight: 'medium',
        marginBottom: 8,
        color: '#111827',
    },
    skillList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillItem: {
        fontSize: 10,
        color: '#374151',
        fontWeight: 'light',
        marginRight: 15,
        marginBottom: 4,
    },
    educationItem: {
        marginBottom: 16,
    },
    educationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    degree: {
        fontSize: 12,
        fontWeight: 'medium',
        color: '#111827',
    },
    institution: {
        fontSize: 11,
        color: '#6b7280',
    },
    educationDetails: {
        alignItems: 'flex-end',
    },
    graduationDate: {
        fontSize: 10,
        color: '#9ca3af',
    },
    gpa: {
        fontSize: 10,
        color: '#9ca3af',
    },
});

export const MinimalistTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {


    return (
        <Document>
            <Page size="A4" style={minimalistStyles.page}>
                {/* Header */}
                <View style={minimalistStyles.header}>
                    <Text style={minimalistStyles.name}>
                        {resumeData.contactInformation.name}
                    </Text>
                    {resumeData.summary && (
                        <Text style={minimalistStyles.summary}>{resumeData.summary}</Text>
                    )}
                    <View style={minimalistStyles.contactContainer}>
                        {resumeData.contactInformation.email && (
                            <Text>{resumeData.contactInformation.email}</Text>
                        )}
                        {resumeData.contactInformation.phone && (
                            <Text>{resumeData.contactInformation.phone}</Text>
                        )}
                        {resumeData.contactInformation.linkedin && (
                            <Text>LinkedIn Profile</Text>
                        )}
                    </View>
                </View>

                {/* Content */}
                <View style={minimalistStyles.content}>
                    {/* Experience */}
                    {resumeData.workExperience.length > 0 && (
                        <View style={minimalistStyles.section}>
                            <Text style={minimalistStyles.sectionTitle}>EXPERIENCE</Text>
                            {resumeData.workExperience.map((job, index) => (
                                <View key={index} style={minimalistStyles.jobContainer}>
                                    <View style={minimalistStyles.jobHeader}>
                                        <View>
                                            <Text style={minimalistStyles.jobTitle}>{job.jobTitle}</Text>
                                            <Text style={minimalistStyles.company}>{job.company}</Text>
                                        </View>
                                        <Text style={minimalistStyles.dateRange}>
                                            {job.startDate +''+job.endDate }
                                        </Text>
                                    </View>
                                    {job.description && (
                                        <Text style={minimalistStyles.description}>{job.description}</Text>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <View>
                                            {job.achievements.map((achievement, idx) => (
                                                <Text key={idx} style={minimalistStyles.achievement}>
                                                    • {achievement}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                    {job.technologies && job.technologies.length > 0 && (
                                        <View style={minimalistStyles.techContainer}>
                                            {job.technologies.map((tech, idx) => (
                                                <Text key={idx} style={minimalistStyles.techTag}>
                                                    {tech}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Skills */}
                    {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                        <View style={minimalistStyles.section}>
                            <Text style={minimalistStyles.sectionTitle}>SKILLS</Text>
                            <View style={minimalistStyles.skillsGrid}>
                                {resumeData.skills.technical.length > 0 && (
                                    <View style={minimalistStyles.skillColumn}>
                                        <Text style={minimalistStyles.skillTitle}>Technical</Text>
                                        <View style={minimalistStyles.skillList}>
                                            {resumeData.skills.technical.map((skill, index) => (
                                                <Text key={index} style={minimalistStyles.skillItem}>
                                                    {skill}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                                {resumeData.skills.soft.length > 0 && (
                                    <View style={minimalistStyles.skillColumn}>
                                        <Text style={minimalistStyles.skillTitle}>Soft Skills</Text>
                                        <View style={minimalistStyles.skillList}>
                                            {resumeData.skills.soft.map((skill, index) => (
                                                <Text key={index} style={minimalistStyles.skillItem}>
                                                    {skill}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                        <View style={minimalistStyles.section}>
                            <Text style={minimalistStyles.sectionTitle}>EDUCATION</Text>
                            {resumeData.education.map((edu, index) => (
                                <View key={index} style={minimalistStyles.educationItem}>
                                    <View style={minimalistStyles.educationHeader}>
                                        <View>
                                            <Text style={minimalistStyles.degree}>{edu.degree}</Text>
                                            <Text style={minimalistStyles.institution}>{edu.institution}</Text>
                                        </View>
                                        <View style={minimalistStyles.educationDetails}>
                                            {edu.graduationDate && (
                                                <Text style={minimalistStyles.graduationDate}>
                                                    { edu.graduationDate}
                                                </Text>
                                            )}
                                            {edu.gpa && (
                                                <Text style={minimalistStyles.gpa}>GPA: {edu.gpa}</Text>
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
