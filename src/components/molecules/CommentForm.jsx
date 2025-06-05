import { useState } from 'react'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Avatar } from './Avatar'

export const CommentForm = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddComment(newComment.trim())
    setNewComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3 mb-4">
      <Avatar initials="A4" size="small" className="flex-shrink-0" />
      <div className="flex-1 flex space-x-2">
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!newComment.trim()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
          icon="Send"
          iconClass="w-4 h-4"
        >
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  )
}