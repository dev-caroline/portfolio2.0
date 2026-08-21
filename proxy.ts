import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from '@/app/lib/session'

// Pages reachable without a session. Everything else requires verification.
const AUTH_PAGES = ['/signup', '/otp']

// Optimistic auth gate: reads the signed cookie only (no DB), per the Next.js
// authentication guide. Route handlers re-check against the database.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthPage = AUTH_PAGES.includes(pathname)
  const isAuthed = !!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  // Not signed in → only auth pages are allowed.
  if (!isAuthed && !isAuthPage) {
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  // Already signed in → skip signup/otp, go to the dashboard.
  if (isAuthed && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Everything except API routes, Next internals, and static assets.
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico|css|js|woff2?|txt|xml)).*)',
  ],
}
