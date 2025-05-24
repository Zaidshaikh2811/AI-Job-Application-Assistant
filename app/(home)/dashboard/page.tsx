"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { MagicCard } from "@/components/magicui/magic-card"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { TextAnimate } from "@/components/magicui/text-animate"

type JobStatus = "Applied" | "Interview" | "Rejected" | "Offer"

interface Job {
    id: string
    company: string
    role: string
    matchPercentage: number
    status: JobStatus
}

export default function DashboardPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        // Fetch jobs from API (mocked for now)
        setJobs([
            {
                id: "1",
                company: "Google",
                role: "Frontend Engineer",
                matchPercentage: 88,
                status: "Interview",
            },
            {
                id: "2",
                company: "Microsoft",
                role: "Backend Developer",
                matchPercentage: 73,
                status: "Applied",
            },
        ])
    }, [])

    const filteredJobs = jobs.filter(
        (job) =>
            job.role.toLowerCase().includes(search.toLowerCase()) ||
            job.status.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="relative w-full overflow-hidden min-h-screen bg-background">
            {/* Background Pattern */}
            <GridPattern
                className="fixed inset-0 w-full h-full text-gray-300 opacity-20 z-0 pointer-events-none"
            />
            <div className="relative z-10 p-6 max-w-6xl mx-auto space-y-10  ">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-4xl font-bold tracking-tight font-display text-primary">
                        <TextAnimate animation="blurInUp" by="character" once>
                            Job Dashboard
                        </TextAnimate>
                    </h1>
                    <Button className="relative flex gap-2 text-primary bg-transparent hover:bg-primary/10 transition">
                        <BorderBeam />
                        <Plus className="size-4" />
                        Add New Job
                    </Button>
                </div>

                {/* Search Input */}
                <div>
                    <Input
                        placeholder="Search by role or status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                {/* Job Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                        <MagicCard
                            key={job.id}
                            gradientOpacity={0.15}
                            className="rounded-2xl shadow-md"
                        >
                            <CardContent className="p-5 space-y-3">
                                <h2 className="text-xl font-semibold">{job.company}</h2>
                                <p className="text-muted-foreground">{job.role}</p>
                                <div className="flex justify-between items-center pt-2">
                                    <Badge variant="secondary">
                                        Match: {job.matchPercentage}%
                                    </Badge>
                                    <Badge>{job.status}</Badge>
                                </div>
                            </CardContent>
                        </MagicCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
