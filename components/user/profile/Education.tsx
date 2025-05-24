"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"

interface EducationItem {
    _id: string
    degree: string
    school: string | null
    university: string | null
    link: string | null
    city: string | null
    country: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
    grade: string | null
    hide: boolean
}

const USER_ID = "680deb5d9a4841832c4d15c3"

const Education = () => {
    const [educations, setEducations] = useState<EducationItem[]>([])
    const [openIndexes, setOpenIndexes] = useState<number[]>([])

    const fetchEducation = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/education-details`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
            })
            if (!res.ok) throw new Error("Failed to fetch education data")
            const { data } = await res.json()
            setEducations(data || [])
        } catch (error) {
            console.error("Error fetching education:", error)
            toast.error("Failed to load education data")
        }
    }

    useEffect(() => {
        fetchEducation()
    }, [])

    const handleChange = (index: number, field: keyof EducationItem, value: string | boolean) => {
        setEducations((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        )
    }

    const handleSave = async (education: EducationItem,) => {
        const isNew = education._id.includes("temp_")

        try {
            const url = isNew
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/education-details`
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/education-details/${USER_ID}`

            const method = isNew ? "POST" : "PATCH"

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
                body: JSON.stringify({
                    ...education,
                    id: USER_ID,
                }),
            })

            if (!res.ok) throw new Error("Failed to save education")

            toast.success("Education saved successfully")

            // Refresh list after POST
            if (isNew) {
                fetchEducation()
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to save education")
            } else {
                toast.error("Failed to save education")
            }
        }
    }

    const handleToggleVisibility = async (index: number, checked: boolean, id: string) => {
        handleChange(index, "hide", checked)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/education-details/${id}/toggle-visibility`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
                body: JSON.stringify({ hide: checked }),
            })

            if (!res.ok) throw new Error("Failed to update visibility")
            toast.success(checked ? "Section hidden" : "Section visible")
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Error updating visibility")
            } else {
                toast.error("Error updating visibility")
            }
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/education-details/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
            })

            if (!res.ok) throw new Error("Failed to delete education")
            toast.success("Education entry deleted")
            fetchEducation()
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to delete education")
            } else {
                toast.error("Failed to delete education")
            }
        }
    }

    const handleAddEducation = () => {
        const newEducation: EducationItem = {
            _id: `temp_${Date.now()}`,
            degree: "",
            school: "",
            university: "",
            link: "",
            city: "",
            country: "",
            startDate: "",
            endDate: "",
            description: "",
            grade: "",
            hide: false,
        }
        setEducations([...educations, newEducation])
        setOpenIndexes([...openIndexes, educations.length])
    }

    const toggleAccordion = (index: number) => {
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        )
    }

    return (
        <div className="space-y-10 w-full px-2 md:px-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Education Details</h1>
                <Button onClick={handleAddEducation}>Add New Education</Button>
            </div>

            {educations.map((edu, index) => {
                const isOpen = openIndexes.includes(index)
                return (
                    <div key={edu._id} className="border rounded-xl p-4 space-y-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <h2
                                onClick={() => toggleAccordion(index)}
                                className="text-lg font-semibold cursor-pointer flex items-center gap-2"
                            >
                                {edu.degree || "Untitled Degree"}
                                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </h2>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id={`hide-${edu._id}`}
                                    checked={edu.hide}
                                    onCheckedChange={(val) => handleToggleVisibility(index, val, edu._id)}
                                />
                                <Label htmlFor={`hide-${edu._id}`}>Hide</Label>
                                {!edu._id.includes("temp_") && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(edu._id)}
                                        className="text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {isOpen && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Degree</Label>
                                        <Input value={edu.degree || ""} onChange={(e) => handleChange(index, "degree", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Grade</Label>
                                        <Input value={edu.grade || ""} onChange={(e) => handleChange(index, "grade", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>School</Label>
                                        <Input value={edu.school || ""} onChange={(e) => handleChange(index, "school", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>University</Label>
                                        <Input value={edu.university || ""} onChange={(e) => handleChange(index, "university", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>City</Label>
                                        <Input value={edu.city || ""} onChange={(e) => handleChange(index, "city", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Country</Label>
                                        <Input value={edu.country || ""} onChange={(e) => handleChange(index, "country", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Start Date</Label>
                                        <Input
                                            type="date"
                                            value={edu.startDate?.slice(0, 10) || ""}
                                            onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label>End Date</Label>
                                        <Input
                                            type="date"
                                            value={edu.endDate?.slice(0, 10) || ""}
                                            onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={edu.description || ""}
                                        onChange={(e) => handleChange(index, "description", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Relevant Link</Label>
                                    <Input value={edu.link || ""} onChange={(e) => handleChange(index, "link", e.target.value)} />
                                </div>

                                <Button onClick={() => handleSave(edu)}>Save</Button>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Education
