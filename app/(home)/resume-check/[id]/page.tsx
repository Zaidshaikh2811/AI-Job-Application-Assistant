import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Alert, AlertDescription } from "@/components/ui/alert";

import {
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Target,

    Briefcase,
    ExternalLink,
    Star,
    Lightbulb,
    Award,
    BookOpen,
    Code,
    User
} from "lucide-react";
import { getResumeCheckResult } from "@/actions/resume";
import React from "react";

export const metadata = {
    title: "Resume Check Results",
    description: "Your personalized resume analysis and improvement suggestions.",
}

interface ResumeCheckData {
    _id: string;
    userId: string;
    jobTitle: string;
    company: string;
    jobUrl: string;
    fitRatio: number;
    keywordMatch: {
        matched: string[];
        missing: string[];
    };
    suggestions: {
        sections: {
            summary: string[];
            experience: string[];
            skills: string[];
            education: string[];
        };
        general: string[];
    };
    skillGaps: string[];
    strengths: string[];
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data?: ResumeCheckData;
}

export default async function ResumeCheckResultsPage({params}: {params: Promise<{id: string}>}) {
    const id = await params.then(p => p.id);

    if (!id) {
        return (
            <div className="container space-y-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Invalid ID provided. Please check the URL and try again.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    try {
        const response: ApiResponse = await getResumeCheckResult(id);

        if (!response.success || !response.data) {
            return (
                <div className="container space-y-6">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {response.message || "Failed to fetch resume check results."}
                        </AlertDescription>
                    </Alert>
                </div>
            );
        }

        const data = response.data;
        const createdDate = new Date(data.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Calculate fit ratio color
        const getFitRatioColor = (ratio: number) => {
            if (ratio >= 80) return "text-green-600";
            if (ratio >= 60) return "text-yellow-600";
            return "text-red-600";
        };

        const getFitRatioBg = (ratio: number) => {
            if (ratio >= 80) return "bg-green-100 border-green-200";
            if (ratio >= 60) return "bg-yellow-100 border-yellow-200";
            return "bg-red-100 border-red-200";
        };


        const ProgressBar: React.FC<{ value: number; className?: string }> = ({ value, className = "" }) => (
            <div className={`w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 ${className}`}>
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                ></div>
            </div>
        );

        return (
            <div className="container space-y-6 py-6">
                {/* Header */}
                <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Award className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight">Resume Analysis Results</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Here&#39;s your personalized resume analysis with actionable insights to improve your job application success.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Analysis completed on {createdDate}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Job Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Job Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Position</h4>
                                    <p className="font-medium">{data.jobTitle}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Company</h4>
                                    <p className="font-medium">{data.company}</p>
                                </div>
                                {data.jobUrl && (
                                    <div className="md:col-span-2">
                                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Job Posting</h4>
                                        <a
                                            href={data.jobUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline flex items-center gap-1"
                                        >
                                            View Original Job Posting
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Fit Ratio */}
                    <Card className={getFitRatioBg(data.fitRatio)}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Overall Fit Score
                            </CardTitle>
                            <CardDescription>
                                How well your resume matches the job requirements
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Match Score</span>
                                    <span className={`text-2xl font-bold ${getFitRatioColor(data.fitRatio)}`}>
                                        {data.fitRatio}%
                                    </span>
                                </div>
                                <ProgressBar value={check.fitRatio} />
                                <div className="text-sm text-muted-foreground">
                                    {data.fitRatio >= 80 && "Excellent match! Your resume aligns very well with the job requirements."}
                                    {data.fitRatio >= 60 && data.fitRatio < 80 && "Good match! Consider the suggestions below to improve your score."}
                                    {data.fitRatio < 60 && "There's room for improvement. Focus on the recommendations to better match the job requirements."}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Keyword Analysis */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code className="h-5 w-5" />
                                Keyword Analysis
                            </CardTitle>
                            <CardDescription>
                                Keywords found in your resume vs. job requirements
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Matched Keywords */}
                            {data.keywordMatch.matched.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm text-green-700 mb-2 flex items-center gap-1">
                                        <CheckCircle className="h-4 w-4" />
                                        Matched Keywords ({data.keywordMatch.matched.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {data.keywordMatch.matched.map((keyword, index) => (
                                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Missing Keywords */}
                            {data.keywordMatch.missing.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm text-red-700 mb-2 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        Missing Keywords ({data.keywordMatch.missing.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {data.keywordMatch.missing.map((keyword, index) => (
                                            <Badge key={index} variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Consider incorporating these keywords naturally into your resume to improve your match score.
                                    </p>
                                </div>
                            )}

                            {data.keywordMatch.matched.length === 0 && data.keywordMatch.missing.length === 0 && (
                                <p className="text-sm text-muted-foreground">No specific keyword analysis available for this position.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Strengths */}
                    {data.strengths.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500" />
                                    Your Strengths
                                </CardTitle>
                                <CardDescription>
                                    What&#39;s working well in your resume
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {data.strengths.map((strength, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Skill Gaps */}
                    {data.skillGaps.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-blue-500" />
                                    Skill Gaps to Address
                                </CardTitle>
                                <CardDescription>
                                    Skills mentioned in the job posting that could strengthen your profile
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {data.skillGaps.map((gap, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{gap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Suggestions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-yellow-500" />
                                Improvement Suggestions
                            </CardTitle>
                            <CardDescription>
                                Actionable recommendations to enhance your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Section-specific suggestions */}
                            {data.suggestions.sections.summary.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        Summary Section
                                    </h4>
                                    <ul className="space-y-2 ml-5">
                                        {data.suggestions.sections.summary.map((suggestion, index) => (
                                            <li key={index} className="text-sm text-muted-foreground">
                                                • {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data.suggestions.sections.experience.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" />
                                        Experience Section
                                    </h4>
                                    <ul className="space-y-2 ml-5">
                                        {data.suggestions.sections.experience.map((suggestion, index) => (
                                            <li key={index} className="text-sm text-muted-foreground">
                                                • {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data.suggestions.sections.skills.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                                        <Code className="h-4 w-4" />
                                        Skills Section
                                    </h4>
                                    <ul className="space-y-2 ml-5">
                                        {data.suggestions.sections.skills.map((suggestion, index) => (
                                            <li key={index} className="text-sm text-muted-foreground">
                                                • {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data.suggestions.sections.education.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        Education Section
                                    </h4>
                                    <ul className="space-y-2 ml-5">
                                        {data.suggestions.sections.education.map((suggestion, index) => (
                                            <li key={index} className="text-sm text-muted-foreground">
                                                • {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* General suggestions */}
                            {data.suggestions.general.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                                        <Lightbulb className="h-4 w-4" />
                                        General Recommendations
                                    </h4>
                                    <ul className="space-y-2 ml-5">
                                        {data.suggestions.general.map((suggestion, index) => (
                                            <li key={index} className="text-sm text-muted-foreground">
                                                • {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* No suggestions */}
                            {Object.values(data.suggestions.sections).every(arr => arr.length === 0) &&
                                data.suggestions.general.length === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        Great work! No specific improvement suggestions at this time. Your resume appears to be well-aligned with the job requirements.
                                    </p>
                                )}
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Next Steps:</strong> Use these insights to update your resume, then consider running another analysis to see your improved score. Remember to tailor your resume for each specific job application.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );

    } catch (error) {
        console.error("Error fetching resume check results:", error);
        return (
            <div className="container space-y-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        An error occurred while fetching your resume analysis results. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }
}