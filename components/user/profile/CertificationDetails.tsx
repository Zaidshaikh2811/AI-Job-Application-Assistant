"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CertificationDetails = () => {
    const [certifications, setCertifications] = useState([
        {
            title: "",
            link: "",
            issuer: "",
            license: "",
            issueDate: "",
            endDate: "",
            description: "",
        },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...certifications]
        updated[index][field as keyof typeof updated[0]] = value
        setCertifications(updated)
    }

    const addCertification = () => {
        setCertifications([
            ...certifications,
            {
                title: "",
                link: "",
                issuer: "",
                license: "",
                issueDate: "",
                endDate: "",
                description: "",
            },
        ])
    }

    const removeCertification = (index: number) => {
        const updated = certifications.filter((_, i) => i !== index)
        setCertifications(updated)
    }

    const handleSave = () => {
        console.log("Certifications:", certifications)
        // Send to backend or context
    }

    return (
        <div className="space-y-8 p-0 md:p-6 w-full">
            {certifications.map((cert, index) => (
                <div
                    key={index}
                    className="border p-4 rounded-lg shadow-sm space-y-4 "
                >
                    <div>
                        <Label className="mb-2">Certification Title</Label>
                        <Input
                            placeholder="e.g. AWS Certified Developer"
                            value={cert.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Certification Link</Label>
                        <Input
                            placeholder="e.g. https://..."
                            value={cert.link}
                            onChange={(e) => handleChange(index, "link", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Issuer</Label>
                        <Input
                            placeholder="e.g. Amazon Web Services"
                            value={cert.issuer}
                            onChange={(e) => handleChange(index, "issuer", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">License Number</Label>
                        <Input
                            placeholder="e.g. AWS-12345678"
                            value={cert.license}
                            onChange={(e) => handleChange(index, "license", e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[150px]">
                            <Label className="mb-2">Issue Date</Label>
                            <Input
                                type="date"
                                value={cert.issueDate}
                                onChange={(e) => handleChange(index, "issueDate", e.target.value)}
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <Label className="mb-2">End Date</Label>
                            <Input
                                type="date"
                                value={cert.endDate}
                                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Description</Label>
                        <Textarea
                            placeholder="Details about the certification..."
                            value={cert.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removeCertification(index)}
                        disabled={certifications.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button onClick={addCertification} variant="outline">
                    + Add Certification
                </Button>
                <Button onClick={handleSave}>Save Certifications</Button>
            </div>
        </div>
    )
}

export default CertificationDetails
