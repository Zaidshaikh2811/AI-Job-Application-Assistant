import mongoose from "mongoose";

// Experience Schema
const ExperienceSchema = new mongoose.Schema({

    jobTitle: String,
    companyName: String,
    location: String,
    startDate: Date,
    endDate: Date,
    currentlyWorking: Boolean,
    responsibilities: [String],
    technologies: [String],
}, { _id: true });

// Education Schema
const EducationSchema = new mongoose.Schema({

    degree: String,
    institution: String,
    location: String,
    startDate: Date,
    endDate: Date,
    gpa: String,
    honors: String,
}, { _id: true });

// Project Schema
const ProjectSchema = new mongoose.Schema({

    title: String,
    description: String,
    technologies: [String],
    githubLink: String,
    liveLink: String,
}, { _id: true });

// Certification Schema
const CertificationSchema = new mongoose.Schema({

    name: String,
    institution: String,
    dateCompleted: Date,
}, { _id: true });

// Language Schema
const LanguageSchema = new mongoose.Schema({


    name: String,
    proficiency: {
        type: String,
        enum: ['Basic', 'Intermediate', 'Fluent', 'Native'],
    },
}, { _id: true });

// Achievement Schema
const AchievementSchema = new mongoose.Schema({

    title: String,
    description: String,
    date: Date,
}, { _id: true });

// Resume Job Target Schema
const ResumeJobTargetSchema = new mongoose.Schema({

    jobTitle: String,
    jobDescription: String,
    resumeStyle: {
        type: String,
        enum: ['formal', 'modern', 'concise', 'keyword-rich'],
        default: 'formal',
    },
}, { _id: true });
const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, default: '' }, // e.g., "Beginner", "Intermediate", "Advanced", "Expert"
}, { _id: true });

// User Profile Schema
const UserProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },

    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedIn: String,
    portfolio: String,

    jobTarget: ResumeJobTargetSchema,
    professionalSummary: String,

    workExperience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
    softSkills: [String],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    languages: [LanguageSchema],
    achievements: [AchievementSchema],
    hobbies: [String],

    preferredFormat: {
        type: String,
        enum: ['pdf', 'docx'],
        default: 'pdf',
    },
    resumeGenerated: {
        type: Boolean,
        default: false,
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// ✅ Prevent model overwrite issue in dev (important for Next.js 13–15)
export default mongoose.models.UserProfile || mongoose.model("UserProfile", UserProfileSchema);
