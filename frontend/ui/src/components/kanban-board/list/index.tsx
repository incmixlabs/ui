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
        },
        onDrop({ source, location }) {
          setIsDragging(false)

          const dragging = source.data
          if (!isCardData(dragging)) {
            return
          }

          const innerMost = location.current.dropTargets[0]
          if (!innerMost) {
            return
          }

          const dropTargetData = innerMost.data
          const homeColumn = columns.find(
            (column) => column.id === dragging.statusId
          )

          if (!homeColumn) {
            return
          }

          // Ensure id exists before proceeding
          const draggedTaskId = dragging.card.id
          if (!draggedTaskId) {
            console.error("Task ID is missing for dragged card")
            return
          }

          const cardIndexInHome = homeColumn.tasks.findIndex(
            (task) => task.id === draggedTaskId
          )

          // Dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumn = columns.find(
              (column) => column.id === dropTargetData.statusId
            )

            if (!destinationColumn) {
              return
            }

            // Reordering in same column
            if (homeColumn.id === destinationColumn.id) {
              const targetTaskId = dropTargetData.card.id
              if (!targetTaskId) {
                console.error("Target task ID is missing")
                return
              }

              const cardFinishIndex = homeColumn.tasks.findIndex(
                (task) => task.id === targetTaskId
              )

              if (cardIndexInHome === -1 || cardFinishIndex === -1) {
                return
              }

              if (cardIndexInHome === cardFinishIndex) {
                return
              }

              const closestEdge = extractClosestEdge(dropTargetData)
              const reordered = reorderWithEdge({
                axis: "vertical",
                list: homeColumn.tasks,
                startIndex: cardIndexInHome,
                indexOfTarget: cardFinishIndex,
                closestEdgeOfTarget: closestEdge,
              })

              // Use moveTask with same column but new index
              const newIndex = reordered.findIndex(t => t.id === draggedTaskId)
              if (newIndex === -1) return
              moveTask(draggedTaskId, homeColumn.id, newIndex).catch((error) => {
                console.error("Failed to reorder tasks:", error)
              })

              return
            }

            // Moving to different column
            const targetTaskId = dropTargetData.card.id
            if (!targetTaskId) {
              console.error("Target task ID is missing")
              return
            }

            const indexOfTarget = destinationColumn.tasks.findIndex(
              (task) => task.id === targetTaskId
            )
            const closestEdge = extractClosestEdge(dropTargetData)
            const finalIndex = closestEdge === "bottom" ? indexOfTarget + 1 : indexOfTarget

            moveTask(draggedTaskId, destinationColumn.id, finalIndex).catch((error) => {
              console.error("Failed to move task:", error)
            })

            return
          }

          // Dropping onto a column
          if (isColumnData(dropTargetData)) {
            const destinationColumn = columns.find(
              (column) => column.id === dropTargetData.column.id
            )

            if (!destinationColumn || homeColumn.id === destinationColumn.id) {
              return
            }

            // Move to end of destination column
            moveTask(
              draggedTaskId,
              destinationColumn.id,
              destinationColumn.tasks.length
            ).catch((error) => {
              console.error("Failed to move task:", error)
            })
          }
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        element,
      })
    )
  }, [columns, moveTask, isLoading])

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

          {/* Selected Tasks Actions */}
          {selectedTasksCount > 0 && (
            <Box className="p-3 border border-blue-6 dark:border-blue-7 bg-blue-3 dark:bg-blue-4 rounded-md shadow-sm">
              <Flex justify="between" align="center">
                <Flex align="center" gap="2">
                  <Badge variant="solid" color="blue" size="1" className="px-2 py-0.5">
                    {selectedTasksCount}
                  </Badge>
                  <Text size="2" className="font-medium text-blue-11">
                    {selectedTasksCount === 1 ? 'task' : 'tasks'} selected
                  </Text>
                </Flex>
                <Flex gap="3" align="center">
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
                          <Sparkles size={16} />
                        )}
                        {isGenerating ?
                          `Generating ${generationStats.completed}/${generationStats.total}` :
                          "Generate AI Content"}
                      </Button>
                    </Tooltip>
                  )}
                  <Button
                    variant="soft"
                    color="blue"
                    size="2"
                    className="shadow-sm hover:shadow-md transition-all duration-150"
                    onClick={handleLogSelectedTasks}
                  >
                    <ClipboardList size={16} />
                    Log Selected
                  </Button>
                  <Button
                    variant="outline"
                    color="gray"
                    size="2"
                    className="shadow-sm hover:shadow-md hover:bg-gray-3 transition-all duration-150"
                    onClick={() => setSelectedTasks({})}
                  >
                    <XCircle size={16} />
                    Clear
                  </Button>
                </Flex>
              </Flex>
            </Box>
          )}
          <Flex justify="between" align="center">
            <Heading size="5" className="font-semibold text-gray-12 dark:text-gray-11">Project Tasks</Heading>

            <Flex align="center" gap="2">
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
          <Box className="w-full space-y-6">
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
