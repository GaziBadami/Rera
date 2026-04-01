'use client'

import { useState } from 'react'
import { Search, Building2, Users, FileText, TrendingUp, MapPin, ChevronRight, Scale, Gavel } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import { stateConfig } from '@/lib/stateConfig'

const masterCategories = [
  {
    key: 'projects',
    label: 'All Projects',
    description: 'Pan-India registered projects',
    icon: Building2,
    color: 'blue',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-400',
    iconClass: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    textClass: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
  {
    key: 'agents',
    label: 'All Agents',
    description: 'Pan-India registered agents',
    icon: Users,
    color: 'green',
    bgClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-400',
    iconClass: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
    textClass: 'group-hover:text-green-600 dark:group-hover:text-green-400',
  },
  {
    key: 'complaints',
    label: 'All Complaints',
    description: 'Pan-India RERA complaints',
    icon: FileText,
    color: 'red',
    bgClass: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-400',
    iconClass: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
    textClass: 'group-hover:text-red-600 dark:group-hover:text-red-400',
  },
  {
    key: 'orders',
    label: 'All Orders',
    description: 'Pan-India RERA orders',
    icon: Scale,
    color: 'purple',
    bgClass: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-400',
    iconClass: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    textClass: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
  },
  {
    key: 'judgements',
    label: 'All Judgements',
    description: 'Pan-India RERA judgements',
    icon: Gavel,
    color: 'orange',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:border-orange-400',
    iconClass: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400',
    textClass: 'group-hover:text-orange-600 dark:group-hover:text-orange-400',
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const states = Object.entries(stateConfig).map(([key, config]) => {
    let categoriesCount = 0
    
    if ('hasSubRegions' in config && config.hasSubRegions && config.regions) {
      categoriesCount = Object.values(config.regions).reduce((sum, region) => {
        return sum + Object.keys(region.categories).length
      }, 0)
    } else if ('categories' in config && config.categories) {
      categoriesCount = Object.keys(config.categories).length
    }
    
    return { key, name: config.name, categoriesCount }
  })

  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-600 dark:from-slate-600 dark:via-slate-600 dark:to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <Building2 className="w-7 h-7 text-blue-400" strokeWidth={1.5} />
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">RERA Portal</h1>
                <p className="text-blue-300 text-xs">Real Estate Regulatory Authority</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <Link href="/about" className="text-blue-200 hover:text-white transition">About</Link>
              <Link href="/states" className="text-blue-200 hover:text-white transition">States</Link>
              <Link href="/analytics" className="text-blue-200 hover:text-white transition">Analytics</Link>
              <ThemeToggle />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              India's Unified
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300">
                RERA Database
              </span>
            </h2>
            <p className="text-base text-blue-200 max-w-2xl mx-auto">
              Search across 26 states and UTs. Access 70,000+ registered projects, agents, and compliance records.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by project name, registration number, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm transition"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-1">
                <MapPin className="w-6 h-6 text-blue-300" strokeWidth={1.5} />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">26</div>
              <div className="text-blue-200 text-xs">States & UTs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-1">
                <Building2 className="w-6 h-6 text-purple-300" strokeWidth={1.5} />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">62</div>
              <div className="text-blue-200 text-xs">Data Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center justify-between mb-1">
                <FileText className="w-6 h-6 text-pink-300" strokeWidth={1.5} />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">75</div>
              <div className="text-blue-200 text-xs">Database Tables</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL INDIA DATA SECTION ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">All India Data</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Browse consolidated data across all states and UTs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {masterCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.key}
                href={`/master/${cat.key}`}
                className={`group relative bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border ${cat.bgClass} overflow-hidden block`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${cat.iconClass}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <h4 className={`font-bold text-sm text-slate-900 dark:text-white transition ${cat.textClass}`}>
                  {cat.label}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {cat.description}
                </p>

                {/* Arrow */}
                <ChevronRight className={`absolute top-4 right-4 w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all ${cat.textClass}`} />
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── BROWSE BY STATE SECTION ── */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Browse by State</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Select a state to explore registered projects, agents, and complaints</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredStates.map((state, index) => (
            <Link
              key={state.key}
              href={`/${state.key}`}
              className="group relative bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-left overflow-hidden block"
              style={{ animation: `fadeIn 0.3s ease-out ${index * 0.05}s both` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">{state.name}</h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Categories</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{state.categoriesCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}