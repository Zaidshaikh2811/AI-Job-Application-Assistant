'use client'

import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { Button } from '@/components/ui/button'
import React from 'react'

export const DownloadResumePDF = () => {
    const handleDownload = async () => {
        const element = document.getElementById('resume-preview')
        if (!element) return

        try {
            const dataUrl = await toPng(element)

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4'
            })

            const imgProps = pdf.getImageProperties(dataUrl)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save('resume.pdf')
        } catch (error) {
            console.error('Failed to download PDF:', error)
        }
    }

    return (
        <Button onClick={handleDownload} className="mt-4">
            Download Resume as PDF
        </Button>
    )
}
