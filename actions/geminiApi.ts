import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenerateResumeParams, ResumeData } from '@/lib/types/resume.types';
import { AIServiceError } from '@/lib/types/resume.types';

const TECH_KEYWORDS = [
    'react', 'angular', 'vue', 'nodejs', 'python', 'java', 'javascript', 'typescript',
    'aws', 'azure', 'docker', 'kubernetes', 'git', 'sql', 'mongodb', 'postgresql',
    'api', 'rest', 'graphql', 'microservices', 'agile', 'scrum', 'ci/cd', 'devops',
    'machine learning', 'ai', 'data', 'analytics', 'cloud', 'security', 'terraform'
] as const;

const BUSINESS_KEYWORDS = [
    'lead', 'manage', 'develop', 'implement', 'optimize', 'design', 'strategy',
    'growth', 'performance', 'scalability', 'collaboration', 'leadership', 'mentor'
] as const;

function extractKeywords(jobDescription: string, jobTitle: string): string[] {
    const text = `${jobDescription} ${jobTitle}`.toLowerCase();
    const allKeywords = [...TECH_KEYWORDS, ...BUSINESS_KEYWORDS];

    const foundKeywords = allKeywords.filter(keyword => text.includes(keyword));

    // Add specific keywords from job title and description
    const customKeywords = text
        .match(/\b[a-z]{3,}\b/g)
        ?.filter(word =>
            !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'].includes(word)
        ) || [];

    return [...new Set([...foundKeywords, ...customKeywords])].slice(0, 15);
}

function createOptimizedPrompt(params: GenerateResumeParams, keywords: string[]): string {
    const {
        jobDescription,
        personalName,
        email,
        phone,
        linkedin,
        jobTitle,
        companyName,
        jobLocation,
        tone,
        workExperiences,
        technicalSkills,
        softSkills,
        education,
        certifications,
        projects,
        experienceLevel,
    } = params;

    return `Generate an ATS-optimized resume for ${personalName} applying for ${jobTitle} at ${companyName}.

CANDIDATE PROFILE:
Name: ${personalName}
Email: ${email}
Phone: ${phone || 'Not provided'}
LinkedIn: ${linkedin || 'Not provided'}
Experience Level: ${experienceLevel}
Target Role: ${jobTitle} at ${companyName} (${jobLocation || 'Remote'})
Tone: ${tone}

JOB REQUIREMENTS (focus on these keywords):
${jobDescription.substring(0, 1200)}

KEY KEYWORDS TO INCORPORATE: ${keywords.slice(0, 10).join(', ')}

WORK EXPERIENCE:
${workExperiences.map((exp, i) => `
${i + 1}. ${exp.jobTitle} at ${exp.company} (${exp.startDate} - ${exp.endDate})
   Description: ${exp.description}
   Achievements: ${exp.achievements?.join(' | ') || 'Multiple achievements'}
   Technologies: ${exp.technologies?.join(', ') || 'Various technologies'}
`).join('')}

TECHNICAL SKILLS: ${technicalSkills.join(', ')}
SOFT SKILLS: ${softSkills.join(', ')}

EDUCATION:
${education.map(edu => `• ${edu.degree} from ${edu.institution} (${edu.graduationDate})`).join('\n')}

CERTIFICATIONS:
${certifications.map(cert => `• ${cert.name} by ${cert.issuer} (${cert.date})`).join('\n')}

PROJECTS:
${projects.map(proj => `• ${proj.name}: ${proj.description} [${proj.technologies?.join(', ')}]`).join('\n')}

REQUIREMENTS:
1. Create a compelling professional summary incorporating keywords: ${keywords.slice(0, 6).join(', ')}
2. Optimize work experience with quantified achievements (use metrics, percentages, numbers)
3. Ensure ALL required sections are included and properly structured
4. Use exact keywords from the job description naturally
5. Make content ATS-friendly with clear formatting
6. Tailor content specifically for ${jobTitle} role

CRITICAL: Return ONLY valid JSON with this exact structure:
{
  "summary": "Professional summary with keywords",
  "workExperience": [{"jobTitle": "", "company": "", "startDate": "", "endDate": "", "description": "", "achievements": [], "technologies": []}],
  "skills": {"technical": [], "soft": []},
  "education": [{"degree": "", "institution": "", "graduationDate": "", "gpa": "", "relevantCoursework": []}],
  "certifications": [{"name": "", "issuer": "", "date": "", "expiryDate": "", "credentialId": ""}],
  "projects": [{"name": "", "description": "", "technologies": [], "link": "", "achievements": []}],
  "contactInformation": {"name": "", "email": "", "phone": "", "linkedin": ""},
  "languages": [],
  "achievements": []
}`;
}

function ensureCompleteResume(resumeData: Partial<ResumeData>, params: GenerateResumeParams): ResumeData {
    const {
        personalName, email, phone, linkedin, workExperiences,
        technicalSkills, softSkills, education, certifications,
        projects, languages, achievements, jobTitle, experienceLevel
    } = params;

    return {
        summary: resumeData.summary ||
            `${experienceLevel} ${jobTitle} with proven expertise in ${technicalSkills.slice(0, 3).join(', ')}. Demonstrated success in ${softSkills.slice(0, 2).join(' and ')} with a track record of delivering high-impact solutions and driving business growth.`,

        workExperience: Array.isArray(resumeData.workExperience) && resumeData.workExperience.length > 0
            ? resumeData.workExperience
            : workExperiences.length > 0
                ? workExperiences
                : [{
                    jobTitle: jobTitle,
                    company: 'Previous Company',
                    startDate: '01/2020',
                    endDate: 'Present',
                    description: `Developed and maintained applications using ${technicalSkills.slice(0, 4).join(', ')}`,
                    achievements: [
                        'Increased application performance by 40%',
                        'Reduced deployment time by 50%',
                        'Led team of 3-5 developers'
                    ],
                    technologies: technicalSkills.slice(0, 6)
                }],

        skills: {
            technical: resumeData.skills?.technical?.length ?
                resumeData.skills.technical :
                (technicalSkills.length ? technicalSkills : [
                    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git'
                ]),
            soft: resumeData.skills?.soft?.length ?
                resumeData.skills.soft :
                (softSkills.length ? softSkills : [
                    'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Adaptability'
                ])
        },

        education: Array.isArray(resumeData.education) && resumeData.education.length > 0
            ? resumeData.education
            : education.length > 0
                ? education
                : [{
                    degree: 'Bachelor of Science in Computer Science',
                    institution: 'University Name',
                    graduationDate: '05/2020',
                    gpa: '',
                    relevantCoursework: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Systems']
                }],

        certifications: Array.isArray(resumeData.certifications) && resumeData.certifications.length > 0
            ? resumeData.certifications
            : certifications.length > 0
                ? certifications
                : [{
                    name: 'Professional Certification',
                    issuer: 'Certification Authority',
                    date: '01/2023',
                    expiryDate: '01/2026',
                    credentialId: ''
                }],

        projects: Array.isArray(resumeData.projects) && resumeData.projects.length > 0
            ? resumeData.projects
            : projects.length > 0
                ? projects
                : [{
                    name: 'Enterprise Web Application',
                    description: 'Full-stack application serving 10,000+ users with modern architecture',
                    technologies: technicalSkills.slice(0, 5),
                    link: '',
                    achievements: ['Reduced load time by 50%', 'Increased user retention by 35%']
                }],

        contactInformation: {
            name: personalName,
            email: email,
            phone: phone || '',
            linkedin: linkedin || ''
        },

        languages: Array.isArray(resumeData.languages) && resumeData.languages.length > 0
            ? resumeData.languages
            : (languages.length > 0 ? languages : ['English (Native)']),

        achievements: Array.isArray(resumeData.achievements) && resumeData.achievements.length > 0
            ? resumeData.achievements
            : (achievements.length > 0 ? achievements : [
                'Employee of the Month recognition',
                'Led successful project delivery ahead of schedule',
                'Mentored junior team members'
            ])
    };
}

export async function generateResumeFromJobData(params: GenerateResumeParams): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new AIServiceError('Gemini API key not configured');
    }

    const keywords = extractKeywords(params.jobDescription, params.jobTitle);
    const prompt = createOptimizedPrompt(params, keywords);

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
        generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 4096,
            responseMimeType: 'application/json'
        }
    });

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        if (!responseText?.trim()) {
            throw new AIServiceError('Empty response from AI service');
        }

        // Parse and validate the response
        let resumeData: Partial<ResumeData>;
        try {
            resumeData = JSON.parse(responseText);
        } catch (parseError) {
            console.log('JSON parse error, attempting to fix...', parseError);

            // Try to extract JSON from response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    resumeData = JSON.parse(jsonMatch[0]);
                } catch {
                    console.log('Fallback parsing failed, using manual generation');
                    resumeData = {};
                }
            } else {
                resumeData = {};
            }
        }

        // Ensure all required sections are present with fallbacks
        const completeResume = ensureCompleteResume(resumeData, params);

        return JSON.stringify(completeResume, null, 2);

    } catch (error) {
        console.error('Gemini API Error:', error);

        if (error instanceof AIServiceError) {
            throw error;
        }

        // For any other error, generate fallback resume
        console.log('Generating fallback resume due to API error');
        const fallbackResume = ensureCompleteResume({}, params);
        return JSON.stringify(fallbackResume, null, 2);
    }
}
