import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import * as postService from '../services/api/postService'

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('general')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = [
    { value: 'general', label: 'General', icon: 'MessageSquare' },
    { value: 'marketplace', label: 'Marketplace', icon: 'ShoppingBag' },
    { value: 'lost-found', label: 'Lost & Found', icon: 'Search' },
    { value: 'recommendations', label: 'Recommendations', icon: 'ThumbsUp' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) {
      toast.error('Please write something to share!')
      return
    }

    setLoading(true)
    try {
      const newPost = await postService.create({
        content: content.trim(),
        category,
        images,
        authorName: 'You',
        authorFlat: 'A-404'
      })
      
      onPostCreated(newPost)
      setContent('')
      setCategory('general')
      setImages([])
      onClose()
      toast.success('Post shared with the community!')
    } catch (error) {
      toast.error('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 4) {
      toast.error('Maximum 4 images allowed')
      return
    }
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages(prev => [...prev, e.target.result])
      }
      reader.readAsDataURL(file)
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Post</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A4</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">You</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">A-404 • Sunrise Heights</p>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in the community?"
            className="w-full min-h-[120px] p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            maxLength={500}
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`flex items-center space-x-2 p-3 rounded-xl border transition-all ${
                    category === cat.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                  }`}
                >
                  <ApperIcon name={cat.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Images (Optional)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary transition-colors"
            >
              <div className="text-center">
                <ApperIcon name="Camera" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to add images ({4 - images.length} remaining)
                </p>
              </div>
            </label>
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {500 - content.length} characters remaining
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loading && <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />}
                <span>Share Post</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

const PostCard = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike(post.id, !liked)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    onComment(post.id, newComment.trim())
    setNewComment('')
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {post.authorFlat?.slice(-2) || 'A4'}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{post.authorName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.authorFlat} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
            {post.category?.replace('-', ' ') || 'general'}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-gray-900 dark:text-white leading-relaxed">{post.content}</p>
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
                    <span className="text-white font-medium">+{post.images.length - 3} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              liked
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ApperIcon name={liked ? "Heart" : "Heart"} className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium">{(post.likes || 0) + (liked ? 1 : 0)}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ApperIcon name="MessageCircle" className="w-5 h-5" />
            <span className="font-medium">{post.comments?.length || 0}</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <ApperIcon name="Share2" className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <form onSubmit={handleComment} className="flex space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">A4</span>
                </div>
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                  >
                    <ApperIcon name="Send" className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {post.comments?.map((comment, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">
                        {comment.author?.slice(0, 2) || 'NA'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          {comment.author || 'Neighbor'}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function MainFeature({ posts, setPosts, loading, error }) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev])
  }

  const handleLike = async (postId, liked) => {
    try {
      const updatedPost = await postService.update(postId, { 
        likes: posts.find(p => p.id === postId)?.likes + (liked ? 1 : -1) 
      })
      setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p))
    } catch (error) {
      toast.error('Failed to update like')
    }
  }

  const handleComment = async (postId, content) => {
    try {
      const post = posts.find(p => p.id === postId)
      const newComment = {
        content,
        author: 'You',
        createdAt: new Date().toISOString()
      }
      
      const updatedPost = await postService.update(postId, {
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Feed</h2>
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
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load community feed</h3>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Feed</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors flex items-center space-x-2 shadow-lg"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span className="font-medium">New Post</span>
        </button>
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
              <ApperIcon name="MessageSquare" className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Be the first to share something with your community!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Create First Post
            </button>
          </div>
        )}
      </div>

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  )
}

export default MainFeature