import { Icon } from './Icon'

export const Spinner = ({ className = '' }) => {
  return <Icon name="Loader2" className={`animate-spin ${className}`} />
}