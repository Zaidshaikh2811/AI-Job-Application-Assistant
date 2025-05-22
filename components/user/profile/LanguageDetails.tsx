"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

const levels = ["Beginner", "Intermediate", "Fluent", "Native"]

const LanguageDetails = () => {
    const [languages, setLanguages] = useState([
        { name: "", level: "", info: "" },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...languages]
        updated[index][field as keyof typeof updated[0]] = value
        setLanguages(updated)
    }

    const addLanguage = () => {
        setLanguages([...languages, { name: "", level: "", info: "" }])
    }

    const removeLanguage = (index: number) => {
        const updated = languages.filter((_, i) => i !== index)
        setLanguages(updated)
    }

    const handleSave = () => {
        console.log("Languages:", languages)
        // Submit to backend or context
    }

    return (
        <div className="space-y-6 p-0 md:p-6 w-full  ">
            {languages.map((lang, index) => (
                <div key={index} className="border p-4 rounded-md space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">

                        <div>
                            <Label className="mb-2">Language Name</Label>
                            <Input
                                placeholder="e.g. English"
                                value={lang.name}
                                onChange={(e) => handleChange(index, "name", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Proficiency Level</Label>
                            <Select
                                value={lang.level}
                                onValueChange={(value) => handleChange(index, "level", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {levels.map((level) => (
                                        <SelectItem key={level} value={level}>
                                            {level}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Additional Info</Label>
                        <Textarea
                            placeholder="e.g. IELTS 8.0, business-level communication"
                            value={lang.info}
                            onChange={(e) => handleChange(index, "info", e.target.value)}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removeLanguage(index)}
                        disabled={languages.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button onClick={addLanguage} variant="outline">
                    + Add Language
                </Button>
                <Button onClick={handleSave}>Save Languages</Button>
            </div>
        </div>
    )
}

export default LanguageDetails
