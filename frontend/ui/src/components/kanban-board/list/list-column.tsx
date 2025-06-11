// components/list/list-column.tsx
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Ellipsis, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { memo, useEffect, useRef, useState, useCallback } from "react"
import invariant from "tiny-invariant"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import { Box, Flex, Heading, IconButton, Button, Text, Badge } from "@incmix/ui"
import { isSafari } from "@utils/browser"
import { isShallowEqual } from "@utils/objects"
import {
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
  blockBoardPanningAttr,
  type ListColumn,
  type KanbanTask,
  type TaskDataSchema,
} from "@incmix/store"
import { ListTaskCard, ListTaskCardShadow } from "./task-card"

type TColumnState =
  | {
      type: "is-card-over"
      isOverChildCard: boolean
      dragging: DOMRect
    }
  | {
      type: "is-column-over"
    }
  | {
      type: "idle"
    }
  | {
      type: "is-dragging"
    }

const stateStyles: { [Key in TColumnState["type"]]: string } = {
  idle: "",
  "is-card-over": "outline outline-2 outline-blue-400 outline-offset-2",
  "is-dragging": "opacity-60 outline outline-2 outline-gray-400",
  "is-column-over": "bg-blue-50 dark:bg-blue-950",
}

const idle = { type: "idle" } satisfies TColumnState

interface ListColumnProps {
  column: ListColumn
  onCreateTask: (columnId: string, taskData: Partial<TaskDataSchema>) => Promise<void>
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onUpdateColumn: (columnId: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  onDeleteColumn: (columnId: string) => Promise<void>
  isDragging?: boolean
}

const CardList = memo(function CardList({ 
  column, 
  onUpdateTask, 
  onDeleteTask 
}: { 
  column: ListColumn
  onUpdateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
}) {
  return (
    <>
      {column.tasks.map((task: KanbanTask) => (
        <ListTaskCard 
          key={task.taskId} 
          card={task} 
          columnId={column.id}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </>
  )
})

export function ListColumn({ 
  column, 
  onCreateTask, 
  onUpdateTask, 
  onDeleteTask, 
  onUpdateColumn, 
  onDeleteColumn,
  isDragging = false 
}: ListColumnProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TColumnState>(idle)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [newTaskName, setNewTaskName] = useState("")

  // Calculate column statistics with proper typing
  const completedTasks = column.tasks.filter((task: KanbanTask) => task.completed).length
  const totalTasks = column.tasks.length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const setIsCardOver = useCallback(({
    data,
    location,
  }: {
    data: any
    location: any
  }) => {
    const innerMost = location.current.dropTargets[0]
    const isOverChildCard = Boolean(
      innerMost && isCardDropTargetData(innerMost.data)
    )

    const proposed: TColumnState = {
      type: "is-card-over",
      dragging: data.rect,
      isOverChildCard,
    }
    
    setState((current) => {
      if (isShallowEqual(proposed, current)) {
        return current
      }
      return proposed
    })
  }, [])

  const columnData = getColumnData({ column })

  useEffect(() => {
    const outer = outerFullHeightRef.current
    const scrollable = scrollableRef.current
    const header = headerRef.current
    const inner = innerRef.current
    
    if (!outer || !scrollable || !header || !inner) {
      return
    }

    return combine(
      draggable({
        element: header,
        getInitialData: () => columnData,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const data = source.data
          invariant(isColumnData(data))
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: header,
              input: location.current.input,
            }),
            render({ container }) {
              const rect = inner.getBoundingClientRect()
              const preview = inner.cloneNode(true)
              invariant(preview instanceof HTMLElement)
              preview.style.width = `${rect.width}px`
              preview.style.height = `${rect.height}px`

              if (!isSafari()) {
                preview.style.transform = "rotate(2deg)"
              }

              container.appendChild(preview)
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
        getData: () => columnData,
        canDrop({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
          }
        },
        onDragEnter({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
          if (
            isColumnData(source.data) &&
            source.data.column.id !== column.id
          ) {
            setState({ type: "is-column-over" })
          }
        },
        onDropTargetChange({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
        },
        onDragLeave({ source }) {
          if (
            isColumnData(source.data) &&
            source.data.column.id === column.id
          ) {
            return
          }
          setState(idle)
        },
        onDrop() {
          setState(idle)
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          return isDraggingACard({ source })
        },
        element: scrollable,
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingACard({ source })
        },
        getOverflow() {
          return {
            forTopEdge: { top: 1000 },
            forBottomEdge: { bottom: 1000 },
          }
        },
      })
    )
  }, [column, columnData, setIsCardOver])

  const handleCreateTask = useCallback(async () => {
    if (!newTaskName.trim()) return
    
    try {
      await onCreateTask(column.id, {
        name: newTaskName.trim(),
        description: "",
        priority: "medium",
        completed: false,
        labelsTags: [],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: [],
        commentsCount: 0,
      })
      setNewTaskName("")
      setIsCreatingTask(false)
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }, [newTaskName, onCreateTask, column.id])

  return (
    <Flex
      direction="column"
      className="w-full flex-shrink-0 select-none"
      ref={outerFullHeightRef}
    >
      <Flex
        direction="column"
        className={`rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${stateStyles[state.type]}`}
        ref={innerRef}
        {...{ [blockBoardPanningAttr]: true }}
      >
        <Flex
          direction="column"
          className={`pb-2 ${state.type === "is-column-over" ? "invisible" : ""}`}
        >
          {/* Column Header */}
          <Box className="border-b border-gray-200 dark:border-gray-700">
            <Flex
              justify="between"
              align="center"
              className="p-4 cursor-grab active:cursor-grabbing"
              ref={headerRef}
              style={{ 
                backgroundColor: `${column.color}15`,
                borderTop: `3px solid ${column.color}`
              }}
            >
              <Flex align="center" gap="3" className="flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1"
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </Button>
                
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: column.color }}
                />
                
                <Heading size="4" as="h3" className="font-semibold leading-4 truncate">
                  {column.name}
                </Heading>
                
                <Flex gap="2" className="flex-shrink-0">
                  <Badge variant="soft" color="gray" size="1">
                    {totalTasks} tasks
                  </Badge>
                  {completedTasks > 0 && (
                    <Badge variant="soft" color="green" size="1">
                      {completionPercentage}% done
                    </Badge>
                  )}
                </Flex>
              </Flex>

              <IconButton size="1" variant="ghost">
                <Ellipsis size={16} />
              </IconButton>
            </Flex>

            {/* Column Description */}
            {column.description && (
              <Box className="px-4 pb-3">
                <Text size="2" className="text-gray-600 dark:text-gray-400">
                  {column.description}
                </Text>
              </Box>
            )}

            {/* Progress Bar */}
            {totalTasks > 0 && completedTasks > 0 && (
              <Box className="px-4 pb-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </Box>
            )}
          </Box>

          {/* Tasks List */}
          {isExpanded && (
            <Flex
              className="flex flex-col overflow-y-auto [overflow-anchor:none] max-h-96"
              ref={scrollableRef}
            >
              <CardList 
                column={column} 
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
              
              {state.type === "is-card-over" && !state.isOverChildCard ? (
                <Box className="flex-shrink-0 px-3 py-1">
                  <ListTaskCardShadow dragging={state.dragging} />
                </Box>
              ) : null}

              {/* Add Task Section */}
              <Box className="p-3">
                {isCreatingTask ? (
                  <Flex direction="column" gap="2">
                    <input
                      type="text"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      placeholder="Task name..."
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCreateTask()
                        } else if (e.key === "Escape") {
                          setIsCreatingTask(false)
                          setNewTaskName("")
                        }
                      }}
                    />
                    <Flex gap="2">
                      <Button size="1" onClick={handleCreateTask} disabled={!newTaskName.trim()}>
                        Add Task
                      </Button>
                      <Button 
                        size="1" 
                        variant="soft" 
                        onClick={() => {
                          setIsCreatingTask(false)
                          setNewTaskName("")
                        }}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Flex>
                ) : (
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600"
                    onClick={() => setIsCreatingTask(true)}
                  >
                    <Plus size={16} />
                    Add a task
                  </Button>
                )}
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}