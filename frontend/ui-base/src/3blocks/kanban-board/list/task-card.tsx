import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import React, {
  useCallback,
  useState,
  memo,
  useEffect,
  useRef,
  useMemo,
  useContext,
  createContext,
} from "react"
import { createPortal } from "react-dom"
import invariant from "tiny-invariant"

import { Badge, Box, Checkbox, Flex, IconButton, Text } from "@/base"
import { isShallowEqual } from "@incmix/utils/objects"
import type { TaskDataSchema } from "@incmix/utils/schema"
import { AvatarGroup } from "../../../2elements/avatar-group"
import { useKanban } from "../hooks/use-kanban-data"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import type { ListColumn } from "../hooks/use-list-view"
import { ModalPresets } from "../shared/confirmation-modal"
import { type RefUrl, TaskRefUrls } from "../shared/task-ref-urls"
import {
  type KanbanTask,
  getCardData,
  getCardDropTargetData,
  isCardData,
  isDraggingACard,
} from "../types"
import { getPriorityName, getPriorityStyles } from "../utils/priority-utils"
import { TaskActionsMenu } from "./task-actions-menu"

// Constants for DOM manipulation checks
const canUseDOM =
  typeof window !== "undefined" &&
  !!window.document &&
  !!window.document.createElement

// Type for card data with closestEdge
interface TCardDataWithEdge extends ReturnType<typeof getCardData> {
  closestEdge?: Edge
}

// Card state types for drag and drop operations
type TCardState =
  | { type: "idle" }
  | { type: "is-dragging" }
  | { type: "is-dragging-and-left-self" }
  | { type: "is-over"; dragging: DOMRect; closestEdge: Edge }
  | { type: "preview"; container: HTMLElement; dragging: DOMRect }

const idle: TCardState = { type: "idle" }

// Card style constants based on Figma design for both light and dark themes
const cardStyles = {
  base: "rounded-md transition-all duration-150",
  light: "bg-white border-b border-gray-4",
  dark: "dark:bg-gray-1 dark:border-b dark:border-gray-6",
  hover: "hover:bg-gray-2 dark:hover:bg-gray-2",
  selected: "bg-gray-3 dark:bg-gray-3",
  dragging: "opacity-40 cursor-grabbing shadow-sm",
  subtask: "pl-2", // Removed border-l and other styling to be handled separately
  noBorder: "!border-b-0", // New class to remove bottom border when needed
}

// Checkbox style constants for both light and dark themes
const checkboxStyles = {
  base: "rounded-md border-[1px] h-[18px] w-[18px] flex-shrink-0",
  unchecked: "border-gray-8 dark:border-gray-8",
  checked: "bg-blue-9 border-blue-9",
}

// Constants for consistent styling
const HOVER_VISIBLE_CLASSES =
  "opacity-0 group-hover:opacity-100 transition-opacity duration-150"
const SUBTASK_MARGIN_CLASS = "ml-8" // 32px equivalent
const HIDDEN_CLASS = "hidden"

interface ListTaskCardProps {
  card: KanbanTask
  statusId: string
  columns: ListColumn[]
  priorityLabels?: { id: string; name: string; color: string; type: string }[]
  onUpdateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
  onCreateTask: (
    statusId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  onDuplicateTask?: (id: string) => Promise<void>
  onTaskSelect?: (id: string, selected: boolean) => void
  isSelected?: boolean
  projectId?: string
}

// Shadow component for drag and drop indicators
export const TaskCardShadow = memo(function TaskCardShadow({
  dragging,
}: {
  dragging: DOMRect
}) {
  return (
    <div
      className="flex-shrink-0 rounded-lg border-2 border-blue-6 border-dashed bg-blue-3 transition-all duration-200 dark:border-blue-7 dark:bg-blue-9/25"
      style={{ height: Math.max(dragging.height, 50) }}
    />
  )
})

// Context for sharing expanded state across tasks
const ExpandedTasksContext = React.createContext<{
  expandedTasks: Record<string, boolean>
  setExpandedTasks: (tasks: Record<string, boolean>) => void
}>({
  expandedTasks: {},
  setExpandedTasks: () => {},
})

// Provider component to manage expanded state globally
export const ExpandedTasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>(
    {}
  )

  return (
    <ExpandedTasksContext.Provider value={{ expandedTasks, setExpandedTasks }}>
      {children}
    </ExpandedTasksContext.Provider>
  )
}

// Custom hook to access expanded tasks context
const useExpandedTasks = () => {
  return useContext(ExpandedTasksContext)
}

export const ListTaskCard = memo(function ListTaskCard({
  card,
  statusId,
  columns,
  priorityLabels,
  onUpdateTask,
  onDeleteTask,
  onCreateTask,
  onDuplicateTask,
  onTaskSelect,
  isSelected = false,
  projectId,
}: ListTaskCardProps) {
  const { handleDrawerOpen } = useKanbanDrawer()
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)
  // Access expanded state from context
  const { expandedTasks, setExpandedTasks } = useExpandedTasks()

  // Get expanded state for this task (default to true if not set)
  const isExpanded = card.id ? expandedTasks[card.id] !== false : true

  // Access kanban data to get the subtask functions
  const kanbanData = useKanban(projectId)

  // Check if the current task is a parent task (has subtasks)
  const hasChildTasks = useMemo(() => {
    if (!card.id) return false

    // Create a parent-to-children index once
    const childrenByParent = new Map<string, boolean>()
    kanbanData.columns.forEach((column) => {
      column.tasks.forEach((task: KanbanTask) => {
        if (task.parentTaskId) {
          childrenByParent.set(task.parentTaskId, true)
        }
      })
    })

    return childrenByParent.has(card.id)
  }, [card.id, kanbanData.columns])

  // Check if task is a subtask
  const isSubtask = useMemo(() => {
    return Boolean(card.isSubtask)
  }, [card.isSubtask])

  // Determine if we should remove the border (for parent-subtask relationships)
  const shouldRemoveBorder = useMemo(() => {
    // If this task is a parent (has children), remove its bottom border
    if (hasChildTasks) return true

    // If this task is a subtask but NOT the last subtask, remove its border
    // We need a border for the last subtask in a group
    if (isSubtask) {
      // Check if this is the last subtask for its parent
      const parentId = card.parentTaskId
      if (parentId) {
        // Get all tasks from all columns
        const allTasks: KanbanTask[] = []
        kanbanData.columns.forEach((column) => {
          allTasks.push(...column.tasks)
        })

        // Get all subtasks for this parent
        const siblingTasks = allTasks.filter(
          (task) => task.parentTaskId === parentId
        )

        // Sort by taskOrder to find the last one
        const sortedSiblings = [...siblingTasks].sort(
          (a, b) => (a.taskOrder ?? 0) - (b.taskOrder ?? 0)
        )

        // If this is the last subtask, keep the border
        if (
          sortedSiblings.length > 0 &&
          sortedSiblings[sortedSiblings.length - 1].id === card.id
        ) {
          return false // Keep the border
        }
        return true // Remove border for other subtasks
      }
    }

    return false
  }, [hasChildTasks, isSubtask, card.id, card.parentTaskId, kanbanData.columns])

  // Determine if a task should be visible based on parent collapsed state
  const isVisible = useMemo(() => {
    // Top-level tasks are always visible
    if (!isSubtask) return true

    // Subtasks are only visible if their parent is expanded
    // In a full implementation, we'd check if the parent task is expanded
    const parentId = card.parentTaskId
    if (!parentId) return true // Safety check

    // Check if parent is expanded
    return expandedTasks[parentId] !== false
  }, [isSubtask, card.parentTaskId, expandedTasks])

  // Handle task selection instead of completion toggle
  const handleTaskSelect = useCallback(
    (checked: boolean | string) => {
      // Ensure id exists
      if (!card.id) {
        console.error("Task ID is missing")
        return
      }

      // Call the selection handler from props
      if (onTaskSelect) {
        onTaskSelect(
          card.id,
          typeof checked === "boolean" ? checked : checked !== "indeterminate"
        )
      }
    },
    [card.id, onTaskSelect]
  )

  const _handleUpdateTask = useCallback(
    async (id: string, updates: Partial<TaskDataSchema>) => {
      if (!onUpdateTask) return

      try {
        await onUpdateTask(id, updates)
      } catch (error) {
        console.error("Failed to update task:", error)
      }
    },
    [onUpdateTask]
  )

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  // Kanban data is now accessed above

  // States for storing async validation results
  const [canIndent, setCanIndent] = useState<boolean>(false)
  const [canUnindent, setCanUnindent] = useState<boolean>(false)
  const [potentialParentId, _setPotentialParentId] = useState<string | null>(
    null
  )

  // Extract stable function references to prevent infinite re-renders
  const canTaskBeIndentedRef = useRef(kanbanData.canTaskBeIndented)
  const canTaskBeUnindentedRef = useRef(kanbanData.canTaskBeUnindented)

  // Update refs when kanbanData changes
  useEffect(() => {
    canTaskBeIndentedRef.current = kanbanData.canTaskBeIndented
    canTaskBeUnindentedRef.current = kanbanData.canTaskBeUnindented
  }, [kanbanData.canTaskBeIndented, kanbanData.canTaskBeUnindented])

  // Use effects to update the validation states when dependencies change
  useEffect(() => {
    let isMounted = true

    const checkCanIndent = async () => {
      if (!card.id) return

      try {
        const result = await canTaskBeIndentedRef.current(card.id)
        if (isMounted) {
          setCanIndent(result)
        }
      } catch (error) {
        console.error(
          `Error checking if task ${card.id} can be indented:`,
          error
        )
        if (isMounted) setCanIndent(false)
      }
    }

    checkCanIndent()

    return () => {
      isMounted = false
    }
  }, [card.id, card.isSubtask, card.parentTaskId]) // Removed kanbanData dependency

  useEffect(() => {
    let isMounted = true

    const checkCanUnindent = async () => {
      if (!card.id) return

      try {
        const result = await canTaskBeUnindentedRef.current(card.id)
        if (isMounted) {
          setCanUnindent(result)
        }
      } catch (error) {
        console.error(
          `Error checking if task ${card.id} can be unindented:`,
          error
        )
        if (isMounted) setCanUnindent(false)
      }
    }

    checkCanUnindent()

    return () => {
      isMounted = false
    }
  }, [card.id, card.isSubtask, card.parentTaskId]) // Removed kanbanData dependency

  // Prepare handlers for indent/unindent operations
  const handleIndentTask = useCallback(
    async (taskId: string) => {
      try {
        // Find the potential parent ID if not already fetched
        const parentId =
          potentialParentId ||
          (await kanbanData.findPotentialParentTask(taskId))

        if (parentId) {
          await kanbanData.convertTaskToSubtask(taskId, parentId)
        } else {
          console.error(`No potential parent found for task ${taskId}`)
        }
      } catch (error) {
        console.error(`Error indenting task ${taskId}:`, error)
      }
    },
    [kanbanData, potentialParentId]
  )

  const handleUnindentTask = useCallback(
    async (taskId: string) => {
      try {
        await kanbanData.convertSubtaskToTask(taskId)
      } catch (error) {
        console.error(`Error unindenting task ${taskId}:`, error)
      }
    },
    [kanbanData]
  )

  // Opens the delete confirmation modal
  const _handleDeleteTask = useCallback(() => {
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
    if (!card.id) {
      console.error("Task ID is missing for duplication")
      return
    }

    try {
      await onDuplicateTask?.(card.id)
    } catch (error) {
      console.error("Failed to duplicate task:", error)
    }
  }, [card.id, card.name, onDuplicateTask])

  const handleRemoveRefUrl = useCallback(
    async (urlId: string) => {
      if (!card.id) {
        console.error("Task ID is missing")
        return
      }

      try {
        // Filter out the URL to be removed
        const updatedRefUrls = (card.refUrls || []).filter(
          (url) => url.id !== urlId
        )

        // Update the task with the new refUrls array
        await onUpdateTask(card.id, {
          refUrls: updatedRefUrls,
        })
      } catch (error) {
        console.error("Failed to remove reference URL:", error)
      }
    },
    [card.id, card.refUrls, onUpdateTask]
  )

  const handleOpenDrawer = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      if (!card.id) {
        console.error("Task ID is missing")
        return
      }

      handleDrawerOpen(card.id)
    },
    [card.id, handleDrawerOpen]
  )

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }, [])

  const _getDateStatus = useCallback((date: Date) => {
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0)
      return { status: "overdue", className: "text-red-9 bg-red-3" }
    if (diffDays === 0)
      return { status: "today", className: "text-orange-9 bg-orange-3" }
    if (diffDays <= 3)
      return { status: "soon", className: "text-yellow-9 bg-yellow-3" }
    return { status: "future", className: "text-blue-9 bg-blue-3" }
  }, [])

  // Helper function to get colors for tags by index
  const _getColorByIndex = useCallback((index: number) => {
    const colors = [
      "#FF5757",
      "#FF8C00",
      "#60A5FA",
      "#34D399",
      "#A78BFA",
      "#F472B6",
    ]
    return colors[index % colors.length]
  }, [])

  const _getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case "urgent":
        return "red"
      case "high":
        return "orange"
      case "medium":
        return "blue"
      case "low":
        return "green"
      default:
        return "gray"
    }
  }, [])

  // Don't render if id is missing
  if (!card.id) {
    console.error("Task card missing id:", card)
    return null
  }

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
        onDrag({ source }) {
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
        onDrop() {
          setState(idle)
        },
      }),
      dropTargetForElements({
        element: innerRef.current as unknown as Element,
        getIsSticky: () => true,
        // Ensure all card drags are accepted, including parent tasks with subtasks
        canDrop: (args) => {
          // First check if we're dragging a card
          const isDraggingCard = isDraggingACard(args)
          if (!isDraggingCard) return false

          // Get the source card data
          const sourceData = args.source.data
          if (!isCardData(sourceData)) return false

          const sourceCard = sourceData.card as KanbanTask

          // Don't allow dropping onto itself
          if (sourceCard.id === card.id) return false

          // CASE 1: If the current card (drop target) is a subtask
          if (card.isSubtask) {
            // Allow dropping other subtasks with the same parent to maintain hierarchy
            if (
              sourceCard.isSubtask &&
              sourceCard.parentTaskId === card.parentTaskId
            ) {
              return true
            }

            // For other cases with subtasks, be more restrictive to maintain hierarchy
            return false
          }

          // CASE 2: If this is a parent task with subtasks
          // We need to be more permissive here to allow tasks to be dropped above parent tasks
          if (hasChildTasks) {
            // If dragging a subtask
            if (sourceCard.isSubtask) {
              // Only allow if it's already a subtask of this parent
              return sourceCard.parentTaskId === card.id
            }
            // If dragging a regular task, allow it
            // This enables dropping tasks above parent tasks
            return true
          }

          // In all other cases (normal tasks without subtasks), allow drops
          return true
        },
        getData: ({ element, input }) => {
          // Get the basic data for this card as a drop target
          const data = getCardDropTargetData({ card, statusId })

          // For tasks with subtasks we need a different approach to edge detection
          // Use TypeScript casting to enhance the data with extra properties
          const enhancedData = {
            ...data,
            // Use a special marker in the card data itself rather than modifying the detection
            // This allows us to use the marker later in the onDrag/onDrop handlers
            __hasChildTasks: hasChildTasks,
          } as any // Type assertion to avoid TypeScript errors

          // Configure a larger drop target for the top edge to make it easier to drop above tasks with subtasks
          // The 'allowedEdges' is left as default to get natural detection behavior
          return attachClosestEdge(enhancedData, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          })
        },
        onDragEnter({ source }) {
          if (!isCardData(source.data)) return
          if (source.data.card.id === card.id) return

          // Get edge information from the source data with stronger typing
          const sourceData = source.data
          const sourceCard = sourceData.card as KanbanTask

          // Extract edge information with proper TypeScript typing
          // Define allowed edge types to match the Edge type from the drag-and-drop library
          type Edge = "top" | "right" | "bottom" | "left"

          // Initialize with a valid Edge type
          let closestEdge: Edge = "bottom"

          // If the source data has edge information, extract it with proper typing
          if ("closestEdge" in sourceData) {
            const extractedEdge = (sourceData as any).closestEdge
            // Only assign if it's a valid Edge value
            if (
              extractedEdge === "top" ||
              extractedEdge === "right" ||
              extractedEdge === "bottom" ||
              extractedEdge === "left"
            ) {
              closestEdge = extractedEdge
            }
          }

          // If this is a parent task with subtasks, favor "top" edge to make dropping above easier
          // This is the key improvement - for parent tasks with subtasks, make it easier to drop above
          if (hasChildTasks && !sourceCard.isSubtask) {
            closestEdge = "top" // Now properly typed
          }

          setState({
            type: "is-over",
            dragging: sourceData.rect,
            closestEdge,
          })
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) return
          // Check id instead of taskId for the new schema
          if (source.data.card.id === card.id) return

          // Define Edge type for better TypeScript compliance
          type Edge = "top" | "right" | "bottom" | "left"

          // Extract the closest edge and ensure it's valid with proper typing
          let closestEdge: Edge | null = null
          try {
            // Extract edge info from self data if available
            const extractedEdge = extractClosestEdge(self.data)
            if (
              extractedEdge === "top" ||
              extractedEdge === "right" ||
              extractedEdge === "bottom" ||
              extractedEdge === "left"
            ) {
              closestEdge = extractedEdge
            }
          } catch (_err) {
            // Default to bottom if extraction fails
            closestEdge = "bottom"
          }

          // If no valid edge was detected, use a default
          if (!closestEdge) {
            closestEdge = "bottom"
          }

          // Get the source card with proper typing
          const sourceCard = source.data.card as KanbanTask

          // Enhanced edge detection for parent tasks with subtasks
          // Make it easier to drop tasks above parent tasks with subtasks
          if (hasChildTasks && !sourceCard.isSubtask) {
            // Bias toward top edge for better positioning above parent tasks
            closestEdge = "top"
          }

          // Build the proposed state with additional information
          const proposed: TCardState = {
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          }

          // Only update the state if it's different to avoid unnecessary rerenders
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
    <>
      {/* Delete Task Confirmation Modal */}
      {ModalPresets.deleteTask({
        isOpen: showDeleteConfirmation,
        onOpenChange: setShowDeleteConfirmation,
        taskName: card.name,
        onConfirm: confirmDeleteTask,
      })}

      <Box className="flex flex-shrink-0 flex-col pl-5">
        {/* Drop indicator above */}
        {state.type === "is-over" && state.closestEdge === "top" ? (
          <TaskCardShadow dragging={state.dragging} />
        ) : null}
        <Box
          ref={innerRef}
          className={`group relative ${cardStyles.base} ${cardStyles.light} ${cardStyles.dark} ${cardStyles.hover} ${isSelected ? cardStyles.selected : ""} ${state.type === "is-dragging" ? cardStyles.dragging : ""} ${isSubtask ? cardStyles.subtask : ""} ${shouldRemoveBorder ? cardStyles.noBorder : ""} ${
            isSubtask ? SUBTASK_MARGIN_CLASS : ""
          } ${!isVisible ? HIDDEN_CLASS : ""}`}
        >
          {/* All content in a single horizontal row with tabular layout */}
          <Flex align="center" className="h-full w-full px-4 py-3">
            {/* Left side: Checkbox and title - reduced width */}
            <Flex align="center" gap="3" className="w-[35%] flex-shrink-0">
              {/* Expand/collapse icon for parent tasks */}
              {hasChildTasks && (
                <IconButton
                  size="1"
                  variant="ghost"
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (card.id) {
                      setExpandedTasks({
                        ...expandedTasks,
                        [card.id]: expandedTasks[card.id] === false,
                      })
                    }
                  }}
                  aria-label={
                    isExpanded ? "Collapse subtasks" : "Expand subtasks"
                  }
                >
                  <svg
                    className={`h-3 w-3 text-gray-9 transition-transform ${
                      isExpanded ? "" : "-rotate-90"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </IconButton>
              )}

              {/* Checkbox with updated styling */}
              <Checkbox
                className={checkboxStyles.base}
                checked={isSelected}
                onCheckedChange={handleTaskSelect}
                aria-label="Select task"
              />

              {/* Task title with truncation */}
              <Text
                as="p"
                className="cursor-pointer truncate font-medium text-gray-12 dark:text-gray-12"
                onClick={handleOpenDrawer}
                size="2"
              >
                {card.name || "Untitled Task"}
              </Text>
            </Flex>

            {/* Metadata indicators moved left with more space - only visible on hover */}
            <Flex
              align="center"
              gap="2"
              className={`w-[25%] flex-shrink-0 ${HOVER_VISIBLE_CLASSES}`}
            >
              {/* Subtasks counter - Using proper icon from Radix */}
              {card.subTasks && card.subTasks.length > 0 && (
                <Flex align="center" gap="1">
                  <svg
                    className="h-3 w-3 text-gray-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <Text className="text-gray-10" size="1">
                    {
                      card.subTasks.filter((task) => task.completed === true)
                        .length
                    }
                    /{card.subTasks.length}
                  </Text>
                </Flex>
              )}

              {/* Comments counter */}
              {card.comments && card.comments.length > 0 && (
                <Flex align="center" gap="1">
                  <svg
                    className="h-3 w-3 text-gray-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <Text className="text-gray-10" size="1">
                    {card.comments.length}
                  </Text>
                </Flex>
              )}

              {/* Attachments counter */}
              {card.attachments && card.attachments.length > 0 && (
                <Flex align="center" gap="1">
                  <svg
                    className="h-3 w-3 text-gray-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <Text className="text-gray-10" size="1">
                    {card.attachments.length}
                  </Text>
                </Flex>
              )}

              {/* Acceptance criteria counter */}
              {card.acceptanceCriteria &&
                card.acceptanceCriteria.length > 0 && (
                  <Flex align="center" gap="1">
                    <svg
                      className="h-3 w-3 text-gray-9"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    <Text className="text-gray-10" size="1">
                      {
                        card.acceptanceCriteria.filter(
                          (item) => item.checked === true
                        ).length
                      }
                      /{card.acceptanceCriteria.length}
                    </Text>
                  </Flex>
                )}

              {/* Checklist counter */}
              {card.checklist && card.checklist.length > 0 && (
                <Flex align="center" gap="1">
                  <svg
                    className="h-3 w-3 text-gray-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Text className="text-gray-10" size="1">
                    {
                      card.checklist.filter((item) => item.checked === true)
                        .length
                    }
                    /{card.checklist.length}
                  </Text>
                </Flex>
              )}
            </Flex>

            {/* Right side content with better distribution */}
            <Flex align="center" gap="3" className="flex-1 justify-end pr-2">
              {/* Priority label indicator - fixed width */}
              <Flex
                align="center"
                justify="center"
                className="w-20 min-w-[5rem] flex-shrink-0"
              >
                {/* Display priority based on available data */}
                {card.priorityId ? (
                  <Badge
                    variant="soft"
                    size="1"
                    className={getPriorityStyles(
                      card.priorityId,
                      priorityLabels
                    )}
                  >
                    {
                      priorityLabels?.some((p) => p.id === card.priorityId)
                        ? getPriorityName(card.priorityId, priorityLabels)
                        : card.priorityId.startsWith("pr-")
                          ? card.priorityId.substring(3, 8) // Show shorter ID for custom priorities
                          : getPriorityName(card.priorityId) // Use default formatting for standard priorities
                    }
                  </Badge>
                ) : (
                  <Text size="1" className="text-gray-8">
                    No priority
                  </Text>
                )}
              </Flex>

              {/* Reference URLs - fixed width */}
              <Flex
                align="center"
                justify="center"
                className="w-16 min-w-[4rem] flex-shrink-0"
              >
                <TaskRefUrls
                  refUrls={(card.refUrls || []) as RefUrl[]}
                  onRemoveUrl={handleRemoveRefUrl}
                  size="sm"
                />
              </Flex>

              {/* Due date with "Due:" label - fixed width */}
              <Flex
                align="center"
                justify="center"
                className="w-24 min-w-[6rem] flex-shrink-0"
              >
                {card.endDate ? (
                  <Text className="text-gray-10" size="1">
                    Due: {formatDate(new Date(card.endDate))}
                  </Text>
                ) : (
                  <span />
                )}
              </Flex>

              {/* Assigned users with avatar stack - fixed width */}
              <Flex
                align="center"
                justify="center"
                className="w-24 min-w-[6rem] flex-shrink-0"
              >
                <AvatarGroup
                  users={(card.assignedTo || []).map((user) => ({
                    id: user.id,
                    name: user.name,
                    src: (user as any).image || (user as any).avatar,
                  }))}
                  maxVisible={3}
                  layout="stack"
                  stackOrder="asc"
                  size="1"
                />
              </Flex>

              {/* Task Actions Menu - with left margin to prevent flush right edge */}
              <Flex
                align="center"
                justify="center"
                className="mr-2 ml-4 flex-shrink-0"
              >
                <TaskActionsMenu
                  task={card}
                  columns={
                    columns.map((col) => ({
                      id: col.id,
                      name: col.name,
                      projectId: col.projectId || "",
                      statusId: col.id,
                      priorityId: "",
                      taskOrder: 0,
                      completed: false,
                      refUrls: [],
                      labelsTags: [],
                      attachments: [],
                      assignedTo: [],
                      subTasks: [],
                      comments: [],
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                      createdBy: { id: "", name: "" },
                      updatedBy: { id: "", name: "" },
                    })) as unknown as TaskDataSchema[]
                  }
                  priorityLabels={priorityLabels}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={async () => {
                    await setShowDeleteConfirmation(true)
                  }}
                  // Add copy/paste support
                  onCreateTask={async (taskData) => {
                    // Create task in the same status as the current card
                    await onCreateTask(statusId, taskData)
                  }}
                  currentStatusId={statusId}
                  // Add duplicate task support
                  onDuplicateTask={handleDuplicateTask}
                  // Add subtask operation handlers
                  onIndentTask={handleIndentTask}
                  onUnindentTask={handleUnindentTask}
                  canIndent={canIndent}
                  canUnindent={canUnindent}
                  size="1"
                  variant="ghost"
                />
              </Flex>
            </Flex>
          </Flex>
        </Box>

        {/* Drop indicator below */}
        {state.type === "is-over" && state.closestEdge === "bottom" ? (
          <TaskCardShadow dragging={state.dragging} />
        ) : null}
      </Box>

      {/* Portal for drag preview - using TailwindCSS classes */}
      {state.type === "preview"
        ? createPortal(
            <Box className="overflow-hidden rounded-2xl bg-gray-900 brightness-75 contrast-125">
              <Box
                className="group relative h-14 cursor-grabbing rounded-2xl border border-gray-700 bg-gray-900 px-6 shadow-lg"
                style={{ width: state.dragging.width }}
              >
                <Flex
                  justify="between"
                  align="center"
                  className="h-full w-full"
                >
                  <Flex align="center" gap="2" className="flex-shrink-0">
                    <Checkbox
                      checked={card.completed || false}
                      className={`opacity-90 ${checkboxStyles.base} ${card.completed ? checkboxStyles.checked : checkboxStyles.unchecked}`}
                      disabled
                    />
                    <Text
                      size="2"
                      className="truncate font-medium text-white opacity-90"
                    >
                      {card.name}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Box>,
            state.container
          )
        : null}
    </>
  )
})
