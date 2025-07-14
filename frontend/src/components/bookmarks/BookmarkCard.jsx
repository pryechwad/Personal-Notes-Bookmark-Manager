import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Edit, Trash2, Calendar, ExternalLink } from 'lucide-react'

export default function BookmarkCard({ bookmark, onEdit, onDelete, onToggleFavorite }) {
  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <a 
            href={bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-lg leading-tight text-primary hover:underline flex items-center gap-2 flex-1"
          >
            {bookmark.title}
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(bookmark._id)}
            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
              bookmark.isFavorite ? 'opacity-100' : ''
            }`}
          >
            <Heart className={`w-4 h-4 ${
              bookmark.isFavorite ? 'text-red-500 fill-current' : 'text-muted-foreground'
            }`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookmark.description && (
          <p className="text-muted-foreground line-clamp-2">{bookmark.description}</p>
        )}
        
        <p className="text-xs text-muted-foreground truncate">{bookmark.url}</p>
        
        {bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {bookmark.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(bookmark.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(bookmark)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(bookmark._id)}
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
