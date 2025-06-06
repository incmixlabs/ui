"use client"

import { type KanbanColumn, useKanban } from "@incmix/store"
import {
  Button,
  Dialog,
  Flex,
  Select,
  TextArea,
  TextField,
  toast,
} from "@incmix/ui/base"
import { Plus } from "lucide-react"
import { useState } from "react"

interface CreateTaskFormProps {
  projectId: string
  columns: KanbanColumn[]
  onSuccess?: () => void
}

export function CreateTaskForm({
  projectId,
  columns,
  onSuccess,
}: CreateTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    columnId: "",
    priority: "medium" as const,
    startDate: "",
    endDate: "",
  })

  // Get the createTask function from the hook
  const { createTask } = useKanban(projectId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error("Task name is required")
      return
    }

    if (!formData.columnId) {
      toast.error("Please select a column")
      return
    }

    setIsLoading(true)

    try {
      await createTask(formData.columnId, {
        name: formData.name,
        description: formData.description,
        priority: formData.priority,
        startDate: formData.startDate || new Date().toISOString(),
        endDate: formData.endDate,
        completed: false,
        labelsTags: [],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: 0,
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        columnId: "",
        priority: "medium",
        startDate: "",
        endDate: "",
      })

      setIsOpen(false)
      toast.success("Task created successfully!")
      onSuccess?.()
    } catch (error) {
      console.error("Failed to create task:", error)
      toast.error("Failed to create task")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button variant="outline" size="2">
          <Plus size={16} />
          Add Task
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-md">
        <Dialog.Header>
          <Dialog.Title>Create New Task</Dialog.Title>
          <Dialog.Description>
            Add a new task to your project board
          </Dialog.Description>
        </Dialog.Header>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {/* Task Name */}
            <div>
              <label
                htmlFor="task-name"
                className="mb-1 block font-medium text-sm"
              >
                Task Name *
              </label>
              <TextField.Root
                id="task-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter task name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="task-description"
                className="mb-1 block font-medium text-sm"
              >
                Description
              </label>
              <TextArea
                id="task-description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter task description (optional)"
                rows={3}
              />
            </div>

            {/* Column Selection */}
            <div>
              <label
                htmlFor="column-trigger"
                className="mb-1 block font-medium text-sm"
              >
                Column *
              </label>
              <Select.Root
                value={formData.columnId}
                onValueChange={(value) => handleInputChange("columnId", value)}
                required
              >
                <Select.Trigger
                  id="column-trigger"
                  placeholder="Select a column"
                >
                  {formData.columnId &&
                    columns.find((col) => col.id === formData.columnId)?.name}
                </Select.Trigger>
                <Select.Content>
                  {columns.map((column) => (
                    <Select.Item key={column.id} value={column.id}>
                      <Flex align="center" gap="2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: column.color }}
                        />
                        {column.name}
                      </Flex>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority-trigger"
                className="mb-1 block font-medium text-sm"
              >
                Priority
              </label>
              <Select.Root
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
              >
                <Select.Trigger id="priority-trigger" />
                <Select.Content>
                  <Select.Item value="low">Low</Select.Item>
                  <Select.Item value="medium">Medium</Select.Item>
                  <Select.Item value="high">High</Select.Item>
                  <Select.Item value="urgent">Urgent</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            {/* Dates */}
            <Flex gap="2">
              <div className="flex-1">
                <label
                  htmlFor="task-start-date"
                  className="mb-1 block font-medium text-sm"
                >
                  Start Date
                </label>
                <TextField.Root
                  id="task-start-date"
                  type="date"
                  value={
                    formData.startDate ? formData.startDate.split("T")[0] : ""
                  }
                  onChange={(e) => {
                    const date = e.target.value
                      ? new Date(e.target.value).toISOString()
                      : ""
                    handleInputChange("startDate", date)
                  }}
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="task-end-date"
                  className="mb-1 block font-medium text-sm"
                >
                  End Date
                </label>
                <TextField.Root
                  id="task-end-date"
                  type="date"
                  value={formData.endDate ? formData.endDate.split("T")[0] : ""}
                  onChange={(e) => {
                    const date = e.target.value
                      ? new Date(e.target.value).toISOString()
                      : ""
                    handleInputChange("endDate", date)
                  }}
                />
              </div>
            </Flex>
          </Flex>

          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={isLoading}>
              Create Task
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
