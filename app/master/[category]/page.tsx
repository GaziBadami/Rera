'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Building2, Users, FileText, Scale, Gavel, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import CardGrid from '@/components/CardGrid'
import ThemeToggle from '@/components/ThemeToggle'

const categoryConfig: Record<string, {
  label: string
  description: string
  icon: any
  color: string
  type: 'project' | 'agent' | 'complaint' | 'order' | 'general'
}> = {
  projects: {
    label: 'All Projects',
    description: 'All registered RERA projects across India',
    icon: Building2,
    color: 'blue',
    type: 'project'
  },
  agents: {
    label: 'All Agents',
    description: 'All registered RERA agents across India',
    icon: Users,
    color: 'green',
    type: 'agent'
  },
  complaints: {
    label: 'All Complaints',
    description: 'All RERA complaints across India',
    icon: FileText,
    color: 'red',
    type: 'complaint'
  },
  orders: {
    label: 'All Orders',
    description: 'All RERA orders across India',
    icon: Scale,
    color: 'purple',
    type: 'order'
  },
  judgements: {
    label: 'All Judgements',
    description: 'All RERA judgements across India',
    icon: Gavel,
    color: 'orange',
    type: 'general'
  },
}

export default function MasterCategoryPage() {
  const params = useParams()
  const category = params.category as string

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    totalRecords: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  const config = categoryConfig[category]

  const fetchData = useCallback(async (page: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/master/${category}?page=${page}&limit=50`)
      if (!res.ok) throw new Error('Failed to fetch data')
      const json = await res.json()
      setData(json.data || [])
      setPagination(json.pagination)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchData(1)
  }, [fetchData])

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Category not found</p>
      </div>
    )
  }

  const Icon = config.icon

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <Building2 className="w-7 h-7 text-blue-400" strokeWidth={1.5} />
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">RERA Portal</h1>
                <p className="text-blue-300 text-xs">Real Estate Regulatory Authority</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-blue-300 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{config.label}</span>
          </div>

          {/* Page Title */}
          <div className="flex items-center space-x-3 pb-4">
            <div className={`p-2.5 rounded-xl ${colorMap[config.color]}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{config.label}</h2>
              <p className="text-blue-200 text-sm">{config.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button + Stats */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {!loading && (
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Total Records: <span className="font-bold text-slate-900 dark:text-white">
                {pagination.totalRecords.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Data */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => fetchData(pagination.page)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <CardGrid
              data={data}
              state={data[0]?.state || 'master'}
              type={config.type}
            />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-3 mt-8">
                <button
                  onClick={() => fetchData(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Page <span className="font-bold text-slate-900 dark:text-white">{pagination.page}</span> of{' '}
                  <span className="font-bold text-slate-900 dark:text-white">{pagination.totalPages}</span>
                </span>

                <button
                  onClick={() => fetchData(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}