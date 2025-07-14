'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { BookOpen, Bookmark, Sun, Moon, LogOut, User, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
  }

  if (!mounted) {
    return (
      <nav className="bg-white dark:bg-slate-900 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                Personal Notes & Bookmark Manager
              </span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="glass-effect border-b border-white/20 dark:border-slate-700/50 sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-elegant">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                Personal Notes & Bookmark Manager
              </span>
            </div>
            <div className="sm:hidden">
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                NotesBook
              </span>
            </div>
          </Link>
          
          {user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/notes">
                  <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    <span>Notes</span>
                  </Button>
                </Link>
                <Link href="/bookmarks">
                  <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmarks</span>
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </Button>
                </Link>
              </div>
              
              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-1">
                <Link href="/notes">
                  <Button variant="ghost" size="sm" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/bookmarks">
                  <Button variant="ghost" size="sm" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
            <Sun className="w-4 h-4 text-yellow-500" />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
            <Moon className="w-4 h-4 text-slate-400" />
          </div>

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Member</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="btn-primary text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
