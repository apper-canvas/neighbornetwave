import { motion } from 'framer-motion'
import { Card } from '../atoms/Card'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'

export const NoticeCard = ({ notice }) => {
  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} type="motion" className="p-6">
      <div className="flex items-start justify-between mb-3">
        <Badge className={getImportanceColor(notice.importance)}>
          {notice.importance} Priority
        </Badge>
        <Text type="span" className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(notice.createdAt).toLocaleDateString()}
        </Text>
      </div>
      <Text type="h3" className="font-semibold text-gray-900 dark:text-white mb-2">{notice.title}</Text>
      <Text type="p" className="text-gray-600 dark:text-gray-400 text-sm">{notice.content}</Text>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Text type="span" className="text-xs text-gray-500 dark:text-gray-400">Posted by {notice.postedBy}</Text>
      </div>
    </Card>
  )
}

export const EventCard = ({ event }) => {
  return (
    <Card motionProps={{ initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }} type="motion" className="overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-primary to-secondary relative">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <Text type="h3" className="font-bold text-lg">{event.title}</Text>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-3">
          <Icon name="Calendar" className="w-4 h-4" />
          <Text type="span" className="text-sm">{new Date(event.date).toLocaleDateString()}</Text>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
          <Icon name="MapPin" className="w-4 h-4" />
          <Text type="span" className="text-sm">{event.location}</Text>
        </div>
        <Text type="p" className="text-gray-700 dark:text-gray-300 text-sm mb-4">{event.description}</Text>
        <div className="flex items-center justify-between">
          <Text type="span" className="text-sm text-gray-500 dark:text-gray-400">
            {event.attendees?.length || 0} attending
          </Text>
          <Button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm hover:bg-secondary-dark transition-colors">
            RSVP
          </Button>
        </div>
      </div>
    </Card>
  )
}

export const ComplaintCard = ({ complaint, statusType }) => {
  const getBorderColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'border-red-500'
      case 'in-progress':
        return 'border-amber-500'
      case 'resolved':
        return 'border-green-500'
      default:
        return 'border-gray-500'
    }
  }

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <Card motionProps={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }} type="motion" className={`p-4 border-l-4 ${getBorderColor(complaint.status)}`}>
      <Text type="h4" className="font-medium text-gray-900 dark:text-white">{complaint.title}</Text>
      <Text type="p" className="text-sm text-gray-600 dark:text-gray-400 mt-1">{complaint.category}</Text>
      {statusType === 'submitted' && (
        <Badge className={`inline-block mt-2 ${getPriorityBadgeColor(complaint.priority)}`}>
          {complaint.priority} priority
        </Badge>
      )}
      {statusType === 'in-progress' && (
        <Text type="p" className="text-sm text-amber-600 dark:text-amber-400 mt-2">Assigned to {complaint.assignedTo}</Text>
      )}
      {statusType === 'resolved' && (
        <Text type="p" className="text-sm text-green-600 dark:text-green-400 mt-2">
          Resolved on {new Date(complaint.resolvedAt).toLocaleDateString()}
        </Text>
      )}
    </Card>
  )
}