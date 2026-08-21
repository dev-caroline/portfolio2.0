'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthUser = { email: string; initials: string; verified: boolean }

type AuthContextValue = {
  user: AuthUser | null
  initials: string
  isVerified: boolean
  loading: boolean
  uptime: string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// Per-tab start time so "uptime" survives client-side navigation but resets
// on a new session/tab.
const UPTIME_KEY = 'dashboardUptimeStart'

function formatUptime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${h}h ${pad(m)}m ${pad(s)}s`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [uptime, setUptime] = useState('0h 00m 00s')

  // Load the current session for the avatar + status readout.
  useEffect(() => {
    let active = true
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (active) setUser(data.user ?? null)
      })
      .catch(() => {
        if (active) setUser(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  // Live "time spent on the dashboard" ticker for this visit.
  useEffect(() => {
    let start = Number(sessionStorage.getItem(UPTIME_KEY))
    if (!start) {
      start = Date.now()
      sessionStorage.setItem(UPTIME_KEY, String(start))
    }
    const tick = () => setUptime(formatUptime(Date.now() - start))
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const value: AuthContextValue = {
    user,
    initials: user?.initials ?? '',
    isVerified: !!user?.verified,
    loading,
    uptime,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
