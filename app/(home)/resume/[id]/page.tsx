import { getIndividualResume } from '@/actions/resume';
import { templateMap } from '@/components/templates';
import React from 'react'
import ResumePreview from './ResumePreview';
import { ResumeData } from '@/lib/types/resume';

const page = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;



    const resumeDataRaw = await getIndividualResume(id);
    const resumeData = Array.isArray(resumeDataRaw) ? resumeDataRaw[0] : resumeDataRaw;


    const resumeDataWithContact: ResumeData = {
        summary: resumeData.summary ?? '',
        skills: resumeData.skills ?? [],
        workExperience: resumeData.workExperience ?? [],
        education: resumeData.education ?? [],
        projects: resumeData.projects ?? [],
        certifications: resumeData.certifications ?? [],
        contactInformation: resumeData.contactInformation ?? {},
        ...resumeData,
        _id: typeof resumeData._id === 'string' ? resumeData._id : String(resumeData._id ?? ''),
    };
    const templateType = (resolvedSearchParams.template as keyof typeof templateMap) || 'modern';

    const SelectedTemplate = templateMap[templateType];


    if (!SelectedTemplate) {

        return <div className='mt-20'>Invalid template selected</div>;
    }
    return <main className='mt-20'>

        {/* <SelectedTemplate.component
            data={JSON.parse(JSON.stringify(resumeDataWithContact)) as typeof resumeDataWithContact}

        /> */}
        <ResumePreview data={JSON.parse(JSON.stringify(resumeDataWithContact)) as typeof resumeDataWithContact} templateType={templateType} />
    </main>
        ;

}

export default page
