'use client'

import { use } from 'react'
import { ArrowLeft, MapPin, ChevronRight, Building2, Users, FileText } from 'lucide-react'
import Link from 'next/link'
import { stateConfig } from '@/lib/stateConfig'

interface StatePageProps {
  params: Promise<{
    state: string
  }>
}

export default function StatePage({ params }: StatePageProps) {
  const { state } = use(params)
  const config = stateConfig[state as keyof typeof stateConfig]

  if (!config) {
    return <div>State not found</div>
  }

  // Check if state has sub-regions (like Haryana)
  const hasSubRegions = 'hasSubRegions' in config && config.hasSubRegions

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-200 hover:text-white transition text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-bold">{config.name}</h1>
          </div>
          <p className="text-blue-200 text-sm">
            {hasSubRegions 
              ? 'Select a region to view data' 
              : 'Select a category to view data'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {hasSubRegions && 'regions' in config ? (
          /* Region Selection for states like Haryana */
          <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Select Region</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(config.regions).map(([regionKey, region]) => {
                const categoriesCount = Object.keys(region.categories).length
                
                return (
                  <div 
                    key={regionKey}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    {/* Region Header */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {region.name}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                          {categoriesCount} {categoriesCount === 1 ? 'category' : 'categories'}
                        </span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="p-3 space-y-2">
                      {Object.entries(region.categories).map(([catKey, category]) => {
                        const Icon = catKey.includes('project') ? Building2 : Users
                        
                        return (
                          <Link
                            key={catKey}
                            href={`/${state}/${regionKey}/${catKey}`}
                            className="group flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="font-medium text-slate-900 dark:text-white text-sm">
                                {category.label}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : 'categories' in config ? (
          /* Category Selection for regular states */
          <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Select Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(config.categories).map(([catKey, category]) => {
                const Icon = catKey.includes('project') ? Building2 : 
                             catKey.includes('agent') ? Users : FileText
                
                return (
                  <Link
                    key={catKey}
                    href={`/${state}/${catKey}`}
                    className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {category.label}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      View {category.label.toLowerCase()}
                    </p>
                  </Link>
                )
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}