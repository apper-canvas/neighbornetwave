import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { Label } from '../atoms/Label'
import { Text } from '../atoms/Text'

export const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="space-y-3">
      <Label>Category</Label>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            type="button"
            onClick={() => onSelectCategory(cat.value)}
            className={`space-x-2 p-3 rounded-xl border transition-all ${
              selectedCategory === cat.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary/50'
            }`}
          >
            <Icon name={cat.icon} className="w-4 h-4" />
            <Text type="span" className="text-sm font-medium">{cat.label}</Text>
          </Button>
        ))}
      </div>
    </div>
  )
}