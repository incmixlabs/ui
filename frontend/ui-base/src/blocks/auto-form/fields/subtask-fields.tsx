// components/auto-form/fields/subtask-field.tsx
import { useState } from "react"
import { Button, Input, FormControl, FormItem, FormMessage } from "@/base"
import { Plus, Trash2, Edit2, Check, X } from "lucide-react"
import { cn } from "@/utils/cn"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

interface SubTask {
  id: string
  name: string
  completed: boolean
}

/**
 * Custom subtask field component for AutoForm
 * Provides a rich interface for adding, editing, and removing subtasks
 */
export default function SubTaskField({
  label,
  isRequired,
  field,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  const [newSubtaskName, setNewSubtaskName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("")

  // Get current subtasks from field value or initialize empty array
  const subtasks: SubTask[] = field.value || []

  // Generate unique ID
  const generateId = () => `subtask-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Add new subtask
  const handleAddSubtask = () => {
    if (!newSubtaskName.trim()) return

    const newSubtask: SubTask = {
      id: generateId(),
      name: newSubtaskName.trim(),
      completed: false,
    }

    field.onChange([...subtasks, newSubtask])
    setNewSubtaskName("")
  }

  // Remove subtask
  const handleRemoveSubtask = (id: string) => {
    field.onChange(subtasks.filter(subtask => subtask.id !== id))
  }

  // Start editing subtask
  const handleStartEdit = (subtask: SubTask) => {
    setEditingId(subtask.id)
    setEditingText(subtask.name)
  }

  // Save edited subtask
  const handleSaveEdit = () => {
    if (!editingText.trim()) return

    field.onChange(
      subtasks.map(subtask =>
        subtask.id === editingId
          ? { ...subtask, name: editingText.trim() }
          : subtask
      )
    )
    setEditingId(null)
    setEditingText("")
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }

  // Toggle subtask completion (for preview purposes)
  const handleToggleComplete = (id: string) => {
    field.onChange(
      subtasks.map(subtask =>
        subtask.id === id
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    )
  }

  // Handle Enter key in input fields
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault()
      action()
    }
  }

  return (
    <FormItem className="flex w-full flex-col space-y-4">
      {/* Label */}
      <AutoFormLabel label={label} isRequired={isRequired} />

      {/* Add new subtask input */}
      <div className="flex gap-2">
        <FormControl>
          <Input
            value={newSubtaskName}
            onChange={(e) => setNewSubtaskName(e.target.value)}
            placeholder="Enter subtask name..."
            className="flex-1 shadow-sm"
            onKeyDown={(e) => handleKeyDown(e, handleAddSubtask)}
          />
        </FormControl>
        <Button
          type="button"
          onClick={handleAddSubtask}
          disabled={!newSubtaskName.trim()}
          size="2"
          className="px-3 bg-blue-600 hover:bg-blue-700 text-white "
        >
          <Plus size={16} />
        </Button>
      </div>

      {/* Subtasks list */}
      {subtasks.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {subtasks.length} subtask{subtasks.length !== 1 ? 's' : ''} added
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 pt-1">
            {subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border",
                  "bg-white dark:bg-gray-800/90",
                  "border-gray-200 dark:border-gray-700",
                  "shadow-sm hover:shadow-md transition-colors duration-150",
                  subtask.completed && "bg-gray-50 dark:bg-gray-800/60"
                )}
              >
                {/* Completion checkbox */}
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => handleToggleComplete(subtask.id)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />

                {/* Subtask content */}
                <div className="flex-1 min-w-0">
                  {editingId === subtask.id ? (
                    // Edit mode
                    <div className="flex gap-2">
                      <Input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => handleKeyDown(e, handleSaveEdit)}
                        autoFocus
                      />
                      <Button
                        type="button"
                        onClick={handleSaveEdit}
                        size="1"
                        variant="outline"
                        className="px-2"
                      >
                        <Check size={14} />
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancelEdit}
                        size="1"
                        variant="outline"
                        className="px-2"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ) : (
                    // Display mode
                    <span
                      className={cn(
                        "block text-sm font-medium",
                        subtask.completed && "line-through text-gray-400 dark:text-gray-500"
                      )}
                    >
                      {subtask.name}
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                {editingId !== subtask.id && (
                  <div className="flex gap-6">
                    <Button
                      type="button"
                      onClick={() => handleStartEdit(subtask)}
                      size="1"
                      variant="ghost"
                      className="p-1 h-auto"
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleRemoveSubtask(subtask.id)}
                      size="1"
                      variant="ghost"
                      className="p-1 h-auto text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help text */}
      {fieldConfigItem?.description && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {fieldConfigItem.description}
        </div>
      )}

      <FormMessage />
    </FormItem>
  )
}
