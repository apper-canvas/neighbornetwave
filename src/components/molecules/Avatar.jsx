import { Text } from '../atoms/Text'
import Icon from '../Icon'

export const Avatar = ({ 
  initials, 
  size = 'medium', 
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg'
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        bg-primary-500 text-white rounded-full 
        flex items-center justify-center font-medium
        ${className}
      `}
      {...props}
    >
      <Text className="font-medium text-white">
        {initials}
      </Text>
    </div>
  )
}

export const AppIconAvatar = ({ 
  iconName = 'Home', 
  size = 'medium', 
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  }

  const iconSizes = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-7 h-7'
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        bg-primary-500 text-white rounded-lg 
        flex items-center justify-center
        ${className}
`}
      {...props}
    >
      <Icon name={iconName} className={`${iconSizes[size]} text-white`} />
    </div>
  )
}
}

export default Avatar