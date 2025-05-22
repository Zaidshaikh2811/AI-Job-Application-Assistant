"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type PersonalDetailsForm = {
    fullName: string;
    jobTitle: string;
    location: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    nationality: string;
    passport: string;
    maritalStatus: string;
    militaryService: string;
    genderPronouns: string;
    visa: string;
    drivingLicense: string;
    linkedIn: string;
    github: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    website: string;
    other: string;
};

export default function PersonalDetails() {
    const [formData, setFormData] = useState<PersonalDetailsForm>({
        fullName: "",
        jobTitle: "",
        location: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        nationality: "",
        passport: "",
        maritalStatus: "",
        militaryService: "",
        genderPronouns: "",
        visa: "",
        drivingLicense: "",
        linkedIn: "",
        github: "",
        twitter: "",
        facebook: "",
        instagram: "",
        youtube: "",
        website: "",
        other: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <form className="space-y-8 p-0 md:p-6 w-full">
            <h2 className="text-2xl font-bold">Personal Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 ">
                {[
                    { label: "Full Name", name: "fullName", type: "text", placeholder: "Full Name" },
                    { label: "Job Title", name: "jobTitle", type: "text", placeholder: "Job Title" },
                    { label: "Email", name: "email", type: "email", placeholder: "Email" },
                    { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "Phone Number" },
                    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                    { label: "Nationality", name: "nationality", type: "text", placeholder: "Nationality" },
                    { label: "Passport", name: "passport", type: "text", placeholder: "Passport Number" },
                    { label: "Military Service", name: "militaryService", type: "text", placeholder: "Military Service" },
                    { label: "Gender Pronouns", name: "genderPronouns", type: "text", placeholder: "Gender Pronouns" },
                    { label: "Visa", name: "visa", type: "text", placeholder: "Visa Details" },
                    { label: "Driving License", name: "drivingLicense", type: "text", placeholder: "Driving License" },
                    { label: "LinkedIn", name: "linkedIn", type: "url", placeholder: "LinkedIn URL" },
                    { label: "GitHub", name: "github", type: "url", placeholder: "GitHub URL" },
                    { label: "Twitter", name: "twitter", type: "url", placeholder: "Twitter URL" },
                    { label: "Facebook", name: "facebook", type: "url", placeholder: "Facebook URL" },
                    { label: "Instagram", name: "instagram", type: "url", placeholder: "Instagram URL" },
                    { label: "YouTube", name: "youtube", type: "url", placeholder: "YouTube URL" },
                    { label: "Website", name: "website", type: "url", placeholder: "Website URL" },
                ].map((field, index) => (
                    <div className="space-y-1 gap-2" key={index}>
                        <Label className="mb-2" htmlFor={field.name}>{field.label}</Label>
                        <Input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            value={formData[field.name as keyof PersonalDetailsForm]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}

                {/* Marital Status */}
                <div className="space-y-1">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                        value={formData.maritalStatus}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, maritalStatus: value }))}
                    >
                        <SelectTrigger id="maritalStatus">
                            <SelectValue placeholder="Select Marital Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Other field - full width */}
                <div className="col-span-full space-y-1">
                    <Label htmlFor="other">Other</Label>
                    <Input
                        type="text"
                        name="other"
                        id="other"
                        value={formData.other}
                        onChange={handleChange}
                        placeholder="Other details"
                    />
                </div>
            </div>
            <div>
                <Button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200 cursor-pointer"
                >
                    Save Changes
                </Button>
            </div>
        </form>
    )
}
