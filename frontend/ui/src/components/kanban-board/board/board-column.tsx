// components/board/board-column.tsx - Updated for new schema
"use client"

import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Ellipsis, Plus, Trash2, Edit3, GripVertical, Check, X } from "lucide-react"
import { memo, useEffect, useRef, useState, useCallback } from "react"
import invariant from "tiny-invariant"

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
} from "@incmix/ui"
import { isSafari } from "@utils/browser"
import { isShallowEqual } from "@utils/objects"


import { getColumnData, isCardData, isCardDropTargetData, isColumnData, isDraggingACard, isDraggingAColumn, KanbanColumn, TaskDataSchema } from "@incmix/store"
import { TaskCard, TaskCardShadow } from "./task-card"

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
  const [taskName, setTaskName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!taskName.trim()) return
    
    setIsSubmitting(true)
    try {
      await onCreateTask(columnId, {
        name: taskName.trim(),
        description: "",
        priority: "medium",
        completed: false,
        labelsTags: [],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: [], // Now an array
        commentsCount: 0, // Separate count field
      })
      
      setTaskName("")
      onCancel()
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [taskName, onCreateTask, columnId, onCancel])

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
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TColumnState>(idle)

  // Column editing state
  const [isEditingColumn, setIsEditingColumn] = useState(false)
  const [editColumnName, setEditColumnName] = useState(column.name)
  const [editColumnColor, setEditColumnColor] = useState(column.color)
  const [editColumnDescription, setEditColumnDescription] = useState(column.description || "")

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
      return
    }
    
    try {
      await onUpdateColumn(column.id, {
        name: editColumnName.trim(),
        color: editColumnColor,
        description: editColumnDescription.trim(),
      })
      setIsEditingColumn(false)
    } catch (error) {
      console.error("Failed to update column:", error)
    }
  }, [editColumnName, editColumnColor, editColumnDescription, onUpdateColumn, column.id])

  const handleDeleteColumn = useCallback(async () => {
    if (column.tasks.length > 0) {
      alert("Cannot delete column with tasks. Please move or delete tasks first.")
      return
    }
    
    if (confirm(`Are you sure you want to delete the "${column.name}" column?`)) {
      try {
        await onDeleteColumn(column.id)
      } catch (error) {
        console.error("Failed to delete column:", error)
        alert("Failed to delete column. Please try again.")
      }
    }
  }, [column.tasks.length, column.name, column.id, onDeleteColumn])

  const handleCancelEdit = useCallback(() => {
    setIsEditingColumn(false)
    setEditColumnName(column.name)
    setEditColumnColor(column.color)
    setEditColumnDescription(column.description || "")
  }, [column.name, column.color, column.description])

  return (
    <Flex
      direction="column"
      className="h-full w-full flex-shrink-0 select-none"
      ref={outerFullHeightRef}
    >
      <Flex
        direction="column"
        className={`h-full rounded-lg bg-gray-50 dark:bg-gray-900 transition-all duration-200 ${stateStyles[state.type]}`}
        ref={innerRef}
      >
        <Flex
          direction="column"
          className={`h-full ${state.type === "is-column-over" ? "invisible" : ""}`}
        >
          {/* Column Header */}
          <Flex
            direction="row"
            justify="between"
            align="center"
            className="p-4 pb-2 cursor-grab active:cursor-grabbing"
            ref={headerRef}
            style={{ 
              backgroundColor: `${column.color}15`,
              borderTop: `3px solid ${column.color}`
            }}
          >
            {isEditingColumn ? (
              <Flex direction="column" gap="3" className="flex-1 mr-2">
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
                  <Button size="1" onClick={handleUpdateColumn}>
                    <Check size={14} />
                    Save
                  </Button>
                  <Button size="1" variant="soft" onClick={handleCancelEdit}>
                    <X size={14} />
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" gap="2" className="flex-1">
                  <GripVertical size={16} className="text-gray-400" />
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: column.color }}
                  />
                  <Heading size="4" as="h3" className="font-semibold leading-4 truncate">
                    {column.name}
                  </Heading>
                  <Flex gap="1">
                    <Text size="1" className="text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {column.totalTasksCount}
                    </Text>
                    {column.completedTasksCount > 0 && (
                      <Text size="1" className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                        {column.progressPercentage}%
                      </Text>
                    )}
                  </Flex>
                </Flex>
                
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton 
                      size="1" 
                      variant="ghost"
                      className="rounded hover:bg-gray-200 dark:hover:bg-gray-700"
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
              </>
            )}
          </Flex>

          {/* Column Description */}
          {!isEditingColumn && column.description && (
            <Box className="px-4 pb-2">
              <Text size="1" className="text-gray-600 dark:text-gray-400">
                {column.description}
              </Text>
            </Box>
          )}

          {/* Progress Bar for Completed Tasks */}
          {column.totalTasksCount > 0 && column.completedTasksCount > 0 && (
            <Box className="px-4 pb-2">
              <Box className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <Box
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${column.progressPercentage}%` }}
                />
              </Box>
            </Box>
          )}

          {/* Tasks Container */}
          <Flex
            className="flex-1 flex-col overflow-y-auto [overflow-anchor:none] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
            ref={scrollableRef}
          >
            <Box className="space-y-1 p-2 min-h-[100px]">
              <CardList
                column={column}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onTaskOpen={onTaskOpen}
              />
              {state.type === "is-card-over" && !state.isOverChildCard ? (
                <Box className="px-1">
                  <TaskCardShadow dragging={state.dragging} />
                </Box>
              ) : null}
            </Box>
          </Flex>

          {/* Add Task Section */}
          <Box className="p-3 pt-1">
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
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
})