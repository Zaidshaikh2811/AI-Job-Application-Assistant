'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { templates } from '@/components/templates'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Page = () => {
    const router = useRouter()

    return (
        <div className="relative min-h-screen bg-background text-foreground">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <DotPattern className="h-full w-full opacity-20" />
            </div>

            {/* Page Content */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 space-y-12">
                <h1 className="text-4xl font-bold text-center">Select a Resume Template</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                        >
                            <div className="p-4 space-y-4">
                                <h2 className="text-lg font-semibold text-center">{template.name}</h2>

                                <div className="aspect-[8.5/11] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <Image
                                        src={template.image}
                                        alt={template.name}
                                        width={500}
                                        height={700}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <Button
                                    onClick={() => router.push(`/fill-details?template=${template.id}`)}
                                    className="w-full mt-2"
                                >
                                    Use This Template
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Page
