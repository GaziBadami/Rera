'use client'

// Temporary debug component - shows all available fields in the data
export default function DebugFields({ data }: { data: any }) {
  if (!data || data.length === 0) return null
  
  const firstRow = data[0]
  const fields = Object.keys(firstRow)
  
  return (
    <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <p className="font-bold text-sm mb-2">🔍 Debug: Available Fields</p>
      <div className="flex flex-wrap gap-2">
        {fields.map(field => (
          <span key={field} className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded text-xs font-mono">
            {field}
          </span>
        ))}
      </div>
      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
        Sample values: {JSON.stringify(firstRow, null, 2).substring(0, 200)}...
      </p>
    </div>
  )
}