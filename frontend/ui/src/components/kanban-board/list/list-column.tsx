// components/list/list-column.tsx - Updated with SimpleTaskInput and TaskActionsMenu
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {     ModalPresets } from "../shared/confirmation-modal"
import { Ellipsis, Plus, ChevronDown, ChevronRight, Trash2, Edit3, Check, X } from "lucide-react"
import { memo, useEffect, useRef, useState, useCallback, useMemo } from "react"
import invariant from "tiny-invariant"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import { Box, Flex, Heading, IconButton, Button, Text, Badge, TextField, TextArea, DropdownMenu, Checkbox } from "@incmix/ui"
import { isSafari } from "@utils/browser"

import {
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
  type KanbanTask,
  type ListColumn,
} from "../types"
import {
  blockBoardPanningAttr } from "../data-attributes"
import { TaskDataSchema } from "@incmix/utils/schema"
import ColorPicker, { ColorSelectType } from "@components/color-picker"
import { ListTaskCard, ExpandedTasksProvider } from "./task-card"
import { SimpleTaskInput } from "./mention-task-input"
import { isShallowEqual } from "@incmix/utils/objects"

/**
 * Helper function to create a semi-transparent version of a color
 * Handles both CSS variables and hex colors
 */
const createTransparentColor = (color: string | undefined, opacity: number = 0.1): string => {
  // Handle empty values
  if (!color) return 'var(--gray-3)' // Default fallback
  
  // If color is a CSS variable like "var(--red-9)"
  if (color.startsWith('var(')) {
    // Extract the CSS variable name
    const varName = color.match(/var\(([^)]+)\)/)?.[1]
    
    if (varName) {
      // Create a transparent version by adding the appropriate opacity variable
      // This maintains the CSS variable while making it transparent
      return `var(${varName.replace(/-\d+$/, '-3')})`
    }
    return 'var(--gray-3)' // Fallback
  }
  
  // Handle hex colors - convert to rgba with opacity
  try {
    if (color.startsWith('#')) {
      // Remove # if present
      const cleanHex = color.replace(/^#/, '')
      
      // Handle both 3-digit and 6-digit hex
      const normalized = cleanHex.length === 3
        ? cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2]
        : cleanHex
      
      // Parse the hex values
      const bigint = parseInt(normalized, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      
      // Return as rgba
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
  } catch (error) {
    console.error('Error processing color:', error)
  }
  
  // For any other format or on error, return the original with opacity
  return `${color}${Math.round(opacity * 100)}` // This handles formats like "#FF000015" where 15 is ~10% opacity
}

type TColumnState =
  | {
      type: "is-card-over"
      isOverChildCard: boolean
      dragging: DOMRect
    }
  | {
      type: "is-column-over"
    }
  | {
      type: "idle"
    }
  | {
      type: "is-dragging"
    }

const stateStyles: { [Key in TColumnState["type"]]: string } = {
  idle: "",
  "is-card-over": "outline outline-1 outline-blue-8 dark:outline-blue-7 outline-offset-1 shadow-md",
  "is-dragging": "opacity-70 shadow-md",
  "is-column-over": "bg-blue-3 dark:bg-blue-4",
}

const idle = { type: "idle" } satisfies TColumnState



interface ListColumnProps {
  column: ListColumn
  columns: ListColumn[] // All available columns for the menu
  onCreateTask: (columnId: string, taskData: Partial<TaskDataSchema>) => Promise<void>
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onUpdateColumn: (columnId: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  onDeleteColumn: (columnId: string) => Promise<void>
  isDragging?: boolean
  selectedTaskIds?: {[key: string]: boolean} // Simplified to just a map of IDs to boolean
  onTaskSelect?: (taskId: string, selected: boolean, taskName: string) => void
  onSelectAll?: (columnId: string, selected: boolean) => void
}

export const CardList = memo(function CardList({
  column,
  columns,
  onUpdateTask,
  onDeleteTask,
  selectedTaskIds,
  onTaskSelect
}: {
  column: ListColumn
  columns: ListColumn[]
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  selectedTaskIds?: {[key: string]: boolean}
  onTaskSelect?: (taskId: string, selected: boolean, taskName: string) => void
}) {
  // Organize tasks hierarchically to ensure subtasks are always rendered below their parent
  // while maintaining the proper drag-and-drop behavior
  const organizedTasks = useMemo(() => {
    // Create maps for efficient lookups and relationships
    const parentToSubtasks: Record<string, KanbanTask[]> = {}
    const isProcessed = new Set<string>()
    const result: KanbanTask[] = []
    
    // First, identify all parent-child relationships and ensure subtasks are sorted
    column.tasks.forEach(task => {
      if (task.isSubtask && task.parentTaskId) {
        if (!parentToSubtasks[task.parentTaskId]) {
          parentToSubtasks[task.parentTaskId] = []
        }
        parentToSubtasks[task.parentTaskId].push(task)
      }
    })
    
    // Sort subtasks by their position in the original task array
    // This ensures consistent ordering of subtasks
    Object.keys(parentToSubtasks).forEach(parentId => {
      const subtasksForParent = parentToSubtasks[parentId]
      subtasksForParent.sort((a, b) => {
        const aIndex = column.tasks.findIndex(t => t.id === a.id)
        const bIndex = column.tasks.findIndex(t => t.id === b.id)
        return aIndex - bIndex
      })
    })
    
    // Process tasks in their original order
    // This preserves the task order while ensuring subtasks follow their parent
    for (let i = 0; i < column.tasks.length; i++) {
      const task = column.tasks[i]
      const taskId = task.id
      
      // Skip if already processed or if it's a subtask (we'll handle it with its parent)
      if (!taskId || isProcessed.has(taskId) || task.isSubtask) {
        continue
      }
      
      // Add the parent task
      result.push(task)
      isProcessed.add(taskId)
      
      // Then add all of its subtasks
      const subtasks = parentToSubtasks[taskId] || []
      for (const subtask of subtasks) {
        if (subtask.id) {
          result.push(subtask)
          isProcessed.add(subtask.id)
        }
      }
    }
    
    // Handle any remaining tasks that weren't processed
    // This ensures we don't lose any tasks in edge cases
    column.tasks.forEach(task => {
      if (task.id && !isProcessed.has(task.id)) {
        result.push(task)
      }
    })
    
    return result
  }, [column.tasks])
  
  return (
    <ExpandedTasksProvider>
      {organizedTasks.map((task: KanbanTask) => (
        <ListTaskCard
          key={task.id}
          card={task}
          statusId={column.id}
          columns={columns}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onTaskSelect={onTaskSelect ? (taskId, selected) => onTaskSelect(taskId, selected, task.name || '') : undefined}
          isSelected={task.id ? !!selectedTaskIds?.[task.id] : false}
        />
      ))}
    </ExpandedTasksProvider>
  )
})

export function ListColumn({
  column,
  columns,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onUpdateColumn,
  onDeleteColumn,
  isDragging = false,
  selectedTaskIds = {},
  onTaskSelect,
  onSelectAll
}: ListColumnProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TColumnState>(idle)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isCreatingTask, setIsCreatingTask] = useState(false)

  // Calculate column statistics with proper typing
  const completedTasks = column.tasks.filter((task: KanbanTask) => task.completed).length
  const totalTasks = column.tasks.length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Calculate selection state
  const selectedTasksInColumn = column.tasks.filter(task => task.id ? !!selectedTaskIds[task.id] : false).length
  const allTasksSelected = selectedTasksInColumn === totalTasks && totalTasks > 0
  const someTasksSelected = selectedTasksInColumn > 0 && selectedTasksInColumn < totalTasks

  // Handle select all for this column
  const handleSelectAllChange = useCallback((checked: boolean | string) => {
    if (onSelectAll) {
      onSelectAll(column.id, typeof checked === 'boolean' ? checked : checked === 'indeterminate' ? false : true)
    }
  }, [column.id, onSelectAll])

  // State handlers for drag and drop operations
  const setIsCardOver = useCallback(({
    data,
    location,
  }: {
    data: any
    location: any
  }) => {
    const innerMost = location.current.dropTargets[0]
    const isOverChildCard = Boolean(
      innerMost && isCardDropTargetData(innerMost.data)
    )

    const proposed: TColumnState = {
      type: "is-card-over",
      dragging: data.rect,
      isOverChildCard,
    }

    setState((current) => {
      if (isShallowEqual(proposed, current)) {
        return current
      }
      return proposed
    })
  }, [])

  const columnData = getColumnData({ column })

  useEffect(() => {
    const outer = outerFullHeightRef.current
    const scrollable = scrollableRef.current
    const header = headerRef.current

    if (!outer || !scrollable || !header) {
      return undefined
    }

    // Track if a TaskCard is being dragged over the list column
    return combine(
      draggable({
        element: header,
        getInitialData: () => columnData,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const offset = preserveOffsetOnSource({
            element: header,
            input: location.current?.input,
          })

          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: offset,
            render({ container }) {
              const rect = header.getBoundingClientRect()
              const preview = header.cloneNode(true)
              invariant(preview instanceof HTMLElement)
              preview.style.width = `${rect.width}px`
              preview.style.height = `${rect.height}px`

              if (!isSafari()) {
                preview.style.transform = "rotate(2deg)"
              }

              container.appendChild(preview)
            },
          })
        },
        onDragStart() {
          setState({ type: "is-dragging" })
        },
        onDrop() {
          setState(idle)
        },
      }),
      dropTargetForElements({
        element: outer,
        getData: () => columnData,
        canDrop({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
          }
        },
        onDragEnter({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
          if (
            isColumnData(source.data) &&
            source.data.column.id !== column.id
          ) {
            setState({ type: "is-column-over" })
          }
        },
        onDropTargetChange({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
        },
        onDragLeave({ source }) {
          if (
            isColumnData(source.data) &&
            source.data.column.id === column.id
          ) {
            return
          }
          setState(idle)
        },
        onDrop() {
          setState(idle)
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          return isDraggingACard({ source })
        },
        element: scrollable,
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingACard({ source })
        },
        getOverflow() {
          return {
            forTopEdge: { top: 1000 },
            forBottomEdge: { bottom: 1000 },
          }
        },
      })
    )
  }, [column, columnData, setIsCardOver])

  // Enhanced task creation with task data from the menu
  const handleCreateTaskWithData = useCallback(async (taskName: string, taskData: any) => {
    if (!taskName.trim()) return

    try {
      // Merge the task name with the additional data from the menu
      const fullTaskData = {
        name: taskName.trim(),
        description: "",
        completed: false,
        labelsTags: [],
        attachments: [],
        subTasks: [],
        comments: [],
        commentsCount: 0,
        ...taskData, // This includes priority, dates, assignedTo, etc.
      }

      await onCreateTask(column.id, fullTaskData)
      setIsCreatingTask(false)
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }, [onCreateTask, column.id])

  // Column editing state
  const [isEditingColumn, setIsEditingColumn] = useState(false)
  const [editColumnName, setEditColumnName] = useState(column.name)
  const [editColumnColor, setEditColumnColor] = useState(column.color)
  const [editColumnDescription, setEditColumnDescription] = useState(column.description || "")
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

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Update edit state when column changes
  useEffect(() => {
    setEditColumnName(column.name)
    setEditColumnColor(column.color)
    setEditColumnDescription(column.description || "")
  }, [column.name, column.color, column.description])

  // Column update handler
  const handleUpdateColumn = useCallback(async () => {
    if (!editColumnName.trim()) {
      setValidationMessage('Column name cannot be empty')
      setShowValidationModal(true)
      return
    }

    setIsUpdating(true)
    try {
      await onUpdateColumn(column.id, {
        name: editColumnName.trim(),
        color: editColumnColor,
        description: editColumnDescription.trim(),
      })
      setIsEditingColumn(false)
    } catch (error) {
      console.error("Failed to update column:", error)
      setValidationMessage('Failed to update column. Please try again.')
      setShowValidationModal(true)
    } finally {
      setIsUpdating(false)
    }
  }, [editColumnName, editColumnColor, editColumnDescription, onUpdateColumn, column.id])

  const handleCancelEdit = useCallback(() => {
    setIsEditingColumn(false)
    setEditColumnName(column.name)
    setEditColumnColor(column.color)
    setEditColumnDescription(column.description || "")
  }, [column.name, column.color, column.description])

  // Modal state for column deletion
  // This line is replaced - modal states are now defined above with other column editing states

  // Column delete handler - opens the confirmation modal
  const handleDeleteColumn = useCallback(() => {
    if (column.tasks.length > 0) {
      setShowErrorModal(true)
      return
    }

    setShowDeleteModal(true)
  }, [column.tasks.length])

  // Confirm column deletion handler
  const confirmDeleteColumn = useCallback(async () => {
    setIsDeleting(true)
    try {
      await onDeleteColumn(column.id)
      // Modal will close automatically via the preset
    } catch (error) {
      console.error("Failed to delete column:", error)
      setIsDeleting(false)
    }
  }, [column.id, onDeleteColumn])

  return (
    <Flex
      direction="column"
      className="w-full flex-shrink-0 select-none"
      ref={outerFullHeightRef}
    >
      {/* Delete Confirmation Modal */}
      {ModalPresets.deleteColumn({
        isOpen: showDeleteModal,
        onOpenChange: setShowDeleteModal,
        columnName: column.name,
        onConfirm: confirmDeleteColumn,
        isLoading: isDeleting,
      })}

      {/* Error Modal */}
      {ModalPresets.error({
        isOpen: showErrorModal,
        onOpenChange: setShowErrorModal,
        title: "Cannot Delete Column",
        description: "This column contains tasks. Please move or delete all tasks from this column before deleting it."
      })}

      {/* Validation Error Modal */}
      {ModalPresets.validation({
        isOpen: showValidationModal,
        onOpenChange: setShowValidationModal,
        message: validationMessage
      })}
      <Flex
        direction="column"
        className={`rounded-md ${stateStyles[state.type]}`}
        ref={innerRef}
        style={{ 
          transition: 'all 0.15s ease-in-out'
        }}
        {...{ [blockBoardPanningAttr]: true }}
      >
        <Flex
          direction="column"
          className={`pb-2 ${state.type === "is-column-over" ? "invisible" : ""}`}
        >
          {/* Column Header */}
          <Box>
            {isEditingColumn ? (
              <Box className="mt-1 w-full">
                <Flex direction="column" gap="3" className="flex-1">
                <TextField.Root
                  value={editColumnName}
                  onChange={(e) => setEditColumnName(e.target.value)}
                  placeholder="Column name"
                  size="2"
                />
                <TextArea
                  value={editColumnDescription}
                  onChange={(e) => setEditColumnDescription(e.target.value)}
                  placeholder="Column description (optional)"
                  rows={2}
                />
                <Flex align="center" gap="2" className="items-start">
                  <div className="relative" ref={colorPickerRef}>
                    <Button
                      variant="solid"
                      className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
                      style={{ backgroundColor: editColumnColor }}
                      onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                    />
                    {isColorPickerOpen && (
                      <div className="absolute z-50 mt-1" style={{ minWidth: "240px" }}>
                        <ColorPicker
                          colorType="base"
                          onColorSelect={(color: ColorSelectType) => {
                            setEditColumnColor(color.hex);
                            setIsColorPickerOpen(false);
                          }}
                          activeColor={editColumnColor}
                        />
                      </div>
                    )}
                  </div>
                  <Text size="1" className="text-gray-9">Column color</Text>
                </Flex>
                <Flex gap="2">
                  <Button
                    size="1"
                    onClick={handleUpdateColumn}
                    disabled={isUpdating}
                  >
                    <Check size={14} />
                    {isUpdating ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    size="1"
                    variant="soft"
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                  >
                    <X size={14} />
                    Cancel
                  </Button>
                </Flex>
              </Flex>
              </Box>
            ) : (
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 mr-1 flex-shrink-0 text-gray-11 hover:text-gray-12"
                >
                  {isExpanded ? <ChevronDown size={18} strokeWidth={2.5} /> : <ChevronRight size={18} strokeWidth={2.5} />}
                </Button>

                <Flex
                  justify="between"
                  align="center"
                  className="py-2.5 cursor-grab active:cursor-grabbing group rounded-md flex-1"
                  style={{ 
                    backgroundColor: createTransparentColor(column.color), 
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px'
                  }}
                  ref={headerRef}
                >
                  <div className="flex items-center ">
                  
                  <Checkbox
                    checked={allTasksSelected ? true : someTasksSelected ? 'indeterminate' : false}
                    onCheckedChange={handleSelectAllChange}
                    className="flex-shrink-0 ml-3 my-auto"
                    disabled={totalTasks === 0}
                  />
                </div>
                
                <Flex align="center" className="flex-1 min-w-0 ml-2 gap-2">
                  {/* Colored dot before title */}
                  <div 
                    className="h-2.5 w-2.5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: column.color || 'var(--gray-9)' }}
                  />
                  <Text size="2" className="font-medium truncate text-gray-12 dark:text-gray-11">
                    {column.name}
                  </Text>

                  <Flex gap="2" className="flex-shrink-0">
                    <Badge variant="solid" color="gray" size="1" className="bg-gray-5 text-gray-11 dark:bg-gray-6 dark:text-gray-11">
                      {totalTasks}
                    </Badge>
                    {completedTasks > 0 && (
                      <Badge variant="solid" color="green" size="1" className="bg-green-3 text-green-11 dark:bg-green-3 dark:text-green-11">
                        {completionPercentage}%
                      </Badge>
                    )}
                  </Flex>
                </Flex>

                {/* Column Actions Menu with edit and delete options */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton size="1" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity mr-2 hover:bg-gray-4 dark:hover:bg-gray-5">
                      <Ellipsis size={14} className="text-gray-11" />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={() => setIsEditingColumn(true)}>
                      <Edit3 size={14} />
                      Edit Column
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      onClick={handleDeleteColumn}
                      className="text-red-9 hover:text-red-10"
                    >
                      <Trash2 size={14} />
                      Delete Column
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                </Flex>
              </div>
            )}

          </Box>

          {/* Column Headers Row removed */}
          
          {/* Tasks List */}
          {isExpanded && (
            <Flex
              direction="column"
              className="flex-1"
            >
              <Box 
                className="relative overflow-auto [overflow-anchor:none] max-h-[calc(100vh-240px)]" 
                ref={scrollableRef}
                style={{ overflowX: 'hidden', overflowY: 'auto' }}
              >
                {/* Column drop target indicator - shows when a card is being dragged over empty space in the column */}
                {state.type === "is-card-over" && !state.isOverChildCard && (
                  <Box
                    className="absolute inset-0 border-2 border-dashed border-blue-6 dark:border-blue-7 rounded-md z-10 pointer-events-none"
                  />
                )}
                <CardList
                  column={column}
                  columns={columns}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  selectedTaskIds={selectedTaskIds}
                  onTaskSelect={onTaskSelect}
                />
              </Box>
                
              {/* Simple Add Task Section */}
              <Box className="pt-1 pb-2">
                {isCreatingTask ? (
                  <SimpleTaskInput
                    onCreateTask={handleCreateTaskWithData}
                    onCancel={() => setIsCreatingTask(false)}
                    columns={columns.map(col => ({
                      id: col.id,
                      name: col.name,
                      projectId: col.projectId,
                      // Map required TaskDataSchema fields
                      statusId: col.id, // Using column id as statusId since this is a status column
                      priorityId: '', // Default empty string for required field
                      taskOrder: col.order || 0, // Map order to taskOrder
                      completed: false, // Default value
                      // Include color from the column
                      color: col.color,
                      description: col.description,
                      // Default empty arrays for required array fields
                      refUrls: [],
                      labelsTags: [],
                      attachments: [],
                      assignedTo: [],
                      subTasks: [],
                      comments: [],
                      // Timestamps and audit fields
                      createdAt: col.createdAt,
                      updatedAt: col.updatedAt,
                      createdBy: col.createdBy,
                      updatedBy: col.updatedBy,
                    }))}
                    placeholder="Enter task title..."
                  />
                ) : (
                  <Box className="flex flex-shrink-0 flex-col px-2 py-1.5 w-full">
                    <Box 
                      className="group relative px-6 h-10 rounded-xl transition-all duration-150 bg-white border border-dashed border-gray-6 dark:bg-gray-1 dark:border dark:border-dashed dark:border-gray-6 hover:bg-gray-3 dark:hover:bg-gray-2 w-full"
                      onClick={() => setIsCreatingTask(true)}
                    >
                      <Flex justify="start" align="center" className="h-full w-full gap-2 cursor-pointer">
                        <Plus size={14} className="text-blue-9" />
                        <Text className="text-blue-9">Add task</Text>
                      </Flex>
                    </Box>
                  </Box>
                )}
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
