import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className=" w-full  text-foreground py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
                <p>© {new Date().getFullYear()} AI Job Application Assistant. All rights reserved.</p>
                <div className="flex space-x-6">
                    <Link href="/privacy" className="hover:underline">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:underline">
                        Terms of Service
                    </Link>
                    <Link href="/contact" className="hover:underline">
                        Contact Us
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
