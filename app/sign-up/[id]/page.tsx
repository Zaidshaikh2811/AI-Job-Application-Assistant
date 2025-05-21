"use client"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signupUser } from "@/lib/api/auth"
import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { useParams } from "next/navigation"

export default function Page() {

    const params = useParams()
    const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;



    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        username: '',
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log(success);

    useEffect(() => {
        if (success) {
            const end = Date.now() + 3 * 1000; // 3 seconds
            const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

            const frame = () => {
                if (Date.now() > end) return;

                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 0, y: 0.5 },
                    colors: colors,
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 1, y: 0.5 },
                    colors: colors,
                });

                requestAnimationFrame(frame);
            };

            frame();
        }
    }, [success])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { password, confirmPassword, username } = formData

        try {
            const response = await signupUser(password, confirmPassword, username, id as string)
            console.log(response);

            if (response.success) {


                setSuccess(true)

                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 3000);

            } else {
                setError(response.error || "Signup failed.")
            }
        } catch (err) {
            console.error(err)
            setError("Something went wrong. Please try again.")
        }

        setLoading(false)
    }




    if (!id) {
        return <div>Invalid ID</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4 relative">
            <form
                onSubmit={handleSubmit}
                className={cn(
                    " shadow-md rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 relative z-10"
                )}
            >
                <h1 className="text-2xl font-semibold text-center text-foreground">
                    Create a Password
                </h1>

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />

                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Password must be at least 8 characters.
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full font-medium text-base"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Set Password"}
                </Button>

                {/* Messages */}
                {error && (
                    <p className="text-sm text-red-500 text-center mt-2">{error}</p>
                )}
                {success && (
                    <p className="text-sm text-green-600 text-center mt-2">
                        Success! Redirecting...
                    </p>
                )}
            </form>
        </div>
    )
}