import { Checkbox, Progress } from "@/base"
import { cn } from "@/utils/cn"
import { Reorder, useDragControls } from "framer-motion"
import { Check, GripVertical, Pencil, Plus, Trash, X } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ConfirmationModal } from "../confirmation-modal"

export interface AcceptanceCriteriaItem {
  id: string
  text: string
  order: number
  checked?: boolean
}

interface TaskAcceptanceCriteriaSectionProps {
  acceptanceCriteria?: AcceptanceCriteriaItem[]
  className?: string
  hideTitle?: boolean
  onAcceptanceCriteriaAdd?: (text: string) => void
  onAcceptanceCriteriaEdit?: (id: string, text: string) => void
  onAcceptanceCriteriaDelete?: (id: string) => void
  onReorderAcceptanceCriteria?: (newOrder: AcceptanceCriteriaItem[]) => void
  onAcceptanceCriteriaToggle?: (id: string, checked: boolean) => void
}

const AcceptanceCriteriaItemComponent = ({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: AcceptanceCriteriaItem
  onEdit?: (id: string, text: string) => void
  onDelete?: (id: string) => void
  onToggle?: (id: string, checked: boolean) => void
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(item.text)
  const editInputRef = useRef<HTMLInputElement>(null)
  const controls = useDragControls()

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditing])

  const handleStartEdit = () => {
    if (!onEdit) return

    setIsEditing(true)
    setEditText(item.text)
  }

  const handleSaveEdit = () => {
    if (editText.trim() && onEdit) {
      onEdit(item.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === "Escape") {
      handleCancelEdit()
    }
  }

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      dragControls={controls}
      dragListener={false}
      className="group flex items-center gap-2 rounded-md bg-transparent px-2 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <Checkbox
        id={`acceptance-criteria-${item.id}`}
        className="data-[state=checked]:bg-blue-600"
        checked={item.checked || false}
        onCheckedChange={(checked) => {
          onToggle?.(item.id, checked === true)
        }}
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            ref={editInputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="m-0 w-full flex-1 border-none bg-transparent p-0 text-gray-700 text-sm focus:outline-none focus:ring-0 dark:text-gray-300"
          />
          <button
            type="button"
            onClick={handleSaveEdit}
            className="text-green-500 hover:text-green-600"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <label
            htmlFor={`acceptance-criteria-${item.id}`}
            className={`flex-1 text-sm ${
              item.checked
                ? "text-gray-400 line-through dark:text-gray-500"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {item.text}
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="cursor-grab opacity-0 group-hover:opacity-100"
              onPointerDown={(e) => controls.start(e)}
            >
              <GripVertical
                size={16}
                className="text-gray-400 dark:text-gray-500"
              />
            </button>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100">
              {onEdit && (
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <Pencil size={14} />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  <Trash size={14} />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </Reorder.Item>
  )
}

export function TaskAcceptanceCriteriaSection({
  acceptanceCriteria = [],
  className,
  hideTitle = false,
  onAcceptanceCriteriaAdd,
  onAcceptanceCriteriaEdit,
  onAcceptanceCriteriaDelete,
  onReorderAcceptanceCriteria,
  onAcceptanceCriteriaToggle,
}: TaskAcceptanceCriteriaSectionProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<AcceptanceCriteriaItem | null>(
    null
  )
  const [optimisticCriteria, setOptimisticCriteria] = useState<
    AcceptanceCriteriaItem[]
  >([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newItemText, setNewItemText] = useState("")
  const newItemInputRef = useRef<HTMLInputElement>(null)

  // Keep optimistic data in sync with actual data
  useEffect(() => {
    setOptimisticCriteria(acceptanceCriteria || [])
  }, [acceptanceCriteria])

  // Focus input when adding a new item
  useEffect(() => {
    if (isAddingNew && newItemInputRef.current) {
      newItemInputRef.current.focus()
    }
  }, [isAddingNew])

  const handleAddNew = () => {
    setIsAddingNew(true)
    setNewItemText("")
  }

  const handleSaveNew = () => {
    if (newItemText.trim() && onAcceptanceCriteriaAdd) {
      onAcceptanceCriteriaAdd(newItemText.trim())
      setIsAddingNew(false)
      setNewItemText("")
    } else if (!newItemText.trim()) {
      setIsAddingNew(false)
      setNewItemText("")
    }
  }

  const handleCancelNew = () => {
    setIsAddingNew(false)
    setNewItemText("")
  }

  const handleNewItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSaveNew()
    } else if (e.key === "Escape") {
      handleCancelNew()
    }
  }

  if (
    !acceptanceCriteria ||
    (acceptanceCriteria.length === 0 && !onAcceptanceCriteriaAdd)
  ) {
    return null
  }

  // Sort criteria by order
  const sortedCriteria = [...(optimisticCriteria || [])].sort(
    (a, b) => a.order - b.order
  )
  const totalItems = sortedCriteria.length
  const completedItems = sortedCriteria.filter((item) => item.checked).length

  const handleReorderCriteria = (newOrder: AcceptanceCriteriaItem[]) => {
    // Update the order property for each item based on its new position
    const reorderedCriteria = newOrder.map((item, index) => ({
      ...item,
      order: index,
    }))

    setOptimisticCriteria(reorderedCriteria)

    if (onReorderAcceptanceCriteria) {
      onReorderAcceptanceCriteria(reorderedCriteria)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {!hideTitle && (
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 text-sm dark:text-gray-100">
            ACCEPTANCE CRITERIA
          </h3>
        </div>
      )}

      {totalItems > 0 && (
        <Progress value={Math.trunc((completedItems / totalItems) * 100)} />
      )}

      <div className="space-y-2">
        {totalItems > 0 ? (
          <Reorder.Group
            as="div"
            className="space-y-1"
            values={sortedCriteria}
            onReorder={handleReorderCriteria}
            axis="y"
          >
            {sortedCriteria.map((item) => (
              <AcceptanceCriteriaItemComponent
                key={item.id}
                item={item}
                onEdit={onAcceptanceCriteriaEdit}
                onDelete={(_id) => {
                  setActiveItem(item)
                  setDeleteModalOpen(true)
                }}
                onToggle={onAcceptanceCriteriaToggle}
              />
            ))}
          </Reorder.Group>
        ) : null}

        {isAddingNew && (
          <div className="flex gap-2 px-2 py-1.5">
            <Checkbox
              id="new-acceptance-criteria-item"
              checked={false}
              disabled
              className="mt-0.5"
            />
            <div className="flex flex-1 items-center gap-2">
              <input
                ref={newItemInputRef}
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={handleNewItemKeyDown}
                onBlur={handleSaveNew}
                placeholder="New acceptance criteria"
                className="m-0 w-full flex-1 border-none bg-transparent p-0 text-gray-700 text-sm focus:outline-none focus:ring-0 dark:text-gray-300"
              />
              <button
                type="button"
                onClick={handleSaveNew}
                className="text-green-500 hover:text-green-600"
              >
                <Check size={16} />
              </button>
              <button
                type="button"
                onClick={handleCancelNew}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {!isAddingNew && onAcceptanceCriteriaAdd && (
          <div className="pl-2">
            <button
              type="button"
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 font-medium text-blue-500 text-sm hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="Add acceptance criteria"
            >
              <Plus className="h-4 w-4" />
              Add Acceptance Criteria
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Remove Acceptance Criteria"
        description={`Are you sure you want to remove this acceptance criteria? ${activeItem?.text ? `"${activeItem.text}"` : ""}`}
        type="delete"
        primary={{
          label: "Remove",
          action: () => {
            if (activeItem && onAcceptanceCriteriaDelete) {
              onAcceptanceCriteriaDelete(activeItem.id)
            }
          },
          color: "bg-red-500 hover:bg-red-600",
        }}
        secondary={{
          label: "Cancel",
          action: () => {},
        }}
      />
    </div>
  )
}
