import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Ajiboye Caroline Adetomiwa',
  description: 'Create your account to get started.',
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
