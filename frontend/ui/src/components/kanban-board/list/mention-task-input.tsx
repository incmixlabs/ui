// components/list/mention-task-input.tsx
import React, { useState, useRef, useEffect, useCallback } from "react"
import { Box, Flex, Button, Text, Avatar, Checkbox } from "@incmix/ui"
import { Plus, X } from "lucide-react"
import { cn } from "@utils"

// Hard-coded members data (you can replace this with dynamic data later)
const members = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    position: "UI/UX Designer",
    color: "blue",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe", 
    label: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    position: "Project Manager",
    color: "amber",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=32&h=32&fit=crop&crop=face",
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "Michael Brown",
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    position: "Product Designer", 
    color: "orange",
  },
]

interface Member {
  id: string
  value: string
  name: string
  label: string
  avatar: string
  position: string
  color: string
}

interface MentionTaskInputProps {
  onCreateTask: (taskName: string, assignedMembers: Member[]) => Promise<void>
  onCancel: () => void
  placeholder?: string
  disabled?: boolean
}

export function MentionTaskInput({
  onCreateTask,
  onCancel,
  placeholder = "Enter task title...",
  disabled = false
}: MentionTaskInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showMentions, setShowMentions] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [mentionQuery, setMentionQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const memberRefs = useRef<(HTMLDivElement | null)[]>([])

  // Filter members based on search query
  useEffect(() => {
    if (mentionQuery) {
      const filtered = members.filter(member =>
        member.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        member.position.toLowerCase().includes(mentionQuery.toLowerCase())
      )
      setFilteredMembers(filtered)
    } else {
      setFilteredMembers(members)
    }
    setHighlightedIndex(0)
  }, [mentionQuery])

  // Handle input change with @ detection
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Check if user just typed @
    if (value.endsWith('@')) {
      setShowMentions(true)
      setMentionQuery("")
      setSelectedMembers([])
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showMentions) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev < filteredMembers.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredMembers.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (filteredMembers[highlightedIndex]) {
            toggleMemberSelection(filteredMembers[highlightedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          saveMentionsAndClose()
          break
        case 'Backspace':
          // If user backspaces and removes the @, close the popup
          if (inputValue.endsWith('@')) {
            setShowMentions(false)
            setSelectedMembers([])
          }
          break
      }
    } else {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          handleSubmit()
          break
        case 'Escape':
          e.preventDefault()
          onCancel()
          break
      }
    }
  }, [showMentions, highlightedIndex, filteredMembers, inputValue, onCancel])

  // Toggle member selection (checkbox behavior)
  const toggleMemberSelection = useCallback((member: Member) => {
    setSelectedMembers(prev => {
      const isSelected = prev.find(m => m.id === member.id)
      if (isSelected) {
        return prev.filter(m => m.id !== member.id)
      } else {
        return [...prev, member]
      }
    })
  }, [])

  // Save mentions and close popup
  const saveMentionsAndClose = useCallback(() => {
    if (selectedMembers.length > 0) {
      // Remove the trailing @ and add selected members
      let baseText = inputValue.endsWith('@') ? inputValue.slice(0, -1) : inputValue
      
      // Add space before mentions if baseText doesn't end with space
      if (baseText && !baseText.endsWith(' ')) {
        baseText += ' '
      }
      
      // Add all selected members
      const mentionText = selectedMembers.map(member => `@${member.name}`).join(' ')
      const newValue = baseText + mentionText
      
      setInputValue(newValue)
    } else {
      // If no members selected, just remove the trailing @
      if (inputValue.endsWith('@')) {
        setInputValue(inputValue.slice(0, -1))
      }
    }
    
    setShowMentions(false)
    setSelectedMembers([])
    setMentionQuery("")
    
    // Focus back to input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }, [inputValue, selectedMembers])

  // Scroll highlighted item into view
  useEffect(() => {
    if (showMentions && memberRefs.current[highlightedIndex]) {
      memberRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [highlightedIndex, showMentions])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        saveMentionsAndClose()
      }
    }

    if (showMentions) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMentions, saveMentionsAndClose])

  // Handle search in popup
  const handleMentionSearch = useCallback((query: string) => {
    setMentionQuery(query)
  }, [])

  // Extract clean task name and mentioned members
  const getTaskData = useCallback(() => {
    let cleanTaskName = inputValue
    const mentionedMembers: Member[] = []
    
    // Remove all @mentions from the task name and collect mentioned members
    const mentionPattern = /@([A-Za-z\s]+?)(?=\s@|\s*$)/g
    let match
    
    while ((match = mentionPattern.exec(inputValue)) !== null) {
      const mentionText = match[0]
      const memberName = match[1].trim()
      
      // Find the member by name
      const member = members.find(m => 
        m.name.toLowerCase() === memberName.toLowerCase()
      )
      
      if (member && !mentionedMembers.find(m => m.id === member.id)) {
        mentionedMembers.push(member)
      }
      
      // Remove the mention from task name
      cleanTaskName = cleanTaskName.replace(mentionText, '').trim()
    }
    
    // Clean up extra spaces
    cleanTaskName = cleanTaskName.replace(/\s+/g, ' ').trim()
    
    return { cleanTaskName, mentionedMembers }
  }, [inputValue])

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!inputValue.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const { cleanTaskName, mentionedMembers } = getTaskData()
      
      if (!cleanTaskName) {
        // If only mentions, don't create task
        setIsSubmitting(false)
        return
      }
      
      await onCreateTask(cleanTaskName, mentionedMembers)
      
      // Reset form
      setInputValue("")
      setSelectedMembers([])
      setShowMentions(false)
      setMentionQuery("")
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [inputValue, getTaskData, onCreateTask, isSubmitting])

  return (
    <Box className="relative">
      {/* Task Input */}
      <Box className="space-y-3 p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
        <Box className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
            autoFocus
          />
        </Box>

        {/* Action Buttons */}
        <Flex gap="2">
          <Button 
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isSubmitting}
            className="flex-1"
            size="2"
          >
            <Plus size={16} />
            {isSubmitting ? "Adding..." : "Add Task"}
          </Button>
          <Button 
            onClick={onCancel}
            variant="soft" 
            disabled={isSubmitting}
            size="2"
          >
            Cancel
          </Button>
        </Flex>
      </Box>

      {/* High Z-Index Mentions Dropdown */}
      {showMentions && (
        <Box
          ref={dropdownRef}
          className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[300px] max-w-[350px]"
          style={{
            zIndex: 9999,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '400px',
            overflow: 'hidden'
          }}
        >
          {/* Header with search */}
          <Box className="p-3 border-b border-gray-100 dark:border-gray-700">
            <Text size="2" className="text-gray-600 dark:text-gray-400 font-medium mb-2">
              Select team members
            </Text>
            <input
              type="text"
              placeholder="Search members..."
              value={mentionQuery}
              onChange={(e) => handleMentionSearch(e.target.value)}
              className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
            />
          </Box>
          
          {/* Selected count */}
          {selectedMembers.length > 0 && (
            <Box className="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 border-b border-gray-100 dark:border-gray-700">
              <Text size="1" className="text-blue-700 dark:text-blue-300 font-medium">
                {selectedMembers.length} member{selectedMembers.length > 1 ? 's' : ''} selected
              </Text>
            </Box>
          )}

          {/* Members List */}
          <Box className="py-2 max-h-64 overflow-y-auto">
            {filteredMembers.length === 0 ? (
              <Box className="px-3 py-4 text-center">
                <Text size="2" className="text-gray-500">
                  No members found
                </Text>
              </Box>
            ) : (
              filteredMembers.map((member, index) => {
                const isHighlighted = index === highlightedIndex
                const isSelected = selectedMembers.find(m => m.id === member.id)
                
                return (
                  <div
                    key={member.id}
                    ref={(el) => { memberRefs.current[index] = el }}
                    onClick={() => toggleMemberSelection(member)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors",
                      isHighlighted 
                        ? "bg-blue-50 dark:bg-blue-900/30" 
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    )}
                  >
                    <Checkbox 
                      checked={!!isSelected}
                      onChange={() => toggleMemberSelection(member)}
                      className="flex-shrink-0"
                    />
                    <Avatar 
                      src={member.avatar} 
                      name={member.name}
                      className="w-8 h-8 flex-shrink-0"
                    />
                    <Box className="flex-1 min-w-0">
                      <Text size="2" className="font-medium text-gray-900 dark:text-gray-100">
                        {member.name}
                      </Text>
                      <Text size="1" className="text-gray-500 dark:text-gray-400 truncate">
                        {member.position}
                      </Text>
                    </Box>
                  </div>
                )
              })
            )}
          </Box>

          {/* Footer */}
          <Box className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <Flex justify="between" align="center">
              <Text size="1" className="text-gray-500">
                Press Esc or click outside to save
              </Text>
              <Button 
                size="1" 
                onClick={saveMentionsAndClose}
                disabled={selectedMembers.length === 0}
              >
                Add {selectedMembers.length > 0 ? selectedMembers.length : ''} member{selectedMembers.length !== 1 ? 's' : ''}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* Backdrop for popup */}
      {showMentions && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          style={{ zIndex: 9998 }}
          onClick={saveMentionsAndClose}
        />
      )}
    </Box>
  )
}