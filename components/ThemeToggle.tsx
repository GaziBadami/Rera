'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-blue-200" />
      ) : (
        <Sun className="w-4 h-4 text-yellow-300" />
      )}
    </button>
  )
}