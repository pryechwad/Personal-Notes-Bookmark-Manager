'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { fetchBookmarks, createBookmark, updateBookmark, deleteBookmark, toggleBookmarkFavorite } from '@/lib/api'
import { Search, Plus, Heart, Bookmark, Filter, Tag } from 'lucide-react'
import BookmarkForm from '@/components/bookmarks/BookmarkForm'
import BookmarkCard from '@/components/bookmarks/BookmarkCard'

export default function BookmarksPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [timeFilter, setTimeFilter] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
    if (user) {
      loadBookmarks()
    }
  }, [user, loading, router])

  const loadBookmarks = async () => {
    try {
      const params = {}
      if (searchTerm.trim()) params.q = searchTerm.trim()
      if (selectedTags.length) params.tags = selectedTags.join(',')
      if (showFavorites) params.favorites = 'true'

      const data = await fetchBookmarks(params)
      let filteredData = Array.isArray(data) ? data : []
      
      // Client-side time filtering
      if (timeFilter !== 'all') {
        const now = new Date()
        const filterDate = new Date()
        
        switch (timeFilter) {
          case 'today':
            filterDate.setHours(0, 0, 0, 0)
            break
          case 'week':
            filterDate.setDate(now.getDate() - 7)
            break
          case 'month':
            filterDate.setMonth(now.getMonth() - 1)
            break
        }
        
        filteredData = filteredData.filter(bookmark => 
          new Date(bookmark.createdAt) >= filterDate
        )
      }
      
      setBookmarks(filteredData)
    } catch (error) {
      console.error('Failed to load bookmarks:', error)
      setBookmarks([])
    }
  }

  useEffect(() => {
    if (user) {
      const debounce = setTimeout(() => {
        loadBookmarks()
      }, 300)
      return () => clearTimeout(debounce)
    }
  }, [searchTerm, timeFilter, selectedTags, showFavorites, user])

  const handleCreateBookmark = async (bookmarkData) => {
    try {
      await createBookmark(bookmarkData)
      setShowForm(false)
      loadBookmarks()
    } catch (error) {
      console.error('Failed to create bookmark:', error)
    }
  }

  const handleUpdateBookmark = async (id, bookmarkData) => {
    try {
      await updateBookmark(id, bookmarkData)
      setEditingBookmark(null)
      loadBookmarks()
    } catch (error) {
      console.error('Failed to update bookmark:', error)
    }
  }

  const handleDeleteBookmark = async (id) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await deleteBookmark(id)
        loadBookmarks()
      } catch (error) {
        console.error('Failed to delete bookmark:', error)
      }
    }
  }

  const handleToggleFavorite = async (id) => {
    try {
      await toggleBookmarkFavorite(id)
      loadBookmarks()
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  const allTags = [...new Set(bookmarks.flatMap(bookmark => bookmark.tags))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Bookmark className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            My Bookmarks
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Save and organize your favorite links</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span className="sm:inline">New Bookmark</span>
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base bg-white/50 dark:bg-slate-700/50 border-2 border-white/30 rounded-xl backdrop-blur-sm focus:border-orange-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="h-12 px-4 rounded-xl bg-white/50 dark:bg-slate-700/50 border-2 border-white/30 text-sm font-medium focus:border-orange-500 transition-all cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <Button
                variant={showFavorites ? 'default' : 'outline'}
                onClick={() => setShowFavorites(!showFavorites)}
                className={`h-12 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  showFavorites 
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-orange-500/25 transform hover:scale-105' 
                    : 'bg-white/50 dark:bg-slate-700/50 border-2 border-white/30 hover:bg-white/70'
                }`}
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </div>
          </div>
          {allTags.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Filter by tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      )
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {allTags.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Filter by tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      )
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="group relative cursor-pointer" onClick={() => setShowForm(true)}>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Bookmark className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">{bookmarks.length}</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2">Total Bookmarks</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-full px-3 py-1">
                {bookmarks.length > 0 ? `Latest: ${new Date(bookmarks[0]?.createdAt).toLocaleDateString()}` : '🔗 Save your first link'}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="group relative cursor-pointer" onClick={() => router.push('/analytics')}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">{bookmarks.filter(b => b.isFavorite).length}</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2">Favorites</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-full px-3 py-1">
                {bookmarks.filter(b => b.isFavorite).length > 0 ? 
                  `❤️ ${Math.round((bookmarks.filter(b => b.isFavorite).length / bookmarks.length) * 100)}% of bookmarks` : 
                  '⭐ Mark links as favorites'
                }
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="group relative cursor-pointer" onClick={() => router.push('/analytics')}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Tag className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">{allTags.length}</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2">Unique Tags</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-full px-3 py-1">
                {allTags.length > 0 ? 
                  `🏷️ Most used: ${allTags[0] || 'None'}` : 
                  '🏷️ Add tags to categorize'
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
                <Bookmark className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                {searchTerm || timeFilter !== 'all' || selectedTags.length || showFavorites 
                  ? 'No bookmarks found' 
                  : 'Your Bookmark Collection Awaits'
                }
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                {searchTerm || timeFilter !== 'all' || selectedTags.length || showFavorites 
                  ? 'Try adjusting your search, time filter, tags, or favorites to find what you\'re looking for.'
                  : 'Start building your personal web library! Save interesting articles, useful resources, and favorite websites all in one place.'
                }
              </p>
              {!searchTerm && timeFilter === 'all' && !selectedTags.length && !showFavorites && (
                <div className="space-y-4">
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-6 h-6 mr-3" />
                    Save Your First Link
                  </Button>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Quick Save</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Auto Organize</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Easy Search</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map(bookmark => (
            <BookmarkCard
              key={bookmark._id}
              bookmark={bookmark}
              onEdit={setEditingBookmark}
              onDelete={handleDeleteBookmark}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Bookmark Form Modal */}
      {(showForm || editingBookmark) && (
        <BookmarkForm
          bookmark={editingBookmark}
          onSubmit={editingBookmark ? 
            (data) => handleUpdateBookmark(editingBookmark._id, data) : 
            handleCreateBookmark
          }
          onClose={() => {
            setShowForm(false)
            setEditingBookmark(null)
          }}
        />
      )}
      </div>
    </div>
  )
}
