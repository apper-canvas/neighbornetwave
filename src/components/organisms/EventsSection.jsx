import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { EventCard } from '../molecules/FeatureCard'

export const EventsSection = ({ events }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text type="h2" className="text-2xl font-bold text-gray-900 dark:text-white">Community Events</Text>
        <Button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors" icon="Plus" iconClass="w-5 h-5">
          <span className="sr-only">Add Event</span>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}