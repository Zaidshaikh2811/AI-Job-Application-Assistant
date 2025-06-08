'use client'

import * as pdfjs from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
interface TextItem {
    str: string;
}
// Set the workerSrc path correctly for PDF.js
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
    // You may need to adjust this path based on how your app serves static files
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export async function extractTextFromPDF(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();

        const pdf: PDFDocumentProxy = await pdfjs.getDocument({
            data: arrayBuffer,
            verbosity: 0 // Suppress console logs from pdfjs
        }).promise;

        let fullText = '';
        const numPages = Math.min(pdf.numPages, 50); // Limit pages

        for (let i = 1; i <= numPages; i++) {
            try {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                const pageText = (textContent.items as TextItem[])
                    .map(item => item.str)
                    .join(' ');

                fullText += `${pageText}\n`;
            } catch (pageError) {
                // eslint-disable-next-line no-console
                console.warn(`Error processing page ${i}:`, pageError);
                continue;
            }
        }

        if (!fullText.trim()) {
            throw new Error('No text content found in PDF');
        }

        return fullText;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error extracting text from PDF:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to extract text from PDF file: ${errorMessage}`);
    }
}
