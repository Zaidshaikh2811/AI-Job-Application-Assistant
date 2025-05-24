"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Link, Briefcase } from "lucide-react"
import { getUserFullData } from "@/actions/user"

export default function SimplifiedJobForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [jobTitle, setJobTitle] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobLink, setJobLink] = useState("")
    const [resumeFile, setResumeFile] = useState<File | null>(null)

    // Handle resume file upload
    function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return

        const file = e.target.files[0]
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!validTypes.includes(file.type)) {
            alert("Invalid file type. Please upload PDF, DOC, or DOCX")
            return
        }

        if (file.size > maxSize) {
            alert("File size too large. Max 5MB allowed")
            return
        }

        setResumeFile(file)
    }

    // Validate form
    function validateForm() {
        if (!jobTitle.trim()) {
            alert("Job title is required")
            return false
        }

        if (!jobDescription.trim()) {
            alert("Job description is required")
            return false
        }

        if (jobLink && !isValidUrl(jobLink)) {
            alert("Please enter a valid job URL")
            return false
        }

        return true
    }

    // Validate URL format
    function isValidUrl(string: string): boolean {
        try {
            new URL(string)
            return true
        } catch {
            return false
        }
    }

    // Handle form submission
    async function handleSubmit() {
        setIsSubmitting(true)

        try {
            if (!validateForm()) {
                setIsSubmitting(false)
                return
            }

            const data = {
                jobTitle,
                jobDescription,
                jobLink,
                resumeFile: resumeFile ? resumeFile.name : null,
            }

            const userData = await getUserFullData()
            if (!userData) {
                throw new Error("Failed to fetch user data")
            }
            console.log("userData:", userData.data);


            // Simulate API call
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, userData: userData.data }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            console.log("Form data:", data)
            alert("Application submitted successfully!")

            // Reset form
            setJobTitle("")
            setJobDescription("")
            setJobLink("")
            setResumeFile(null)

        } catch (error) {
            console.error("Submission error:", error)
            alert("Failed to submit application. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen      py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                        Apply for Job
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Fill in the details below to submit your application
                    </p>
                </div>

                <Card className="shadow-xl border-0   backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-xl font-semibold text-center">
                            Job Application Form
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Job Title */}
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle" className="text-sm font-medium flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    Job Title *
                                </Label>
                                <Input
                                    id="jobTitle"
                                    type="text"
                                    placeholder="e.g. Senior Software Engineer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    required
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Job Link */}
                            <div className="space-y-2">
                                <Label htmlFor="jobLink" className="text-sm font-medium flex items-center gap-2">
                                    <Link className="h-4 w-4" />
                                    Job Link (optional)
                                </Label>
                                <Input
                                    id="jobLink"
                                    type="url"
                                    placeholder="https://company.com/jobs/12345"
                                    value={jobLink}
                                    onChange={(e) => setJobLink(e.target.value)}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Job Description */}
                            <div className="space-y-2">
                                <Label htmlFor="jobDescription" className="text-sm font-medium flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Job Description *
                                </Label>
                                <Textarea
                                    id="jobDescription"
                                    placeholder="Paste the complete job description here..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    required
                                    rows={8}
                                    className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Include requirements, responsibilities, and qualifications
                                </p>
                            </div>

                            {/* Resume Upload */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Upload Resume (optional)
                                </Label>

                                <div className="relative">
                                    <input
                                        id="resume-upload"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleResumeUpload}
                                        className="hidden"
                                    />
                                    <Label
                                        htmlFor="resume-upload"
                                        className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-slate-50/50 dark:bg-slate-700/50"
                                    >
                                        <div className="text-center">
                                            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                Click to upload resume
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                PDF, DOC, DOCX (max 5MB)
                                            </p>
                                        </div>
                                    </Label>
                                </div>

                                {resumeFile && (
                                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                        <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                                {resumeFile.name}
                                            </p>
                                            <p className="text-xs text-green-600 dark:text-green-400">
                                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setResumeFile(null)}
                                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                                        >
                                            ×
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="button"
                                    className="w-full h-12 text-base font-medium transition-all duration-200 hover:shadow-lg"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center mt-6">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        All information will be processed securely and confidentially
                    </p>
                </div>
            </div>
        </div>
    )
}