import React from 'react'
import { CheckCircle, FileText, Monitor, Clock } from "lucide-react"
import { AnimatedList } from "@/components/magicui/animated-list";
import { BoxReveal } from "@/components/magicui/box-reveal";


const features = [
    {
        icon: <FileText className="w-8 h-8 text-primary" />,
        title: "Tailored Resume Bullets",
        description: "Paste your job description and get AI-powered, optimized resume points.",
    },
    {
        icon: <Monitor className="w-8 h-8 text-primary" />,
        title: "AI-Generated Cover Letters",
        description: "Personalized cover letters generated instantly for every job.",
    },
    {
        icon: <Clock className="w-8 h-8 text-primary" />,
        title: "Job Application Tracking",
        description: "Keep all your job applications organized and track their status.",
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-primary" />,
        title: "Resume Match Scoring",
        description: "AI evaluates your resume match percentage for each job posting.",
    },
]

const Feature = () => {
    return (


        <div>
            {/* Section Heading */}
            < div className="text-center mb-16" >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    <BoxReveal>Powerful Features</BoxReveal>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Everything you need to streamline and personalize your job applications.
                </p>
            </ div >

            {/* Features List */}
            <   AnimatedList delay={500} >
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                    {features.map(({ icon, title, description }, idx) => (
                        <div key={idx} className="flex flex-col items-center md:items-start space-y-4">
                            <div className="bg-primary/10 rounded-xl p-4 shadow-md">{icon}</div>
                            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                            <p className="text-muted-foreground max-w-xs">{description}</p>
                        </div>
                    ))}
                </section>
            </AnimatedList>
        </div>


    )
}

export default Feature
