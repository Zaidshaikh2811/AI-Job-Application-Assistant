"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const ProfessionalExperience = () => {
    const [experiences, setExperiences] = useState([
        {
            jobTitle: "",
            employer: "",
            link: "",
            country: "",
            city: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    ])

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        const updated = [...experiences]
        updated[index][name as keyof typeof updated[0]] = value
        setExperiences(updated)
    }

    const addExperience = () => {
        setExperiences((prev) => [
            ...prev,
            {
                jobTitle: "",
                employer: "",
                link: "",
                country: "",
                city: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ])
    }

    const handleSubmit = () => {
        console.log("Professional Experiences:", experiences)
        // Send to backend or update state
    }

    return (
        <div className="space-y-8 p-0 md:p-6 w-full">
            {experiences.map((exp, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Job Title</Label>
                            <Input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleChange(index, e)} placeholder="e.g. Frontend Developer" />
                        </div>
                        <div>
                            <Label className="mb-2">Employer Name</Label>
                            <Input name="employer" value={exp.employer} onChange={(e) => handleChange(index, e)} placeholder="e.g. Google" />
                        </div>
                        <div>
                            <Label className="mb-2">Employer Link</Label>
                            <Input name="link" value={exp.link} onChange={(e) => handleChange(index, e)} placeholder="e.g. https://company.com" />
                        </div>
                        <div>
                            <Label className="mb-2">Country</Label>
                            <Input name="country" value={exp.country} onChange={(e) => handleChange(index, e)} placeholder="e.g. USA" />
                        </div>
                        <div>
                            <Label className="mb-2">City</Label>
                            <Input name="city" value={exp.city} onChange={(e) => handleChange(index, e)} placeholder="e.g. San Francisco" />
                        </div>
                        <div>
                            <Label className="mb-2">Start Date</Label>
                            <Input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <Label className="mb-2">End Date</Label>
                            <Input type="date" name="endDate" value={exp.endDate} onChange={(e) => handleChange(index, e)} />
                        </div>
                    </div>
                    <div>
                        <Label className="mb-2">Professional Description</Label>
                        <Textarea
                            name="description"
                            value={exp.description}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Describe your responsibilities and achievements"
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
            ))}

            <div className="flex gap-4">
                <Button type="button" onClick={addExperience} variant="outline">
                    + Add More Experience
                </Button>
                <Button type="button" onClick={handleSubmit}>
                    Save Experiences
                </Button>
            </div>
        </div>
    )
}

export default ProfessionalExperience
