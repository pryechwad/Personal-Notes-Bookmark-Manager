'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { fetchNotes, fetchBookmarks } from '@/lib/api'
import { Search, BookOpen, Bookmark, Heart, Plus, Filter, Sparkles, TrendingUp, Clock, Star, User, Download, Shield, Zap, Globe, Smartphone, Cloud, Lock } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import PublicNavbar from '@/components/layout/PublicNavbar'
import HomeFooter from '@/components/layout/HomeFooter'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      return
    }
    if (user) {
      loadData()
    }
  }, [user, loading])

  const loadData = async () => {
    try {
      const params = {}
      if (searchTerm) params.q = searchTerm
      if (showFavorites) params.favorites = 'true'
      if (selectedTags.length) params.tags = selectedTags.join(',')

      const [notesData, bookmarksData] = await Promise.all([
        fetchNotes(params),
        fetchBookmarks(params)
      ])
      setNotes(notesData)
      setBookmarks(bookmarksData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  useEffect(() => {
    if (user) {
      const debounce = setTimeout(loadData, 300)
      return () => clearTimeout(debounce)
    }
  }, [searchTerm, showFavorites, selectedTags])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <PublicNavbar />
        <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 pt-16">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-40 left-40 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-full">
              <div className="text-center max-w-6xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold mb-8 shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Transform Your Digital Life
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight" style={{fontFamily: 'Kalam, cursive'}}>
                  <span className="block bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent mb-4">
                    Personal Notes &
                  </span>
                  <span className="block bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Bookmark Manager
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-medium px-4" style={{fontFamily: 'Inter, sans-serif'}}>
                  Capture brilliant ideas, organize thoughts, and save important links in one beautiful, intelligent workspace designed for creative minds.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <Link href="/register">
                    <Button size="lg" className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
                      <Plus className="w-6 h-6 mr-3" />
                      Start Creating Now
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" className="bg-white/80 backdrop-blur-sm border-2 border-white/50 text-gray-700 hover:bg-white/90 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
                      <User className="w-6 h-6 mr-3" />
                      Sign In
                    </Button>
                  </Link>
                </div>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-6xl mx-auto px-4">
                  <div className="group relative transform hover:scale-105 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                    <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-2xl p-6 h-full group-hover:shadow-pink-500/25 transition-all duration-500">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                        <BookOpen className="w-6 h-6 text-white group-hover:animate-bounce" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">Smart Notes</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        Create rich-text notes with powerful organization. Tag, search, and favorite your thoughts for instant access.
                      </p>
                    </Card>
                  </div>
                  
                  <div className="group relative transform hover:scale-105 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                    <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-2xl p-6 h-full group-hover:shadow-orange-500/25 transition-all duration-500">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                        <Bookmark className="w-6 h-6 text-white group-hover:animate-bounce" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">Web Bookmarks</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        Save and organize your favorite websites. Auto-fetch titles, add descriptions, and categorize with tags.
                      </p>
                    </Card>
                  </div>
                  
                  <div className="group relative transform hover:scale-105 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                    <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-2xl p-6 h-full group-hover:shadow-purple-500/25 transition-all duration-500">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                        <Search className="w-6 h-6 text-white group-hover:animate-bounce" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Advanced Search</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        Find anything instantly with real-time search, tag filtering, and smart organization across all your content.
                      </p>
                    </Card>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-center mb-6 sm:mb-8 px-4">
                  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg min-w-[120px]">
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-1">10K+</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">Happy Users</div>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg min-w-[120px]">
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-1">1M+</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">Notes Created</div>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg min-w-[120px]">
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-1">500K+</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">Links Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Why Choose NotesBook Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Why Choose NotesBook?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Built with cutting-edge technology and designed for modern productivity
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 px-4">
              <div className="group relative transform hover:scale-110 transition-all duration-500 hover:rotate-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
                <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-xl p-6 h-full group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-lg">
                    <Shield className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Secure & Private</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    Your data is encrypted and stored securely. JWT authentication ensures only you can access your content.
                  </p>
                </Card>
              </div>
              
              <div className="group relative transform hover:scale-110 transition-all duration-500 hover:-rotate-1">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
                <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-xl p-6 h-full group-hover:shadow-2xl group-hover:shadow-green-500/25 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:-rotate-12 group-hover:scale-125 transition-all duration-500 shadow-lg">
                    <Zap className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    Built with Next.js 15 and React 19. Real-time search and instant sync across all your devices.
                  </p>
                </Card>
              </div>
              
              <div className="group relative transform hover:scale-110 transition-all duration-500 hover:rotate-1">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
                <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-xl p-6 h-full group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-lg">
                    <Smartphone className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Mobile Ready</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    Fully responsive design works perfectly on desktop, tablet, and mobile. Access anywhere, anytime.
                  </p>
                </Card>
              </div>
              
              <div className="group relative transform hover:scale-110 transition-all duration-500 hover:-rotate-1">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
                <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-xl p-6 h-full group-hover:shadow-2xl group-hover:shadow-red-500/25 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:-rotate-12 group-hover:scale-125 transition-all duration-500 shadow-lg">
                    <Cloud className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">Cloud Powered</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    MongoDB cloud database ensures your data is always backed up and accessible from anywhere.
                  </p>
                </Card>
              </div>
              
              <div className="group relative transform hover:scale-110 transition-all duration-500 hover:rotate-1">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
                <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-xl p-6 h-full group-hover:shadow-2xl group-hover:shadow-yellow-500/25 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 shadow-lg">
                    <Globe className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">Modern Tech</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    Built with cutting-edge technologies: Next.js, React, Tailwind CSS, and shadcn/ui components.
                  </p>
                </Card>
              </div>
              
              <div className="group relative transform hover:scale-110 transition-all duration-500 hover:-rotate-1">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
                <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-xl p-6 h-full group-hover:shadow-2xl group-hover:shadow-teal-500/25 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:-rotate-12 group-hover:scale-125 transition-all duration-500 shadow-lg">
                    <Lock className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">Export Ready</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    Download your notes in PDF or Word format. Your data is always portable and accessible.
                  </p>
                </Card>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 max-w-full">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Ready to Transform Your Digital Life?
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                Join thousands of creative minds who have revolutionized their productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
                    <Plus className="w-6 h-6 mr-3" />
                    Start Creating Now
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" className="bg-white/80 backdrop-blur-sm border-2 border-white/50 text-gray-700 hover:bg-white/90 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
                    <User className="w-6 h-6 mr-3" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
    )
  }

  const allTags = [...new Set([
    ...(Array.isArray(notes) ? notes.flatMap(n => n.tags || []) : []),
    ...(Array.isArray(bookmarks) ? bookmarks.flatMap(b => b.tags || []) : [])
  ])]

  return (
    <div>
      <Navbar />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 max-w-full">
          <div className="text-center space-y-6 py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-3xl mb-6 shadow-2xl animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent">
                Welcome back,
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                {user.name}!
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Your personal knowledge universe awaits. Ready to capture brilliant ideas?
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">{Array.isArray(notes) ? notes.length : 0}</div>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">Smart Notes</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Bookmark className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">{Array.isArray(bookmarks) ? bookmarks.length : 0}</div>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">Bookmarks</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                  {(Array.isArray(notes) ? notes.filter(n => n.isFavorite).length : 0) + (Array.isArray(bookmarks) ? bookmarks.filter(b => b.isFavorite).length : 0)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">Favorites</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">{allTags.length}</div>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">Tags</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                  <Input
                    placeholder="Search your knowledge universe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg bg-white/50 dark:bg-slate-700/50 border-2 border-white/30 rounded-xl"
                  />
                </div>
                <Button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className={`h-14 px-6 rounded-xl font-semibold ${
                    showFavorites 
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' 
                      : 'bg-white/50 dark:bg-slate-700/50 border-2 border-white/30'
                  }`}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Favorites
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-4 text-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-black text-gray-900 dark:text-white">Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!Array.isArray(notes) || notes.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 mb-4">No notes yet</p>
                    <Link href="/notes">
                      <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold">
                        <Plus className="w-5 h-5 mr-2" />
                        Create First Note
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {(Array.isArray(notes) ? notes : []).slice(0, 3).map(note => (
                      <div key={note._id} className="p-4 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/30">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-gray-900 dark:text-white truncate">{note.title}</p>
                          {note.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{note.content}</p>
                      </div>
                    ))}
                    <Link href="/notes">
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold">
                        View All Notes ({Array.isArray(notes) ? notes.length : 0})
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-4 text-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-black text-gray-900 dark:text-white">Bookmarks</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!Array.isArray(bookmarks) || bookmarks.length === 0 ? (
                  <div className="text-center py-8">
                    <Bookmark className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 mb-4">No bookmarks yet</p>
                    <Link href="/bookmarks">
                      <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-bold">
                        <Plus className="w-5 h-5 mr-2" />
                        Save First Link
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {(Array.isArray(bookmarks) ? bookmarks : []).slice(0, 3).map(bookmark => (
                      <div key={bookmark._id} className="p-4 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/30">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-gray-900 dark:text-white truncate">{bookmark.title}</p>
                          {bookmark.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">{bookmark.url}</p>
                      </div>
                    ))}
                    <Link href="/bookmarks">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold">
                        View All Bookmarks ({Array.isArray(bookmarks) ? bookmarks.length : 0})
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}