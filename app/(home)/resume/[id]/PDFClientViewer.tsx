// components/PDFClientViewer.tsx
'use client';

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import type { DocumentProps } from '@react-pdf/renderer';

interface PDFClientViewerProps {
    children: React.ReactElement<DocumentProps>;
}

const PDFClientViewer = ({ children }: PDFClientViewerProps) => {
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            {children}
        </PDFViewer>
    );
};

export default PDFClientViewer;
