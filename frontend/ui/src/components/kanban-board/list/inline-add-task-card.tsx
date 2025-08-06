import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react"
import {
  Box,
  Flex,
  Text,
  Badge,
  Input
} from "@incmix/ui"

// Match the exact card styles from task-card component for perfect visual consistency
const cardStyles = {
  base: "rounded-md transition-all duration-150",
  light: "bg-white border-b border-gray-4", 
  dark: "dark:bg-gray-1 dark:border-b dark:border-gray-6",
  hover: "hover:bg-gray-2 dark:hover:bg-gray-2",
  // Removed focus style to blend seamlessly with other cards
}

interface InlineAddTaskCardProps {
  onCreateTask: (title: string) => Promise<void>
  onCancel: () => void
  defaultPriority?: string
  priorityLabels?: { id: string; name: string; color: string; type: string }[]
}

/**
 * InlineAddTaskCard - A component that visually matches existing task cards
 * but is optimized for task creation with just the title field editable.
 * Saves on Enter or clicking outside, removes on Escape.
 */
export const InlineAddTaskCard: React.FC<InlineAddTaskCardProps> = ({
  onCreateTask,
  onCancel,
  defaultPriority = "medium",
  priorityLabels = []
}) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Save the task if the title is not empty
  const handleSave = useCallback(async () => {
    const trimmedTitle = taskTitle.trim()
    if (!trimmedTitle || isSubmitting) return

    try {
      setIsSubmitting(true)
      await onCreateTask(trimmedTitle)
      setTaskTitle("")
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [taskTitle, onCreateTask, isSubmitting])
  
  // Handle keyboard events for saving or canceling
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    }
  }, [handleSave, onCancel])
  
  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle click outside to either save the task or cancel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // If there's text, try to save; otherwise cancel
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle && !isSubmitting) {
          handleSave()
        } else {
          onCancel() // Cancel if empty
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleSave, taskTitle, isSubmitting, onCancel])

  // Helper function for priority label styling
  const getPriorityStyles = (priorityId: string): string => {
    // If priorityLabels exists, try to get color from it
    if (priorityLabels && priorityLabels.length > 0) {
      const priority = priorityLabels.find(p => p.id === priorityId)
      if (priority && priority.color) {
        // Convert the color to a Radix UI token class based on color value
        switch (priority.color.toLowerCase()) {
          case "red":
            return "bg-red-3 text-red-11 dark:bg-red-3 dark:text-red-11"
          case "orange":
            return "bg-orange-3 text-orange-11 dark:bg-orange-3 dark:text-orange-11"
          case "yellow":
            return "bg-yellow-3 text-yellow-11 dark:bg-yellow-3 dark:text-yellow-11"
          case "green":
            return "bg-green-3 text-green-11 dark:bg-green-3 dark:text-green-11"
          case "blue":
            return "bg-blue-3 text-blue-11 dark:bg-blue-3 dark:text-blue-11"
          case "purple":
            return "bg-purple-3 text-purple-11 dark:bg-purple-3 dark:text-purple-11"
          default:
            return "bg-gray-3 text-gray-11 dark:bg-gray-3 dark:text-gray-11"
        }
      }
    }
    
    // Fallback to using priorityId directly
    switch (priorityId.toLowerCase()) {
      case "urgent":
      case "high":
        return "bg-red-3 text-red-11 dark:bg-red-3 dark:text-red-11"
      case "medium":
        return "bg-orange-3 text-orange-11 dark:bg-orange-3 dark:text-orange-11"
      case "low":
        return "bg-blue-3 text-blue-11 dark:bg-blue-3 dark:text-blue-11"
      default:
        return "bg-gray-3 text-gray-11 dark:bg-gray-3 dark:text-gray-11"
    }
  }

  // Helper function to get priority name from ID
  const getPriorityName = (priorityId: string): string => {
    // First try to get from priorityLabels if available
    if (priorityLabels && priorityLabels.length > 0) {
      const priority = priorityLabels.find(p => p.id === priorityId)
      if (priority?.name) return priority.name
    }
    
    // Fallback to formatting the priorityId directly
    if (!priorityId) return ""
    
    // Capitalize first letter and format the rest
    return priorityId.charAt(0).toUpperCase() + priorityId.slice(1).toLowerCase()
  }

  return (
    <Box className="flex flex-shrink-0 flex-col pl-5" ref={containerRef}>
      <Box
        className={`relative ${cardStyles.base} ${cardStyles.light} ${cardStyles.dark}`}
      >
        <Flex align="center" className="h-full w-full py-3 px-4">
          {/* Left side: Title input with styling to match task card title */}
          <Flex align="center" gap="3" className="flex-shrink-0 w-[35%]">
            {/* Empty space where the checkbox would be */}
            <Box className="w-5 h-5 flex items-center justify-center">
              <Box className="w-[18px] h-[18px] rounded-sm border border-gray-6"></Box>
            </Box>
            
            {/* Task title input */}
            <input
              ref={inputRef}
              className="border-0 bg-transparent p-0 text-gray-12 dark:text-gray-12 font-medium w-full outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 text-base"
              placeholder="Enter task title..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
            />
          </Flex>

          {/* Right side content with placeholder elements to match the layout */}
          <Flex align="center" gap="3" className="flex-1 justify-end pr-2">
            {/* Priority label indicator - fixed width */}
            <Flex align="center" justify="center" className="flex-shrink-0 min-w-[5rem] w-20">
              <Badge
                variant="soft"
                size="1"
                className={getPriorityStyles(defaultPriority)}
              >
                {getPriorityName(defaultPriority)}
              </Badge>
            </Flex>
            
            {/* Due date - empty placeholder */}
            <Flex align="center" justify="center" className="flex-shrink-0 min-w-[6rem] w-24">
              <span></span>
            </Flex>
            
            {/* Assignees - empty placeholder */}
            <Flex align="center" justify="center" className="flex-shrink-0 min-w-[6rem] w-24">
              <span></span>
            </Flex>
            
            {/* Actions menu - helper text */}
            <Flex align="center" justify="center" className="flex-shrink-0 ml-4 mr-2">
              <Text className="text-gray-8" size="1">
                Press Enter to save
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
