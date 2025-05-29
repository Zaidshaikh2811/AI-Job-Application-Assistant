"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Loader2, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { MagicCard } from "@/components/magicui/magic-card"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { TextAnimate } from "@/components/magicui/text-animate"
import { getReumses } from "@/actions/resume"
import Link from "next/link"
import { toast } from "sonner"



interface Resume {
    _id: string
    userId: string
    template: string
    atsScore: number
    summary?: string
    metaData?: {
        jobTitle: string
        jobDescription: string
        targetIndustry: string
        experienceLevel?: string
    }
    skills?: {
        technical: string[]
        soft: string[]
    }
    contactInformation?: {
        name: string
        email: string
        phone: string
        linkedin: string
    }
    createdAt: string
    updatedAt: string
}

const ITEMS_PER_PAGE = 6

export default function DashboardPage() {
    const [resumes, setResumes] = useState<Resume[]>([])
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)


    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setCurrentPage(1) // Reset to first page when search changes
        }, 300)

        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(async () => {
        try {
            setLoading(true)

            const response = await getReumses()
            console.log("Response:", response)

            if (response.success && response.data) {
                setResumes(response.data)
                toast.success("Data loaded successfully")
            } else {
                const errorMessage = response.message || "Failed to load data"
                toast.error(errorMessage)
            }
        } catch (err) {
            console.error("Error loading data:", err)
            toast.error("Failed to load data")
        } finally {
            setLoading(false)
        }
    }, [toast])

    // Filter resumes based on debounced search
    const filteredResumes = useMemo(() => {
        if (!debouncedSearch.trim()) return resumes

        return resumes.filter((resume) => {
            const searchLower = debouncedSearch.toLowerCase()
            return (
                resume.template.toLowerCase().includes(searchLower) ||
                resume.contactInformation?.name.toLowerCase().includes(searchLower) ||
                resume.metaData?.targetIndustry?.toLowerCase().includes(searchLower) ||
                resume.metaData?.jobTitle?.toLowerCase().includes(searchLower) ||
                resume.skills?.technical.some(skill =>
                    skill.toLowerCase().includes(searchLower)
                ) ||
                resume.skills?.soft.some(skill =>
                    skill.toLowerCase().includes(searchLower)
                )
            )
        })
    }, [resumes, debouncedSearch])

    // Pagination logic
    const totalPages = Math.ceil(filteredResumes.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentResumes = filteredResumes.slice(startIndex, endIndex)

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const getATSScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600"
        if (score >= 60) return "text-yellow-600"
        return "text-red-600"
    }

    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            const halfVisible = Math.floor(maxVisiblePages / 2)
            let start = Math.max(1, currentPage - halfVisible)
            const end = Math.min(totalPages, start + maxVisiblePages - 1)

            if (end - start < maxVisiblePages - 1) {
                start = Math.max(1, end - maxVisiblePages + 1)
            }

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
        }

        return pages
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative w-full overflow-hidden min-h-screen bg-background">
            {/* Background Pattern */}
            <GridPattern
                className="fixed inset-0 w-full h-full text-gray-300 opacity-20 z-0 pointer-events-none"
            />

            <div className="relative z-10 p-6 max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight font-display text-primary">
                            <TextAnimate animation="blurInUp" by="character" once>
                                Career Dashboard
                            </TextAnimate>
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your resumes and job applications
                        </p>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MagicCard gradientOpacity={0.1} className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{resumes.length}</div>
                            <div className="text-sm text-muted-foreground">Total Resumes</div>
                        </div>
                    </MagicCard>
                    <MagicCard gradientOpacity={0.1} className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {Math.round(resumes.reduce((acc, resume) => acc + resume.atsScore, 0) / resumes.length) || 0}%
                            </div>
                            <div className="text-sm text-muted-foreground">Avg ATS Score</div>
                        </div>
                    </MagicCard>
                    <MagicCard gradientOpacity={0.1} className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {resumes.filter(r => r.atsScore >= 80).length}
                            </div>
                            <div className="text-sm text-muted-foreground">High ATS Score</div>
                        </div>
                    </MagicCard>
                    <MagicCard gradientOpacity={0.1} className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {filteredResumes.length}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {debouncedSearch ? 'Search Results' : 'Total Shown'}
                            </div>
                        </div>
                    </MagicCard>
                </div>

                {/* Search Input */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search resumes, skills, industry..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {debouncedSearch && (
                        <div className="text-sm text-muted-foreground">
                            {filteredResumes.length} result{filteredResumes.length !== 1 ? 's' : ''} found
                        </div>
                    )}
                </div>

                {/* Resume Cards */}
                {currentResumes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-muted-foreground mb-4">
                            {resumes.length === 0
                                ? "No resumes found"
                                : debouncedSearch
                                    ? "No resumes match your search"
                                    : "No resumes to display"
                            }
                        </div>
                        {debouncedSearch && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearch("")
                                    setCurrentPage(1)
                                }}
                            >
                                Clear Search
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentResumes.map((resume) => (
                                <Link href={`/resume/${resume._id}`} key={resume._id}>
                                    <MagicCard
                                        gradientOpacity={0.15}
                                        className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <CardContent className="p-5 space-y-4">
                                            <div>
                                                <h2 className="text-xl font-semibold text-primary">
                                                    {resume.contactInformation?.name || 'Unnamed Resume'}
                                                </h2>
                                                <p className="text-muted-foreground">{resume.template}</p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Target: {resume.metaData?.targetIndustry || 'General'}
                                                </p>
                                                {resume.metaData?.jobTitle && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Role: {resume.metaData.jobTitle}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <Badge variant="secondary">
                                                    <span className={getATSScoreColor(resume.atsScore)}>
                                                        ATS Score: {resume.atsScore}%
                                                    </span>
                                                </Badge>
                                                <Badge variant="outline">
                                                    {resume.metaData?.experienceLevel || 'Entry'}
                                                </Badge>
                                            </div>

                                            {resume.skills && (
                                                <div className="space-y-2">
                                                    <div className="text-xs text-muted-foreground">
                                                        Tech Skills: {resume.skills.technical?.slice(0, 3).join(', ')}
                                                        {resume.skills.technical?.length > 3 && '...'}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="size-3" />
                                                Created: {new Date(resume.createdAt).toLocaleDateString()}
                                            </div>
                                        </CardContent>
                                    </MagicCard>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center space-x-2 mt-8">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                <div className="flex space-x-1">
                                    {getPageNumbers().map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => goToPage(page)}
                                            className="min-w-[40px]"
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        {/* Pagination Info */}
                        <div className="text-center text-sm text-muted-foreground">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredResumes.length)} of {filteredResumes.length} resume{filteredResumes.length !== 1 ? 's' : ''}
                            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}