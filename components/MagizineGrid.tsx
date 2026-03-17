'use client'

import { Building2, MapPin, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'

interface MagazineItem {
  title: string
  subtitle?: string
  location?: string
  count?: number
  image?: string
  href: string
  size?: 'small' | 'medium' | 'large'
  featured?: boolean
}

interface MagazineGridProps {
  items: MagazineItem[]
}

export default function MagazineGrid({ items }: MagazineGridProps) {
  const getCardSize = (size?: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'
      case 'medium':
        return 'md:col-span-2 md:row-span-1'
      default:
        return 'md:col-span-1 md:row-span-1'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl ${getCardSize(item.size)}`}
        >
          {/* Background Image or Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
              />
            )}
            {/* Overlay Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
            }} />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-5">
            {/* Top Badge */}
            {item.featured && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-400/90 dark:bg-yellow-500/90 text-yellow-900 rounded-full text-xs font-bold w-fit">
                <Star className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </div>
            )}

            {/* Bottom Content */}
            <div className="space-y-2">
              <div>
                <h3 className={`font-bold text-white leading-tight group-hover:translate-y-[-2px] transition-transform ${
                  item.size === 'large' ? 'text-2xl' : item.size === 'medium' ? 'text-xl' : 'text-lg'
                }`}>
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-white/90 text-sm mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                {item.location && (
                  <div className="flex items-center space-x-1 text-white/80 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                )}
                
                {item.count !== undefined && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                    <Building2 className="w-3 h-3" />
                    <span>{item.count.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform" />
        </Link>
      ))}
    </div>
  )
}

// Helper component for creating magazine items from data
export function createMagazineItems(states: any[]): MagazineItem[] {
  return states.slice(0, 8).map((state, index) => ({
    title: state.name,
    subtitle: `${state.categoriesCount} data categories available`,
    location: state.key.toUpperCase(),
    count: Math.floor(Math.random() * 5000) + 1000, // Random count for demo
    href: `/${state.key}`,
    size: index === 0 ? 'large' : index === 1 || index === 2 ? 'medium' : 'small',
    featured: index === 0
  }))
}