import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  Icon,
  IconButton,
  ScrollArea,
  Text,
  TextArea,
  TextField,
} from "@/base"
// Update the import path if needed, and use 'import type' for types
import ColorPicker from "@/src/2elements/color-picker"
import type { ColorSelectType } from "@/src/2elements/color-picker"
import { type UniqueIdentifier, useDndContext } from "@dnd-kit/core"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useAIFeaturesStore } from "@incmix/store"
import type { TaskDataSchema } from "@incmix/utils/schema"
import { cva } from "class-variance-authority"
import { nanoid } from "nanoid"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useStreamingDisplay, useStreamingResponse } from "../../../hooks"
import { ModalPresets } from "../shared/confirmation-modal"
import type { KanbanColumn } from "../types"
import { TaskCard } from "./TaskCard"

export type ColumnType = "Column"

export interface ColumnDragData {
  type: ColumnType
  column: KanbanColumn
}

interface BoardColumnProps {
  column: KanbanColumn
  priorityLabels?: Array<{
    id: string
    label: string
    name: string
    color?: string
  }>
  isOverlay?: boolean
  onCreateTask: (
    columnId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  onUpdateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onUpdateColumn: (
    columnId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  onDeleteColumn: (columnId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
}

const QuickTaskForm = memo(function QuickTaskForm({
  columnId,
  onCreateTask,
  onCancel,
  priorityLabels,
}: {
  columnId: string
  onCreateTask: (
    columnId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  onCancel: () => void
  priorityLabels?: any[] // Array of priority labels
}) {
  // Get AI features state
  const { useAI } = useAIFeaturesStore()

  // Task form state
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [checklist, setChecklist] = useState<
    Array<{ id: string; text: string; checked: boolean; order: number }>
  >([])
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<
    Array<{ id: string; text: string; checked: boolean; order: number }>
  >([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate unique ID helper
  const generateUniqueId = useCallback(
    (prefix?: string, length = 10): string => {
      const randomId = nanoid(length)
      return prefix ? `${prefix}-${randomId}` : randomId
    },
    []
  )

  // Fetch data from AI endpoint as event stream
  const [streamingState, streamingActions] = useStreamingResponse<{
    userStory: {
      description: string
      acceptanceCriteria: string[]
      checklist: string[]
    }
  }>({
    endpoint: "/generate-user-story",
    method: "POST",
    body: { prompt: taskName, userTier: "free", templateId: 1 },
  })

  // Function to process streaming data and update form
  const setFormDataFromStream = useCallback(
    (data?: {
      description: string
      acceptanceCriteria: string[]
      checklist: string[]
    }) => {
      if (data) {
        // Set description
        setDescription(data.description || "")

        // Format checklist items with id, checked status and order
        const formattedChecklist = (data.checklist || []).map(
          (item, index) => ({
            id: generateUniqueId("cl"),
            text: item,
            checked: false,
            order: index,
          })
        )
        setChecklist(formattedChecklist)

        // Format acceptance criteria items with id, checked status and order
        const formattedAcceptanceCriteria = (data.acceptanceCriteria || []).map(
          (item, index) => ({
            id: generateUniqueId("ac"),
            text: item,
            checked: false,
            order: index,
          })
        )
        setAcceptanceCriteria(formattedAcceptanceCriteria)
      }
    },
    [generateUniqueId]
  )

  // Connect streaming data to form updates
  useStreamingDisplay({
    streamingData: streamingState.data,
    isStreaming: streamingState.isStreaming,
    connectionStatus: streamingState.connectionStatus,
    onDataUpdate: (data) => {
      setFormDataFromStream(data.userStory)
    },
  })

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!taskName.trim()) return

      setIsSubmitting(true)
      try {
        // Get first priority label id or empty string if none available
        const defaultPriority =
          priorityLabels && priorityLabels.length > 0
            ? priorityLabels[0].id
            : ""

        await onCreateTask(columnId, {
          name: taskName.trim(),
          description: description.trim(),
          priorityId: defaultPriority, // Use first available priority from labels
          completed: false,
          labelsTags: [],
          attachments: [],
          assignedTo: [],
          subTasks: [],
          comments: [],
          // commentsCount removed as it's no longer in schema
          checklist: checklist,
          acceptanceCriteria: acceptanceCriteria,
        })

        setTaskName("")
        setDescription("")
        setChecklist([]) // Empty array is fine since it's a reset
        setAcceptanceCriteria([]) // Empty array is fine since it's a reset
        setIsSubmitting(false)
      } catch (error) {
        console.error("Failed to create task:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      taskName,
      description,
      onCreateTask,
      columnId,
      onCancel,
      priorityLabels,
      checklist,
      acceptanceCriteria,
    ]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel()
      }
    },
    [onCancel]
  )

  return (
    <Box className="rounded-lg border border-gray-6 bg-gray-4 p-3 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField.Root
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task title..."
          autoFocus
          onKeyDown={handleKeyDown}
          disabled={isSubmitting || streamingState.isStreaming}
        />

        {useAI && taskName.trim() && (
          <Button
            onClick={() => streamingActions.startStreaming()}
            disabled={
              streamingState.isStreaming || !taskName.trim() || isSubmitting
            }
            size="1"
            className="mt-2 mb-2"
          >
            {streamingState.isStreaming ? (
              <>
                <Icon name="Loader" className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Icon name="Sparkles" className="mr-2 h-4 w-4" />
                Generate Description
              </>
            )}
          </Button>
        )}

        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            useAI
              ? "Generate description with AI or enter manually..."
              : "Enter task description..."
          }
          rows={3}
          disabled={isSubmitting || streamingState.isStreaming}
        />

        {/* AI Status Indicator */}
        {useAI && (
          <Box className="text-xs">
            {streamingState.isStreaming && (
              <Flex align="center" gap="1" className="text-blue-500">
                <Icon name="Loader" className="animate-spin" />
                <Text>Generating description...</Text>
              </Flex>
            )}
            {streamingState.error && (
              <Text className="text-red-500">
                Failed to generate description: {streamingState.error}
              </Text>
            )}
            {!streamingState.isStreaming &&
              !streamingState.error &&
              description &&
              streamingState.connectionStatus === "completed" && (
                <Flex align="center" gap="1" className="text-green-600">
                  <Icon name="Check" />
                  <Text>AI description generated</Text>
                </Flex>
              )}
          </Box>
        )}

        <Flex gap="2">
          <Button
            type="submit"
            size="2"
            disabled={
              !taskName.trim() || isSubmitting || streamingState.isStreaming
            }
            className="flex-1"
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </Button>
          <Button
            type="button"
            size="2"
            variant="soft"
            color="red"
            onClick={() => {
              // Cancel streaming if in progress
              if (streamingState.isStreaming) {
                streamingActions.stopStreaming()
              }
              onCancel()
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Box>
  )
})

const variants = cva(
  "flex h-full w-80 max-w-full flex-shrink-0 snap-center flex-col rounded-b-lg bg-gray-3 p-0",
  {
    variants: {
      dragging: {
        default: "border-2 border-transparent",
        over: "opacity-30",
        overlay: "rounded-t-lg bg-gray-12",
      },
    },
  }
)

export function DndBoardColumn({
  column,
  priorityLabels,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onUpdateColumn,
  onDeleteColumn,
  onTaskOpen,
  isOverlay,
}: BoardColumnProps) {
  const [isEditingColumn, setIsEditingColumn] = useState(false)
  const [editColumnName, setEditColumnName] = useState(column.name)
  const [editColumnColor, setEditColumnColor] = useState(column.color)
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
  const [editColumnDescription, setEditColumnDescription] = useState(
    column.description || ""
  )
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [validationMessage, setValidationMessage] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const [isCreatingTask, setIsCreatingTask] = useState(false)

  const sortedTasks = useMemo(() => {
    return [...column.tasks].sort(
      (a, b) => (a.taskOrder || 0) - (b.taskOrder || 0)
    )
  }, [column.tasks])

  const tasksIds = useMemo(() => {
    return sortedTasks
      .map((task) => task.id)
      .filter((id): id is string => id !== undefined)
  }, [sortedTasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.name}`,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }
  const handleUpdateColumn = useCallback(async () => {
    if (!editColumnName.trim()) {
      setValidationMessage("Column name cannot be empty")
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
      setValidationMessage("Failed to update column. Please try again.")
      setShowValidationModal(true)
    } finally {
      setIsUpdating(false)
    }
  }, [
    editColumnName,
    editColumnColor,
    editColumnDescription,
    onUpdateColumn,
    column.id,
  ])

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
  const completedTasks = column.tasks.filter((task) => task.completed).length
  const totalTasks = column.tasks.length
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  return (
    <>
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
        description:
          "This column contains tasks. Please move or delete all tasks from this column before deleting it.",
      })}

      {/* Validation Error Modal */}
      {ModalPresets.validation({
        isOpen: showValidationModal,
        onOpenChange: setShowValidationModal,
        message: validationMessage,
      })}

      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={variants({
          dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
        })}
      >
        <Box className="space-between flex flex-row items-center text-left font-semibold">
          {/* <Button
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className="p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
          >
            <span className="sr-only">{`Move column: ${column.name}`}</span>
            <Icon name="GripVertical" />
          </Button> */}
          <Box
            className="w-full flex-shrink-0 cursor-grab rounded-t-lg p-4 pb-2 active:cursor-grabbing"
            style={{
              backgroundColor: `${column.color}15`,
              borderTop: `3px solid ${column.color}`,
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
                <Flex justify={"between"}>
                  <Flex align="center" gap="2" className="items-start">
                    <Box className="relative" ref={colorPickerRef}>
                      <Button
                        variant="solid"
                        className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
                        style={{ backgroundColor: editColumnColor }}
                        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                      />
                      {isColorPickerOpen && (
                        <Box
                          className="absolute z-50 mt-1"
                          style={{ minWidth: "240px" }}
                        >
                          <ColorPicker
                            colorType="base"
                            onColorSelect={(color: ColorSelectType) => {
                              setEditColumnColor(color.hex)
                              setIsColorPickerOpen(false)
                            }}
                            activeColor={editColumnColor}
                          />
                        </Box>
                      )}
                    </Box>
                    {/* <Text size="1" className="text-gray-500">
                      Column color
                    </Text> */}
                  </Flex>
                  <Flex gap="2">
                    <Button
                      size="1"
                      className="h-6"
                      onClick={handleUpdateColumn}
                      disabled={isUpdating}
                    >
                      <Icon name="Check" />
                      {isUpdating ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      size="1"
                      variant="soft"
                      color="red"
                      className="h-6"
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                    >
                      <Icon name="X" />
                      Cancel
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Flex justify="between" align="center">
                <Flex align="center" gap="2" className="min-w-0 flex-1">
                  <Heading
                    size="5"
                    as="h3"
                    className="truncate font-semibold leading-4"
                  >
                    {column.name}
                  </Heading>
                  <Flex gap="1" className="flex-shrink-0">
                    <Text
                      size="1"
                      className="rounded-1 bg-gray-1 px-2 py-1 text-gray-12"
                    >
                      {totalTasks}
                    </Text>
                    {completedTasks > 0 && (
                      <Text
                        size="1"
                        className="rounded-full bg-green-100 px-2 py-1 text-green-600 dark:bg-green-900"
                      >
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
                      className="flex-shrink-0 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Icon name="EllipsisVertical" />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={() => setIsEditingColumn(true)}>
                      <Icon name="SquarePen" />
                      Edit Column
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={handleDeleteColumn} color="red">
                      <Icon name="Trash2" />
                      Delete Column
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            )}
          </Box>
        </Box>

        <Box className="flex h-full flex-grow flex-col gap-2 p-4">
          <SortableContext items={tasksIds}>
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                priorityLabels={priorityLabels}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onTaskOpen={onTaskOpen}
              />
            ))}
          </SortableContext>
          {/* Add Task Section - At bottom of content */}
          <Box className="rounded-b-lg px-3 pb-3">
            {isCreatingTask ? (
              <QuickTaskForm
                columnId={column.id}
                priorityLabels={priorityLabels}
                onCreateTask={onCreateTask}
                onCancel={() => setIsCreatingTask(false)}
              />
            ) : (
              <Button
                variant="soft"
                color="blue"
                className="mx-auto grid h-10 w-10 place-items-center gap-2"
                onClick={() => setIsCreatingTask(true)}
              >
                <Icon name="Plus" />
                <Text className="sr-only">Add a task</Text>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext()

  const variations = cva("flex px-2 pb-4 md:px-0 lg:justify-center", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  })

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <Box className="flex flex-row items-start justify-center gap-4">
        {children}
      </Box>
    </ScrollArea>
  )
}
