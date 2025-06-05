import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { Text } from '../atoms/Text'

export const TabNavigation = ({ tabs, activeTab, onSelectTab }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="flex justify-around py-2">
        {tabs.map((item) => (
          <Button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex-col items-center py-2 px-3 rounded-lg ${
              activeTab === item.id
                ? 'text-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            icon={item.icon}
            iconClass="w-6 h-6"
          >
            <Text type="span" className="text-xs mt-1 capitalize">{item.id}</Text>
          </Button>
        ))}
      </div>
    </div>
  )
}