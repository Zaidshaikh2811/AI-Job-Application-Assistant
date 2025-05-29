"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Briefcase } from "lucide-react"
import { MagicCard } from "@/components/magicui/magic-card"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { TextAnimate } from "@/components/magicui/text-animate"
import { toast } from "sonner"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general"
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error("Please fill in all required fields")
            return
        }
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success("Message sent successfully! We'll get back to you within 24 hours.")
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            inquiryType: "general"
        })
        setIsSubmitting(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            value: "support@careerplatform.com",
            description: "Get in touch for any inquiries"
        },
        {
            icon: Phone,
            title: "Call Us",
            value: "+1 (555) 123-4567",
            description: "Mon-Fri, 9AM-6PM EST"
        },
        {
            icon: MapPin,
            title: "Office Location",
            value: "123 Career Street, Suite 100",
            description: "New York, NY 10001"
        },
        {
            icon: Clock,
            title: "Response Time",
            value: "Within 24 hours",
            description: "Average response time"
        }
    ]

    const inquiryTypes = [
        { value: "general", label: "General Inquiry", icon: MessageSquare },
        { value: "support", label: "Technical Support", icon: HelpCircle },
        { value: "career", label: "Career Services", icon: Briefcase },
        { value: "partnership", label: "Partnership", icon: Mail }
    ]

    return (
        <div className="relative w-full overflow-hidden min-h-screen bg-background">
            {/* Background Pattern */}
            <GridPattern
                className="fixed inset-0 w-full h-full text-gray-300 opacity-20 z-0 pointer-events-none"
            />

            <div className="relative z-10 p-6 max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-primary">
                        <TextAnimate animation="blurInUp" by="character" once>
                            Get In Touch
                        </TextAnimate>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions about our resume platform? Need help with your career journey?
                        We&#39;re here to help you succeed.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <MagicCard key={index} gradientOpacity={0.1} className="p-6">
                            <div className="text-center space-y-3">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <info.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary">{info.title}</h3>
                                    <p className="font-medium text-sm mt-1">{info.value}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                                </div>
                            </div>
                        </MagicCard>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <MagicCard gradientOpacity={0.15} className="rounded-2xl shadow-lg">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary">Send us a Message</CardTitle>
                                <p className="text-muted-foreground">
                                    Fill out the form below and we&#39;ll get back to you as soon as possible.
                                </p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">
                                                Full Name *
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your full name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">
                                                Email Address *
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="inquiryType" className="text-sm font-medium">
                                            Inquiry Type
                                        </label>
                                        <select
                                            id="inquiryType"
                                            name="inquiryType"
                                            value={formData.inquiryType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                                        >
                                            {inquiryTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">
                                            Subject *
                                        </label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder="Brief description of your inquiry"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            Message *
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Please provide details about your inquiry..."
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </MagicCard>

                    {/* FAQ Section */}
                    <div className="space-y-6">
                        <MagicCard gradientOpacity={0.15} className="rounded-2xl shadow-lg">
                            <Card className="border-0 shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-primary">Frequently Asked Questions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-primary">How does the ATS scoring work?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Our ATS scoring system analyzes your resume against industry standards and job requirements,
                                            providing a score from 0-100% to help optimize your resume for applicant tracking systems.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-primary">Can I create multiple resumes?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Yes! You can create unlimited resumes tailored for different industries,
                                            job positions, and experience levels to maximize your job application success.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-primary">What templates are available?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            We offer a variety of professional templates designed for different industries
                                            and career levels, all optimized for ATS compatibility.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-primary">Is my data secure?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Absolutely. We use enterprise-grade security measures to protect your personal
                                            information and resume data. Your privacy is our top priority.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </MagicCard>

                        {/* Quick Contact Options */}
                        <MagicCard gradientOpacity={0.1} className="p-6">
                            <div className="text-center space-y-4">
                                <h3 className="text-lg font-semibold text-primary">Need Immediate Help?</h3>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Badge variant="secondary" className="px-4 py-2">
                                        <Mail className="h-4 w-4 mr-2" />
                                        support@careerplatform.com
                                    </Badge>
                                    <Badge variant="outline" className="px-4 py-2">
                                        <Clock className="h-4 w-4 mr-2" />
                                        24/7 Support Available
                                    </Badge>
                                </div>
                            </div>
                        </MagicCard>
                    </div>
                </div>
            </div>
        </div>
    )
}