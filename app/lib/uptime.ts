import { prisma } from '@/app/lib/prisma'
import { PROJECTS_LIST } from '@/app/projects/constants'

// Only real, reachable live URLs are monitored ('#' and empty are placeholders).
export const MONITORED: string[] = PROJECTS_LIST.filter(
  (p) => p.live && p.live !== '#'
).map((p) => p.live)

const CHECK_INTERVAL_MS = 15 * 60 * 1000 // don't sample more often than this
const CHECK_TIMEOUT_MS = 8000
const WINDOW_DAYS = 30

export type UptimeSummary = {
  uptimePercent: number | null
  systemsRunning: number
  monitored: number
}

// Ping every monitored URL once and record the result.
export async function runUptimeChecks(): Promise<{ checked: number; up: number }> {
  const results = await Promise.all(
    MONITORED.map(async (url) => {
      const start = Date.now()
      try {
        const res = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
          headers: { 'User-Agent': 'Portfolio-Uptime-Bot' },
        })
        return { url, ok: res.ok, status: res.status as number | null, latencyMs: Date.now() - start }
      } catch {
        return { url, ok: false, status: null as number | null, latencyMs: Date.now() - start }
      }
    })
  )

  if (results.length) {
    await prisma.uptimeCheck.createMany({
      data: results.map((r) => ({
        url: r.url,
        ok: r.ok,
        status: r.status ?? undefined,
        latencyMs: r.latencyMs,
      })),
    })
  }

  return { checked: results.length, up: results.filter((r) => r.ok).length }
}

// Sample only if the newest check is older than CHECK_INTERVAL_MS. Meant to be
// called from `after()` so it never blocks a response.
export async function maybeRunUptimeChecks(): Promise<void> {
  try {
    const latest = await prisma.uptimeCheck.findFirst({
      orderBy: { checkedAt: 'desc' },
      select: { checkedAt: true },
    })
    if (latest && Date.now() - latest.checkedAt.getTime() < CHECK_INTERVAL_MS) return
    await runUptimeChecks()
  } catch (error) {
    console.error('maybeRunUptimeChecks failed:', error)
  }
}

export async function getUptimeSummary(): Promise<UptimeSummary> {
  const monitored = MONITORED.length

  try {
    const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000)
    const [total, okCount] = await Promise.all([
      prisma.uptimeCheck.count({ where: { checkedAt: { gte: since } } }),
      prisma.uptimeCheck.count({ where: { checkedAt: { gte: since }, ok: true } }),
    ])

    const uptimePercent = total > 0 ? (okCount / total) * 100 : null

    // Before any samples exist, optimistically report all monitored systems as
    // running; once we have data, derive it from each URL's latest check.
    let systemsRunning = monitored
    if (total > 0) {
      const latestPerUrl = await Promise.all(
        MONITORED.map((url) =>
          prisma.uptimeCheck.findFirst({
            where: { url },
            orderBy: { checkedAt: 'desc' },
            select: { ok: true },
          })
        )
      )
      systemsRunning = latestPerUrl.filter((c) => c?.ok).length
    }

    return { uptimePercent, systemsRunning, monitored }
  } catch (error) {
    console.error('getUptimeSummary failed:', error)
    return { uptimePercent: null, systemsRunning: monitored, monitored }
  }
}
