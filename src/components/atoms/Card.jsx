import { motion } from 'framer-motion'

export const Card = ({ children, className = '', motionProps = {}, type = 'div' }) => {
  const commonClasses = `bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200 dark:border-gray-700 ${className}`

  if (type === 'motion') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        {...motionProps}
        className={commonClasses}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={commonClasses}>{children}</div>
}