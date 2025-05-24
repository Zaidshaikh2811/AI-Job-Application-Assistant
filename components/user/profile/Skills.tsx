"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/skills`

const skillLevels = ["BEGINNER", "AMATEUR", "COMPETENT", "PROFICIENT", "EXPERT"]

interface SkillType {
    _id?: string
    name: string
    level: string
    hide?: boolean
}

const Skills = () => {
    const [skills, setSkills] = useState<SkillType[]>([])

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get(API_BASE, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                    },
                })
                setSkills(res.data.data)
            } catch (error) {
                console.error("Failed to fetch skills:", error)
            }
        }
        fetchSkills()
    }, [])

    const handleChange = <K extends keyof SkillType>(index: number, field: K, value: SkillType[K]) => {
        const updated = [...skills]
        updated[index][field] = value
        setSkills(updated)
    }

    const addSkill = () => {
        setSkills([...skills, { name: "", level: "", hide: true }])
    }

    const removeSkill = async (index: number) => {
        const skill = skills[index]
        if (skill._id) {
            try {
                await axios.delete(`${API_BASE}/${skill._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                    },
                })
            } catch (error) {
                console.error("Failed to delete skill:", error)
                return
            }
        }
        setSkills(skills.filter((_, i) => i !== index))
    }

    const saveSkill = async (index: number) => {
        const skill = skills[index]
        try {
            if (skill._id) {
                const res = await axios.patch(`${API_BASE}/${skill._id}`, skill, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                    },
                })
                const updated = [...skills]
                updated[index] = res.data
                setSkills(updated)
            } else {
                const res = await axios.post(API_BASE, skill, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                    },
                })
                const updated = [...skills]
                updated[index] = res.data
                setSkills(updated)
            }
        } catch (error) {
            console.error("Failed to save skill:", error)
        }
    }

    const toggleVisibility = async (index: number) => {
        const skill = skills[index]
        if (!skill._id) return

        try {
            await axios.patch(`${API_BASE}/${skill._id}/toggle-visibility`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
            })
            const updated = [...skills]
            updated[index].hide = !skill.hide
            setSkills(updated)
        } catch (error) {
            console.error("Failed to toggle visibility:", error)
        }
    }

    return (
        <div className="space-y-8 w-full px-4 md:px-6 py-6">
            <Accordion type="multiple" className="space-y-4">
                {skills.map((skill, index) => (
                    <AccordionItem key={skill._id || index} value={`skill-${index}`} className="border rounded-md">
                        <AccordionTrigger className="text-left px-4 py-3 text-base font-medium">
                            {skill.name || `Skill ${index + 1}`}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 space-y-4 bg-muted/50 rounded-b-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="mb-1">Skill</Label>
                                    <Input
                                        placeholder="e.g. React"
                                        value={skill.name}
                                        onChange={(e) => handleChange(index, "name", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="mb-1">Skill Level</Label>
                                    <Select
                                        value={skill.level}
                                        onValueChange={(value) => handleChange(index, "level", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {skillLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => toggleVisibility(index)}
                                    size="sm"
                                >
                                    {skill.hide ? "Hidden" : "Visible"}
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => removeSkill(index)}
                                    disabled={skills.length === 1}
                                    size="sm"
                                >
                                    Remove
                                </Button>
                                <Button onClick={() => saveSkill(index)} size="sm">
                                    Save
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="pt-4 flex justify-end">
                <Button onClick={addSkill} variant="default">
                    + Add Skill
                </Button>
            </div>
        </div>
    )
}

export default Skills
