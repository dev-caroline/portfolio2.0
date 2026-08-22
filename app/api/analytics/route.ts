import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

type PageViewsByPathRow = {
  path: string
  _count: {
    path: number
  }
}

export async function GET() {
  try {
    // Get page views for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pageViewsToday = await prisma.pageView.count({
      where: {
        timestamp: {
          gte: today,
        },
      },
    })

    // Get total page views
    const totalPageViews = await prisma.pageView.count()

    // Get page views by path (top 5)
    const viewsByPath = await prisma.pageView.groupBy({
      by: ['path'],
      _count: { path: true },
      orderBy: {
        _count: {
          path: 'desc',
        },
      },
      take: 5,
    })

    return NextResponse.json({
      today: pageViewsToday,
      total: totalPageViews,
      topPages: viewsByPath.map((item: PageViewsByPathRow) => ({
        path: item.path,
        count: item._count.path,
      })),
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
