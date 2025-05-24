// components/Hero.tsx

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { TextAnimateDemo2 } from './TextAnimation'
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
const Hero = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12   max-w-7xl mx-auto">
            {/* Text Content */}
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    <TextAnimateDemo2>Supercharge Your Job Search with </TextAnimateDemo2> <SparklesText className='text-4xl'> AI-Powered Applications</SparklesText>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl">
                    Instantly generate personalized resume bullets, tailor-made cover letters, and track your job applications—all in one place.
                </p>
                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                    <Link href="/sign-up">
                        <button className="border border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary/10 transition">

                            <AnimatedShinyText>
                                Get Started Free
                            </AnimatedShinyText>
                        </button>
                    </Link>
                    <Link href="/pricing">
                        <button className="bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-primary/90 transition">
                            See Pricing
                        </button>
                    </Link>
                </div>
            </div>

            {/* Illustration */}
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <Image
                    src="/undraw_hiring_8szx.svg"
                    alt="Job Search Illustration"
                    width={500}
                    height={500}
                    className="w-full max-w-md"
                    priority
                />
            </div>
        </section>
    )
}

export default Hero
