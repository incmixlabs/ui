import { Box, Button, Flex, Heading, IconButton } from "@/base"
import ColorPicker, { type ColorSelectType } from "@/elements/color-picker"
import { Plus, Tag, X } from "lucide-react"
// task-card-components/task-tags-section.tsx
import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { Tag as TagType, TaskTagsSectionProps } from "./utils/types"

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
  const [_isCreatingNewTag, _setIsCreatingNewTag] = useState(false)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [colorPickerRef])

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
        <Heading size={"3"} className="text-gray-12">
          LABELS
        </Heading>
        <IconButton
          onClick={() => onAddingTagChange(true)}
          color="blue"
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-sm transition-colors"
        >
          <Tag className="h-4 w-4" />
        </IconButton>
      </Flex>

      <div className="flex flex-wrap gap-2">
        {currentTask.labelsTags && currentTask.labelsTags.length > 0 ? (
          currentTask.labelsTags.map((tag: TagType) => (
            <span
              key={tag.value}
              className="group inline-flex items-center gap-2 rounded-md px-3 py-1 font-medium text-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
                borderColor: `${tag.color}40`,
                border: "1px solid",
              }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              {tag.label}
              <X
                className="h-3 w-3 cursor-pointer opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveTag(tag.value)
                }}
              />
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No tags added yet</p>
        )}
      </div>

      {isAddingTag && (
        <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-6">
          <input
            value={newTagName}
            onChange={(e) => onNewTagNameChange(e.target.value)}
            placeholder="Tag name"
            onKeyDown={handleKeyDown}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-5 dark:text-white"
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
                  <div
                    className="absolute z-50 mt-1"
                    style={{ minWidth: "240px" }}
                  >
                    <ColorPicker
                      colorType="base"
                      onColorSelect={(color: ColorSelectType) => {
                        onNewTagColorChange(color.hex)
                        setIsColorPickerOpen(false)
                      }}
                      activeColor={newTagColor}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1" />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!newTagName.trim()}
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 font-medium text-blue-600 text-sm transition-colors hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-7 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Plus className="h-4 w-4" />
              Add Tag
            </button>
            <button
              type="button"
              onClick={() => onAddingTagChange(false)}
              className="rounded-md p-1.5 text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
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
