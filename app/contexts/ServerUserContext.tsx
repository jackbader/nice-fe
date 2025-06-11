import { cookies } from 'next/headers'
import { cache } from 'react'

// Cache the user fetch to avoid multiple calls
export const getUser = cache(async () => {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('connect.sid')

    if (!sessionCookie) return null

    try {
        const response = await fetch('http://localhost:8000/auth/verify', {
            headers: {
                cookie: `connect.sid=${sessionCookie.value}`,
            },
            cache: 'no-store', // Ensure we always get fresh data
        })

        if (!response.ok) return null

        const data = await response.json()
        return data.user
    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}) 