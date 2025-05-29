"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Target,
    Users,
    Award,
    TrendingUp,
    Zap,
    Shield,
    Brain,
    Rocket,
    CheckCircle,
    Star,
    ArrowRight
} from "lucide-react"
import { MagicCard } from "@/components/magicui/magic-card"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { TextAnimate } from "@/components/magicui/text-animate"
import Link from "next/link"

export default function AboutPage() {
    const stats = [
        { number: "50,000+", label: "Resumes Created", icon: Target },
        { number: "10,000+", label: "Happy Users", icon: Users },
        { number: "95%", label: "Success Rate", icon: Award },
        { number: "85%", label: "Avg ATS Score", icon: TrendingUp }
    ]

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Analysis",
            description: "Our advanced AI analyzes your resume against industry standards and provides intelligent recommendations for improvement."
        },
        {
            icon: Shield,
            title: "ATS Optimization",
            description: "Ensure your resume passes through Applicant Tracking Systems with our specialized optimization algorithms."
        },
        {
            icon: Zap,
            title: "Real-time Scoring",
            description: "Get instant feedback on your resume quality with our comprehensive scoring system that updates in real-time."
        },
        {
            icon: Rocket,
            title: "Multiple Templates",
            description: "Choose from professionally designed templates tailored for different industries and experience levels."
        }
    ]

    const values = [
        {
            title: "Innovation",
            description: "We continuously innovate to provide cutting-edge career tools that give you a competitive advantage."
        },
        {
            title: "Quality",
            description: "Every feature is built with meticulous attention to detail to ensure the highest quality experience."
        },
        {
            title: "Accessibility",
            description: "We believe career success tools should be accessible to everyone, regardless of their background."
        },
        {
            title: "Privacy",
            description: "Your personal information and career data are protected with enterprise-grade security measures."
        }
    ]

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "CEO & Co-Founder",
            background: "Former HR Director at Fortune 500 companies"
        },
        {
            name: "Michael Chen",
            role: "CTO & Co-Founder",
            background: "AI/ML Expert with 10+ years experience"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Product",
            background: "UX Designer & Career Counselor"
        },
        {
            name: "David Kim",
            role: "Lead Engineer",
            background: "Full-stack developer & Resume optimization specialist"
        }
    ]

    const milestones = [
        { year: "2020", event: "Company Founded", description: "Started with a vision to revolutionize resume creation" },
        { year: "2021", event: "AI Integration", description: "Launched our first AI-powered resume analysis feature" },
        { year: "2022", event: "10K Users", description: "Reached 10,000 active users milestone" },
        { year: "2023", event: "Enterprise Launch", description: "Expanded to serve enterprise clients and universities" },
        { year: "2024", event: "50K Resumes", description: "Helped create over 50,000 successful resumes" }
    ]

    return (
        <div className="relative w-full overflow-hidden min-h-screen bg-background">
            {/* Background Pattern */}
            <GridPattern
                className="fixed inset-0 w-full h-full text-gray-300 opacity-20 z-0 pointer-events-none"
            />

            <div className="relative z-10 p-6 max-w-6xl mx-auto space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display text-primary">
                        <TextAnimate animation="blurInUp" by="character" once>
                            About Our Platform
                        </TextAnimate>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We&#39;re on a mission to empower job seekers with AI-driven tools that transform
                        how resumes are created, optimized, and presented to potential employers.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <MagicCard key={index} gradientOpacity={0.1} className="p-6">
                            <div className="text-center space-y-3">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">{stat.number}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            </div>
                        </MagicCard>
                    ))}
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <MagicCard gradientOpacity={0.15} className="rounded-2xl shadow-lg">
                        <Card className="border-0 shadow-none h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                                    <Target className="h-6 w-6" />
                                    Our Mission
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    To democratize career success by providing intelligent, accessible tools that help
                                    every job seeker create compelling resumes that stand out in today&#39;s competitive market.
                                    We believe that everyone deserves the opportunity to present their best professional self.
                                </p>
                            </CardContent>
                        </Card>
                    </MagicCard>

                    <MagicCard gradientOpacity={0.15} className="rounded-2xl shadow-lg">
                        <Card className="border-0 shadow-none h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                                    <Rocket className="h-6 w-6" />
                                    Our Vision
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    To become the world&#39;s leading platform for career advancement, where AI and human
                                    expertise combine to create unprecedented opportunities for professional growth.
                                    We envision a future where every job application is optimized for success.
                                </p>
                            </CardContent>
                        </Card>
                    </MagicCard>
                </div>

                {/* Features Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Our Platform?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our platform combines cutting-edge technology with career expertise to deliver
                            results that make a real difference in your job search.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <MagicCard key={index} gradientOpacity={0.1} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            </MagicCard>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            These principles guide everything we do and shape how we serve our community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <MagicCard key={index} gradientOpacity={0.08} className="p-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <h3 className="font-semibold text-primary">{value.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            </MagicCard>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our diverse team of experts combines deep industry knowledge with cutting-edge technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <MagicCard key={index} gradientOpacity={0.1} className="p-6">
                                <div className="text-center space-y-3">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                                        <Users className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary">{member.name}</h3>
                                        <p className="text-sm font-medium text-blue-600">{member.role}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{member.background}</p>
                                    </div>
                                </div>
                            </MagicCard>
                        ))}
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-4">Our Journey</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            From a simple idea to a comprehensive career platform trusted by thousands.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {milestones.map((milestone, index) => (
                            <MagicCard key={index} gradientOpacity={0.08} className="p-4">
                                <div className="text-center space-y-2">
                                    <Badge variant="secondary" className="mb-2">
                                        {milestone.year}
                                    </Badge>
                                    <h4 className="font-semibold text-primary text-sm">{milestone.event}</h4>
                                    <p className="text-xs text-muted-foreground">{milestone.description}</p>
                                </div>
                            </MagicCard>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <MagicCard gradientOpacity={0.15} className="rounded-2xl shadow-lg">
                    <div className="p-8 text-center space-y-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold text-primary">Ready to Transform Your Career?</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Join thousands of successful job seekers who have used our platform to land their dream jobs.
                                Start creating your optimized resume today.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" asChild>
                                <Link href="/dashboard">
                                    Get Started Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-6 pt-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
                            </div>
                            <Badge variant="secondary">
                                Trusted by 50K+ Users
                            </Badge>
                        </div>
                    </div>
                </MagicCard>
            </div>
        </div>
    )
}