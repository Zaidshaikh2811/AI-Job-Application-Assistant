"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
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

    function addWorkExperience() {
        setWorkExperiences((prev) => [
            ...prev,
            { id: prev.length + 1, title: "", company: "", startDate: "", endDate: "", description: "" },
        ])
    }

    function updateWorkExperience(id: number, field: keyof WorkExperience, value: string) {
        setWorkExperiences((prev) =>
            prev.map((we) => (we.id === id ? { ...we, [field]: value } : we))
        )
    }

    function addSkill() {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills((prev) => [...prev, skillInput.trim()])
            setSkillInput("")
        }
    }

    function removeSkill(skill: string) {
        setSkills((prev) => prev.filter((s) => s !== skill))
    }

    function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0])
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!jobTitle || !companyName || !jobDescription || !personalName || !email) {
            alert("Please fill all required fields (Job Title, Company Name, Job Description, Name, Email)")
            return
        }

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
            workExperiences,
            resumeFile,
        }

        const dummyData = {
            companyName: "TechNova Solutions",
            jobLocation: "San Francisco, CA",
            tone: "Professional",
            jobDescription: `
          We are looking for a Full Stack Developer with 3+ years of experience in JavaScript frameworks, RESTful APIs, and cloud infrastructure. The ideal candidate should have hands-on experience with React, Node.js, MongoDB, and CI/CD pipelines. Familiarity with Docker and Kubernetes is a plus.
          Responsibilities include:
          - Designing and building scalable web applications.
          - Writing clean, maintainable code.
          - Collaborating with cross-functional teams.
          - Participating in code reviews and agile ceremonies.
            `,
            skills: [
                "JavaScript",
                "React",
                "Node.js",
                "MongoDB",
                "Docker",
                "Kubernetes",
                "REST APIs",
                "Git",
                "CI/CD",
                "AWS"
            ],
            education: "Bachelor of Technology in Computer Science, XYZ University, 2018",
            certifications: "AWS Certified Developer – Associate",
            projects: "SmartHome Dashboard – Developed a full-stack IoT-based dashboard using MERN stack for real-time device control and analytics.",
            personalName: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            linkedin: "https://linkedin.com/in/johndoe",
            workExperiences: [
                {
                    title: "Full Stack Developer",
                    company: "InnovateX Labs",
                    startDate: "01/2021",
                    endDate: "Present",
                    description: "Built and maintained scalable microservices using Node.js and Docker. Led frontend development using React and improved performance by 35%. Integrated third-party APIs and optimized MongoDB queries for faster data access."
                },
                {
                    title: "Software Engineer",
                    company: "ByteForge Technologies",
                    startDate: "06/2018",
                    endDate: "12/2020",
                    description: "Developed RESTful APIs and dynamic UIs for enterprise applications. Automated deployment processes using Jenkins and Docker. Collaborated with UX teams to improve user experience."
                }
            ],
            resumeFilePresent: false
        };
        console.log(data);


        const response = await fetch('/api/generate-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dummyData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const resp = await response.json();



        router.push(`resume/${resp.resumeData._id}`);


    }

    return (
        <div className="relative w-full min-h-screen bg-background overflow-hidden py-10 px-4">
            <GridPattern className="fixed inset-0 w-full h-full text-gray-400 opacity-10 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                <Card className="p-6 sm:p-8">
                    <h1 className="text-4xl font-bold tracking-tight text-primary font-display mb-6">
                        <TextAnimate animation="blurInUp" by="character" once>
                            Add New Job
                        </TextAnimate>
                    </h1>
                    <CardContent className="space-y-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Job Info */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Job Information</h2>
                                <Input
                                    type="text"
                                    placeholder="Job Title *"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="Company Name *"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="Job Location (optional)"
                                    value={jobLocation}
                                    onChange={(e) => setJobLocation(e.target.value)}
                                />
                                <Select onValueChange={(value) => setTone(value)} defaultValue="Professional">
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
                                    className="resize-none"
                                />
                            </section>

                            {/* Personal Info */}
                            <section className="space-y-4 border-t pt-6">
                                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Personal Information</h2>
                                <Input
                                    type="text"
                                    placeholder="Full Name *"
                                    value={personalName}
                                    onChange={(e) => setPersonalName(e.target.value)}
                                    required
                                />
                                <Input
                                    type="email"
                                    placeholder="Email *"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <Input
                                    type="url"
                                    placeholder="LinkedIn Profile URL"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                />
                            </section>

                            {/* Work Experience */}
                            <section className="space-y-6 border-t pt-6">
                                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Work Experience</h2>
                                {workExperiences.map(({ id, title, company, startDate, endDate, description }) => (
                                    <Card key={id} className="p-4">
                                        <div className="space-y-4">
                                            <Input
                                                type="text"
                                                placeholder="Job Title"
                                                value={title}
                                                onChange={(e) => updateWorkExperience(id, "title", e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Company"
                                                value={company}
                                                onChange={(e) => updateWorkExperience(id, "company", e.target.value)}
                                            />
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <Label htmlFor={`startDate-${id}`} className="mb-1 block text-sm font-medium text-muted-foreground">
                                                        Start Date
                                                    </Label>
                                                    <Input
                                                        id={`startDate-${id}`}
                                                        type="month"
                                                        value={startDate}
                                                        onChange={(e) => updateWorkExperience(id, "startDate", e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Label htmlFor={`endDate-${id}`} className="mb-1 block text-sm font-medium text-muted-foreground">
                                                        End Date
                                                    </Label>
                                                    <Input
                                                        id={`endDate-${id}`}
                                                        type="month"
                                                        value={endDate}
                                                        onChange={(e) => updateWorkExperience(id, "endDate", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <Textarea
                                                placeholder="Description / Achievements"
                                                value={description}
                                                onChange={(e) => updateWorkExperience(id, "description", e.target.value)}
                                                rows={3}
                                                className="resize-none"
                                            />
                                        </div>
                                    </Card>
                                ))}
                                <Button type="button" variant="outline" onClick={addWorkExperience} className="w-full">
                                    + Add More Experience
                                </Button>
                            </section>

                            {/* Skills */}
                            <section className="space-y-4 border-t pt-6">
                                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Skills</h2>
                                <div className="flex gap-3">
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
                                    />
                                    <Button type="button" onClick={addSkill}>
                                        Add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill) => (
                                        <div
                                            key={skill}
                                            className="flex items-center gap-2 bg-primary/20 text-primary rounded px-3 py-1 cursor-pointer select-none hover:bg-primary/30"
                                            onClick={() => removeSkill(skill)}
                                            title="Click to remove"
                                        >
                                            {skill} ×
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education & Certifications */}
                            <section className="space-y-4 border-t pt-6">
                                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Education & Certifications</h2>
                                <Textarea
                                    placeholder="Education Details"
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    rows={3}
                                    className="resize-none"
                                />
                                <Textarea
                                    placeholder="Certifications"
                                    value={certifications}
                                    onChange={(e) => setCertifications(e.target.value)}
                                    rows={3}
                                    className="resize-none"
                                />
                            </section>

                            {/* Projects */}
                            <section className="space-y-4 border-t pt-6">
                                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Projects</h2>
                                <Textarea
                                    placeholder="Relevant Projects"
                                    value={projects}
                                    onChange={(e) => setProjects(e.target.value)}
                                    rows={3}
                                    className="resize-none"
                                />
                            </section>

                            {/* Resume Upload */}
                            <section className="space-y-2 border-t pt-6">
                                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Upload Resume (optional)</h2>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeUpload}
                                    className="file-input file-input-bordered w-full"
                                />
                                {resumeFile && <p className="text-sm text-muted-foreground">Selected: {resumeFile.name}</p>}
                            </section>

                            <div className="pt-6 border-t">
                                <Button type="submit" className="w-full">
                                    Generate Job Description
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
