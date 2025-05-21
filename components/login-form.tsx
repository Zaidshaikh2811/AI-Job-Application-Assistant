"use client"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import Link from "next/link"
import { loginUser, sendMagicLink } from "@/lib/api/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"


interface AuthFormProps {
  type: "login" | "signup"
  className?: string
}

export function LoginForm({ type, className }: AuthFormProps) {
  const router = useRouter()
  const isLogin = type === "login"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)


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
    setSuccess(false)

    const { name, email, password, confirmPassword } = formData
    let response

    if (type === 'login') {
      response = await loginUser(email, password)
      if (response.success) {
        setSuccess(true)
        router.push("/dashboard") // or wherever you want to redirect after login
      } else {
        setError(response.error ?? "An unknown error occurred.")
      }
    } else {
      response = await sendMagicLink(name, email, password, confirmPassword)
      if (response.success) {
        setSuccess(true)
        console.log(response.data.data);

        router.push(`/sign-up/${response.data.data}`) // dynamic route after signup
      } else {
        setError(response.error ?? "An unknown error occurred.")
      }
    }

    setLoading(false)
  }


  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)}>
      <h1 className="text-2xl font-semibold text-center">
        {isLogin ? "Welcome Back" : "Create Your Account"}
      </h1>

      <div className="grid gap-6">
        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters.
            </p>
          )}
        </div>

        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full text-foreground font-medium text-base hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline hover:text-primary">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Login
            </Link>
          </>
        )}
      </div>

      {/* Show success or error */}
      {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
      {success && <p className="text-sm text-green-600 text-center mt-2">Success!</p>}
    </form>

  )
}
