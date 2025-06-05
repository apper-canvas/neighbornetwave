import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'

export const Avatar = ({ initials, imageUrl, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  }

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
    xlarge: 'text-xl'
  }

  return (
    <div
      className={`bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="User Avatar" className="w-full h-full object-cover" />
      ) : (
        <Text type="span" className={`text-white font-medium ${textSizeClasses[size]}`}>
          {initials}
        </Text>
      )}
    </div>
  )
}

export const AppIconAvatar = ({ iconName, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16',
    xxl: 'w-20 h-20'
  }

  const iconSizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-7 h-7',
    xlarge: 'w-8 h-8',
    xxl: 'w-10 h-10'
  }

  return (
    <div className={`bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <Icon name={iconName} className={`text-white ${iconSizeClasses[size]}`} />
    </div>
  )
}