'use client'
import React from 'react'
import { PROJECTS_LIST } from './constants'

const Page = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full flex flex-col px-8 py-5'>
        <div className='mb-5'>
          <h1 className='text-3xl font-bold text-white mb-1 tracking-tight'>Projects</h1>
          <p className='text-gray-400 text-xs'>Featured work and recent projects</p>
        </div>
        <div className='overflow-hidden pr-2'>
          <div className='grid grid-cols-3 gap-4'>
            {PROJECTS_LIST.map((project) => (
              <div key={project.id} className='group relative flex flex-col h-fit'>
                <div className='absolute -inset-0.5 bg-linear-to-r from-red-500/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500' />
                <div className='relative border border-red-500/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 flex flex-col h-full'>
                  <div className='w-full h-40 bg-black/60 border-b border-red-500/10 flex items-center justify-center'>
                    <div className='text-center'>
                      <p className='text-gray-600 text-xs'>Image placeholder</p>
                      <p className='text-gray-700 text-xs mt-1'>Add image here</p>
                    </div>
                  </div>
                  <div className='p-4 flex flex-col flex-1'>
                    <h3 className='text-red-400 font-semibold text-sm mb-2'>{project.name}</h3>
                    <p className='text-gray-400 text-xs leading-tight mb-3 flex-1'>{project.description}</p>
                    <div className='flex flex-wrap gap-1.5 mb-4'>
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className='text-xs px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-gray-300'>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className='flex gap-3'>
                      <a href={project.github} className='flex-1 px-3 py-1.5 text-xs font-semibold text-gray-300 border border-red-500/20 rounded hover:border-red-500/40 hover:text-red-400 transition-all duration-300'>
                        GitHub
                      </a>
                      <a href={project.live} className='flex-1 px-3 py-1.5 text-xs font-semibold text-red-400 border border-red-500/30 rounded hover:border-red-500/60 hover:bg-red-500/10 transition-all duration-300'>
                        Live
                      </a>
                    </div>
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