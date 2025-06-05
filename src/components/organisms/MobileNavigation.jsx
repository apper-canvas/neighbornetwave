import { TabNavigation } from '../molecules/TabNavigation'

export const MobileNavigation = ({ activeSection, setActiveSection }) => {
  const mobileNav = [
    { id: 'home', icon: 'Home' },
    { id: 'notices', icon: 'Bell' },
    { id: 'events', icon: 'Calendar' },
    { id: 'complaints', icon: 'AlertTriangle' },
    { id: 'messages', icon: 'MessageCircle' }
  ]

  return (
    <TabNavigation tabs={mobileNav} activeTab={activeSection} onSelectTab={setActiveSection} />
  )
}