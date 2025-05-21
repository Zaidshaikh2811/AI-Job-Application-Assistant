'use server'

export async function loginAction(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    try {
        const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            cache: 'no-store',
        })

        const data = await res.json()

        if (!res.ok) {
            return { error: data.message || 'Login failed' }
        }

        // You could set cookies here using next/headers, or return tokens
        return { success: true, user: data.user }
    } catch (error: unknown) {
        console.error('Login error:', error)
        return { error: 'Server error. Try again later.' }
    }
}
