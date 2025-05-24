"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"

const ProfileSummary = () => {
    const [summary, setSummary] = useState("")
    const [initialSummary, setInitialSummary] = useState("")

    const [hideSection, setHideSection] = useState(false)
    const [initialHideSection, setInitialHideSection] = useState(false)
    console.log(initialHideSection);

    // Fetch data on mount
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/summary`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                    },
                })

                if (!res.ok) throw new Error("Failed to fetch profile summary")

                const { data } = await res.json()

                setSummary(data?.summary || "")
                setInitialSummary(data?.summary || "")
                setHideSection(data?.hide || false)
                setInitialHideSection(data?.hide || false)
            } catch (error) {
                console.error("Error fetching profile summary:", error)
                toast.error("Failed to load profile summary")
            }
        }

        fetchSummary()
    }, [])

    // Save summary
    const handleSave = async () => {
        const trimmedSummary = summary.trim()
        const hasSummaryChanged = trimmedSummary !== initialSummary.trim()

        if (!hasSummaryChanged) {
            toast.message("No changes detected")
            return
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/summary`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
                body: JSON.stringify({ summary: trimmedSummary }),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to update profile summary")
            }

            setInitialSummary(trimmedSummary)
            toast.success("Profile summary updated successfully!")
        } catch (error: unknown) {
            console.error("Update error:", error)
            toast.error(error instanceof Error ? error.message : "Something went wrong")
        }
    }

    // Toggle handler for hide switch
    const handleToggleHide = async (checked: boolean) => {
        setHideSection(checked)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/summary/toggle-visibility`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
                body: JSON.stringify({ hide: checked }),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to update hide section setting")
            }

            setInitialHideSection(checked)
            toast.success(`Section is now ${checked ? "hidden" : "visible"}`)
        } catch (error) {
            console.error("Toggle hide error:", error)
            toast.error(error instanceof Error ? error.message : "Failed to update section visibility")
        }
    }

    return (
        <div className="space-y-8 p-0 md:p-6 w-full">
            <div className="flex items-center justify-between">
                <Label htmlFor="summary" className="text-base font-medium">
                    Profile Summary
                </Label>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="hide-section"
                        checked={hideSection}
                        onCheckedChange={handleToggleHide}
                    />
                    <Label htmlFor="hide-section">Hide Section</Label>
                </div>
            </div>
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
