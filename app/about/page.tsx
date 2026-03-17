import { Building2, Database, Code, Shield, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white transition text-sm mb-3">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold">About RERA Portal</h1>
          <p className="text-blue-200 text-sm mt-1">India's Unified Real Estate Database</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Overview */}
        <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white  mb-4">What is RERA Portal?</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            RERA Portal is a comprehensive database aggregating Real Estate Regulatory Authority (RERA) data from across India. 
            We collect, organize, and present information about registered projects, agents, complaints, and regulatory orders 
            from 26+ states and union territories.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Our mission is to make real estate information accessible, transparent, and easy to search - empowering homebuyers, 
            investors, and industry professionals with the data they need to make informed decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   p-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white ">Comprehensive Data</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400  text-sm">
              70,000+ projects, 50,000+ agents, and thousands of compliance records across 26 states and UTs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   p-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white ">Fast Search</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400  text-sm">
              Powerful search and filtering across all states. Find projects by name, location, registration number, or promoter.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   p-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white ">Multi-State Coverage</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400  text-sm">
              Unified access to RERA data from Gujarat, Maharashtra, Karnataka, Tamil Nadu, Punjab, and 21+ other states.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   p-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white ">Official Data</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400  text-sm">
              All data sourced directly from official state RERA websites and updated regularly for accuracy.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-slate-800  rounded-xl shadow-sm border border-slate-200 dark:border-slate-700   p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white ">Technology Stack</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white  mb-2 text-sm">Frontend</h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 ">
                <li>• Next.js 14</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white  mb-2 text-sm">Backend</h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 ">
                <li>• Next.js API Routes</li>
                <li>• MySQL Database</li>
                <li>• Prisma ORM</li>
                <li>• Server-side Pagination</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white  mb-2 text-sm">Data Collection</h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 ">
                <li>• Python (Playwright)</li>
                <li>• Selenium</li>
                <li>• BeautifulSoup</li>
                <li>• Automated Scrapers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-bold mb-1">26+</div>
              <div className="text-blue-100 text-sm">States & UTs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">70K+</div>
              <div className="text-blue-100 text-sm">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">75</div>
              <div className="text-blue-100 text-sm">Data Tables</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-blue-100 text-sm">Official Data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}