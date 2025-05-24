"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ResumeSettings() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [template, setTemplate] = useState("classic");
    const [includePhoto, setIncludePhoto] = useState(false);
    const [includeReferences, setIncludeReferences] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setResumeFile(e.target.files[0]);
        }
    }

    function handleSave() {
        // Here you could send form data or file to your backend or state
        alert(`Saved Resume Settings:\nTemplate: ${template}\nInclude Photo: ${includePhoto}\nInclude References: ${includeReferences}\nFile: ${resumeFile?.name ?? "None"}`);
    }

    return (
        <div className="max-w-lg space-y-6">
            <div>
                <Label htmlFor="resume-upload">Upload Resume (PDF/DOC)</Label>
                <Input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                />
                {resumeFile && <p className="mt-2 text-sm text-muted-foreground">Selected file: {resumeFile.name}</p>}
            </div>

            <div>
                <Label htmlFor="template-select">Choose Resume Template</Label>
                <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger id="template-select">
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-3">
                <input
                    type="checkbox"
                    id="include-photo"
                    checked={includePhoto}
                    onChange={() => setIncludePhoto(!includePhoto)}
                    className="rounded border border-input bg-background text-primary focus:ring-2 focus:ring-primary"
                />
                <Label htmlFor="include-photo" className="cursor-pointer">Include Photo in Resume</Label>
            </div>

            <div className="flex items-center space-x-3">
                <input
                    type="checkbox"
                    id="include-references"
                    checked={includeReferences}
                    onChange={() => setIncludeReferences(!includeReferences)}
                    className="rounded border border-input bg-background text-primary focus:ring-2 focus:ring-primary"
                />
                <Label htmlFor="include-references" className="cursor-pointer">Include References</Label>
            </div>

            <Button onClick={handleSave}>Save Settings</Button>
        </div>
    );
}
