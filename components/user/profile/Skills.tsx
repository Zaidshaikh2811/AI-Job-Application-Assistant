"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const skillLevels = ["Beginner", "Intermediate", "Advanced"]

const Skills = () => {
    const [skills, setSkills] = useState([{ name: "", level: "" }])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...skills]
        updated[index][field as keyof typeof updated[0]] = value
        setSkills(updated)
    }

    const addSkill = () => {
        setSkills([...skills, { name: "", level: "" }])
    }

    const removeSkill = (index: number) => {
        const updated = skills.filter((_, i) => i !== index)
        setSkills(updated)
    }

    const handleSave = () => {
        console.log("Skills:", skills)
        // Send to API or context here
    }

    return (
        <div className="space-y-8 p-0 md:p-6 w-full">
            {skills.map((skill, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-md">
                    <div className="w-full">
                        <Label className="mb-2">Skill</Label>
                        <Input
                            placeholder="e.g. React"
                            value={skill.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <Label className="mb-2">Skill Level</Label>
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

                    <div className="mt-5 md:mt-0">
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={() => removeSkill(index)}
                            disabled={skills.length === 1}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            ))}

            <div className="flex gap-4">
                <Button type="button" onClick={addSkill} variant="outline">
                    + Add Skill
                </Button>
                <Button type="button" onClick={handleSave}>
                    Save Skills
                </Button>
            </div>
        </div>
    )
}

export default Skills
