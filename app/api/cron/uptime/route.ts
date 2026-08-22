import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { runUptimeChecks } from '@/app/lib/uptime'

// Platform-agnostic scheduled entry point. Next 16 has no built-in cron, so an
// external scheduler (GitHub Actions, Vercel Cron, etc.) hits this on a schedule
// with the shared secret. It lives under /api, so the auth proxy ignores it.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  const auth = request.headers.get('authorization')

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await runUptimeChecks()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('cron/uptime failed:', error)
    return NextResponse.json({ error: 'Uptime check failed' }, { status: 500 })
  }
}
