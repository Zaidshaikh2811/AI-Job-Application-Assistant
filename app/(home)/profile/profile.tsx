"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalDetails from "@/components/user/profile/PersonalDetails"
import ProfileSummary from "@/components/user/profile/ProfileSummary"
import Education from "@/components/user/profile/Education"
import ProfessionalExperience from "@/components/user/profile/ProfessionalExperience"
import Skills from "@/components/user/profile/Skills"
import LanguageDetails from "@/components/user/profile/LanguageDetails"
import CertificationDetails from "@/components/user/profile/CertificationDetails"
import ProjectDetails from "@/components/user/profile/ProjectDetails"
import Awardetails from "@/components/user/profile/Awardetails"
import CourseDetails from "@/components/user/profile/CourseDetails"
import OrganizationDetails from "@/components/user/profile/OrganizationDetails"
import PublicationDetails from "@/components/user/profile/PublicationDetails"
import Declaration from "@/components/user/profile/Declaration"
import ReferenceDetails from "@/components/user/profile/ReferenceDetails"
import { BorderBeam } from "@/components/magicui/border-beam"

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"

export default function ProfilePage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const urlTab = searchParams.get("tab") || "personal"
    const [tab, setTab] = useState(urlTab)

    // Update state if URL param changes externally
    useEffect(() => {
        if (urlTab !== tab) setTab(urlTab)
    }, [urlTab, tab])

    // Update the URL when tab changes
    const handleTabChange = (newTab: string) => {
        setTab(newTab)
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("tab", newTab)
        router.push(newUrl.toString(), { scroll: false })
    }

    return (
        <div className="  inset-0 overflow-hidden w-full h-full">



            <AnimatedGridPattern className="absolute inset-0 w-full h-full" />
            <div className=" z-10 h-[550px] w-[90%] flex bg-muted/50 backdrop-blur-sm ">
                <BorderBeam className="absolute inset-0 z-0" />
                {/* Tabs Sidebar */}
                <Tabs
                    value={tab}
                    onValueChange={handleTabChange}
                    className="h-full flex flex-col w-full md:w-[220px]   bg-background/50"
                >
                    <TabsList className="flex flex-row md:flex-col gap-2 p-4 h-full md:h-auto md:overflow-y-auto">
                        {[
                            { value: "personal", label: "Personal Details" },
                            { value: "summary", label: "Profile Summary" },
                            { value: "education", label: "Education Details" },
                            { value: "experience", label: "Professional Experience" },
                            { value: "skills", label: "Skills Details" },
                            { value: "languageDetails", label: "Language Details" },
                            { value: "certificationDetails", label: "Certification Details" },
                            { value: "projects", label: "Project Details" },
                            { value: "awardDetails", label: "Award Details" },
                            { value: "courseDetails", label: "Course Details" },
                            { value: "organizationDetails", label: "Organization Details" },
                            { value: "publicationDetails", label: "Publication Details" },
                            { value: "referenceDetails", label: "Reference Details" },
                            { value: "declaration", label: "Declaration" }
                        ].map((item) => (
                            <TabsTrigger
                                key={item.value}
                                value={item.value}
                                className="justify-start whitespace-nowrap py-1 px-3 text-sm rounded-md transition-all duration-200 hover:bg-muted hover:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-white"
                            >
                                {item.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/50">
                    <Card className="h-full w-full shadow-none border-none bg-transparent">
                        {tab === "personal" && <PersonalDetails />}
                        {tab === "summary" && <ProfileSummary />}
                        {tab === "education" && <Education />}
                        {tab === "experience" && <ProfessionalExperience />}
                        {tab === "skills" && <Skills />}
                        {tab === "languageDetails" && <LanguageDetails />}
                        {tab === "certificationDetails" && <CertificationDetails />}
                        {tab === "projects" && <ProjectDetails />}
                        {tab === "awardDetails" && <Awardetails />}
                        {tab === "courseDetails" && <CourseDetails />}
                        {tab === "organizationDetails" && <OrganizationDetails />}
                        {tab === "publicationDetails" && <PublicationDetails />}
                        {tab === "referenceDetails" && <ReferenceDetails />}
                        {tab === "declaration" && <Declaration />}
                    </Card>
                </div>
            </div>

        </div>
    )
}