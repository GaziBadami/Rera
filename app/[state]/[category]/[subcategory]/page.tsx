'use client'

import { use, useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react'
import Link from 'next/link'
import CardGrid from '@/components/CardGrid'
import { stateConfig } from '@/lib/stateConfig'


interface SubCategoryPageProps {
  params: Promise<{
    state: string
    category: string
    subcategory: string
  }>
}

export default function SubCategoryPage({ params }: SubCategoryPageProps) {
  const { state, category: region, subcategory } = use(params)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const [pagination, setPagination] = useState<any>(null)

  const config = stateConfig[state as keyof typeof stateConfig]
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // For Haryana, the API expects region as the category, and subcategory as query param
        const response = await fetch(`/api/data/${state}/${region}?page=${page}&limit=${pageSize}&subcategory=${subcategory}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch data')
        }
        
        const result = await response.json()
        setData(result.data || [])
        setPagination(result.pagination || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [state, region, subcategory, page, pageSize])

  if (!config) {
    return <div>State not found</div>
  }

  // Get region and subcategory info
  let stateName = config.name
  let regionName = ''
  let categoryLabel = subcategory

  if ('hasSubRegions' in config && config.hasSubRegions && config.regions) {
    const regionConfig = config.regions[region as keyof typeof config.regions]
    if (regionConfig) {
      regionName = regionConfig.name
      const catInfo = regionConfig.categories[subcategory as keyof typeof regionConfig.categories]
      if (catInfo) {
        categoryLabel = catInfo.label
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href={`/${state}/${region}`}
            className="inline-flex items-center text-blue-200 hover:text-white transition text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {regionName}
          </Link>

          <div className="flex items-center space-x-3 mb-1">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold">{stateName} - {regionName}</h1>
          </div>
          <p className="text-blue-200 text-sm">{categoryLabel}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <>
            {/* Pagination */}
            {pagination && (
              <div className="mb-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-4">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Showing <span className="font-medium text-slate-900 dark:text-white">
                        {((page - 1) * pageSize) + 1}
                      </span> to <span className="font-medium text-slate-900 dark:text-white">
                        {Math.min(page * pageSize, pagination.totalRecords)}
                      </span> of <span className="font-medium text-slate-900 dark:text-white">
                        {pagination.totalRecords.toLocaleString()}
                      </span> records
                    </p>
                    
                    <div className="flex items-center space-x-1.5">
                      <label className="text-xs text-slate-600 dark:text-slate-400">Rows:</label>
                      <select
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value))
                          setPage(1)
                        }}
                        className="px-2 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setPage(1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-2.5 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      First
                    </button>
                    <button
                      onClick={() => setPage(p => p - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-2.5 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Prev
                    </button>
                    
                    <span className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-400">
                      Page <span className="font-medium text-slate-900 dark:text-white">{page}</span> of{' '}
                      <span className="font-medium text-slate-900 dark:text-white">{pagination.totalPages}</span>
                    </span>

                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-2.5 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setPage(pagination.totalPages)}
                      disabled={!pagination.hasNextPage}
                      className="px-2.5 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Last
                    </button>
                  </div>
                </div>
              </div>
            )}
           
            <CardGrid
              data={data}
              state={state}
              type={
                subcategory.includes('agent') || subcategory.includes('registered') ? 'agent' : 
                subcategory.includes('complaint') ? 'complaint' : 
                subcategory.includes('order') || subcategory.includes('judgement') ? 'order' : 
                'project'
              }
              defaultView="grid"
            />
          </>
        )}
      </div>
    </div>
  )
}