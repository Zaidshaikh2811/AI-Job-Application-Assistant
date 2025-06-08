import { ResumeTemplateProps } from "./util";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const modernDarkStyles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#1f2937',
        color: '#ffffff',
    },
    header: {
        background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 50%, #ef4444 100%)',
        backgroundColor: '#9333ea',
        padding: 32,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },
    summary: {
        fontSize: 14,
        color: '#f3f4f6',
        marginBottom: 24,
        lineHeight: 1.5,
    },
    contactContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    contactItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        fontSize: 10,
    },
    content: {
        padding: 32,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a855f7',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#a855f7',
        paddingBottom: 8,
    },
    jobContainer: {
        backgroundColor: '#374151',
        borderRadius: 8,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#4b5563',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    company: {
        fontSize: 14,
        color: '#a855f7',
        fontWeight: 'semibold',
    },
    dateRange: {
        fontSize: 10,
        color: '#9ca3af',
        backgroundColor: '#4b5563',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    description: {
        fontSize: 12,
        color: '#d1d5db',
        marginBottom: 12,
        lineHeight: 1.4,
    },
    achievement: {
        fontSize: 11,
        color: '#d1d5db',
        marginBottom: 6,
        lineHeight: 1.3,
    },
    techContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 8,
    },
    techTag: {
        backgroundColor: '#9333ea',
        color: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 9,
    },
    skillsGrid: {
        flexDirection: 'row',
        gap: 32,
    },
    skillColumn: {
        flex: 1,
        backgroundColor: '#374151',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#4b5563',
    },
    skillTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    skillTechnical: {
        color: '#60a5fa',
    },
    skillSoft: {
        color: '#34d399',
    },
    skillTagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTagTechnical: {
        backgroundColor: '#2563eb',
        color: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
        fontSize: 10,
    },
    skillTagSoft: {
        backgroundColor: '#059669',
        color: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
        fontSize: 10,
    },
    educationItem: {
        backgroundColor: '#374151',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#4b5563',
        marginBottom: 12,
    },
    educationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    degree: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    institution: {
        fontSize: 12,
        color: '#a855f7',
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

export const ModernDarkTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {

    return (
        <Document>
            <Page size="A4" style={modernDarkStyles.page}>
                {/* Header */}
                <View style={modernDarkStyles.header}>
                    <Text style={modernDarkStyles.name}>
                        {resumeData.contactInformation.name}
                    </Text>
                    {resumeData.summary && (
                        <Text style={modernDarkStyles.summary}>{resumeData.summary}</Text>
                    )}
                    <View style={modernDarkStyles.contactContainer}>
                        {resumeData.contactInformation.email && (
                            <Text style={modernDarkStyles.contactItem}>
                                  {resumeData.contactInformation.email}
                            </Text>
                        )}
                        {resumeData.contactInformation.phone && (
                            <Text style={modernDarkStyles.contactItem}>
                                  {resumeData.contactInformation.phone}
                            </Text>
                        )}
                        {resumeData.contactInformation.linkedin && (
                            <Text style={modernDarkStyles.contactItem}>
                                  LinkedIn
                            </Text>
                        )}
                    </View>
                </View>

                {/* Content */}
                <View style={modernDarkStyles.content}>
                    {/* Experience */}
                    {resumeData.workExperience.length > 0 && (
                        <View style={modernDarkStyles.section}>
                            <Text style={modernDarkStyles.sectionTitle}>  EXPERIENCE</Text>
                            {resumeData.workExperience.map((job, index) => (
                                <View key={index} style={modernDarkStyles.jobContainer}>
                                    <View style={modernDarkStyles.jobHeader}>
                                        <View>
                                            <Text style={modernDarkStyles.jobTitle}>{job.jobTitle}</Text>
                                            <Text style={modernDarkStyles.company}>{job.company}</Text>
                                        </View>
                                        <Text style={modernDarkStyles.dateRange}>
                                            {job.startDate +'  '+job.endDate }
                                        </Text>
                                    </View>
                                    {job.description && (
                                        <Text style={modernDarkStyles.description}>{job.description}</Text>
                                    )}
                                    {job.achievements && job.achievements.length > 0 && (
                                        <View>
                                            {job.achievements.map((achievement, idx) => (
                                                <Text key={idx} style={modernDarkStyles.achievement}>
                                                      {achievement}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                    {job.technologies && job.technologies.length > 0 && (
                                        <View style={modernDarkStyles.techContainer}>
                                            {job.technologies.map((tech, idx) => (
                                                <Text key={idx} style={modernDarkStyles.techTag}>
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
                        <View style={modernDarkStyles.section}>
                            <Text style={modernDarkStyles.sectionTitle}>  SKILLS</Text>
                            <View style={modernDarkStyles.skillsGrid}>
                                {resumeData.skills.technical.length > 0 && (
                                    <View style={modernDarkStyles.skillColumn}>
                                        <Text style={[modernDarkStyles.skillTitle, modernDarkStyles.skillTechnical]}>
                                            Technical
                                        </Text>
                                        <View style={modernDarkStyles.skillTagContainer}>
                                            {resumeData.skills.technical.map((skill, index) => (
                                                <Text key={index} style={modernDarkStyles.skillTagTechnical}>
                                                    {skill}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                                {resumeData.skills.soft.length > 0 && (
                                    <View style={modernDarkStyles.skillColumn}>
                                        <Text style={[modernDarkStyles.skillTitle, modernDarkStyles.skillSoft]}>
                                            Soft Skills
                                        </Text>
                                        <View style={modernDarkStyles.skillTagContainer}>
                                            {resumeData.skills.soft.map((skill, index) => (
                                                <Text key={index} style={modernDarkStyles.skillTagSoft}>
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
                        <View style={modernDarkStyles.section}>
                            <Text style={modernDarkStyles.sectionTitle}>   EDUCATION</Text>
                            {resumeData.education.map((edu, index) => (
                                <View key={index} style={modernDarkStyles.educationItem}>
                                    <View style={modernDarkStyles.educationHeader}>
                                        <View>
                                            <Text style={modernDarkStyles.degree}>{edu.degree}</Text>
                                            <Text style={modernDarkStyles.institution}>{edu.institution}</Text>
                                        </View>
                                        <View style={modernDarkStyles.educationDetails}>
                                            {edu.graduationDate && (
                                                <Text style={modernDarkStyles.graduationDate}>
                                                    { edu.graduationDate}
                                                </Text>
                                            )}
                                            {edu.gpa && (
                                                <Text style={modernDarkStyles.gpa}>GPA: {edu.gpa}</Text>
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