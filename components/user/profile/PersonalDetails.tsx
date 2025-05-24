"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

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
    LinkedIn: string;
    GitHub: string;
    Twitter: string;
    Facebook: string;
    Instagram: string;
    YouTube: string;
    Website: string;
    Other: string;
};

const defaultForm: PersonalDetailsForm = {
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
    LinkedIn: "",
    GitHub: "",
    Twitter: "",
    Facebook: "",
    Instagram: "",
    YouTube: "",
    Website: "",
    Other: "",
};

export default function PersonalDetails() {
    const [formData, setFormData] = useState<PersonalDetailsForm>(defaultForm);
    const [originalData, setOriginalData] = useState<PersonalDetailsForm>(defaultForm);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/personal-details`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch personal details");
                const { data } = await res.json();


                const mappedData: PersonalDetailsForm = {
                    fullName: data.fullName || "",
                    jobTitle: data.jobTitle || "",
                    location: data.location || "",
                    email: data.email || "",
                    phoneNumber: data.phone || "",
                    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : "", // format date
                    nationality: data.nationality || "",
                    passport: data.passport_govt_id || "",
                    maritalStatus: data.maritalStatus || "",
                    militaryService: data.militaryService || "",
                    genderPronouns: data.genderPronoun || "",
                    visa: data.visa || "",
                    drivingLicense: data.drivingLicense || "",
                    LinkedIn: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "Linkedin")?.url || "",
                    GitHub: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "GitHub")?.url || "",
                    Twitter: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "Twitter")?.url || "",
                    Facebook: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "Facebook")?.url || "",
                    Instagram: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "Instagram")?.url || "",
                    YouTube: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "YouTube")?.url || "",
                    Website: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "Website")?.url || "",
                    Other: data.socialLinks?.find((s: { platform: string; url: string }) => s.platform === "Other")?.url || "",
                };

                setFormData(mappedData);
                setOriginalData(mappedData);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load personal details");
            }
        };

        fetchData();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Check if data has changed
        if (JSON.stringify(formData) === JSON.stringify(originalData)) {
            toast.info("No changes to save.");
            return;
        }

        try {
            const payload = {
                fullName: formData.fullName || undefined,
                jobTitle: formData.jobTitle || undefined,
                email: formData.email || undefined,
                phone: formData.phoneNumber || undefined,
                location: formData.location || undefined,
                dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
                nationality: formData.nationality || undefined,
                passport_govt_id: formData.passport || undefined,
                maritalStatus: formData.maritalStatus || undefined,
                militaryService: formData.militaryService || undefined,
                drivingLicense: formData.drivingLicense || undefined,
                genderPronoun: formData.genderPronouns || undefined,
                visa: formData.visa || undefined,
                socialLinks: [
                    { platform: "linkedin", url: formData.LinkedIn },
                    { platform: "GitHub", url: formData.GitHub },
                    { platform: "Twitter", url: formData.Twitter },
                    { platform: "Facebook", url: formData.Facebook },
                    { platform: "Instagram", url: formData.Instagram },
                    { platform: "YouTube", url: formData.YouTube },
                    { platform: "Website", url: formData.Website },
                    { platform: "Other", url: formData.Other },
                ].filter(link => link.url)
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/personal-details`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            toast.success("Profile updated successfully!");
            setOriginalData(formData); // update the original after success
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Something went wrong");
                console.error("Update error:", error);
            } else {
                toast.error("Something went wrong");
                console.error("Update error:", error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 p-0 md:p-6 w-full">
            <h2 className="text-2xl font-bold">Personal Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
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
                    { label: "GitHub", name: "GitHub", type: "url", placeholder: "GitHub URL" },
                    { label: "Twitter", name: "Twitter", type: "url", placeholder: "Twitter URL" },
                    { label: "Facebook", name: "Facebook", type: "url", placeholder: "Facebook URL" },
                    { label: "Instagram", name: "Instagram", type: "url", placeholder: "Instagram URL" },
                    { label: "YouTube", name: "YouTube", type: "url", placeholder: "YouTube URL" },
                    { label: "Website", name: "Website", type: "url", placeholder: "Website URL" },
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
                    <Label className="mb-2" htmlFor="maritalStatus">Marital Status</Label>
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

                {/* Other Field */}
                <div className="col-span-full space-y-1">
                    <Label className="mb-2" htmlFor="Other">Other</Label>
                    <Input
                        type="text"
                        name="Other"
                        id="Other"
                        value={formData.Other}
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
    );
}
