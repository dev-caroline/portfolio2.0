'use client'
import React from 'react'
import "./globals.css";
import { Metadata } from 'next'
import Sidenav from './components/Sidenav';
import Navbar from './components/Navbar';
import { usePathname } from 'next/navigation';
// import Footer from './components/Footer';

// export const metadata: Metadata = {
//   title: 'Ajiboye Caroline Adetomiwa | Full-Stack Web Developer | MERN STACK',
//   description: 'Ajiboye Caroline Adetomiwa - Full-Stack Developer | Building modern, scalable, and user-focused web applications.',
//   viewport: 'width=device-width, initial-scale=1',
//   icons: {
//     icon: '/favicon.ico',
//   },
// }


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/signup' || pathname === '/otp'

  return (
    <html lang='en'>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

      </head>
      <body className='text-white min-h-screen'>
        {isAuthPage ? (
          <div className='min-h-screen bg-black'>
            {children}
          </div>
        ) : (
          <div className='grid grid-cols-[260px_1fr] min-h-screen'>
            <Sidenav />
            <div className='flex flex-col'>
              <Navbar />
              <main className='flex-1 p-2'>
                {children}
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  )
}
