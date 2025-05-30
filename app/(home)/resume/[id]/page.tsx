// app/[some-route]/page.tsx (your original page)
import React from 'react';
import ResumeFirst from '@/components/templates/ResumeFirst';
import { getIndividualResume } from '@/actions/resume';
import { getTemplateById } from '@/components/templates';

import PDFClientViewer from './PDFClientViewer';



interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;

    const templateKey = resolvedSearchParams.template as string | undefined;
    const getData = await getIndividualResume(id);
    const Template = getTemplateById(templateKey ?? '')?.component || ResumeFirst;

    return (
        <PDFClientViewer>
            <Template resumeData={getData.data} />
        </PDFClientViewer>
    );
};

export default Page;
