"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getUserSummary, updateUserSummary } from "@/actions/user";

export default function Summary() {
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Load summary on mount
    useEffect(() => {
        async function loadSummary() {
            setIsLoading(true);
            const result = await getUserSummary();
            console.log("Summary result:", result);

            if (result.success && result.data !== undefined) {
                setSummary(typeof result.data === "string" ? result.data : "");
            } else {
                toast.error("Failed to load summary", {
                    description: result.error || "Unknown error",
                });
            }
            setIsLoading(false);
        }

        loadSummary();
    }, []);

    async function handleSave() {
        setIsLoading(true);
        const result = await updateUserSummary(summary);
        if (result.success) {
            toast.success("Summary saved successfully");
        } else {
            toast.error("Failed to save summary", {
                description: result.error || "Unknown error",
            });
        }
        setIsLoading(false);
    }



    return (
        <div className="max-w-lg space-y-6">
            <div>
                <Label className="mb-2" htmlFor="summary">Professional Summary (optional)</Label>
                <Textarea
                    id="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write a brief summary about your professional background, skills, and goals."
                    rows={12}
                    className="resize-none"
                    disabled={isLoading}
                />
            </div>

            <div className="flex justify-end gap-2">

                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );
}
