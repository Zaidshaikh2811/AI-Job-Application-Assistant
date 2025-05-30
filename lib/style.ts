import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 0,
    },
    header: {
        backgroundColor: '#1e40af',
        padding: 30,
        color: 'white',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summary: {
        fontSize: 12,
        color: '#dbeafe',
        lineHeight: 1.4,
        maxWidth: 300,
    },
    contactInfo: {
        fontSize: 10,
        gap: 4,
    },
    contactItem: {
        marginBottom: 4,
    },
    content: {
        padding: 30,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
        borderBottomWidth: 2,
        borderBottomColor: '#1e40af',
        paddingBottom: 4,
        marginBottom: 12,
    },
    jobContainer: {
        marginBottom: 16,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    jobTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    company: {
        fontSize: 12,
        color: '#1e40af',
        fontWeight: 'bold',
    },
    dateRange: {
        fontSize: 10,
        color: '#6b7280',
    },
    description: {
        fontSize: 10,
        color: '#374151',
        marginBottom: 8,
        lineHeight: 1.3,
    },
    achievements: {
        marginBottom: 8,
    },
    achievement: {
        fontSize: 10,
        color: '#374151',
        marginBottom: 3,
        marginLeft: 10,
    },
    technologies: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    tech: {
        backgroundColor: '#f3f4f6',
        color: '#374151',
        fontSize: 9,
        padding: 4,
        borderRadius: 4,
    },
    skillsGrid: {
        flexDirection: 'row',
        gap: 20,
    },
    skillColumn: {
        flex: 1,
    },
    skillTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    technicalSkill: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        fontSize: 9,
        padding: 6,
        borderRadius: 4,
    },
    softSkill: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        fontSize: 9,
        padding: 6,
        borderRadius: 4,
    },
});