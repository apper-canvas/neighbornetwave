import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { ComplaintCard } from '../molecules/FeatureCard'

export const ComplaintTracker = ({ complaints }) => {
  const submittedComplaints = complaints?.filter(c => c.status === 'submitted') || []
  const inProgressComplaints = complaints?.filter(c => c.status === 'in-progress') || []
  const resolvedComplaints = complaints?.filter(c => c.status === 'resolved') || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text type="h2" className="text-2xl font-bold text-gray-900 dark:text-white">Complaint Tracker</Text>
        <Button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors" icon="Plus" iconClass="w-5 h-5">
          <span className="sr-only">Add Complaint</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4">
          <Text type="h3" className="font-semibold text-gray-900 dark:text-white">Submitted</Text>
          {submittedComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} statusType="submitted" />
          ))}
        </div>
        <div className="space-y-4">
          <Text type="h3" className="font-semibold text-gray-900 dark:text-white">In Progress</Text>
          {inProgressComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} statusType="in-progress" />
          ))}
        </div>
        <div className="space-y-4">
          <Text type="h3" className="font-semibold text-gray-900 dark:text-white">Resolved</Text>
          {resolvedComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} statusType="resolved" />
          ))}
        </div>
      </div>
    </div>
  )
}