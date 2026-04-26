import React from 'react'
import "./globals.css";
import { Metadata } from 'next'
import Sidenav from './components/Sidenav';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Ajiboye Caroline Adetomiwa | Full-Stack Web Developer | MERN STACK',
  description: 'Ajiboye Caroline Adetomiwa - Full-Stack Developer | Building modern, scalable, and user-focused web applications.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body className='bg-black text-white'>
        <div className='flex grid grid-cols-13 gap-4'>
          <Sidenav />
          <div>
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
