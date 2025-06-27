// components/shared/task-actions-menu.tsx
import React, { useState, useCallback } from "react"
import {
  DropdownMenu,
  IconButton,
  Box,
  Flex,
  Text,
  Badge,
  Avatar,
  Calendar,
  Popover,
  Button,
} from "@incmix/ui"
import {
  MoreVertical,
  User,
  Calendar as CalendarIcon,
  Flag,
  ArrowRight,
  Trash2,
  Copy,
  Edit3,
  AlertCircle,
  Clock,
} from "lucide-react"
import { TaskDataSchema, TaskStatusDocType } from "@incmix/utils/schema"
import { KanbanTask } from "../types" // Import KanbanTask type


// Hard-coded members data (same as in mention input)
const members = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    position: "UI/UX Designer",
    color: "blue",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe", 
    label: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    position: "Project Manager",
    color: "amber",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=32&h=32&fit=crop&crop=face",
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "Michael Brown",
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    position: "Product Designer", 
    color: "orange",
  },
]

interface TaskActionsMenuProps {
  // For existing tasks
  task?: TaskDataSchema | KanbanTask
  
  // For new task creation context
  newTaskData?: {
    priority?: string
    startDate?: string
    endDate?: string
    assignedTo?: Array<{ id: string; name: string; image?: string }>
    columnId?: string
  }
  
  // Available columns for moving tasks
  columns?: TaskStatusDocType[] 
  
  // Callbacks
  onUpdateTask?: (updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask?: () => Promise<void>
  onDuplicateTask?: () => Promise<void>
  onNewTaskDataChange?: (data: any) => void
  
  // UI props
  disabled?: boolean
  size?: "1" | "2" | "3"
  variant?: "ghost" | "soft" | "solid"
  
  // Context - determines which options to show
  mode?: "existing-task" | "new-task" | "both"
}

export function TaskActionsMenu({
  task,
  newTaskData,
  columns = [],
  onUpdateTask,
  onDeleteTask,
  onDuplicateTask,
  onNewTaskDataChange,
  disabled = false,
  size = "1",
  variant = "ghost",
  mode = "existing-task"
}: TaskActionsMenuProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<"start" | "end" | null>(null)
  const [isMemberPickerOpen, setIsMemberPickerOpen] = useState(false)

  // Get current values - either from existing task or new task data
  const currentPriority = task?.priority || newTaskData?.priority || "medium"
  const currentStartDate = task?.startDate || newTaskData?.startDate
  const currentEndDate = task?.endDate || newTaskData?.endDate
  const currentAssignedTo = task?.assignedTo || newTaskData?.assignedTo || []
  const currentColumnId = task?.columnId || newTaskData?.columnId

  // Priority helpers
  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case "urgent": return { color: "red" as const, icon: AlertCircle, label: "Urgent" }
      case "high": return { color: "orange" as const, icon: Flag, label: "High" }
      case "medium": return { color: "blue" as const, icon: Clock, label: "Medium" }
      case "low": return { color: "gray" as const, icon: Clock, label: "Low" }
      default: return { color: "blue" as const, icon: Clock, label: "Medium" }
    }
  }

  // Update handlers
  const handleUpdateField = useCallback(async (field: string, value: any) => {
    if (task && onUpdateTask) {
      // Existing task - update directly
      await onUpdateTask({ [field]: value })
    } else if (onNewTaskDataChange) {
      // New task - update the creation data
      onNewTaskDataChange({ [field]: value })
    }
  }, [task, onUpdateTask, onNewTaskDataChange])

  const handlePriorityChange = useCallback((priority: string) => {
    handleUpdateField("priority", priority)
  }, [handleUpdateField])

  const handleDateChange = useCallback((type: "start" | "end", date: Date | undefined) => {
    if (date) {
      handleUpdateField(type === "start" ? "startDate" : "endDate", date.toISOString())
    }
    setIsDatePickerOpen(null)
  }, [handleUpdateField])

  const handleMemberToggle = useCallback((member: typeof members[0]) => {
    const isAssigned = currentAssignedTo.find(u => u.id === member.id)
    let newAssignedTo
    
    if (isAssigned) {
      newAssignedTo = currentAssignedTo.filter(u => u.id !== member.id)
    } else {
      newAssignedTo = [...currentAssignedTo, {
        id: member.id,
        name: member.name,
        image: member.avatar
      }]
    }
    
    handleUpdateField("assignedTo", newAssignedTo)
  }, [currentAssignedTo, handleUpdateField])

  const handleMoveToColumn = useCallback((columnId: string) => {
    handleUpdateField("columnId", columnId)
  }, [handleUpdateField])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: new Date(dateString).getFullYear() !== new Date().getFullYear() ? "numeric" : undefined
    })
  }

  const priorityInfo = getPriorityInfo(currentPriority)
  const PriorityIcon = priorityInfo.icon

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger   >
        <IconButton
          size={size}
          variant={variant}
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical size={size === "1" ? 14 : 16} />
        </IconButton>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Content align="end" className="w-56">
        {/* Priority Section */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Flex align="center" gap="2">
              <PriorityIcon size={14} />
              <Text>Set Priority</Text>
              <Badge 
                color={priorityInfo.color} 
                variant="soft" 
                size="1"
                className="ml-auto"
              >
                {priorityInfo.label}
              </Badge>
            </Flex>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            {["low", "medium", "high", "urgent"].map((priority) => {
              const info = getPriorityInfo(priority)
              const Icon = info.icon
              const isSelected = currentPriority === priority
              return (
                <DropdownMenu.Item
                  key={priority}
                  onClick={() => handlePriorityChange(priority)}
                  className={isSelected ? "bg-accent" : ""}
                >
                  <Flex align="center" gap="2">
                    <Icon size={14} className={{
                      red: "text-red-500",
                      orange: "text-orange-500",
                      blue: "text-blue-500",
                      gray: "text-gray-500"
                    }[info.color]} />
                    <Text>{info.label}</Text>
                  </Flex>
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        {/* Dates Section */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Flex align="center" gap="2">
              <CalendarIcon size={14} />
              <Text>Set Dates</Text>
            </Flex>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <Box className="p-2 space-y-2">
              {/* Start Date */}
              <Popover.Root 
                open={isDatePickerOpen === "start"} 
                onOpenChange={(open) => setIsDatePickerOpen(open ? "start" : null)}
              >
                <Popover.Trigger>
                  <Button variant="ghost" className="w-full justify-start">
                    <Flex align="center" gap="2" className="w-full">
                      <CalendarIcon size={12} className="text-green-600" />
                      <Text size="2">Start Date</Text>
                      {currentStartDate && (
                        <Text size="1" className="ml-auto text-muted-foreground">
                          {formatDate(currentStartDate)}
                        </Text>
                      )}
                    </Flex>
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Calendar
                    mode="single"
                    selected={currentStartDate ? new Date(currentStartDate) : undefined}
                    onSelect={(date) => handleDateChange("start", date)}
                    initialFocus
                  />
                </Popover.Content>
              </Popover.Root>

              {/* End Date */}
              <Popover.Root 
                open={isDatePickerOpen === "end"} 
                onOpenChange={(open) => setIsDatePickerOpen(open ? "end" : null)}
              >
                <Popover.Trigger>
                  <Button variant="ghost" className="w-full justify-start">
                    <Flex align="center" gap="2" className="w-full">
                      <CalendarIcon size={12} className="text-muted-foreground" />
                      <Text size="2">End Date</Text>
                      {currentEndDate && (
                        <Text size="1" className="ml-auto text-muted-foreground">
                          {formatDate(currentEndDate)}
                        </Text>
                      )}
                    </Flex>
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Calendar
                    mode="single"
                    selected={currentEndDate ? new Date(currentEndDate) : undefined}
                    onSelect={(date) => handleDateChange("end", date)}
                    initialFocus
                  />
                </Popover.Content>
              </Popover.Root>
            </Box>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        {/* Assign Members */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Flex align="center" gap="2">
              <User size={14} />
              <Text>Assign To</Text>
              {currentAssignedTo.length > 0 && (
                <Badge variant="soft" size="1" className="ml-auto">
                  {currentAssignedTo.length}
                </Badge>
              )}
            </Flex>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent className="w-64">
            <Box className="p-2 space-y-1 max-h-64 overflow-y-auto">
              {members.map((member) => {
                const isAssigned = currentAssignedTo.find(u => u.id === member.id)
                return (
                  <div
                    key={member.id}
                    className={`
                      flex items-start gap-3 w-full p-3 rounded-md cursor-pointer transition-colors
                      hover:bg-accent
                      ${isAssigned ? 'bg-accent/50' : ''}
                    `}
                    onClick={() => handleMemberToggle(member)}
                  >
                    <Avatar 
                      src={member.avatar} 
                      name={member.name}
                      className="w-6 h-6"
                    />
                    <div className="flex-1 flex flex-col gap-3">
                      <div>
                        <p className="text-sm font-medium leading-none">{member.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{member.position}</p>
                      </div>
                    </div>
                    {isAssigned && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                )
              })}
            </Box>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        {/* Move To Column (only for existing tasks) */}
        {mode !== "new-task" && columns.length > 0 && (
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Flex align="center" gap="2">
                <ArrowRight size={14} />
                <Text>Move To</Text>
              </Flex>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              {columns.map((column) => {
                const isCurrentColumn = currentColumnId === column.id
                return (
                  <DropdownMenu.Item
                    key={column.id}
                    onClick={() => handleMoveToColumn(column.id)}
                    className={isCurrentColumn ? "bg-accent" : ""}
                  >
                    <Flex align="center" gap="2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: column.color }}
                      />
                      <Text>{column.name}</Text>
                    </Flex>
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        )}

        {/* Separator for task actions */}
        {mode !== "new-task" && (
          <>
            <DropdownMenu.Separator />
            
            {/* Edit Task */}
            <DropdownMenu.Item>
              <Edit3 size={14} />
              <Text>Edit Task</Text>
            </DropdownMenu.Item>

            {/* Duplicate Task */}
            {onDuplicateTask && (
              <DropdownMenu.Item onClick={onDuplicateTask}>
                <Copy size={14} />
                <Text>Duplicate</Text>
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Separator />

            {/* Delete Task */}
            {onDeleteTask && (
              <DropdownMenu.Item 
                onClick={onDeleteTask}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 size={14} />
                <Text>Delete Task</Text>
              </DropdownMenu.Item>
            )}
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}