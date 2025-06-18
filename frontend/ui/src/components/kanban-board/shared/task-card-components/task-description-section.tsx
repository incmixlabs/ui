// task-card-components/task-description-section.tsx
import { Save, Edit3 } from "lucide-react"
import type { TaskDescriptionSectionProps } from "./utils/types"

export function TaskDescriptionSection({
  currentTask,
  isEditing,
  editValue,
  onEditChange,
  onStartEdit,
  onStopEdit,
  onSave,
}: TaskDescriptionSectionProps) {
  const handleSave = () => {
    onSave()
    onStopEdit()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
        Description
      </h3>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            placeholder="Add a description..."
            rows={4}
            autoFocus
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button 
              onClick={onStopEdit}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-[100px] relative transition-colors"
          onClick={onStartEdit}
        >
          {currentTask.description ? (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {currentTask.description}
            </p>
          ) : (
            <p className="text-gray-500 italic">Click to add a description...</p>
          )}
          <button className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
            <Edit3 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  )
}