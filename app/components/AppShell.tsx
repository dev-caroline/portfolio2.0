'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidenav from './Sidenav'
import Navbar from './Navbar'
import Footer from './Footer'
import { AuthProvider } from './AuthProvider'

// Pages that don't use the main layout (authentication pages)
const AUTH_PAGES = ['/signup', '/otp']

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = AUTH_PAGES.includes(pathname)
  const [isSidenavOpen, setIsSidenavOpen] = useState(false)

  const toggleSidenav = () => {
    setIsSidenavOpen((prev) => !prev)
  }

  // Auth pages - full screen without navigation
  if (isAuthPage) {
    return <div className='min-h-screen'>{children}</div>
  }

  // Main pages - with sidebar, navbar, and footer
  return (
    <AuthProvider>
      <div className='flex h-screen'>
        {/* Sidebar Navigation */}
        <Sidenav isOpen={isSidenavOpen} toggle={toggleSidenav} />

        {/* Main Content Area */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          {/* Top Navigation Bar */}
          <Navbar toggleSidenav={toggleSidenav} />

          {/* Page Content */}
          <main className='flex-1 overflow-y-auto p-2'>{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </AuthProvider>
  )
}
