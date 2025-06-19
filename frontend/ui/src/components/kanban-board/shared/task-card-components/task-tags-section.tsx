// task-card-components/task-tags-section.tsx
import React, { useRef, useState, useEffect } from "react"
import { Tag, X } from "lucide-react"
import ColorPicker, { ColorSelectType } from "@components/color-picker"
import { Button } from "@incmix/ui"
import type { TaskTagsSectionProps, Tag as TagType } from "./utils/types"

export function TaskTagsSection({
  currentTask,
  isAddingTag,
  newTagName,
  newTagColor,
  onAddingTagChange,
  onNewTagNameChange,
  onNewTagColorChange,
  onAddTag,
  onRemoveTag,
}: TaskTagsSectionProps) {
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerRef]);

  const handleAddTag = () => {
    onAddTag()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddTag()
    if (e.key === "Escape") onAddingTagChange(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Tags</h3>
        <button 
          onClick={() => onAddingTagChange(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Tag className="h-4 w-4" />
          Add Tag
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentTask.labelsTags && currentTask.labelsTags.length > 0 ? (
          currentTask.labelsTags.map((tag: TagType) => (
            <span
              key={tag.value}
              className="group inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              style={{
                backgroundColor: tag.color + "20",
                color: tag.color,
                borderColor: tag.color + "40",
                border: "1px solid"
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
              {tag.label}
              <X
                className="h-3 w-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveTag(tag.value)
                }}
              />
            </span>
          ))
        ) : (
          <p className="text-gray-500 italic text-sm">No tags added yet</p>
        )}
      </div>

      {isAddingTag && (
        <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
          <input
            value={newTagName}
            onChange={(e) => onNewTagNameChange(e.target.value)}
            placeholder="Tag name"
            autoFocus
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Color:</label>
            <div>
              <div className="relative" ref={colorPickerRef}>
                <Button
                  variant="solid"
                  className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
                  style={{ backgroundColor: newTagColor }}
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                />
                {isColorPickerOpen && (
                  <div className="absolute z-50 mt-1" style={{ minWidth: "240px" }}>
                    <ColorPicker 
                      colorType="base" 
                      onColorSelect={(color: ColorSelectType) => {
                        onNewTagColorChange(color.hex);
                        setIsColorPickerOpen(false);
                      }}
                      activeColor={newTagColor}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1" />
            <button 
              onClick={handleAddTag} 
              disabled={!newTagName.trim()}
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              Add Tag
            </button>
            <button 
              onClick={() => onAddingTagChange(false)}
              className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}