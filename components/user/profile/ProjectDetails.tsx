"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ProjectDetails = () => {
    const [projects, setProjects] = useState([
        {
            title: "",
            subtitle: "",
            description: "",
            startDate: "",
            endDate: "",
            liveLink: "",
            platform: "",
        },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...projects]
        updated[index][field as keyof typeof updated[0]] = value
        setProjects(updated)
    }

    const addProject = () => {
        setProjects([
            ...projects,
            {
                title: "",
                subtitle: "",
                description: "",
                startDate: "",
                endDate: "",
                liveLink: "",
                platform: "",
            },
        ])
    }

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        console.log("Projects:", projects)
        // You can send data to your backend or context here
    }

    return (
        <div className="space-y-8 p-6 w-full">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className="border p-4 rounded-lg shadow-sm space-y-4 "
                >
                    <div>
                        <Label className="mb-2">Project Title</Label>
                        <Input
                            placeholder="e.g. Portfolio Website"
                            value={project.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Subtitle</Label>
                        <Input
                            placeholder="e.g. A showcase of my work"
                            value={project.subtitle}
                            onChange={(e) => handleChange(index, "subtitle", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Description</Label>
                        <Textarea
                            placeholder="Detailed project description..."
                            value={project.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[150px]">
                            <Label className="mb-2">Start Date</Label>
                            <Input
                                type="date"
                                value={project.startDate}
                                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <Label className="mb-2">End Date</Label>
                            <Input
                                type="date"
                                value={project.endDate}
                                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Live Link</Label>
                        <Input
                            placeholder="https://..."
                            value={project.liveLink}
                            onChange={(e) => handleChange(index, "liveLink", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Hosted Platform</Label>
                        <Select
                            value={project.platform}
                            onValueChange={(value) => handleChange(index, "platform", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GitHub">GitHub</SelectItem>
                                <SelectItem value="Vercel">Vercel</SelectItem>
                                <SelectItem value="Netlify">Netlify</SelectItem>
                                <SelectItem value="Custom Domain">Custom Domain</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removeProject(index)}
                        disabled={projects.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button onClick={addProject} variant="outline">
                    + Add Project
                </Button>
                <Button onClick={handleSave}>Save Projects</Button>
            </div>
        </div>
    )
}

export default ProjectDetails
