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
  const [rawText, setRawText] = useState("")
  const [extractedUrls, setExtractedUrls] = useState<TaskRefUrl[]>([])
  const [taskTitle, setTaskTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const editableRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract plain text from contentEditable div
  const extractTextFromElement = useCallback((element: HTMLElement): string => {
    let text = ''
    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent || ''
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement
        if (el.classList.contains('url-badge')) {
          // Replace badge with original URL
          const url = el.getAttribute('data-url')
          if (url) text += url
        } else {
          text += el.textContent || ''
        }
      }
    })
    return text
  }, [])

  // Process input to extract URLs and update display
  const processInput = useCallback((text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|(?:www\.|[a-zA-Z0-9-]+\.)(?:[a-zA-Z]{2,}|co\.uk|com\.au)\/[^\s]*|(?:figma\.com|youtube\.com|github\.com|docs\.google\.com)[^\s]*)/gi
    
    const urls: TaskRefUrl[] = []
    let cleanTitle = text
    let processedText = text
    
    // Extract all URLs and replace with badges
    const matches = Array.from(text.matchAll(urlRegex))
    
    // Process in reverse order to maintain string positions
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i]
      const url = match[0]
      const startIndex = match.index!
      
      const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
      const urlType = detectUrlType(normalizedUrl)
      const title = generateDefaultTitle(normalizedUrl, urlType, urls)
      
      const urlData = {
        id: nanoid(),
        url: normalizedUrl,
        title,
        type: urlType
      }
      
      urls.unshift(urlData)
      
      // Replace URL with badge placeholder in processed text
      processedText = processedText.slice(0, startIndex) + `__BADGE_${urlData.id}__` + processedText.slice(startIndex + url.length)
      
      // Remove URL from title
      cleanTitle = cleanTitle.replace(url, ' ')
    }
    
    // Clean up title
    cleanTitle = cleanTitle.replace(/\s+/g, ' ').trim()
    
    setRawText(text)
    setTaskTitle(cleanTitle)
    setExtractedUrls(urls)
    
    // Update contentEditable display if not composing
    if (!isComposing && editableRef.current) {
      updateContentEditableDisplay(processedText, urls)
    }
  }, [isComposing])

  // Update the contentEditable display with text and badges
  const updateContentEditableDisplay = useCallback((text: string, urls: TaskRefUrl[]) => {
    if (!editableRef.current) return
    
    // Save cursor position
    const selection = window.getSelection()
    const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null
    let cursorOffset = 0
    if (range) {
      cursorOffset = range.startOffset
    }
    
    // Build HTML content
    let html = text
    
    urls.forEach(url => {
      const badgeHtml = `<span class="url-badge inline-flex items-center gap-1 px-2 py-0.5 mx-1 bg-blue-3 dark:bg-blue-4 text-blue-11 dark:text-blue-11 border border-blue-6 dark:border-blue-6 rounded text-xs font-medium" data-url="${url.url}" data-id="${url.id}" contenteditable="false">${renderUrlTypeIconSvg(url.type)}<span class="max-w-[60px] truncate">${url.title}</span><button type="button" class="badge-remove ml-1 hover:bg-blue-5 dark:hover:bg-blue-6 rounded p-0.5" onclick="window.removeBadge('${url.id}')">×</button></span>`
      html = html.replace(`__BADGE_${url.id}__`, badgeHtml)
    })
    
    editableRef.current.innerHTML = html
    
    // Restore cursor position (simplified)
    try {
      if (selection && editableRef.current.firstChild) {
        const newRange = document.createRange()
        newRange.setStart(editableRef.current.firstChild, Math.min(cursorOffset, editableRef.current.textContent?.length || 0))
        newRange.collapse(true)
        selection.removeAllRanges()
        selection.addRange(newRange)
      }
    } catch (e) {
      // Ignore cursor positioning errors
    }
  }, [])

  // Handle contentEditable input
  const handleContentEditableInput = useCallback(() => {
    if (!editableRef.current || isComposing) return
    
    const text = extractTextFromElement(editableRef.current)
    processInput(text)
  }, [extractTextFromElement, processInput, isComposing])

  // Handle composition events (for IME input)
  const handleCompositionStart = useCallback(() => {
    setIsComposing(true)
  }, [])

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false)
    if (editableRef.current) {
      const text = extractTextFromElement(editableRef.current)
      processInput(text)
    }
  }, [extractTextFromElement, processInput])

  // Remove a reference URL
  const handleRemoveRefUrl = useCallback((id: string) => {
    const urlToRemove = extractedUrls.find(url => url.id === id)
    if (!urlToRemove) return
    
    // Remove URL from raw text and reprocess
    const updatedText = rawText.replace(urlToRemove.url, ' ').replace(/\s+/g, ' ').trim()
    processInput(updatedText)
    
    // Focus back to input
    if (editableRef.current) {
      editableRef.current.focus()
    }
  }, [extractedUrls, rawText, processInput])

  // Global function to remove badges (called from onclick)
  useEffect(() => {
    (window as any).removeBadge = (id: string) => {
      handleRemoveRefUrl(id)
    }
    return () => {
      delete (window as any).removeBadge
    }
  }, [handleRemoveRefUrl])





  // Save the task if the title is not empty
  const handleSave = useCallback(async () => {
    const trimmedTitle = taskTitle.trim()
    if (!trimmedTitle || isSubmitting) return

    try {
      setIsSubmitting(true)
      await onCreateTask(trimmedTitle, extractedUrls.length > 0 ? extractedUrls : undefined)
      setRawText("")
      setTaskTitle("")
      setExtractedUrls([])
      if (editableRef.current) {
        editableRef.current.innerHTML = ""
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [taskTitle, extractedUrls, onCreateTask, isSubmitting])
  
  // Handle keyboard events for saving or canceling
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    }
  }, [handleSave, onCancel])


  
  // Focus the input when the component mounts
  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.focus()
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



  // Render URL type icon as SVG string for innerHTML
  const renderUrlTypeIconSvg = useCallback((type: "figma" | "task" | "external"): string => {
    switch (type) {
      case "figma":
        return '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4Z" /><path d="M8 16h4v-4H8v4Z" /><path d="M8 8h4V4H8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4Z" /><path d="M16 8c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" /><path d="M16 16c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" /></svg>'
      case "task":
        return '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
      case "external":
      default:
        return '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 7 10 10M7 7h10M7 7v10"/></svg>'
    }
  }, [])

  return (
    <Box className="flex flex-shrink-0 flex-col pl-5" ref={containerRef}>
      <Box
        className={`relative ${cardStyles.base} ${cardStyles.light} ${cardStyles.dark}`}
      >
        <Flex direction="column" className="w-full py-3 px-4 space-y-3">
          {/* Main input row with layout matching existing cards */}
          <Flex align="center" className="h-full w-full">
            {/* Left side: Input for title + URLs */}
            <Flex align="start" gap="3" className="flex-shrink-0 w-[35%]">
              {/* Empty space where the checkbox would be */}
              <Box className="w-5 h-5 flex items-center justify-center mt-0.5">
                <Box className="w-[18px] h-[18px] rounded-sm border border-gray-6"></Box>
              </Box>
              
              {/* ContentEditable input with inline badges */}
              <div className="w-full relative">
                <div
                  ref={editableRef}
                  className="w-full bg-transparent border-0 outline-none text-gray-12 dark:text-gray-12 font-medium text-base leading-6 focus:outline-none focus:ring-0 p-0 m-0 min-h-[24px]"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleContentEditableInput}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  data-placeholder="Enter task title and paste URLs..."
                  style={{
                    minHeight: '24px',
                    lineHeight: '1.5',
                    wordWrap: 'break-word',
                  }}
                />
                
                {/* Placeholder when empty */}
                {!rawText && (
                  <div className="absolute inset-0 text-gray-9 pointer-events-none select-none" style={{ lineHeight: '1.5' }}>
                    Enter task title and paste URLs...
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
          {taskTitle && extractedUrls.length > 0 && (
            <Flex align="start" gap="3" className="w-full">
              {/* Spacer to align with input */}
              <Box className="w-8"></Box>
              
              <Box className="flex-1">
                <Text size="1" className="text-gray-8 italic">
                  Title: "{taskTitle}" + {extractedUrls.length} reference{extractedUrls.length !== 1 ? 's' : ''}
                </Text>
              </Box>
            </Flex>
          )}
        </Flex>
        

      </Box>
    </Box>
  )
}
