import mongoose from 'mongoose';

const WorkExperienceSchema = new mongoose.Schema({
    jobTitle: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String,
    achievements: [String],
    technologies: [String]
});

const SkillSchema = new mongoose.Schema({
    technical: [String],
    soft: [String]
}, { _id: false });

const EducationSchema = new mongoose.Schema({
    degree: String,
    institution: String,
    graduationDate: String,
    gpa: String,
    relevantCoursework: [String]
});

const CertificationSchema = new mongoose.Schema({
    name: String,
    issuer: String,
    date: String,
    expiryDate: String,
    credentialId: String
});

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    technologies: [String],
    link: String,
    achievements: [String]
});

const ContactInformationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    linkedin: String
}, { _id: false });

const LanguageSchema = new mongoose.Schema({
    name: String,
    proficiency: String
});

const ResumeSchema = new mongoose.Schema({
    summary: String,
    workExperience: [WorkExperienceSchema],
    skills: SkillSchema,
    education: [EducationSchema],
    certifications: [CertificationSchema],
    projects: [ProjectSchema],
    contactInformation: ContactInformationSchema,
    languages: [LanguageSchema],
    achievements: [String] // Changed to array of strings based on your latest JSON
}, {
    timestamps: true
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
