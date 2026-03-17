export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { stateConfig } from '@/lib/stateConfig'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ state: string; category: string }> }
) {
  try {
    const { state, category } = await params
    
    // Get pagination parameters from query string
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const subcategory = searchParams.get('subcategory') // For Haryana-style regions
    const skip = (page - 1) * limit
    
    console.log(`Fetching data for ${state} / ${category}${subcategory ? ` / ${subcategory}` : ''} - Page ${page}, Limit ${limit}`)
    
    const config = stateConfig[state as keyof typeof stateConfig]
    
    if (!config) {
      return NextResponse.json(
        { error: `State ${state} not found` },
        { status: 404 }
      )
    }

    let tableName: string | null = null

    // Handle Haryana (has regions)
    if ('hasSubRegions' in config && config.hasSubRegions && config.regions) {
      const regions = config.regions as any
      const region = regions[category]
      if (!region) {
        return NextResponse.json(
          { error: `Region ${category} not found` },
          { status: 404 }
        )
      }
      // If subcategory is provided, use it; otherwise use first category
      const categories = region.categories
      if (subcategory && categories[subcategory]) {
        tableName = categories[subcategory].table
      } else {
        const firstCategoryKey = Object.keys(categories)[0]
        const firstCategory = categories[firstCategoryKey]
        tableName = firstCategory?.table || null
      }
    }
    // Regular states
    else if ('categories' in config && config.categories) {
      const categoryData = (config.categories as any)[category]
      if (!categoryData) {
        return NextResponse.json(
          { error: `Category ${category} not found for ${state}` },
          { status: 404 }
        )
      }
      tableName = categoryData.table
    }

    if (!tableName) {
      return NextResponse.json(
        { error: 'Table name not found' },
        { status: 404 }
      )
    }

    console.log(`Fetching from table: ${tableName}`)

    // Get total count
    // @ts-ignore - Dynamic table access
    const totalCount = await prisma[tableName].count()

    // Determine order field - use id if available, otherwise use first field
    let orderBy: any = { id: 'desc' }
    
    // Tables without id column - use alternative ordering
    const tablesWithoutId = ['bihar_projects', 'puducherry_apartment_project', 'puducherry_layout_project', 'punjab_rera_projects', 'rera_agents','bihar_registered_agents']
    if (tablesWithoutId.includes(tableName)) {
      // Don't use orderBy for these tables
      orderBy = undefined
    }

    // Get paginated data
    // @ts-ignore - Dynamic table access
    // @ts-ignore - Dynamic table access
    const prismaClient = prisma as any
const data = orderBy 
  ? await prismaClient[tableName].findMany({
      skip,
      take: limit,
      orderBy
    })
  : await prismaClient[tableName].findMany({
      skip,
      take: limit
    })

    console.log(`Found ${data.length} records out of ${totalCount} total`)

    return NextResponse.json({
      state,
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
    console.error('API Error:', error)
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