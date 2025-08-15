// hooks/use-task-copy-buffer.tsx
// Context and hook for managing task copy/paste operations

import type { TaskDataSchema } from "@incmix/utils/schema"
import { createContext, useCallback, useContext, useState } from "react"

interface CopiedTaskData {
  task: Omit<
    TaskDataSchema,
    "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
  >
  originalId: string
  originalName: string
  copiedAt: number
}

interface TaskCopyBufferContextType {
  copiedTask: CopiedTaskData | null
  copyTask: (task: TaskDataSchema) => void
  clearCopiedTask: () => void
  hasCopiedTask: boolean
}

const TaskCopyBufferContext = createContext<TaskCopyBufferContextType | null>(
  null
)

interface TaskCopyBufferProviderProps {
  children: React.ReactNode
}

export function TaskCopyBufferProvider({
  children,
}: TaskCopyBufferProviderProps) {
  const [copiedTask, setCopiedTask] = useState<CopiedTaskData | null>(null)

  const copyTask = useCallback((task: TaskDataSchema) => {
    // Create a clean copy of the task data, excluding system fields
    const {
      id,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
      ...taskDataToCopy
    } = task

    const copiedData: CopiedTaskData = {
      task: taskDataToCopy,
      originalId: id,
      originalName: task.name || "Untitled Task",
      copiedAt: Date.now(),
    }

    setCopiedTask(copiedData)
  }, [])

  const clearCopiedTask = useCallback(() => {
    setCopiedTask(null)
  }, [])

  const hasCopiedTask = copiedTask !== null

  return (
    <TaskCopyBufferContext.Provider
      value={{
        copiedTask,
        copyTask,
        clearCopiedTask,
        hasCopiedTask,
      }}
    >
      {children}
    </TaskCopyBufferContext.Provider>
  )
}

export function useTaskCopyBuffer() {
  const context = useContext(TaskCopyBufferContext)

  if (!context) {
    throw new Error(
      "useTaskCopyBuffer must be used within a TaskCopyBufferProvider"
    )
  }

  return context
}
