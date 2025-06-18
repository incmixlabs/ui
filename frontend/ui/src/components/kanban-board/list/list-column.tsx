// components/list/list-column.tsx - Updated with SimpleTaskInput and TaskActionsMenu
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {     ModalPresets } from "../shared/confirmation-modal"
import { Ellipsis, Plus, ChevronDown, ChevronRight, Trash2, Edit3, Check, X } from "lucide-react"
import { memo, useEffect, useRef, useState, useCallback } from "react"
import invariant from "tiny-invariant"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import { Box, Flex, Heading, IconButton, Button, Text, Badge, TextField, TextArea, DropdownMenu } from "@incmix/ui"
import { isSafari } from "@utils/browser"
import { isShallowEqual } from "@utils/objects"
import {
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
  blockBoardPanningAttr,
  type ListColumn,
  type KanbanTask,
  type TaskDataSchema,
} from "@incmix/store"
import { ListTaskCard, ListTaskCardShadow } from "./task-card"
import { SimpleTaskInput } from "./mention-task-input"


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
  "is-card-over": "outline outline-2 outline-blue-400 outline-offset-2",
  "is-dragging": "opacity-60 outline outline-2 outline-gray-400",
  "is-column-over": "bg-blue-50 dark:bg-blue-950",
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
}

const CardList = memo(function CardList({ 
  column, 
  columns,
  onUpdateTask, 
  onDeleteTask 
}: { 
  column: ListColumn
  columns: ListColumn[]
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
}) {
  return (
    <>
      {column.tasks.map((task: KanbanTask) => (
        <ListTaskCard 
          key={task.taskId} 
          card={task} 
          columnId={column.id}
          columns={columns}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </>
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
  isDragging = false 
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
    const inner = innerRef.current
    
    if (!outer || !scrollable || !header || !inner) {
      return
    }

    return combine(
      draggable({
        element: header,
        getInitialData: () => columnData,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const data = source.data
          invariant(isColumnData(data))
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: header,
              input: location.current.input,
            }),
            render({ container }) {
              const rect = inner.getBoundingClientRect()
              const preview = inner.cloneNode(true)
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
        className={`rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${stateStyles[state.type]}`}
        ref={innerRef}
        {...{ [blockBoardPanningAttr]: true }}
      >
        <Flex
          direction="column"
          className={`pb-2 ${state.type === "is-column-over" ? "invisible" : ""}`}
        >
          {/* Column Header */}
          <Box className="border-b border-gray-200 dark:border-gray-700">
            {isEditingColumn ? (
              <Box className="p-4" style={{ 
                backgroundColor: `${column.color}15`,
                borderTop: `3px solid ${column.color}`
              }}>
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
                  <Flex align="center" gap="2">
                    <input
                      type="color"
                      value={editColumnColor}
                      onChange={(e) => setEditColumnColor(e.target.value)}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Text size="1" className="text-gray-500">Column color</Text>
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
              <Flex
                justify="between"
                align="center"
                className="p-4 cursor-grab active:cursor-grabbing"
                ref={headerRef}
                style={{ 
                  backgroundColor: `${column.color}15`,
                  borderTop: `3px solid ${column.color}`
                }}
              >
                <Flex align="center" gap="3" className="flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    size="1"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </Button>
                  
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: column.color }}
                  />
                  
                  <Heading size="4" as="h3" className="font-semibold leading-4 truncate">
                    {column.name}
                  </Heading>
                  
                  <Flex gap="2" className="flex-shrink-0">
                    <Badge variant="soft" color="gray" size="1">
                      {totalTasks} tasks
                    </Badge>
                    {completedTasks > 0 && (
                      <Badge variant="soft" color="green" size="1">
                        {completionPercentage}% done
                      </Badge>
                    )}
                  </Flex>
                </Flex>

                {/* Column Actions Menu with edit and delete options */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton size="1" variant="ghost">
                      <Ellipsis size={16} />
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
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                      Delete Column
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            )}

            {/* Column Description */}
            {column.description && (
              <Box className="px-4 pb-3">
                <Text size="2" className="text-gray-600 dark:text-gray-400">
                  {column.description}
                </Text>
              </Box>
            )}

            {/* Progress Bar */}
            {totalTasks > 0 && completedTasks > 0 && (
              <Box className="px-4 pb-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </Box>
            )}
          </Box>

          {/* Tasks List */}
          {isExpanded && (
            <Flex
              className="flex flex-col overflow-y-auto [overflow-anchor:none] max-h-96"
              ref={scrollableRef}
            >
              <CardList 
                column={column} 
                columns={columns}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
              
              {state.type === "is-card-over" && !state.isOverChildCard ? (
                <Box className="flex-shrink-0 px-3 py-1">
                  <ListTaskCardShadow dragging={state.dragging} />
                </Box>
              ) : null}

              {/* Simple Add Task Section */}
              <Box className="p-3">
                {isCreatingTask ? (
                  <SimpleTaskInput
                    onCreateTask={handleCreateTaskWithData}
                    onCancel={() => setIsCreatingTask(false)}
                    columns={columns.map(col => ({
                      id: col.id,
                      name: col.name,
                      color: col.color,
                      projectId: col.projectId,
                      order: col.order,
                      description: col.description,
                      isDefault: col.isDefault,
                      createdAt: col.createdAt,
                      updatedAt: col.updatedAt,
                      createdBy: col.createdBy,
                      updatedBy: col.updatedBy,
                    }))}
                    placeholder="Enter task title..."
                  />
                ) : (
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600"
                    onClick={() => setIsCreatingTask(true)}
                  >
                    <Plus size={16} />
                    Add a task
                  </Button>
                )}
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}