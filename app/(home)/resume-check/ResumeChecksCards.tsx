"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Calendar, Building2, Target, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

// Type definitions
interface KeywordMatch {
    matched: string[];
    missing: string[];
}

interface ResumeCheck {
    _id: string;
    jobTitle?: string;
    company?: string;
    createdAt: string;
    fitRatio: number;
    keywordMatch: KeywordMatch;
    skillGaps: string[];
    jobUrl?: string;
}

interface ResumeChecksCardsProps {
    data: ResumeCheck[];
    totalResults: number;
}

// Component that accepts props from the server component
const ResumeChecksCards: React.FC<ResumeChecksCardsProps> = ({ data, totalResults }) => {
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFitRatioBadgeVariant = (ratio: number): "default" | "secondary" | "destructive" => {
        if (ratio >= 80) return 'default';
        if (ratio >= 60) return 'secondary';
        return 'destructive';
    };

    const handleCardClick = (id: string): void => {
        // For Next.js router
        // router.push(`/resume-checks/${id}`);

        // For regular navigation (replace with your routing logic)
        window.location.href = `/resume-check/${id}`;

        // Or you can use Next.js Link component in your actual implementation
        console.log(`Navigating to resume check: ${id}`);
    };

    // Add safety check for data
    if (!data) {
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="text-center py-12">
                        <Target className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Loading resume checks...
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Resume Checks
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {totalResults} resume analysis results found
                    </p>
                </div>

                {/* Resume Check Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data.map((check) => (
                        <Card
                            key={check._id}
                            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
                            onClick={() => handleCardClick(check._id)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {check.jobTitle || "Job Title"}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 text-sm">
                                            <Building2 className="h-4 w-4" />
                                            {check.company || "Company"}
                                            <span className="text-gray-400">•</span>
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(check.createdAt)}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={getFitRatioBadgeVariant(check.fitRatio)} className="text-sm">
                                            {check.fitRatio}% Match
                                        </Badge>
                                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Fit Ratio Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Compatibility Score</span>
                                        <span>{check.fitRatio}%</span>
                                    </div>
                                    <Progress value={check.fitRatio} className="h-2" />
                                </div>

                                {/* Quick Stats Row */}
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                        <span>{check.keywordMatch?.matched?.length || 0} matched keywords</span>
                                    </div>
                                    {check.keywordMatch?.missing && check.keywordMatch.missing.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <AlertCircle className="h-3 w-3 text-orange-500" />
                                            <span>{check.keywordMatch.missing.length} missing</span>
                                        </div>
                                    )}
                                    {check.jobUrl && (
                                        <div className="flex items-center gap-1">
                                            <ExternalLink className="h-3 w-3" />
                                            <span>Job link available</span>
                                        </div>
                                    )}
                                </div>

                                {/* Key Matched Skills Preview */}
                                {check.keywordMatch?.matched && check.keywordMatch.matched.length > 0 && (
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Top Matches:
                                        </span>
                                        <div className="flex flex-wrap gap-1">
                                            {check.keywordMatch.matched.slice(0, 3).map((keyword, index) => (
                                                <Badge
                                                    key={`${check._id}-matched-${index}`}
                                                    variant="secondary"
                                                    className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                >
                                                    {keyword}
                                                </Badge>
                                            ))}
                                            {check.keywordMatch.matched.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{check.keywordMatch.matched.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Skill Gaps Preview */}
                                {check.skillGaps && check.skillGaps.length > 0 && (
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-red-700 dark:text-red-400">
                                            Areas for Improvement:
                                        </span>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {check.skillGaps.slice(0, 2).join(", ")}
                                            {check.skillGaps.length > 2 && ` and ${check.skillGaps.length - 2} more...`}
                                        </div>
                                    </div>
                                )}

                                {/* Click hint */}
                                <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                                    Click to view detailed analysis and suggestions
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {data.length === 0 && (
                    <div className="text-center py-12">
                        <Target className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                            No resume checks found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Start by analyzing your resume against job descriptions.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeChecksCards;