import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { path, sessionId } = await req.json()

    if (!path) {
      return NextResponse.json(
        { error: 'Missing path' },
        { status: 400 }
      )
    }

    const pageView = await prisma.pageView.create({
      data: {
        path,
        sessionId: sessionId || undefined,
      },
    })

    return NextResponse.json(
      { success: true, pageViewId: pageView.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Page tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track page view' },
      { status: 500 }
    )
  }
}
