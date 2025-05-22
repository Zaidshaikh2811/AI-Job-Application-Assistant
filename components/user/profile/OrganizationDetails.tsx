"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const OrganizationDetails = () => {
    const [organizations, setOrganizations] = useState([
        {
            name: "",
            link: "",
            city: "",
            country: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...organizations]
        updated[index][field as keyof typeof updated[0]] = value
        setOrganizations(updated)
    }

    const addOrganization = () => {
        setOrganizations([
            ...organizations,
            {
                name: "",
                link: "",
                city: "",
                country: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ])
    }

    const removeOrganization = (index: number) => {
        setOrganizations(organizations.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        console.log("Organizations:", organizations)
        // Send to backend or save to context/state
    }

    return (
        <div className="space-y-8 p-0 md:p-6 w-full">
            {organizations.map((org, index) => (
                <div
                    key={index}
                    className="p-4 border rounded-md space-y-4 shadow-sm "
                >
                    <div>
                        <Label className="mb-2">Organization Name</Label>
                        <Input
                            placeholder="e.g. Google Developer Student Club"
                            value={org.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Organization Link</Label>
                        <Input
                            placeholder="https://example.com"
                            value={org.link}
                            onChange={(e) => handleChange(index, "link", e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">City</Label>
                            <Input
                                placeholder="e.g. Mumbai"
                                value={org.city}
                                onChange={(e) => handleChange(index, "city", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="mb-2">Country</Label>
                            <Input
                                placeholder="e.g. India"
                                value={org.country}
                                onChange={(e) => handleChange(index, "country", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Start Date</Label>
                            <Input
                                type="date"
                                value={org.startDate}
                                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="mb-2">End Date</Label>
                            <Input
                                type="date"
                                value={org.endDate}
                                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Description</Label>
                        <Textarea
                            placeholder="e.g. Led community events, organized workshops..."
                            value={org.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removeOrganization(index)}
                        disabled={organizations.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button variant="outline" onClick={addOrganization}>
                    + Add Organization
                </Button>
                <Button onClick={handleSave}>Save Organizations</Button>
            </div>
        </div>
    )
}

export default OrganizationDetails
