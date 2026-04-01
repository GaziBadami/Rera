// Map of state domains for converting relative URLs to absolute
export const stateDomains: Record<string, string> = {
  'gujarat': 'https://gujrera.gujarat.gov.in',
  'maharashtra': 'https://maharera.mahaonline.gov.in',
  'chhattisgarh': 'https://rera.cgstate.gov.in',
  'tamil-nadu': 'https://rera.tn.gov.in',
  'karnataka': 'https://rera.karnataka.gov.in',
  'punjab': 'https://pbrerasite.punjab.gov.in',
  'haryana': 'https://haryanarera.gov.in',
  'uttarakhand': 'https://ukrera.uk.gov.in',
  'rajasthan': 'https://rera.rajasthan.gov.in',
  'goa': 'https://rera.goa.gov.in',
  'delhi': 'https://www.rera.delhi.gov.in',
  'jharkhand': 'https://jharera.jharkhand.gov.in',
  'assam': 'https://rera.assam.gov.in',
  'kerala': 'https://rera.kerala.gov.in',
  'telangana': 'https://rera.telangana.gov.in',
  'andhra-pradesh': 'https://aprera.in',
  'west-bengal': 'https://wbrera.wb.gov.in',
  'madhya-pradesh': 'https://rera.mp.gov.in',
  'bihar': 'https://rera.bihar.gov.in',
  'andaman-nicobar': 'https://and.nic.in/rera',
  'puducherry': 'https://rera.puducherry.gov.in',
  'jammu-kashmir': 'https://jkrera.nic.in',
}

/**
 * Converts a relative URL to absolute URL based on state
 */
export function makeAbsoluteUrl(url: string | null | undefined, state: string): string | null {
  // Check if url is valid string
  if (!url || typeof url !== 'string' || url === 'null' || url === '') return null
  
  // Already absolute
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return encodeURI(decodeURI(url))
  }
  
  // Get base domain for state
  const baseDomain = stateDomains[state.toLowerCase()]
  
  if (!baseDomain) {
    console.warn(`No domain mapping for state: ${state}`)
    return url // Return as-is if no mapping
  }
  
  // Ensure URL starts with /
  const path = url.startsWith('/') ? url : `/${url}`
  
  return encodeURI(`${baseDomain}${path}`)
}