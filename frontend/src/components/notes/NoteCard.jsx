import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Edit, Trash2, Calendar, Download, FileText, File } from 'lucide-react'
import { useState } from 'react'

export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite, onDownloadPDF, onDownloadWord }) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg leading-tight">{note.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(note._id)}
            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
              note.isFavorite ? 'opacity-100' : ''
            }`}
          >
            <Heart className={`w-4 h-4 ${
              note.isFavorite ? 'text-red-500 fill-current' : 'text-muted-foreground'
            }`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">{note.content}</p>
        
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(note.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              >
                <Download className="w-4 h-4 text-emerald-600" />
              </Button>
              {showDownloadMenu && (
                <div className="absolute right-0 bottom-full mb-1 w-24 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => { onDownloadPDF(); setShowDownloadMenu(false); }}
                      className="w-full px-2 py-1 text-left hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-1 text-xs"
                    >
                      <File className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => { onDownloadWord(); setShowDownloadMenu(false); }}
                      className="w-full px-2 py-1 text-left hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-1 text-xs"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Word</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(note)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(note._id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
