import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import * as postService from '../services/api/postService'
import * as noticeService from '../services/api/noticeService'
import * as eventService from '../services/api/eventService'
import * as complaintService from '../services/api/complaintService'

const Sidebar = ({ activeSection, setActiveSection }) => {
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
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <ApperIcon name="Home" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">NeighborNet</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sunrise Heights</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => item.functional && setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-primary text-white shadow-lg'
                : item.functional
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            <ApperIcon name={item.icon} className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {!item.functional && (
              <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                Soon
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

const TopNavigation = () => {
  return (
    <header className="fixed top-0 left-0 lg:left-280 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-4 lg:hidden">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Home" className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">NeighborNet</h1>
        </div>
        
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search community..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              onFocus={() => toast.info("Enhanced search coming soon!")}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <ApperIcon name="Bell" className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A4</span>
          </div>
        </div>
      </div>
    </header>
  )
}

const MobileNavigation = ({ activeSection, setActiveSection }) => {
  const mobileNav = [
    { id: 'home', icon: 'Home' },
    { id: 'notices', icon: 'Bell' },
    { id: 'events', icon: 'Calendar' },
    { id: 'complaints', icon: 'AlertTriangle' },
    { id: 'messages', icon: 'MessageCircle' }
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="flex justify-around py-2">
        {mobileNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              activeSection === item.id
                ? 'text-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <ApperIcon name={item.icon} className="w-6 h-6" />
            <span className="text-xs mt-1 capitalize">{item.id}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const PlaceholderSection = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">{description}</p>
      <div className="mt-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
        Coming Soon
      </div>
    </div>
  )
}

function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [posts, setPosts] = useState([])
  const [notices, setNotices] = useState([])
  const [events, setEvents] = useState([])
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [postsData, noticesData, eventsData, complaintsData] = await Promise.all([
          postService.getAll(),
          noticeService.getAll(),
          eventService.getAll(),
          complaintService.getAll()
        ])
        setPosts(postsData || [])
        setNotices(noticesData || [])
        setEvents(eventsData || [])
        setComplaints(complaintsData || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load community data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <MainFeature 
            posts={posts}
            setPosts={setPosts}
            loading={loading}
            error={error}
          />
        )
      case 'notices':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Official Notices</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors">
                <ApperIcon name="Plus" className="w-5 h-5" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notices?.map((notice) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-card border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      notice.importance === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      notice.importance === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {notice.importance} Priority
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{notice.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{notice.content}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Posted by {notice.postedBy}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      case 'events':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Events</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors">
                <ApperIcon name="Plus" className="w-5 h-5" />
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events?.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-card border border-gray-200 dark:border-gray-700"
                >
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
                      <h3 className="font-bold text-lg">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-3">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
                      <ApperIcon name="MapPin" className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {event.attendees?.length || 0} attending
                      </span>
                      <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm hover:bg-secondary-dark transition-colors">
                        RSVP
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      case 'complaints':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Complaint Tracker</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors">
                <ApperIcon name="Plus" className="w-5 h-5" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Submitted</h3>
                {complaints?.filter(c => c.status === 'submitted').map((complaint) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card border-l-4 border-red-500"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">{complaint.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{complaint.category}</p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                      complaint.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      complaint.priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {complaint.priority} priority
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">In Progress</h3>
                {complaints?.filter(c => c.status === 'in-progress').map((complaint) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card border-l-4 border-amber-500"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">{complaint.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{complaint.category}</p>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">Assigned to {complaint.assignedTo}</p>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Resolved</h3>
                {complaints?.filter(c => c.status === 'resolved').map((complaint) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card border-l-4 border-green-500"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">{complaint.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{complaint.category}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Resolved on {new Date(complaint.resolvedAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'directory':
        return <PlaceholderSection title="Resident Directory" description="Browse and connect with your neighbors. View contact information and resident profiles." icon="Users" />
      case 'messages':
        return <PlaceholderSection title="Direct Messaging" description="Chat with neighbors and committee members. Send images, files, and create group conversations." icon="MessageCircle" />
      case 'visitors':
        return <PlaceholderSection title="Visitor Management" description="Digital visitor tracking and pre-approval system. Enhanced security for your community." icon="UserCheck" />
      case 'finance':
        return <PlaceholderSection title="Financial Portal" description="Track dues, expenses, and society finances. View reports and manage payments online." icon="DollarSign" />
      case 'documents':
        return <PlaceholderSection title="Document Center" description="Access important society documents, meeting minutes, and official records securely." icon="FileText" />
      case 'polls':
        return <PlaceholderSection title="Community Polls" description="Participate in society decisions through digital voting and surveys." icon="BarChart3" />
      default:
        return <MainFeature posts={posts} setPosts={setPosts} loading={loading} error={error} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <TopNavigation />
      
      <main className="lg:ml-280 pt-16 pb-16 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <MobileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  )
}

export default Home