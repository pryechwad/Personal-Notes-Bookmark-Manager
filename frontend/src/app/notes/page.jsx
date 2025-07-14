'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { fetchNotes, createNote, updateNote, deleteNote, toggleNoteFavorite } from '@/lib/api'
import { Search, Plus, Heart, Edit, Trash2, BookOpen, Filter, Tag, Download, ChevronDown, FileText, File } from 'lucide-react'
import NoteForm from '@/components/notes/NoteForm'
import NoteCard from '@/components/notes/NoteCard'

export default function NotesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [timeFilter, setTimeFilter] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
    if (user) {
      loadNotes()
    }
  }, [user, loading, router])

  const loadNotes = async () => {
    try {
      const params = {}
      if (searchTerm.trim()) params.q = searchTerm.trim()
      if (timeFilter !== 'all') params.timeFilter = timeFilter
      if (selectedTags.length) params.tags = selectedTags.join(',')
      if (showFavorites) params.favorites = 'true'

      const data = await fetchNotes(params)
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
        
        filteredData = filteredData.filter(note => 
          new Date(note.createdAt) >= filterDate
        )
      }
      
      setNotes(filteredData)
    } catch (error) {
      console.error('Failed to load notes:', error)
      setNotes([])
    }
  }

  useEffect(() => {
    if (user) {
      const debounce = setTimeout(() => {
        loadNotes()
      }, 300)
      return () => clearTimeout(debounce)
    }
  }, [searchTerm, timeFilter, selectedTags, showFavorites, user])

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData)
      setShowForm(false)
      loadNotes()
    } catch (error) {
      console.error('Failed to create note:', error)
    }
  }

  const handleUpdateNote = async (id, noteData) => {
    try {
      await updateNote(id, noteData)
      setEditingNote(null)
      loadNotes()
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  }

  const handleDeleteNote = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id)
        loadNotes()
      } catch (error) {
        console.error('Failed to delete note:', error)
      }
    }
  }

  const handleToggleFavorite = async (id) => {
    try {
      await toggleNoteFavorite(id)
      loadNotes()
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

  const allTags = [...new Set(notes.flatMap(note => note.tags))]

  const downloadNotePDF = (note) => {
    const content = `${note.title}\n\n${note.content}\n\nTags: ${(note.tags || []).join(', ')}\nCreated: ${new Date(note.createdAt).toLocaleDateString()}`
    
    const dataBlob = new Blob([content], { type: 'application/pdf' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadNoteWord = (note) => {
    const content = `${note.title}\n\n${note.content}\n\nTags: ${(note.tags || []).join(', ')}\nCreated: ${new Date(note.createdAt).toLocaleDateString()}`
    
    const dataBlob = new Blob([content], { type: 'application/msword' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.doc`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            My Notes
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Organize your thoughts and ideas</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span className="sm:inline">New Note</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base bg-white/50 dark:bg-slate-700/50 border-2 border-white/30 rounded-xl backdrop-blur-sm focus:border-pink-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="h-12 px-4 rounded-xl bg-white/50 dark:bg-slate-700/50 border-2 border-white/30 text-sm font-medium focus:border-pink-500 transition-all cursor-pointer"
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
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-pink-500/25 transform hover:scale-105' 
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

        </CardContent>
      </Card>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="group relative cursor-pointer" onClick={() => setShowForm(true)}>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">{notes.length}</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2">Total Notes</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-full px-3 py-1">
                {notes.length > 0 ? `Latest: ${new Date(notes[0]?.createdAt).toLocaleDateString()}` : '📝 Create your first note'}
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
              <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">{notes.filter(n => n.isFavorite).length}</div>
              <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2">Favorites</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-full px-3 py-1">
                {notes.filter(n => n.isFavorite).length > 0 ? 
                  `❤️ ${Math.round((notes.filter(n => n.isFavorite).length / notes.length) * 100)}% of notes` : 
                  '⭐ Mark notes as favorites'
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
                  '🏷️ Add tags to organize'
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                {searchTerm || timeFilter !== 'all' || selectedTags.length || showFavorites 
                  ? 'No notes found' 
                  : 'Your Idea Sanctuary Awaits'
                }
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                {searchTerm || timeFilter !== 'all' || selectedTags.length || showFavorites 
                  ? 'Try adjusting your search, time filter, tags, or favorites to discover your thoughts.'
                  : 'Transform fleeting thoughts into lasting memories! Capture ideas, insights, and inspirations in your personal digital notebook.'
                }
              </p>
              {!searchTerm && timeFilter === 'all' && !selectedTags.length && !showFavorites && (
                <div className="space-y-4">
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-6 h-6 mr-3" />
                    Capture Your First Idea
                  </Button>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Rich Text</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Smart Tags</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>Quick Search</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={setEditingNote}
              onDelete={handleDeleteNote}
              onToggleFavorite={handleToggleFavorite}
              onDownloadPDF={() => downloadNotePDF(note)}
              onDownloadWord={() => downloadNoteWord(note)}
            />
          ))}
        </div>
      )}

      {/* Note Form Modal */}
      {(showForm || editingNote) && (
        <NoteForm
          note={editingNote}
          onSubmit={editingNote ? 
            (data) => handleUpdateNote(editingNote._id, data) : 
            handleCreateNote
          }
          onClose={() => {
            setShowForm(false)
            setEditingNote(null)
          }}
        />
      )}
      </div>
    </div>
  )
}