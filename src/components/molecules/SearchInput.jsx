import { Input } from '../atoms/Input'
import { Icon } from '../atoms/Icon'

export const SearchInput = ({ placeholder, onFocus }) => {
  return (
    <div className="relative">
      <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2"
        onFocus={onFocus}
      />
    </div>
  )
}