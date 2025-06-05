import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Input } from '../atoms/Input'
import { Text } from '../atoms/Text'
import { Avatar } from '../molecules/Avatar'
import { CategorySelector } from '../molecules/CategorySelector'
import { ImageUpload } from '../molecules/ImageUpload'
import { Spinner } from '../atoms/Spinner'

export const CreatePostForm = ({ isOpen, onClose, onPostCreated }) => {
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
      const { create } = await import('../../services/api/postService')
      const newPost = await create({
        content: content.trim(),
        category,
        images,
        authorName: 'You', // Hardcoded as per original
        authorFlat: 'A-404' // Hardcoded as per original
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

  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, i) => i !== indexToRemove))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <Text type="h2" className="text-xl font-bold text-gray-900 dark:text-white">Create Post</Text>
                <Button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  icon="X"
                  iconClass="w-5 h-5 text-gray-500"
                >
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="flex items-center space-x-3">
                <Avatar initials="A4" size="medium" />
                <div>
                  <Text type="p" className="font-medium text-gray-900 dark:text-white">You</Text>
                  <Text type="p" className="text-sm text-gray-500 dark:text-gray-400">A-404 • Sunrise Heights</Text>
                </div>
              </div>

              <Input
                type="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening in the community?"
                maxLength={500}
                minRows={5}
              />

              <CategorySelector
                categories={categories}
                selectedCategory={category}
                onSelectCategory={setCategory}
              />

              <ImageUpload
                images={images}
                onImageUpload={handleImageUpload}
                onRemoveImage={handleRemoveImage}
              />

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <Text type="p" className="text-sm text-gray-500 dark:text-gray-400">
                  {500 - content.length} characters remaining
                </Text>
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !content.trim()}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    icon={loading ? 'Loader2' : null}
                    iconClass={loading ? 'w-4 h-4 animate-spin' : ''}
                  >
                    Share Post
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}