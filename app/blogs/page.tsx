'use client'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full h-full flex flex-col overflow-hidden'>
      <div className='flex-1 flex flex-col px-8 py-6 overflow-hidden justify-center items-center'>
        <div className='group relative max-w-md w-full'>
          <div className='absolute -inset-0.5 bg-linear-to-r from-red-500/30 to-red-600/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500' />
          <div className='relative border border-red-500/20 rounded-lg p-8 bg-black/60 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 text-center'>
            <h1 className='text-3xl font-bold text-white mb-3'>Coming Soon</h1>
            <p className='text-gray-400 text-sm leading-relaxed mb-2'>
              Blog section is currently under development. I&apos;m working on creating insightful articles about web development, best practices, and tech insights.
            </p>
            <p className='text-gray-500 text-xs mt-4'>Check back soon for great content!</p>
            <button className='group/btn relative mt-6 px-6 py-2 w-full'>
              <div className='absolute -inset-0.25 bg-linear-to-r from-red-500 to-red-600 rounded-lg blur opacity-20 group-hover/btn:opacity-60 transition-all duration-300' />
              <div className='relative px-6 py-2 bg-black rounded-lg text-red-400 font-semibold text-sm group-hover/btn:text-red-300 transition-colors'>
                Notify Me
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page