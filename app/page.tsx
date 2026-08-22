'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { TECH_STACK, PROJECTS } from './home/constants'

type Metrics = {
  projectsShipped: number
  systemsRunning: number
  publicRepos: number | null
  streak: number | null
  commits: number | null
  uptimePercent: number | null
}

type LogItem = { time: string; action: string; status: string }

function Card({ value, title, sub, icon }: { value: string | number; title: string; sub: string; icon?: string }) {
  return (
    <div className='group relative border border-red-500/20 rounded-lg p-4 bg-black hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 overflow-hidden'>
      <div className='absolute inset-0 bg-linear-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-red-500/10 group-hover:to-red-500/5 transition-all duration-300' />
      <div className='relative z-10'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xs text-gray-500 mb-2 tracking-widest'>{icon}</p>
            <h1 className='text-3xl font-bold text-red-400 mb-1'>{value}</h1>
          </div>
          <div className='h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse'>
            <div className='h-2 w-2 rounded-full bg-red-400' />
          </div>
        </div>
        <p className='text-sm text-gray-300 mt-3 font-medium'>{title}</p>
        <p className='text-xs text-gray-500 mt-1'>{sub}</p>
      </div>
    </div>
  )
}

// Display helper: real value, or an em-dash while loading / when unavailable.
const show = (v: number | null | undefined) => (v == null ? '—' : v)

export default function LiveMetrics() {
  const pathname = usePathname()
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [logs, setLogs] = useState<LogItem[]>([])
  const [logsLoaded, setLogsLoaded] = useState(false)
  const [pageViews, setPageViews] = useState(0)

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = localStorage.getItem('sessionId') || Math.random().toString(36)
        localStorage.setItem('sessionId', sessionId)

        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pathname, sessionId }),
        })
      } catch (error) {
        console.error('Failed to track page view:', error)
      }
    }

    trackPageView()
  }, [pathname])

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics')
        const data = await response.json()
        setPageViews(data.today || 0)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      }
    }

    fetchAnalytics()
    const analyticsInterval = setInterval(fetchAnalytics, 60000)

    return () => clearInterval(analyticsInterval)
  }, [])

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dev-metrics')
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error('Failed to fetch dev metrics:', error)
      }
    }

    fetchMetrics()
    const metricsInterval = setInterval(fetchMetrics, 60000)

    return () => clearInterval(metricsInterval)
  }, [])

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch('/api/github-activity')
        const data = await response.json()
        if (Array.isArray(data)) setLogs(data)
      } catch (error) {
        console.error('Failed to fetch GitHub activity:', error)
      } finally {
        setLogsLoaded(true)
      }
    }

    fetchGitHubActivity()
    const gitHubInterval = setInterval(fetchGitHubActivity, 300000)

    return () => clearInterval(gitHubInterval)
  }, [])

  return (
    <div className='lg:h-full lg:flex lg:flex-col lg:overflow-hidden'>
      <div className='border border-red-500/20 bg-black/30 backdrop-blur-sm rounded-xl flex flex-col gap-6 lg:flex-row lg:justify-between p-4 lg:shrink-0'>
        <div>
          <h1 className='text-2xl font-serif'>Hello, I&apos;m <span className='text-red-500 shadow-2xl'>Dev_Caroline</span> 🖐️</h1>
          <p className='mt-2 text-gray-400'>I focus on building products and systems that go beyond static websites <br />
            solutions that improve processes, enhance user experience, and create measurable value.</p>
          <div className='flex gap-2 mt-4'>
            <div className='border-e pe-4 border-red-600 backdrop-blur-sm flex ps-2 gap-2 bg-black/30 p-1'>
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
          <h2 className='font-mono text-xl tracking-widest text-red-500 shadow-2xl uppercase'>{"// Tech Stack"}</h2>
          <div className='flex flex-wrap gap-x-8 gap-y-4 lg:justify-between'>
            {Object.entries(TECH_STACK).map(([category, techs]) => (
              <div key={category}>
                <p className='font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-2'>{category}</p>
                <div className='flex gap-4 flex-wrap'>
                  {techs.map((tech) => (
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
            ))}
          </div>
        </div>
      </div>
      <div className='h-auto border border-red-500/20 p-6 shadow-2xl rounded-xl mt-4 backdrop-blur-md lg:shrink-0'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-bold text-white'>Developer Activity System</h2>
            <p className='text-xs text-gray-500 mt-1'>Real-time metrics & performance tracking</p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
            <span className='text-xs text-green-400 font-mono'>ACTIVE</span>
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3'>
          <Card value={show(metrics?.projectsShipped)} title="Projects" sub="Shipped" />
          <Card value={show(metrics?.systemsRunning)} title="Systems" sub="Running" />
          <Card value={show(metrics?.publicRepos)} title="Repos" sub="Public" />
          <Card value={show(metrics?.streak)} title="Streak" sub="Days" />
          <Card value={show(metrics?.commits)} title="Commits" sub="Last 12 mo" />
          <Card value={pageViews} title="Page Views" sub="Today" />
          <Card value={metrics?.uptimePercent != null ? `${metrics.uptimePercent.toFixed(1)}%` : '—'} title="Uptime" sub="30 days" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 lg:flex-1 lg:min-h-0 lg:grid-rows-1">
        <div className="col-span-12 lg:col-span-7 relative border border-red-500/20 rounded-xl overflow-hidden lg:min-h-0">
          <h1 className="p-3 text-xl border-b border-red-500/10 bg-black/40">Recent Projects</h1>
          <div className="h-[calc(100%-56px)] overflow-y-auto no-scrollbar px-3 py-2 scroll-smooth">
            <div className="space-y-4">
              {PROJECTS.map((project, index) => (
                <div key={index} className="border border-red-500/20 bg-black/40 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:border-red-500 transition-all">
                  <div className="w-full h-40 sm:w-32 sm:h-24 rounded-md overflow-hidden border border-red-500/20">
                    <Image src={project.image} alt={project.title} width={128} height={96} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold">{project.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${project.status === "LIVE" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{project.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-xs border border-red-500/20 px-2 py-1 rounded text-gray-300">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-3 text-sm">
                      <button className="text-red-400 hover:underline">View Project →</button>
                      <button className="text-gray-500 hover:text-white">GitHub</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-black via-black/80 to-transparent" />
        </div>
        <div className="col-span-12 lg:col-span-5 relative border border-red-500/10 rounded-xl overflow-hidden lg:min-h-0">
          <h1 className="p-3 text-lg border-b border-red-500/10 bg-black/40">GitHub Activity</h1>
          <div className="h-[calc(100%-48px)] overflow-y-auto no-scrollbar px-3 py-2 space-y-3">
            {!logsLoaded ? (
              <p className="text-gray-500 text-sm px-1 py-2">Loading recent activity…</p>
            ) : logs.length === 0 ? (
              <p className="text-gray-500 text-sm px-1 py-2">No recent public activity.</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 text-sm border-b border-red-500/10 pb-2">
                  <span className={`w-2 h-2 mt-2 rounded-full animate-pulse ${log.status === "SUCCESS" ? "bg-green-500" : "bg-yellow-500"}`} />
                  <div className="flex-1">
                    <p className="text-gray-300">{log.action}</p>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded ${log.status === "SUCCESS" ? "bg-green-500/20 text-green-400" : log.status === "ERROR" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {log.status}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-linear-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-black to-transparent" />
        </div>
      </div>
    </div>
  )
}
