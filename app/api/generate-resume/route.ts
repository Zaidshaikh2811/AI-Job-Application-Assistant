import { generateResumeFromJobData } from '@/actions/geminiApi'
import Resume from '@/lib/models/Resume';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {

        await dbConnect();
        const rawJobData = await req.json();
        const generatedResponse = await generateResumeFromJobData(rawJobData)
        const cleanedResponse = generatedResponse
            .replace(/```json\n?/, '')  // remove starting ```json
            .replace(/```$/, '')        // remove ending ```
            .trim();

        const parsedData = JSON.parse(cleanedResponse);

        const resumeData = {
            summary: parsedData.summary ?? null,
            workExperience: Array.isArray(parsedData.workExperience) ? parsedData.workExperience : [],
            skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
            education: parsedData.education ?? null,
            certifications: parsedData.certifications ?? null,
            projects: parsedData.projects ?? null,
            contactInformation: {
                name: parsedData.contactInformation?.name ?? '',
                email: parsedData.contactInformation?.email ?? '',
                phone: parsedData.contactInformation?.phone ?? '',
                linkedin: parsedData.contactInformation?.linkedin ?? null,
            },
        };
        console.log(resumeData);

        const resume = await Resume.create(resumeData);

        return NextResponse.json({ message: 'Resume generated successfully', resumeData: resume }, { status: 200 })

    } catch (error) {
        console.error('Error in API:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
