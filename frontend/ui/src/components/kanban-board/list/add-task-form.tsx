import type React from "react"
import { useState, useRef } from "react"
import { Dialog, Button, Input, TextArea, Label, MultipleSelector, Flex, Checkbox } from "@incmix/ui"
import { X, Plus, Calendar } from "lucide-react"
import { SmartDatetimeInput } from "@components/datetime-picker"
import { TaskDataSchema, useTaskStore } from "@incmix/store"
import { members } from "@components/projects/data"

export interface Option {
  value: string
  label: string
  id?: string
  name?: string
  disable?: boolean
  avatar?: string
  color?: string
  position?: string
  fixed?: boolean
  [key: string]: string | boolean | undefined
}

interface AddTaskFormProps {
  isOpen: boolean
  onClose: () => void
  columnId: string
  taskOrder?: number
}

interface TaskFormData {
  name: string
  columnId: string
  description: string
  completed: boolean
  taskOrder: number
  attachment: Array<{
    name: string
    url: string
    size: string
  }>
  subTasks: Array<{
    name: string
    progress: number
    completed: boolean
  }>
}



const getCurrentUser = () => ({
  id: "current-user-id",
  name: "Current User",
  image: "/placeholder.svg?height=32&width=32",
})

export function AddTaskForm({ isOpen, onClose, columnId, taskOrder = 0 }: AddTaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    name: "",
    columnId,
    description: "",
    completed: false,
    taskOrder,
    attachment: [],
    subTasks: [],
  })

  const [selectedMembers, setSelectedMembers] = useState<Option[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [newSubTask, setNewSubTask] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { createTask } = useTaskStore()

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleInputChange = (field: keyof TaskFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileData = {
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }

      setFormData((prev) => ({
        ...prev,
        attachment: [...prev.attachment, fileData],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachment: prev.attachment.filter((_, i) => i !== index),
    }))
  }

  const addSubTask = () => {
    if (newSubTask.trim()) {
      const subTask = {
        name: newSubTask.trim(),
        progress: 0,
        completed: false,
      }

      setFormData((prev) => ({
        ...prev,
        subTasks: [...prev.subTasks, subTask],
      }))
      setNewSubTask("")
    }
  }

  const removeSubTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter((_, i) => i !== index),
    }))
  }

  const updateSubTaskProgress = (index: number, progress: number) => {
    setFormData((prev) => ({
      ...prev,
      subTasks: prev.subTasks.map((task, i) =>
        i === index ? { ...task, progress, completed: progress === 100 } : task,
      ),
    }))
  }

  const calculateDaysLeft = (date: Date) => {
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const convertMembersToAssignedTo = (members: Option[]): TaskDataSchema["assignedTo"] => {
    return members.map((member) => ({
      id: member.value,
      name: member.label,
      image: member.avatar || "/placeholder.svg?height=32&width=32",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    setIsSubmitting(true)
    try {
      const currentUser = getCurrentUser()

      const daysLeft = selectedDate ? calculateDaysLeft(selectedDate) : 0

      const taskData: Omit<TaskDataSchema, "id" | "taskId" | "createdAt" | "updatedAt"> = {
        name: formData.name.trim(),
        columnId: formData.columnId,
        date: selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        description: formData.description,
        completed: formData.completed,
        daysLeft,
        taskOrder: formData.taskOrder,
        attachment: formData.attachment.map((file) => ({
          name: file.name,
          url: file.url,
          size: file.size,
        })),
        assignedTo: convertMembersToAssignedTo(selectedMembers),
        subTasks: formData.subTasks,
        createdBy: currentUser,
        updatedBy: currentUser,
      }

      await createTask(taskData)

      setFormData({
        name: "",
        columnId,
        description: "",
        completed: false,
        taskOrder,
        attachment: [],
        subTasks: [],
      })
      setSelectedMembers([])
      setSelectedDate(undefined)
      setNewSubTask("")
      onClose()
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="max-w-xl max-h-[90vh] overflow-y-auto">
        <Dialog.Title className="font-medium text-lg mb-4">Add New Task</Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="taskName" className="text-sm font-medium">
              Task Name *
            </Label>
            <Input
              id="taskName"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter task name..."
              required
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter task description..."
              rows={3}
              className="w-full"
            />
          </div>

          {/* Date and Days Left */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                <Calendar size={16} />
                Due Date
              </Label>
              <SmartDatetimeInput
                value={selectedDate}
                showTimePicker={false}
                onValueChange={handleDateChange}
                placeholder="Enter a date and time"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Days Left</Label>
              <div className="p-2.5 bg-gray-100 rounded text-sm">
                {selectedDate ? calculateDaysLeft(selectedDate) : 0} days
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Files</Label>
            <div className="space-y-2">
              <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" multiple />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                <Plus size={16} className="mr-2" />
                Add File
              </Button>
              {formData.attachment.length > 0 && (
                <div className="space-y-2">
                  {formData.attachment.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                      <Button type="button" variant="ghost" onClick={() => removeFile(index)}>
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ✅ Assigned To - Using selectedMembers state */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Assigned To</Label>
            <Flex gap={"2"} wrap={"wrap"}>
              <MultipleSelector
                value={selectedMembers}
                onChange={setSelectedMembers}
                defaultColor={"gray"}
                defaultOptions={members}
                placeholder="Select members"
                className="border-1 dark:bg-gray-1"
                emptyIndicator={<p className="text-center text-gray-6 text-lg dark:text-gray-400">No results found.</p>}
              />
            </Flex>
          </div>

          {/* Sub Tasks */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sub Tasks</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newSubTask}
                  onChange={(e) => setNewSubTask(e.target.value)}
                  placeholder="Sub task name"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSubTask()
                    }
                  }}
                />
                <Button type="button" onClick={addSubTask} disabled={!newSubTask.trim()}>
                  <Plus size={16} />
                </Button>
              </div>
              {formData.subTasks.length > 0 && (
                <div className="space-y-2">
                  {formData.subTasks.map((subTask, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{subTask.name}</span>
                        <Button type="button" variant="ghost" onClick={() => removeSubTask(index)}>
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-9 hover:bg-indigo-10"
              disabled={!formData.name.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
