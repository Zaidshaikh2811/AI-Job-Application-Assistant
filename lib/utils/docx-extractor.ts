// lib/utils/docx-extractor.ts
import mammoth from 'mammoth';

/**
 * Extracts text from a DOCX file
 * @param file The DOCX file to extract text from
 * @returns Promise resolving to the extracted text
 */
export async function extractTextFromDOCX(file: File): Promise<string> {
    try {
        // Convert the file to an ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Extract text using mammoth
        const result = await mammoth.extractRawText({ arrayBuffer });

        return result.value;
    } catch (error) {
        console.error('Error extracting text from DOCX:', error);
        throw new Error('Failed to extract text from DOCX file');
    }
}