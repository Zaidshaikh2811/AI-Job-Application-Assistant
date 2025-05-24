"use client";

import React, { useState } from "react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Target,
    FileText,
    Briefcase,
    GraduationCap,
    Code,
    FolderOpen,
    Award,
    Globe,
    Trophy,
    Heart,
    Settings,
    ChevronRight
} from "lucide-react";
import PersonalInfo from "@/components/user/profiletwo/PersonalInfo";
import JobTargeting from "@/components/user/profiletwo/JobTargeting";
import Summary from "@/components/user/profiletwo/Summary";
import WorkExperience from "@/components/user/profiletwo/WorkExperience";
import EducationPage from "@/components/user/profiletwo/EducationPage";
import SkillsPage from "@/components/user/profiletwo/SkillsPage";
import ProjectsPage from "@/components/user/profiletwo/ProjectsPage";
import CertificationsPage from "@/components/user/profiletwo/CertificationsPage";
import LanguagesPage from "@/components/user/profiletwo/LanguagesPage";
import AchievementsPage from "@/components/user/profiletwo/AchievementsPage";
import HobbiesPage from "@/components/user/profiletwo/HobbiesPage";
import ResumeSettings from "@/components/user/profiletwo/ResumeSettings";

// Mock components for demonstration


const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState("personal");

    const tabItems = [
        { value: "personal", label: "Personal Info", icon: User, color: "bg-blue-500" },
        { value: "job", label: "Job Targeting", icon: Target, color: "bg-emerald-500" },
        { value: "summary", label: "Summary", icon: FileText, color: "bg-purple-500" },
        { value: "experience", label: "Work Experience", icon: Briefcase, color: "bg-orange-500" },
        { value: "education", label: "Education", icon: GraduationCap, color: "bg-indigo-500" },
        { value: "skills", label: "Skills", icon: Code, color: "bg-cyan-500" },
        { value: "projects", label: "Projects", icon: FolderOpen, color: "bg-pink-500" },
        { value: "certifications", label: "Certifications", icon: Award, color: "bg-yellow-500" },
        { value: "languages", label: "Languages", icon: Globe, color: "bg-green-500" },
        { value: "achievements", label: "Achievements", icon: Trophy, color: "bg-amber-500" },
        { value: "hobbies", label: "Hobbies", icon: Heart, color: "bg-rose-500" },
        { value: "resume", label: "Resume Settings", icon: Settings, color: "bg-slate-500" },
    ];

    const getTabProgress = (tabValue: string) => {
        // Mock progress data - in real app this would come from your data
        const progress = {
            personal: 85,
            job: 60,
            summary: 90,
            experience: 75,
            education: 100,
            skills: 45,
            projects: 30,
            certifications: 0,
            languages: 80,
            achievements: 25,
            hobbies: 70,
            resume: 95
        };
        return progress[tabValue as keyof typeof progress] || 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <User className="h-4 w-4" />
                        Profile Builder
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Build Your Professional Profile
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Complete your profile to create a comprehensive resume that stands out to employers
                    </p>
                </div>

                {/* Main Content */}
                <Card className="overflow-hidden shadow-xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
                    <CardContent className="p-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col lg:flex-row min-h-[600px]">
                            {/* Sidebar Navigation */}
                            <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-muted/30">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                            <User className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">Profile Sections</h3>
                                            <p className="text-sm text-muted-foreground">Complete all sections</p>
                                        </div>
                                    </div>

                                    <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 space-y-1">
                                        {tabItems.map(({ value, label, icon: Icon, color }) => {
                                            const progress = getTabProgress(value);
                                            const isActive = activeTab === value;

                                            return (
                                                <TabsTrigger
                                                    key={value}
                                                    value={value}
                                                    className={`
                                                        w-full justify-start h-auto p-0 bg-transparent data-[state=active]:bg-transparent
                                                        ${isActive ? 'shadow-none' : ''}
                                                    `}
                                                >
                                                    <div className={`
                                                        w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                                                        ${isActive
                                                            ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02]'
                                                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                                        }
                                                    `}>
                                                        <div className={`
                                                            flex-shrink-0 h-8 w-8 rounded-md flex items-center justify-center
                                                            ${isActive ? 'bg-primary-foreground/20' : `${color}/20`}
                                                        `}>
                                                            <Icon className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-foreground'}`} />
                                                        </div>

                                                        <div className="flex-1 text-left min-w-0">
                                                            <div className="font-medium text-sm truncate">{label}</div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full transition-all duration-500 ${isActive ? 'bg-primary-foreground/60' : 'bg-primary'
                                                                            }`}
                                                                        style={{ width: `${progress}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-xs font-medium min-w-[2rem]">
                                                                    {progress}%
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {isActive && (
                                                            <ChevronRight className="h-4 w-4 text-primary-foreground/80" />
                                                        )}
                                                    </div>
                                                </TabsTrigger>
                                            );
                                        })}
                                    </TabsList>

                                    {/* Progress Summary */}
                                    <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-foreground">Overall Progress</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {Math.round(tabItems.reduce((acc, item) => acc + getTabProgress(item.value), 0) / tabItems.length)}%
                                            </Badge>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000"
                                                style={{
                                                    width: `${Math.round(tabItems.reduce((acc, item) => acc + getTabProgress(item.value), 0) / tabItems.length)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-6  ">
                                <TabsContent value="personal">
                                    <PersonalInfo />
                                </TabsContent>
                                <TabsContent value="job">
                                    <JobTargeting />
                                </TabsContent>
                                <TabsContent value="summary">
                                    <Summary />
                                </TabsContent>
                                <TabsContent value="experience">
                                    <WorkExperience />
                                </TabsContent>
                                <TabsContent value="education">
                                    <EducationPage />
                                </TabsContent>
                                <TabsContent value="skills">
                                    <SkillsPage />
                                </TabsContent>
                                <TabsContent value="projects">
                                    <ProjectsPage />
                                </TabsContent>
                                <TabsContent value="certifications">
                                    <CertificationsPage />
                                </TabsContent>
                                <TabsContent value="languages">
                                    <LanguagesPage />
                                </TabsContent>
                                <TabsContent value="achievements">
                                    <AchievementsPage />
                                </TabsContent>
                                <TabsContent value="hobbies">
                                    <HobbiesPage />
                                </TabsContent>
                                <TabsContent value="resume">
                                    <ResumeSettings />
                                </TabsContent>

                            </div>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfileTabs;