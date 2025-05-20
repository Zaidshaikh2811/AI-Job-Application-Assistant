// models/Resume.ts
import { Schema, model, models, Document } from 'mongoose';

interface ContactInformation {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
}

interface WorkExperience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface ResumeDocument extends Document {
    summary?: string;
    workExperience?: WorkExperience[];
    skills?: string[];
    education?: string;
    certifications?: string;
    projects?: string;
    contactInformation: ContactInformation;
}

const ResumeSchema = new Schema<ResumeDocument>({
    summary: { type: String, default: null },

    workExperience: {
        type: [
            {
                jobTitle: { type: String, required: true },
                company: { type: String, required: true },
                startDate: { type: String, required: true },
                endDate: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        default: [],
    },

    skills: {
        type: [String],
        default: [],
    },

    education: {
        type: String,
        default: null,
    },

    certifications: {
        type: String,
        default: null,
    },

    projects: {
        type: String,
        default: null,
    },

    contactInformation: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        linkedin: { type: String, default: null },
    },
});

const Resume = models.Resume || model<ResumeDocument>('Resume', ResumeSchema);

export default Resume;
