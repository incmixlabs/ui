// task-card-components/task-subtasks-section.tsx
import { Plus, X, CheckSquare } from "lucide-react"
import { Reorder } from "framer-motion"
import { SubtaskItem } from "./subtask-item"
import { calculateSubtaskProgress } from "./utils/task-utils"
import type { TaskSubtasksSectionProps, Subtask } from "./utils/types"

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
  const { completedSubTasks, totalSubTasks, progressPercentage } = calculateSubtaskProgress(currentTask.subTasks)

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
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
          Subtasks ({completedSubTasks}/{totalSubTasks})
        </h3>
        <button 
          onClick={() => onAddingSubtaskChange(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Subtask
        </button>
      </div>

      {totalSubTasks > 0 && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
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
            className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={handleAddSubtask} 
            disabled={!newSubtaskName.trim()}
            className="px-3 py-2 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
          >
            Add
          </button>
          <button 
            onClick={() => onAddingSubtaskChange(false)}
            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
          <div className="text-center py-8 text-gray-500">
            <CheckSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No subtasks yet. Add one to track progress.</p>
          </div>
        )}
      </div>
    </div>
  )
}