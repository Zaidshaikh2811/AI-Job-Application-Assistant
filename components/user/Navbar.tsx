'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { setTheme } = useTheme()

    const toggleMenu = () => setIsOpen(!isOpen)

    const ThemeToggle = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    return (
        <nav className=" backdrop-blur-md bg-background/70 shadow-md fixed top-0 left-0 w-full z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-xl font-bold text-primary">MyApp</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-6 items-center">
                        <ThemeToggle />
                        <Link href="/" className="text-foreground hover:text-primary transition">Home</Link>
                        <Link href="/about" className="text-foreground hover:text-primary transition">About</Link>
                        <Link href="/projects" className="text-foreground hover:text-primary transition">Projects</Link>
                        <Link href="/contact" className="text-foreground hover:text-primary transition">Contact</Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} aria-label="Toggle menu">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 space-y-2">
                    <ThemeToggle />
                    <Link href="/" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary">Home</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary">About</Link>
                    <Link href="/projects" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary">Projects</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary">Contact</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar
