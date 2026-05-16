'use client'
import React from 'react'
import './globals.css'
import Sidenav from './components/Sidenav'
import Navbar from './components/Navbar'
import { usePathname } from 'next/navigation'
import Footer from './components/Footer'

// Pages that don't use the main layout (authentication pages)
const AUTH_PAGES = ['/signup', '/otp']

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = AUTH_PAGES.includes(pathname)

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
      <body className='text-white min-h-screen'>
        {isAuthPage ? (
          /* Auth pages - full screen without navigation */
          <div className='min-h-screen bg-black'>{children}</div>
        ) : (
          /* Main pages - with sidebar, navbar, and footer */
          <div className='grid grid-cols-[260px_1fr] min-h-screen'>
            {/* Sidebar Navigation */}
            <Sidenav />

            {/* Main Content Area */}
            <div className='flex flex-col'>
              {/* Top Navigation Bar */}
              <Navbar />

              {/* Page Content */}
              <main className='flex-1 p-2'>{children}</main>

              {/* Footer */}
              <Footer />
            </div>
          </div>
        )}
      </body>
    </html>
  )
}
