import { Reorder } from "framer-motion"
// task-card-components/task-subtasks-section.tsx
import { CheckSquare, Plus, X } from "lucide-react"
import { SubtaskItem } from "./subtask-item"
import { calculateSubtaskProgress } from "./utils/task-utils"
import type { Subtask, TaskSubtasksSectionProps } from "./utils/types"

export function TaskSubtasksSection({
  currentTask,
  isAddingSubtask,
  newSubtaskName,
  onAddingSubtaskChange,
  onNewSubtaskNameChange,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
  onReorderSubtasks,
}: TaskSubtasksSectionProps) {
  const { completedSubTasks, totalSubTasks, progressPercentage } =
    calculateSubtaskProgress(currentTask.subTasks)

  const handleAddSubtask = () => {
    onAddSubtask()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddSubtask()
    if (e.key === "Escape") onAddingSubtaskChange(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide dark:text-gray-100">
          Subtasks ({completedSubTasks}/{totalSubTasks})
        </h3>
        <button
          type="button"
          onClick={() => onAddingSubtaskChange(true)}
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 font-medium text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-6 dark:hover:bg-gray-700"
        >
          <Plus className="h-4 w-4" />
          Add Subtask
        </button>
      </div>

      {totalSubTasks > 0 && (
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-gray-500 text-xs">
            {completedSubTasks} of {totalSubTasks} subtasks complete
          </p>
        </div>
      )}

      {isAddingSubtask && (
        <div className="flex gap-2">
          <input
            value={newSubtaskName}
            onChange={(e) => onNewSubtaskNameChange(e.target.value)}
            placeholder="New subtask"
            className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-6 dark:text-white"
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleAddSubtask}
            disabled={!newSubtaskName.trim()}
            className="rounded-md bg-gray-900 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-6 dark:text-white dark:hover:bg-gray-700"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => onAddingSubtaskChange(false)}
            className="rounded-md border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-6 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="space-y-2">
        {currentTask.subTasks && currentTask.subTasks.length > 0 ? (
          <Reorder.Group
            as="div"
            className="space-y-2"
            values={currentTask.subTasks}
            onReorder={onReorderSubtasks}
          >
            {currentTask.subTasks.map((subtask: Subtask) => (
              <SubtaskItem
                key={subtask.id}
                subtask={subtask}
                onUpdate={onUpdateSubtask}
                onDelete={onDeleteSubtask}
              />
            ))}
          </Reorder.Group>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <CheckSquare className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">
              No subtasks yet. Add one to track progress.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
