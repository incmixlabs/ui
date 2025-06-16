// task-card-components/task-title-section.tsx
import { Save, X, Edit3 } from "lucide-react"
import type { TaskTitleSectionProps } from "./utils/types"

export function TaskTitleSection({
  currentTask,
  isEditing,
  editValue,
  onEditChange,
  onStartEdit,
  onStopEdit,
  onSave,
}: TaskTitleSectionProps) {
  const handleSave = () => {
    onSave()
    onStopEdit()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") onStopEdit()
  }

  return (
    <div className="space-y-2">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            className="text-2xl font-bold border-0 px-0 bg-transparent focus:outline-none focus:ring-0 flex-1 text-gray-900 dark:text-white"
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={handleSave} 
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <Save className="h-4 w-4" />
          </button>
          <button 
            onClick={onStopEdit} 
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="group flex items-start gap-2">
          <h1
            className="text-2xl font-bold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-2 rounded-md -m-2 flex-1 transition-colors"
            onClick={onStartEdit}
          >
            {currentTask.name}
          </h1>
          <button
            onClick={onStartEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}