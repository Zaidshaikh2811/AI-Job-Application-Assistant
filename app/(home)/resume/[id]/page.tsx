import React from 'react';

import ResumeFirst from '@/components/templates/ResumeFirst';
import { getIndividualResume } from '@/actions/resume';

import { getTemplateById } from '@/components/templates';

const Page = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;



    const templateKey = resolvedSearchParams.template as string | undefined;
    const getData = await getIndividualResume(id);
    const Template = getTemplateById(templateKey ?? '')?.component || ResumeFirst;




    return (
        <Template resumeData={getData.data} />
    );
};

export default Page;