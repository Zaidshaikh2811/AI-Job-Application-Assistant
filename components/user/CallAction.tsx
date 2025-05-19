import Link from 'next/link'
import React from 'react'

const CallAction = () => {
    return (
        <section className="bg-primary/10 py-16 mt-20" >
            <div className="max-w-3xl mx-auto text-center space-y-6 px-6">
                <h2 className="text-3xl font-bold text-primary">Ready to speed up your job applications?</h2>
                <p className="text-lg text-muted-foreground">
                    Sign up today and get personalized AI assistance to land your next job faster.
                </p>
                <Link href="/signup" className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition">
                    Get Started for Free
                </Link>
            </div>
        </section>
    )
}

export default CallAction
