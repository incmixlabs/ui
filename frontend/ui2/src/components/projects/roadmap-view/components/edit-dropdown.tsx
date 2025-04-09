import ColorPicker, { type ColorSelectType } from "@/components/color-picker"
import { Box, Button, DropdownMenu } from "@incmix/ui2"
import {
  Clipboard,
  Copy,
  EllipsisVertical,
  Pencil,
  Save,
  Trash2,
  UserRoundPlus,
  X,
} from "lucide-react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import type React from "react"
import { useState } from "react"
import type { ExtendedColorType, Task } from "./gantt-chart"

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
}

function EditDropdown({
  tasks,
  task,
  setTasks,
}: {
  tasks: Task[]
  task: Task
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}) {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(task.name)
  const [_labelColor, _setLabelColor] = useState("blue")

  const handleEditClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setInputValue(inputValue)
    setEditMode(true)
  }

  const handleDuplicate = (e: Event) => {
    e.preventDefault()
    const taskToDuplicate = tasks.find((t) => t.id === task.id)

    if (!taskToDuplicate) return

    const newTask = {
      ...taskToDuplicate,
      id: `${taskToDuplicate.id}-copy-${Date.now()}`,
      name: `${taskToDuplicate.name}-copy`,
    }

    setTasks([...tasks, newTask])
    setOpen(false)
  }

  const handleDelete = (e: Event) => {
    e.preventDefault()

    setTasks((prevTasks: Task[]) => prevTasks.filter((t) => t.id !== task.id))
    setOpen(false)
  }

  const handleSave = () => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, name: inputValue } : t))
    )
    setEditMode(false)
    setOpen(false)
  }

  // Handle cancel button click
  const handleCancel = () => {
    setEditMode(false)
  }

  const handleColorSelect = (newColor: ColorSelectType) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === task.id) {
          const updatedTask = { ...t, color: newColor.name as Task["color"] }
          // If task has subtasks, update their colors too
          if (updatedTask.subtasks) {
            updatedTask.subtasks = updatedTask.subtasks.map((subtask) => ({
              ...subtask,
              color: newColor.name as Task["color"],
            }))
          }
          return updatedTask
        }
        return t
      })
    )
  }

  return (
    <>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger className="absolute top-4 right-2">
          <EllipsisVertical className="text-gray-11" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          onCloseAutoFocus={(e) => {
            // Prevent focus management when in edit mode
            if (editMode) e.preventDefault()
          }}
        >
          <MotionConfig transition={transition}>
            <motion.div
              initial={false}
              animate={{
                width: editMode ? 210 : 200,
                height: "auto",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={editMode ? "edit" : "normal"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {!editMode ? (
                    <Box>
                      <DropdownMenu.Item onSelect={handleEditClick}>
                        <Pencil size={16} /> Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
                        <Clipboard size={16} /> Add Subtask
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
                        <UserRoundPlus size={16} /> Add Member
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={handleDuplicate}>
                        <Copy size={16} /> Duplicate
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item color="red" onSelect={handleDelete}>
                        <Trash2 size={20} />
                        Delete
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <ColorPicker
                        colorType="base"
                        onColorSelect={handleColorSelect}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Box className="mb-3">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="w-full rounded-md border border-gray-6 bg-gray-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Box>
                      <Box className="flex justify-end gap-2">
                        <Button
                          variant="soft"
                          color="red"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCancel()
                          }}
                          className="flex cursor-pointer items-center gap-1 rounded-md px-3 py-1 text-sm"
                        >
                          <X size={14} /> Cancel
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSave()
                          }}
                          className="flex cursor-pointer items-center gap-1 rounded-md px-3 py-1 text-sm"
                        >
                          <Save size={14} /> Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </MotionConfig>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}

export default EditDropdown
