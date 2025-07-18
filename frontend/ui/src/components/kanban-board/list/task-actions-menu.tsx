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
  IndentIcon,
  OutdentIcon,
} from "lucide-react"
import { TaskDataSchema } from "@incmix/utils/schema"
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
  task?: KanbanTask | TaskDataSchema
  columns: TaskDataSchema[]
  onNewTaskDataChange?: (newData: any) => void
  priorityLabels?: { 
    id: string; 
    name: string; 
    color: string; 
    type: string 
  }[]
  onUpdateTask?: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask?: () => Promise<void>
  onDuplicateTask?: () => Promise<void>
  onCreateTask?: (task: Partial<TaskDataSchema>) => Promise<void>
  // New subtask operations
  onIndentTask?: (taskId: string) => Promise<void>
  onUnindentTask?: (taskId: string) => Promise<void>
  canIndent?: boolean
  canUnindent?: boolean
  newTaskData?: { 
    priorityId?: string;
    startDate?: string;
    endDate?: string;
    assignedTo?: { 
      id: string; 
      name: string; 
      image?: string 
    }[];
    statusId?: string;
  }
  setNewTaskData?: React.Dispatch<React.SetStateAction<Partial<TaskDataSchema>>>
  disabled?: boolean
  size?: "1" | "2" | "3"
  variant?: "ghost" | "soft" | "outline"
  mode?: "existing-task" | "new-task"
}

export function TaskActionsMenu({
  task,
  columns,
  priorityLabels = [],
  onUpdateTask,
  onDeleteTask,
  onDuplicateTask,
  onCreateTask,
  // New subtask operation props
  onIndentTask,
  onUnindentTask,
  canIndent = false,
  canUnindent = false,
  newTaskData,
  setNewTaskData,
  disabled = false,
  size = "1",
  variant = "ghost",
  mode = "existing-task"
}: TaskActionsMenuProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<"start" | "end" | null>(null)

  // Get current values - either from existing task or new task data
  const currentPriorityId = task?.priorityId || newTaskData?.priorityId || ""
  const currentStartDate = task?.startDate || newTaskData?.startDate
  const currentEndDate = task?.endDate || newTaskData?.endDate
  const currentAssignedTo = task?.assignedTo || newTaskData?.assignedTo || []
  const currentStatusId = task?.statusId || newTaskData?.statusId

  // Priority helpers - updated for new schema with priorityId and labels
  const getPriorityInfo = (priorityId: string | undefined) => {
    // Find the priority label by its ID
    const priorityLabel = priorityLabels.find(label => label.id === priorityId)
    
    if (!priorityLabel) {
      // Default when no priorityId or label found
      return { color: "blue" as const, icon: Clock, label: "Medium" }
    }
    
    // Determine display based on priority name
    const name = priorityLabel.name.toLowerCase()
    if (name.includes("urgent")) {
      return { color: "red" as const, icon: AlertCircle, label: priorityLabel.name }
    } else if (name.includes("high")) {
      return { color: "orange" as const, icon: Flag, label: priorityLabel.name }
    } else if (name.includes("low")) {
      return { color: "gray" as const, icon: Clock, label: priorityLabel.name }
    } else {
      // Medium or any other priority
      return { color: "blue" as const, icon: Clock, label: priorityLabel.name }
    }
  }

  // Task action handlers - updated for priorityId
  const handlePriorityChange = useCallback((priorityId: string) => {
    if (mode === "existing-task" && task?.id && onUpdateTask) {
      onUpdateTask(task.id, { priorityId })
    } else if (mode === "new-task" && setNewTaskData) {
      setNewTaskData(prev => ({ ...prev, priorityId }))
    }
  }, [mode, task?.id, onUpdateTask, setNewTaskData])

  const handleUpdateField = useCallback(async (field: string, value: any) => {
    if (task?.id && onUpdateTask) {
      // Existing task - update directly
      await onUpdateTask(task.id, { [field]: value })
    } else if (setNewTaskData) {
      // New task - update the creation data
      setNewTaskData(prev => ({ ...prev, [field]: value }))
    }
  }, [task, onUpdateTask, setNewTaskData])

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

  const handleMoveToColumn = useCallback((statusId: string) => {
    handleUpdateField("statusId", statusId)
  }, [handleUpdateField])

  const formatDate = (dateInput: string | number) => {
    return new Date(dateInput).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: new Date(dateInput).getFullYear() !== new Date().getFullYear() ? "numeric" : undefined
    })
  }

  const priorityInfo = getPriorityInfo(currentPriorityId)
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
        {/* Priority Section - Updated for priorityId and labels */}
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
            {priorityLabels
              .filter(label => label.type === "priority")
              .map((priorityLabel) => {
              const info = getPriorityInfo(priorityLabel.id)
              const Icon = info.icon
              const isSelected = currentPriorityId === priorityLabel.id
              return (
                <DropdownMenu.Item
                  key={priorityLabel.id}
                  onClick={() => handlePriorityChange(priorityLabel.id)}
                  className={isSelected ? "bg-accent" : ""}
                >
                  <Flex align="center" gap="2">
                    <Icon size={14} />
                    <Text>{priorityLabel.name}</Text>
                    <Badge color={info.color} variant="soft" size="1" className="ml-auto">
                      {priorityLabel.name}
                    </Badge>
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
                      <CalendarIcon size={12} className="text-green-9" />
                      <Text size="2">Start Date</Text>
                      {currentStartDate && (
                        <Text size="1" className="ml-auto text-gray-9">
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
                      <CalendarIcon size={12} className="text-gray-9" />
                      <Text size="2">End Date</Text>
                      {currentEndDate && (
                        <Text size="1" className="ml-auto text-gray-9">
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
                        <p className="text-xs text-gray-9">{member.position}</p>
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

        {/* Move to Column Section - Updated for statusId */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Flex align="center" gap="2">
              <ArrowRight size={14} />
              <Text>Move to</Text>
              {columns.map(col => {
                const isCurrentColumn = col.id === currentStatusId
                if (isCurrentColumn) {
                  return (
                    <Badge 
                      key={col.id}
                      style={{ backgroundColor: `${(col as any).color ? `${(col as any).color}20` : '#e0e0e020'}`, color: (col as any).color || '#808080' }}
                      variant="soft"
                      size="1"
                      className="ml-auto"
                    >
                      {col.name}
                    </Badge>
                  )
                }
                return null
              })}
            </Flex>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            {columns.map((column) => {
              const isCurrentColumn = column.id === currentStatusId
              return (
                <DropdownMenu.Item
                  key={column.id}
                  onClick={() => handleMoveToColumn(column.id)}
                  className={isCurrentColumn ? "bg-accent" : ""}
                  disabled={isCurrentColumn}
                >
                  <Flex align="center" gap="2">
                    <Box
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: (column as any).color || '#808080' }}
                    />
                    <Text>{column.name}</Text>
                  </Flex>
                </DropdownMenu.Item>
              )
            })}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

        {/* Separator for task actions */}
        {mode !== "new-task" && (
          <>
            <DropdownMenu.Separator />
            
            {/* Task Hierarchy Actions - New Section */}
            {/* Indent Task (convert to subtask) */}
            {onIndentTask && (
              <DropdownMenu.Item 
                onClick={() => task?.id && onIndentTask(task.id)} 
                disabled={!canIndent}
              >
                <IndentIcon size={14} />
                <Text>Convert to Subtask</Text>
              </DropdownMenu.Item>
            )}

            {/* Unindent Task (convert from subtask) */}
            {onUnindentTask && (
              <DropdownMenu.Item 
                onClick={() => task?.id && onUnindentTask(task.id)} 
                disabled={!canUnindent}
              >
                <OutdentIcon size={14} />
                <Text>Convert to Task</Text>
              </DropdownMenu.Item>
            )}

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