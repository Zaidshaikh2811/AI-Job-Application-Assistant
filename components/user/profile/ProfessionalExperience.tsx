"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"
import { Plus, Save, Trash2 } from "lucide-react"

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/professional-experiences`

interface ExperienceType {
    _id?: string
    jobTitle: string
    employer: string
    employerLink: string
    country: string
    city: string
    startDate: string
    endDate: string
    description: string
    hide?: boolean
}



const ProfessionalExperience = () => {
    const [experiences, setExperiences] = useState<ExperienceType[]>([])

    const getData = async () => {
        try {
            const res = await axios.get(API_BASE, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
            })
            setExperiences(res.data.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    useEffect(() => {
        getData()

    }, [])

    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        const updated = [...experiences]
        if (name in updated[index]) {
            // @ts-expect-error: We know value is string and fields are string
            updated[index][name] = value
        }
        setExperiences(updated)
    }

    const addExperience = () => {
        setExperiences((prev) => [
            ...prev,
            {
                jobTitle: "",
                employer: "",
                employerLink: "",
                country: "",
                city: "",
                startDate: "",
                endDate: "",
                description: "",
                hide: true,
            },
        ])
    }

    const saveExperience = async (index: number) => {
        const exp = experiences[index]

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        }

        if (exp._id) {
            // Find original version for comparison
            const original = await axios.get(`${API_BASE}/${exp._id}`, { headers })
            const updatedFields: Partial<ExperienceType> = {}

            // Collect only changed fields
            Object.entries(exp).forEach(([key, value]) => {
                const originalValue = original.data[key as keyof ExperienceType]
                if (value !== originalValue) {
                    updatedFields[key as keyof ExperienceType] = value
                }
            })

            if (Object.keys(updatedFields).length > 0) {
                await axios.put(`${API_BASE}/${exp._id}`, updatedFields, { headers })
            }
        } else {
            // Remove empty values
            const cleanedExp: Partial<ExperienceType> = {}
            Object.entries(exp).forEach(([key, value]) => {
                if (value !== "") {
                    cleanedExp[key as keyof ExperienceType] = value
                }
            })

            const res = await axios.post(API_BASE, cleanedExp, { headers })
            const updated = [...experiences]
            updated[index] = res.data
            setExperiences(updated)
        }
    }


    const deleteExperience = async (index: number) => {
        const exp = experiences[index]
        if (exp._id) {
            await axios.delete(`${API_BASE}/${exp._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
            })
        }
        const updated = experiences.filter((_, i) => i !== index)
        setExperiences(updated)
    }

    const toggleVisibility = async (index: number) => {
        const exp = experiences[index]
        if (exp._id) {
            await axios.patch(`${API_BASE}/${exp._id}/toggle-visibility`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
            })
            const updated = [...experiences]
            updated[index].hide = !exp.hide
            setExperiences(updated)
        }
    }

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Professional Experience</h2>
                <Button onClick={addExperience} variant="outline" className="gap-2">
                    <Plus size={16} /> Add Experience
                </Button>
            </div>

            <Accordion type="multiple" className="space-y-4">
                {experiences.map((exp, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border rounded-md"
                    >
                        <AccordionTrigger className="px-4 py-2">
                            {exp.jobTitle || "Untitled Experience"}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Job Title</Label>
                                    <Input
                                        name="jobTitle"
                                        value={exp.jobTitle}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <Label>Employer</Label>
                                    <Input
                                        name="employer"
                                        value={exp.employer}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <Label>Employer Link</Label>
                                    <Input
                                        name="employerLink"
                                        value={exp.employerLink}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <Label>Country</Label>
                                    <Input
                                        name="country"
                                        value={exp.country}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <Label>City</Label>
                                    <Input
                                        name="city"
                                        value={exp.city}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <Label>Start Date</Label>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        value={exp.startDate}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <Label>End Date</Label>
                                    <Input
                                        type="date"
                                        name="endDate"
                                        value={exp.endDate}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Textarea
                                    name="description"
                                    value={exp.description}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex gap-2 items-center">
                                    <Switch
                                        checked={exp.hide}
                                        onCheckedChange={() => toggleVisibility(index)}
                                    />
                                    <span className="text-sm">Visible</span>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => deleteExperience(index)}
                                        className="gap-1"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </Button>
                                    <Button onClick={() => saveExperience(index)} className="gap-1">
                                        <Save size={16} /> Save
                                    </Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default ProfessionalExperience
