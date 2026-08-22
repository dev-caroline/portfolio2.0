// Real GitHub stats for the dashboard, via the GraphQL contributions API.
// Requires GITHUB_TOKEN (a classic PAT with `read:user`). The unauthenticated
// REST events API cannot return a contribution calendar, so a token is required
// for the streak + commit counts.

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'
const USERNAME = process.env.GITHUB_USERNAME || 'dev-caroline'

export type GithubStats = {
  publicRepos: number | null
  commits: number | null
  streak: number | null
}

const TTL_MS = 5 * 60 * 1000
let memo: { at: number; value: GithubStats } | null = null

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER) {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

type ContributionDay = { date: string; contributionCount: number }

// Current streak = consecutive days (walking backward from today) with at least
// one contribution. A zero-contribution *today* does not break the streak — we
// start counting from yesterday, matching how GitHub presents it.
export function computeStreak(days: ContributionDay[]): number {
  if (!days.length) return 0
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  let streak = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].contributionCount > 0) {
      streak++
    } else if (i === sorted.length - 1) {
      // Today, not contributed to yet — skip without breaking the run.
      continue
    } else {
      break
    }
  }
  return streak
}

export async function getGithubStats(): Promise<GithubStats> {
  const empty: GithubStats = { publicRepos: null, commits: null, streak: null }

  if (memo && Date.now() - memo.at < TTL_MS) return memo.value

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error('getGithubStats: GITHUB_TOKEN is not set')
    return empty
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('getGithubStats: GitHub API error', res.status, res.statusText)
      return empty
    }

    const json = await res.json()
    const user = json?.data?.user
    if (!user) {
      console.error('getGithubStats: unexpected response', json?.errors)
      return empty
    }

    const contributions = user.contributionsCollection
    const days: ContributionDay[] = contributions.contributionCalendar.weeks.flatMap(
      (w: { contributionDays: ContributionDay[] }) => w.contributionDays
    )

    const value: GithubStats = {
      publicRepos: user.repositories.totalCount,
      commits: contributions.totalCommitContributions,
      streak: computeStreak(days),
    }

    memo = { at: Date.now(), value }
    return value
  } catch (error) {
    console.error('getGithubStats failed:', error)
    return empty
  }
}
