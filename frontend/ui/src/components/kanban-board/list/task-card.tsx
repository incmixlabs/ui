// components/list/task-card.tsx - Updated with TaskActionsMenu
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
} from "lucide-react"
import {
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
  type KanbanTask,
  type TaskDataSchema,
  type ListColumn,
} from "@incmix/store"
import { Card } from "@incmix/ui/card"
import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import { ModalPresets } from "../shared/confirmation-modal"
import { cn } from "@utils"
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Text,
  Badge,
  Avatar,
} from "@incmix/ui"
import { TaskActionsMenu } from "./task-actions-menu"


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
  columns: ListColumn[]
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
  columns,
  state,
  outerRef,
  innerRef,
  onUpdateTask,
  onDeleteTask,
}: {
  card: KanbanTask
  columns: ListColumn[]
  state: TCardState
  outerRef?: React.MutableRefObject<HTMLDivElement | null>
  innerRef?: React.MutableRefObject<HTMLDivElement | null>
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
}) {
  const { handleDrawerOpen } = useKanbanDrawer()
  const [isExpanded, setIsExpanded] = useState(false)

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

  const handleUpdateTask = useCallback(async (updates: Partial<TaskDataSchema>) => {
    if (!card.taskId) {
      console.error("Task ID is missing")
      return
    }

    try {
      await onUpdateTask(card.taskId, updates)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }, [card.taskId, onUpdateTask])

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  // Opens the delete confirmation modal
  const handleDeleteTask = useCallback(async () => {
    if (!card.taskId) {
      console.error("Task ID is missing")
      return
    }
    setShowDeleteConfirmation(true)
  }, [card.taskId])

  // Confirm task deletion handler
  const confirmDeleteTask = useCallback(async () => {
    try {
      await onDeleteTask(card.taskId)
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }, [card.taskId, onDeleteTask])

  const handleDuplicateTask = useCallback(async () => {
    // Implementation for task duplication could be added here
    console.log("Duplicate task functionality not implemented yet")
  }, [])

  const handleOpenDrawer = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    
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
    <>
      {/* Delete Task Confirmation Modal */}
      {ModalPresets.deleteTask({
        isOpen: showDeleteConfirmation,
        onOpenChange: setShowDeleteConfirmation,
        taskName: card.name,
        onConfirm: confirmDeleteTask
      })}
      
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
                  <button className="p-0 bg-transparent border-none cursor-pointer">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </Collapsible.Trigger>
              )}

              <Checkbox
                checked={card.completed}
                onCheckedChange={handleToggleComplete}
                className="flex-shrink-0"
              />

              <Heading
                size="3"
                className={cn(
                  "flex-1 font-medium cursor-pointer hover:text-blue-600 transition-colors",
                  card.completed && "line-through text-gray-500"
                )}
                onClick={handleOpenDrawer}
              >
                {card.name || "Untitled Task"}
              </Heading>
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
                {card.startDate && (
                  <Flex align="center" gap="1">
                    <CalendarDays size={12} className="text-green-600" />
                    <Text size="1" className="text-green-600">
                      {formatDate(new Date(card.startDate))}
                    </Text>
                  </Flex>
                )}

                {card.endDate && (
                  <Flex align="center" gap="1">
                    <CalendarDays size={12} />
                    <Text 
                      size="1" 
                      className={getDateStatus(new Date(card.endDate)).className}
                    >
                      {formatDate(new Date(card.endDate))}
                    </Text>
                  </Flex>
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

              {/* Task Actions Menu - replaces the old dropdown */}
              <TaskActionsMenu
                task={card}
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
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onDuplicateTask={handleDuplicateTask}
                mode="existing-task"
              />
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
    </>
  )
})

export function ListTaskCard({ 
  card, 
  columnId, 
  columns,
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
        columns={columns}
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
            columns={columns}
            state={state} 
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />,
          state.container
        )}
    </>
  )
}