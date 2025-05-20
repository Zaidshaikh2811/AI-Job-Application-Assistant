import { getIndividualResume } from '@/actions/resume';
import ResumeTemplateCards from '@/components/templates/ResumeTemplateCards';
import ResumeTemplateClassic from '@/components/templates/ResumeTemplateClassic';
import ResumeTemplateMinimal from '@/components/templates/ResumeTemplateMinimal';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const templates = {
        classic: ResumeTemplateClassic,
        minimal: ResumeTemplateMinimal,
        modern: ResumeTemplateCards
    };
    const resumeDataRaw = await getIndividualResume(id);
    const resumeData = Array.isArray(resumeDataRaw) ? resumeDataRaw[0] : resumeDataRaw;

    // Ensure resumeData has contactInformation property
    const resumeDataWithContact = {
        contactInformation: resumeData.contactInformation ?? {},
        ...resumeData,
    };

    const SelectedTemplate = templates["minimal"]; // or "minimal", "modern"

    return <SelectedTemplate
        data={resumeDataWithContact}

    />;

}

export default page
