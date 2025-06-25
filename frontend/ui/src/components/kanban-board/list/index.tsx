// components/list/list-board.tsx - Updated to use new task input system
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { bindAll } from "bind-event-listener"
import {  useEffect, useRef, useState, useCallback, useMemo } from "react"
import { ListColumn } from "./list-column"
import { Box, Flex, Heading, IconButton, Button, Text, TextField, TextArea, Badge } from "@incmix/ui"

import { Plus, Search, RefreshCw, Settings, MoreVertical, ChevronRight, X, ClipboardList, XCircle, CheckCircle2 } from "lucide-react"

import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
  blockBoardPanningAttr,
  useListView,
  useAIFeaturesStore
} from "@incmix/store"
import { useKanban } from "@incmix/store"
import ColorPicker, { ColorSelectType } from "@components/color-picker"
import { TaskCardDrawer } from "../shared/task-card-drawer"

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
  const [selectedTasks, setSelectedTasks] = useState<{[key: string]: {taskId: string, name: string}}>({})
  
  // New column creation state
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnName, setNewColumnName] = useState("")
  const [newColumnDescription, setNewColumnDescription] = useState("")
  const [newColumnColor, setNewColumnColor] = useState("#3B82F6")
  const [addColumnFormOpen, setAddColumnFormOpen] = useState(false)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  
  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerRef]);  
  const [isCreatingColumn, setIsCreatingColumn] = useState(false)
  
  // Use the list view hook
  const {
    columns,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createColumn,
    updateColumn,
    deleteColumn,
    refetch,
    clearError,
    projectStats
  } = useListView(projectId)

  // Filter columns based on search query
  const filteredColumns = columns.filter(column => 
    column.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    column.tasks.some(task => 
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetch()
  }, [refetch])
  
  // Handle task selection
  const handleTaskSelect = useCallback((taskId: string, selected: boolean, taskName: string) => {
    setSelectedTasks(prev => {
      if (selected) {
        return { ...prev, [taskId]: { taskId, name: taskName } }
      } else {
        const newSelected = { ...prev }
        delete newSelected[taskId]
        return newSelected
      }
    })
  }, [])
  
  // Handle bulk selection for a column
  const handleColumnSelectAll = useCallback((columnId: string, selected: boolean) => {
    const column = columns.find(col => col.id === columnId)
    if (!column) return
    
    setSelectedTasks(prev => {
      const newSelected = { ...prev }
      
      column.tasks.forEach(task => {
        if (selected) {
          newSelected[task.taskId] = { taskId: task.taskId, name: task.name }
        } else {
          delete newSelected[task.taskId]
        }
      })
      
      return newSelected
    })
  }, [columns])
  
  // Log selected tasks
  const handleLogSelectedTasks = useCallback(() => {
    console.log('Selected Tasks:', Object.values(selectedTasks))
  }, [selectedTasks])
  
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
            (column) => column.id === dragging.columnId
          )

          if (!homeColumn) {
            return
          }

          // Ensure taskId exists before proceeding
          const draggedTaskId = dragging.card.taskId
          if (!draggedTaskId) {
            console.error("Task ID is missing for dragged card")
            return
          }

          const cardIndexInHome = homeColumn.tasks.findIndex(
            (task) => task.taskId === draggedTaskId
          )

          // Dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumn = columns.find(
              (column) => column.id === dropTargetData.columnId
            )

            if (!destinationColumn) {
              return
            }

            // Reordering in same column
            if (homeColumn.id === destinationColumn.id) {
              const targetTaskId = dropTargetData.card.taskId
              if (!targetTaskId) {
                console.error("Target task ID is missing")
                return
              }

              const cardFinishIndex = homeColumn.tasks.findIndex(
                (task) => task.taskId === targetTaskId
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
              const newIndex = reordered.findIndex(t => t.taskId === draggedTaskId)
              if (newIndex === -1) return
              moveTask(draggedTaskId, homeColumn.id, newIndex).catch((error) => {
                console.error("Failed to reorder tasks:", error)
              })

              return
            }

            // Moving to different column
            const targetTaskId = dropTargetData.card.taskId
            if (!targetTaskId) {
              console.error("Target task ID is missing")
              return
            }

            const indexOfTarget = destinationColumn.tasks.findIndex(
              (task) => task.taskId === targetTaskId
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
          <div className="text-red-500">Error: {error}</div>
          <Button onClick={() => { clearError(); refetch(); }} variant="outline">
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <>
      {/* Header */}
      <Box className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Flex direction="column" gap="4" className="p-4">
          
          {/* Selected Tasks Actions */}
          {selectedTasksCount > 0 && (
            <Box className="p-3 border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 dark:border-blue-800 rounded-lg shadow-sm">
              <Flex justify="between" align="center">
                <Flex align="center" gap="2">
                  <Badge variant="solid" color="blue" size="2" className="px-3 py-0.5">
                    {selectedTasksCount}
                  </Badge>
                  <Text className="font-medium text-blue-800 dark:text-blue-300">
                    {selectedTasksCount === 1 ? 'task' : 'tasks'} selected
                  </Text>
                </Flex>
                <Flex gap="3" align="center">
                  <Button 
                    variant="soft" 
                    color="blue"
                    size="2"
                    className="shadow-sm hover:shadow transition-all"
                    onClick={handleLogSelectedTasks}
                  >
                    <ClipboardList size={16} />
                    Log Selected
                  </Button>
                  <Button 
                    variant="outline" 
                    color="gray"
                    size="2"
                    className="shadow-sm hover:shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
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
            <Heading size="6">Project Tasks</Heading>
            
            <Flex align="center" gap="2">
              <Button 
                variant="soft" 
                onClick={() => setIsAddingColumn(true)} 
                disabled={isAddingColumn}
              >
                <Plus size={14} />
                Add Status Column
              </Button>

              <IconButton variant="ghost" onClick={handleRefresh}>
                <RefreshCw size={16} />
              </IconButton>

              <IconButton variant="ghost">
                <Settings size={16} />
              </IconButton>

              <IconButton variant="ghost">
                <MoreVertical size={16} />
              </IconButton>
            </Flex>
          </Flex>

          {/* Search and Stats */}
          <Flex justify="between" align="center" gap="4">
            <Box className="flex-1 relative max-w-md">
              <Search size={20} className="absolute top-3 left-3 text-gray-400" />
              <TextField.Root
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="pl-10 h-12"
              />
            </Box>

            <Flex gap="6" className="text-sm text-gray-600 dark:text-gray-400">
              <span>{projectStats.totalColumns} columns</span>
              <span>{projectStats.totalTasks} tasks</span>
              <span>{projectStats.completedTasks} completed</span>
              {projectStats.overdueTasks > 0 && (
                <span className="text-red-600">{projectStats.overdueTasks} overdue</span>
              )}
              {projectStats.urgentTasks > 0 && (
                <span className="text-orange-600">{projectStats.urgentTasks} urgent</span>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box className="flex w-full gap-6 h-full relative p-4" ref={scrollableRef}>
        <Box className="w-full space-y-6">
          {/* Add New Column Form */}
          {isAddingColumn && (
            <Box className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm">
              <Flex direction="column" gap="3">
                <Heading size="3">Add New Status Column</Heading>
                
                <TextField.Root
                  placeholder="Column name" 
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                />
                
                <TextArea 
                  placeholder="Column description (optional)" 
                  value={newColumnDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewColumnDescription(e.target.value)}
                  rows={2}
                />
                
                <Flex align="center" gap="2" className="items-start">
                  <div className="relative" ref={colorPickerRef}>
                    <Button
                      variant="solid"
                      className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
                      style={{ backgroundColor: newColumnColor }}
                      onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                    />
                    {isColorPickerOpen && (
                      <div className="absolute z-50 mt-1" style={{ minWidth: "240px" }}>
                        <ColorPicker 
                          colorType="base" 
                          onColorSelect={(color: ColorSelectType) => {
                            setNewColumnColor(color.hex);
                            setIsColorPickerOpen(false);
                          }} 
                          activeColor={newColumnColor}
                        />
                      </div>
                    )}
                  </div>
                  <Text size="1" className="text-gray-500">Column color</Text>
                </Flex>
                
                <Flex gap="2" justify="end">
                  <Button 
                    variant="soft" 
                    onClick={() => {
                      setIsAddingColumn(false)
                      setNewColumnName('')
                      setNewColumnDescription('')
                      setNewColumnColor('#3B82F6')
                    }}
                    disabled={isCreatingColumn}
                  >
                    <X size={14} />
                    Cancel
                  </Button>
                  
                  <Button 
                    onClick={async () => {
                      if (!newColumnName.trim()) return
                      
                      setIsCreatingColumn(true)
                      try {
                        await createColumn(
                          newColumnName.trim(),
                          newColumnColor,
                          newColumnDescription.trim()
                        )
                        
                        // Reset form
                        setNewColumnName('')
                        setNewColumnDescription('')
                        setNewColumnColor('#3B82F6')
                        setIsAddingColumn(false)
                      } catch (error) {
                        console.error('Failed to create column:', error)
                      } finally {
                        setIsCreatingColumn(false)
                      }
                    }}
                    disabled={!newColumnName.trim() || isCreatingColumn}
                  >
                    {isCreatingColumn ? 'Creating...' : 'Create Column'}
                  </Button>
                </Flex>
              </Flex>
            </Box>
          )}
          
          {filteredColumns.map((column) => (
            <ListColumn
              key={column.id}
              column={column}
              columns={columns}
              onCreateTask={createTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onUpdateColumn={updateColumn}
              onDeleteColumn={deleteColumn}
              isDragging={isDragging}
              selectedTaskIds={selectedTasks}
              onTaskSelect={handleTaskSelect}
              onSelectAll={handleColumnSelectAll}
            />
          ))}
          
          {filteredColumns.length === 0 && searchQuery && (
            <Box className="text-center py-12">
              <div className="text-gray-500">No tasks found matching "{searchQuery}"</div>
            </Box>
          )}
          
          {filteredColumns.length === 0 && !searchQuery && !isAddingColumn && (
            <Flex direction="column" align="center" className="py-12 space-y-4">
              <Text className="text-gray-500">No status columns found. Create your first column to get started.</Text>
              <Button 
                onClick={() => setIsAddingColumn(true)}
                variant="soft"
              >
                <Plus size={14} />
                Add Status Column
              </Button>
            </Flex>
          )}
        </Box>

        <TaskCardDrawer viewType="list" projectId={projectId} />
      </Box>

      
    </>
  )
}