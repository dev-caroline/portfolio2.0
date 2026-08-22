import { NextResponse, after } from 'next/server'
import { PROJECTS_LIST } from '@/app/projects/constants'
import { getGithubStats } from '@/app/lib/github'
import { getUptimeSummary, maybeRunUptimeChecks } from '@/app/lib/uptime'

// Real shipped projects: everything except the "Coming Soon" placeholder
// (which carries no image). Static — derived from the projects list at load.
const projectsShipped = PROJECTS_LIST.filter(
  (p) => p.image && p.name !== 'Coming Soon'
).length

export async function GET() {
  const [github, uptime] = await Promise.all([getGithubStats(), getUptimeSummary()])

  // Sample uptime in the background after the response is sent (self-throttled),
  // so a dashboard load keeps the data fresh without ever waiting on the pings.
  after(maybeRunUptimeChecks)

  return NextResponse.json({
    projectsShipped,
    systemsRunning: uptime.systemsRunning,
    publicRepos: github.publicRepos,
    streak: github.streak,
    commits: github.commits,
    uptimePercent: uptime.uptimePercent,
  })
}
