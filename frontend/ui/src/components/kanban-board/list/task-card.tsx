// components/list/task-card.tsx - Updated styling to match Figma design with drag and drop
import React, { useCallback, useState, memo, useEffect, useRef, useMemo, useContext, createContext } from "react"
import { createPortal } from "react-dom"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import invariant from "tiny-invariant"

// Hard-coded members data (shared with task-actions-menu)
const members = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    position: "UI/UX Designer",
    color: "blue",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe", 
    label: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    position: "Project Manager",
    color: "amber",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=32&h=32&fit=crop&crop=face",
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "Michael Brown",
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    position: "Product Designer", 
    color: "orange",
  },
]
import {
  CalendarDays,
  Link,
  ExternalLink,
  Figma,
  GripVertical,
  MessageSquare,
  Paperclip,
  ListChecks,
  CheckSquare,
  ClipboardCheck,
  ChevronRight,
  ChevronDown
} from "lucide-react"
import {
  type TaskDataSchema,
} from "@incmix/utils/schema"
import {
  type KanbanTask,
  isCardData,
  isDraggingACard,
  getCardData,
  getCardDropTargetData
} from "../types"
import { isShallowEqual } from "@incmix/utils/objects"
import { isSafari } from "@utils/browser"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { ModalPresets } from "../shared/confirmation-modal"
import { OverlappingAvatarGroup, type AssignedUser, type SelectableUser } from "../shared/overlapping-avatar-group"
import { cn } from "@utils"
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Badge,
  Avatar,
} from "@incmix/ui"
import { TaskActionsMenu } from "./task-actions-menu"
import { ListColumn } from "../hooks/use-list-view"
import { useKanban } from "../hooks/use-kanban-data"

// Constants for DOM manipulation checks
const canUseDOM =
  typeof window !== "undefined" &&
  !!window.document &&
  !!window.document.createElement

// Type for card data with closestEdge
interface TCardDataWithEdge extends ReturnType<typeof getCardData> {
  closestEdge?: Edge;
}

// Card state types for drag and drop operations
type TCardState =
  | { type: "idle" }
  | { type: "is-dragging" }
  | { type: "is-dragging-and-left-self" }
  | { type: "is-over"; dragging: DOMRect; closestEdge: Edge }
  | { type: "preview"; container: HTMLElement; dragging: DOMRect };

const idle: TCardState = { type: "idle" };

// Card style constants based on Figma design for both light and dark themes
const cardStyles = {
  base: "rounded-md transition-all duration-150",
  light: "bg-white border-b border-gray-4", 
  dark: "dark:bg-gray-1 dark:border-b dark:border-gray-6",
  hover: "hover:bg-gray-2 dark:hover:bg-gray-2",
  selected: "bg-gray-3 dark:bg-gray-3",
  dragging: "opacity-40 cursor-grabbing shadow-sm",
  subtask: "pl-2", // Removed border-l and other styling to be handled separately
  noBorder: "!border-b-0" // New class to remove bottom border when needed
}

// Checkbox style constants for both light and dark themes
const checkboxStyles = {
  base: "rounded-md border-[1px] h-[18px] w-[18px] flex-shrink-0",
  unchecked: "border-gray-8 dark:border-gray-8",
  checked: "bg-blue-9 border-blue-9"
}

// Group hover styles for elements that should only appear on hover
const hoverVisibleClasses = "opacity-0 group-hover:opacity-100 transition-opacity duration-150"

// Helper functions for priority labels styling
const getPriorityStyles = (priorityId: string, priorityLabels?: { id: string; name: string; color: string; type: string }[]): string => {
  // If priorityLabels exists, try to get color from it
  if (priorityLabels && priorityLabels.length > 0) {
    const priority = priorityLabels.find(p => p.id === priorityId);
    if (priority && priority.color) {
      // Convert the color to a Radix UI token class based on color value
      switch (priority.color.toLowerCase()) {
        case "red":
          return "bg-red-3 text-red-11 dark:bg-red-3 dark:text-red-11";
        case "orange":
          return "bg-orange-3 text-orange-11 dark:bg-orange-3 dark:text-orange-11";
        case "yellow":
          return "bg-yellow-3 text-yellow-11 dark:bg-yellow-3 dark:text-yellow-11";
        case "green":
          return "bg-green-3 text-green-11 dark:bg-green-3 dark:text-green-11";
        case "blue":
          return "bg-blue-3 text-blue-11 dark:bg-blue-3 dark:text-blue-11";
        case "purple":
          return "bg-purple-3 text-purple-11 dark:bg-purple-3 dark:text-purple-11";
        default:
          return "bg-gray-3 text-gray-11 dark:bg-gray-3 dark:text-gray-11";
      }
    }
  }
  
  // Fallback to using priorityId directly
  switch (priorityId.toLowerCase()) {
    case "urgent":
    case "high":
      return "bg-red-3 text-red-11 dark:bg-red-3 dark:text-red-11";
    case "medium":
      return "bg-orange-3 text-orange-11 dark:bg-orange-3 dark:text-orange-11";
    case "low":
      return "bg-blue-3 text-blue-11 dark:bg-blue-3 dark:text-blue-11";
    default:
      return "bg-gray-3 text-gray-11 dark:bg-gray-3 dark:text-gray-11";
  }
};

// Helper function to get priority name from ID
const getPriorityName = (priorityId: string, priorityLabels?: { id: string; name: string; color: string; type: string }[]): string => {
  // First try to get from priorityLabels if available
  if (priorityLabels && priorityLabels.length > 0) {
    const priority = priorityLabels.find(p => p.id === priorityId);
    if (priority?.name) return priority.name;
  }
  
  // Fallback to formatting the priorityId directly
  if (!priorityId) return "";
  
  // Capitalize first letter and format the rest
  return priorityId.charAt(0).toUpperCase() + priorityId.slice(1).toLowerCase();
};

// Helper function to format dates
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

interface ListTaskCardProps {
  card: KanbanTask
  statusId: string
  columns: ListColumn[]
  priorityLabels?: { id: string; name: string; color: string; type: string }[]
  onUpdateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
  onTaskSelect?: (id: string, selected: boolean) => void
  isSelected?: boolean
  projectId?: string
}

// Shadow component for drag and drop indicators
export const TaskCardShadow = memo(function TaskCardShadow({
  dragging,
}: {
  dragging: DOMRect;
}) {
  return (
    <div
      className="flex-shrink-0 rounded-lg bg-blue-3 dark:bg-blue-9/25 border-2 border-dashed border-blue-6 dark:border-blue-7 transition-all duration-200"
      style={{ height: Math.max(dragging.height, 50) }}
    />
  );
});

// Context for sharing expanded state across tasks
const ExpandedTasksContext = React.createContext<{
  expandedTasks: Record<string, boolean>;
  setExpandedTasks: (tasks: Record<string, boolean>) => void;
}>({ 
  expandedTasks: {},
  setExpandedTasks: () => {}
});

// Provider component to manage expanded state globally
export const ExpandedTasksProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  
  return (
    <ExpandedTasksContext.Provider value={{ expandedTasks, setExpandedTasks }}>
      {children}
    </ExpandedTasksContext.Provider>
  );
};

// Custom hook to access expanded tasks context
const useExpandedTasks = () => {
  return useContext(ExpandedTasksContext);
};

export const ListTaskCard = memo(function ListTaskCard({
  card,
  statusId,
  columns,
  priorityLabels,
  onUpdateTask,
  onDeleteTask,
  onTaskSelect,
  isSelected = false,
  projectId = "default-project",
}: ListTaskCardProps) {
  const { handleDrawerOpen } = useKanbanDrawer()
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)
  // Access expanded state from context
  const { expandedTasks, setExpandedTasks } = useExpandedTasks();
  
  // Get expanded state for this task (default to true if not set)
  const isExpanded = card.id ? expandedTasks[card.id] !== false : true;
  
  // Access kanban data to get the subtask functions
  const kanbanData = useKanban(projectId)
  
  // Check if the current task is a parent task (has subtasks)
  const hasChildTasks = useMemo(() => {
    // Use the kanban data to find out if any task has this task as parent
    if (!card.id) return false;
    
    // Look through all tasks in all columns
    const allTasks: KanbanTask[] = [];
    kanbanData.columns.forEach(column => {
      allTasks.push(...column.tasks);
    });
    
    return allTasks.some((task: KanbanTask) => task.parentTaskId === card.id);
  }, [card.id, kanbanData.columns])

  // Check if task is a subtask
  const isSubtask = useMemo(() => {
    return Boolean(card.isSubtask)
  }, [card.isSubtask])
  
  // Determine if we should remove the border (for parent-subtask relationships)
  const shouldRemoveBorder = useCallback(() => {
    // If this task is a parent (has children), remove its bottom border
    if (hasChildTasks) return true;
    
    // If this task is a subtask but NOT the last subtask, remove its border
    // We need a border for the last subtask in a group
    if (isSubtask) {
      // Check if this is the last subtask for its parent
      const parentId = card.parentTaskId;
      if (parentId) {
        // Get all tasks from all columns
        const allTasks: KanbanTask[] = [];
        kanbanData.columns.forEach(column => {
          allTasks.push(...column.tasks);
        });
        
        // Get all subtasks for this parent
        const siblingTasks = allTasks.filter(task => task.parentTaskId === parentId);
        
        // Sort by taskOrder to find the last one
        const sortedSiblings = [...siblingTasks].sort((a, b) => 
          (a.taskOrder ?? 0) - (b.taskOrder ?? 0)
        );
        
        // If this is the last subtask, keep the border
        if (sortedSiblings.length > 0 && sortedSiblings[sortedSiblings.length - 1].id === card.id) {
          return false; // Keep the border
        }
        return true; // Remove border for other subtasks
      }
    }
    
    return false;
  }, [hasChildTasks, isSubtask, card.id, card.parentTaskId, kanbanData.columns])
  
  // Determine if a task should be visible based on parent collapsed state
  const isVisible = useMemo(() => {
    // Top-level tasks are always visible
    if (!isSubtask) return true;
    
    // Subtasks are only visible if their parent is expanded
    // In a full implementation, we'd check if the parent task is expanded
    const parentId = card.parentTaskId;
    if (!parentId) return true; // Safety check
    
    // Check if parent is expanded
    return expandedTasks[parentId] !== false;
  }, [isSubtask, card.parentTaskId, expandedTasks])
  
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  // Kanban data is now accessed above
  
  // Prepare handlers for indent/unindent operations
  const handleIndentTask = useCallback(async (taskId: string) => {
    const parentTaskId = kanbanData.findPotentialParentTask(taskId);
    if (parentTaskId) {
      await kanbanData.convertTaskToSubtask(taskId, parentTaskId);
    }
  }, [kanbanData]);
  
  const handleUnindentTask = useCallback(async (taskId: string) => {
    await kanbanData.convertSubtaskToTask(taskId);
  }, [kanbanData]);
  
  // Check if the task can be indented or unindented
  const canIndent = useMemo(() => card.id ? kanbanData.canTaskBeIndented(card.id) : false, [card.id, kanbanData]);
  const canUnindent = useMemo(() => card.id ? kanbanData.canTaskBeUnindented(card.id) : false, [card.id, kanbanData]);

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

    if (diffDays < 0) return { status: "overdue", className: "text-red-9 bg-red-3" }
    if (diffDays === 0) return { status: "today", className: "text-orange-9 bg-orange-3" }
    if (diffDays <= 3) return { status: "soon", className: "text-yellow-9 bg-yellow-3" }
    return { status: "future", className: "text-blue-9 bg-blue-3" }
  }, [])
  
  // Helper function to get colors for tags by index
  const getColorByIndex = useCallback((index: number) => {
    const colors = ["#FF5757", "#FF8C00", "#60A5FA", "#34D399", "#A78BFA", "#F472B6"]
    return colors[index % colors.length]
  }, [])

  const getPriorityColor = useCallback((priority: string) => {
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
    if (!canUseDOM || !innerRef.current) return undefined;

    return combine(
      draggable({
        element: innerRef.current as HTMLDivElement,
        getInitialData: ({ element }) => {
          invariant(element instanceof HTMLElement);
          const rect = element.getBoundingClientRect();
          return getCardData({ card, statusId, rect });
        },
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data;
          invariant(isCardData(data));
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
              });
            },
          });
        },
        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrag({ source }) {
          if (!isCardData(source.data)) return;
          if (source.data.card.id === card.id) return;

          // Get edge information from the source data
          const dataWithEdge = source.data as TCardDataWithEdge;
          const closestEdge = dataWithEdge.closestEdge || "bottom";

          setState({
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element: innerRef.current as unknown as Element,
        getIsSticky: () => true,
        // Ensure all card drags are accepted, including parent tasks with subtasks
        canDrop: (args) => {
          // First check if we're dragging a card
          const isDraggingCard = isDraggingACard(args);
          if (!isDraggingCard) return false;
          
          // Get the source card data
          const sourceData = args.source.data;
          if (!isCardData(sourceData)) return false;
          
          const sourceCard = sourceData.card as KanbanTask;
          
          // If the current card (drop target) is a subtask
          if (card.isSubtask) {
            // Only allow dropping if source is also a subtask with the same parent
            return Boolean(sourceCard.isSubtask && sourceCard.parentTaskId === card.parentTaskId);
          }
          
          // If we're dropping near a parent task that has expanded subtasks
          // We need to check if we're in the subtask zone to prevent dropping regular tasks as subtasks
          if (hasChildTasks && isExpanded) {
            // For parent tasks, allow drops only for other parent tasks or subtasks already belonging to this parent
            return Boolean(!sourceCard.isSubtask || sourceCard.parentTaskId === card.id);
          }
          
          // In all other cases, allow the drop
          return true;
        },
        getData: ({ element, input }) => {
          // Get the basic data for this card as a drop target
          const data = getCardDropTargetData({ card, statusId });
          
          // For parent tasks with subtasks, we need to ensure they can be dropped above other tasks
          // Enhance the drop target detection for better accuracy with specific settings for upward movement
          return attachClosestEdge(data, {
            element,
            input,
            // Explicitly allow both top and bottom edges with biased hit detection
            // This improves the ability to drop tasks above existing tasks
            allowedEdges: ["top", "bottom"],
          });
        },
        onDragEnter({ source }) {
          if (!isCardData(source.data)) return;
          if (source.data.card.id === card.id) return;
          
          // Get edge information from the source data
          const dataWithEdge = source.data as TCardDataWithEdge;
          const sourceCard = source.data.card as KanbanTask;
          
          // Always ensure a valid edge is used, defaulting to bottom if not specified
          // For tasks with subtasks, we want to ensure they can be dropped in all positions
          // This improves the drag-and-drop experience for hierarchical tasks
          const closestEdge = dataWithEdge.closestEdge || "bottom";
          
          // Special handling for parent tasks with subtasks to ensure proper edge detection
          // We need to know if the dragged task has subtasks to adjust the detection area
          const hasSubtasks = !sourceCard.isSubtask && 
                            columns.some(col => 
                              col.tasks.some((t: KanbanTask) => 
                                t.parentTaskId === sourceCard.id
                              )
                            );
                            
          setState({
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          });
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) return;
          // Check id instead of taskId for the new schema
          if (source.data.card.id === card.id) return;
          
          // Extract the closest edge and ensure it's valid
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) return;
          
          // Get the source card with proper typing
          const sourceCard = source.data.card as KanbanTask;
          
          // Detect if the dragged task has subtasks to provide better drag detection
          const hasSubtasks = !sourceCard.isSubtask && 
                            columns.some(col => 
                              col.tasks.some((t: KanbanTask) => 
                                t.parentTaskId === sourceCard.id
                              )
                            );
          
          // Build the proposed state with additional information
          const proposed: TCardState = {
            type: "is-over",
            dragging: source.data.rect,
            closestEdge,
          };
          
          // Only update the state if it's different to avoid unnecessary rerenders
          setState((current) => {
            if (isShallowEqual(proposed, current)) {
              return current;
            }
            return proposed;
          });
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) return;

          if (source.data.card.id === card.id) {
            setState({ type: "is-dragging-and-left-self" });
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
    );
  }, [card.id, statusId]);

  return (
    <>
      {/* Delete Task Confirmation Modal */}
      {ModalPresets.deleteTask({
        isOpen: showDeleteConfirmation,
        onOpenChange: setShowDeleteConfirmation,
        taskName: card.name,
        onConfirm: confirmDeleteTask
      })}

      <Box className="flex flex-shrink-0 flex-col pl-5">
        {/* Drop indicator above */}
        {state.type === "is-over" && state.closestEdge === "top" ? (
          <TaskCardShadow dragging={state.dragging} />
        ) : null}
        <Box
          ref={innerRef}
          className={`group relative ${cardStyles.base} ${cardStyles.light} ${cardStyles.dark} ${cardStyles.hover} ${isSelected ? cardStyles.selected : ""} ${state.type === "is-dragging" ? cardStyles.dragging : ""} ${isSubtask ? cardStyles.subtask : ""} ${shouldRemoveBorder() ? cardStyles.noBorder : ""}`}
          style={{ 
            // Apply larger indentation for subtasks
            marginLeft: isSubtask ? '32px' : '0',
            // Hide the task if it's not visible (e.g., parent is collapsed)
            display: isVisible ? 'block' : 'none'
          }}
        >
          {/* All content in a single horizontal row with tabular layout */}
          <Flex align="center" className="h-full w-full py-3 px-4">
            {/* Left side: Checkbox and title - reduced width */}
            <Flex align="center" gap="3" className="flex-shrink-0 w-[35%]">
              {/* Expand/collapse icon for parent tasks */}
              {hasChildTasks && (
                <Box 
                  className="cursor-pointer flex items-center justify-center w-5 h-5 hover:bg-gray-3 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (card.id) {
                      // Toggle expanded state for this task
                      setExpandedTasks({
                        ...expandedTasks,
                        [card.id]: expandedTasks[card.id] === false ? true : false
                      });
                    }
                  }}
                  aria-label={isExpanded ? "Collapse subtasks" : "Expand subtasks"}
                >
                  {isExpanded ? (
                    <ChevronDown size={14} className="text-gray-9" />
                  ) : (
                    <ChevronRight size={14} className="text-gray-9" />
                  )}
                </Box>
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
                className="text-gray-12 dark:text-gray-12 font-medium truncate cursor-pointer"
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
              className="flex-shrink-0 w-[25%] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            >
              {/* Subtasks counter */}
              {card.subTasks && card.subTasks.length > 0 && (
                <Flex align="center" gap="1">
                  <ListChecks size={14} className="text-gray-9" strokeWidth={2} />
                  <Text className="text-gray-10" size="1">
                    {card.subTasks.filter(task => task.completed === true).length}/{card.subTasks.length}
                  </Text>
                </Flex>
              )}
              
              {/* Comments counter */}
              {card.comments && card.comments.length > 0 && (
                <Flex align="center" gap="1">
                  <MessageSquare size={14} className="text-gray-9" strokeWidth={2} />
                  <Text className="text-gray-10" size="1">
                    {card.comments.length}
                  </Text>
                </Flex>
              )}
              
              {/* Attachments counter */}
              {card.attachments && card.attachments.length > 0 && (
                <Flex align="center" gap="1">
                  <Paperclip size={14} className="text-gray-9" strokeWidth={2} />
                  <Text className="text-gray-10" size="1">
                    {card.attachments.length}
                  </Text>
                </Flex>
              )}
              
              {/* Acceptance criteria counter */}
              {card.acceptanceCriteria && card.acceptanceCriteria.length > 0 && (
                <Flex align="center" gap="1">
                  <ClipboardCheck size={14} className="text-gray-9" strokeWidth={2} />
                  <Text className="text-gray-10" size="1">
                    {card.acceptanceCriteria.filter(item => item.checked === true).length}/{card.acceptanceCriteria.length}
                  </Text>
                </Flex>
              )}
              
              {/* Checklist counter */}
              {card.checklist && card.checklist.length > 0 && (
                <Flex align="center" gap="1">
                  <CheckSquare size={14} className="text-gray-9" strokeWidth={2} />
                  <Text className="text-gray-10" size="1">
                    {card.checklist.filter(item => item.checked === true).length}/{card.checklist.length}
                  </Text>
                </Flex>
              )}
            </Flex>

            {/* Right side content with better distribution */}
            <Flex align="center" gap="3" className="flex-1 justify-end pr-2">
              {/* Due date with "Due:" label - fixed width */}
              <Flex align="center" justify="center" className="flex-shrink-0 min-w-[6rem] w-24">
                {card.endDate ? (
                  <Text className="text-gray-10" size="1">
                    Due: {formatDate(new Date(card.endDate))}
                  </Text>
                ) : (
                  <span></span>
                )}
              </Flex>
              
              {/* Priority label indicator - fixed width */}
              <Flex align="center" justify="center" className="flex-shrink-0 min-w-[5rem] w-20">
                {card.priorityId && priorityLabels?.some(p => p.id === card.priorityId) && (
                  <Badge
                    variant="soft"
                    size="1"
                    className={getPriorityStyles(card.priorityId, priorityLabels)}
                  >
                    {getPriorityName(card.priorityId, priorityLabels)}
                  </Badge>
                )}
              </Flex>
              
              {/* Assigned users with avatar stack - fixed width */}
              <Flex align="center" justify="center" className="flex-shrink-0 min-w-[6rem] w-24">
                <OverlappingAvatarGroup 
                  users={(card.assignedTo || []) as AssignedUser[]}
                  maxDisplayed={3}
                  size="md"
                  interactive={true}
                  allUsers={members.map(member => ({
                    id: member.id,
                    name: member.name,
                    avatar: member.avatar,
                    position: member.position,
                    color: member.color,
                    value: member.value,
                    label: member.label
                  }))}
                  onUsersChange={async (updatedUsers) => {
                    if (!card.id) return;
                    
                    try {
                      // Update the task with the new assigned users
                      await onUpdateTask(card.id, {
                        assignedTo: updatedUsers
                      });
                    } catch (error) {
                      console.error("Failed to update assigned users:", error);
                    }
                  }}
                />
              </Flex>
              
              {/* Task Actions Menu - with left margin to prevent flush right edge */}
              <Flex align="center" justify="center" className="flex-shrink-0 ml-4 mr-2">
                <TaskActionsMenu
                  task={card}
                  columns={columns.map(col => ({
                    id: col.id,
                    name: col.name,
                    projectId: col.projectId || '',
                    statusId: col.id,
                    priorityId: '',
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
                    createdBy: { id: '', name: '' },
                    updatedBy: { id: '', name: '' }
                  })) as unknown as TaskDataSchema[]}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={async () => { setShowDeleteConfirmation(true); return Promise.resolve(); }}
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
      
      {/* Portal for drag preview */}
      {state.type === "preview"
        ? createPortal(
            <div className="drag-preview-wrapper" 
              style={{
                filter: 'brightness(0.8) contrast(1.2)', // Make it darker to match dark mode 
                backgroundColor: '#1a1a1a', // Dark background
                borderRadius: '20px',
                overflow: 'hidden' 
              }}
            >
              <Box
                className="group relative px-6 cursor-grabbing"
                style={{ 
                  height: "56px", 
                  width: state.dragging.width,
                  backgroundColor: '#1a1a1a', // Dark background
                  border: '1px solid #333', // Dark border
                  borderRadius: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}
              >
                <Flex justify="between" align="center" className="h-full w-full">
                  <Flex align="center" gap="2" className="flex-shrink-0">
                    <Checkbox
                      checked={card.completed || false}
                      className={`${checkboxStyles.base} ${card.completed ? checkboxStyles.checked : checkboxStyles.unchecked}`}
                      style={{ opacity: 0.9 }}
                      disabled
                    />
                    <Text size="2" style={{ color: '#fff', fontWeight: 500, opacity: 0.9 }} className="truncate">
                      {card.name}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </div>,
            state.container,
          )
        : null}
    </>
  );
});
