"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { validateOtp } from "@/actions/login"

export default function OtpPage() {



    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.")
            return
        }


        const email = localStorage.getItem("otp_email");

        if (!email) {
            setError("Session expired. Please sign up again.");
            setLoading(false);
            return;
        }


        try {
            setLoading(true)
            const res = await validateOtp(email, otp)
            if (res.success) {
                setSuccess(true)
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2000)
            } else {
                setError(res.error || "Invalid OTP")
            }
        } catch {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
            <form
                onSubmit={handleSubmit}
                className="bg-background p-6 rounded-xl shadow-md w-full max-w-sm space-y-6"
            >
                <h1 className="text-2xl font-semibold text-center">Verify OTP</h1>

                <div className="space-y-2">
                    <Label htmlFor="otp">Enter the 6-digit OTP sent to your email</Label>
                    <Input
                        id="otp"
                        name="otp"
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        required
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                {success && (
                    <p className="text-sm text-green-600 text-center">
                        OTP verified! Redirecting...
                    </p>
                )}
            </form>
        </div>
    )
}
