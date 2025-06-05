import { Text } from '../atoms/Text'
import { Avatar } from './Avatar'

export const CommentItem = ({ author, content, createdAt }) => {
  return (
    <div className="flex space-x-3">
      <Avatar initials={author?.slice(0, 2) || 'NA'} size="small" className="flex-shrink-0 bg-gray-300 dark:bg-gray-600" />
      <div className="flex-1">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
          <Text type="p" className="font-medium text-sm text-gray-900 dark:text-white">
            {author || 'Neighbor'}
          </Text>
          <Text type="p" className="text-gray-700 dark:text-gray-300">{content}</Text>
        </div>
        <Text type="p" className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3">
          {new Date(createdAt).toLocaleDateString()}
        </Text>
      </div>
    </div>
  )
}