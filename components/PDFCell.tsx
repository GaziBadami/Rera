import { FileText, Download, ExternalLink, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface PDFCellProps {
  pdfUrl?: string | null
  pdfFilename?: string | null
  downloadStatus?: string | null
  pdfSizeKb?: number | null
}

export default function PDFCell({ pdfUrl, pdfFilename, downloadStatus, pdfSizeKb }: PDFCellProps) {
  // If no URL and no filename, show no data
  if (!pdfUrl && !pdfFilename) {
    return <span className="text-slate-400">-</span>
  }

  // Show status badge if available
  const getStatusBadge = () => {
    if (!downloadStatus) return null
    
    if (downloadStatus.toLowerCase().includes('success') || downloadStatus.toLowerCase().includes('downloaded')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
          <CheckCircle className="w-3 h-3" />
          Downloaded
        </span>
      )
    }
    
    if (downloadStatus.toLowerCase().includes('fail') || downloadStatus.toLowerCase().includes('error')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
          <XCircle className="w-3 h-3" />
          Failed
        </span>
      )
    }
    
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
        <AlertCircle className="w-3 h-3" />
        Pending
      </span>
    )
  }

  const fileSize = pdfSizeKb ? `${pdfSizeKb} KB` : null

  return (
    <div className="flex items-center gap-2">
      {pdfUrl ? (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition text-sm font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
          {fileSize && <span className="text-xs opacity-75">({fileSize})</span>}
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm">
          <FileText className="w-4 h-4" />
          {pdfFilename || 'PDF'}
        </span>
      )}
      
      {getStatusBadge()}
    </div>
  )
}