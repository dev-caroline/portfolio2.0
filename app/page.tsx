'use client'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <div className='h-45 border border-gray-900 bg-gray-950 w-405 flex justify-between p-4'> */}
      <div className='border border-gray-800/50 bg-black/30 backdrop-blur-sm rounded-xl flex justify-between p-6'>
        <div>
          <h1 className='text-2xl font-serif'>Hello, I'm <span className='text-red-500 shadow-2xl'>Dev_Caroline</span> 🖐️</h1>
          <p className='mt-2 text-gray-400'>I focus on building products and systems that go beyond static websites <br />
            —solutions that improve processes, enhance user experience, and create measurable value.</p>
          <div className='flex gap-2 mt-4'>
            <div className='border-e pe-4 border-red-600 backdrop-blur-sm flex ps-2 gap-2  bg-black/30 p-1'>
            <p className='font-serif text-red-600 mt-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8" />
              </svg>
            </p>
            <p className='font-serif'>System Online</p>
            <p className='text-gray-300'>| Available for opportunities</p>
            </div>
          </div>

        </div>
        <div className='flex flex-col gap-4'>
  <h2 className='font-mono text-xl tracking-widest text-red-500 shadow-2xl uppercase'>// Tech Stack</h2>
  <div className='flex justify-between'>
  {/* Frontend */}
  <div>
    <p className='font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-2'>Frontend</p>
    <div className='flex gap-4 flex-wrap'>
      {[
        { icon: 'devicon-react-original colored', label: 'React' },
        { icon: 'devicon-typescript-plain colored', label: 'TypeScript' },
        { icon: 'devicon-nextjs-plain', label: 'Next.js' },
        { icon: 'devicon-tailwindcss-plain colored', label: 'Tailwind' },
      ].map((tech) => (
        <div key={tech.label} className='flex flex-col items-center gap-1 group'>
          <div
            className='p-2 rounded-lg border border-red-900/20 bg-red-500/5 group-hover:border-red-500/40 group-hover:bg-red-500/10 transition-all'
            style={{ boxShadow: '0 0 0 rgba(255,42,42,0)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px rgba(255,42,42,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(255,42,42,0)')}
          >
            <i className={tech.icon} style={{ fontSize: '24px' }}></i>
          </div>
          <span className='font-mono text-[9px] text-gray-600 group-hover:text-red-400 transition-colors'>{tech.label}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Backend */}
  <div>
    <p className='font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-2'>Backend</p>
    <div className='flex gap-4 flex-wrap'>
      {[
        { icon: 'devicon-nodejs-plain colored', label: 'Node.js' },
        { icon: 'devicon-express-original', label: 'Express' },
        { icon: 'devicon-prisma-original', label: 'Prisma' },
      ].map((tech) => (
        <div key={tech.label} className='flex flex-col items-center gap-1 group'>
          <div
            className='p-2 rounded-lg border border-red-900/20 bg-red-500/5 group-hover:border-red-500/40 group-hover:bg-red-500/10 transition-all'
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px rgba(255,42,42,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(255,42,42,0)')}
          >
            <i className={tech.icon} style={{ fontSize: '24px' }}></i>
          </div>
          <span className='font-mono text-[9px] text-gray-600 group-hover:text-red-400 transition-colors'>{tech.label}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Database */}
  <div>
    <p className='font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-2'>Database</p>
    <div className='flex gap-4 flex-wrap'>
      {[
        { icon: 'devicon-postgresql-plain colored', label: 'PostgreSQL' },
        { icon: 'devicon-mongodb-plain colored', label: 'MongoDB' },
      ].map((tech) => (
        <div key={tech.label} className='flex flex-col items-center gap-1 group'>
          <div
            className='p-2 rounded-lg border border-red-900/20 bg-red-500/5 group-hover:border-red-500/40 group-hover:bg-red-500/10 transition-all'
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px rgba(255,42,42,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(255,42,42,0)')}
          >
            <i className={tech.icon} style={{ fontSize: '24px' }}></i>
          </div>
          <span className='font-mono text-[9px] text-gray-600 group-hover:text-red-400 transition-colors'>{tech.label}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Tools */}
  <div>
    <p className='font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-2'>Tools</p>
    <div className='flex gap-4 flex-wrap'>
      {[
        { icon: 'devicon-git-plain colored', label: 'Git' },
      ].map((tech) => (
        <div key={tech.label} className='flex flex-col items-center gap-1 group'>
          <div
            className='p-2 rounded-lg border border-red-900/20 bg-red-500/5 group-hover:border-red-500/40 group-hover:bg-red-500/10 transition-all'
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px rgba(255,42,42,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(255,42,42,0)')}
          >
            <i className={tech.icon} style={{ fontSize: '24px' }}></i>
          </div>
          <span className='font-mono text-[9px] text-gray-600 group-hover:text-red-400 transition-colors'>{tech.label}</span>
        </div>
      ))}
    </div>
  </div>
  </div> 
</div> 
    </div> 
    <div className='h-70 border border-white shadow-2xl mt-4'>
      Live Metrics
    </div>
    <div className='grid grid-cols-12 gap-5 h-80 mt-4'>
      <div className='border border-white col-span-7'>Recent Projects</div>
      <div className='border border-white col-span-5'>Activity logs</div>
    </div>
    <div className='mt-3 text-end'>
      <p className='text-gray-600 font-mono text-sm'>&copy; 2026 DEV_CAROLINE</p>
    </div>
    </div>
  )
}

export default page
