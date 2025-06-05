import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { NoticeCard } from '../molecules/FeatureCard'

export const NoticesSection = ({ notices }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text type="h2" className="text-2xl font-bold text-gray-900 dark:text-white">Official Notices</Text>
        <Button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors" icon="Plus" iconClass="w-5 h-5">
          <span className="sr-only">Add Notice</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notices?.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  )
}