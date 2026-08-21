import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/app/lib/prisma'
import { hashOtp, MAX_ATTEMPTS } from '@/app/lib/otp'
import { signSession, SESSION_COOKIE, SESSION_MAX_AGE_S } from '@/app/lib/session'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json()

    if (
      !email ||
      typeof email !== 'string' ||
      !emailRegex.test(email.trim()) ||
      typeof code !== 'string' ||
      !/^\d{6}$/.test(code)
    ) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const normalized = email.trim().toLowerCase()

    const otp = await prisma.otpCode.findFirst({
      where: { email: normalized, consumed: false },
      orderBy: { createdAt: 'desc' },
    })

    if (!otp) {
      return NextResponse.json(
        { error: 'No active code. Please request a new one.' },
        { status: 400 }
      )
    }
    if (otp.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Code expired. Please request a new one.' },
        { status: 400 }
      )
    }
    if (otp.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Too many attempts. Please request a new one.' },
        { status: 400 }
      )
    }

    if (hashOtp(code) !== otp.codeHash) {
      await prisma.otpCode.update({
        where: { id: otp.id },
        data: { attempts: { increment: 1 } },
      })
      return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 400 })
    }

    // Correct code: consume it, mark the user verified, and open a session.
    await prisma.otpCode.update({ where: { id: otp.id }, data: { consumed: true } })
    const user = await prisma.user.update({
      where: { email: normalized },
      data: { verified: true, lastLogin: new Date() },
    })

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, signSession({ email: user.email, name: user.name }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_S,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('verify-otp error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
