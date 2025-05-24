"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function JobTargeting() {
    const [data, setData] = useState({
        targetJobTitle: "",
        jobDescription: "",
        resumeStyle: "Formal",
    });

    const [modalOpen, setModalOpen] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    function handleResumeStyleChange(value: string) {
        setData(prev => ({ ...prev, resumeStyle: value }));
    }

    function openModal() {
        setModalOpen(true);
    }

    function handleSave() {
        // Add validation or save logic here
        setModalOpen(false);
    }

    function handleDelete() {
        setData({
            targetJobTitle: "",
            jobDescription: "",
            resumeStyle: "Formal",
        });
    }

    return (
        <div>
            <div className="mb-4 space-y-3">
                <p><strong>Target Job Title:</strong> {data.targetJobTitle || "-"}</p>
                <p><strong>Full Job Description:</strong> {data.jobDescription || "-"}</p>
                <p><strong>Resume Style:</strong> {data.resumeStyle}</p>
            </div>

            <div className="flex gap-4">
                <Button onClick={openModal}>{data.targetJobTitle ? "Edit" : "Add"} Job Targeting</Button>
                <Button variant="destructive" onClick={handleDelete} disabled={!data.targetJobTitle}>Delete</Button>
            </div>

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{data.targetJobTitle ? "Edit" : "Add"} Job Targeting</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="targetJobTitle">Target Job Title</Label>
                            <Input
                                id="targetJobTitle"
                                name="targetJobTitle"
                                value={data.targetJobTitle}
                                onChange={handleChange}
                                placeholder="e.g., Frontend Developer"
                            />
                        </div>

                        <div>
                            <Label htmlFor="jobDescription">Full Job Description</Label>
                            <Textarea
                                id="jobDescription"
                                name="jobDescription"
                                value={data.jobDescription}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Describe your desired job role, responsibilities, etc."
                            />
                        </div>

                        <div>
                            <Label htmlFor="resumeStyle">Resume Style</Label>
                            <Select value={data.resumeStyle} onValueChange={handleResumeStyleChange}>
                                <SelectTrigger id="resumeStyle">
                                    <SelectValue placeholder="Select Resume Style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Formal">Formal</SelectItem>
                                    <SelectItem value="Modern">Modern</SelectItem>
                                    <SelectItem value="Concise">Concise</SelectItem>
                                    <SelectItem value="Keyword-rich">Keyword-rich</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="space-x-2">
                        <Button onClick={handleSave}>{data.targetJobTitle ? "Update" : "Save"}</Button>
                        <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
