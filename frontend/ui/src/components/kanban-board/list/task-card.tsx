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
import { isShallowEqual } from "@incmix/utils/objects"
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Link,
  ExternalLink,
  Figma,
} from "lucide-react"
import {
  type TaskDataSchema,
  } from "@incmix/utils/schema"
import {
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
  type KanbanTask,
} from "../types"
import { Card } from "@incmix/ui/card"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
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
import { ListColumn } from "../hooks/use-list-view"

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
  statusId: string
  columns: ListColumn[]
  priorityLabels?: { id: string; name: string; color: string; type: string }[]
  onUpdateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
  onTaskSelect?: (id: string, selected: boolean) => void
  isSelected?: boolean
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
  priorityLabels,
  state,
  outerRef,
  innerRef,
  onUpdateTask,
  onDeleteTask,
  onTaskSelect,
  isSelected,
}: {
  card: KanbanTask
  columns: ListColumn[]
  priorityLabels?: { id: string; name: string; color: string; type: string }[]
  state: TCardState
  outerRef?: React.MutableRefObject<HTMLDivElement | null>
  innerRef?: React.MutableRefObject<HTMLDivElement | null>
  onUpdateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
  onTaskSelect?: (id: string, selected: boolean) => void
  isSelected?: boolean
}) {
  const { handleDrawerOpen } = useKanbanDrawer()
  const [isExpanded, setIsExpanded] = useState(false)

  // Handle task selection instead of completion toggle
  const handleTaskSelect = useCallback((checked: boolean | string) => {
    // Ensure id exists
    if (!card.id) {
      console.error("Task ID is missing")
      return
    }

    // Call the selection handler from props
    if (onTaskSelect) {
      onTaskSelect(card.id, typeof checked === 'boolean' ? checked : checked === 'indeterminate' ? false : true)
    }
  }, [card.id, onTaskSelect])

  const handleUpdateTask = useCallback(async (id: string, updates: Partial<TaskDataSchema>) => {
    if (!onUpdateTask) return
    
    try {
      await onUpdateTask(id, updates)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }, [onUpdateTask])

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  // Opens the delete confirmation modal
  const handleDeleteTask = useCallback(async () => {
    if (!card.id) {
      console.error("Task ID is missing")
      return
    }
    setShowDeleteConfirmation(true)
  }, [card.id])

  // Confirm task deletion handler
  const confirmDeleteTask = useCallback(async () => {
    try {
      // Ensure id exists
      if (!card.id) {
        console.error("Task ID is missing")
        return
      }
      
      await onDeleteTask(card.id)
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }, [card.id, onDeleteTask])

  const handleDuplicateTask = useCallback(async () => {
    // Implementation for task duplication could be added here
    console.log("Duplicate task functionality not implemented yet")
  }, [])

  const handleOpenDrawer = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()

    if (!card.id) {
      console.error("Task ID is missing")
      return
    }

    handleDrawerOpen(card.id)
  }, [card.id, handleDrawerOpen])

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

  // Don't render if id is missing
  if (!card.id) {
    console.error("Task card missing id:", card)
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
                checked={isSelected || false}
                onCheckedChange={handleTaskSelect}
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
              {/* Priority Badge - Updated for new schema using priorityId */}
              {card.priorityId && priorityLabels?.length && (
                <Badge
                  color={(() => {
                    // Find the priority label by its ID
                    const priorityLabel = priorityLabels.find(label => label.id === card.priorityId);
                    
                    // Use a priority-to-color mapping with valid Radix UI colors
                    // These colors conform to ExtendedColorType
                    const colorMap: Record<string, "red" | "orange" | "blue" | "green" | "gray"> = {
                      urgent: "red",
                      high: "orange",
                      medium: "blue",
                      low: "green"
                    };
                    
                    // Get normalized priority key from label name
                    const priorityKey = priorityLabel?.name.toLowerCase() || "medium";
                    
                    // First try exact match
                    if (Object.prototype.hasOwnProperty.call(colorMap, priorityKey)) {
                      return colorMap[priorityKey as keyof typeof colorMap];
                    }
                    
                    // Then try substring match
                    for (const [key, color] of Object.entries(colorMap)) {
                      if (priorityKey.includes(key)) {
                        return color;
                      }
                    }
                    
                    // Default fallback
                    return "gray";
                  })()}
                  variant="soft"
                  size="1"
                >
                  {(() => {
                    // Find the priority label by its ID
                    const priorityLabel = priorityLabels.find(label => label.id === card.priorityId);
                    return priorityLabel?.name || "Medium";
                  })()}
                </Badge>
              )}

              {/* Reference URLs */}
              {card.refUrls && card.refUrls.length > 0 && (
                <Flex align="center" gap="2" className="text-xs">
                  {(() => {
                    const figmaUrls = card.refUrls.filter((url: { type: string }) => url.type === 'figma').length
                    const taskUrls = card.refUrls.filter((url: { type: string }) => url.type === 'task').length
                    const externalUrls = card.refUrls.filter((url: { type: string }) => url.type === 'external').length

                    return (
                      <Flex align="center" gap="2">
                        {figmaUrls > 0 && (
                          <Flex align="center" gap="1" title={`${figmaUrls} Figma link${figmaUrls > 1 ? 's' : ''}`}>
                            <Figma size={12} className="text-purple-500" />
                            {figmaUrls > 1 && <Text size="1" className="font-medium">{figmaUrls}</Text>}
                          </Flex>
                        )}
                        {taskUrls > 0 && (
                          <Flex align="center" gap="1" title={`${taskUrls} Task link${taskUrls > 1 ? 's' : ''}`}>
                            <Link size={12} className="text-blue-500" />
                            {taskUrls > 1 && <Text size="1" className="font-medium">{taskUrls}</Text>}
                          </Flex>
                        )}
                        {externalUrls > 0 && (
                          <Flex align="center" gap="1" title={`${externalUrls} External link${externalUrls > 1 ? 's' : ''}`}>
                            <ExternalLink size={12} className="text-green-500" />
                            {externalUrls > 1 && <Text size="1" className="font-medium">{externalUrls}</Text>}
                          </Flex>
                        )}
                      </Flex>
                    )
                  })()}
                </Flex>
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
                      src={user.avatar}
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

export const ListTaskCard = memo(function ListTaskCard({
  card,
  statusId,
  columns,
  priorityLabels,
  onUpdateTask,
  onDeleteTask,
  onTaskSelect,
  isSelected
}: ListTaskCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)

  // Don't render if id is missing
  if (!card.id) {
    console.error("Task card missing id:", card)
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
            statusId,
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
          const data = getCardDropTargetData({ card, statusId })
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          })
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data) || source.data.card.id === card.id) {
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
          if (!isCardData(source.data) || source.data.card.id === card.id) {
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
  }, [card, statusId])

  return (
    <>
      <TaskCardDisplay
          card={card}
          columns={columns}
          priorityLabels={priorityLabels}
          state={state}
          outerRef={outerRef}
          innerRef={innerRef}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onTaskSelect={onTaskSelect}
          isSelected={isSelected}
        />
      {state.type === "preview" &&
        createPortal(
          <TaskCardDisplay
            card={card}
            columns={columns}
            priorityLabels={priorityLabels}
            state={state}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onTaskSelect={onTaskSelect}
            isSelected={isSelected}
          />,
          state.container
        )}
    </>
  )
})
