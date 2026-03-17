'use client'

import { useState, useMemo } from 'react'
import { Search, Download, Filter, ChevronDown, ChevronUp, ExternalLink, FileText } from 'lucide-react'

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  title: string
  searchable?: boolean
  exportable?: boolean
  onRowClick?: (row: any) => void
}

export default function DataTable({ 
  data, 
  columns, 
  title,
  searchable = true,
  exportable = true,
  onRowClick 
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Filter and sort data (NO pagination here - done server-side)
  const filteredData = useMemo(() => {
    let filtered = data

    // Search
    if (searchQuery) {
      filtered = filtered.filter(row => 
        columns.some(col => 
          String(row[col.key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Sort
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchQuery, sortColumn, sortDirection, columns])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const exportToCSV = () => {
    const headers = columns.map(col => col.label).join(',')
    const rows = filteredData.map(row => 
      columns.map(col => {
        const value = row[col.key]
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      }).join(',')
    ).join('\n')
    
    const csv = `${headers}\n${rows}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? 'record' : 'records'} found
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {exportable && (
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        {searchable && (
          <div className="mt-3 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search across all columns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  {column.sortable !== false ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center space-x-1 hover:text-blue-600 transition"
                    >
                      <span>{column.label}</span>
                      {sortColumn === column.key && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    <span>{column.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(row)}
                  className={`${onRowClick ? 'cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700' : ''} transition-colors`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-2.5 text-sm text-slate-900">
                      {column.render 
                        ? column.render(row[column.key], row) 
                        : row[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                  <div className="flex flex-col items-center space-y-1.5">
                    <FileText className="w-10 h-10 text-slate-300" />
                    <p className="text-base font-medium">No records found</p>
                    <p className="text-xs">Try adjusting your search query</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}