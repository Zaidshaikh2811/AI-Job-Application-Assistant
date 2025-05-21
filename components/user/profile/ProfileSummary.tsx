"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const ProfileSummary = () => {
    const [summary, setSummary] = useState("")

    const handleSave = () => {


    }

    return (
        <div className="space-y-8 p-6 w-full">
            <Label htmlFor="summary" className="text-base font-medium">
                Profile Summary
            </Label>
            <Textarea
                id="summary"
                placeholder="Write a brief summary about yourself..."
                className="min-h-[150px]"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <Button onClick={handleSave}>Save</Button>
        </div>
    )
}

export default ProfileSummary
