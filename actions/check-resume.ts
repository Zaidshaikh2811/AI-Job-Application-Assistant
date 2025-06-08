
/* eslint-disable */
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
// Import the text extractors - note: corrected import paths
import { extractTextFromPDF } from '@/lib/utils/pdf-extractor';
import { extractTextFromDOCX } from '@/lib/utils/docx-extractor';

type ResumeCheckResult = {
    fitRatio: number;          // 0-100 score of match percentage
    keywordMatch: {
        matched: string[];       // Keywords found in resume
        missing: string[];       // Important keywords missing from resume
    };
    suggestions: {
        sections: Record<string, string[]>; // Section-specific suggestions
        general: string[];      // General improvement suggestions
    };
    skillGaps: string[];      // Skills mentioned in job but missing in resume
    strengths: string[];      // Areas where the resume shows strong alignment
};

// Custom error types for better error handling
class ResumeAnalysisError extends Error {
    constructor(message: string, public cause?: unknown) {
        super(message);
        this.name = 'ResumeAnalysisError';
    }
}

class FileExtractionError extends Error {
    constructor(message: string, public fileType?: string, public cause?: unknown) {
        super(message);
        this.name = 'FileExtractionError';
    }
}

class AIServiceError extends Error {
    constructor(message: string, public cause?: unknown) {
        super(message);
        this.name = 'AIServiceError';
    }
}

export async function checkResumeMatch(
    resumeFile: File,
    jobDescription: string,
    jobTitle: string,
    company: string,
    jobUrl?: string
): Promise<ResumeCheckResult> {
    try {
        // Validate API key
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            throw new ResumeAnalysisError('Gemini API key not configured. Please check your environment variables.');
        }

        // Validate inputs
        validateInputs(resumeFile, jobDescription, jobTitle);

        // Extract text from resume based on file type
        const resumeText = await extractResumeText(resumeFile);

        // Validate extracted text
        if (!resumeText.trim()) {
            throw new FileExtractionError('No text could be extracted from the resume file. Please ensure the file contains readable text.');
        }

        // Create optimized prompt for Gemini
        const prompt = createResumeAnalysisPrompt(resumeText, jobDescription, jobTitle, company, jobUrl);

        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            generationConfig: {
                temperature: 0.3,
                topP: 0.8,
                maxOutputTokens: 4096,
                responseMimeType: 'application/json'
            }
        });

        // Send request to Gemini with timeout and retry logic
        const analysisResult = await performAIAnalysis(model, prompt);

        return validateResponse(analysisResult);

    } catch (error) {
        console.error('Resume analysis error:', error);

        // Re-throw custom errors with context
        if (error instanceof ResumeAnalysisError ||
            error instanceof FileExtractionError ||
            error instanceof AIServiceError) {
            throw error;
        }

        // Handle unexpected errors
        if (error instanceof Error) {
            throw new ResumeAnalysisError(
                `Unexpected error during resume analysis: ${error.message}`,
                error
            );
        }

        // Fallback for unknown error types
        throw new ResumeAnalysisError('An unknown error occurred during resume analysis');
    }
}

// Validate input parameters
function validateInputs(
    resumeFile: File,
    jobDescription: string,
    jobTitle: string
): void {
    if (!resumeFile) {
        throw new ResumeAnalysisError('Resume file is required');
    }

    if (resumeFile.size === 0) {
        throw new FileExtractionError('Resume file is empty');
    }

    if (resumeFile.size > 10 * 1024 * 1024) { // 10MB limit
        throw new FileExtractionError('Resume file is too large. Maximum size is 10MB.');
    }

    if (!jobDescription.trim() && !jobTitle.trim()) {
        throw new ResumeAnalysisError('Either job description or job title must be provided');
    }

    if (jobDescription.length > 50000) {
        throw new ResumeAnalysisError('Job description is too long. Please provide a shorter description.');
    }
}

// Extract text from different file formats with better error handling
async function extractResumeText(file: File): Promise<string> {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    const supportedTypes = ['pdf', 'docx', 'txt'];

    if (!fileType || !supportedTypes.includes(fileType)) {
        throw new FileExtractionError(
            'Unsupported file format. Please upload PDF, DOCX, or TXT file.',
            fileType
        );
    }

    try {
        let extractedText: string;

        switch (fileType) {
            case 'pdf':
                extractedText = await extractTextFromPDF(file);
                break;
            case 'docx':
                extractedText = await extractTextFromDOCX(file);
                break;
            case 'txt':
                extractedText = await file.text();
                break;
            default:
                throw new FileExtractionError(`Unsupported file type: ${fileType}`, fileType);
        }

        if (!extractedText || extractedText.trim().length === 0) {
            throw new FileExtractionError(
                'No readable text found in the file. Please ensure the file contains text content.',
                fileType
            );
        }

        return extractedText;

    } catch (error) {
        if (error instanceof FileExtractionError) {
            throw error;
        }

        // Handle specific file extraction errors
        if (error instanceof Error) {
            if (error.message.includes('Invalid PDF') || error.message.includes('PDF')) {
                throw new FileExtractionError(
                    'Invalid or corrupted PDF file. Please try a different file.',
                    fileType,
                    error
                );
            }

            if (error.message.includes('DOCX') || error.message.includes('zip')) {
                throw new FileExtractionError(
                    'Invalid or corrupted DOCX file. Please try a different file.',
                    fileType,
                    error
                );
            }

            throw new FileExtractionError(
                `Failed to extract text from ${fileType?.toUpperCase()} file: ${error.message}`,
                fileType,
                error
            );
        }

        throw new FileExtractionError(
            `Unknown error occurred while processing ${fileType?.toUpperCase()} file`,
            fileType,
            error
        );
    }
}

// Perform AI analysis with retry logic and timeout
async function performAIAnalysis(
    model: GenerativeModel,
    prompt: string,
    maxRetries: number = 3
): Promise<ResumeCheckResult> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Add timeout to prevent hanging requests
            const timeoutPromise = new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('Request timeout')), 60000); // 60 second timeout
            });

            const analysisPromise = model.generateContent(prompt);

            const result = await Promise.race([analysisPromise, timeoutPromise]);
            const response = await result.response;
            const responseText = response.text();

            if (!responseText?.trim()) {
                throw new AIServiceError('Empty response from AI service');
            }

            // Parse and return the response
            return parseAIResponse(responseText);

        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown error');

            console.warn(`AI analysis attempt ${attempt} failed:`, lastError.message);

            // Don't retry on certain types of errors
            if (error instanceof Error) {
                if (error.message.includes('API key') ||
                    error.message.includes('quota') ||
                    error.message.includes('permission')) {
                    throw new AIServiceError(`AI service error: ${error.message}`, error);
                }
            }

            // Wait before retry (exponential backoff)
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }
    }

    // If all retries failed, throw the last error or create a fallback
    throw new AIServiceError(
        `AI analysis failed after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`,
        lastError
    );
}

// Parse AI response with better error handling
function parseAIResponse(responseText: string): ResumeCheckResult {
    try {
        // First, try to parse the response directly
        const parsed = JSON.parse(responseText);
        return parsed as ResumeCheckResult;

    } catch (parseError) {
        try {
            // Attempt to extract JSON if the response includes extra text
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return parsed as ResumeCheckResult;
            }

            throw new AIServiceError('No valid JSON found in AI response');

        } catch (extractError) {
            console.error('Failed to parse AI response:', responseText.substring(0, 500));
            throw new AIServiceError(
                'Failed to parse AI response as JSON. The AI service may be experiencing issues.',
                extractError
            );
        }
    }
}

// Create prompt for Gemini API
function createResumeAnalysisPrompt(
    resumeText: string,
    jobDescription: string,
    jobTitle: string,
    company: string,
    jobUrl?: string
): string {
    // Truncate inputs to prevent token limit issues
    const truncatedResume = resumeText.substring(0, 10000);
    const truncatedJobDescription = jobDescription.substring(0, 3000);

    return `You are an expert resume analyzer and career coach. Analyze the following resume against a job description to determine the fit ratio and provide targeted improvement suggestions.

RESUME TEXT:
${truncatedResume}

JOB DETAILS:
Title: ${jobTitle}
Company: ${company}
URL: ${jobUrl || 'Not provided'}
Description: ${truncatedJobDescription}

INSTRUCTIONS:
1. Calculate a fit ratio (0-100%) indicating how well the resume matches the job requirements
2. Identify key skills and keywords from the job description
3. Determine which keywords are present in and missing from the resume
4. Provide specific suggestions for each resume section (summary, experience, skills, education)
5. Identify skill gaps that should be addressed
6. Highlight strengths where the candidate shows strong alignment

IMPORTANT: Return ONLY valid JSON in this exact structure:
{
  "fitRatio": 75,
  "keywordMatch": {
    "matched": ["keyword1", "keyword2"],
    "missing": ["keyword3", "keyword4"]
  },
  "suggestions": {
    "summary": ["suggestion1", "suggestion2"],
    "experience": ["suggestion1", "suggestion2"],
    "skills": ["suggestion1", "suggestion2"],
    "education": ["suggestion1", "suggestion2"],
    "general": ["suggestion1", "suggestion2"]
  },
  "skillGaps": ["skill1", "skill2", "skill3"],
  "strengths": ["strength1", "strength2", "strength3"]
}

Return ONLY the JSON with no additional text or explanation.`;
}

// Validate and normalize AI response with type safety
function validateResponse(response: ResumeCheckResult ): ResumeCheckResult {
    if (!response || typeof response !== 'object') {
        throw new AIServiceError('Invalid response format: response is not an object');
    }

    try {
        const result: ResumeCheckResult = {
            fitRatio: validateNumber(response.fitRatio, 'fitRatio', 0, 100),
            keywordMatch: {
                matched: validateStringArray(response.keywordMatch?.matched, 'keywordMatch.matched'),
                missing: validateStringArray(response.keywordMatch?.missing, 'keywordMatch.missing')
            },
            suggestions: {
                sections: {},
                general: validateStringArray(response.suggestions?.general, 'suggestions.general')
            },
            skillGaps: validateStringArray(response.skillGaps, 'skillGaps'),
            strengths: validateStringArray(response.strengths, 'strengths')
        };

        // Add section suggestions if available
        const sectionKeys = ['summary', 'experience', 'skills', 'education'];
        sectionKeys.forEach(section => {
            result.suggestions.sections[section] = validateStringArray(

                response.suggestions?.sections?.[section],
                `suggestions.${section}`
            );
        });

        return result;

    } catch (validationError) {
        if (validationError instanceof Error) {
            throw new AIServiceError(
                `Response validation failed: ${validationError.message}`,
                validationError
            );
        }
        throw new AIServiceError('Unknown validation error occurred');
    }
}

// Helper function to validate numbers
function validateNumber(value: unknown, fieldName: string, min: number = 0, max: number = 100): number {
    if (typeof value !== 'number' || isNaN(value)) {
        console.warn(`Invalid ${fieldName}: ${value}, using default 0`);
        return 0;
    }
    return Math.min(max, Math.max(min, Math.round(value)));
}

// Helper function to validate string arrays
function validateStringArray(value: unknown, fieldName: string): string[] {
    if (!Array.isArray(value)) {
        console.warn(`Invalid ${fieldName}: expected array, got ${typeof value}`);
        return [];
    }

    return value
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        .map(item => item.trim());
}

// Fallback result when AI analysis fails completely
export function createFallbackResult(jobTitle: string, company: string): ResumeCheckResult {
    return {
        fitRatio: 50,
        keywordMatch: {
            matched: ['basic qualifications'],
            missing: ['advanced skills', 'specific technologies']
        },
        suggestions: {
            sections: {
                summary: ['Tailor your summary to highlight relevant experience for this role'],
                experience: ['Quantify your achievements with metrics', 'Use action verbs'],
                skills: ['List skills directly mentioned in the job description'],
                education: ['Highlight relevant coursework or certifications']
            },
            general: [
                `Customize your resume specifically for the ${jobTitle} role at ${company}`,
                'Ensure your resume includes keywords from the job description',
                'Use concrete examples and metrics to demonstrate achievements'
            ]
        },
        skillGaps: ['Unable to analyze specific skill gaps - AI service unavailable'],
        strengths: ['Basic qualifications appear to be met']
    };
}

// Export error types for use in other components
export { ResumeAnalysisError, FileExtractionError, AIServiceError };