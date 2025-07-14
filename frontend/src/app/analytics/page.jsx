'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchNotes, fetchBookmarks } from '@/lib/api'
import { BarChart3, TrendingUp, Heart, Tag, Calendar, Clock, BookOpen, Bookmark, Star, Activity } from 'lucide-react'

export default function AnalyticsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
    if (user) {
      loadData()
    }
  }, [user, loading, router])

  const loadData = async () => {
    try {
      const [notesData, bookmarksData] = await Promise.all([
        fetchNotes({}),
        fetchBookmarks({})
      ])
      setNotes(notesData)
      setBookmarks(bookmarksData)
      calculateAnalytics(notesData, bookmarksData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  const calculateAnalytics = (notesData, bookmarksData) => {
    const allTags = [...new Set([...notesData.flatMap(n => n.tags || []), ...bookmarksData.flatMap(b => b.tags || [])])]
    const tagCounts = {}
    
    allTags.forEach(tag => {
      tagCounts[tag] = (notesData.filter(n => n.tags?.includes(tag)).length + 
                       bookmarksData.filter(b => b.tags?.includes(tag)).length)
    })

    const sortedTags = Object.entries(tagCounts).sort(([,a], [,b]) => b - a)
    
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentNotes = notesData.filter(n => new Date(n.createdAt) >= sevenDaysAgo)
    const recentBookmarks = bookmarksData.filter(b => new Date(b.createdAt) >= sevenDaysAgo)

    setAnalytics({
      totalItems: notesData.length + bookmarksData.length,
      favoritePercentage: Math.round(((notesData.filter(n => n.isFavorite).length + bookmarksData.filter(b => b.isFavorite).length) / (notesData.length + bookmarksData.length)) * 100) || 0,
      mostUsedTags: sortedTags.slice(0, 5),
      recentActivity: [...recentNotes, ...recentBookmarks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10),
      weeklyActivity: {
        notes: recentNotes.length,
        bookmarks: recentBookmarks.length
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8">
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-6 shadow-2xl animate-pulse">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Analytics & Insights
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Discover patterns in your digital knowledge and track your productivity
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => router.push('/')}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{analytics.totalItems || 0}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => router.push('/notes')}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{notes.length}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notes Created</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => router.push('/bookmarks')}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{bookmarks.length}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Links Saved</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => router.push('/')}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{analytics.favoritePercentage}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Favorites</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-gray-900 dark:text-white">Most Used Tags</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analytics.mostUsedTags?.length > 0 ? (
                analytics.mostUsedTags.map(([tag, count], index) => (
                  <div key={tag} className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/30 cursor-pointer hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-105" onClick={() => router.push('/notes')}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
                        'bg-gradient-to-r from-blue-400 to-purple-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{tag}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{count} items</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No tags used yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-gray-900 dark:text-white">Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {analytics.recentActivity?.length > 0 ? (
                analytics.recentActivity.map((item) => (
                  <div key={item._id} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/30 cursor-pointer hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-105" onClick={() => router.push(item.url ? '/bookmarks' : '/notes')}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.url ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'
                    }`}>
                      {item.url ? <Bookmark className="w-4 h-4 text-white" /> : <BookOpen className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</p>
                        {item.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()} • {item.url ? 'Bookmark' : 'Note'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-gray-900 dark:text-white">Weekly Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-200 dark:border-pink-800 cursor-pointer hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 transition-all duration-300 hover:scale-105" onClick={() => router.push('/notes')}>
                <div className="text-3xl font-black text-pink-600 dark:text-pink-400 mb-2">
                  {analytics.weeklyActivity?.notes || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notes This Week</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-200 dark:border-orange-800 cursor-pointer hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20 transition-all duration-300 hover:scale-105" onClick={() => router.push('/bookmarks')}>
                <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-2">
                  {analytics.weeklyActivity?.bookmarks || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bookmarks This Week</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200 dark:border-purple-800 cursor-pointer hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-indigo-500/20 transition-all duration-300 hover:scale-105" onClick={() => router.push('/')}>
                <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
                  {(analytics.weeklyActivity?.notes || 0) + (analytics.weeklyActivity?.bookmarks || 0)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Activity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}