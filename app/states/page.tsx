'use client'

import { useState } from 'react'
import { MapPin, Building2, Users, FileText, Search } from 'lucide-react'
import Link from 'next/link'
import { stateConfig } from '@/lib/stateConfig'

export default function StatesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Convert stateConfig to array with detailed info
  const states = Object.entries(stateConfig).map(([key, config]) => {
    const categories: string[] = []
    
    if ('hasSubRegions' in config && config.hasSubRegions && config.regions) {
      Object.values(config.regions).forEach(region => {
        Object.values(region.categories).forEach(cat => {
          if (!categories.includes(cat.label)) {
            categories.push(cat.label)
          }
        })
      })
    } else if ('categories' in config && config.categories) {
      Object.values(config.categories).forEach(cat => {
        categories.push(cat.label)
      })
    }
    
    return {
      key,
      name: config.name,
      categories,
      categoriesCount: categories.length
    }
  }).sort((a, b) => a.name.localeCompare(b.name))

  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white transition text-sm mb-3">
            ← Back to Home
          </Link>
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-bold">All States & UTs</h1>
          </div>
          <p className="text-blue-200 text-sm">Browse RERA data across India</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-4">
            <div className="text-2xl font-bold text-blue-600">26</div>
            <div className="text-slate-600 dark:text-slate-400  text-sm">States & UTs</div>
          </div>
          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-4">
            <div className="text-2xl font-bold text-purple-600">
              62
            </div>
            <div className="text-slate-600 dark:text-slate-400  text-sm">Total Categories</div>
          </div>
          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-4">
            <div className="text-2xl font-bold text-green-600">75</div>
            <div className="text-slate-600 dark:text-slate-400  text-sm">Database Tables</div>
          </div>
        </div>

        {/* States Table */}
        <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700   bg-slate-50">
            <h2 className="text-lg font-bold text-slate-900">State Directory</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400  mt-0.5">
              {filteredStates.length} {filteredStates.length === 1 ? 'state' : 'states'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200 dark:border-slate-700  ">
                <tr>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-700 uppercase">
                    State / UT
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-700 uppercase">
                    Available Data
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-700 uppercase">
                    Categories
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStates.map((state) => (
                  <tr key={state.key} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-slate-900 dark:text-white text-sm">{state.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {state.categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">
                        {state.categoriesCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/${state.key}`}
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-medium"
                      >
                        View Data →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStates.length === 0 && (
            <div className="px-4 py-12 text-center text-slate-500">
              <p>No states found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}