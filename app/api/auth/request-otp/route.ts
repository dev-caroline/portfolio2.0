import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { sendOtpEmail } from '@/app/lib/email'
import { generateOtp, hashOtp, OTP_TTL_MS } from '@/app/lib/otp'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const normalized = email.trim().toLowerCase()

    // Ensure a user record exists. `verified` only flips true after a correct OTP.
    await prisma.user.upsert({
      where: { email: normalized },
      update: {},
      create: { email: normalized },
    })

    // Keep only one active code per email.
    await prisma.otpCode.deleteMany({ where: { email: normalized } })

    const code = generateOtp()
    await prisma.otpCode.create({
      data: {
        email: normalized,
        codeHash: hashOtp(code),
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    })

    const sent = await sendOtpEmail(normalized, code)
    if (!sent.success) {
      // Surface send failures instead of pretending success — otherwise the
      // client redirects to /otp for a code that was never delivered.
      return NextResponse.json(
        { error: 'Could not send the code right now. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('request-otp error:', error)
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 })
  }
}
