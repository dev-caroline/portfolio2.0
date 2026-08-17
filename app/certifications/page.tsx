'use client'
import React from 'react'
import Image from 'next/image'
import { CERTIFICATIONS_LIST } from './constants'

const Page = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full flex flex-col px-8 py-6'>
        <div className='mb-5'>
          <h1 className='text-3xl font-bold text-white mb-1 tracking-tight'>Certifications</h1>
          <p className='text-gray-400 text-xs'>Professional credentials and achievements</p>
        </div>
        <div className='overflow-hidden pr-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {CERTIFICATIONS_LIST.map((cert) => (
              <div key={cert.id} className='group relative flex flex-col h-fit'>
                <div className='absolute -inset-0.5 bg-linear-to-r from-red-500/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500' />
                <div className='relative border border-red-500/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 flex flex-col h-full'>
                  <div className='w-full h-32 bg-black/60 border-2 border-red-500/20 rounded-lg m-3 flex items-center justify-center overflow-hidden relative'>
                    {cert.image ? <Image src={cert.image} alt={cert.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover' /> : null}
                  </div>
                  <div className='p-4 flex flex-col flex-1'>
                    <h3 className='text-red-400 font-semibold text-sm mb-1'>{cert.name}</h3>
                    <p className='text-gray-500 text-xs mb-1'>{cert.issuer}</p>
                    <p className='text-gray-600 text-xs mb-3'>{cert.date}</p>
                    <p className='text-gray-400 text-xs leading-tight mb-4 flex-1'>{cert.description}</p>
                    <a href={cert.credential} className='w-full px-3 py-1.5 text-xs font-semibold text-red-400 border border-red-500/30 rounded hover:border-red-500/60 hover:bg-red-500/10 transition-all duration-300 text-center'>
                      View Credential
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page