import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Card } from '../atoms/Card'
import { Badge } from '../atoms/Badge'
import { PostAuthorInfo } from '../molecules/PostAuthorInfo'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { CommentForm } from '../molecules/CommentForm'
import { CommentItem } from '../molecules/CommentItem'

export const PostCard = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike(post.id, !liked)
  }

  const handleAddComment = (commentContent) => {
    onComment(post.id, commentContent)
    setShowComments(true)
  }

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      marketplace: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'lost-found': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      recommendations: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    }
    return colors[category] || colors.general
  }

  return (
    <Card type="motion" className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <PostAuthorInfo
            authorName={post.authorName}
            authorFlat={post.authorFlat}
            createdAt={post.createdAt}
          />
          <Badge className={getCategoryColor(post.category)}>
            {post.category?.replace('-', ' ') || 'general'}
          </Badge>
        </div>

        <div className="mb-4">
          <Text type="p" className="text-gray-900 dark:text-white leading-relaxed">{post.content}</Text>
        </div>

        {post.images && post.images.length > 0 && (
          <div className={`mb-4 grid gap-2 ${
            post.images.length === 1 ? 'grid-cols-1' :
            post.images.length === 2 ? 'grid-cols-2' :
            'grid-cols-2'
          }`}>
            {post.images.slice(0, 4).map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-xl"
                />
                {index === 3 && post.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <Text type="span" className="text-white font-medium">+{post.images.length - 3} more</Text>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleLike}
            className={`space-x-2 px-4 py-2 rounded-lg ${
              liked
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            icon={liked ? "Heart" : "Heart"}
            iconClass={`w-5 h-5 ${liked ? 'fill-current' : ''}`}
          >
            <Text type="span" className="font-medium">{(post.likes || 0) + (liked ? 1 : 0)}</Text>
          </Button>

          <Button
            onClick={() => setShowComments(!showComments)}
            className="space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            icon="MessageCircle"
            iconClass="w-5 h-5"
          >
            <Text type="span" className="font-medium">{post.comments?.length || 0}</Text>
          </Button>

          <Button
            className="space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            icon="Share2"
            iconClass="w-5 h-5"
          >
            <span className="sr-only">Share</span>
          </Button>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <CommentForm onAddComment={handleAddComment} />

              <div className="space-y-3">
                {post.comments?.map((comment, index) => (
                  <CommentItem
                    key={index}
                    author={comment.author}
                    content={comment.content}
                    createdAt={comment.createdAt}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}