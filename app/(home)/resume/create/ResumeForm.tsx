"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { TextAnimate } from "@/components/magicui/text-animate"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface WorkExperience {
    id: number
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
}

export default function AddJobPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const template = searchParams.get("template")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form state
    const [jobTitle, setJobTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [jobLocation, setJobLocation] = useState("")
    const [tone, setTone] = useState("Professional")
    const [jobDescription, setJobDescription] = useState("")
    const [skills, setSkills] = useState<string[]>([])
    const [skillInput, setSkillInput] = useState("")
    const [education, setEducation] = useState("")
    const [certifications, setCertifications] = useState("")
    const [projects, setProjects] = useState("")
    const [personalName, setPersonalName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
        { id: 1, title: "", company: "", startDate: "", endDate: "", description: "" },
    ])
    const [resumeFile, setResumeFile] = useState<File | null>(null)

    // Add new work experience section
    function addWorkExperience() {
        setWorkExperiences((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                description: ""
            },
        ])
    }

    // Update work experience fields
    function updateWorkExperience(id: number, field: keyof WorkExperience, value: string) {
        setWorkExperiences((prev) =>
            prev.map((we) => (we.id === id ? { ...we, [field]: value } : we))
        )
    }

    // Add skill to the list
    function addSkill() {
        if (!skillInput.trim()) {
            toast.warning("Please enter a skill")
            return
        }

        if (skills.includes(skillInput.trim())) {
            toast.warning("Skill already exists")
            return
        }

        setSkills((prev) => [...prev, skillInput.trim()])
        setSkillInput("")
        toast.success("Skill added")
    }

    // Remove skill from the list
    function removeSkill(skill: string) {
        setSkills((prev) => prev.filter((s) => s !== skill))
        toast.info("Skill removed")
    }

    // Handle resume file upload
    function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return

        const file = e.target.files[0]
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload PDF, DOC, or DOCX")
            return
        }

        if (file.size > maxSize) {
            toast.error("File size too large. Max 5MB allowed")
            return
        }

        setResumeFile(file)
        toast.success("Resume uploaded successfully")
    }

    // Validate email format
    function isValidEmail(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    // Validate LinkedIn URL
    function isValidLinkedIn(url: string) {
        if (!url) return true
        return /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(url)
    }

    // Validate phone number
    function isValidPhone(phone: string) {
        if (!phone) return true
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
    }

    // Validate date format (YYYY-MM)
    function isValidDate(date: string) {
        if (!date) return true
        return /^\d{4}-\d{2}$/.test(date)
    }

    // Validate all form fields
    function validateForm() {
        // Required fields
        if (!jobTitle.trim()) {
            toast.error("Job title is required")
            return false
        }

        if (!companyName.trim()) {
            toast.error("Company name is required")
            return false
        }

        if (!jobDescription.trim()) {
            toast.error("Job description is required")
            return false
        }

        if (!personalName.trim()) {
            toast.error("Your name is required")
            return false
        }

        if (!email.trim()) {
            toast.error("Email is required")
            return false
        }

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address")
            return false
        }

        if (phone && !isValidPhone(phone)) {
            toast.error("Please enter a valid phone number")
            return false
        }

        if (linkedin && !isValidLinkedIn(linkedin)) {
            toast.error("Please enter a valid LinkedIn profile URL")
            return false
        }

        // Validate work experiences
        for (const exp of workExperiences) {
            if (exp.title && !exp.company) {
                toast.error(`Company name is required for ${exp.title || 'this experience'}`)
                return false
            }

            if (exp.company && !exp.title) {
                toast.error(`Job title is required for ${exp.company || 'this experience'}`)
                return false
            }

            if ((exp.startDate || exp.endDate) && !isValidDate(exp.startDate)) {
                toast.error("Please enter a valid start date (YYYY-MM)")
                return false
            }

            if ((exp.startDate || exp.endDate) && !isValidDate(exp.endDate)) {
                toast.error("Please enter a valid end date (YYYY-MM)")
                return false
            }
        }

        return true
    }

    // Handle form submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (!validateForm()) {
                setIsSubmitting(false)
                return
            }

            const loadingToast = toast.loading("Generating your resume...")

            const data = {
                jobTitle,
                companyName,
                jobLocation,
                tone,
                jobDescription,
                skills,
                education,
                certifications,
                projects,
                personalName,
                email,
                phone,
                linkedin,
                workExperiences: workExperiences.filter(exp =>
                    exp.title || exp.company || exp.description
                ),
                resumeFile: resumeFile ? resumeFile.name : null,
            }




            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const resp = await response.json();
            toast.dismiss(loadingToast)
            toast.success("Resume generated successfully!")

            router.push(`/resume/${resp.resumeData._id}?template=${template}`)

        } catch (error) {
            console.error("Submission error:", error)
            toast.error("Failed to generate resume. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative w-full min-h-screen bg-background overflow-hidden py-4 sm:py-10 px-4 mt-20">
            <GridPattern className="fixed inset-0 w-full h-full text-gray-400 opacity-10 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-10">
                <Card className="p-4 sm:p-6 md:p-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary font-display mb-4 sm:mb-6">
                        <TextAnimate animation="blurInUp" by="character" once>
                            Add New Job
                        </TextAnimate>
                    </h1>
                    <CardContent className="space-y-6 sm:space-y-8">
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            {/* Job Info */}
                            <section className="space-y-3 sm:space-y-4">
                                <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2 mb-3 sm:mb-4">Job Information</h2>
                                <div className="space-y-3">
                                    <Input
                                        type="text"
                                        placeholder="Job Title *"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Company Name *"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Job Location (optional)"
                                        value={jobLocation}
                                        onChange={(e) => setJobLocation(e.target.value)}
                                        className="w-full"
                                    />
                                    <Select onValueChange={setTone} defaultValue="Professional">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Tone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Professional">Professional</SelectItem>
                                            <SelectItem value="Confident">Confident</SelectItem>
                                            <SelectItem value="Friendly">Friendly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Textarea
                                        placeholder="Paste Job Description here *"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        required
                                        rows={6}
                                        className="resize-none w-full"
                                    />
                                </div>
                            </section>

                            {/* Personal Info */}
                            <section className="space-y-3 sm:space-y-4 border-t pt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2 mb-3 sm:mb-4">Personal Information</h2>
                                <div className="space-y-3">
                                    <Input
                                        type="text"
                                        placeholder="Full Name *"
                                        value={personalName}
                                        onChange={(e) => setPersonalName(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <Input
                                        type="tel"
                                        placeholder="Phone Number (optional)"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full"
                                    />
                                    <Input
                                        type="url"
                                        placeholder="LinkedIn Profile URL (optional)"
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            </section>

                            {/* Work Experience */}
                            <section className="space-y-4 sm:space-y-6 border-t pt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2 mb-3 sm:mb-4">Work Experience</h2>
                                <div className="space-y-4">
                                    {workExperiences.map(({ id, title, company, startDate, endDate, description }) => (
                                        <Card key={id} className="p-3 sm:p-4">
                                            <div className="space-y-3">
                                                <Input
                                                    type="text"
                                                    placeholder="Job Title"
                                                    value={title}
                                                    onChange={(e) => updateWorkExperience(id, "title", e.target.value)}
                                                    className="w-full"
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="Company"
                                                    value={company}
                                                    onChange={(e) => updateWorkExperience(id, "company", e.target.value)}
                                                    className="w-full"
                                                />
                                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                                    <div className="flex-1">
                                                        <Label htmlFor={`startDate-${id}`} className="mb-1 block text-sm font-medium text-muted-foreground">
                                                            Start Date (YYYY-MM)
                                                        </Label>
                                                        <Input
                                                            id={`startDate-${id}`}
                                                            type="text"
                                                            placeholder="YYYY-MM"
                                                            value={startDate}
                                                            onChange={(e) => updateWorkExperience(id, "startDate", e.target.value)}
                                                            pattern="\d{4}-\d{2}"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <Label htmlFor={`endDate-${id}`} className="mb-1 block text-sm font-medium text-muted-foreground">
                                                            End Date (YYYY-MM)
                                                        </Label>
                                                        <Input
                                                            id={`endDate-${id}`}
                                                            type="text"
                                                            placeholder="YYYY-MM or Present"
                                                            value={endDate}
                                                            onChange={(e) => updateWorkExperience(id, "endDate", e.target.value)}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <Textarea
                                                    placeholder="Description / Achievements"
                                                    value={description}
                                                    onChange={(e) => updateWorkExperience(id, "description", e.target.value)}
                                                    rows={3}
                                                    className="resize-none w-full"
                                                />
                                            </div>
                                        </Card>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addWorkExperience}
                                        className="w-full"
                                    >
                                        + Add More Experience
                                    </Button>
                                </div>
                            </section>

                            {/* Skills */}
                            <section className="space-y-3 sm:space-y-4 border-t pt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2 mb-3 sm:mb-4">Skills</h2>
                                <div className="space-y-3">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Input
                                            type="text"
                                            placeholder="Enter a skill and press Enter"
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    addSkill()
                                                }
                                            }}
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addSkill}
                                            className="sm:w-auto"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    {skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill) => (
                                                <div
                                                    key={skill}
                                                    className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-primary/20 transition-colors"
                                                    onClick={() => removeSkill(skill)}
                                                    title="Click to remove"
                                                >
                                                    {skill}
                                                    <span className="text-xs">×</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Education & Certifications */}
                            <section className="space-y-3 sm:space-y-4 border-t pt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2 mb-3 sm:mb-4">Education & Certifications</h2>
                                <div className="space-y-3">
                                    <Textarea
                                        placeholder="Education Details"
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                        rows={3}
                                        className="resize-none w-full"
                                    />
                                    <Textarea
                                        placeholder="Certifications"
                                        value={certifications}
                                        onChange={(e) => setCertifications(e.target.value)}
                                        rows={3}
                                        className="resize-none w-full"
                                    />
                                </div>
                            </section>

                            {/* Projects */}
                            <section className="space-y-3 sm:space-y-4 border-t pt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2 mb-3 sm:mb-4">Projects</h2>
                                <Textarea
                                    placeholder="Relevant Projects"
                                    value={projects}
                                    onChange={(e) => setProjects(e.target.value)}
                                    rows={3}
                                    className="resize-none w-full"
                                />
                            </section>

                            {/* Resume Upload */}
                            <section className="space-y-2 border-t pt-6">
                                <h2 className="text-xl sm:text-2xl font-semibold border-b pb-2 mb-3 sm:mb-4">Upload Resume (optional)</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="resume-upload"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleResumeUpload}
                                            className="hidden"
                                        />
                                        <Label
                                            htmlFor="resume-upload"
                                            className="flex-1 border rounded-md px-4 py-2 text-sm cursor-pointer hover:bg-accent transition-colors"
                                        >
                                            Choose file
                                        </Label>
                                        <span className="text-sm text-muted-foreground">
                                            PDF, DOC, DOCX (max 5MB)
                                        </span>
                                    </div>
                                    {resumeFile && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-muted-foreground">Selected:</span>
                                            <span className="font-medium">{resumeFile.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => setResumeFile(null)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <div className="pt-6 border-t">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Generating..." : "Generate Resume"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}