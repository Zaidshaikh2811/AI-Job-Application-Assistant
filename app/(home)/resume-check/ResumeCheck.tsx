'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import React, {  useState} from "react";
import { Separator } from "@/components/ui/separator";
import { saveResumeCheck } from "@/actions/resume";

type LoadingState = 'idle' | 'analyzing' | 'saving' | 'success';
type ErrorType = 'file' | 'analysis' | 'save' | 'validation' | 'network';

interface ErrorState {
    type: ErrorType;
    message: string;
}

export default function ResumeCheckPage() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");

    // Loading and error states
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [error, setError] = useState<ErrorState | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>("");



    // File validation
    const validateFile = (file: File): boolean => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

        if (file.size > maxSize) {
            setError({
                type: 'file',
                message: 'File size must be less than 5MB. Please choose a smaller file.'
            });
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            setError({
                type: 'file',
                message: 'Invalid file type. Please upload a PDF, DOCX, or TXT file.'
            });
            return false;
        }

        return true;
    };

    // Form validation
    const validateForm = (): boolean => {
        if (!resumeFile) {
            setError({
                type: 'validation',
                message: 'Please upload a resume file before submitting.'
            });
            return false;
        }

        if (!jobDescription.trim() && !jobUrl.trim()) {
            setError({
                type: 'validation',
                message: 'Please provide either a job description or job URL for analysis.'
            });
            return false;
        }

        if (jobUrl && !isValidUrl(jobUrl)) {
            setError({
                type: 'validation',
                message: 'Please enter a valid URL format (e.g., https://example.com/job)'
            });
            return false;
        }

        return true;
    };

    const isValidUrl = (string: string): boolean => {
        try {
            new URL(string);
            return true;
        } catch   {
            return false;
        }
    };

    const clearError = () => {
        setError(null);
        setSuccessMessage("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearError();

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (validateFile(file)) {
                setResumeFile(file);
            } else {
                // Clear the input
                e.target.value = '';
                setResumeFile(null);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            // Step 1: Analyze resume
            const { checkResumeMatch } = await import("@/actions/check-resume");
            setLoadingState('analyzing');

            const analysisResult = await checkResumeMatch(
                resumeFile!,
                jobDescription,
                jobTitle,
                company,
                jobUrl
            );

            if (!analysisResult) {
                throw new Error('No analysis result returned from the service');
            }

            // Step 2: Save results
            setLoadingState('saving');

            const saveResult = await saveResumeCheck({
                ...analysisResult,
                jobTitle,
                company,
                jobUrl
            });

            if (!saveResult) {
                throw new Error('Failed to save analysis results');
            }

            // Success
            setLoadingState('success');
            setSuccessMessage('Resume analysis completed successfully! Check your dashboard for detailed results.');


            // Reset loading state after showing success
            setTimeout(() => {
                setLoadingState('idle');
            }, 3000);

        } catch (error : unknown) {
            console.error("Resume analysis error:", error);



            setLoadingState('idle');
        }
    };

    const clearForm = () => {
        setResumeFile(null);
        setJobDescription("");
        setJobUrl("");
        setJobTitle("");
        setCompany("");
        clearError();
        setLoadingState('idle');

        // Clear file input
        const fileInput = document.querySelector<HTMLInputElement>('#resume');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const getLoadingText = (): string => {
        switch (loadingState) {
            case 'analyzing':
                return 'Analyzing your resume...';
            case 'saving':
                return 'Saving results...';
            case 'success':
                return 'Complete!';
            default:
                return 'Analyze Resume';
        }
    };

    const isLoading = loadingState === 'analyzing' || loadingState === 'saving';
    const isSuccess = loadingState === 'success';

    return (
        <div className="container space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Resume Check</h1>
                <p className="text-muted-foreground">
                    Upload your resume and a job description to get personalized improvement suggestions.
                </p>
            </div>

            <Card className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Resume Analysis</CardTitle>
                        <CardDescription>
                            We&#39;ll analyze your resume against the job requirements and provide tailored feedback.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Error Alert */}
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {error.message}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Success Alert */}
                        {successMessage && (
                            <Alert className="border-green-500 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    {successMessage}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Resume Upload Section */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <h3 className="text-lg font-semibold">Resume Upload</h3>
                                <span className="text-red-500 ml-1">*</span>
                            </div>

                            <div className="grid w-full gap-1.5">
                                <div
                                    className={`border-2 border-dashed rounded-md p-8 text-center transition-colors cursor-pointer 
                                        ${resumeFile
                                        ? "border-green-500/50 bg-green-50/20"
                                        : error?.type === 'file'
                                            ? "border-red-500/50 bg-red-50/20"
                                            : "border-muted-foreground/25 hover:bg-muted/50"
                                    }
                                        ${isLoading ? "pointer-events-none opacity-50" : ""}
                                    `}
                                    onClick={() => !isLoading && document.querySelector<HTMLInputElement>('#resume')?.click()}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className={`h-8 w-8 ${
                                            resumeFile
                                                ? "text-green-500"
                                                : error?.type === 'file'
                                                    ? "text-red-500"
                                                    : "text-muted-foreground"
                                        }`} />
                                        {resumeFile ? (
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {resumeFile.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {Math.round(resumeFile.size / 1024)} KB
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm font-medium">
                                                    Drag and drop your resume or click to browse
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Supports PDF, DOCX, or TXT (max 5MB)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <Input
                                        id="resume"
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,.docx,.txt"
                                        onChange={handleFileChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Job Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Job Details</h3>

                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="job-url">Job Posting URL (Optional)</Label>
                                <Input
                                    id="job-url"
                                    type="url"
                                    placeholder="https://example.com/job-posting"
                                    value={jobUrl}
                                    onChange={(e) => {
                                        setJobUrl(e.target.value);
                                        if (error?.type === 'validation') clearError();
                                    }}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="job-description">Job Description</Label>
                                <Textarea
                                    id="job-description"
                                    placeholder="Paste the job description here..."
                                    className="min-h-[150px]"
                                    value={jobDescription}
                                    onChange={(e) => {
                                        setJobDescription(e.target.value);
                                        if (error?.type === 'validation') clearError();
                                    }}
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Please provide either a job description or URL (or both) for best results
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="job-title">Job Title</Label>
                                    <Input
                                        id="job-title"
                                        placeholder="Senior Software Engineer"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        placeholder="Example Corp"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Loading Progress */}
                        {isLoading && (
                            <div className="bg-muted/50 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                    <div>
                                        <p className="font-medium">{getLoadingText()}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {loadingState === 'analyzing'
                                                ? 'This may take a few moments...'
                                                : 'Almost done...'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={clearForm}
                            disabled={isLoading}
                        >
                            Clear
                        </Button>
                        <Button
                            type="submit"
                            disabled={!resumeFile || isLoading}
                            className={isSuccess ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSuccess && <CheckCircle className="mr-2 h-4 w-4" />}
                            {getLoadingText()}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}