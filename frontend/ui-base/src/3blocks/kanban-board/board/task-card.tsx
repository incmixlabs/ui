// components/board/task-card.tsx - Updated for new schema
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import {
  type MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import invariant from "tiny-invariant"
// Define necessary types for drag-and-drop functionality
// Using a more specific type for ElementDragPayload instead of 'any'
const canUseDOM =
  typeof window !== "undefined" &&
  !!window.document &&
  !!window.document.createElement
// Define types for drag and drop props with improved type safety
type DraggableProps = Record<string, unknown>
type DragHandleProps = Record<string, unknown>
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

import { CheckSquare, Edit3 } from "lucide-react"

import { Badge, Box, DropdownMenu, Flex, IconButton, Text } from "@/base"
import { toast } from "@/base"
import { isSafari } from "@/utils/browser"
import { isShallowEqual } from "@incmix/utils/objects"
import {
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
} from "../types"
import type { KanbanTask } from "../types"

import { Heading, Icon } from "@/base"
import { Card } from "@/base/card"
import { cn } from "@/utils/cn"
import { useAppearanceStore } from "@incmix/store"
import type { TaskDataSchema } from "@incmix/utils/schema"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { getPriorityConfig, getPriorityInfo } from "../priority-config"
import type { PriorityLabel } from "../priority-config"
import { ModalPresets } from "../shared/confirmation-modal"
import { RefUrlSummary } from "../shared/ref-url-summary"

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
  dragging,
}: {
  dragging: DOMRect
}) {
  return (
    <div
      className="flex-shrink-0 rounded-lg border-2 border-blue-300 border-dashed bg-blue-100 transition-all duration-200 dark:border-blue-700 dark:bg-blue-900"
      style={{ height: Math.max(dragging.height, 100) }}
    />
  )
})

export const TaskCardDisplay = memo(function TaskCardDisplay({
  card,
  state,
  innerRef,
  priorityLabels,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen,
}: {
  card: KanbanTask
  state: TCardState
  innerRef?: MutableRefObject<HTMLDivElement | null>
  priorityLabels?: PriorityLabel[] // Array of priority labels
  onUpdateTask?: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  onDeleteTask?: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
}) {
  const { appearance } = useAppearanceStore()
  const { handleDrawerOpen } = useKanbanDrawer()

  const handleTaskClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't open task if clicking on dropdown or other interactive elements
      if (
        e.target instanceof Element &&
        (e.target.closest("[data-no-drawer]") ||
          e.target.closest('[role="menuitem"]'))
      ) {
        return
      }

      // Ensure card.id exists before using it
      if (!card.id) return

      // Simple direct approach - just open the drawer
      console.log("Opening task drawer for:", card.id)
      handleDrawerOpen(card.id)

      // If onTaskOpen exists, call it after handleDrawerOpen
      if (onTaskOpen && card.id) {
        onTaskOpen(card.id)
      }
    },
    [card.id, handleDrawerOpen, onTaskOpen]
  )

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
        toast.error("Could not delete task. Please try again.", {
          duration: 5000,
        })
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
          toast.error(
            "Could not update task completion status. Please try again.",
            {
              duration: 5000,
            }
          )
        })
    },
    [card.completed, card.id, onUpdateTask]
  )

  const _handleOpenTaskDetails = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (onTaskOpen && card.id) {
        onTaskOpen(card.id)
      } else if (card.id) {
        handleDrawerOpen(card.id)
      }
    },
    [card.id, handleDrawerOpen, onTaskOpen]
  )

  // Handle task actions
  const handleEdit = useCallback(() => {
    if (onTaskOpen && card.id) {
      onTaskOpen(card.id)
    } else if (card.id) {
      handleDrawerOpen(card.id)
    }
  }, [card.id, handleDrawerOpen, onTaskOpen])

  // Using the shared priority configuration from priority-config.ts - will be updated with dynamic labels
  // Note: The TaskCard should receive priorityLabels from its parent to avoid hardcoded values

  const formatDate = useCallback((date?: Date) => {
    if (!date) return { text: "", className: "" }

    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} overdue`,
        className: "text-red-600 bg-red-50 border-red-200",
      }
    }
    if (diffDays === 0) {
      return {
        text: "Due today",
        className: "text-orange-600 bg-orange-50 border-orange-200",
      }
    }
    if (diffDays === 1) {
      return {
        text: "Due tomorrow",
        className: "text-yellow-600 bg-yellow-50 border-yellow-200",
      }
    }
    if (diffDays <= 7) {
      return {
        text: `Due in ${diffDays} days`,
        className: "text-blue-600 bg-blue-50 border-blue-200",
      }
    }

    return {
      text: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      className: "text-gray-600 bg-gray-50 border-gray-200",
    }
  }, [])

  const completedSubTasks =
    card.subTasks?.filter((st) => st.completed).length || 0
  const totalSubTasks = card.subTasks?.length || 0
  const progressPercentage =
    totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0

  // Use new getPriorityConfig function which works with priorityLabels
  const priorityInfo = getPriorityConfig(card.priorityId, priorityLabels)
  const _PriorityIcon = priorityInfo.icon
  const dueDateInfo = formatDate(
    typeof card.startDate === "number" ? new Date(card.startDate) : undefined
  )

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
            handleTaskClick(e as unknown as React.MouseEvent)
          }
        }}
        className={cn(
          "flex flex-shrink-0 flex-col gap-1 p-1",
          outerStyles[state.type] || ""
        )}
        data-task-id={card.id}
      >
        {/* Drop indicator above */}
        {state.type === "is-over" && state.closestEdge === "top" ? (
          <TaskCardShadow dragging={state.dragging} />
        ) : null}

        <Card.Root
          className={cn(
            "group relative cursor-pointer space-y-3 border border-gray-3 bg-gray-1 p-3",
            innerStyles[state.type] || "",
            card.completed && "opacity-75"
          )}
          ref={innerRef}
          style={
            state.type === "preview"
              ? {
                  width: state.dragging.width,
                  height: state.dragging.height,
                  backgroundColor: appearance === "dark" ? "black" : "white",
                  // opacity: 0.95,
                  border: "2px solid #3b82f6",
                  transform: !isSafari() ? "rotate(1deg)" : undefined,
                  // boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }
              : undefined
          }
        >
          {/* Task Header with Priority and Actions */}
          <Flex justify="between" align="start" className="-mt-1 gap-2">
            <Flex align="center" gap="2" className="min-w-0 flex-1">
              {/* Priority indicator */}
              {card.priorityId && (
                <Badge
                  size="1"
                  color="gray"
                  variant="soft"
                  className={`px-2 py-0.5 ${priorityInfo.color}`}
                >
                  {priorityInfo.label}
                </Badge>
              )}

              {/* Completion status */}
              {card.completed && (
                <Badge
                  color="green"
                  size="1"
                  variant="solid"
                  className="flex-shrink-0"
                >
                  Done
                </Badge>
              )}
            </Flex>
            <Flex align="center" gap="2">
              {/* Due Date */}
              {dueDateInfo.text && (
                <Flex align="center" gap="1">
                  <Icon name="CalendarDays" />
                  <Text
                    size="2"
                    className={cn(
                      "rounded-md px-0.5 py-0.5"
                      // dueDateInfo.className,
                    )}
                  >
                    {dueDateInfo.text}
                  </Text>
                </Flex>
              )}
              {/* Actions Menu */}
              {state.type !== "preview" && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                      className=""
                    >
                      <Icon name="EllipsisVertical" />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={handleEdit}>
                      <Icon name="SquarePen" />
                      Edit Task
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={(e) =>
                        handleToggleCompleted(
                          e as unknown as React.MouseEvent<HTMLButtonElement>
                        )
                      }
                    >
                      <Icon name="SquareCheck" />
                      {card.completed ? "Mark Incomplete" : "Mark Complete"}
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={handleDelete} color="red">
                      <Icon name="Trash2" />
                      Delete Task
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </Flex>
          </Flex>
          {card.assignedTo && (
            <Flex align={"center"} gap={"1"}>
              {card.assignedTo.map((assignee) => {
                const colors = [
                  "bg-green-400",
                  "bg-yellow-400",
                  "bg-orange-400",
                  "bg-cyan-400",
                  "bg-red-400",
                ]
                // Create a deterministic color based on the assignee's name
                const nameSum = assignee.name
                  .split("")
                  .reduce((sum, char) => sum + char.charCodeAt(0), 0)
                const colorIndex = nameSum % colors.length
                const stableColor = colors[colorIndex]
                return (
                  <Text
                    key={assignee.name}
                    className={`flex h-1 w-6 items-center gap-1 rounded-full ${stableColor}`}
                  />
                )
              })}
            </Flex>
          )}
          {/* Task Title */}
          <Heading
            as="h4"
            size="3"
            className={cn(
              "line-clamp-2 font-medium leading-tight transition-colors",
              card.completed && "text-gray-11 line-through"
            )}
          >
            {card.name}
          </Heading>

          {/* Task Description */}
          {card.description && (
            <Text className="line-clamp-2 text-gray-600 text-sm leading-relaxed dark:text-gray-400">
              {card.description}
            </Text>
          )}

          {/* Labels */}
          {card.labelsTags && card.labelsTags.length > 0 && (
            <Flex gap="1" wrap="wrap">
              {card.labelsTags.slice(0, 3).map((label, index) => (
                <Badge
                  key={`${label.value}-${index}`}
                  size="1"
                  variant="soft"
                  style={{
                    backgroundColor: `${label.color}20`,
                    color: label.color,
                  }}
                  className="border text-xs"
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
                  <Icon name="SquareCheck" className="text-gray-11" />
                  <Text size="1" className="font-medium text-gray-11">
                    {completedSubTasks}/{totalSubTasks} subtasks
                  </Text>
                </Flex>
                <Text size="1" className="font-medium text-gray-11">
                  {Math.round(progressPercentage)}%
                </Text>
              </Flex>
              <div className="h-1.5 w-full rounded-full bg-gray-6">
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

          <Flex
            align={"center"}
            justify={"between"}
            className="w-full gap-2 py-1"
          >
            <Flex align={"center"} gap="4">
              {/* Reference URLs */}
              <RefUrlSummary refUrls={card.refUrls} className="text-gray-12" />

              {card.attachments && (
                <IconButton className="flex items-center gap-1 bg-transparent text-gray-700 dark:text-gray-200">
                  <Icon name="Paperclip" />
                  <Text>{card.attachments.length}</Text>
                </IconButton>
              )}
              <IconButton className="flex items-center gap-1 bg-transparent text-gray-700 dark:text-gray-200">
                <Icon name="MessageSquareText" />
                <Text>5</Text>
              </IconButton>
            </Flex>
            <Flex align={"center"} className="gap-2">
              {card.assignedTo && card.assignedTo.length > 0 && (
                <Flex align="center" className="-space-x-2">
                  {card.assignedTo.slice(0, 3).map((member, index) => (
                    <div
                      key={member.id}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-7 bg-gray-5 text-gray-11"
                      style={{ zIndex: 3 - index }}
                      title={member.name}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  ))}
                  {card.assignedTo.length > 3 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-7 bg-gray-3 font-medium text-gray-11 text-xs">
                      +{card.assignedTo.length - 3}
                    </div>
                  )}
                </Flex>
              )}
            </Flex>
          </Flex>
          {/* Assigned users */}
        </Card.Root>

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
  priorityLabels,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen,
}: {
  card: KanbanTask
  statusId: string
  priorityLabels?: PriorityLabel[] // Array of priority labels
  onUpdateTask?: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
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
                dragging: innerRef.current
                  ? innerRef.current.getBoundingClientRect()
                  : new DOMRect(),
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
          const closestEdge = dataWithEdge.closestEdge || "bottom"

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
          const closestEdge = dataWithEdge.closestEdge || "bottom"

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
        priorityLabels={priorityLabels}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onTaskOpen={onTaskOpen}
      />
      {state.type === "preview"
        ? createPortal(
            <TaskCardDisplay
              state={state}
              card={card}
              priorityLabels={priorityLabels}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onTaskOpen={onTaskOpen}
            />,
            state.container
          )
        : null}
    </div>
  )
}

export default TaskCard
