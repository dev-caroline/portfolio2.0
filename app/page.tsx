'use client'
import React from 'react'

const projects = [
  {
    title: "Articles Studio",
    desc: "Content management system for structured publishing.",
    image: "/images/project1.png",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    status: "LIVE",
  },
  {
    title: "System Dashboard",
    desc: "Real-time monitoring interface for user activity.",
    image: "/images/project2.png",
    tech: ["React", "Tailwind", "Node.js"],
    status: "DEV",
  },
  {
    title: "Portfolio Engine",
    desc: "Dynamic portfolio with modular architecture.",
    image: "/images/project3.png",
    tech: ["Next.js", "TypeScript"],
    status: "LIVE",
  },
];


const logs = [
  {
    time: "10:42",
    action: "Deployed Articles Studio to production",
    status: "SUCCESS",
  },
  {
    time: "09:18",
    action: "Integrated Prisma ORM with PostgreSQL",
    status: "SUCCESS",
  },
  {
    time: "Yesterday",
    action: "Refactored dashboard state management",
    status: "UPDATE",
  },
  {
    time: "2 days ago",
    action: "Built authentication flow (JWT)",
    status: "SUCCESS",
  },
  {
    time: "3 days ago",
    action: "Optimized API response time (-32%)",
    status: "PERF",
  },
  {
    time: "Last week",
    action: "Initialized Portfolio Engine project",
    status: "INIT",
  },
]

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
      
      {/* <div className='grid grid-cols-12 gap-5 mt-4' style={{ height: '35vh' }}>
        <div className='className="h-[calc(100%-48px)] overflow-y-auto no-scrollbar px-2"'>
          <div className='border col-span-7 overflow-y-auto scroll-'>
            <h1 className='p-2 text-xl'>Recent Projects</h1>
          </div>
        </div>
        <div className='border border-white col-span-5'>Activity logs</div>
      </div> */}

      <div className="grid grid-cols-12 gap-5 mt-4" style={{ height: "35vh" }}>
  
  {/* Projects */}
  <div className="col-span-7 relative border border-red-500/20 rounded-xl overflow-hidden">
    
    {/* Header */}
    <h1 className="p-3 text-xl border-b border-red-500/10 bg-black/40">
      Recent Projects
    </h1>

    {/* Scroll area */}
    <div className="h-[calc(100%-56px)] overflow-y-auto no-scrollbar px-3 py-2 scroll-smooth">
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-red-500/20 bg-black/40 backdrop-blur-md rounded-xl p-4 flex gap-4 hover:border-red-500 transition-all"
          >
            {/* Image */}
            <div className="w-32 h-24 rounded-md overflow-hidden border border-red-500/20">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">
                    {project.title}
                  </h3>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      project.status === "LIVE"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-1">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs border border-red-500/20 px-2 py-1 rounded text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-3 text-sm">
                <button className="text-red-400 hover:underline">
                  View Project →
                </button>
                <button className="text-gray-500 hover:text-white">
                  GitHub
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>

    {/* Top shadow */}
    {/* <div className="pointer-events-none absolute top-0 left-0 w-full h-12 
      bg-gradient-to-b from-black via-black/80 to-transparent" /> */}

    {/* Bottom shadow */}
    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 
      bg-gradient-to-t from-black via-black/80 to-transparent" />
    
  </div>

  {/* Activity logs */}
  {/* <div className="col-span-5 border border-white rounded-xl p-3">
    Activity logs
  </div> */}


  <div className="col-span-5 relative border border-red-500/10 rounded-xl overflow-hidden">

  <h1 className="p-3 text-lg border-b border-red-500/10 bg-black/40">
    Activity Logs
  </h1>

  <div className="h-[calc(100%-48px)] overflow-y-auto no-scrollbar px-3 py-2 space-y-3">

    {logs.map((log, i) => (
      <div
        key={i}
        className="flex items-start gap-3 text-sm border-b border-red-500/10 pb-2"
      >
        {/* indicator */}
        <span className="w-2 h-2 mt-2 rounded-full bg-red-500 animate-pulse"></span>

        {/* content */}
        <div className="flex-1">
          <p className="text-gray-300">{log.action}</p>
          <span className="text-xs text-gray-500">{log.time}</span>
        </div>

        {/* status */}
        <span
          className={`text-[10px] px-2 py-1 rounded ${
            log.status === "SUCCESS"
              ? "bg-green-500/20 text-green-400"
              : log.status === "PERF"
              ? "bg-blue-500/20 text-blue-400"
              : log.status === "INIT"
              ? "bg-purple-500/20 text-purple-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {log.status}
        </span>
      </div>
    ))}

  </div>

  {/* Shadow fade */}
  <div className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent" />
  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent" />

</div>

</div>
      <div className='mt-2 text-end'>
        <p className='text-gray-600 font-mono text-sm'>&copy; 2026 DEV_CAROLINE</p>
      </div>
    </div>
  )
}

export default page
