"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const PublicationDetails = () => {
    const [publications, setPublications] = useState([
        {
            title: "",
            link: "",
            publisher: "",
            date: "",
            description: "",
        },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...publications]
        updated[index][field as keyof typeof updated[0]] = value
        setPublications(updated)
    }

    const addPublication = () => {
        setPublications([
            ...publications,
            {
                title: "",
                link: "",
                publisher: "",
                date: "",
                description: "",
            },
        ])
    }

    const removePublication = (index: number) => {
        setPublications(publications.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        console.log("Publications:", publications)
        // Save or send to backend
    }

    return (
        <div className="space-y-8 p-6 w-full">
            {publications.map((pub, index) => (
                <div
                    key={index}
                    className="p-4 border rounded-md space-y-4 shadow-sm "
                >
                    <div>
                        <Label className="mb-2">Publication Title</Label>
                        <Input
                            placeholder="e.g. Deep Learning for Edge Devices"
                            value={pub.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Link</Label>
                        <Input
                            placeholder="https://publication-link.com"
                            value={pub.link}
                            onChange={(e) => handleChange(index, "link", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Publisher</Label>
                        <Input
                            placeholder="e.g. IEEE, Springer"
                            value={pub.publisher}
                            onChange={(e) => handleChange(index, "publisher", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Publication Date</Label>
                        <Input
                            type="date"
                            value={pub.date}
                            onChange={(e) => handleChange(index, "date", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Description</Label>
                        <Textarea
                            placeholder="Brief summary or abstract of the publication"
                            value={pub.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removePublication(index)}
                        disabled={publications.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            <div className="flex gap-4">
                <Button variant="outline" onClick={addPublication}>
                    + Add Publication
                </Button>
                <Button onClick={handleSave}>Save Publications</Button>
            </div>
        </div>
    )
}

export default PublicationDetails
