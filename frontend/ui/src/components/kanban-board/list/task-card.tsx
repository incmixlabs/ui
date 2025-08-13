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

// Import members data hook
import { useMembers } from "../hooks/use-members"
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
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { ModalPresets } from "../shared/confirmation-modal"
import { OverlappingAvatarGroup, type AssignedUser } from "../shared/overlapping-avatar-group"
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Badge,
  Icon,
} from "@incmix/ui"
import { TaskActionsMenu } from "./task-actions-menu"
import { ListColumn } from "../hooks/use-list-view"
import { useKanban } from "../hooks/use-kanban-data"
import { getPriorityStyles, getPriorityName } from "../utils/priority-utils"
import { TaskRefUrls, type RefUrl } from "../shared/task-ref-urls"

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
  onCreateTask: (statusId: string, taskData: Partial<TaskDataSchema>) => Promise<void>
  onDuplicateTask?: (id: string) => Promise<void>
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
  onCreateTask,
  onDuplicateTask,
  onTaskSelect,
  isSelected = false,
  projectId
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
  
  // Get members data from hook
  const { members, isLoading: membersLoading } = useMembers(projectId)
  
  // Check if the current task is a parent task (has subtasks)
  const hasChildTasks = useMemo(() => {
    if (!card.id) return false;
    
    // Create a parent-to-children index once
    const childrenByParent = new Map<string, boolean>();
    kanbanData.columns.forEach(column => {
      column.tasks.forEach((task: KanbanTask) => {
        if (task.parentTaskId) {
          childrenByParent.set(task.parentTaskId, true);
        }
      });
    });
    
    return childrenByParent.has(card.id);
  }, [card.id, kanbanData.columns])

  // Check if task is a subtask
  const isSubtask = useMemo(() => {
    return Boolean(card.isSubtask)
  }, [card.isSubtask])
  
  // Determine if we should remove the border (for parent-subtask relationships)
  const shouldRemoveBorder = useMemo(() => {
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
  
  // States for storing async validation results
  const [canIndent, setCanIndent] = useState<boolean>(false);
  const [canUnindent, setCanUnindent] = useState<boolean>(false);
  const [potentialParentId, setPotentialParentId] = useState<string | null>(null);
  
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
    let isMounted = true;
    
    const checkCanIndent = async () => {
      if (!card.id) return;
      
      try {
        const result = await canTaskBeIndentedRef.current(card.id);
        if (isMounted) {
          setCanIndent(result);
        }
      } catch (error) {
        console.error(`Error checking if task ${card.id} can be indented:`, error);
        if (isMounted) setCanIndent(false);
      }
    };
    
    checkCanIndent();
    
    return () => {
      isMounted = false;
    };
  }, [card.id, card.isSubtask, card.parentTaskId]); // Removed kanbanData dependency
  
  useEffect(() => {
    let isMounted = true;
    
    const checkCanUnindent = async () => {
      if (!card.id) return;
      
      try {
        const result = await canTaskBeUnindentedRef.current(card.id);
        if (isMounted) {
          setCanUnindent(result);
        }
      } catch (error) {
        console.error(`Error checking if task ${card.id} can be unindented:`, error);
        if (isMounted) setCanUnindent(false);
      }
    };
    
    checkCanUnindent();
    
    return () => {
      isMounted = false;
    };
  }, [card.id, card.isSubtask, card.parentTaskId]); // Removed kanbanData dependency
  
  // Prepare handlers for indent/unindent operations
  const handleIndentTask = useCallback(async (taskId: string) => {
    try {
      // Find the potential parent ID if not already fetched
      const parentId = potentialParentId || await kanbanData.findPotentialParentTask(taskId);
      
      if (parentId) {
        await kanbanData.convertTaskToSubtask(taskId, parentId);
      } else {
        console.error(`No potential parent found for task ${taskId}`);
      }
    } catch (error) {
      console.error(`Error indenting task ${taskId}:`, error);
    }
  }, [kanbanData, potentialParentId]);
  
  const handleUnindentTask = useCallback(async (taskId: string) => {
    try {
      await kanbanData.convertSubtaskToTask(taskId);
    } catch (error) {
      console.error(`Error unindenting task ${taskId}:`, error);
    }
  }, [kanbanData]);

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

  const handleRemoveRefUrl = useCallback(async (urlId: string) => {
    if (!card.id) {
      console.error("Task ID is missing")
      return
    }
    
    try {
      // Filter out the URL to be removed
      const updatedRefUrls = (card.refUrls || []).filter(url => url.id !== urlId)
      
      // Update the task with the new refUrls array
      await onUpdateTask(card.id, {
        refUrls: updatedRefUrls
      })
    } catch (error) {
      console.error("Failed to remove reference URL:", error)
    }
  }, [card.id, card.refUrls, onUpdateTask])

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
          
          // Don't allow dropping onto itself
          if (sourceCard.id === card.id) return false;
          
          // CASE 1: If the current card (drop target) is a subtask
          if (card.isSubtask) {
            // Allow dropping other subtasks with the same parent to maintain hierarchy
            if (sourceCard.isSubtask && sourceCard.parentTaskId === card.parentTaskId) {
              return true;
            }
            
            // For other cases with subtasks, be more restrictive to maintain hierarchy
            return false;
          }
          
          // CASE 2: If this is a parent task with subtasks
          // We need to be more permissive here to allow tasks to be dropped above parent tasks
          if (hasChildTasks) {
            // If dragging a subtask
            if (sourceCard.isSubtask) {
              // Only allow if it's already a subtask of this parent
              return sourceCard.parentTaskId === card.id;
            } else {
              // If dragging a regular task, allow it
              // This enables dropping tasks above parent tasks
              return true;
            }
          }
          
          // In all other cases (normal tasks without subtasks), allow drops
          return true;
        },
        getData: ({ element, input }) => {
          // Get the basic data for this card as a drop target
          const data = getCardDropTargetData({ card, statusId });
          
          // For tasks with subtasks we need a different approach to edge detection
          // Use TypeScript casting to enhance the data with extra properties
          const enhancedData = { 
            ...data,
            // Use a special marker in the card data itself rather than modifying the detection
            // This allows us to use the marker later in the onDrag/onDrop handlers
            __hasChildTasks: hasChildTasks 
          } as any; // Type assertion to avoid TypeScript errors
          
          // Configure a larger drop target for the top edge to make it easier to drop above tasks with subtasks
          // The 'allowedEdges' is left as default to get natural detection behavior
          return attachClosestEdge(enhancedData, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDragEnter({ source }) {
          if (!isCardData(source.data)) return;
          if (source.data.card.id === card.id) return;
          
          // Get edge information from the source data with stronger typing
          const sourceData = source.data;
          const sourceCard = sourceData.card as KanbanTask;
          
          // Determine if the source card is a parent task with subtasks
          const sourceHasSubtasks = !sourceCard.isSubtask && 
                            columns.some(col => 
                              col.tasks.some((t: KanbanTask) => 
                                t.parentTaskId === sourceCard.id
                              )
                            );
          
          // Extract edge information with proper TypeScript typing
          // Define allowed edge types to match the Edge type from the drag-and-drop library
          type Edge = "top" | "right" | "bottom" | "left";
          
          // Initialize with a valid Edge type
          let closestEdge: Edge = "bottom";
          
          // If the source data has edge information, extract it with proper typing
          if ('closestEdge' in sourceData) {
            const extractedEdge = (sourceData as any).closestEdge;
            // Only assign if it's a valid Edge value
            if (extractedEdge === "top" || extractedEdge === "right" || 
                extractedEdge === "bottom" || extractedEdge === "left") {
              closestEdge = extractedEdge;
            }
          }
          
          // If this is a parent task with subtasks, favor "top" edge to make dropping above easier
          // This is the key improvement - for parent tasks with subtasks, make it easier to drop above
          if (hasChildTasks && !sourceCard.isSubtask) {
            closestEdge = "top"; // Now properly typed
          }
          
          setState({
            type: "is-over",
            dragging: sourceData.rect,
            closestEdge,
          });
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) return;
          // Check id instead of taskId for the new schema
          if (source.data.card.id === card.id) return;
          
          // Define Edge type for better TypeScript compliance
          type Edge = "top" | "right" | "bottom" | "left";
          
          // Extract the closest edge and ensure it's valid with proper typing
          let closestEdge: Edge | null = null;
          try {
            // Extract edge info from self data if available
            const extractedEdge = extractClosestEdge(self.data);
            if (extractedEdge === "top" || extractedEdge === "right" || 
                extractedEdge === "bottom" || extractedEdge === "left") {
              closestEdge = extractedEdge;
            }
          } catch (err) {
            // Default to bottom if extraction fails
            closestEdge = "bottom";
          }
          
          // If no valid edge was detected, use a default
          if (!closestEdge) {
            closestEdge = "bottom";
          }
          
          // Get the source card with proper typing
          const sourceCard = source.data.card as KanbanTask;
          
          // Detect if the dragged task has subtasks
          const sourceHasSubtasks = !sourceCard.isSubtask && 
                            columns.some(col => 
                              col.tasks.some((t: KanbanTask) => 
                                t.parentTaskId === sourceCard.id
                              )
                            );
          
          // Enhanced edge detection for parent tasks with subtasks
          // Make it easier to drop tasks above parent tasks with subtasks
          if (hasChildTasks && !sourceCard.isSubtask) {
            // Bias toward top edge for better positioning above parent tasks
            closestEdge = "top";
          }
          
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
          className={`group relative ${cardStyles.base} ${cardStyles.light} ${cardStyles.dark} ${cardStyles.hover} ${isSelected ? cardStyles.selected : ""} ${state.type === "is-dragging" ? cardStyles.dragging : ""} ${isSubtask ? cardStyles.subtask : ""} ${shouldRemoveBorder ? cardStyles.noBorder : ""}`}
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
                    <Icon name="ChevronDown" className="text-gray-9" />
                  ) : (
                    <Icon name="ChevronRight" className="text-gray-9" />
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
                  <Icon name="ListChecks" className="text-gray-9" />
                  <Text className="text-gray-10" size="1">
                    {card.subTasks.filter(task => task.completed === true).length}/{card.subTasks.length}
                  </Text>
                </Flex>
              )}
              
              {/* Comments counter */}
              {card.comments && card.comments.length > 0 && (
                <Flex align="center" gap="1">
                  <Icon name="MessageSquare" className="text-gray-9" />
                  <Text className="text-gray-10" size="1">
                    {card.comments.length}
                  </Text>
                </Flex>
              )}
              
              {/* Attachments counter */}
              {card.attachments && card.attachments.length > 0 && (
                <Flex align="center" gap="1">
                  <Icon name="Paperclip" className="text-gray-9" />
                  <Text className="text-gray-10" size="1">
                    {card.attachments.length}
                  </Text>
                </Flex>
              )}
              
              {/* Acceptance criteria counter */}
              {card.acceptanceCriteria && card.acceptanceCriteria.length > 0 && (
                <Flex align="center" gap="1">
                  <Icon name="ClipboardCheck" className="text-gray-9" />
                  <Text className="text-gray-10" size="1">
                    {card.acceptanceCriteria.filter(item => item.checked === true).length}/{card.acceptanceCriteria.length}
                  </Text>
                </Flex>
              )}
              
              {/* Checklist counter */}
              {card.checklist && card.checklist.length > 0 && (
                <Flex align="center" gap="1">
                  <Icon name="SquareCheckBig" className="text-gray-9" />
                  <Text className="text-gray-10" size="1">
                    {card.checklist.filter(item => item.checked === true).length}/{card.checklist.length}
                  </Text>
                </Flex>
              )}
            </Flex>

            {/* Right side content with better distribution */}
            <Flex align="center" gap="3" className="flex-1 justify-end pr-2">
              {/* Priority label indicator - fixed width */}
              <Flex align="center" justify="center" className="flex-shrink-0 min-w-[5rem] w-20">
                {/* Display priority based on available data */}
                {card.priorityId ? (
                  <Badge
                    variant="soft"
                    size="1"
                    className={getPriorityStyles(card.priorityId, priorityLabels)}
                  >
                    {priorityLabels?.some(p => p.id === card.priorityId) 
                      ? getPriorityName(card.priorityId, priorityLabels)
                      : card.priorityId.startsWith('pr-') 
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
              <Flex align="center" justify="center" className="flex-shrink-0 min-w-[4rem] w-16">
                <TaskRefUrls
                  refUrls={(card.refUrls || []) as RefUrl[]}
                  onRemoveUrl={handleRemoveRefUrl}
                  size="sm"
                />
              </Flex>
              
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
                  priorityLabels={priorityLabels}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={async () => { setShowDeleteConfirmation(true); return Promise.resolve(); }}
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
