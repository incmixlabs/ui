import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
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

// Constants for better maintainability
const CONSTANTS = {
  MAX_URLS: 3,
  MIN_INPUT_WIDTH: 120,
  MAX_INPUT_WIDTH: 300,
  INPUT_PADDING: 16,
  MAX_URL_TITLE_LENGTH: 60,
  INITIAL_WIDTH: 120
} as const

// Memoized URL regex to avoid recreation on every render
const URL_REGEX = /(https?:\/\/[^\s]+|(?:www\.|[a-zA-Z0-9-]+\.)(?:[a-zA-Z]{2,}|co\.uk|com\.au)\/[^\s]*|(?:figma\.com|youtube\.com|github\.com|docs\.google\.com)[^\s]*)/gi

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

type TaskCreationError = {
  type: 'VALIDATION' | 'NETWORK' | 'UNKNOWN'
  message: string
}

interface UrlProcessingResult {
  cleanTitle: string
  newUrls: TaskRefUrl[]
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
  const [inputWidth, setInputWidth] = useState<number>(CONSTANTS.INITIAL_WIDTH)
  const [error, setError] = useState<TaskCreationError | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)



  // Utility function to process URLs from text - fixed stale closure issue
  const processUrlsFromText = useCallback((text: string, currentUrls: TaskRefUrl[]): UrlProcessingResult => {
    const newUrls: TaskRefUrl[] = []
    let cleanTitle = text
    
    // Extract all URLs using memoized regex
    const matches = Array.from(text.matchAll(new RegExp(URL_REGEX.source, URL_REGEX.flags)))
    
    matches.forEach((match) => {
      const url = match[0]
      
      // Always remove URL from title text (regardless of badge limit)
      cleanTitle = cleanTitle.replace(url, ' ')
      
      // Only create badge if under the limit
      const currentUrlCount = currentUrls.length + newUrls.length
      if (currentUrlCount < CONSTANTS.MAX_URLS) {
        const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
        const urlType = detectUrlType(normalizedUrl)
        const title = generateDefaultTitle(normalizedUrl, urlType, [...currentUrls, ...newUrls])
        
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
    
    return { cleanTitle, newUrls }
  }, [])

  // Process input to extract URLs from pasted text
  const processInput = useCallback((text: string) => {
    const result = processUrlsFromText(text, extractedUrls)
    
    // Update states
    setTitleInput(result.cleanTitle)
    if (result.newUrls.length > 0) {
      setExtractedUrls(prev => [...prev, ...result.newUrls])
    }
  }, [extractedUrls, processUrlsFromText])



  // Calculate input width based on content - memoized for performance
  const calculateInputWidth = useCallback((text: string): number => {
    if (!measureRef.current) return CONSTANTS.MIN_INPUT_WIDTH
    
    // Set the text to measure
    measureRef.current.textContent = text || 'Enter task title and paste URLs...'
    const textWidth = measureRef.current.offsetWidth
    
    // Add padding and set reasonable bounds using constants
    const paddedWidth = textWidth + CONSTANTS.INPUT_PADDING
    
    return Math.min(Math.max(paddedWidth, CONSTANTS.MIN_INPUT_WIDTH), CONSTANTS.MAX_INPUT_WIDTH)
  }, [])

  // Memoized URL detection to avoid recreating regex
  const containsUrls = useCallback((text: string): boolean => {
    return new RegExp(URL_REGEX.source, URL_REGEX.flags).test(text)
  }, [])

  // Handle input changes - for normal typing, just update the input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Clear any previous errors
    if (error) setError(null)
    
    // Update width based on content
    const newWidth = calculateInputWidth(value)
    setInputWidth(newWidth)
    
    // Check if the input contains URLs (only process if URLs are detected)
    if (containsUrls(value)) {
      // Contains URLs, process them
      processInput(value)
    } else {
      // Normal typing, just update the input
      setTitleInput(value)
    }
  }, [processInput, calculateInputWidth, containsUrls, error])

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





  // Save the task if the title is not empty - with improved error handling
  const handleSave = useCallback(async () => {
    const trimmedTitle = titleInput.trim()
    if (!trimmedTitle || isSubmitting) return

    // Basic validation
    if (trimmedTitle.length > 500) {
      setError({
        type: 'VALIDATION',
        message: 'Task title is too long (max 500 characters)'
      })
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await onCreateTask(trimmedTitle, extractedUrls.length > 0 ? extractedUrls : undefined)
      
      // Reset form state
      setTitleInput("")
      setExtractedUrls([])
      setInputWidth(CONSTANTS.INITIAL_WIDTH)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } catch (err) {
      console.error("Failed to create task:", err)
      setError({
        type: 'NETWORK',
        message: 'Failed to create task. Please try again.'
      })
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

  // Clear error after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

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



  // Memoized URL type icon renderer for performance
  const renderUrlTypeIcon = useMemo(() => {
    return (type: "figma" | "task" | "external") => {
      const iconProps = {
        className: "h-3.5 w-3.5",
        'aria-hidden': true // Accessibility improvement
      }
      
      switch (type) {
        case "figma":
          return (
            <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4Z" />
              <path d="M8 16h4v-4H8v4Z" />
              <path d="M8 8h4V4H8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4Z" />
              <path d="M16 8c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
              <path d="M16 16c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
            </svg>
          )
        case "task":
          return (
            <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        case "external":
        default:
          return <ExternalLink {...iconProps} />
      }
    }
  }, [])

  return (
    <Box 
      className="flex flex-shrink-0 flex-col pl-5" 
      ref={containerRef}
      role="form"
      aria-label="Add new task"
    >
      {/* Error message display */}
      {error && (
        <Box className="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400 text-sm">
          {error.message}
        </Box>
      )}
      
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
                
                {/* Title input - auto-growing width with accessibility improvements */}
                <input
                  ref={inputRef}
                  className="bg-transparent border-0 outline-none text-gray-12 dark:text-gray-12 font-medium text-base leading-6 placeholder-gray-9 focus:outline-none focus:ring-0 p-0 m-0 transition-all duration-150 ease-in-out"
                  placeholder={extractedUrls.length === 0 ? "Enter task title and paste URLs..." : ""}
                  value={titleInput}
                  onChange={handleInputChange}
                  onPaste={handlePaste}
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitting}
                  aria-label="Task title"
                  aria-describedby={extractedUrls.length > 0 ? "url-badges" : undefined}
                  aria-invalid={error?.type === 'VALIDATION'}
                  style={{
                    minHeight: '24px',
                    lineHeight: '1.5',
                    width: `${inputWidth}px`,
                    maxWidth: `${CONSTANTS.MAX_INPUT_WIDTH}px`,
                    minWidth: `${CONSTANTS.MIN_INPUT_WIDTH}px`,
                  }}
                />
                
                {/* URL badges inline to the right - with small gap and accessibility */}
                {extractedUrls.length > 0 && (
                  <div 
                    className="flex items-center gap-1 ml-2"
                    id="url-badges"
                    role="list"
                    aria-label="Reference URLs"
                  >
                    {extractedUrls.map((url) => (
                      <span
                        key={url.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-3 dark:bg-blue-4 text-blue-11 dark:text-blue-11 border border-blue-6 dark:border-blue-6 rounded text-xs font-medium flex-shrink-0"
                        role="listitem"
                      >
                        {renderUrlTypeIcon(url.type)}
                        <span 
                          className={`max-w-[${CONSTANTS.MAX_URL_TITLE_LENGTH}px] truncate`}
                          title={url.title} // Tooltip for full title
                        >
                          {url.title}
                        </span>
                        <button
                          type="button"
                          className="ml-1 hover:bg-blue-5 dark:hover:bg-blue-6 rounded p-0.5 transition-colors"
                          onClick={() => handleRemoveRefUrl(url.id)}
                          aria-label={`Remove ${url.title} URL`}
                        >
                          <X className="h-2.5 w-2.5" aria-hidden="true" />
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
              
              {/* Actions menu - helper text with status */}
              <Flex align="center" justify="center" className="flex-shrink-0 ml-4 mr-2">
                <Text className="text-gray-8" size="1">
                  {isSubmitting ? 'Saving...' : 'Enter to save'}
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
