import React from 'react'
import HeroVideoDialog from '../magicui/hero-video-dialog'

const DemoVideo = () => {
    return (
        <section className="w-full py-20 px-6 bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
                    Watch Our Demo
                </h2>
                <p className="text-muted-foreground mb-10 text-lg">
                    Explore the features and benefits of our platform through this short video presentation.
                </p>

                <div className="relative rounded-xl overflow-hidden shadow-xl transition hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
                    {/* Light mode video */}
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                        thumbnailAlt="Hero Video"
                    />

                    {/* Dark mode video */}
                    <HeroVideoDialog
                        className="hidden dark:block"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                        thumbnailAlt="Hero Video"
                    />
                </div>
            </div>
        </section>
    )
}

export default DemoVideo
