// components/board/index.tsx
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
  DropdownMenu 
} from "@incmix/ui"
import { 
  Plus, 
  Loader2, 
  Settings, 
  LayoutGrid,
  MoreVertical,
  RefreshCw
} from "lucide-react"
import { useKanban } from "@incmix/store"

import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
} from "../types"
import type { KanbanColumn, KanbanTask } from "../types"
import { BoardColumn } from "./board-column"
import { GlobalAddTaskForm } from "./add-task-form"
import { TaskCardDrawer } from "./task-card-drawer"
import { CreateColumnForm } from "./create-coloumn-form"

// Simple type adapters
const adaptTaskToUIFormat = (task: any): KanbanTask => ({
  ...task,
  attachments: task.attachments || [],
  labelsTags: task.labelsTags || [],
  assignedTo: task.assignedTo || [],
  subTasks: task.subTasks || [],
  priority: task.priority || "medium",
  completed: task.completed || false,
})

const adaptColumnToUIFormat = (column: any): KanbanColumn => ({
  ...column,
  tasks: (column.tasks || []).map(adaptTaskToUIFormat)
})

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
  
  // Data management
  const kanban = useKanban(projectId)
  const [columns, setColumns] = useState<KanbanColumn[]>([])

  // Update columns when data changes
  useEffect(() => {
    if (!kanban.isLoading && kanban.columns) {
      const adaptedColumns = kanban.columns.map(adaptColumnToUIFormat)
      setColumns(adaptedColumns)
    }
  }, [kanban.columns, kanban.isLoading])

  // Simplified drag and drop implementation
  useEffect(() => {
    const element = scrollableRef.current
    if (!element || kanban.isLoading || columns.length === 0) {
      return
    }

    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDragStart() {
          setIsDragging(true)
        },
        onDrop({ source, location }) {
          setIsDragging(false)
          
          const dragging = source.data
          if (!isCardData(dragging)) return

          const destination = location.current.dropTargets[0]
          if (!destination) return

          const dropTargetData = destination.data

          // Find the task being dragged
          const sourceColumn = columns.find(col => col.id === dragging.columnId)
          if (!sourceColumn) return

          const taskIndex = sourceColumn.tasks.findIndex(task => task.taskId === dragging.card.taskId)
          if (taskIndex === -1) return

          let targetColumnId: string
          let targetIndex: number

          if (isCardDropTargetData(dropTargetData)) {
            // Dropping on another card
            const destColumn = columns.find(col => col.id === dropTargetData.columnId)
            if (!destColumn) return

            targetColumnId = destColumn.id
            
            if (sourceColumn.id === destColumn.id) {
              // Same column reorder
              const targetTaskIndex = destColumn.tasks.findIndex(task => task.taskId === dropTargetData.card.taskId)
              if (targetTaskIndex === -1 || targetTaskIndex === taskIndex) return

              const closestEdge = extractClosestEdge(dropTargetData)
              if (!closestEdge) return

              const reordered = reorderWithEdge({
                axis: "vertical",
                list: sourceColumn.tasks,
                startIndex: taskIndex,
                indexOfTarget: targetTaskIndex,
                closestEdgeOfTarget: closestEdge,
              })

              // Update local state immediately for smooth UI
              setColumns(prevColumns => 
                prevColumns.map(col => 
                  col.id === sourceColumn.id ? { ...col, tasks: reordered } : col
                )
              )

              // Update backend
              const newIndex = reordered.findIndex(t => t.taskId === dragging.card.taskId)
              kanban.moveTask(dragging.card.taskId, destColumn.id, newIndex)
              return
            } else {
              // Different column
              const targetTaskIndex = destColumn.tasks.findIndex(task => task.taskId === dropTargetData.card.taskId)
              const closestEdge = extractClosestEdge(dropTargetData)
              targetIndex = closestEdge === "bottom" ? targetTaskIndex + 1 : targetTaskIndex
            }
          } else if (isColumnData(dropTargetData)) {
            // Dropping on column
            const destColumn = columns.find(col => col.id === dropTargetData.column.id)
            if (!destColumn) return
            targetColumnId = destColumn.id
            targetIndex = destColumn.tasks.length
          } else {
            return
          }

          // Cross-column move
          if (targetColumnId !== sourceColumn.id) {
            const taskToMove = sourceColumn.tasks[taskIndex]
            
            // Update UI immediately
            setColumns(prevColumns => {
              return prevColumns.map(col => {
                if (col.id === sourceColumn.id) {
                  return {
                    ...col,
                    tasks: col.tasks.filter((_, i) => i !== taskIndex)
                  }
                } else if (col.id === targetColumnId) {
                  const newTasks = [...col.tasks]
                  newTasks.splice(targetIndex, 0, { ...taskToMove, columnId: targetColumnId })
                  return {
                    ...col,
                    tasks: newTasks
                  }
                }
                return col
              })
            })

            // Update backend
            kanban.moveTask(dragging.card.taskId, targetColumnId, targetIndex)
          }
        },
      }),
      autoScrollForElements({
        canScroll: ({ source }) => isDraggingACard({ source }),
        element,
      })
    )
  }, [columns, kanban])

  // Refresh data
  const handleRefresh = useCallback(() => {
    kanban.refetch()
  }, [kanban])

  if (kanban.isLoading) {
    return (
      <Box className="flex items-center justify-center h-96">
        <Flex align="center" gap="2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <Text>Loading board...</Text>
        </Flex>
      </Box>
    )
  }

  if (kanban.error) {
    return (
      <Box className="flex items-center justify-center h-96">
        <Flex direction="column" align="center" gap="4">
          <Text className="text-red-500">Error: {kanban.error}</Text>
          <Button onClick={kanban.clearError} variant="outline">
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <Box className="h-full w-full overflow-hidden">
      {/* Board Header */}
      <Flex direction="column" gap="4" className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Flex justify="between" align="center">
          <Heading size="6">Project Board</Heading>
          
          <Flex align="center" gap="2">
            {/* Global Add Task Button */}
            <GlobalAddTaskForm
              projectId={projectId}
              columns={columns}
              onSuccess={handleRefresh}
            />

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
            {columns.length} column{columns.length !== 1 ? "s" : ""}
          </Text>
          <Text>
            {columns.reduce((acc, col) => acc + col.tasks.length, 0)} task{columns.reduce((acc, col) => acc + col.tasks.length, 0) !== 1 ? "s" : ""}
          </Text>
          <Text>
            {columns.reduce((acc, col) => acc + col.tasks.filter(t => t.completed).length, 0)} completed
          </Text>
        </Flex>
      </Flex>

      {/* Board Content */}
      <Box className="flex-1 overflow-hidden">
        <Flex 
          className="h-full gap-6 overflow-x-auto overflow-y-hidden p-4"
          ref={scrollableRef}
          style={{ minHeight: "calc(100vh - 200px)" }}
        >
          {/* Kanban Columns */}
          {columns.map((column) => (
            <Box 
              key={column.id} 
              className="flex-shrink-0 w-80"
            >
              <BoardColumn 
                column={column}
                onCreateTask={kanban.createTask}
                onUpdateTask={kanban.updateTask}
                onDeleteTask={kanban.deleteTask}
                onUpdateColumn={kanban.updateColumn}
                onDeleteColumn={kanban.deleteColumn}
                isDragging={isDragging}
                onTaskOpen={onTaskOpen}
              />
            </Box>
          ))}
          
          {/* Add Column */}
          <Box className="flex-shrink-0 w-80">
            <Box className="h-full min-h-[200px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
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
          </Box>
        </Flex>
      </Box>

      {/* Task Drawer */}
      <TaskCardDrawer />
    </Box>
  )
}