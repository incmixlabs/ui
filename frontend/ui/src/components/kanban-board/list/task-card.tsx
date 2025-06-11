// components/list/task-card.tsx
import React, { useCallback, useEffect, useRef, useState, memo } from "react"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { createPortal } from "react-dom"
import invariant from "tiny-invariant"
import * as Collapsible from "@radix-ui/react-collapsible"
import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { isSafari } from "@utils/browser"
import { isShallowEqual } from "@utils/objects"
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
} from "lucide-react"
import {
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
  type KanbanTask,
  type TaskDataSchema,
} from "@incmix/store"
import { Card } from "@incmix/ui/card"
import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import { cn } from "@utils"
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Text,
  IconButton,
  DropdownMenu,
  Badge,
  Button,
  TextField,
  Popover,
  Calendar,
  Avatar,
} from "@incmix/ui"

type TCardState =
  | { type: "idle" }
  | { type: "is-dragging" }
  | { type: "is-dragging-and-left-self" }
  | { type: "is-over"; dragging: DOMRect; closestEdge: Edge }
  | { type: "preview"; container: HTMLElement; dragging: DOMRect }

const idle: TCardState = { type: "idle" }

const innerStyles: { [Key in TCardState["type"]]?: string } = {
  idle: "hover:outline outline-2 outline-gray-200 hover:shadow-sm transition-all duration-200",
  "is-dragging": "opacity-40 cursor-grabbing scale-[0.98]",
}

const outerStyles: { [Key in TCardState["type"]]?: string } = {
  "is-dragging": "opacity-70",
  "is-dragging-and-left-self": "hidden",
}

interface ListTaskCardProps {
  card: KanbanTask
  columnId: string
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
}

export const ListTaskCardShadow = memo(function ListTaskCardShadow({ 
  dragging 
}: { 
  dragging: DOMRect 
}) {
  return (
    <div
      className="flex-shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900 border-2 border-dashed border-blue-300 dark:border-blue-700 transition-all duration-200"
      style={{ height: Math.max(dragging.height, 80) }}
    />
  )
})

const TaskCardDisplay = memo(function TaskCardDisplay({
  card,
  state,
  outerRef,
  innerRef,
  onUpdateTask,
  onDeleteTask,
}: {
  card: KanbanTask
  state: TCardState
  outerRef?: React.MutableRefObject<HTMLDivElement | null>
  innerRef?: React.MutableRefObject<HTMLDivElement | null>
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
}) {
  const { handleDrawerOpen } = useKanbanDrawer()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [taskName, setTaskName] = useState(card.name || "")
  const [startDate, setStartDate] = useState<Date | null>(
    card.startDate ? new Date(card.startDate) : null
  )
  const [endDate, setEndDate] = useState<Date | null>(
    card.endDate ? new Date(card.endDate) : null
  )

  // Update local state when card changes
  useEffect(() => {
    setTaskName(card.name || "")
    setStartDate(card.startDate ? new Date(card.startDate) : null)
    setEndDate(card.endDate ? new Date(card.endDate) : null)
  }, [card.name, card.startDate, card.endDate])

  const handleToggleComplete = useCallback(async (checked: boolean | string) => {
    // Ensure taskId exists
    if (!card.taskId) {
      console.error("Task ID is missing")
      return
    }

    try {
      await onUpdateTask(card.taskId, { completed: typeof checked === 'boolean' ? checked : checked === 'indeterminate' ? false : true })
    } catch (error) {
      console.error("Failed to toggle task completion:", error)
    }
  }, [card.taskId, onUpdateTask])
  
  // Separate handler for dropdown menu click
  const handleToggleCompleteClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Ensure taskId exists
    if (!card.taskId) {
      console.error("Task ID is missing")
      return
    }

    try {
      await onUpdateTask(card.taskId, { completed: !card.completed })
    } catch (error) {
      console.error("Failed to toggle task completion:", error)
    }
  }, [card.taskId, card.completed, onUpdateTask])

  const handleDeleteTask = useCallback(async () => {
    // Ensure taskId exists
    if (!card.taskId) {
      console.error("Task ID is missing")
      return
    }

    try {
      await onDeleteTask(card.taskId)
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }, [card.taskId, onDeleteTask])

  const handleTaskNameSave = useCallback(async () => {
    const trimmedName = taskName.trim()
    
    // Ensure taskId exists and name is valid
    if (!card.taskId) {
      console.error("Task ID is missing")
      return
    }

    if (!trimmedName) {
      // Reset to original name if empty
      setTaskName(card.name || "")
      setIsEditingName(false)
      return
    }

    if (trimmedName !== card.name) {
      try {
        await onUpdateTask(card.taskId, { name: trimmedName })
      } catch (error) {
        console.error("Failed to update task name:", error)
        setTaskName(card.name || "") // Revert on error
      }
    }
    setIsEditingName(false)
  }, [taskName, card.name, card.taskId, onUpdateTask])

  const handleStartDateChange = useCallback(async (date: Date | undefined) => {
    if (!date || !card.taskId) return
    
    setStartDate(date)
    if (endDate && date > endDate) {
      // If start date is after end date, also update end date
      setEndDate(date)
      try {
        await onUpdateTask(card.taskId, {
          startDate: date.toISOString(),
          endDate: date.toISOString(),
        })
      } catch (error) {
        console.error("Failed to update dates:", error)
        setStartDate(card.startDate ? new Date(card.startDate) : null)
        setEndDate(card.endDate ? new Date(card.endDate) : null)
      }
    } else {
      try {
        await onUpdateTask(card.taskId, { startDate: date.toISOString() })
      } catch (error) {
        console.error("Failed to update start date:", error)
        setStartDate(card.startDate ? new Date(card.startDate) : null)
      }
    }
  }, [card.taskId, endDate, onUpdateTask, card.startDate, card.endDate])

  const handleEndDateChange = useCallback(async (date: Date | undefined) => {
    if (!date || !card.taskId) return
    
    setEndDate(date)
    if (startDate && date < startDate) {
      // If end date is before start date, also update start date
      setStartDate(date)
      try {
        await onUpdateTask(card.taskId, {
          startDate: date.toISOString(),
          endDate: date.toISOString(),
        })
      } catch (error) {
        console.error("Failed to update dates:", error)
        setStartDate(card.startDate ? new Date(card.startDate) : null)
        setEndDate(card.endDate ? new Date(card.endDate) : null)
      }
    } else {
      try {
        await onUpdateTask(card.taskId, { endDate: date.toISOString() })
      } catch (error) {
        console.error("Failed to update end date:", error)
        setEndDate(card.endDate ? new Date(card.endDate) : null)
      }
    }
  }, [card.taskId, startDate, onUpdateTask, card.startDate, card.endDate])

  const handleOpenDrawer = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Ensure taskId exists
    if (!card.taskId) {
      console.error("Task ID is missing")
      return
    }

    handleDrawerOpen(card.taskId)
  }, [card.taskId, handleDrawerOpen])

  const completedSubTasks = card.subTasks?.filter(st => st.completed).length || 0
  const totalSubTasks = card.subTasks?.length || 0
  const hasSubTasks = totalSubTasks > 0

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined
    })
  }, [])

  const getDateStatus = useCallback((date: Date) => {
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { status: "overdue", className: "text-red-600 bg-red-50" }
    if (diffDays === 0) return { status: "today", className: "text-orange-600 bg-orange-50" }
    if (diffDays <= 3) return { status: "soon", className: "text-yellow-600 bg-yellow-50" }
    return { status: "future", className: "text-blue-600 bg-blue-50" }
  }, [])

  // Don't render if taskId is missing
  if (!card.taskId) {
    console.error("Task card missing taskId:", card)
    return null
  }

  return (
    <Box
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-1 px-3 py-1 ${outerStyles[state.type] || ""}`}
    >
      {state.type === "is-over" && state.closestEdge === "top" && (
        <ListTaskCardShadow dragging={state.dragging} />
      )}
      
      <Card
        className={cn(
          "relative p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
          innerStyles[state.type] || "",
          card.completed && "opacity-75"
        )}
        ref={innerRef}
        style={
          state.type === "preview"
            ? {
                width: state.dragging.width,
                height: state.dragging.height,
                backgroundColor: "white",
                opacity: 0.95,
                border: "2px solid #3b82f6",
                transform: !isSafari() ? "rotate(2deg)" : undefined,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }
            : undefined
        }
      >
        <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded}>
          <Flex justify="between" align="center" className="mb-3">
            <Flex align="center" gap="3" className="flex-1 min-w-0">
              {hasSubTasks && (
                <Collapsible.Trigger asChild>
                  <IconButton size="1" variant="ghost" className="p-0">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </IconButton>
                </Collapsible.Trigger>
              )}

              <Checkbox
                checked={card.completed}
                onCheckedChange={handleToggleComplete}
                className="flex-shrink-0"
              />

              {isEditingName ? (
                <TextField.Root
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  onBlur={handleTaskNameSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTaskNameSave()
                    if (e.key === "Escape") {
                      setTaskName(card.name || "")
                      setIsEditingName(false)
                    }
                  }}
                  autoFocus
                  className="flex-1 font-medium"
                />
              ) : (
                <Heading
                  size="3"
                  className={cn(
                    "flex-1 font-medium cursor-pointer hover:text-blue-600 transition-colors",
                    card.completed && "line-through text-gray-500"
                  )}
                  onDoubleClick={() => setIsEditingName(true)}
                  onClick={handleOpenDrawer}
                >
                  {card.name || "Untitled Task"}
                </Heading>
              )}
            </Flex>

            <Flex align="center" gap="3" className="flex-shrink-0">
              {/* Priority Badge */}
              {card.priority && card.priority !== "medium" && (
                <Badge
                  color={
                    card.priority === "urgent" ? "red" :
                    card.priority === "high" ? "orange" : "gray"
                  }
                  variant="soft"
                  size="1"
                >
                  {card.priority}
                </Badge>
              )}

              {/* Date displays */}
              <Flex align="center" gap="2" className="text-xs">
                {startDate && (
                  <Popover.Root>
                    <Popover.Trigger>
                      <Button variant="ghost" size="1" className="h-auto p-1">
                        <Flex align="center" gap="1">
                          <CalendarDays size={12} className="text-green-600" />
                          <Text size="1" className="text-green-600">
                            {formatDate(startDate)}
                          </Text>
                        </Flex>
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={handleStartDateChange}
                        initialFocus
                      />
                    </Popover.Content>
                  </Popover.Root>
                )}

                {endDate && (
                  <Popover.Root>
                    <Popover.Trigger>
                      <Button variant="ghost" size="1" className="h-auto p-1">
                        <Flex align="center" gap="1">
                          <CalendarDays size={12} />
                          <Text 
                            size="1" 
                            className={getDateStatus(endDate).className}
                          >
                            {formatDate(endDate)}
                          </Text>
                        </Flex>
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={handleEndDateChange}
                        initialFocus
                      />
                    </Popover.Content>
                  </Popover.Root>
                )}
              </Flex>

              {/* Labels */}
              {card.labelsTags && card.labelsTags.length > 0 && (
                <Flex gap="1">
                  {card.labelsTags.slice(0, 2).map((label, index) => (
                    <Badge
                      key={`${label.value}-${index}`}
                      size="1"
                      style={{ backgroundColor: label.color + "20", color: label.color }}
                    >
                      {label.label}
                    </Badge>
                  ))}
                  {card.labelsTags.length > 2 && (
                    <Badge size="1" variant="soft" color="gray">
                      +{card.labelsTags.length - 2}
                    </Badge>
                  )}
                </Flex>
              )}

              {/* Assigned users */}
              {card.assignedTo && card.assignedTo.length > 0 && (
                <Flex className="-space-x-2">
                  {card.assignedTo.slice(0, 3).map((user, index) => (
                    <Avatar
                      key={user.id}
                      src={user.image}
                      name={user.name || "?"}
                      className="w-6 h-6 border-2 border-white"
                      style={{ zIndex: 3 - index }}
                    />
                  ))}
                  {card.assignedTo.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                      +{card.assignedTo.length - 3}
                    </div>
                  )}
                </Flex>
              )}

              {/* Actions menu */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger >
                  <IconButton
                    size="1"
                    variant="ghost"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EllipsisVertical size={14} />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={handleOpenDrawer}>
                    Edit Task
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={handleToggleCompleteClick}>
                    {card.completed ? "Mark Incomplete" : "Mark Complete"}
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item 
                    onClick={handleDeleteTask}
                    className="text-red-600"
                  >
                    Delete Task
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
          </Flex>

          {/* Subtasks */}
          {hasSubTasks && (
            <Collapsible.Content>
              <Box className="pl-8 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
                {card.subTasks?.map((subtask) => (
                  <Flex key={subtask.id} align="center" gap="2">
                    <Checkbox
                      checked={subtask.completed}
                      size="1"
                      // TODO: Add subtask toggle functionality
                    />
                    <Text 
                      size="2" 
                      className={cn(
                        subtask.completed && "line-through text-gray-500"
                      )}
                    >
                      {subtask.name}
                    </Text>
                  </Flex>
                ))}
                
                {totalSubTasks > 0 && (
                  <Text size="1" className="text-gray-500">
                    {completedSubTasks}/{totalSubTasks} completed
                  </Text>
                )}
              </Box>
            </Collapsible.Content>
          )}
        </Collapsible.Root>
      </Card>

      {state.type === "is-over" && state.closestEdge === "bottom" && (
        <ListTaskCardShadow dragging={state.dragging} />
      )}
    </Box>
  )
})

export function ListTaskCard({ 
  card, 
  columnId, 
  onUpdateTask, 
  onDeleteTask 
}: ListTaskCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)

  // Don't render if taskId is missing
  if (!card.taskId) {
    console.error("Task card missing taskId:", card)
    return null
  }

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    return combine(
      draggable({
        element: inner,
        getInitialData: ({ element }) =>
          getCardData({
            card,
            columnId,
            rect: element.getBoundingClientRect(),
          }),
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data
          invariant(isCardData(data))
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: inner,
              input: location.current.input,
            }),
            render({ container }) {
              setState({
                type: "preview",
                container,
                dragging: inner.getBoundingClientRect(),
              })
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
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ card, columnId })
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          })
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data) || source.data.card.taskId === card.taskId) {
            return
          }
          
          const closestEdge = extractClosestEdge(self.data)
          if (!closestEdge) return

          setState({
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          })
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data) || source.data.card.taskId === card.taskId) {
            return
          }
          
          const closestEdge = extractClosestEdge(self.data)
          if (!closestEdge) return

          const proposed: TCardState = {
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          }
          
          setState((current) => {
            if (isShallowEqual(proposed, current)) {
              return current
            }
            return proposed
          })
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) return
          
          if (source.data.card.taskId === card.taskId) {
            setState({ type: "is-dragging-and-left-self" })
            return
          }
          setState(idle)
        },
        onDrop() {
          setState(idle)
        },
      })
    )
  }, [card, columnId])

  return (
    <>
      <TaskCardDisplay
        card={card}
        state={state}
        outerRef={outerRef}
        innerRef={innerRef}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
      {state.type === "preview" &&
        createPortal(
          <TaskCardDisplay 
            card={card} 
            state={state} 
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />,
          state.container
        )}
    </>
  )
}