import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that should be protected
const protectedPaths = ['/dashboard', '/settings']
// Add paths that should be accessible only to non-authenticated users
const authPaths = ['/login', '/signup']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if the path is protected
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
    const isAuthPath = authPaths.some(path => pathname === path)

    // Get the session cookie
    const sessionCookie = request.cookies.get('connect.sid')

    // If accessing a protected path
    if (isProtectedPath) {
        if (!sessionCookie) {
            // No session cookie, redirect to login
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            // Verify the session with your backend
            const response = await fetch('http://localhost:8000/auth/verify', {
                headers: {
                    cookie: `connect.sid=${sessionCookie.value}`,
                },
            })

            if (!response.ok) {
                // Session is invalid, redirect to login
                return NextResponse.redirect(new URL('/login', request.url))
            }
        } catch (error) {
            console.error('Error verifying session:', error)
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // If accessing auth paths (login/signup) while authenticated
    if (isAuthPath && sessionCookie) {
        try {
            const response = await fetch('http://localhost:8000/auth/verify', {
                headers: {
                    cookie: `connect.sid=${sessionCookie.value}`,
                },
            })

            if (response.ok) {
                // User is authenticated, redirect to dashboard
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        } catch (error) {
            console.error('Error verifying session:', error)
        }
    }

    // Continue to the requested page
    return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
} 