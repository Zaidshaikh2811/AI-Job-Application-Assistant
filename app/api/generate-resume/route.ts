import { generateResumeFromJobData } from '@/actions/geminiApi';

import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import type { RequestBody, ResumeData } from '@/lib/types/resume.types';
import {
    ResumeGenerationError,
    JSONParseError,

} from '@/lib/types/resume.types';
import {
    processUserData,
    cleanAndValidateJSON,
    calculateATSScore
} from '@/lib/resume.utils';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const body: RequestBody = await req.json().catch(() => {
            throw new ResumeGenerationError('Invalid JSON in request body', 400);
        });

        const { data: jobData, userData } = body;

        // Validate required fields
        if (!jobData?.jobDescription || !jobData?.jobTitle) {
            throw new ResumeGenerationError('Job description and title are required', 400);
        }

        if (!userData?.fullName || !userData?.email) {
            throw new ResumeGenerationError('Full name and email are required', 400);
        }

        // Process user data
        const processedJobData = processUserData(jobData, userData);

        // Generate resume using AI
        const generatedResponse = await generateResumeFromJobData(processedJobData);

        // Clean and validate AI response
        const cleanedResponse = cleanAndValidateJSON(generatedResponse);
        console.log('Cleaned AI Response:', cleanedResponse);

        let parsedData: ResumeData;
        try {
            parsedData = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);

            // Try to extract JSON from response
            const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    parsedData = JSON.parse(jsonMatch[0]);
                } catch {
                    throw new JSONParseError('Unable to parse AI response as JSON');
                }
            } else {
                throw new JSONParseError('No valid JSON found in AI response');
            }
        }

        // Validate and structure resume data
        const resumeData: ResumeData = {
            summary: parsedData.summary || '',
            workExperience: Array.isArray(parsedData.workExperience)
                ? parsedData.workExperience
                : [],
            skills: {
                technical: Array.isArray(parsedData.skills?.technical)
                    ? parsedData.skills.technical
                    : [],
                soft: Array.isArray(parsedData.skills?.soft)
                    ? parsedData.skills.soft
                    : []
            },
            education: Array.isArray(parsedData.education)
                ? parsedData.education
                : [],
            certifications: Array.isArray(parsedData.certifications)
                ? parsedData.certifications
                : [],
            projects: Array.isArray(parsedData.projects)
                ? parsedData.projects
                : [],
            contactInformation: {
                name: parsedData.contactInformation?.name || processedJobData.personalName,
                email: parsedData.contactInformation?.email || processedJobData.email,
                phone: parsedData.contactInformation?.phone || processedJobData.phone,
                linkedin: parsedData.contactInformation?.linkedin || processedJobData.linkedin,
            },
            languages: Array.isArray(parsedData.languages)
                ? parsedData.languages
                : processedJobData.languages,
            achievements: Array.isArray(parsedData.achievements)
                ? parsedData.achievements
                : processedJobData.achievements,
            generatedFor: {
                jobTitle: jobData.jobTitle,
                company: processedJobData.companyName,
                generatedAt: new Date(),
                aiModel: 'gemini-2.0-flash'
            }
        };

        // Calculate ATS score
        const atsScore = calculateATSScore(resumeData, jobData.jobDescription);

        // Save to database (commented out for now)
        // const resume = await Resume.create(resumeData);

        return NextResponse.json({
            message: 'Resume generated successfully',
            resumeData,
            atsScore,
            metadata: {
                experienceLevel: processedJobData.experienceLevel,
                targetIndustry: processedJobData.targetIndustry,
                generatedAt: new Date().toISOString()
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error in Resume API:', error);

        // Handle specific error types
        if (error instanceof ResumeGenerationError) {
            return NextResponse.json({
                error: error.message,
                type: error.name
            }, { status: error.statusCode });
        }

        // Handle unexpected errors
        return NextResponse.json({
            error: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development'
                ? (error as Error).message
                : undefined
        }, { status: 500 });
    }
}