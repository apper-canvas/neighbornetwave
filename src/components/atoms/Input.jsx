import { Icon } from './Icon'

export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  icon,
  onFocus,
  disabled = false,
  minRows = 3,
  maxLength,
  id,
  ...props
}) => {
  const commonClasses = `w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent ${className}`

  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${commonClasses} resize-none`}
        rows={minRows}
        maxLength={maxLength}
        {...props}
      />
    )
  }

  return (
    <div className="relative">
      {icon && (
        <Icon
          name={icon}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        disabled={disabled}
        className={`${commonClasses} ${icon ? 'pl-10' : ''}`}
        id={id}
        {...props}
      />
    </div>
  )
}