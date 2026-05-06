import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Ajiboye Caroline Adetomiwa',
  description: 'Create your account to get started.',
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body className='text-white min-h-screen bg-black'>
        {children}
      </body>
    </html>
  )
}
