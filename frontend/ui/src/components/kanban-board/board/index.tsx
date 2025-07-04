// components/board/index.tsx - Fixed drag and drop smoothness and horizontal scrolling
import { useRef, useEffect, useState, useCallback } from "react"
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  Heading,
  DropdownMenu,
  ScrollArea
} from "@base"
import {
  Loader2,
  Settings,
  MoreVertical,
  RefreshCw
} from "lucide-react"
import { isCardData, isCardDropTargetData, isColumnData, isDraggingACard, KanbanColumn } from "../types"
import {  useAIFeaturesStore } from "@incmix/store"
import { useKanban } from "../hooks/use-kanban-data"
import { BoardColumn } from "./board-column"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import { CreateColumnForm } from "./create-column-form"

interface BoardProps {
  projectId?: string
  onTaskOpen?: (taskId: string) => void
}

export function Board({
  projectId = "default-project",
  onTaskOpen
}: BoardProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Local state for optimistic updates
  const [optimisticColumns, setOptimisticColumns] = useState<KanbanColumn[]>([])

  // Get AI features state
  const { useAI } = useAIFeaturesStore()

  // Use the new useKanban hook
  const {
    columns,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    updateStatusLabel, // Using the compatibility methods instead
    deleteStatusLabel, // Using the compatibility methods instead
    refetch,
    clearError,
    projectStats
  } = useKanban(projectId)

  // Update optimistic state when real data changes
  useEffect(() => {
    if (!isDragging) {
      setOptimisticColumns(columns)
    }
  }, [columns, isDragging])

  // Use optimistic columns during drag, real columns otherwise
  const displayColumns = isDragging ? optimisticColumns : columns

  // Optimistic drag and drop implementation
  useEffect(() => {
    const element = scrollableRef.current
    if (!element || isLoading || columns.length === 0) {
      return
    }

    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDragStart() {
          setIsDragging(true)
          setOptimisticColumns([...columns]) // Initialize optimistic state
        },
        onDrop({ source, location }) {
          const dragging = source.data
          if (!isCardData(dragging)) {
            setIsDragging(false)
            return
          }

          const destination = location.current.dropTargets[0]
          if (!destination) {
            setIsDragging(false)
            return
          }

          const dropTargetData = destination.data

          // Find the task being dragged
          const sourceColumn = optimisticColumns.find(col => col.id === dragging.statusId)
          if (!sourceColumn) {
            setIsDragging(false)
            return
          }

          const taskIndex = sourceColumn.tasks.findIndex(task => task.id === dragging.card.id)
          if (taskIndex === -1) {
            setIsDragging(false)
            return
          }

          let targetColumnId: string
          let targetIndex: number
          let newOptimisticColumns = [...optimisticColumns]

          if (isCardDropTargetData(dropTargetData)) {
            // Dropping on another card
            const destColumn = optimisticColumns.find(col => col.id === dropTargetData.statusId)
            if (!destColumn) {
              setIsDragging(false)
              return
            }

            targetColumnId = destColumn.id

            if (sourceColumn.id === destColumn.id) {
              // Same column reorder - update optimistically
              const targetTaskIndex = destColumn.tasks.findIndex(task => task.id === dropTargetData.card.id)
              if (targetTaskIndex === -1 || targetTaskIndex === taskIndex) {
                setIsDragging(false)
                return
              }

              const closestEdge = extractClosestEdge(dropTargetData)
              if (!closestEdge) {
                setIsDragging(false)
                return
              }

              const reordered = reorderWithEdge({
                axis: "vertical",
                list: sourceColumn.tasks,
                startIndex: taskIndex,
                indexOfTarget: targetTaskIndex,
                closestEdgeOfTarget: closestEdge,
              })

              // Update optimistic state immediately
              newOptimisticColumns = newOptimisticColumns.map(col =>
                col.id === sourceColumn.id
                  ? { ...col, tasks: reordered }
                  : col
              )
              setOptimisticColumns(newOptimisticColumns)

              // Update backend (this will eventually update the real state)
              const newIndex = reordered.findIndex(t => t.id === dragging.card.id)
              
              if (dragging.card.id) {
                moveTask(dragging.card.id, destColumn.id, newIndex).finally(() => {
                  setIsDragging(false)
                })
              } else {
                console.error("Cannot move task: id is undefined")
                setIsDragging(false)
              }
              return
            } else {
              // Different column
              const targetTaskIndex = destColumn.tasks.findIndex(task => task.id === dropTargetData.card.id)
              const closestEdge = extractClosestEdge(dropTargetData)
              targetIndex = closestEdge === "bottom" ? targetTaskIndex + 1 : targetTaskIndex
            }
          } else if (isColumnData(dropTargetData)) {
            // Dropping on column
            const destColumn = optimisticColumns.find(col => col.id === dropTargetData.column.id)
            if (!destColumn) {
              setIsDragging(false)
              return
            }
            targetColumnId = destColumn.id
            targetIndex = destColumn.tasks.length
          } else {
            setIsDragging(false)
            return
          }

          // Cross-column move - update optimistically
          if (targetColumnId !== sourceColumn.id) {
            const taskToMove = sourceColumn.tasks[taskIndex]

            // Update optimistic state immediately
            newOptimisticColumns = newOptimisticColumns.map(col => {
              if (col.id === sourceColumn.id) {
                return {
                  ...col,
                  tasks: col.tasks.filter((_, i) => i !== taskIndex)
                }
              } else if (col.id === targetColumnId) {
                const newTasks = [...col.tasks]
                newTasks.splice(targetIndex, 0, { ...taskToMove, statusId: targetColumnId })
                return {
                  ...col,
                  tasks: newTasks
                }
              }
              return col
            })
            setOptimisticColumns(newOptimisticColumns)

            // Update backend
            if (dragging.card.id) {
              moveTask(dragging.card.id, targetColumnId, targetIndex).finally(() => {
                setIsDragging(false)
              })
            } else {
              console.error("Cannot move task: id is undefined")
              setIsDragging(false)
            }
          } else {
            setIsDragging(false)
          }
        },
      }),
      autoScrollForElements({
        canScroll: ({ source }) => isDraggingACard({ source }),
        element,
      })
    )
  }, [optimisticColumns, moveTask, isDragging])

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetch()
  }, [refetch])

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Flex align="center" gap="2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <Text>Loading board...</Text>
        </Flex>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Flex direction="column" align="center" gap="4">
          <Text className="text-red-500">Error: {error}</Text>
          <Button onClick={clearError} variant="outline">
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <Box className="w-full">
      {/* Fixed Board Header - Always visible, doesn't scroll horizontally */}
      <Box className="border-b border-gray-200 dark:border-gray-700">
        <Flex direction="column" gap="4" className="p-4">
          <Flex justify="between" align="center">
            <Heading size="6">Project Board</Heading>

            <Flex align="center" gap="2">
              {/* Global Add Task Button - Always visible */}


              {/* Board Actions */}
              <IconButton variant="ghost" onClick={handleRefresh}>
                <RefreshCw size={16} />
              </IconButton>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost">
                    <MoreVertical size={16} />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={handleRefresh}>
                    <RefreshCw size={14} />
                    Refresh Board
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Settings size={14} />
                    Board Settings
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
          </Flex>

          {/* Board Stats */}
          <Flex gap="6" className="text-sm text-gray-600 dark:text-gray-400">
            <Text>
              {projectStats.totalStatusLabels} column{projectStats.totalStatusLabels !== 1 ? "s" : ""}
            </Text>
            <Text>
              {projectStats.totalTasks} task{projectStats.totalTasks !== 1 ? "s" : ""}
            </Text>
            <Text>
              {projectStats.completedTasks} completed
            </Text>
            {projectStats.overdueTasks > 0 && (
              <Text className="text-red-600">
                {projectStats.overdueTasks} overdue
              </Text>
            )}
            {projectStats.urgentTasks > 0 && (
              <Text className="text-orange-600">
                {projectStats.urgentTasks} urgent
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Columns area - Horizontal scroll only, natural height growth */}
      <Box className="w-full">
        <ScrollArea 
          scrollbars="horizontal" 
          type="hover" 
          className="w-full"
          ref={scrollableRef}
        >
          {/* Columns container - Natural height, horizontal scroll */}
          <div className="p-4 flex gap-6" style={{ width: 'max-content' }}>
            {/* Kanban Columns */}
            {displayColumns.map((column) => (
              <div
                key={column.id}
                className="w-80 flex-shrink-0"
              >
                <BoardColumn
                  column={column}
                  onCreateTask={createTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                  onUpdateColumn={updateStatusLabel}
                  onDeleteColumn={deleteStatusLabel}
                  isDragging={isDragging}
                  onTaskOpen={onTaskOpen}
                />
              </div>
            ))}

            {/* Add Column */}
            <div className="w-80 flex-shrink-0">
              <Box className="min-h-[500px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <Flex
                  align="center"
                  justify="center"
                  className="h-full p-4"
                  direction="column"
                  gap="4"
                >
                  <CreateColumnForm
                    projectId={projectId}
                    onSuccess={handleRefresh}
                  />
                  <Text size="2" className="text-gray-500 text-center max-w-48">
                    Create a new status column to organize your workflow
                  </Text>
                </Flex>
              </Box>
            </div>
          </div>
        </ScrollArea>
      </Box>

      {/* Task Drawer */}
      <TaskCardDrawer />
    </Box>
  )
}
