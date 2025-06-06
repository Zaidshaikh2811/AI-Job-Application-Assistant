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


    const getData = await getIndividualResume(id);
    console.log('getData:', getData);
    const templateKey = getData.data.template as string | undefined;

    const Template = getTemplateById(templateKey ?? '')?.component || ResumeFirst;

    return (
        <PDFClientViewer>
            <Template resumeData={getData.data} />
        </PDFClientViewer>
    );
};

export default Page;
