"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const ReferenceDetails = () => {
    const [references, setReferences] = useState([
        {
            name: "",
            link: "",
            title: "",
            organization: "",
            email: "",
            phone: "",
        },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...references]
        updated[index][field as keyof typeof updated[0]] = value
        setReferences(updated)
    }

    const addReference = () => {
        setReferences([
            ...references,
            {
                name: "",
                link: "",
                title: "",
                organization: "",
                email: "",
                phone: "",
            },
        ])
    }

    const removeReference = (index: number) => {
        setReferences(references.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        console.log("References:", references)
        // Submit to backend or store
    }

    return (
        <div className="space-y-8 p-0 md:p-6 w-full">
            {references.map((ref, index) => (
                <div
                    key={index}
                    className="p-4 border rounded-md space-y-4 shadow-sm "
                >
                    <div>
                        <Label className="mb-2">Reference Name</Label>
                        <Input
                            placeholder="e.g. Dr. John Smith"
                            value={ref.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Link</Label>
                        <Input
                            placeholder="https://linkedin.com/in/example"
                            value={ref.link}
                            onChange={(e) => handleChange(index, "link", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Title</Label>
                        <Input
                            placeholder="e.g. Senior Professor"
                            value={ref.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Organization</Label>
                        <Input
                            placeholder="e.g. Stanford University"
                            value={ref.organization}
                            onChange={(e) => handleChange(index, "organization", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Email</Label>
                        <Input
                            type="email"
                            placeholder="e.g. johnsmith@example.com"
                            value={ref.email}
                            onChange={(e) => handleChange(index, "email", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Phone Number</Label>
                        <Input
                            type="tel"
                            placeholder="e.g. +1 234 567 8901"
                            value={ref.phone}
                            onChange={(e) => handleChange(index, "phone", e.target.value)}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removeReference(index)}
                        disabled={references.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button variant="outline" onClick={addReference}>
                    + Add Reference
                </Button>
                <Button onClick={handleSave}>Save References</Button>
            </div>
        </div>
    )
}

export default ReferenceDetails
