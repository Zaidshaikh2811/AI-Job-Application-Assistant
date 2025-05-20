'use client'

import { templateMap } from '@/components/templates'
import { DownloadResumePDF } from './DownloadButton'
import React from 'react'
import { ResumeData } from '@/lib/types/resume'

type Props = {
    data: ResumeData
    templateType: keyof typeof templateMap
}

export default function ResumePreview({ data, templateType }: Props) {
    const SelectedTemplate = templateMap[templateType]?.component

    if (!SelectedTemplate) {
        return <div>Invalid template selected</div>
    }

    return (
        <div className="p-6 space-y-4">
            <DownloadResumePDF />
            <div id="resume-preview" className="bg-white shadow-lg rounded-md p-4">
                <SelectedTemplate data={data} />
            </div>
        </div>
    )
}
