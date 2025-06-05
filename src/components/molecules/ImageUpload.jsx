import { Icon } from '../atoms/Icon'
import { Label } from '../atoms/Label'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'

export const ImageUpload = ({ images, onImageUpload, onRemoveImage, maxImages = 4 }) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="image-upload">Images (Optional)</Label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
        id="image-upload"
      />
      <Label
        htmlFor="image-upload"
        className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary transition-colors"
      >
        <div className="text-center">
          <Icon name="Camera" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <Text type="p" className="text-sm text-gray-600 dark:text-gray-400">
            Click to add images ({maxImages - images.length} remaining)
          </Text>
        </div>
      </Label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <Button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}