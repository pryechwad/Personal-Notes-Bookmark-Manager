'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { BookOpen, Sun, Moon, LogIn, UserPlus } from 'lucide-react'

export default function PublicNavbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rose-25/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-rose-100/30 dark:border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-gray-900 to-purple-900 dark:from-white dark:to-purple-100 bg-clip-text text-transparent">
              NotesBook
            </span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800/50"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </Button>

            
            <Link href="/login">
              <Button variant="ghost" className="hidden md:flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800/50">
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Button>
            </Link>
            
            <Link href="/register">
              <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-lg text-sm sm:text-base">
                <UserPlus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Join</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}