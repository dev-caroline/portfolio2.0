import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken, SESSION_COOKIE } from '@/app/lib/session'
import { getInitials } from '@/app/lib/initials'

// Lets client components (AuthProvider) read the current session without
// exposing the signed token itself.
export async function GET() {
  const cookieStore = await cookies()
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)

  if (!session) {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({
    user: {
      email: session.email,
      initials: getInitials(session.name || session.email),
      verified: true,
    },
  })
}
