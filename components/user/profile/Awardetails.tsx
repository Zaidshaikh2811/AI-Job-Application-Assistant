"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const AwardDetails = () => {
    const [awards, setAwards] = useState([
        {
            title: "",
            link: "",
            issuer: "",
            awardDate: "",
        },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...awards]
        updated[index][field as keyof typeof updated[0]] = value
        setAwards(updated)
    }

    const addAward = () => {
        setAwards([
            ...awards,
            {
                title: "",
                link: "",
                issuer: "",
                awardDate: "",
            },
        ])
    }

    const removeAward = (index: number) => {
        setAwards(awards.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        console.log("Awards:", awards)
        // Optional: submit to backend or save in state
    }

    return (
        <div className="space-y-8 p-6 w-full">
            {awards.map((award, index) => (
                <div
                    key={index}
                    className="border p-4 rounded-md shadow-sm space-y-4 "
                >
                    <div>
                        <Label className="mb-2">Award Title</Label>
                        <Input
                            placeholder="e.g. Best Innovator Award"
                            value={award.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Award Link</Label>
                        <Input
                            placeholder="https://link-to-award.com"
                            value={award.link}
                            onChange={(e) => handleChange(index, "link", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Issuer</Label>
                        <Input
                            placeholder="e.g. ABC Institute"
                            value={award.issuer}
                            onChange={(e) => handleChange(index, "issuer", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Award Date</Label>
                        <Input
                            type="date"
                            value={award.awardDate}
                            onChange={(e) => handleChange(index, "awardDate", e.target.value)}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removeAward(index)}
                        disabled={awards.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button onClick={addAward} variant="outline">
                    + Add Award
                </Button>
                <Button onClick={handleSave}>Save Awards</Button>
            </div>
        </div>
    )
}

export default AwardDetails
