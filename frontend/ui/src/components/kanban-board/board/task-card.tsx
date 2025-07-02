// components/board/task-card.tsx - Updated for new schema
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import React, { useCallback, useEffect, useRef, useState, memo, type MutableRefObject } from "react"
import { createPortal } from "react-dom"
import invariant from "tiny-invariant"
// Define necessary types for drag-and-drop functionality
type ElementDragPayload = any
const canUseDOM = typeof window !== 'undefined' && !!window.document && !!window.document.createElement
// Define types for drag and drop props
type DraggableProps = Record<string, any>
type DragHandleProps = Record<string, any>
// Type for card data with closestEdge
interface TCardDataWithEdge extends ReturnType<typeof getCardData> {
  closestEdge?: Edge
}

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"

import {
  CalendarDays,
  MessageSquareText,
  Paperclip,
  MoreVertical,
  Edit3,
  Trash2,
  CheckSquare
} from "lucide-react"

import { isShallowEqual } from "@incmix/utils/objects"
import { isSafari } from "@utils/browser"
import { IconButton,  DropdownMenu,
  Box,
  Flex,
  Heading,
  Text,
  Badge, } from "@base"
import  {
  isCardData,
  isDraggingACard,
  getCardData,
  KanbanTask,
  getCardDropTargetData
} from "../types"

import { Card } from "@incmix/ui/card"
import { cn } from "@utils"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { ModalPresets } from "../shared/confirmation-modal"
import {
  TaskDataSchema } from "@incmix/utils/schema"
import { RefUrlSummary } from "../shared/ref-url-summary"
import { getPriorityInfo } from "../priority-config"

type TCardState =
  | { type: "idle" }
  | { type: "is-dragging" }
  | { type: "is-dragging-and-left-self" }
  | { type: "is-over"; dragging: DOMRect; closestEdge: Edge }
  | { type: "preview"; container: HTMLElement; dragging: DOMRect }

const idle: TCardState = { type: "idle" }

const innerStyles: { [Key in TCardState["type"]]?: string } = {
  idle: "hover:shadow-md hover:scale-[1.01] transition-all duration-200",
  "is-dragging": "opacity-40 cursor-grabbing scale-105 shadow-xl",
}

const outerStyles: { [Key in TCardState["type"]]?: string } = {
  "is-dragging": "opacity-70",
  "is-dragging-and-left-self": "hidden",
}

export const TaskCardShadow = memo(function TaskCardShadow({
  dragging
}: {
  dragging: DOMRect
}) {
  return (
    <div
      className="flex-shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900 border-2 border-dashed border-blue-300 dark:border-blue-700 transition-all duration-200"
      style={{ height: Math.max(dragging.height, 100) }}
    />
  )
})

export const TaskCardDisplay = memo(function TaskCardDisplay({
  card,
  state,
  innerRef,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen
}: {
  card: KanbanTask
  state: TCardState
  innerRef?: MutableRefObject<HTMLDivElement | null>
  onUpdateTask?: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask?: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
}) {
  const { handleDrawerOpen } = useKanbanDrawer()

  const handleTaskClick = useCallback((e: React.MouseEvent) => {
    // Don't open task if clicking on dropdown or other interactive elements
    if (
      e.target instanceof Element &&
      (e.target.closest('[data-no-drawer]') ||
        e.target.closest('[role="menuitem"]'))
    ) {
      return
    }

    // Ensure card.id exists before using it
    if (!card.id) return
    
    if (onTaskOpen) {
      onTaskOpen(card.id)
    } else {
      handleDrawerOpen(card.id)
    }
  }, [card.id, handleDrawerOpen, onTaskOpen])

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = useCallback(() => {
    setShowDeleteConfirmation(true)
  }, [card.id])

  // Confirm task deletion handler
  const confirmDelete = useCallback(() => {
    if (!onDeleteTask || !card.id) return

    setIsDeleting(true)
    onDeleteTask(card.id)
      .then(() => {
        setIsDeleting(false)
        setShowDeleteConfirmation(false)
      })
      .catch((err) => {
        setIsDeleting(false)
        console.error("Error deleting task:", err)
        // toast({
        //   title: "Delete failed",
        //   description: "Could not delete task.",
        //   variant: "destructive",
        // })
      })
  }, [card.id, onDeleteTask])

  const handleToggleCompleted = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!onUpdateTask || !card.id) return

      // setIsUpdating(true)
      onUpdateTask(card.id, { completed: !card.completed })
        .then(() => {
          // setIsUpdating(false)
        })
        .catch((err) => {
          // setIsUpdating(false)
          console.error("Error updating task completion status:", err)
          // toast({
          //   title: "Update failed",
          //   description: "Could not update task completion status.",
          //   variant: "destructive",
          // })
        })
    },
    [card.completed, card.id, onUpdateTask]
  )

  const handleOpenTaskDetails = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (onTaskOpen && card.id) {
      onTaskOpen(card.id)
    } else if (card.id) {
      handleDrawerOpen(card.id)
    }
  }, [card.id, handleDrawerOpen, onTaskOpen])
  
  // Handle task actions
  const handleEdit = useCallback(() => {
    if (onTaskOpen && card.id) {
      onTaskOpen(card.id)
    } else if (card.id) {
      handleDrawerOpen(card.id)
    }
  }, [card.id, handleDrawerOpen, onTaskOpen])

  // Using the shared priority configuration from priority-config.ts

  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return { text: "", className: "" }

    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = date.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays < 0) {
        return {
          text: `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} overdue`,
          className: "text-red-600 bg-red-50 border-red-200"
        }
      } else if (diffDays === 0) {
        return {
          text: "Due today",
          className: "text-orange-600 bg-orange-50 border-orange-200"
        }
      } else if (diffDays === 1) {
        return {
          text: "Due tomorrow",
          className: "text-yellow-600 bg-yellow-50 border-yellow-200"
        }
      } else if (diffDays <= 7) {
        return {
          text: `Due in ${diffDays} days`,
          className: "text-blue-600 bg-blue-50 border-blue-200"
        }
      }

      return {
        text: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        className: "text-gray-600 bg-gray-50 border-gray-200"
      }
    } catch {
      return { text: "", className: "" }
    }
  }, [])

  const completedSubTasks = card.subTasks?.filter(st => st.completed).length || 0
  const totalSubTasks = card.subTasks?.length || 0
  const progressPercentage = totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0

  const priorityInfo = getPriorityInfo(card.priorityId)
  const PriorityIcon = priorityInfo.icon
  const dueDateInfo = formatDate(card.startDate ? String(card.startDate) : undefined)

  return (
    <>
      {/* Delete Task Confirmation Modal */}
      {ModalPresets.deleteTask({
        isOpen: showDeleteConfirmation,
        onOpenChange: setShowDeleteConfirmation,
        onConfirm: confirmDelete,
        taskName: card.name,
        isLoading: isDeleting,
      })}

      <Box
        onClick={handleTaskClick}
        onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Space") {
          e.preventDefault()
          handleTaskClick(e as any)
        }
      }}
      className={cn("flex flex-shrink-0 flex-col gap-1 p-1", outerStyles[state.type] || "")}
      data-task-id={card.id}
    >
      {/* Drop indicator above */}
      {state.type === "is-over" && state.closestEdge === "top" ? (
        <TaskCardShadow dragging={state.dragging} />
      ) : null}

      <Card
        className={cn(
          "relative cursor-pointer p-3 space-y-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group",
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
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }
            : undefined
        }
      >
        {/* Task Header with Priority and Actions */}
        <Flex justify="between" align="start" className="gap-2 -mt-1">
          <Flex align="center" gap="2" className="flex-1 min-w-0">
            {/* Priority indicator */}
            {card.priorityId && (
              <Badge
                size="1"
                color="gray"
                variant="soft"
                className={`px-2 py-0.5 ${getPriorityInfo(card.priorityId).color}`}
              >
                {getPriorityInfo(card.priorityId).label}
              </Badge>
            )}

            {/* Completion status */}
            {card.completed && (
              <Badge color="green" size="1" variant="solid" className="flex-shrink-0">
                Done
              </Badge>
            )}
          </Flex>

          {/* Actions Menu */}
          {state.type !== "preview" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton
                  size="1"
                  variant="ghost"
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical size={14} />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item onClick={handleEdit}>
                  <Edit3 size={12} />
                  Edit Task
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={(e) => handleToggleCompleted(e as unknown as React.MouseEvent<HTMLButtonElement>)}>
                  <CheckSquare size={12} />
                  {card.completed ? "Mark Incomplete" : "Mark Complete"}
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={handleDelete} className="text-red-600">
                  <Trash2 size={12} />
                  Delete Task
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </Flex>

        {/* Task Title */}
        <Heading
          as="h4"
          size="3"
          className={cn(
            "font-medium line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight",
            card.completed && "line-through text-gray-500"
          )}
        >
          {card.name}
        </Heading>

        {/* Task Description */}
        {card.description && (
          <Text className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {card.description}
          </Text>
        )}

        {/* Due Date */}
        {dueDateInfo.text && (
          <Flex align="center" gap="1">
            <CalendarDays size={12} />
            <Text
              size="1"
              className={cn("px-2 py-1 rounded-md text-xs border", dueDateInfo.className)}
            >
              {dueDateInfo.text}
            </Text>
          </Flex>
        )}

        {/* Labels */}
        {card.labelsTags && card.labelsTags.length > 0 && (
          <Flex gap="1" wrap="wrap">
            {card.labelsTags.slice(0, 3).map((label, index) => (
              <Badge
                key={`${label.value}-${index}`}
                size="1"
                variant="soft"
                style={{ backgroundColor: label.color + "20", color: label.color }}
                className="text-xs border"
              >
                {label.label}
              </Badge>
            ))}
            {card.labelsTags.length > 3 && (
              <Badge size="1" variant="soft" color="gray" className="text-xs">
                +{card.labelsTags.length - 3} more
              </Badge>
            )}
          </Flex>
        )}

        {/* Subtasks Progress */}
        {totalSubTasks > 0 && (
          <Box className="space-y-2">
            <Flex align="center" justify="between">
              <Flex align="center" gap="1">
                <CheckSquare size={12} className="text-gray-500" />
                <Text size="1" className="text-gray-600 dark:text-gray-400 font-medium">
                  {completedSubTasks}/{totalSubTasks} subtasks
                </Text>
              </Flex>
              <Text size="1" className="text-gray-500 font-medium">
                {Math.round(progressPercentage)}%
              </Text>
            </Flex>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  progressPercentage === 100 ? "bg-green-500" : "bg-blue-500"
                )}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </Box>
        )}

        {/* Footer with meta information */}
        <Flex align="center" justify="between" className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <Flex align="center" gap="3">
            {/* Reference URLs */}
            <RefUrlSummary refUrls={card.refUrls} className="text-gray-500" />

            {/* Attachments */}
            {card.attachments && card.attachments.length > 0 && (
              <Flex align="center" gap="1" className="text-gray-500">
                <Paperclip size={12} />
                <Text size="1" className="font-medium">{card.attachments.length}</Text>
              </Flex>
            )}

            {/* Comments count */}
            {card.comments && card.comments.length > 0 && (
              <div className="flex items-center gap-1 text-gray-500" title="Comments">
                <MessageSquareText className="w-3.5 h-3.5" />
                <span className="text-xs">{card.comments.length}</span>
              </div>
            )}
          </Flex>

          {/* Assigned users */}
          {card.assignedTo && card.assignedTo.length > 0 && (
            <Flex align="center" className="-space-x-1">
              {card.assignedTo.slice(0, 3).map((member, index) => (
                <div
                  key={member.id}
                  className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center border-2 border-white dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300"
                  style={{ zIndex: 3 - index }}
                  title={member.name}
                >
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
              ))}
              {card.assignedTo.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                  +{card.assignedTo.length - 3}
                </div>
              )}
            </Flex>
          )}
        </Flex>
      </Card>

      {/* Drop indicator below */}
      {state.type === "is-over" && state.closestEdge === "bottom" ? (
        <TaskCardShadow dragging={state.dragging} />
      ) : null}
    </Box>
    </>
  )
})

export function TaskCard({
  card,
  statusId,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen,
  provided,
}: {
  card: KanbanTask
  statusId: string
  onUpdateTask?: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask?: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
  provided?: {
    draggableProps: DraggableProps
    dragHandleProps?: DragHandleProps
  }
}) {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)

  useEffect(() => {
    // Safety check to prevent errors with missing refs
    if (!canUseDOM || !innerRef.current) return undefined

    return combine(
      draggable({
        element: innerRef.current as HTMLDivElement,
        getInitialData: ({ element }) => {
          invariant(element instanceof HTMLElement)
          const rect = element.getBoundingClientRect()
          return getCardData({ card, statusId, rect })
        },
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data
          invariant(isCardData(data))
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: innerRef.current as HTMLDivElement,
              input: location.current?.input,
            }),
            render({ container }) {
              setState({
                type: "preview",
                container,
                dragging: innerRef.current ? innerRef.current.getBoundingClientRect() : new DOMRect(),
              })
            },
          })
        },
        onDragStart() {
          setState({ type: "is-dragging" })
        },
        // Simplified drag handling without using 'self' property
        onDrag({ source }) {
          if (!isCardData(source.data)) return
          // Check id instead of taskId for the new schema
          if (source.data.card.id === card.id) return
          
          // Get edge information from the source data
          const dataWithEdge = source.data as TCardDataWithEdge
          const closestEdge = dataWithEdge.closestEdge || 'bottom'

          setState({
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          })
        },
        onDrop() {
          setState(idle)
        },
      }),
      dropTargetForElements({
        element: innerRef.current as unknown as Element,
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ card, statusId })
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          })
        },
        onDragEnter({ source }) {
          if (!isCardData(source.data)) return
          if (source.data.card.id === card.id) return

          // Get edge information from the source data
          const dataWithEdge = source.data as TCardDataWithEdge
          const closestEdge = dataWithEdge.closestEdge || 'bottom'

          setState({
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          })
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) return
          // Check id instead of taskId for the new schema
          if (source.data.card.id === card.id) return

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

          if (source.data.card.id === card.id) {
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
  }, [card.id, statusId])

  return (
    <div className="group">
      <TaskCardDisplay
        card={card}
        state={state}
        innerRef={innerRef}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onTaskOpen={onTaskOpen}
      />
      {state.type === "preview"
        ? createPortal(
            <TaskCardDisplay
              state={state}
              card={card}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onTaskOpen={onTaskOpen}
            />,
            state.container
          )
        : null}
    </div>
  );
}

export default TaskCard;
