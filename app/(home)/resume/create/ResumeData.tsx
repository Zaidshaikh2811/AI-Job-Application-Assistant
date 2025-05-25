import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, Eye, EyeOff, FileText, ArrowLeft } from 'lucide-react';

interface ResumeDataProps {
    data: unknown; // Replace 'any' with a more specific type if available
    onBack: () => void;
}

const ResumeData: React.FC<ResumeDataProps> = ({ data, onBack }) => {
    const [isRawView, setIsRawView] = useState(false);
    const [copied, setCopied] = useState(false);

    // Function to copy JSON to clipboard
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Function to download JSON as file
    const downloadJSON = () => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Recursive component to render JSON structure
    const JsonRenderer = ({ obj, level = 0 }: { obj: unknown; level?: number }) => {
        if (obj === null) return <span className="text-gray-500">null</span>;
        if (obj === undefined) return <span className="text-gray-500">undefined</span>;

        if (typeof obj === 'string') {
            return <span className="text-green-600 dark:text-green-400">&quot;{obj}&quot;</span>;
        }

        if (typeof obj === 'number') {
            return <span className="text-blue-600 dark:text-blue-400">{obj}</span>;
        }

        if (typeof obj === 'boolean') {
            return <span className="text-purple-600 dark:text-purple-400">{obj.toString()}</span>;
        }

        if (Array.isArray(obj)) {
            if (obj.length === 0) return <span className="text-gray-500">[]</span>;

            return (
                <div className="ml-4">
                    <span className="text-gray-600 dark:text-gray-400">[</span>
                    {obj.map((item, index) => (
                        <div key={index} className="ml-4 border-l border-gray-200 dark:border-gray-600 pl-4">
                            <div className="flex items-start gap-2">
                                <span className="text-gray-500 text-sm">{index}:</span>
                                <JsonRenderer obj={item} level={level + 1} />
                                {index < obj.length - 1 && <span className="text-gray-500">,</span>}
                            </div>
                        </div>
                    ))}
                    <span className="text-gray-600 dark:text-gray-400">]</span>
                </div>
            );
        }

        if (typeof obj === 'object') {
            // Type guard for object with string keys
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                const keys = Object.keys(obj as Record<string, unknown>);
                if (keys.length === 0) return <span className="text-gray-500">{ }</span>;

                return (
                    <div className="ml-4">
                        <span className="text-gray-600 dark:text-gray-400">{'{'}</span>
                        {keys.map((key, index) => (
                            <div key={key} className="ml-4 border-l border-gray-200 dark:border-gray-600 pl-4 py-1">
                                <div className="flex items-start gap-2">
                                    <span className="text-orange-600 dark:text-orange-400 font-medium">&quot;{key}&quot;:</span>
                                    <JsonRenderer obj={(obj as Record<string, unknown>)[key]} level={level + 1} />
                                    {index < keys.length - 1 && <span className="text-gray-500">,</span>}
                                </div>
                            </div>
                        ))}
                        <span className="text-gray-600 dark:text-gray-400">{'}'}</span>
                    </div>
                );
            }
        }

        return <span>{String(obj)}</span>;
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onBack}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Form
                        </Button>
                        <div className="flex items-center gap-2">
                            <FileText className="h-6 w-6 text-primary" />
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Generated Resume Data
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsRawView(!isRawView)}
                            className="flex items-center gap-2"
                        >
                            {isRawView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            {isRawView ? 'Formatted View' : 'Raw JSON'}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="flex items-center gap-2"
                        >
                            <Copy className="h-4 w-4" />
                            {copied ? 'Copied!' : 'Copy JSON'}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={downloadJSON}
                            className="flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <Card className="shadow-xl border-0 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Resume Data Response
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isRawView ? (
                            <div className="relative">
                                <pre className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg overflow-auto max-h-96 text-sm">
                                    <code className="language-json">
                                        {JSON.stringify(data, null, 2)}
                                    </code>
                                </pre>
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg overflow-auto max-h-96">
                                <div className="font-mono text-sm">
                                    <JsonRenderer obj={data} />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Data Summary */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Object.keys(data || {}).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Top-level Properties
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {JSON.stringify(data).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Characters
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {(new Blob([JSON.stringify(data)]).size / 1024).toFixed(2)} KB
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Data Size
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResumeData;