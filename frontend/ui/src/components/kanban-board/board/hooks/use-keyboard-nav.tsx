import { KanbanColumn, KanbanTask } from "@incmix/store"
import { useEffect, useCallback, useState, useRef } from "react"

interface NavigationState {
  focusedColumnIndex: number
  focusedTaskIndex: number
  mode: "column" | "task" | "none"
}

interface UseKeyboardNavigationProps {
  columns: KanbanColumn[]
  onTaskOpen?: (taskId: string) => void
  onTaskMove?: (taskId: string, targetColumnId: string, targetIndex?: number) => void
  selectedTasks: string[]
  onTaskSelect?: (taskId: string, isMultiSelect?: boolean) => void
  onBulkAction?: (action: string) => void
}

export function useKeyboardNavigation({
  columns,
  onTaskOpen,
  onTaskMove,
  selectedTasks,
  onTaskSelect,
  onBulkAction,
}: UseKeyboardNavigationProps) {
  const [navigation, setNavigation] = useState<NavigationState>({
    focusedColumnIndex: 0,
    focusedTaskIndex: 0,
    mode: "none",
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const isNavigating = navigation.mode !== "none"

  // Get current focused task
  const getCurrentTask = useCallback((): KanbanTask | null => {
    if (navigation.mode !== "task" || !columns[navigation.focusedColumnIndex]) {
      return null
    }
    const column = columns[navigation.focusedColumnIndex]
    return column.tasks[navigation.focusedTaskIndex] || null
  }, [columns, navigation])

  // Get current focused column
  const getCurrentColumn = useCallback((): KanbanColumn | null => {
    return columns[navigation.focusedColumnIndex] || null
  }, [columns, navigation])

  // Move focus to specific position
  const moveFocus = useCallback((columnIndex: number, taskIndex: number = 0, mode: "column" | "task" = "task") => {
    const maxColumnIndex = Math.max(0, columns.length - 1)
    const safeColumnIndex = Math.max(0, Math.min(columnIndex, maxColumnIndex))
    
    const column = columns[safeColumnIndex]
    const maxTaskIndex = column ? Math.max(0, column.tasks.length - 1) : 0
    const safeTaskIndex = Math.max(0, Math.min(taskIndex, maxTaskIndex))

    setNavigation({
      focusedColumnIndex: safeColumnIndex,
      focusedTaskIndex: safeTaskIndex,
      mode,
    })
  }, [columns])

  // Navigation commands
  const moveUp = useCallback(() => {
    if (navigation.mode === "task") {
      const newTaskIndex = Math.max(0, navigation.focusedTaskIndex - 1)
      if (newTaskIndex !== navigation.focusedTaskIndex) {
        setNavigation(prev => ({ ...prev, focusedTaskIndex: newTaskIndex }))
      }
    }
  }, [navigation])

  const moveDown = useCallback(() => {
    if (navigation.mode === "task") {
      const column = columns[navigation.focusedColumnIndex]
      if (column) {
        const maxIndex = Math.max(0, column.tasks.length - 1)
        const newTaskIndex = Math.min(maxIndex, navigation.focusedTaskIndex + 1)
        if (newTaskIndex !== navigation.focusedTaskIndex) {
          setNavigation(prev => ({ ...prev, focusedTaskIndex: newTaskIndex }))
        }
      }
    }
  }, [navigation, columns])

  const moveLeft = useCallback(() => {
    const newColumnIndex = Math.max(0, navigation.focusedColumnIndex - 1)
    if (newColumnIndex !== navigation.focusedColumnIndex) {
      const newColumn = columns[newColumnIndex]
      const maxTaskIndex = newColumn ? Math.max(0, newColumn.tasks.length - 1) : 0
      const safeTaskIndex = Math.min(navigation.focusedTaskIndex, maxTaskIndex)
      
      setNavigation(prev => ({
        ...prev,
        focusedColumnIndex: newColumnIndex,
        focusedTaskIndex: safeTaskIndex,
      }))
    }
  }, [navigation, columns])

  const moveRight = useCallback(() => {
    const maxColumnIndex = Math.max(0, columns.length - 1)
    const newColumnIndex = Math.min(maxColumnIndex, navigation.focusedColumnIndex + 1)
    if (newColumnIndex !== navigation.focusedColumnIndex) {
      const newColumn = columns[newColumnIndex]
      const maxTaskIndex = newColumn ? Math.max(0, newColumn.tasks.length - 1) : 0
      const safeTaskIndex = Math.min(navigation.focusedTaskIndex, maxTaskIndex)
      
      setNavigation(prev => ({
        ...prev,
        focusedColumnIndex: newColumnIndex,
        focusedTaskIndex: safeTaskIndex,
      }))
    }
  }, [navigation, columns])

  // Task actions
  const openCurrentTask = useCallback(() => {
    const task = getCurrentTask()
    if (task && onTaskOpen) {
      onTaskOpen(task.taskId)
    }
  }, [getCurrentTask, onTaskOpen])

  const selectCurrentTask = useCallback((isMultiSelect: boolean = false) => {
    const task = getCurrentTask()
    if (task && onTaskSelect) {
      onTaskSelect(task.taskId, isMultiSelect)
    }
  }, [getCurrentTask, onTaskSelect])

  const moveCurrentTask = useCallback((direction: "left" | "right") => {
    const task = getCurrentTask()
    if (!task || !onTaskMove) return

    const currentColumnIndex = navigation.focusedColumnIndex
    const targetColumnIndex = direction === "left" 
      ? Math.max(0, currentColumnIndex - 1)
      : Math.min(columns.length - 1, currentColumnIndex + 1)

    if (targetColumnIndex !== currentColumnIndex) {
      const targetColumn = columns[targetColumnIndex]
      if (targetColumn) {
        onTaskMove(task.taskId, targetColumn.id)
        // Move focus to the new position
        setNavigation(prev => ({
          ...prev,
          focusedColumnIndex: targetColumnIndex,
          focusedTaskIndex: Math.min(prev.focusedTaskIndex, targetColumn.tasks.length),
        }))
      }
    }
  }, [getCurrentTask, onTaskMove, navigation, columns])

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle navigation if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement).contentEditable === "true"
      ) {
        return
      }

      // Start navigation mode
      if (!isNavigating && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault()
        moveFocus(0, 0, "task")
        return
      }

      if (!isNavigating) return

      const isShift = e.shiftKey
      const isCtrl = e.ctrlKey || e.metaKey
      const isAlt = e.altKey

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          moveUp()
          break

        case "ArrowDown":
          e.preventDefault()
          moveDown()
          break

        case "ArrowLeft":
          e.preventDefault()
          if (isShift) {
            moveCurrentTask("left")
          } else {
            moveLeft()
          }
          break

        case "ArrowRight":
          e.preventDefault()
          if (isShift) {
            moveCurrentTask("right")
          } else {
            moveRight()
          }
          break

        case "Enter":
          e.preventDefault()
          openCurrentTask()
          break

        case " ":
          e.preventDefault()
          selectCurrentTask(isShift)
          break

        case "Escape":
          e.preventDefault()
          setNavigation(prev => ({ ...prev, mode: "none" }))
          break

        case "Home":
          e.preventDefault()
          if (isCtrl) {
            moveFocus(0, 0, "task")
          } else {
            setNavigation(prev => ({ ...prev, focusedTaskIndex: 0 }))
          }
          break

        case "End":
          e.preventDefault()
          if (isCtrl) {
            const lastColumnIndex = columns.length - 1
            const lastColumn = columns[lastColumnIndex]
            const lastTaskIndex = lastColumn ? lastColumn.tasks.length - 1 : 0
            moveFocus(lastColumnIndex, lastTaskIndex, "task")
          } else {
            const column = columns[navigation.focusedColumnIndex]
            if (column) {
              setNavigation(prev => ({ 
                ...prev, 
                focusedTaskIndex: Math.max(0, column.tasks.length - 1) 
              }))
            }
          }
          break

        case "PageUp":
          e.preventDefault()
          setNavigation(prev => ({ 
            ...prev, 
            focusedTaskIndex: Math.max(0, prev.focusedTaskIndex - 5) 
          }))
          break

        case "PageDown":
          e.preventDefault()
          const column = columns[navigation.focusedColumnIndex]
          if (column) {
            setNavigation(prev => ({ 
              ...prev, 
              focusedTaskIndex: Math.min(column.tasks.length - 1, prev.focusedTaskIndex + 5) 
            }))
          }
          break

        case "a":
          if (isCtrl) {
            e.preventDefault()
            onBulkAction?.("selectAll")
          }
          break

        case "Delete":
        case "Backspace":
          if (selectedTasks.length > 0) {
            e.preventDefault()
            onBulkAction?.("delete")
          }
          break

        case "c":
          if (isCtrl) {
            e.preventDefault()
            onBulkAction?.("copy")
          }
          break

        case "v":
          if (isCtrl) {
            e.preventDefault()
            onBulkAction?.("paste")
          }
          break

        case "z":
          if (isCtrl) {
            e.preventDefault()
            if (isShift) {
              onBulkAction?.("redo")
            } else {
              onBulkAction?.("undo")
            }
          }
          break

        default:
          break
      }
    }

    // Only listen when container is focused or contains focused element
    const container = containerRef.current
    if (container) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    isNavigating,
    navigation,
    columns,
    selectedTasks,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    openCurrentTask,
    selectCurrentTask,
    moveCurrentTask,
    moveFocus,
    onBulkAction,
  ])

  // Auto-scroll focused element into view
  useEffect(() => {
    if (isNavigating) {
      const task = getCurrentTask()
      if (task) {
        // Find the DOM element for the focused task
        const taskElement = document.querySelector(`[data-task-id="${task.taskId}"]`)
        if (taskElement) {
          taskElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
          })
        }
      }
    }
  }, [navigation, isNavigating, getCurrentTask])

  return {
    containerRef,
    isNavigating,
    focusedTask: getCurrentTask(),
    focusedColumn: getCurrentColumn(),
    focusedColumnIndex: navigation.focusedColumnIndex,
    focusedTaskIndex: navigation.focusedTaskIndex,
    moveFocus,
    startNavigation: () => moveFocus(0, 0, "task"),
    stopNavigation: () => setNavigation(prev => ({ ...prev, mode: "none" })),
  }
}

// Component to show keyboard shortcuts
export function KeyboardShortcutsHelp({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null

  const shortcuts = [
    { keys: ["↑", "↓"], description: "Navigate tasks" },
    { keys: ["←", "→"], description: "Navigate columns" },
    { keys: ["Shift", "←/→"], description: "Move task between columns" },
    { keys: ["Enter"], description: "Open task details" },
    { keys: ["Space"], description: "Select task" },
    { keys: ["Shift", "Space"], description: "Multi-select tasks" },
    { keys: ["Ctrl", "A"], description: "Select all tasks" },
    { keys: ["Delete"], description: "Delete selected tasks" },
    { keys: ["Escape"], description: "Exit navigation mode" },
    { keys: ["Home"], description: "Go to first task" },
    { keys: ["End"], description: "Go to last task" },
    { keys: ["Ctrl", "Home"], description: "Go to first column" },
    { keys: ["Ctrl", "End"], description: "Go to last column" },
  ]

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-xs z-50">
      <h3 className="font-semibold mb-3 text-sm">Keyboard Shortcuts</h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex justify-between items-center text-xs">
            <div className="flex gap-1">
              {shortcut.keys.map((key, keyIndex) => (
                <span key={keyIndex}>
                  <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {key}
                  </kbd>
                  {keyIndex < shortcut.keys.length - 1 && <span className="mx-1">+</span>}
                </span>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              {shortcut.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}