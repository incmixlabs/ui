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
  outerRef,
  innerRef,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen
}: {
  card: KanbanTask
  state: TCardState
  outerRef?: React.MutableRefObject<HTMLDivElement | null>
  innerRef?: MutableRefObject<HTMLDivElement | null>
  onUpdateTask?: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask?: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
}) {
  const { handleDrawerOpen } = useKanbanDrawer()

  const handleTaskClick = useCallback((e: React.MouseEvent) => {
    // Don't open task if clicking on dropdown or other interactive elements
    if ((e.target as HTMLElement).closest('button, [role="menuitem"]')) {
      return
    }

    if (state.type !== "is-dragging" && card.taskId) {
      if (onTaskOpen) {
        onTaskOpen(card.taskId)
      } else {
        handleDrawerOpen(card.taskId)
      }
    }
  }, [handleDrawerOpen, card.taskId, state.type, onTaskOpen])

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const handleDelete = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!onDeleteTask) return
    setShowDeleteConfirmation(true)
  }, [onDeleteTask])

  // Confirm task deletion handler
  const confirmDeleteTask = useCallback(async () => {
    if (!onDeleteTask || !card.taskId) return
    try {
      await onDeleteTask(card.taskId)
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }, [onDeleteTask, card.taskId])

  const handleToggleComplete = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!onUpdateTask || !card.taskId) return

    try {
      await onUpdateTask(card.taskId, { completed: !card.completed })
    } catch (error) {
      console.error("Failed to toggle task completion:", error)
    }
  }, [onUpdateTask, card.taskId, card.completed])

  const handleOpenTaskDetails = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (!card.taskId) return
    
    if (onTaskOpen) {
      onTaskOpen(card.taskId)
    } else {
      handleDrawerOpen(card.taskId)
    }
  }, [onTaskOpen, handleDrawerOpen, card.taskId])

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

  const priorityInfo = getPriorityInfo(card.priority)
  const PriorityIcon = priorityInfo.icon
  const dueDateInfo = formatDate(card.startDate)

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
        onClick={handleTaskClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Space") {
          e.preventDefault()
          handleTaskClick(e as any)
        }
      }}
      className={`flex flex-shrink-0 flex-col gap-1 p-1 ${outerStyles[state.type] || ""}`}
      data-task-id={card.taskId}
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
            {card.priority && card.priority !== "medium" && (
              <Badge
                color={priorityInfo.color}
                size="1"
                variant="soft"
                className="flex items-center gap-1 flex-shrink-0"
              >
                <PriorityIcon size={10} />
                {priorityInfo.label}
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
                <DropdownMenu.Item onClick={handleOpenTaskDetails}>
                  <Edit3 size={12} />
                  Edit Task
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleToggleComplete}>
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

            {/* Comments - Updated to use commentsCount */}
            {card.commentsCount !== undefined && card.commentsCount > 0 && (
              <Flex align="center" gap="1" className="text-gray-500">
                <MessageSquareText size={12} />
                <Text size="1" className="font-medium">{card.commentsCount}</Text>
              </Flex>
            )}
          </Flex>

          {/* Assigned users - Updated to use 'image' instead of 'avatar' */}
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

export const TaskCard = memo(function TaskCard({
  card,
  columnId,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen
}: {
  card: KanbanTask
  columnId: string
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
}) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    invariant(outer && inner)

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
          if (!isCardData(source.data)) return
          if (source.data.card.taskId === card.taskId) return

          const closestEdge = extractClosestEdge(self.data)
          if (!closestEdge) return

          setState({
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          })
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) return
          if (source.data.card.taskId === card.taskId) return

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
  }, [card.taskId, columnId])

  return (
    <div className="group">
      <TaskCardDisplay
        card={card}
        state={state}
        outerRef={outerRef}
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
  )
})
