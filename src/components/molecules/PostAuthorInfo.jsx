import { Text } from '../atoms/Text'
import { Avatar } from './Avatar'

export const PostAuthorInfo = ({ authorName, authorFlat, createdAt }) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar initials={authorFlat?.slice(-2) || 'A4'} size="large" />
      <div>
        <Text type="p" className="font-medium text-gray-900 dark:text-white">{authorName}</Text>
        <Text type="p" className="text-sm text-gray-500 dark:text-gray-400">
          {authorFlat} • {new Date(createdAt).toLocaleDateString()}
        </Text>
      </div>
    </div>
  )
}