import ApperIcon from '../ApperIcon'

export const Button = ({
  children,
  onClick,
  className = '',
  icon,
  iconClass = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 transition-colors ${className}`}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon && <ApperIcon name={icon} className={iconClass} />}
      <span>{children}</span>
    </button>
  )
}