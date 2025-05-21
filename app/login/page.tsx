import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import Image from "next/image"
import { BorderBeam } from "@/components/magicui/border-beam"

export const metadata = {
  title: "Login",
  description: "Login to your account",
}


export default function LoginPage() {





  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-sm rounded-xl bg-background p-6 shadow-xl overflow-hidden border border-border dark:border-neutral-800">

            <BorderBeam
            />
            <LoginForm type="login"
            />
          </div>
        </div>
      </div>
      <div className="  relative hidden lg:block">
        <Image
          src="/undraw_enter-password_1kl4.svg"
          alt="Login illustration"
          fill
          className="object-contain p-12 dark:brightness-75  "
          priority
        />
      </div>
    </div>
  )
}
