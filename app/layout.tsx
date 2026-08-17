import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import AppShell from './components/AppShell'

export const metadata: Metadata = {
  title: 'Dev_Caroline | Software Engineer & Full-Stack Developer',
  description:
    'Portfolio of Ajiboye Caroline Adetomiwa — building products and systems that improve processes, enhance user experience, and create measurable value.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        {/* Icon and Font Libraries */}
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
        />
      </head>
      <body className='text-white min-h-screen bg-black'>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
