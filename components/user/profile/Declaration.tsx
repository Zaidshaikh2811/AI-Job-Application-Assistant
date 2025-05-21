"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Declaration = () => {
    const [declaration, setDeclaration] = useState({
        text: "",
        fullName: "",
        signature: "",
        place: "",
        date: "",
    })

    const handleChange = (field: string, value: string) => {
        setDeclaration({ ...declaration, [field]: value })
    }

    const handleSave = () => {
        console.log("Declaration:", declaration)
        // submit to backend or save
    }

    return (
        <div className="space-y-8 p-6 w-full">
            <div>
                <Label className="mb-2">Declaration Text</Label>
                < Textarea
                    placeholder="I hereby declare that all the information provided is true to the best of my knowledge..."
                    value={declaration.text}
                    onChange={(e) => handleChange("text", e.target.value)}
                />
            </div >

            <div>
                <Label className="mb-2">Full Name</Label>
                <Input
                    placeholder="Your Full Name"
                    value={declaration.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                />
            </div>

            <div>
                <Label className="mb-2">Signature</Label>
                <Input
                    placeholder="Type your full name as a signature"
                    value={declaration.signature}
                    onChange={(e) => handleChange("signature", e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label className="mb-2">Place</Label>
                    <Input
                        placeholder="e.g. Mumbai"
                        value={declaration.place}
                        onChange={(e) => handleChange("place", e.target.value)}
                    />
                </div>
                <div>
                    <Label className="mb-2">Date</Label>
                    <Input
                        type="date"
                        value={declaration.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                    />
                </div>
            </div>

            <Button onClick={handleSave}>Save Declaration</Button>
        </div >
    )
}

export default Declaration
