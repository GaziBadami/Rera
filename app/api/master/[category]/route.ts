export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const masterTableMap: Record<string, string> = {
  projects: 'master_projects',
  agents: 'all_agents',
  complaints: 'master_complaints',
  orders: 'master_orders',
  judgements: 'master_judgements',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const tableName = masterTableMap[category]

    if (!tableName) {
      return NextResponse.json(
        { error: `Category ${category} not found` },
        { status: 404 }
      )
    }

    const prismaClient = prisma as any

    const totalCount = await prismaClient[tableName].count()

    const data = await prismaClient[tableName].findMany({
      skip,
      take: limit,
    })

    return NextResponse.json({
      category,
      tableName,
      pagination: {
        page,
        limit,
        totalRecords: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPrevPage: page > 1
      },
      data
    })

  } catch (error: any) {
    console.error('Master API Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch data',
        message: error.message,
        details: error.toString()
      },
      { status: 500 }
    )
  }
}