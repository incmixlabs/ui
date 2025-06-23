// components/board/board-column.tsx - Fixed layout and spacing
"use client"

import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Ellipsis, Plus, Trash2, Edit3, GripVertical, Check, X, Loader2 } from "lucide-react"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import ColorPicker, { ColorSelectType } from "@components/color-picker"
import invariant from "tiny-invariant"
import { ModalPresets } from "../shared/confirmation-modal"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  TextField,
  Text,
  DropdownMenu,
  TextArea
} from "@radixui"
import { isSafari } from "@utils/browser"
import { isShallowEqual } from "@incmix/utils/objects"
import { blockBoardPanningAttr } from "../data-attributes"
import { TaskCard, TaskCardShadow } from "./task-card"
import {
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
  type KanbanColumn,
  useAIUserStory,
  useAIFeaturesStore
} from "@incmix/store"

// Define types for drag and drop operations
type DragData = {
  rect: DOMRect
  [key: string]: unknown
}

type DropTarget = {
  data: Record<string | symbol, unknown>
}

type DragLocation = {
  current: {
    dropTargets: DropTarget[]
  }
}
import { TaskDataSchema } from "@incmix/store"
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

interface BoardColumnProps {
  column: KanbanColumn
  onCreateTask: (columnId: string, taskData: Partial<TaskDataSchema>) => Promise<void>
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onUpdateColumn: (columnId: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  onDeleteColumn: (columnId: string) => Promise<void>
  isDragging?: boolean
  onTaskOpen?: (taskId: string) => void
}

// Quick Task Creation Form
const QuickTaskForm = memo(function QuickTaskForm({
  columnId,
  onCreateTask,
  onCancel,
}: {
  columnId: string
  onCreateTask: (columnId: string, taskData: Partial<TaskDataSchema>) => Promise<void>
  onCancel: () => void
}) {
  // Get AI features state
  const { useAI } = useAIFeaturesStore()

  // Task form state
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [checklist, setChecklist] = useState<Array<{ id: string; text: string; checked: boolean }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hadGenerationError, setHadGenerationError] = useState(false)

  // AI description generation hook
  const {
    generateUserStory,
    isGenerating,
    error: generationError,
    clearError: resetError
  } = useAIUserStory()

  // Generate description when task name changes (if AI enabled)
  useEffect(() => {
    // Only generate if AI is enabled, task name has content, and description is empty
    if (useAI && taskName.trim() && !description && !hadGenerationError) {
      // Add a delay to avoid generating on every keystroke
      const timer = setTimeout(async () => {
        try {
          const userStoryResult = await generateUserStory(taskName)
          if (userStoryResult) {
            setDescription(userStoryResult.description)
            setChecklist(userStoryResult.checklist || [])
          }
        } catch (error) {
          console.error("AI description generation failed:", error)
          setHadGenerationError(true)
        }
      }, 1000) // 1 second delay

      return () => clearTimeout(timer)
    }
  }, [taskName, useAI, description, generateUserStory, hadGenerationError])

  // Reset error state when task name changes
  useEffect(() => {
    if (hadGenerationError) {
      setHadGenerationError(false)
      resetError()
    }
  }, [taskName, resetError, hadGenerationError])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    if (!taskName.trim()) return

    setIsSubmitting(true)
    try {
      await onCreateTask(columnId, {
        name: taskName.trim(),
        description: description.trim(),
        priority: "medium",
        completed: false,
        labelsTags: [],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: [],
        commentsCount: 0,
        checklist: checklist,
      })

      setTaskName("")
      setDescription("")
      onCancel()
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [taskName, description, onCreateTask, columnId, onCancel])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel()
    }
  }, [onCancel])

  return (
    <Box className="p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField.Root
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task title..."
          autoFocus
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
        />

        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={useAI ? "AI will generate description based on title..." : "Enter task description..."}
          rows={3}
          disabled={isSubmitting || isGenerating}
        />

        {/* AI Status Indicator */}
        {useAI && taskName.trim() && (
          <Box className="text-xs">
            {isGenerating && (
              <Flex align="center" gap="1" className="text-blue-500">
                <Loader2 size={12} className="animate-spin" />
                <Text>Generating description...</Text>
              </Flex>
            )}
            {generationError && (
              <Text className="text-red-500">Failed to generate description</Text>
            )}
            {!isGenerating && !generationError && description && (
              <Flex align="center" gap="1" className="text-green-600">
                <Check size={12} />
                <Text>AI description generated</Text>
              </Flex>
            )}
          </Box>
        )}

        <Flex gap="2">
          <Button
            type="submit"
            size="2"
            disabled={!taskName.trim() || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </Button>
          <Button
            type="button"
            size="2"
            variant="soft"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Box>
  )
})

const CardList = memo(function CardList({
  column,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen,
}: {
  column: KanbanColumn
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
}) {
  return (
    <>
      {column.tasks.map((card) => (
        <TaskCard
          key={card.taskId}
          card={card}
          columnId={column.id}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onTaskOpen={onTaskOpen}
        />
      ))}
    </>
  )
})

export const BoardColumn = memo(function BoardColumn({
  column,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onUpdateColumn,
  onDeleteColumn,
  isDragging = false,
  onTaskOpen,
}: BoardColumnProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const outerRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TColumnState>(idle)

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isEditingColumn, setIsEditingColumn] = useState(false)
  const [editColumnName, setEditColumnName] = useState(column.name)
  const [editColumnColor, setEditColumnColor] = useState(column.color)
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
  const [editColumnDescription, setEditColumnDescription] = useState(column.description || "")

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Task creation state
  const [isCreatingTask, setIsCreatingTask] = useState(false)

  // Update edit state when column changes
  useEffect(() => {
    setEditColumnName(column.name)
    setEditColumnColor(column.color)
    setEditColumnDescription(column.description || "")
  }, [column.name, column.color, column.description])

  const setIsCardOver = useCallback(({
    data,
    location,
  }: {
    data: DragData
    location: DragLocation
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
    const outer = outerRef.current
    const scrollable = scrollableRef.current
    const header = headerRef.current
    const inner = innerRef.current
    invariant(outer)
    invariant(scrollable)
    invariant(header)
    invariant(inner)

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
                preview.style.transform = "rotate(4deg)"
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
      })
    )
  }, [column.id, columnData, setIsCardOver])

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

  const handleDeleteColumn = useCallback(() => {
    if (column.tasks.length > 0) {
      setShowErrorModal(true)
      return
    }

    setShowDeleteModal(true)
  }, [column.tasks.length])

  const confirmDeleteColumn = async () => {
    setIsDeleting(true)
    try {
      await onDeleteColumn(column.id)
      // Modal will close automatically via the preset
    } catch (error) {
      console.error("Failed to delete column:", error)
      setIsDeleting(false)
    }
  }

  const handleCancelEdit = useCallback(() => {
    setIsEditingColumn(false)
    setEditColumnName(column.name)
    setEditColumnColor(column.color)
    setEditColumnDescription(column.description || "")
  }, [column.name, column.color, column.description])

  // Calculate column statistics
  const completedTasks = column.tasks.filter(task => task.completed).length
  const totalTasks = column.tasks.length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="w-full select-none" ref={outerRef}>
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

      <div
        className={`rounded-lg bg-gray-50 dark:bg-gray-900 transition-all duration-200 ${stateStyles[state.type]} flex flex-col`}
        ref={innerRef}
      >
        <div className={`flex flex-col ${state.type === "is-column-over" ? "invisible" : ""}`}>
          {/* Column Header */}
          <div
            className="flex-shrink-0 p-4 pb-2 cursor-grab active:cursor-grabbing rounded-t-lg"
            ref={headerRef}
            style={{
              backgroundColor: `${column.color}15`,
              borderTop: `3px solid ${column.color}`
            }}
          >
            {isEditingColumn ? (
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
            ) : (
              <Flex justify="between" align="center">
                <Flex align="center" gap="2" className="flex-1 min-w-0">
                  <GripVertical size={16} className="text-gray-400 flex-shrink-0" />
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: column.color }}
                  />
                  <Heading size="4" as="h3" className="font-semibold leading-4 truncate">
                    {column.name}
                  </Heading>
                  <Flex gap="1" className="flex-shrink-0">
                    <Text size="1" className="text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {totalTasks}
                    </Text>
                    {completedTasks > 0 && (
                      <Text size="1" className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                        {completionPercentage}%
                      </Text>
                    )}
                  </Flex>
                </Flex>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton
                      size="1"
                      variant="ghost"
                      className="rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
                    >
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
          </div>

          {/* Column Description */}
          {!isEditingColumn && column.description && (
            <div className="flex-shrink-0 px-4 pb-2">
              <Text size="1" className="text-gray-600 dark:text-gray-400">
                {column.description}
              </Text>
            </div>
          )}

          {/* Progress Bar for Completed Tasks */}
          {totalTasks > 0 && completedTasks > 0 && (
            <div className="flex-shrink-0 px-4 pb-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Tasks Container - No internal scrolling, grows naturally */}
          <div
            className="px-2"
            ref={scrollableRef}
          >
            <div className="space-y-1 py-2">
              <CardList
                column={column}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onTaskOpen={onTaskOpen}
              />
              {state.type === "is-card-over" && !state.isOverChildCard ? (
                <div className="px-1">
                  <TaskCardShadow dragging={state.dragging} />
                </div>
              ) : null}
            </div>
          </div>

          {/* Add Task Section - At bottom of content */}
          <div className="px-3 pb-3 rounded-b-lg">
            {isCreatingTask ? (
              <QuickTaskForm
                columnId={column.id}
                onCreateTask={onCreateTask}
                onCancel={() => setIsCreatingTask(false)}
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
          </div>
        </div>
      </div>
    </div>
  )
})
