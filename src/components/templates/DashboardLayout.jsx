import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '../organisms/Sidebar'
import { TopNavigation } from '../organisms/TopNavigation'
import { MobileNavigation } from '../organisms/MobileNavigation'

export const DashboardLayout = ({ activeSection, setActiveSection, children }) => {
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
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <MobileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  )
}