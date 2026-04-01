export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

// Domain-specific styles to hide navbars/headers/footers
const domainStyles: Record<string, string> = {
  // Uttarakhand
  'ukrera.uk.gov.in': `
    .navbar, .header, nav, header, .top-bar, .accessibility-bar,
    .banner, .site-header, footer, .footer, .breadcrumb,
    .top-strip, #header, #footer, #navbar { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Telangana
  'rerait.telangana.gov.in': `
    .navbar, .header, nav, header, .top-header, .page-header,
    footer, .footer, .breadcrumb, #header, #footer,
    .site-header, .site-footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  'rera.telangana.gov.in': `
    .navbar, .header, nav, header, .top-header,
    footer, .footer, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Maharashtra
  'maharerait.maharashtra.gov.in': `
    .navbar, nav, header, .header, .top-bar, .masthead,
    footer, .footer, .breadcrumb-section, #header,
    #footer, .site-header { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  'maharera.mahaonline.gov.in': `
    .navbar, nav, header, .header, .top-bar,
    footer, .footer, #header, #footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // West Bengal
  'rera.wb.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    .top-strip, #header, #footer, .site-header,
    .site-footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  'wbrera.wb.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    .top-strip, #header, #footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Kerala
  'rera.kerala.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    .breadcrumb, #header, #footer, .site-header,
    .top-nav { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Madhya Pradesh
  'www.rera.mp.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  'rera.mp.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Haryana
  'haryanarera.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    .top-bar, #header, #footer, .breadcrumb,
    .site-header { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Rajasthan
  'rera.rajasthan.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    .top-strip, #header, #footer, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Delhi
  'www.rera.delhi.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  'rera.delhi.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Punjab
  'pbrerasite.punjab.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Goa
  'rera.goa.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Assam
  'rera.assam.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Jharkhand
  'jharera.jharkhand.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Andhra Pradesh
  'aprera.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Tamil Nadu
  'rera.tn.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Chhattisgarh
  'rera.cgstate.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Gujarat
  'gujrera.gujarat.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar, .breadcrumb { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Puducherry
  'rera.puducherry.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Jammu & Kashmir
  'jkrera.nic.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Andaman & Nicobar
  'and.nic.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
  // Bihar
  'rera.bihar.gov.in': `
    nav, header, .header, .navbar, footer, .footer,
    #header, #footer, .top-bar { display: none !important; }
    body { padding-top: 0 !important; margin-top: 0 !important; }
  `,
}

// Generic fallback styles for any unknown domain
const genericStyles = `
  nav, header, .navbar, .header, .nav, .top-bar,
  .site-header, .main-header, #header, #navbar,
  .navbar-default, .navbar-fixed-top, footer, .footer,
  #footer, .site-footer, .breadcrumb-area,
  .accessibility-bar, .top-strip, .page-header,
  .masthead, .top-nav, .top-strip, .top-header {
    display: none !important;
  }
  body {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }
  .container, .main-content, #main, .wrapper {
    max-width: 100% !important;
    padding: 10px !important;
  }
`

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    // 10 second timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
      },
    })

    clearTimeout(timeout)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${response.status}` },
        { status: response.status }
      )
    }

    let html = await response.text()

    const urlObj = new URL(url)
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`
    const hostname = urlObj.hostname

    // Fix relative URLs
    html = html
      .replace(/src="\/([^"]*?)"/g, `src="${baseUrl}/$1"`)
      .replace(/href="\/([^"]*?)"/g, `href="${baseUrl}/$1"`)
      .replace(/src='\/([^']*?)'/g, `src='${baseUrl}/$1'`)
      .replace(/href='\/([^']*?)'/g, `href='${baseUrl}/$1'`)
      .replace(/url\(\/([^)]*?)\)/g, `url(${baseUrl}/$1)`)
      .replace(/action="\/([^"]*?)"/g, `action="${baseUrl}/$1"`)

    // Pick domain-specific styles or fall back to generic
    const domainSpecificStyles = domainStyles[hostname] || genericStyles

    const injectStyles = `
      <base href="${baseUrl}">
      <style>
        ${domainSpecificStyles}
      </style>
    `

    // Inject styles after <head>
    html = html.replace('<head>', `<head>${injectStyles}`)

    // Prevent links from navigating away
    const injectScript = `
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          document.querySelectorAll('a').forEach(function(link) {
            const href = link.getAttribute('href')
            if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
              link.setAttribute('target', '_self')
            }
          })
        })
      </script>
    `
    html = html.replace('</body>', `${injectScript}</body>`)

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    })

  } catch (error: any) {
    const isTimeout = error.name === 'AbortError'
    return NextResponse.json(
      {
        error: isTimeout ? 'Request timed out' : 'Failed to fetch page',
        message: error.message,
        timeout: isTimeout
      },
      { status: isTimeout ? 504 : 500 }
    )
  }
}