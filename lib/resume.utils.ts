// Type definitions
interface JobData {
    jobDescription?: string;
    jobTitle?: string;
    jobLink?: string;
    resumeFile?: File | string;
}

interface WorkExperience {
    jobTitle?: string;
    position?: string;
    company?: string;
    companyName?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    current?: boolean;
    description?: string;
    responsibilities?: string[];
    achievements?: string[];
    technologies?: string[];
    techStack?: string[];
}

interface Skill {
    name?: string;
    category?: string;
    type?: string;
}

interface Education {
    degree?: string;
    institution?: string;
    school?: string;
    graduationDate?: string | Date;
    endDate?: string | Date;
    gpa?: string;
    relevantCoursework?: string[];
}

interface Certification {
    name?: string;
    title?: string;
    issuer?: string;
    organization?: string;
    date?: string | Date;
    issueDate?: string | Date;
    expiryDate?: string | Date;
    credentialId?: string;
}

interface Project {
    name?: string;
    title?: string;
    description?: string;
    technologies?: string[];
    techStack?: string[];
    link?: string;
    githubLink?: string;
    demoLink?: string;
    achievements?: string[];
}

interface SocialLinks {
    linkedin?: string;
}

interface UserData {
    fullName?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    socialLinks?: SocialLinks;
    preferredLocation?: string;
    preferredTone?: string;
    workExperience?: WorkExperience[];
    skills?: (string | Skill)[];
    softSkills?: (string | Skill)[];
    education?: Education[];
    certifications?: Certification[];
    projects?: Project[];
    languages?: string[];
    achievements?: string[];
}

interface WorkExperienceProcessed {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

interface EducationProcessed {
    degree: string;
    institution: string;
    graduationDate: string;
    gpa: string;
    relevantCoursework: string[];
}

interface CertificationProcessed {
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId: string;
}

interface ProjectProcessed {
    name: string;
    description: string;
    technologies: string[];
    link: string;
    achievements: string[];
}

interface GenerateResumeParams {
    jobDescription: string;
    jobTitle: string;
    personalName: string;
    email: string;
    phone: string;
    linkedin: string;
    companyName: string;
    jobLocation: string;
    tone: string;
    workExperiences: WorkExperienceProcessed[];
    technicalSkills: string[];
    softSkills: string[];
    education: EducationProcessed[];
    certifications: CertificationProcessed[];
    projects: ProjectProcessed[];
    languages: string[];
    achievements: string[];
    resumeFilePresent: boolean;
    targetIndustry: string;
    experienceLevel: string;
}

interface ContactInformation {
    email?: string;
    phone?: string;
}

interface Skills {
    technical?: string[];
}

interface ResumeData {
    summary?: string;
    workExperience?: WorkExperience[];
    skills?: Skills;
    education?: Education[];
    contactInformation?: ContactInformation;
    projects?: Project[];
    certifications?: Certification[];
}

type ExperienceLevel = 'entry' | 'mid' | 'senior';
type Industry = 'technology' | 'finance' | 'healthcare' | 'consulting' | 'education' | 'general';

// Type guards
const isValidDate = (date: unknown): date is Date => {
    return date instanceof Date && !isNaN(date.getTime());
};

const isStringSkill = (skill: string | Skill): skill is string => {
    return typeof skill === 'string';
};

const hasCategory = (skill: Skill): boolean => {
    return skill.category === 'technical' || skill.type === 'technical';
};

// Utility functions
export function extractCompanyFromJobLink(jobLink?: string): string {
    if (!jobLink) return '';

    const patterns: RegExp[] = [
        /https?:\/\/(?:www\.)?([^.]+)\.com/,
        /careers\.([^.]+)\.com/,
        /jobs\.([^.]+)\.com/
    ];

    for (const pattern of patterns) {
        const match = jobLink.match(pattern);
        if (match?.[1]) {
            return match[1].charAt(0).toUpperCase() + match[1].slice(1);
        }
    }

    return '';
}

export function formatDate(date?: string | Date): string {
    if (!date) return '';

    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            return typeof date === 'string' ? date : date.toString();
        }

        return d.toLocaleDateString('en-US', {
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        console.warn('Error formatting date:', error);
        return String(date);
    }
}

export function cleanAndValidateJSON(response: string): string {
    if (typeof response !== 'string') {
        throw new Error('Response must be a string');
    }

    return response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .replace(/^[^{]*/, '')
        .replace(/[^}]*$/, '')
        .trim();
}

export function inferIndustryFromJob(jobDescription: string, jobTitle: string): Industry {
    const text = `${jobDescription || ''} ${jobTitle || ''}`.toLowerCase();

    const industries: Record<Industry, string[]> = {
        'technology': ['software', 'tech', 'developer', 'programming', 'coding', 'engineer'],
        'finance': ['finance', 'banking', 'investment', 'trading', 'fintech'],
        'healthcare': ['healthcare', 'medical', 'hospital', 'clinical', 'pharma'],
        'consulting': ['consulting', 'advisory', 'strategy'],
        'education': ['education', 'teaching', 'academic', 'university', 'learning'],
        'general': []
    };

    for (const [industry, keywords] of Object.entries(industries) as [Industry, string[]][]) {
        if (industry === 'general') continue;
        if (keywords.some(keyword => text.includes(keyword))) {
            return industry;
        }
    }

    return 'general';
}

export function calculateExperienceLevel(workExperience: WorkExperience[] = []): ExperienceLevel {
    const totalMonths = workExperience.reduce((total: number, exp: WorkExperience): number => {
        if (!exp.startDate) return total;

        const start = new Date(exp.startDate);
        const end = exp.current ? new Date() : new Date(exp.endDate || new Date());

        if (!isValidDate(start) || !isValidDate(end)) return total;

        const months = (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        return total + Math.max(0, months);
    }, 0);

    const years = totalMonths / 12;

    if (years < 2) return 'entry';
    if (years < 5) return 'mid';
    return 'senior';
}

export function generateFallbackSummary(data: GenerateResumeParams): string {
    const experienceText = data.experienceLevel === 'entry' ? 'Motivated' : 'Experienced';
    const skills = data.technicalSkills.slice(0, 3).join(', ');

    if (!skills) {
        return `${experienceText} ${data.jobTitle || 'professional'} seeking opportunities in ${data.targetIndustry} industry.`;
    }

    return `${experienceText} ${data.jobTitle || 'professional'} with expertise in ${skills}. Seeking to leverage skills in ${data.targetIndustry} industry.`;
}

export function calculateATSScore(resumeData: ResumeData, jobDescription: string): number {
    let score = 0;

    // Input validation
    if (!resumeData || typeof jobDescription !== 'string') {
        return 0;
    }

    // Check for key sections (40 points)
    if (resumeData.summary?.trim()) score += 10;
    if (resumeData.workExperience && resumeData.workExperience.length > 0) score += 15;
    if (resumeData.skills?.technical && resumeData.skills.technical.length > 0) score += 10;
    if (resumeData.education && resumeData.education.length > 0) score += 5;

    // Check for keyword alignment (30 points)
    const jobKeywords = jobDescription.toLowerCase().match(/\b\w{3,}\b/g) || [];
    if (jobKeywords.length > 0) {
        try {
            const resumeText = JSON.stringify(resumeData).toLowerCase();
            const uniqueJobKeywords = [...new Set(jobKeywords)];
            const matchingKeywords = uniqueJobKeywords.filter(keyword =>
                keyword.length > 3 && resumeText.includes(keyword)
            );
            score += Math.min(30, (matchingKeywords.length / uniqueJobKeywords.length) * 30);
        } catch (error) {
            console.warn('Error processing keywords for ATS score:', error);
        }
    }

    // Check for formatting elements (30 points)
    if (resumeData.contactInformation?.email) score += 5;
    if (resumeData.contactInformation?.phone) score += 5;
    if (resumeData.projects && resumeData.projects.length > 0) score += 10;
    if (resumeData.certifications && resumeData.certifications.length > 0) score += 10;

    return Math.round(Math.min(100, Math.max(0, score)));
}

// Enhanced data processor with improved type safety
export function processUserData(jobData: JobData, userData: UserData): GenerateResumeParams {
    // Helper function to safely extract skill names
    const extractSkillNames = (skills: (string | Skill)[] = []): string[] => {
        return skills
            .map(skill => {
                if (isStringSkill(skill)) return skill;
                return skill.name || '';
            })
            .filter(name => name.trim() !== '');
    };

    // Helper function to filter technical skills
    const extractTechnicalSkills = (skills: (string | Skill)[] = []): string[] => {
        return skills
            .filter(skill => {
                if (isStringSkill(skill)) return true;
                return hasCategory(skill);
            })
            .map(skill => isStringSkill(skill) ? skill : skill.name || '')
            .filter(name => name.trim() !== '');
    };

    return {
        jobDescription: jobData.jobDescription || '',
        jobTitle: jobData.jobTitle || '',
        personalName: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        linkedin: userData.linkedin || userData.socialLinks?.linkedin || '',
        companyName: extractCompanyFromJobLink(jobData.jobLink) || 'Target Company',
        jobLocation: userData.preferredLocation || '',
        tone: userData.preferredTone || 'professional',

        workExperiences: (userData.workExperience || []).map((exp): WorkExperienceProcessed => ({
            jobTitle: exp.jobTitle || exp.position || '',
            company: exp.company || exp.companyName || '',
            startDate: formatDate(exp.startDate),
            endDate: exp.current ? 'Present' : formatDate(exp.endDate),
            description: exp.description || exp.responsibilities?.join('. ') || '',
            achievements: exp.achievements || [],
            technologies: exp.technologies || exp.techStack || []
        })),

        technicalSkills: extractTechnicalSkills(userData.skills),
        softSkills: extractSkillNames(userData.softSkills),

        education: (userData.education || []).map((edu): EducationProcessed => ({
            degree: edu.degree || '',
            institution: edu.institution || edu.school || '',
            graduationDate: formatDate(edu.graduationDate || edu.endDate),
            gpa: edu.gpa || '',
            relevantCoursework: edu.relevantCoursework || []
        })),

        certifications: (userData.certifications || []).map((cert): CertificationProcessed => ({
            name: cert.name || cert.title || '',
            issuer: cert.issuer || cert.organization || '',
            date: formatDate(cert.date || cert.issueDate),
            expiryDate: cert.expiryDate ? formatDate(cert.expiryDate) : undefined,
            credentialId: cert.credentialId || ''
        })),

        projects: (userData.projects || []).map((project): ProjectProcessed => ({
            name: project.name || project.title || '',
            description: project.description || '',
            technologies: project.technologies || project.techStack || [],
            link: project.link || project.githubLink || project.demoLink || '',
            achievements: project.achievements || []
        })),

        languages: userData.languages || [],
        achievements: userData.achievements || [],
        resumeFilePresent: Boolean(jobData.resumeFile),
        targetIndustry: inferIndustryFromJob(jobData.jobDescription || '', jobData.jobTitle || ''),
        experienceLevel: calculateExperienceLevel(userData.workExperience)
    };
}

// Export types for use in other modules
export type {
    JobData,
    UserData,
    WorkExperience,
    Education,
    Certification,
    Project,
    GenerateResumeParams,
    ResumeData,
    ExperienceLevel,
    Industry,
    WorkExperienceProcessed,
    EducationProcessed,
    CertificationProcessed,
    ProjectProcessed
};