'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Save, Bookmark } from 'lucide-react'

export default function BookmarkForm({ bookmark, onSubmit, onClose }) {
  const [form, setForm] = useState({ url: '', title: '', description: '', tags: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (bookmark) {
      setForm({
        url: bookmark.url || '',
        title: bookmark.title || '',
        description: bookmark.description || '',
        tags: bookmark.tags?.join(', ') || ''
      })
    }
  }, [bookmark])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onSubmit({
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(t => t)
      })
    } catch (error) {
      console.error('Failed to save bookmark:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              {bookmark ? 'Edit Bookmark' : 'Create New Bookmark'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">URL *</label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                type="text"
                placeholder="Bookmark title (auto-fetched if empty)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                placeholder="Add a description for this bookmark..."
                className="w-full min-h-[100px] p-3 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <Input
                type="text"
                placeholder="Enter tags separated by commas (e.g., work, tools, reference)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple tags with commas
              </p>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : (bookmark ? 'Update Bookmark' : 'Create Bookmark')}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
