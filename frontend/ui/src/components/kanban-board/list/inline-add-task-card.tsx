import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react"
import {
  Box,
  Flex,
  Text,
  Badge,
  Input,
  Button,
  TextArea
} from "@incmix/ui"
import { getPriorityStyles, getPriorityName } from "../utils/priority-utils"
import { detectUrlType, generateDefaultTitle } from "@utils/url-helpers"
import { nanoid } from "nanoid"
import { X, ExternalLink } from "lucide-react"

// Match the exact card styles from task-card component for perfect visual consistency
const cardStyles = {
  base: "rounded-md transition-all duration-150",
  light: "bg-white border-b border-gray-4", 
  dark: "dark:bg-gray-1 dark:border-b dark:border-gray-6",
  hover: "hover:bg-gray-2 dark:hover:bg-gray-2",
  // Removed focus style to blend seamlessly with other cards
}

interface TaskRefUrl {
  id: string
  url: string
  title?: string
  type: "figma" | "task" | "external"
  taskId?: string
}

interface InlineAddTaskCardProps {
  onCreateTask: (title: string, refUrls?: TaskRefUrl[]) => Promise<void>
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
  const [titleInput, setTitleInput] = useState("")
  const [extractedUrls, setExtractedUrls] = useState<TaskRefUrl[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputWidth, setInputWidth] = useState(120) // Initial width
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)



  // Process input to extract URLs from pasted text (max 3 total)
  const processInput = useCallback((text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|(?:www\.|[a-zA-Z0-9-]+\.)(?:[a-zA-Z]{2,}|co\.uk|com\.au)\/[^\s]*|(?:figma\.com|youtube\.com|github\.com|docs\.google\.com)[^\s]*)/gi
    
    const newUrls: TaskRefUrl[] = []
    let cleanTitle = text
    const maxLinks = 3
    
    // Extract all URLs
    const matches = Array.from(text.matchAll(urlRegex))
    
    matches.forEach((match, index) => {
      const url = match[0]
      
      // Always remove URL from title text (regardless of badge limit)
      cleanTitle = cleanTitle.replace(url, ' ')
      
      // Only create badge if under the limit
      const currentUrlCount = extractedUrls.length + newUrls.length
      if (currentUrlCount < maxLinks) {
        const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
        const urlType = detectUrlType(normalizedUrl)
        const title = generateDefaultTitle(normalizedUrl, urlType, [...extractedUrls, ...newUrls])
        
        newUrls.push({
          id: nanoid(),
          url: normalizedUrl,
          title,
          type: urlType
        })
      }
    })
    
    // Clean up title
    cleanTitle = cleanTitle.replace(/\s+/g, ' ').trim()
    
    // Update states
    setTitleInput(cleanTitle)
    if (newUrls.length > 0) {
      setExtractedUrls(prev => [...prev, ...newUrls])
    }
  }, [extractedUrls])



  // Calculate input width based on content
  const calculateInputWidth = useCallback((text: string) => {
    if (!measureRef.current) return 120
    
    // Set the text to measure
    measureRef.current.textContent = text || 'Enter task title and paste URLs...'
    const textWidth = measureRef.current.offsetWidth
    
    // Add some padding and set reasonable min/max bounds
    const minWidth = 120 // Minimum width for placeholder
    const maxWidth = 300 // Maximum width before it stops growing
    const paddedWidth = textWidth + 16 // Add padding
    
    return Math.min(Math.max(paddedWidth, minWidth), maxWidth)
  }, [])

  // Handle input changes - for normal typing, just update the input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Update width based on content
    const newWidth = calculateInputWidth(value)
    setInputWidth(newWidth)
    
    // Check if the input contains URLs (only process if URLs are detected)
    const urlRegex = /(https?:\/\/[^\s]+|(?:www\.|[a-zA-Z0-9-]+\.)(?:[a-zA-Z]{2,}|co\.uk|com\.au)\/[^\s]*|(?:figma\.com|youtube\.com|github\.com|docs\.google\.com)[^\s]*)/gi
    
    if (urlRegex.test(value)) {
      // Contains URLs, process them
      processInput(value)
    } else {
      // Normal typing, just update the input
      setTitleInput(value)
    }
  }, [processInput, calculateInputWidth])

  // Handle paste events specifically
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text')
    if (pastedText) {
      // Process the pasted text for URLs
      processInput(titleInput + pastedText)
      e.preventDefault() // We'll handle the paste manually
    }
  }, [titleInput, processInput])

  // Remove a reference URL
  const handleRemoveRefUrl = useCallback((id: string) => {
    setExtractedUrls(prev => prev.filter(url => url.id !== id))
    
    // Focus back to input
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])





  // Save the task if the title is not empty
  const handleSave = useCallback(async () => {
    const trimmedTitle = titleInput.trim()
    if (!trimmedTitle || isSubmitting) return

    try {
      setIsSubmitting(true)
      await onCreateTask(trimmedTitle, extractedUrls.length > 0 ? extractedUrls : undefined)
      setTitleInput("")
      setExtractedUrls([])
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [titleInput, extractedUrls, onCreateTask, isSubmitting])
  
  // Handle keyboard events for saving or canceling
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    }
  }, [handleSave, onCancel])


  
  // Focus the input and set initial width when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    // Set initial width based on placeholder
    const initialWidth = calculateInputWidth('')
    setInputWidth(initialWidth)
  }, [calculateInputWidth])

  // Update width when titleInput changes (for programmatic updates)
  useEffect(() => {
    const newWidth = calculateInputWidth(titleInput)
    setInputWidth(newWidth)
  }, [titleInput, calculateInputWidth])

  // Handle click outside to either save the task or cancel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // If there's text, try to save; otherwise cancel
        const trimmedTitle = titleInput.trim()
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
  }, [handleSave, titleInput, isSubmitting, onCancel])



  // Render URL type icon
  const renderUrlTypeIcon = (type: "figma" | "task" | "external") => {
    switch (type) {
      case "figma":
        return (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4Z" />
            <path d="M8 16h4v-4H8v4Z" />
            <path d="M8 8h4V4H8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4Z" />
            <path d="M16 8c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
            <path d="M16 16c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
          </svg>
        )
      case "task":
        return (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case "external":
      default:
        return <ExternalLink className="h-3.5 w-3.5" />
    }
  }

  return (
    <Box className="flex flex-shrink-0 flex-col pl-5" ref={containerRef}>
      <Box
        className={`relative ${cardStyles.base} ${cardStyles.light} ${cardStyles.dark}`}
      >
        <Flex direction="column" className="w-full py-3 px-4 space-y-3">
          {/* Main input row with layout matching existing cards */}
          <Flex align="center" className="h-full w-full">
            {/* Left side: Hybrid input + badges */}
            <Flex align="center" gap="3" className="flex-shrink-0 min-w-[35%] max-w-[70%]">
              {/* Empty space where the checkbox would be */}
              <Box className="w-5 h-5 flex items-center justify-center">
                <Box className="w-[18px] h-[18px] rounded-sm border border-gray-6"></Box>
              </Box>
              
              {/* Hybrid input container */}
              <div className="flex items-center flex-1 gap-1 min-h-[24px]">
                {/* Hidden span for text width measurement */}
                <span
                  ref={measureRef}
                  className="absolute invisible whitespace-nowrap text-gray-12 dark:text-gray-12 font-medium text-base leading-6"
                  style={{ top: -9999, left: -9999 }}
                  aria-hidden="true"
                />
                
                {/* Title input - auto-growing width */}
                <input
                  ref={inputRef}
                  className="bg-transparent border-0 outline-none text-gray-12 dark:text-gray-12 font-medium text-base leading-6 placeholder-gray-9 focus:outline-none focus:ring-0 p-0 m-0 transition-all duration-150 ease-in-out"
                  placeholder={extractedUrls.length === 0 ? "Enter task title and paste URLs..." : ""}
                  value={titleInput}
                  onChange={handleInputChange}
                  onPaste={handlePaste}
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitting}
                  style={{
                    minHeight: '24px',
                    lineHeight: '1.5',
                    width: `${inputWidth}px`,
                    maxWidth: '300px',
                    minWidth: '120px',
                  }}
                />
                
                {/* URL badges inline to the right - with small gap */}
                {extractedUrls.length > 0 && (
                  <div className="flex items-center gap-1 ml-2">
                    {extractedUrls.map((url) => (
                      <span
                        key={url.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-3 dark:bg-blue-4 text-blue-11 dark:text-blue-11 border border-blue-6 dark:border-blue-6 rounded text-xs font-medium flex-shrink-0"
                      >
                        {renderUrlTypeIcon(url.type)}
                        <span className="max-w-[60px] truncate">{url.title}</span>
                        <button
                          type="button"
                          className="ml-1 hover:bg-blue-5 dark:hover:bg-blue-6 rounded p-0.5 transition-colors"
                          onClick={() => handleRemoveRefUrl(url.id)}
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Flex>

            {/* Right side content with placeholder elements to match the layout */}
            <Flex align="center" gap="3" className="flex-1 justify-end pr-2">
              {/* Priority label indicator - fixed width */}
              <Flex align="center" justify="center" className="flex-shrink-0 min-w-[5rem] w-20">
                <Badge
                  variant="soft"
                  size="1"
                  className={getPriorityStyles(defaultPriority, priorityLabels)}
                >
                  {getPriorityName(defaultPriority, priorityLabels)}
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
                  Enter to save
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* Preview extracted task title when there are URLs */}
          {titleInput && extractedUrls.length > 0 && (
            <Flex align="start" gap="3" className="w-full">
              {/* Spacer to align with input */}
              <Box className="w-8"></Box>
              
              <Box className="flex-1">
                <Text size="1" className="text-gray-8 italic">
                  Title: "{titleInput}" + {extractedUrls.length} reference{extractedUrls.length !== 1 ? 's' : ''}
                </Text>
              </Box>
            </Flex>
          )}
        </Flex>
        

      </Box>
    </Box>
  )
}
