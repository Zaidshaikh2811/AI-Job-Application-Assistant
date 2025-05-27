// Type definitions for resume data structure
export interface ContactInformation {
    name: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    address?: string;
}

export interface WorkExperience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string;
    description?: string;
    achievements?: string[];
    technologies?: string[];
}

export interface Skills {
    technical: string[];
    soft: string[];
}

export interface Project {
    name: string;
    description?: string;
    link?: string;
    achievements?: string[];
    technologies?: string[];
}

export interface Education {
    degree: string;
    institution: string;
    graduationDate?: string;
    gpa?: string;
    relevantCoursework?: string[];
}

export interface Certification {
    name: string;
    issuer: string;
    date?: string;
    expiryDate?: string;
    credentialId?: string;
}

export interface Language {
    name: string;
    proficiency?: string;
}

export interface ResumeData {
    contactInformation: ContactInformation;
    summary?: string;
    workExperience: WorkExperience[];
    skills: Skills;
    projects: Project[];
    education: Education[];
    certifications?: Certification[];
    languages: (string | Language)[];
    achievements: string[];
}

export interface ResumeTemplateProps {
    resumeData: ResumeData;
}