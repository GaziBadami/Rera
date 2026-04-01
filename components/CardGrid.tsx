'use client'

import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import ProjectCard from './ProjectCard'
import CompactCard from './CompactCard'

interface CardGridProps {
  data: any[]
  state: string
  type?: 'project' | 'agent' | 'complaint' | 'order' | 'general'
  defaultView?: 'grid' | 'compact' | 'list'
}

export default function CardGrid({ data, state, type = 'general', defaultView = 'grid' }: CardGridProps) {
  const [view, setView] = useState<'grid' | 'compact' | 'list'>(defaultView)

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">No data available</p>
      </div>
    )
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {data.length} {data.length === 1 ? 'record' : 'records'}
        </p>
        
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded transition ${
              view === 'grid'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setView('compact')}
            className={`p-2 rounded transition ${
              view === 'compact'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Compact view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Display */}
      {view === 'grid' ? (
        type === 'project' ? (
          // Projects use ProjectCard in grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <ProjectCard
                key={index}
                project={item}
                state={item.state || state}
              />
            ))}
          </div>
        ) : (
          // Agents/Orders/Others use CompactCard even in grid view
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item, index) => (
              <CompactCard
                key={index}
                data={item}
                state={item.state || state}
                type={type}
              />
            ))}
          </div>
        )
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <CompactCard
              key={index}
              data={item}
              state={item.state || state}
              type={type === 'project' ? 'general' : type}
            />
          ))}
        </div>
      )}
    </div>
  )
}   