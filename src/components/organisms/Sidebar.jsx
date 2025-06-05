import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { Text } from '../atoms/Text'
import { AppIconAvatar } from '../molecules/Avatar'

export const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigation = [
    { id: 'home', label: 'Home', icon: 'Home', functional: true },
    { id: 'notices', label: 'Notices', icon: 'Bell', functional: true },
    { id: 'events', label: 'Events', icon: 'Calendar', functional: true },
    { id: 'complaints', label: 'Complaints', icon: 'AlertTriangle', functional: true },
    { id: 'directory', label: 'Directory', icon: 'Users', functional: false },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle', functional: false },
    { id: 'visitors', label: 'Visitors', icon: 'UserCheck', functional: false },
    { id: 'finance', label: 'Finance', icon: 'DollarSign', functional: false },
    { id: 'documents', label: 'Documents', icon: 'FileText', functional: false },
    { id: 'polls', label: 'Polls', icon: 'BarChart3', functional: false }
  ]

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-full w-280 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <AppIconAvatar iconName="Home" size="medium" className="rounded-xl" />
          <div>
            <Text type="h1" className="text-xl font-bold text-gray-900 dark:text-white">NeighborNet</Text>
            <Text type="p" className="text-sm text-gray-600 dark:text-gray-400">Sunrise Heights</Text>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.id}
            onClick={() => item.functional && setActiveSection(item.id)}
            className={`w-full space-x-3 px-4 py-3 rounded-xl ${
              activeSection === item.id
                ? 'bg-primary text-white shadow-lg'
                : item.functional
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
            icon={item.icon}
            iconClass="w-5 h-5"
          >
            <Text type="span" className="font-medium">{item.label}</Text>
            {!item.functional && (
              <Text type="span" className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                Soon
              </Text>
            )}
          </Button>
        ))}
      </nav>
    </div>
  )
}