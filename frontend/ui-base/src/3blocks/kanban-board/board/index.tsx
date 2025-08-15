// components/board/index.tsx - Fixed horizontal scrolling

import { Box, Button, Flex, ScrollArea, Text, toast } from "@/base"
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { useAIFeaturesStore } from "@incmix/store"
import { Loader2, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DndKanbanBoard } from "../dnd-example/KanbanBoard"
import { useKanban } from "../hooks/use-kanban-data"
import { CreateColumnForm } from "../shared/create-column-form"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import { TaskViewHeader } from "../shared/task-view-header"
import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
} from "../types"
import type { KanbanColumn } from "../types"
import { exportAllTasksToCSV } from "../utils/csv-export"

interface BoardProps {
  projectId?: string
  onTaskOpen?: (taskId: string) => void
}

export function Board({
  projectId = "default-project",
  onTaskOpen,
}: BoardProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  // const [columns, setColumns] = useState<Column[]>(columnsData);
  // const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  // const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // const [tasks, setTasks] = useState<Task[]>(initialTasks);
  // const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  // const [activeTask, setActiveTask] = useState<Task | null>(null);

  // ... (all your existing hooks and logic remain the same)
  const [optimisticColumns, setOptimisticColumns] = useState<KanbanColumn[]>([])
  const {
    columns,
    priorityLabels,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    updateStatusLabel,
    deleteStatusLabel,
    refetch,
    clearError,
    projectStats,
  } = useKanban(projectId)

  useEffect(() => {
    if (!isDragging) {
      setOptimisticColumns(columns)
    }
  }, [columns, isDragging])

  const displayColumns = isDragging ? optimisticColumns : columns

  // Filter columns based on search query
  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim()) return displayColumns

    const lowerSearchQuery = searchQuery.toLowerCase()
    return displayColumns.map((column) => ({
      ...column,
      tasks: column.tasks.filter(
        (task) =>
          task.name?.toLowerCase().includes(lowerSearchQuery) ||
          task.description?.toLowerCase().includes(lowerSearchQuery)
      ),
    }))
  }, [displayColumns, searchQuery])

  useEffect(() => {
    const element = scrollableRef.current
    if (!element || isLoading || columns.length === 0) {
      return
    }
    // ... (your entire drag and drop useEffect remains the same)
    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDragStart() {
          setIsDragging(true)
          setOptimisticColumns([...columns])
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
          const sourceColumn = optimisticColumns.find(
            (col) => col.id === dragging.statusId
          )
          if (!sourceColumn) {
            setIsDragging(false)
            return
          }

          const taskIndex = sourceColumn.tasks.findIndex(
            (task) => task.id === dragging.card.id
          )
          if (taskIndex === -1) {
            setIsDragging(false)
            return
          }

          let targetColumnId: string
          let targetIndex: number
          let newOptimisticColumns = [...optimisticColumns]

          if (isCardDropTargetData(dropTargetData)) {
            const destColumn = optimisticColumns.find(
              (col) => col.id === dropTargetData.statusId
            )
            if (!destColumn) {
              setIsDragging(false)
              return
            }

            targetColumnId = destColumn.id

            if (sourceColumn.id === destColumn.id) {
              const targetTaskIndex = destColumn.tasks.findIndex(
                (task) => task.id === dropTargetData.card.id
              )
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

              newOptimisticColumns = newOptimisticColumns.map((col) =>
                col.id === sourceColumn.id ? { ...col, tasks: reordered } : col
              )
              setOptimisticColumns(newOptimisticColumns)

              const newIndex = reordered.findIndex(
                (t) => t.id === dragging.card.id
              )

              if (dragging.card.id) {
                moveTask(dragging.card.id, destColumn.id, newIndex).finally(
                  () => {
                    setIsDragging(false)
                  }
                ).catch((error) => {
                  console.error("Failed to move task:", error)
                  toast.error("Failed to move task", {
                    description: error.message || "Please try again",
                    duration: 3000,
                  })
                })
              } else {
                console.error("Cannot move task: id is undefined")
                toast.error("Cannot move task", {
                  description: "Task ID is missing",
                  duration: 3000,
                })
                setIsDragging(false)
              }
              return
            }
            const targetTaskIndex = destColumn.tasks.findIndex(
              (task) => task.id === dropTargetData.card.id
            )
            const closestEdge = extractClosestEdge(dropTargetData)
            targetIndex =
              closestEdge === "bottom" ? targetTaskIndex + 1 : targetTaskIndex
          } else if (isColumnData(dropTargetData)) {
            const destColumn = optimisticColumns.find(
              (col) => col.id === dropTargetData.column.id
            )
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

          if (targetColumnId !== sourceColumn.id) {
            const taskToMove = sourceColumn.tasks[taskIndex]
            newOptimisticColumns = newOptimisticColumns.map((col) => {
              if (col.id === sourceColumn.id) {
                return {
                  ...col,
                  tasks: col.tasks.filter((_, i) => i !== taskIndex),
                }
              }
              if (col.id === targetColumnId) {
                const newTasks = [...col.tasks]
                newTasks.splice(targetIndex, 0, {
                  ...taskToMove,
                  statusId: targetColumnId,
                })
                return {
                  ...col,
                  tasks: newTasks,
                }
              }
              return col
            })
            setOptimisticColumns(newOptimisticColumns)

            if (dragging.card.id) {
              moveTask(dragging.card.id, targetColumnId, targetIndex).finally(
                () => {
                  setIsDragging(false)
                }
              )
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

  const handleRefresh = useCallback(() => {
    refetch()
  }, [refetch])

  // CSV export handler for all tasks
  const handleExportAllCSV = useCallback(async () => {
    try {
      // Check if there are any tasks to export
      const totalFiltered = filteredColumns.reduce(
        (n, c) => n + c.tasks.length,
        0
      )
      if (totalFiltered === 0) {
        toast.info("No tasks to export for current filter", {
          description:
            "Try adjusting your search or filters to include more tasks",
          duration: 3000,
        })
        return
      }

      // Show loading feedback
      toast.info("Exporting tasks to CSV...", {
        description: `Preparing ${totalFiltered} task${totalFiltered !== 1 ? "s" : ""} for export`,
        duration: 2000,
      })

      // Perform the export
      exportAllTasksToCSV(filteredColumns, priorityLabels, {
        includeSubtasks: true,
        includeMetadata: true,
        includeTimestamps: true,
      })

      // Show success feedback
      toast.success("CSV export completed", {
        description: `Successfully exported ${totalFiltered} task${totalFiltered !== 1 ? "s" : ""} to CSV file`,
        duration: 4000,
      })
    } catch (error) {
      console.error("Failed to export CSV:", error)

      // Show error feedback to user
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"
      toast.error("Failed to export CSV", {
        description: errorMessage,
        duration: 5000,
      })
    }
  }, [filteredColumns, priorityLabels])

  if (isLoading) {
    return (
      <Box className="flex h-full items-center justify-center">
        <Flex align="center" gap="2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <Text>Loading board...</Text>
        </Flex>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex h-full items-center justify-center">
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

  console.log("displayColumns", displayColumns)

  return (
    // FIX: The Board is now a flex column that fills the height of its container.
    <Box className="flex h-full w-full flex-col">
      {/* HEADER: Using reusable task view header */}
      <TaskViewHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search tasks..."
        stats={{
          totalStatusLabels: projectStats.totalStatusLabels,
          totalTasks: projectStats.totalTasks,
          completedTasks: projectStats.completedTasks,
          overdueTasks: projectStats.overdueTasks,
          urgentTasks: projectStats.urgentTasks,
        }}
        onRefresh={handleRefresh}
        showExportCSV={true}
        onExportCSV={handleExportAllCSV}
        isLoading={isLoading}
      />

      <Box className="flex-1 overflow-hidden">
        <ScrollArea
          scrollbars="horizontal"
          type="hover"
          className="h-full w-full"
          ref={scrollableRef}
        >
          <div
            className="flex h-full gap-6 p-4"
            style={{ width: "max-content" }}
          >
            {/* {displayColumns.map((column) => (
              <div key={column.id} className="w-80 flex-shrink-0 h-full">
                <BoardColumn
                  column={column}
                  priorityLabels={priorityLabels}
                  onCreateTask={createTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                  onUpdateColumn={updateStatusLabel}
                  onDeleteColumn={deleteStatusLabel}
                  isDragging={isDragging}
                  onTaskOpen={onTaskOpen}
                />
              </div>
            ))} */}
            <DndKanbanBoard
              columnsData={filteredColumns}
              priorityLabels={priorityLabels}
              onCreateTask={createTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onUpdateColumn={updateStatusLabel}
              onDeleteColumn={deleteStatusLabel}
              isDragging={isDragging}
              onTaskOpen={onTaskOpen}
            />
            <div className="h-full w-80 flex-shrink-0">
              <Box className="h-full rounded-lg border border-gray-6 bg-gray-3">
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
                  <Text size="2" className="max-w-48 text-center text-gray-10">
                    Create a new status column to organize your workflow
                  </Text>
                </Flex>
              </Box>
            </div>
          </div>
        </ScrollArea>
      </Box>

      <TaskCardDrawer viewType="board" projectId={projectId} />
    </Box>
  )
}
