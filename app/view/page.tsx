'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { Building2, ExternalLink, ChevronLeft, Loader2, RefreshCw, AlertCircle, MapPin, User, Hash, Clock, FileText, Info } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

// States whose RERA websites don't support direct project links (SPA sites)
const NO_DIRECT_LINK_DOMAINS = [
  'gujrera.gujarat.gov.in',
]

function ViewContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url') || ''
  const title = searchParams.get('title') || 'Details'
  const state = searchParams.get('state') || ''
  const regNo = searchParams.get('regNo') || ''
  const location = searchParams.get('location') || ''
  const promoter = searchParams.get('promoter') || ''
  const status = searchParams.get('status') || ''
  const pdfUrl = searchParams.get('pdfUrl') || ''

  const [iframeError, setIframeError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [slowLoad, setSlowLoad] = useState(false)
  const [copied, setCopied] = useState(false)

  // Detect SPA sites with no direct link support
  const isNoDirectLink = url && NO_DIRECT_LINK_DOMAINS.some(d => url.includes(d))

  // Determine what to show in right panel
  const hasPdf = !!pdfUrl
  const hasUrl = !!url && !isNoDirectLink
  const hasAnyLink = hasUrl || hasPdf

  // If URL is a PDF, open directly in iframe
  const isPdfUrl = url.includes('.pdf')

  // What to load in iframe
  const iframeSrc = isPdfUrl
    ? url
    : hasUrl
      ? `/api/proxy?url=${encodeURIComponent(url)}`
      : hasPdf
        ? pdfUrl
        : ''

  // Show "taking too long" after 8 seconds
  useEffect(() => {
    if (!loading || !iframeSrc) return
    const timer = setTimeout(() => setSlowLoad(true), 8000)
    return () => clearTimeout(timer)
  }, [loading, refreshKey, iframeSrc])

  const handleRefresh = () => {
    setRefreshKey(k => k + 1)
    setLoading(true)
    setIframeError(false)
    setSlowLoad(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(regNo)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Get the base domain for SPA site link
  const getBaseDomain = (u: string) => {
    try {
      const obj = new URL(u)
      return `${obj.protocol}//${obj.hostname}`
    } catch {
      return u
    }
  }

  // Get state display name
  const stateDisplayName = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">

      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-700 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-blue-400" />
          <span className="text-white font-bold text-sm">RERA Portal</span>
          <span className="text-blue-300 text-xs hidden md:block">— Detail View</span>
        </div>
        <div className="flex items-center space-x-3">
          {hasUrl && !isPdfUrl && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Original</span>
            </a>
          )}
          {hasPdf && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>
          )}
          {isNoDirectLink && (
            <a
              href={getBaseDomain(url)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Go to {stateDisplayName} RERA</span>
            </a>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Split View */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 44px)' }}>

        {/* LEFT PANEL — Card Details */}
        <div className="w-80 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">

          {/* Close Button */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-700">
            <button
              onClick={() => window.close()}
              className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Close Tab</span>
            </button>
          </div>

          {/* Details */}
          <div className="p-4 space-y-4">

            {/* Title */}
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Record Details
                </span>
              </div>
              <h2 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">
                {title}
              </h2>
            </div>

            {/* Info Cards */}
            <div className="space-y-2">
              {state && (
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">State</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize pl-4">
                    {stateDisplayName}
                  </p>
                </div>
              )}

              {regNo && (
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <Hash className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Registration No.</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono pl-4 break-all">
                    {regNo}
                  </p>
                </div>
              )}

              {promoter && (
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Promoter / Agent</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white pl-4">
                    {promoter}
                  </p>
                </div>
              )}

              {location && (
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white pl-4">
                    {location}
                  </p>
                </div>
              )}

              {status && (
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white pl-4">
                    {status}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              {hasUrl && !isPdfUrl && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open on RERA Website</span>
                </a>
              )}

              {isNoDirectLink && (
                <a
                  href={getBaseDomain(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Go to {stateDisplayName} RERA</span>
                </a>
              )}

              {hasPdf && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              )}

              {hasAnyLink && !isNoDirectLink && (
                <button
                  onClick={handleRefresh}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Preview</span>
                </button>
              )}
            </div>

            {/* Source URL */}
            {hasUrl && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Source URL</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 break-all leading-relaxed">
                  {url}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 relative bg-white dark:bg-slate-900">

          {/* SPA — No Direct Link */}
          {isNoDirectLink && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-10">
              <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                  Direct Link Not Supported
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {stateDisplayName} RERA website does not support direct project links.
                  To view this project manually:
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-left mb-5 space-y-2.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">1.</span> Go to {stateDisplayName} RERA website
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">2.</span> Click on Projects → Search
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">3.</span> Search for this registration number:
                  </p>
                  {regNo && (
                    <div className="bg-white dark:bg-slate-700 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 break-all">
                        {regNo}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="flex-shrink-0 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs hover:bg-blue-100 transition"
                      >
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  )}
                </div>
                <a
                  href={getBaseDomain(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Go to {stateDisplayName} RERA</span>
                </a>
              </div>
            </div>
          )}

          {/* NO LINK AVAILABLE */}
          {!hasAnyLink && !isNoDirectLink && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                  No Additional Details Available
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  This record does not have a link to the official RERA website.
                  All available information is shown on the left panel.
                </p>
              </div>
            </div>
          )}

          {/* LOADING */}
          {hasAnyLink && !isNoDirectLink && loading && !iframeError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-10">
              <div className="text-center max-w-sm px-6">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {isPdfUrl || (!hasUrl && hasPdf) ? 'Loading PDF...' : 'Loading RERA Page...'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {isPdfUrl || (!hasUrl && hasPdf) ? 'Opening document' : 'Fetching from government server'}
                </p>

                {/* Slow load warning */}
                {slowLoad && !isPdfUrl && (
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-3 font-medium">
                      ⚠️ Government servers are slow. Try opening directly:
                    </p>
                    <a
                      href={url || pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Original Page</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ERROR */}
          {hasAnyLink && !isNoDirectLink && iframeError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-10">
              <div className="text-center max-w-sm px-6">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Unable to Load Preview
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                  The page could not be loaded in preview mode.
                </p>
                <div className="space-y-2">
                  {hasUrl && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Original Page</span>
                    </a>
                  )}
                  {hasPdf && (
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Open PDF Directly</span>
                    </a>
                  )}
                  <button
                    onClick={handleRefresh}
                    className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* IFRAME */}
          {iframeSrc && !isNoDirectLink && (
            <iframe
              key={refreshKey}
              src={iframeSrc}
              className="w-full h-full border-0"
              onLoad={() => setLoading(false)}
              onError={() => { setIframeError(true); setLoading(false) }}
              title="RERA Details"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function ViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    }>
      <ViewContent />
    </Suspense>
  )
}