"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
    ExternalLink,
    Calendar,
    Building2,
    Target,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    ChevronsLeft,
    ChevronsRight
} from 'lucide-react';
import { usePagination } from "./PaginationControls"

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
    totalPages?: number;
    currentPage?: number;
    isLoading?: boolean;
}

const ResumeChecksCards: React.FC<ResumeChecksCardsProps> = ({
                                                                 data = [],
                                                                 totalResults = 0,
                                                                 totalPages = 1,
                                                                 currentPage = 1,
                                                                 isLoading = false,
                                                             }) => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const { handlePageChange } = usePagination();

    const formatDate = useCallback((dateString: string): string => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    }, []);

    const getFitRatioBadgeVariant = useCallback((ratio: number): "default" | "secondary" | "destructive" => {
        if (ratio >= 80) return 'default';
        if (ratio >= 60) return 'secondary';
        return 'destructive';
    }, []);

    const handleCardClick = useCallback((id: string): void => {
        setSelectedCard(id);
        window.location.href = `/resume-check/${id}`;
        console.log(`Navigating to resume check: ${id}`);
    }, []);

    // Pagination component
    const PaginationControls: React.FC = () => {
        if (totalPages <= 1) return null;

        const getVisiblePages = (): (number | string)[] => {
            const delta = 2;
            const range: (number | string)[] = [];
            const rangeWithDots: (number | string)[] = [];

            for (let i = Math.max(2, currentPage - delta);
                 i <= Math.min(totalPages - 1, currentPage + delta);
                 i++) {
                range.push(i);
            }

            if (currentPage - delta > 2) {
                rangeWithDots.push(1, '...');
            } else {
                rangeWithDots.push(1);
            }

            rangeWithDots.push(...range);

            if (currentPage + delta < totalPages - 1) {
                rangeWithDots.push('...', totalPages);
            } else if (totalPages > 1) {
                rangeWithDots.push(totalPages);
            }

            return rangeWithDots;
        };

        const visiblePages = getVisiblePages();

        return (
            <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1 || isLoading}
                    className="hidden sm:flex"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-1">
                    {visiblePages.map((page, index) => (
                        <React.Fragment key={`page-${index}`}>
                            {page === '...' ? (
                                <span className="px-3 py-2 text-sm text-gray-500">...</span>
                            ) : (
                                <Button
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(page as number)}
                                    disabled={isLoading}
                                    className="min-w-[40px]"
                                >
                                    {page}
                                </Button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages || isLoading}
                    className="hidden sm:flex"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="text-center py-12">
                        <Target className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Loading resume checks...
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    // Handle invalid data
    if (!Array.isArray(data)) {
        console.error('Invalid data format received:', data);
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="text-center py-12">
                        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Error loading data
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Refresh Page
                        </button>
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
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 dark:text-gray-400">
                            {totalResults} resume analysis results found
                        </p>
                        {totalPages > 1 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Page {currentPage} of {totalPages}
                            </p>
                        )}
                    </div>
                </div>

                {/* Resume Check Cards */}
                {data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {data.map((check) => {
                                // Validate individual check item
                                if (!check || !check._id) {
                                    console.warn('Invalid check item:', check);
                                    return null;
                                }

                                return (
                                    <Card
                                        key={check._id}
                                        className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group ${
                                            selectedCard === check._id ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                        onClick={() => handleCardClick(check._id)}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1 flex-1">
                                                    <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {check.jobTitle || "Job Title"}
                                                    </CardTitle>
                                                    <CardDescription className="flex items-center gap-2 text-sm">
                                                        <Building2 className="h-4 w-4 flex-shrink-0" />
                                                        <span className="truncate">{check.company || "Company"}</span>
                                                        <span className="text-gray-400">•</span>
                                                        <Calendar className="h-4 w-4 flex-shrink-0" />
                                                        <span className="text-xs">{formatDate(check.createdAt)}</span>
                                                    </CardDescription>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
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
                                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 flex-wrap gap-2">
                                                <div className="flex items-center gap-1">
                                                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                                    <span>{check.keywordMatch?.matched?.length || 0} matched</span>
                                                </div>
                                                {check.keywordMatch?.missing && check.keywordMatch.missing.length > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        <AlertCircle className="h-3 w-3 text-orange-500 flex-shrink-0" />
                                                        <span>{check.keywordMatch.missing.length} missing</span>
                                                    </div>
                                                )}
                                                {check.jobUrl && check.jobUrl.trim() !== '' && (
                                                    <div className="flex items-center gap-1">
                                                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                                        <span>Job link</span>
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
                                );
                            }).filter(Boolean)}
                        </div>

                        {/* Pagination Controls */}
                        <PaginationControls />
                    </>
                ) : (
                    /* Empty State */
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