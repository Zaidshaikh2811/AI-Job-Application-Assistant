import Footer from '@/components/user/Footer'
import Navbar from '@/components/user/Navbar'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "AI Job Application Assistant | Your Smart Job Tool",
    description: "Generate tailored resumes, cover letters, and track your job applications with AI.",
}


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default layout
