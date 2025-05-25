// Comprehensive Resume Schema with Validation and Mapping Functions
const ResumeSchema = {
    // Personal Information Section
    personalInfo: {
        // Required fields
        firstName: { type: 'string', required: true, maxLength: 50 },
        lastName: { type: 'string', required: true, maxLength: 50 },
        email: { type: 'email', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { type: 'string', required: true, pattern: /^[\+]?[1-9][\d]{0,15}$/ },

        // Optional fields
        middleName: { type: 'string', required: false, maxLength: 50 },
        title: { type: 'string', required: false, maxLength: 100 }, // Professional title
        summary: { type: 'string', required: false, maxLength: 500 },

        // Location information
        location: {
            street: { type: 'string', required: false, maxLength: 100 },
            city: { type: 'string', required: false, maxLength: 50 },
            state: { type: 'string', required: false, maxLength: 50 },
            zipCode: { type: 'string', required: false, maxLength: 10 },
            country: { type: 'string', required: false, maxLength: 50 },
            displayFormat: { type: 'enum', values: ['full', 'city-state', 'city-country', 'minimal'], default: 'city-state' }
        },

        // Social links
        links: {
            linkedin: { type: 'url', required: false },
            github: { type: 'url', required: false },
            portfolio: { type: 'url', required: false },
            website: { type: 'url', required: false },
            twitter: { type: 'url', required: false },
            custom: [{
                label: { type: 'string', maxLength: 30 },
                url: { type: 'url' }
            }]
        }
    },

    // Work Experience Section
    experience: [{
        // Required fields
        jobTitle: { type: 'string', required: true, maxLength: 100 },
        company: { type: 'string', required: true, maxLength: 100 },
        startDate: { type: 'date', required: true }, // ISO format or Date object

        // Optional fields
        endDate: { type: 'date', required: false }, // null for current position
        isCurrentPosition: { type: 'boolean', default: false },
        location: {
            city: { type: 'string', maxLength: 50 },
            state: { type: 'string', maxLength: 50 },
            country: { type: 'string', maxLength: 50 },
            remote: { type: 'boolean', default: false }
        },

        // Job details
        department: { type: 'string', required: false, maxLength: 100 },
        employmentType: {
            type: 'enum',
            values: ['full-time', 'part-time', 'contract', 'freelance', 'internship', 'temporary'],
            default: 'full-time'
        },

        // Responsibilities and achievements
        description: { type: 'string', maxLength: 200 }, // Brief job description
        responsibilities: [{ type: 'string', maxLength: 200 }], // Bullet points
        achievements: [{ type: 'string', maxLength: 200 }], // Quantified achievements
        keyProjects: [{
            name: { type: 'string', maxLength: 100 },
            description: { type: 'string', maxLength: 300 },
            technologies: [{ type: 'string', maxLength: 50 }],
            impact: { type: 'string', maxLength: 200 }
        }],

        // Skills and technologies used
        technologies: [{ type: 'string', maxLength: 50 }],
        skills: [{ type: 'string', maxLength: 50 }]
    }],

    // Education Section
    education: [{
        // Required fields
        degree: { type: 'string', required: true, maxLength: 100 },
        institution: { type: 'string', required: true, maxLength: 100 },

        // Optional fields
        fieldOfStudy: { type: 'string', maxLength: 100 },
        graduationDate: { type: 'date' }, // or expected graduation
        startDate: { type: 'date' },

        // Academic details
        gpa: {
            value: { type: 'number', min: 0, max: 4.0 },
            scale: { type: 'number', default: 4.0 },
            displayGPA: { type: 'boolean', default: false } // Only show if above threshold
        },

        location: {
            city: { type: 'string', maxLength: 50 },
            state: { type: 'string', maxLength: 50 },
            country: { type: 'string', maxLength: 50 }
        },

        // Additional academic info
        honors: [{ type: 'string', maxLength: 100 }], // Dean's List, Magna Cum Laude, etc.
        relevantCoursework: [{ type: 'string', maxLength: 100 }],
        thesis: {
            title: { type: 'string', maxLength: 200 },
            advisor: { type: 'string', maxLength: 100 },
            description: { type: 'string', maxLength: 300 }
        }
    }],

    // Skills Section
    skills: {
        // Technical skills organized by category
        technical: {
            programmingLanguages: [{
                name: { type: 'string', maxLength: 30 },
                proficiency: { type: 'enum', values: ['beginner', 'intermediate', 'advanced', 'expert'] }
            }],
            frameworks: [{
                name: { type: 'string', maxLength: 30 },
                proficiency: { type: 'enum', values: ['beginner', 'intermediate', 'advanced', 'expert'] }
            }],
            databases: [{ type: 'string', maxLength: 30 }],
            tools: [{ type: 'string', maxLength: 30 }],
            platforms: [{ type: 'string', maxLength: 30 }],
            methodologies: [{ type: 'string', maxLength: 30 }] // Agile, DevOps, etc.
        },

        // Soft skills
        soft: [{ type: 'string', maxLength: 50 }],

        // Languages
        languages: [{
            language: { type: 'string', required: true, maxLength: 30 },
            proficiency: {
                type: 'enum',
                values: ['native', 'fluent', 'professional', 'conversational', 'basic'],
                required: true
            }
        }]
    },

    // Projects Section
    projects: [{
        name: { type: 'string', required: true, maxLength: 100 },
        description: { type: 'string', required: true, maxLength: 300 },

        // Project details
        role: { type: 'string', maxLength: 50 }, // Your role in the project
        duration: {
            startDate: { type: 'date' },
            endDate: { type: 'date' },
            isOngoing: { type: 'boolean', default: false }
        },

        // Technical details
        technologies: [{ type: 'string', maxLength: 50 }],
        methodologies: [{ type: 'string', maxLength: 30 }],

        // Links and references
        links: {
            demo: { type: 'url' },
            github: { type: 'url' },
            documentation: { type: 'url' },
            custom: [{
                label: { type: 'string', maxLength: 20 },
                url: { type: 'url' }
            }]
        },

        // Impact and results
        impact: { type: 'string', maxLength: 200 },
        keyFeatures: [{ type: 'string', maxLength: 100 }],
        teamSize: { type: 'number', min: 1 }
    }],

    // Certifications Section
    certifications: [{
        name: { type: 'string', required: true, maxLength: 100 },
        issuer: { type: 'string', required: true, maxLength: 100 },
        issueDate: { type: 'date', required: true },
        expirationDate: { type: 'date' }, // null if doesn't expire
        credentialId: { type: 'string', maxLength: 100 },
        credentialUrl: { type: 'url' },
        skills: [{ type: 'string', maxLength: 50 }] // Skills validated by cert
    }],

    // Awards and Achievements
    awards: [{
        title: { type: 'string', required: true, maxLength: 100 },
        issuer: { type: 'string', required: true, maxLength: 100 },
        date: { type: 'date', required: true },
        description: { type: 'string', maxLength: 200 },
        significance: {
            type: 'enum',
            values: ['international', 'national', 'regional', 'organizational', 'academic']
        }
    }],

    // Publications Section
    publications: [{
        title: { type: 'string', required: true, maxLength: 200 },
        authors: [{ type: 'string', maxLength: 100 }], // Include yourself
        publicationType: {
            type: 'enum',
            values: ['journal', 'conference', 'book', 'chapter', 'whitepaper', 'blog', 'other']
        },
        venue: { type: 'string', maxLength: 100 }, // Journal/Conference name
        date: { type: 'date', required: true },
        doi: { type: 'string', maxLength: 100 },
        url: { type: 'url' },
        abstract: { type: 'string', maxLength: 500 }
    }],

    // Volunteer Experience
    volunteer: [{
        organization: { type: 'string', required: true, maxLength: 100 },
        role: { type: 'string', required: true, maxLength: 100 },
        startDate: { type: 'date', required: true },
        endDate: { type: 'date' }, // null if ongoing
        description: { type: 'string', maxLength: 300 },
        achievements: [{ type: 'string', maxLength: 200 }],
        skills: [{ type: 'string', maxLength: 50 }],
        hoursPerWeek: { type: 'number', min: 0, max: 168 }
    }],

    // Resume Metadata
    metadata: {
        version: { type: 'string', default: '1.0' },
        lastUpdated: { type: 'date', default: () => new Date() },
        template: { type: 'string', maxLength: 50 },
        targetRole: { type: 'string', maxLength: 100 }, // Role this resume targets
        targetIndustry: { type: 'string', maxLength: 50 },
        customizations: {
            sectionsOrder: [{ type: 'string' }], // Custom section ordering
            hiddenSections: [{ type: 'string' }], // Sections to hide for this target
            emphasizedSkills: [{ type: 'string' }] // Skills to highlight
        }
    }
};

// Validation functions
interface ValidationHelpersType {
    validateEmail: (email: string) => boolean;
    validatePhone: (phone: string) => boolean;
    validateUrl: (url: string) => boolean;
    validateDate: (date: Date | string) => boolean;
    formatDate: (date: Date | string, format?: string) => string;
    calculateDuration: (startDate: Date | string, endDate?: Date | string) => string;
}

const ValidationHelpers: ValidationHelpersType = {
    validateEmail: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validatePhone: (phone: string): boolean => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    },

    validateUrl: (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    validateDate: (date: Date | string): boolean => {
        return (date instanceof Date && !isNaN(date.getTime())) ||
            (typeof date === 'string' && !isNaN(Date.parse(date)));
    },

    formatDate: (date: Date | string, format: string = 'MMM YYYY'): string => {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        switch (format) {
            case 'MMM YYYY':
                return `${months[d.getMonth()]} ${d.getFullYear()}`;
            case 'YYYY':
                return d.getFullYear().toString();
            case 'MM/YYYY':
                return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
            default:
                return d.toLocaleDateString();
        }
    },

    calculateDuration: (startDate: Date | string, endDate: Date | string = new Date()): string => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));

        const years = Math.floor(diffMonths / 12);
        const months = diffMonths % 12;

        if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
        if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
        return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    }
};

// Data mapping functions for common field variations
const FieldMappings = {
    personalInfo: {
        name: ['fullName', 'firstName', 'first_name', 'fname'],
        email: ['emailAddress', 'email_address', 'mail', 'e_mail'],
        phone: ['phoneNumber', 'phone_number', 'mobile', 'telephone', 'tel'],
        title: ['jobTitle', 'professionalTitle', 'headline', 'position']
    },

    experience: {
        jobTitle: ['title', 'position', 'role', 'job_title', 'designation'],
        company: ['employer', 'organization', 'workplace', 'firm'],
        startDate: ['start_date', 'startDate', 'from', 'begin_date'],
        endDate: ['end_date', 'endDate', 'to', 'until', 'finish_date'],
        description: ['summary', 'overview', 'jobDescription', 'duties'],
        responsibilities: ['duties', 'tasks', 'jobDuties', 'keyResponsibilities']
    },

    education: {
        degree: ['qualification', 'certificate', 'diploma', 'level'],
        institution: ['school', 'university', 'college', 'academy'],
        fieldOfStudy: ['major', 'subject', 'specialization', 'concentration'],
        graduationDate: ['graduation_date', 'completion_date', 'end_date']
    }
};

// Schema validator function
interface ResumePersonalInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    middleName?: string;
    title?: string;
    summary?: string;
    location?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
        displayFormat?: string;
    };
    links?: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
        website?: string;
        twitter?: string;
        custom?: Array<{
            label?: string;
            url?: string;
        }>;
    };
}

interface ResumeExperience {
    jobTitle?: string;
    company?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    isCurrentPosition?: boolean;
    location?: {
        city?: string;
        state?: string;
        country?: string;
        remote?: boolean;
    };
    department?: string;
    employmentType?: string;
    description?: string;
    responsibilities?: string[];
    achievements?: string[];
    keyProjects?: Array<{
        name?: string;
        description?: string;
        technologies?: string[];
        impact?: string;
    }>;
    technologies?: string[];
    skills?: string[];
}

interface ResumeData {
    personalInfo?: ResumePersonalInfo;
    experience?: ResumeExperience[];
    [key: string]: unknown;
}

interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

const validateResumeData = (
    data: ResumeData,
    schema: typeof ResumeSchema = ResumeSchema
): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate required fields
    if (schema.personalInfo.firstName.required && !data.personalInfo?.firstName) {
        errors.push('Personal Info: First name is required');
    }

    if (schema.personalInfo.email.required && !data.personalInfo?.email) {
        errors.push('Personal Info: Email is required');
    } else if (data.personalInfo?.email && !ValidationHelpers.validateEmail(data.personalInfo.email)) {
        errors.push('Personal Info: Invalid email format');
    }

    // Validate experience section
    if (data.experience) {
        data.experience.forEach((exp, index) => {
            if (!exp.jobTitle) errors.push(`Experience ${index + 1}: Job title is required`);
            if (!exp.company) errors.push(`Experience ${index + 1}: Company is required`);
            if (!exp.startDate) errors.push(`Experience ${index + 1}: Start date is required`);

            if (
                exp.endDate &&
                new Date(exp.startDate as string | Date) > new Date(exp.endDate as string | Date)
            ) {
                errors.push(`Experience ${index + 1}: End date cannot be before start date`);
            }
        });
    }

    return { isValid: errors.length === 0, errors, warnings };
};

// Export the complete schema system
module.exports = {
    ResumeSchema,
    ValidationHelpers,
    FieldMappings,
    validateResumeData
};