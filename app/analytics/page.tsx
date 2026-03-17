'use client'

import { BarChart3, TrendingUp, Database, MapPin, Building2, Users } from 'lucide-react'
import Link from 'next/link'
import { stateConfig } from '@/lib/stateConfig'

export default function AnalyticsPage() {
  // Calculate statistics from stateConfig
  const states = Object.entries(stateConfig).map(([key, config]) => {
    let categoriesCount = 0
    let hasProjects = false
    let hasAgents = false
    let hasComplaints = false
    
    if ('hasSubRegions' in config && config.hasSubRegions && config.regions) {
      Object.values(config.regions).forEach(region => {
        Object.entries(region.categories).forEach(([catKey, cat]) => {
          categoriesCount++
          if (catKey.includes('project')) hasProjects = true
          if (catKey.includes('agent')) hasAgents = true
          if (catKey.includes('complaint')) hasComplaints = true
        })
      })
    } else if ('categories' in config && config.categories) {
      categoriesCount = Object.keys(config.categories).length
      Object.keys(config.categories).forEach(key => {
        if (key.includes('project')) hasProjects = true
        if (key.includes('agent')) hasAgents = true
        if (key.includes('complaint')) hasComplaints = true
      })
    }
    
    return {
      name: config.name,
      categoriesCount,
      hasProjects,
      hasAgents,
      hasComplaints
    }
  })

  const totalStates = 26
  const totalCategories = states.reduce((sum, s) => sum + s.categoriesCount, 0)
  const statesWithProjects = states.filter(s => s.hasProjects).length
  const statesWithAgents = states.filter(s => s.hasAgents).length
  const statesWithComplaints = states.filter(s => s.hasComplaints).length

  // Top states by categories
  const topStates = [...states]
    .sort((a, b) => b.categoriesCount - a.categoriesCount)
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white transition text-sm mb-3">
            ← Back to Home
          </Link>
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          </div>
          <p className="text-blue-200 text-sm">Data insights and statistics across all states</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-4">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white  mb-1">26</div>
            <div className="text-slate-600 dark:text-slate-400   text-xs">Total States & UTs</div>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-6 h-6 text-purple-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white  mb-1">62</div>
            <div className="text-slate-600 dark:text-slate-400   text-xs">Data Categories</div>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-4">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="w-6 h-6 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white  mb-1">75</div>
            <div className="text-slate-600 dark:text-slate-400   text-xs">Database Tables</div>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-orange-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white  mb-1">70K+</div>
            <div className="text-slate-600 dark:text-slate-400   text-xs">Total Records</div>
          </div>
        </div>

        {/* Data Coverage */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-5">
            <h3 className="font-bold text-slate-900 dark:text-white  mb-3 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Projects Data</span>
            </h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400  ">Coverage</span>
                <span className="font-semibold text-slate-900 dark:text-white ">
                  {statesWithProjects}/{totalStates} states
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(statesWithProjects / totalStates) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {Math.round((statesWithProjects / totalStates) * 100)}% of states have project data
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-5">
            <h3 className="font-bold text-slate-900 dark:text-white  mb-3 flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Agents Data</span>
            </h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400  ">Coverage</span>
                <span className="font-semibold text-slate-900 dark:text-white ">
                  {statesWithAgents}/{totalStates} states
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(statesWithAgents / totalStates) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {Math.round((statesWithAgents / totalStates) * 100)}% of states have agent data
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-lg shadow-sm border border-slate-200 dark:border-slate-700   p-5">
            <h3 className="font-bold text-slate-900 dark:text-white  mb-3 flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Complaints Data</span>
            </h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400  ">Coverage</span>
                <span className="font-semibold text-slate-900 dark:text-white ">
                  {statesWithComplaints}/{totalStates} states
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(statesWithComplaints / totalStates) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {Math.round((statesWithComplaints / totalStates) * 100)}% of states have complaint data
            </p>
          </div>
        </div>

        {/* Top States Chart */}
        <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   p-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white  mb-4">Top 10 States by Data Categories</h2>
          <div className="space-y-3">
            {topStates.map((state, index) => (
              <div key={state.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-700 w-4">{index + 1}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white ">{state.name}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{state.categoriesCount}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all" 
                    style={{ width: `${(state.categoriesCount / topStates[0].categoriesCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}