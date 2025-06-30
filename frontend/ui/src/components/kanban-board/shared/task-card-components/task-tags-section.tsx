// task-card-components/task-tags-section.tsx
import React, { useRef, useState, useEffect } from "react"
import { Tag, X, Plus } from "lucide-react"
import ColorPicker, { ColorSelectType } from "@components/color-picker"
import { Box, Button, Flex, Heading, IconButton } from "@incmix/ui"
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
    <Box className="space-y-4">
      <Flex align={"center"} justify={"between"}>
        <Heading size={"3"} className="text-gray-12">LABELS</Heading>
        <IconButton 
          onClick={() => onAddingTagChange(true)}
          color="blue"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
        >
          <Tag className="h-4 w-4" />
         
        </IconButton>
      </Flex>

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
        <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-6">
          <input
            value={newTagName}
            onChange={(e) => onNewTagNameChange(e.target.value)}
            placeholder="Tag name"
            autoFocus
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center gap-3">
            {/* <label className="text-sm font-medium">Color:</label> */}
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-7 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Tag
            </button>
            <button 
              onClick={() => onAddingTagChange(false)}
              className="p-1.5 rounded-md text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              aria-label="Cancel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </Box>
  )
}