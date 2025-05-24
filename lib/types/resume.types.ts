export interface ContactInformation {
    name: string;
    email: string;
    phone?: string;
    linkedin?: string;
}

export interface WorkExperience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

export interface Skills {
    technical: string[];
    soft: string[];
}

export interface Education {
    degree: string;
    institution: string;
    graduationDate: string;
    gpa?: string;
    relevantCoursework: string[];
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId?: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    achievements: string[];
}

export interface ResumeData {
    summary: string;
    workExperience: WorkExperience[];
    skills: Skills;
    education: Education[];
    certifications: Certification[];
    projects: Project[];
    contactInformation: ContactInformation;
    languages: string[];
    achievements: string[];
    generatedFor?: {
        jobTitle: string;
        company: string;
        generatedAt: Date;
        aiModel: string;
    };
}

export interface UserData {
    fullName: string;
    email: string;
    phone?: string;
    linkedin?: string;
    socialLinks?: {
        linkedin?: string;
    };
    preferredLocation?: string;
    preferredTone?: string;
    workExperience?: Array<{
        jobTitle?: string;
        position?: string;
        company?: string;
        companyName?: string;
        startDate: string | Date;
        endDate?: string | Date;
        current?: boolean;
        description?: string;
        responsibilities?: string[];
        achievements?: string[];
        technologies?: string[];
        techStack?: string[];
    }>;
    skills?: Array<{
        name?: string;
        category?: string;
        type?: string;
    }> | string[];
    softSkills?: Array<{
        name?: string;
    }> | string[];
    education?: Array<{
        degree?: string;
        institution?: string;
        school?: string;
        graduationDate?: string | Date;
        endDate?: string | Date;
        gpa?: string;
        relevantCoursework?: string[];
    }>;
    certifications?: Array<{
        name?: string;
        title?: string;
        issuer?: string;
        organization?: string;
        date?: string | Date;
        issueDate?: string | Date;
        expiryDate?: string | Date;
        credentialId?: string;
    }>;
    projects?: Array<{
        name?: string;
        title?: string;
        description?: string;
        technologies?: string[];
        techStack?: string[];
        link?: string;
        githubLink?: string;
        demoLink?: string;
        achievements?: string[];
    }>;
    languages?: string[];
    achievements?: string[];
    hobbies?: string[];
}

export interface JobData {
    jobDescription: string;
    jobTitle: string;
    jobLink?: string;
    resumeFile?: File;
}

export interface RequestBody {
    data: JobData;
    userData: UserData;
}

export interface GenerateResumeParams {
    jobDescription: string;
    personalName: string;
    email: string;
    phone?: string;
    linkedin?: string;
    jobTitle: string;
    companyName: string;
    jobLocation?: string;
    tone: string;
    workExperiences: WorkExperience[];
    technicalSkills: string[];
    softSkills: string[];
    education: Education[];
    certifications: Certification[];
    projects: Project[];
    languages: string[];
    achievements: string[];
    resumeFilePresent: boolean;
    targetIndustry: string;
    experienceLevel: string;
}

// Custom error classes
export class ResumeGenerationError extends Error {
    constructor(message: string, public statusCode: number = 500) {
        super(message);
        this.name = 'ResumeGenerationError';
    }
}

export class JSONParseError extends ResumeGenerationError {
    constructor(message: string = 'Failed to parse AI response') {
        super(message, 422);
        this.name = 'JSONParseError';
    }
}

export class AIServiceError extends ResumeGenerationError {
    constructor(message: string = 'AI service temporarily unavailable') {
        super(message, 503);
        this.name = 'AIServiceError';
    }
}
