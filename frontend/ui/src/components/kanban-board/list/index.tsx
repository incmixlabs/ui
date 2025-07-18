// components/list/list-board.tsx - Updated to use new task input system

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { bindAll } from "bind-event-listener"
import {  useEffect, useRef, useState, useCallback, useMemo } from "react"
import { ListColumn } from "./list-column"
import { ConfirmationDialog } from "./confirmation-dialog"
import { type KanbanTask } from "../types"
import { Box, Flex, Heading, IconButton, Button, Text, TextField, TextArea, Badge, Tooltip, toast, DropdownMenu, Dialog } from "@incmix/ui"

import { Plus, Search, RefreshCw, Settings, MoreVertical, X, ClipboardList, XCircle, Sparkles, Loader2 } from "lucide-react"
import { CreateColumnForm } from "../shared/create-column-form"


import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from "../types"
import {
  useAIFeaturesStore,
  useBulkAIGeneration
} from "@incmix/store"
import { useListView } from "../hooks/use-list-view"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import { blockBoardPanningAttr } from "../data-attributes"

interface ListBoardProps {
  projectId?: string
}

export function ListBoard({ projectId = "default-project" }: ListBoardProps) {
  // Get AI features state
  const { useAI } = useAIFeaturesStore()
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [optimisticColumns, setOptimisticColumns] = useState<typeof columns>([])

  // Task selection state
  const [selectedTasks, setSelectedTasks] = useState<Record<string, { id: string; name: string }>>({});

  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Dialog open state for add column form
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false)
  
  // Column refresh handler
  const handleColumnAdded = useCallback((columnId: string) => {
    // Close the dialog when column is added successfully
    setIsAddColumnDialogOpen(false)
    
    // No need to do anything specific here as the list will update automatically
    // through the useListView hook
  }, [])

  // Use the list view hook
  const {
    columns,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createStatusLabel, // Using compatibility methods instead
    updateStatusLabel, // Using compatibility methods instead
    deleteStatusLabel, // Using compatibility methods instead
    projectStats
  } = useListView(projectId)

  // Get bulk AI generation hook
  const {
    generateForTasks,
    isGenerating,
    stats: generationStats,
    error: generationError,
    clearError: clearGenerationError
  } = useBulkAIGeneration(updateTask)

  // Filter columns based on search query
  const filteredColumns = columns.filter(column =>
    column.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    column.tasks.some(task =>
      task.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )


  // Handle task selection
  const handleTaskSelect = useCallback((id: string, selected: boolean, taskName: string) => {
    setSelectedTasks(prev => {
      if (selected) {
        return { ...prev, [id]: { id, name: taskName } }
      } else {
        const newSelected = { ...prev }
        delete newSelected[id]
        return newSelected
      }
    })
  }, [])

  // Handle bulk selection for a column
  const handleColumnSelectAll = useCallback((statusId: string, selected: boolean) => {
    const column = columns.find(col => col.id === statusId)
    if (!column) return

    setSelectedTasks(prev => {
      const newSelected = { ...prev }

      column.tasks.forEach(task => {
        if (!task.id) return; // Skip tasks without a id
        
        if (selected) {
          newSelected[task.id] = { id: task.id, name: task.name || '' }
        } else {
          delete newSelected[task.id]
        }
      })

      return newSelected
    })
  }, [columns])

  // Log selected tasks
  const handleLogSelectedTasks = useCallback(() => {
    console.log('Selected Tasks:', Object.values(selectedTasks))
  }, [selectedTasks])

  // Prompt for AI content generation
  const promptGenerateAIContent = useCallback(() => {
    if (Object.keys(selectedTasks).length === 0 || !useAI) return
    setShowConfirmDialog(true)
  }, [selectedTasks, useAI])

  // Generate AI content for selected tasks (actual implementation)
  const handleGenerateAIContent = useCallback(async () => {
    if (Object.keys(selectedTasks).length === 0 || !useAI) return

    try {
      clearGenerationError()
      const selectedTasksArray = Object.values(selectedTasks)

      // Close the confirmation dialog
      setShowConfirmDialog(false)

      // Display the number of tasks to be processed
      const taskCount = selectedTasksArray.length
      toast.info(
        `Starting AI content generation for ${taskCount} task${taskCount !== 1 ? 's' : ''}`,
        { duration: 3000 }
      )

      // Call the bulk generation function
      const result = await generateForTasks(selectedTasksArray)

      if (result.success) {
        toast.success(result.message, {
          description: `Generated content for ${result.message.split(' ')[2]} tasks`,
          duration: 5000
        })
      } else {
        toast.error('Failed to generate content', {
          description: result.message,
          duration: 5000
        })
        console.error('Failed to generate content:', result.message)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      toast.error('Error generating AI content', {
        description: errorMsg,
        duration: 5000
      })
      console.error('Error generating AI content:', error)
    }
  }, [selectedTasks, useAI, generateForTasks, clearGenerationError])

  // Count selected tasks
  const selectedTasksCount = useMemo(() => Object.keys(selectedTasks).length, [selectedTasks])

  // Drag and drop setup
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
          const sourceColumn = optimisticColumns.find(col => col.id === dragging.statusId)
          if (!sourceColumn) {
            setIsDragging(false)
            return
          }

          const taskIndex = sourceColumn.tasks.findIndex((task: KanbanTask) => task.id === dragging.card.id)
          if (taskIndex === -1) {
            setIsDragging(false)
            return
          }

          let targetColumnId: string
          let targetIndex: number
          let newOptimisticColumns = [...optimisticColumns]

          if (isCardDropTargetData(dropTargetData)) {
            const destColumn = optimisticColumns.find(col => col.id === dropTargetData.statusId)
            if (!destColumn) {
              setIsDragging(false)
              return
            }

            targetColumnId = destColumn.id

            if (sourceColumn.id === destColumn.id) {
              // Moving within the same column
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
              
              // Check if the dragged task has subtasks that need to move with it
              const draggingTask = sourceColumn.tasks[taskIndex]
              const subtaskIds = draggingTask.isSubtask ? [] : 
                sourceColumn.tasks
                  .filter(task => task.isSubtask && task.parentTaskId === draggingTask.id)
                  .map(task => task.id)
              
              // Prevent dropping a parent task onto its own subtask
              const targetTask = sourceColumn.tasks[targetTaskIndex]
              if (targetTask && subtaskIds.includes(targetTask.id)) {
                setIsDragging(false)
                return
              }
              
              // If we're moving a task with subtasks, we need special handling
              if (subtaskIds.length > 0) {
                // Create a copy of the tasks array to work with
                let tasksCopy = [...sourceColumn.tasks]
                
                // Remove the parent task and all its subtasks from their original positions
                const parentTask = {...tasksCopy[taskIndex]}
                const subtasks = tasksCopy.filter(task => subtaskIds.includes(task.id || ''))
                
                // Remove the parent and subtasks from the array
                tasksCopy = tasksCopy.filter(task => 
                  task.id !== parentTask.id && !subtaskIds.includes(task.id || ''))
                
                // Calculate where to insert the tasks
                let insertIndex
                if (targetTaskIndex < taskIndex) {
                  // Moving upward
                  insertIndex = closestEdge === 'bottom' ? targetTaskIndex + 1 : targetTaskIndex
                } else {
                  // Moving downward (need to account for the removed items)
                  const removedItemsBeforeTarget = [parentTask.id, ...subtaskIds]
                    .filter(id => {
                      const idx = sourceColumn.tasks.findIndex(t => t.id === id)
                      return idx !== -1 && idx < targetTaskIndex
                    }).length
                  
                  insertIndex = closestEdge === 'bottom' ? 
                    targetTaskIndex + 1 - removedItemsBeforeTarget : 
                    targetTaskIndex - removedItemsBeforeTarget
                }
                
                // Insert the parent task and all its subtasks at the new position
                tasksCopy.splice(insertIndex, 0, parentTask, ...subtasks)
                
                // Update the column with the reordered tasks
                newOptimisticColumns = newOptimisticColumns.map(col =>
                  col.id === sourceColumn.id ? { ...col, tasks: tasksCopy } : col
                )
              } else {
                // Standard reordering for tasks without subtasks
                const reordered = reorderWithEdge({
                  axis: "vertical",
                  list: sourceColumn.tasks,
                  startIndex: taskIndex,
                  indexOfTarget: targetTaskIndex,
                  closestEdgeOfTarget: closestEdge,
                })
                
                newOptimisticColumns = newOptimisticColumns.map(col =>
                  col.id === sourceColumn.id ? { ...col, tasks: reordered } : col
                )
              }
              
              setOptimisticColumns(newOptimisticColumns)
              
              // Find the new index of the dragged task
              const updatedColumn = newOptimisticColumns.find(col => col.id === sourceColumn.id)
              const newIndex = updatedColumn?.tasks.findIndex((t: KanbanTask) => t.id === dragging.card.id) || 0
              
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
              // Moving between columns
              const targetTaskIndex = destColumn.tasks.findIndex(task => task.id === dropTargetData.card.id)
              const closestEdge = extractClosestEdge(dropTargetData)
              targetIndex = closestEdge === "bottom" ? targetTaskIndex + 1 : targetTaskIndex
            }
          } else if (isColumnData(dropTargetData)) {
            // Dropping directly on a column
            targetColumnId = dropTargetData.column.id
            targetIndex = 0
          } else {
            setIsDragging(false)
            return
          }

          // Optimistically update the columns
          newOptimisticColumns = newOptimisticColumns.map(col => {
            if (col.id === sourceColumn.id) {
              return {
                ...col,
                tasks: col.tasks.filter((_t: KanbanTask, i: number) => i !== taskIndex),
              }
            }
            if (col.id === targetColumnId) {
              const newTasks = [...col.tasks]
              newTasks.splice(targetIndex, 0, sourceColumn.tasks[taskIndex])
              return { ...col, tasks: newTasks }
            }
            return col
          })

          setOptimisticColumns(newOptimisticColumns)

          if (dragging.card.id) {
            moveTask(dragging.card.id, targetColumnId, targetIndex).finally(() => {
              setIsDragging(false)
            })
          } else {
            console.error("Cannot move task: id is undefined")
            setIsDragging(false)
          }
        },
      }),
      autoScrollForElements({
        element,
        canScroll: ({ source }) => isCardData(source.data),
      })
    )
  }, [columns, isLoading, moveTask, optimisticColumns])

  // Use optimistic columns for drag and drop operations
  useEffect(() => {
    if (!isDragging) {
      setOptimisticColumns(columns)
    }
  }, [columns, isDragging])

  const displayColumns = isDragging ? optimisticColumns : columns

  // Handle board panning
  useEffect(() => {
    let cleanupActive: any = null
    const scrollable = scrollableRef.current

    if (!scrollable) {
      return
    }

    function begin({ startX }: { startX: number }) {
      let lastX = startX

      const cleanupEvents = bindAll(
        window,
        [
          {
            type: "pointermove",
            listener(event) {
              const currentX = event.clientX
              const diffX = lastX - currentX
              lastX = currentX
              scrollable?.scrollBy({ left: diffX })
            },
          },
          ...(
            [
              "pointercancel",
              "pointerup",
              "pointerdown",
              "keydown",
              "resize",
              "click",
              "visibilitychange",
            ] as const
          ).map((eventName) => ({
            type: eventName,
            listener: () => cleanupEvents(),
          })),
        ],
        { capture: true }
      )

      cleanupActive = cleanupEvents
    }

    const cleanupStart = bindAll(scrollable, [
      {
        type: "pointerdown",
        listener(event) {
          if (!(event.target instanceof HTMLElement)) {
            return
          }
          if (event.target.closest(`[${blockBoardPanningAttr}]`)) {
            return
          }
          begin({ startX: event.clientX })
        },
      },
    ])

    return function cleanupAll() {
      cleanupStart()
      cleanupActive?.()
    }
  }, [])

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <div>Loading tasks...</div>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center h-64">
        <Flex direction="column" align="center" gap="4">
          <div className="text-red-9">Error: {error}</div>
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    // FIX: Making ListBoard structure consistent with Board component to fix double scrollbars
    <Box className="w-full h-full flex flex-col overflow-hidden">
      {/* HEADER: Fixed header area */}
      <Box className="flex-shrink-0 border-b border-gray-4 dark:border-gray-5 bg-gray-1 dark:bg-gray-2">
        <Flex direction="column" gap="4" className="p-4">

          <Flex justify="between" align="center">
            <Heading size="5" className="font-semibold text-gray-12 dark:text-gray-11">Project Tasks</Heading>

            <Flex align="center" gap="2">
              {/* Selected Tasks Actions - moved here from separate row */}
              {selectedTasksCount > 0 && (
                <>
                  <Flex align="center" gap="2" className="mr-2">
                    <Badge variant="solid" color="blue" size="1" className="px-2 py-0.5">
                      {selectedTasksCount}
                    </Badge>
                    <Text size="2" className="font-medium text-blue-11">
                      {selectedTasksCount === 1 ? 'task' : 'tasks'} selected
                    </Text>
                  </Flex>
                  
                  {useAI && (
                    <Tooltip content={!isGenerating ? "Generate AI content for selected tasks" : "Generating content..."}>
                      <Button
                        variant="soft"
                        color="purple"
                        size="2"
                        className="shadow-sm hover:shadow-md transition-all duration-150"
                        onClick={promptGenerateAIContent}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <Loader2 size={16} className="animate-spin mr-1" />
                        ) : (
                          <Sparkles size={16} className="mr-1" />
                        )}
                        {isGenerating ?
                          `Generating...` :
                          "Generate AI"}
                      </Button>
                    </Tooltip>
                  )}
                  
                  <Button
                    variant="outline"
                    color="gray"
                    size="2"
                    className="shadow-sm hover:shadow-md hover:bg-gray-3 transition-all duration-150"
                    onClick={() => setSelectedTasks({})}
                  >
                    <XCircle size={16} className="mr-1" />
                    Clear
                  </Button>
                </>
              )}
              
              <Button 
                variant="soft" 
                size="2" 
                className="flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-150" 
                onClick={() => setIsAddColumnDialogOpen(true)}
              >
                <Plus size={14} />
                Add Column
              </Button>
              
              <Tooltip content="Refresh">
                <IconButton 
                  variant="soft" 
                  size="1"
                  className="hover:shadow-sm transition-all duration-150"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw size={14} />
                </IconButton>
              </Tooltip>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton 
                    variant="soft" 
                    size="1"
                    className="hover:shadow-sm transition-all duration-150"
                  >
                    <MoreVertical size={14} />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Group>
                    {/* Settings items go here */}
                    <DropdownMenu.Item>
                      <Flex align="center" gap="2">
                        <Settings size={14} className="text-gray-11" />
                        <Text size="2">Settings</Text>
                      </Flex>
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
          </Flex>

          {/* Search and Stats */}
          <Flex justify="between" align="center" gap="4">
            <Box className="flex-1 relative max-w-md">
              <Search size={16} className="absolute top-2.5 left-3 text-gray-9" />
              <TextField.Root
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="pl-9 h-9"
                size="2"
              />
            </Box>

            <Flex gap="6" className="text-gray-10">
              <Text size="1">{projectStats.totalStatusLabels} columns</Text>
              <Text size="1">{projectStats.totalTasks} tasks</Text>
              <Text size="1">{projectStats.completedTasks} completed</Text>
              {projectStats.overdueTasks > 0 && (
                <Text size="1" className="text-red-9">{projectStats.overdueTasks} overdue</Text>
              )}
              {projectStats.urgentTasks > 0 && (
                <Text size="1" className="text-orange-9">{projectStats.urgentTasks} urgent</Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* CONTENT AREA: Flexible content area with proper overflow handling */}
      <Box className="flex-1 h-full">
        {/* The main content container shouldn't have its own scroll */}
        <Box className="w-full h-full p-4" ref={scrollableRef}>
          <Box className="w-full space-y-2">
            {/* Column creation is now handled by the CreateColumnForm in the dropdown menu */}

              {filteredColumns.map((column) => (
                <ListColumn
                  key={column.id}
                  column={column}
                  columns={columns}
                  onCreateTask={createTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                  onUpdateColumn={(id, updates) => updateStatusLabel(id, updates)}
                  onDeleteColumn={deleteStatusLabel}
                  isDragging={isDragging}
                  selectedTaskIds={selectedTasks}
                  onTaskSelect={handleTaskSelect}
                  onSelectAll={handleColumnSelectAll}
                />
              ))}

            {filteredColumns.length === 0 && searchQuery && (
              <Box className="text-center py-12">
                <div className="text-gray-9">No tasks found matching "{searchQuery}"</div>
              </Box>
            )}

            {filteredColumns.length === 0 && !searchQuery && (
              <Flex direction="column" align="center" className="py-12 space-y-4">
                <Text className="text-gray-9">No status columns found. Create your first column to get started.</Text>
                <Button
                  variant="soft"
                  onClick={() => setIsAddColumnDialogOpen(true)}
                >
                  <Plus size={14} />
                  Add Status Column
                </Button>
              </Flex>
            )}
          </Box>

          <TaskCardDrawer viewType="list" projectId={projectId} />
        </Box>
      </Box>

      {/* AI Generation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleGenerateAIContent}
        title="Generate AI Content"
        description={
          `This will generate AI content for ${Object.keys(selectedTasks).length} selected task${Object.keys(selectedTasks).length !== 1 ? 's' : ''}. ` +
          `Any existing description, checklists, and acceptance criteria will be replaced with AI-generated content. Are you sure?`
        }
        confirmText="Generate"
        cancelText="Cancel"
        isLoading={isGenerating}
      />
      
      {/* Controlled CreateColumnForm dialog */}
      <CreateColumnForm
        projectId={projectId}
        onSuccess={handleColumnAdded}
        controlled={true}
        open={isAddColumnDialogOpen}
        onOpenChange={setIsAddColumnDialogOpen}
      />
    </Box>
  );
}
