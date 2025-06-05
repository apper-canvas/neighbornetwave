import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { PostCard } from './PostCard'
import { CreatePostForm } from './CreatePostForm'
import { Spinner } from '../atoms/Spinner'

export const CommunityFeed = ({ posts, setPosts, loading, error }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev])
  }

  const handleLike = async (postId, liked) => {
    // This logic should ideally be in a service layer or parent component
    // For now, keep it here as per original `MainFeature` logic
    try {
      const { update } = await import('../../services/api/postService')
      const updatedPost = await update(postId, {
        likes: posts.find(p => p.id === postId)?.likes + (liked ? 1 : -1)
      })
      setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p))
    } catch (error) {
      toast.error('Failed to update like')
    }
  }

  const handleComment = async (postId, content) => {
    // This logic should ideally be in a service layer or parent component
    // For now, keep it here as per original `MainFeature` logic
    try {
      const { update } = await import('../../services/api/postService')
      const post = posts.find(p => p.id === postId)
      const newComment = {
        content,
        author: 'You', // Hardcoded as per original
        createdAt: new Date().toISOString()
      }

      const updatedPost = await update(postId, {
        comments: [...(post.comments || []), newComment]
      })

      setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p))
      toast.success('Comment added!')
    } catch (error) {
      toast.error('Failed to add comment')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Text type="h2" className="text-2xl font-bold text-gray-900 dark:text-white">Community Feed</Text>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertTriangle" className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <Text type="h3" className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load community feed</Text>
        <Text type="p" className="text-gray-600 dark:text-gray-400">{error}</Text>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text type="h2" className="text-2xl font-bold text-gray-900 dark:text-white">Community Feed</Text>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
          icon="Plus"
          iconClass="w-5 h-5"
        >
          <Text type="span" className="font-medium">New Post</Text>
        </Button>
      </div>

      <div className="space-y-6">
        {posts?.length > 0 ? (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageSquare" className="w-8 h-8 text-gray-400" />
            </div>
            <Text type="h3" className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts yet</Text>
            <Text type="p" className="text-gray-600 dark:text-gray-400 mb-6">Be the first to share something with your community!</Text>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Create First Post
            </Button>
          </div>
        )}
      </div>

      <CreatePostForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  )
}