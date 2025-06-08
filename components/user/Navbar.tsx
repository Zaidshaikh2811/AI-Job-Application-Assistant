'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, X, Moon, Sun, LogOut, User, Settings, Home, Info, Mail, FolderOpen, FileText, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

// Types
interface NavigationLink {
    href: string
    label: string
    icon: LucideIcon
}

interface MobileNavLinksProps {
    links: NavigationLink[]
    onLinkClick: () => void
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true) // Mock auth state

    const { setTheme } = useTheme()

    const handleLogout = (): void => {
        setIsAuthenticated(false)
        setIsOpen(false)
        // In real app: logoutUser(); logout(); router.push('/');
    }

    const navigationLinks: NavigationLink[] = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/about', label: 'About', icon: Info },
        { href: '/contact', label: 'Contact', icon: Mail },
    ]

    const authenticatedLinks: NavigationLink[] = [
        { href: '/dashboard', label: 'Projects', icon: FolderOpen },
        { href: '/resume', label: 'Resume', icon: FileText },
        { href: '/resume-check', label: 'resume-check   ', icon: FileText },
        { href: '/profile', label: 'Profile', icon: User },
    ]

    const ThemeToggle: React.FC = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                    onClick={() => setTheme('light')}
                    className="cursor-pointer"
                >
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('dark')}
                    className="cursor-pointer"
                >
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('system')}
                    className="cursor-pointer"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const UserMenu: React.FC = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/dashboard" className="flex items-center">
                        <FolderOpen className="mr-2 h-4 w-4" />
                        <span>Projects</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/resume" className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Resume</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ links, onLinkClick }) => (
        <div className="flex flex-col space-y-3">
            {links.map((link) => {
                const Icon = link.icon
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={onLinkClick}
                        className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-accent"
                    >
                        <Icon className="h-4 w-4" />
                        <span>{link.label}</span>
                    </Link>
                )
            })}
        </div>
    )

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4">
                {/* Logo */}
                <div className="mr-6 flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">M</span>
                        </div>
                        <span className="hidden font-bold text-lg sm:inline-block">MyApp</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-6 flex-1">
                    <nav className="flex items-center space-x-6">
                        {navigationLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{link.label}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right side items */}
                    <div className="ml-auto flex items-center space-x-2">
                        <ThemeToggle />
                        {isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/login">Sign in</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href="/register">Sign up</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden ml-auto items-center space-x-2">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <SheetHeader>
                                <SheetTitle className="text-left">Navigation</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 space-y-6">
                                {/* Main Navigation */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Main</h3>
                                    <MobileNavLinks
                                        links={navigationLinks}
                                        onLinkClick={() => setIsOpen(false)}
                                    />
                                </div>

                                {/* Authenticated Navigation */}
                                {isAuthenticated && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
                                        <MobileNavLinks
                                            links={authenticatedLinks}
                                            onLinkClick={() => setIsOpen(false)}
                                        />
                                        <div className="mt-4 pt-4 border-t">
                                            <Button
                                                variant="ghost"
                                                onClick={handleLogout}
                                                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Sign in/up for unauthenticated users */}
                                {!isAuthenticated && (
                                    <div className="space-y-2">
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                                Sign in
                                            </Link>
                                        </Button>
                                        <Button className="w-full" asChild>
                                            <Link href="/register" onClick={() => setIsOpen(false)}>
                                                Sign up
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Navbar