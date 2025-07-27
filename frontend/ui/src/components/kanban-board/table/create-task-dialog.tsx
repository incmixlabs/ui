// components/table/create-task-dialog.tsx
import React, { useState, useCallback } from "react"
import {
  Dialog,
  Button,
  TextField,
  TextArea,
  Select,
  Flex,
  Box,
  Text,
  Badge,
  Avatar,
} from "@incmix/ui"
import { X, Calendar, User, Flag } from "lucide-react"
import { PRIORITY_OPTIONS, getPriorityInfo } from "./table-columns-config"
import type { TableTask } from "../types"
import { getMembersForAssignment } from "../constants/mock-members"

// Get members data from centralized source
const AVAILABLE_MEMBERS = getMembersForAssignment()

interface CreateTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask: (taskData: Partial<TableTask>) => Promise<void>
  taskStatuses: Array<{
    id: string
    name: string
    color: string
  }>
}

export function CreateTaskDialog({ 
  isOpen, 
  onClose, 
  onCreateTask, 
  taskStatuses 
}: CreateTaskDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    columnId: taskStatuses[0]?.id || "",
    priority: "medium",
    startDate: "",
    endDate: "",
    assignedTo: [] as Array<{ id: string; name: string; image?: string }>
  })

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        columnId: taskStatuses[0]?.id || "",
        priority: "medium",
        startDate: "",
        endDate: "",
        assignedTo: []
      })
    }
  }, [isOpen, taskStatuses])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) return
    
    setIsSubmitting(true)
    try {
      await onCreateTask({
        name: formData.name.trim(),
        description: formData.description.trim(),
        statusId: formData.columnId, // Map columnId from form to statusId for TableTask
        priorityId: formData.priority as "low" | "medium" | "high" | "urgent", // Map priority from form to priorityId for TableTask
        startDate: formData.startDate ? new Date(formData.startDate).getTime() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).getTime() : undefined,
        assignedTo: formData.assignedTo.map(user => ({
          id: user.id,
          name: user.name,
          avatar: user.image
        })),
        completed: false,
        labelsTags: [],
        attachments: [],
        subTasks: [],
        comments: []
      })
      
      onClose()
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, onCreateTask, onClose])

  const handleFieldChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleAssigneeToggle = useCallback((member: typeof AVAILABLE_MEMBERS[0]) => {
    setFormData(prev => {
      const isAssigned = prev.assignedTo.find(u => u.id === member.id)
      
      if (isAssigned) {
        return {
          ...prev,
          assignedTo: prev.assignedTo.filter(u => u.id !== member.id)
        }
      } else {
        return {
          ...prev,
          assignedTo: [...prev.assignedTo, {
            id: member.id,
            name: member.name,
            image: member.image
          }]
        }
      }
    })
  }, [])

  const selectedStatus = taskStatuses.find(s => s.id === formData.columnId)
  const priorityInfo = getPriorityInfo(formData.priority)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="max-w-lg">
        <Dialog.Header>
          <Dialog.Title>Create New Task</Dialog.Title>
          <Dialog.Description>
            Add a new task to your project
          </Dialog.Description>
        </Dialog.Header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name */}
          <Box>
            <Text size="2" weight="medium" className="mb-2">Task Name</Text>
            <TextField.Root
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="Enter task name..."
              required
            />
          </Box>

          {/* Description */}
          <Box>
            <Text size="2" weight="medium" className="mb-2">Description</Text>
            <TextArea
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              placeholder="Enter task description..."
              rows={3}
            />
          </Box>

          {/* Status and Priority Row */}
          <Flex gap="4">
            <Box className="flex-1">
              <Text size="2" weight="medium" className="mb-2">Status</Text>
              <Select.Root 
                value={formData.columnId} 
                onValueChange={(value) => handleFieldChange("columnId", value)}
              >
                <Select.Trigger placeholder="Select status">
                  <Flex align="center" gap="2">
                    {selectedStatus && (
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: selectedStatus.color }}
                      />
                    )}
                    {selectedStatus ? selectedStatus.name : "Select status"}
                  </Flex>
                </Select.Trigger>
                <Select.Content>
                  {taskStatuses.map((status) => (
                    <Select.Item key={status.id} value={status.id}>
                      <Flex align="center" gap="2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: status.color }}
                        />
                        {status.name}
                      </Flex>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Box>

            <Box className="flex-1">
              <Text size="2" weight="medium" className="mb-2">Priority</Text>
              <Select.Root 
                value={formData.priority} 
                onValueChange={(value) => handleFieldChange("priority", value)}
              >
                <Select.Trigger>
                  <Flex align="center" gap="2">
                    <Flag size={14} style={{ color: priorityInfo.color }} />
                    {priorityInfo.label}
                  </Flex>
                </Select.Trigger>
                <Select.Content>
                  {PRIORITY_OPTIONS.map((priority) => {
                    const Icon = priority.icon
                    return (
                      <Select.Item key={priority.value} value={priority.value}>
                        <Flex align="center" gap="2">
                          <Icon size={14} style={{ color: priority.color }} />
                          {priority.label}
                        </Flex>
                      </Select.Item>
                    )
                  })}
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>

          {/* Dates Row */}
          <Flex gap="4">
            <Box className="flex-1">
              <Text size="2" weight="medium" className="mb-2">Start Date</Text>
              <TextField.Root
                type="date"
                value={formData.startDate}
                onChange={(e) => handleFieldChange("startDate", e.target.value)}
              />
            </Box>

            <Box className="flex-1">
              <Text size="2" weight="medium" className="mb-2">Due Date</Text>
              <TextField.Root
                type="date"
                value={formData.endDate}
                onChange={(e) => handleFieldChange("endDate", e.target.value)}
              />
            </Box>
          </Flex>

          {/* Assignees */}
          <Box>
            <Text size="2" weight="medium" className="mb-2">Assign To</Text>
            <Box className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {AVAILABLE_MEMBERS.map((member) => {
                const isAssigned = formData.assignedTo.find(u => u.id === member.id)
                return (
                  <Flex
                    key={member.id}
                    align="center"
                    gap="3"
                    className={`
                      p-2 rounded cursor-pointer transition-colors
                      hover:bg-gray-50 dark:hover:bg-gray-800
                      ${isAssigned ? 'bg-blue-50 dark:bg-blue-950' : ''}
                    `}
                    onClick={() => handleAssigneeToggle(member)}
                  >
                    <Avatar 
                      src={member.image} 
                      name={member.name}
                      className="w-6 h-6"
                    />
                    <Text size="2" className="flex-1">{member.name}</Text>
                    {isAssigned && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </Flex>
                )
              })}
            </Box>

            {formData.assignedTo.length > 0 && (
              <Box className="mt-2">
                <Text size="1" className="text-gray-500 mb-2">Selected:</Text>
                <Flex gap="1" wrap="wrap">
                  {formData.assignedTo.map((user) => (
                    <Badge 
                      key={user.id} 
                      variant="soft" 
                      size="1"
                      className="flex items-center gap-1"
                    >
                      <Avatar src={user.image} name={user.name} className="w-4 h-4" />
                      {user.name}
                      <button
                        type="button"
                        onClick={() => handleAssigneeToggle({ 
                          id: user.id, 
                          name: user.name, 
                          image: user.image || "" 
                        })}
                        className="ml-1 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}
          </Box>

          {/* Actions */}
          <Dialog.Footer>
            <Button
              type="button"
              variant="soft"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.name.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}