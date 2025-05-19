"use client"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import Link from "next/link"

interface AuthFormProps {
  type: "login" | "signup"
  className?: string
}

export function LoginForm({ type, className }: AuthFormProps) {
  const isLogin = type === "login"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/signup logic
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
    >
      <h1 className="text-2xl font-semibold text-center">
        {isLogin ? "Welcome Back" : "Create Your Account"}
      </h1>

      <div className="grid gap-6">
        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input id="password" type="password" required />
          {!isLogin && (
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters.
            </p>
          )}
        </div>

        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" required />
          </div>
        )}

        <Button
          type="submit"
          className="w-full text-foreground font-medium text-base hover:bg-primary/90 "
        >
          {isLogin ? "Login" : "Create Account"}
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
    </form >
  )
}
