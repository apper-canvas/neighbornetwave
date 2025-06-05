import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'

export const PlaceholderSection = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6">
        <Icon name={icon} className="w-10 h-10 text-primary" />
      </div>
      <Text type="h3" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</Text>
      <Text type="p" className="text-gray-600 dark:text-gray-400 max-w-md">{description}</Text>
      <div className="mt-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
        Coming Soon
      </div>
    </div>
  )
}