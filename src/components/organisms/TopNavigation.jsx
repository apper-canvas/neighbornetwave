import { toast } from 'react-toastify'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { Text } from '../atoms/Text'
import { AppIconAvatar, Avatar } from '../molecules/Avatar'

export const TopNavigation = ({ isOpen, onToggle }) => {
  return (
    <header className="fixed top-0 left-0 lg:left-280 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-4">
<Button 
            onClick={onToggle}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <AppIconAvatar iconName="Home" size="small" className="rounded-lg" />
            <Text type="h1" className="text-lg font-bold text-gray-900 dark:text-white">NeighborNet</Text>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon name="Bell" className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Avatar initials="A4" size="small" />
        </div>
      </div>
    </header>
  )
}