"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Education = () => {
    const [form, setForm] = useState({
        degree: "",
        cgpa: "",
        institute: "",
        link: "",
        country: "",
        city: "",
        startDate: "",
        endDate: "",
        description: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        console.log("Education Info:", form)
        // Send to backend or update state
    }

    return (
        <div className="space-y-8 p-6 w-full">
            <h1 className="text-2xl font-bold">Education Details</h1>
            < div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                <div>
                    <Label className="mb-2">Degree</Label>
                    <Input name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech in Computer Engineering" />
                </div>
                <div>
                    <Label className="mb-2">CGPA</Label>
                    <Input name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="e.g. 8.5" />
                </div>
                <div>
                    <Label className="mb-2">Institute Name</Label>
                    <Input name="institute" value={form.institute} onChange={handleChange} placeholder="e.g. IIT Bombay" />
                </div>
                <div>
                    <Label className="mb-2">Relevant Link</Label>
                    <Input name="link" value={form.link} onChange={handleChange} placeholder="e.g. https://example.com/certificate" />
                </div>
                <div>
                    <Label className="mb-2">Country</Label>
                    <Input name="country" value={form.country} onChange={handleChange} placeholder="e.g. India" />
                </div>
                <div>
                    <Label className="mb-2">City</Label>
                    <Input name="city" value={form.city} onChange={handleChange} placeholder="e.g. Mumbai" />
                </div>
                <div>
                    <Label className="mb-2">Start Date</Label>
                    <Input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                </div>
                <div>
                    <Label className="mb-2">End Date</Label>
                    <Input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                </div>
            </ div>
            <div>
                <Label className="mb-2">Description</Label>
                <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your education, major projects, coursework etc."
                    className="min-h-[120px]"
                />
            </div>
            <Button onClick={handleSubmit}>Save Education</Button>
        </div >
    )
}

export default Education
