import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify | Ajiboye Caroline Adetomiwa',
  description: 'Verify your email with the OTP code.',
}

export default function OtpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
