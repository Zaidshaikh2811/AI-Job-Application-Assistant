export const loginUser = async (email: string, password: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.message || 'Login failed')

        return { success: true, data }
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage }
    }
}

export const sendMagicLink = async (name: string, email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
        return { success: false, error: 'Passwords do not match' }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-magic-link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.message || 'Signup failed')



        return { success: true, data }
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage }
    }
}

// Example (in @/lib/api/auth.ts)
export async function signupUser(password: string, confirmPassword: string, username: string, code: string) {
    try {
        console.log(password, confirmPassword);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup/${code}`, {
            method: 'POST',
            body: JSON.stringify({ password, confirmPassword, name: username }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        return { success: response.ok, data, error: data?.message || "Signup failed" }
    } catch {
        return { success: false, error: "Network error" }
    }
}
