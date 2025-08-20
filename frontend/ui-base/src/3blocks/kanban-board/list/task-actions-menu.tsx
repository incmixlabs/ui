import {
  Avatar,
  Badge,
  Box,
  Button,
  Calendar,
  Checkbox,
  DropdownMenu,
  Flex,
  IconButton,
  Popover,
  ScrollArea,
  Text,
} from "@/base"
import { AvatarGroup } from "@/src/2elements/avatar-group"
import type { TaskDataSchema } from "@incmix/utils/schema"
import {
  AlertCircle,
  ArrowRight,
  Calendar as CalendarIcon,
  Clipboard,
  Clock,
  Copy,
  Edit3,
  Flag,
  IndentIcon,
  MoreVertical,
  OutdentIcon,
  Trash2,
  User,
} from "lucide-react"
// components/shared/task-actions-menu.tsx
import { useCallback, useState } from "react"
import { MOCK_MEMBERS } from "../constants/mock-members"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { useTaskCopyBuffer } from "../hooks/use-task-copy-buffer"
import {
  type AssignedUser,
  OverlappingAvatarGroup,
} from "../shared/overlapping-avatar-group"
import type { KanbanTask } from "../types" // Import KanbanTask type

// Helper function to safely handle both hex and CSS variables for alpha backgrounds
function toAlphaBg(color?: string, hexAlpha = "20"): string {
  if (!color) return "var(--gray-a3)"
  if (color.startsWith("var(")) {
    const varName = color.match(/var\(([^)]+)\)/)?.[1]
    return varName
      ? `var(${varName.replace(/-\d+$/, "-a3")})`
      : "var(--gray-a3)"
  }
  if (color.startsWith("#")) return `${color}${hexAlpha}`
  return color
}

interface TaskActionsMenuProps {
  task?: KanbanTask | TaskDataSchema
  columns: TaskDataSchema[]
  onNewTaskDataChange?: (newData: any) => void
  priorityLabels?: {
    id: string
    name: string
    color: string
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
  // Copy/Paste operations
  currentStatusId?: string // Current column ID for paste operations
  newTaskData?: {
    priorityId?: string
    startDate?: string
    endDate?: string
    assignedTo?: {
      id: string
      name: string
      image?: string
    }[]
    statusId?: string
  }
  setNewTaskData?: React.Dispatch<React.SetStateAction<Partial<TaskDataSchema>>>
  disabled?: boolean
  size?: "1" | "2" | "3"
  variant?: "ghost" | "soft" | "outline"
  mode?: "existing-task" | "new-task"
}

export const TaskActionsMenu = ({
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
  // Copy/Paste props
  currentStatusId,
  newTaskData,
  setNewTaskData,
  disabled = false,
  size = "1",
  variant = "ghost",
  mode = "existing-task",
}: TaskActionsMenuProps) => {
  // Get drawer open handler from hook
  const { handleDrawerOpen } = useKanbanDrawer()
  const { copyTask, hasCopiedTask, copiedTask } = useTaskCopyBuffer()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<
    "start" | "end" | null
  >(null)

  // Get current values - either from existing task or new task data
  const currentPriorityId = task?.priorityId || newTaskData?.priorityId || ""
  const currentStartDate = task?.startDate || newTaskData?.startDate
  const currentEndDate = task?.endDate || newTaskData?.endDate
  const currentAssignedTo = task?.assignedTo || newTaskData?.assignedTo || []
  const _taskStatusId =
    task?.statusId || newTaskData?.statusId || currentStatusId

  // Priority helpers - updated for new schema with priorityId and labels
  const getPriorityInfo = (priorityId: string | undefined) => {
    // Find the priority label by its ID
    const priorityLabel = priorityLabels.find(
      (label) => label.id === priorityId
    )

    if (!priorityLabel) {
      // Default when no priorityId or label found
      return { color: "blue" as const, icon: Clock, label: "Medium" }
    }

    // Determine display based on priority name
    const name = priorityLabel.name.toLowerCase()
    if (name.includes("urgent")) {
      return {
        color: "red" as const,
        icon: AlertCircle,
        label: priorityLabel.name,
      }
    }
    if (name.includes("high")) {
      return { color: "orange" as const, icon: Flag, label: priorityLabel.name }
    }
    if (name.includes("low")) {
      return { color: "gray" as const, icon: Clock, label: priorityLabel.name }
    }
    // Medium or any other priority
    return { color: "blue" as const, icon: Clock, label: priorityLabel.name }
  }

  // Task action handlers - updated for priorityId
  const handlePriorityChange = useCallback(
    (priorityId: string) => {
      if (mode === "existing-task" && task?.id && onUpdateTask) {
        onUpdateTask(task.id, { priorityId })
      } else if (mode === "new-task" && setNewTaskData) {
        setNewTaskData((prev) => ({ ...prev, priorityId }))
      }
    },
    [mode, task?.id, onUpdateTask, setNewTaskData]
  )

  const handleUpdateField = useCallback(
    async (field: string, value: any) => {
      if (task?.id && onUpdateTask) {
        // Existing task - update directly
        await onUpdateTask(task.id, { [field]: value })
      } else if (setNewTaskData) {
        // New task - update the creation data
        setNewTaskData((prev) => ({ ...prev, [field]: value }))
      }
    },
    [task, onUpdateTask, setNewTaskData]
  )

  const handleDateChange = useCallback(
    (type: "start" | "end", date: Date | undefined) => {
      if (date) {
        handleUpdateField(
          type === "start" ? "startDate" : "endDate",
          date.toISOString()
        )
      }
      setIsDatePickerOpen(null)
    },
    [handleUpdateField]
  )

  const _handleMemberToggle = useCallback(
    (member: (typeof MOCK_MEMBERS)[0]) => {
      const isAssigned = currentAssignedTo.find((u) => u.id === member.id)
      let newAssignedTo: any[]

      if (isAssigned) {
        newAssignedTo = currentAssignedTo.filter((u) => u.id !== member.id)
      } else {
        newAssignedTo = [
          ...currentAssignedTo,
          {
            id: member.id,
            name: member.name,
            image: member.avatar,
            position: member.position,
          },
        ]
      }

      handleUpdateField("assignedTo", newAssignedTo)
    },
    [currentAssignedTo, handleUpdateField]
  )

  const handleMoveToColumn = useCallback(
    (statusId: string) => {
      handleUpdateField("statusId", statusId)
    },
    [handleUpdateField]
  )

  // Copy/Paste handlers
  const handleCopyTask = useCallback(() => {
    if (task?.id) {
      copyTask(task as TaskDataSchema)
      // Show success feedback
      console.log(`Task "${task.name || "Untitled Task"}" copied to clipboard`)
    }
  }, [task, copyTask])

  const handlePasteTask = useCallback(async () => {
    if (!copiedTask || !onCreateTask || !currentStatusId) return

    try {
      // Create a new task based on the copied task data
      const taskToPaste: Partial<TaskDataSchema> = {
        ...copiedTask.task,
        // Always create as a main task (not a subtask)
        isSubtask: false,
        parentTaskId: "",
        // Update status to current column
        statusId: currentStatusId,
        // Add suffix to name to indicate it's a copy
        name: `${copiedTask.task.name || "Untitled Task"} (Copy)`,
      }

      await onCreateTask(taskToPaste)
      console.log(`Task "${copiedTask.originalName}" pasted successfully`)
    } catch (error) {
      console.error("Failed to paste task:", error)
    }
  }, [copiedTask, onCreateTask, currentStatusId])

  const formatDate = (dateInput: string | number) => {
    return new Date(dateInput).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        new Date(dateInput).getFullYear() !== new Date().getFullYear()
          ? "numeric"
          : undefined,
    })
  }

  const priorityInfo = getPriorityInfo(currentPriorityId)
  const PriorityIcon = priorityInfo.icon

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          size={size}
          variant={variant}
          disabled={disabled}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
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
              <Text>Priority</Text>
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
              .filter((label) => label.type === "priority")
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
                      <Badge
                        color={info.color}
                        variant="soft"
                        size="1"
                        className="ml-auto"
                      >
                        {priorityLabel.name}
                      </Badge>
                    </Flex>
                  </DropdownMenu.Item>
                )
              })}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        {/* Move to Column Section - Updated for statusId */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Flex align="center" gap="2">
              <ArrowRight size={14} />
              <Text>Status</Text>
              {columns.map((col) => {
                const isCurrentColumn = col.id === currentStatusId
                if (isCurrentColumn) {
                  return (
                    <Badge
                      key={col.id}
                      variant="soft"
                      size="1"
                      className="ml-auto"
                      style={
                        {
                          backgroundColor: toAlphaBg((col as any).color),
                          color: (col as any).color || "var(--gray-11)",
                        } as React.CSSProperties
                      }
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
                      className="h-2 w-2 rounded-full"
                      style={
                        {
                          backgroundColor:
                            (column as any).color || "var(--gray-8)",
                        } as React.CSSProperties
                      }
                    />
                    <Text>{column.name}</Text>
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
              <Text>Dates</Text>
              {(currentStartDate || currentEndDate) && (
                <Badge variant="soft" size="1" className="ml-auto">
                  {currentStartDate && currentEndDate ? "2" : "1"}
                </Badge>
              )}
            </Flex>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent className="w-64">
            <Box className="space-y-3 p-3">
              <Text size="2" weight="medium" className="mb-3 text-gray-12">
                Task Dates
              </Text>

              {/* Start Date */}
              <Box className="space-y-2">
                <Text
                  size="1"
                  weight="medium"
                  className="text-gray-11 uppercase tracking-wide"
                >
                  Start Date
                </Text>
                <Popover.Root
                  open={isDatePickerOpen === "start"}
                  onOpenChange={(open: boolean) =>
                    setIsDatePickerOpen(open ? "start" : null)
                  }
                >
                  <Popover.Trigger>
                    <Button
                      variant="outline"
                      className="h-9 w-full justify-start px-3"
                      style={{
                        backgroundColor: currentStartDate
                          ? "var(--green-2)"
                          : "transparent",
                        borderColor: currentStartDate
                          ? "var(--green-7)"
                          : "var(--gray-7)",
                        color: currentStartDate
                          ? "var(--green-11)"
                          : "var(--gray-11)",
                      }}
                    >
                      <CalendarIcon size={14} className="mr-2" />
                      {currentStartDate ? (
                        <Text size="2" weight="medium">
                          {formatDate(currentStartDate)}
                        </Text>
                      ) : (
                        <Text size="2" className="text-gray-10">
                          Select start date
                        </Text>
                      )}
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        currentStartDate
                          ? new Date(currentStartDate)
                          : undefined
                      }
                      onSelect={(date: Date | undefined) =>
                        handleDateChange("start", date)
                      }
                      initialFocus
                    />
                  </Popover.Content>
                </Popover.Root>
              </Box>

              {/* End Date */}
              <Box className="space-y-2">
                <Text
                  size="1"
                  weight="medium"
                  className="text-gray-11 uppercase tracking-wide"
                >
                  End Date
                </Text>
                <Popover.Root
                  open={isDatePickerOpen === "end"}
                  onOpenChange={(open: boolean) =>
                    setIsDatePickerOpen(open ? "end" : null)
                  }
                >
                  <Popover.Trigger>
                    <Button
                      variant="outline"
                      className="h-9 w-full justify-start px-3"
                      style={{
                        backgroundColor: currentEndDate
                          ? "var(--red-2)"
                          : "transparent",
                        borderColor: currentEndDate
                          ? "var(--red-7)"
                          : "var(--gray-7)",
                        color: currentEndDate
                          ? "var(--red-11)"
                          : "var(--gray-11)",
                      }}
                    >
                      <CalendarIcon size={14} className="mr-2" />
                      {currentEndDate ? (
                        <Text size="2" weight="medium">
                          {formatDate(currentEndDate)}
                        </Text>
                      ) : (
                        <Text size="2" className="text-gray-10">
                          Select end date
                        </Text>
                      )}
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        currentEndDate ? new Date(currentEndDate) : undefined
                      }
                      onSelect={(date: Date | undefined) =>
                        handleDateChange("end", date)
                      }
                      initialFocus
                      disabled={(date) => {
                        // Disable dates before start date if start date is set
                        if (currentStartDate) {
                          return date < new Date(currentStartDate)
                        }
                        return false
                      }}
                    />
                  </Popover.Content>
                </Popover.Root>
              </Box>

              {/* Clear dates option */}
              {(currentStartDate || currentEndDate) && (
                <Button
                  variant="ghost"
                  size="1"
                  className="mt-3 w-full text-gray-10 hover:text-gray-12"
                  onClick={() => {
                    if (currentStartDate) handleUpdateField("startDate", null)
                    if (currentEndDate) handleUpdateField("endDate", null)
                  }}
                >
                  <Text size="1">Clear all dates</Text>
                </Button>
              )}
            </Box>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        {/* Assign Members */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Flex align="center" gap="2">
              <User size={14} />
              <Text>Assignee</Text>
              {currentAssignedTo.length > 0 && (
                <Badge variant="soft" size="1" className="ml-auto">
                  {currentAssignedTo.length}
                </Badge>
              )}
            </Flex>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent className="w-72">
            <Box className="space-y-3 p-3">
              <Text size="2" weight="medium" className="text-gray-12">
                Assign Members
              </Text>

              {/* Currently Assigned Members Display */}
              {currentAssignedTo.length > 0 && (
                <Box className="space-y-2">
                  <Text
                    size="1"
                    weight="medium"
                    className="text-gray-11 uppercase tracking-wide"
                  >
                    Assigned ({currentAssignedTo.length})
                  </Text>
                  <AvatarGroup
                    users={currentAssignedTo.map((user) => ({
                      id: user.id,
                      name: user.name,
                      src: (user as any).image || (user as any).avatar,
                    }))}
                    maxVisible={4}
                    size="3"
                    layout="spread"
                  />
                </Box>
              )}

              {/* Available Members List */}
              <Box className="space-y-2">
                <Text
                  size="1"
                  weight="medium"
                  className="text-gray-11 uppercase tracking-wide"
                >
                  Team Members
                </Text>
                <ScrollArea
                  type="hover"
                  scrollbars="vertical"
                  style={{ maxHeight: "200px" }}
                >
                  <Box className="space-y-1 pr-2">
                    {MOCK_MEMBERS.map((member) => {
                      const isAssigned = currentAssignedTo.some(
                        (user) => user.id === member.id
                      )
                      return (
                        <Flex
                          key={member.id}
                          align="center"
                          gap="3"
                          className="cursor-pointer rounded-md p-2 hover:bg-gray-3"
                        >
                          <Checkbox
                            checked={isAssigned}
                            onCheckedChange={() => {
                              const newAssignedTo = isAssigned
                                ? currentAssignedTo.filter(
                                    (user) => user.id !== member.id
                                  )
                                : [
                                    ...currentAssignedTo,
                                    {
                                      id: member.id,
                                      name: member.name,
                                      image: member.avatar,
                                    },
                                  ]
                              handleUpdateField("assignedTo", newAssignedTo)
                            }}
                          />
                          <Avatar
                            src={member.avatar}
                            name={member.name}
                            size="2"
                          />
                          <Box className="flex-1">
                            <Text size="2" weight="medium">
                              {member.name}
                            </Text>
                            {member.position && (
                              <Text size="1" className="text-gray-10">
                                {member.position}
                              </Text>
                            )}
                          </Box>
                        </Flex>
                      )
                    })}
                  </Box>
                </ScrollArea>
              </Box>

              {/* Clear All Button */}
              {currentAssignedTo.length > 0 && (
                <Button
                  variant="ghost"
                  size="1"
                  className="mt-2 w-full text-gray-10 hover:text-gray-12"
                  onClick={() => handleUpdateField("assignedTo", [])}
                >
                  <Text size="1">Clear all assignments</Text>
                </Button>
              )}
            </Box>
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
                className="flex items-center gap-2"
              >
                <IndentIcon size={14} />
                <Text>Make Subtask</Text>
              </DropdownMenu.Item>
            )}

            {/* Unindent Task (convert from subtask) */}
            {onUnindentTask && (
              <DropdownMenu.Item
                onClick={() => task?.id && onUnindentTask(task.id)}
                disabled={!canUnindent}
                className="flex items-center gap-2"
              >
                <OutdentIcon size={14} />
                <Text>Make Task</Text>
              </DropdownMenu.Item>
            )}

            {/* Edit Task */}
            <DropdownMenu.Item
              className="flex items-center gap-2"
              onClick={() => task?.id && handleDrawerOpen(task.id)}
            >
              <Edit3 size={14} />
              <Text>Edit</Text>
            </DropdownMenu.Item>

            {/* Duplicate Task */}
            {onDuplicateTask && (
              <DropdownMenu.Item
                onClick={onDuplicateTask}
                className="flex items-center gap-2"
              >
                <Copy size={14} />
                <Text>Duplicate</Text>
              </DropdownMenu.Item>
            )}

            {/* Copy Task */}
            {mode === "existing-task" && task && (
              <DropdownMenu.Item
                onClick={handleCopyTask}
                className="flex items-center gap-2"
              >
                <Copy size={14} />
                <Text>Copy Task</Text>
              </DropdownMenu.Item>
            )}

            {/* Paste Task */}
            {mode === "existing-task" && onCreateTask && currentStatusId && (
              <DropdownMenu.Item
                onClick={handlePasteTask}
                disabled={!hasCopiedTask}
                className="flex items-center gap-2"
              >
                <Clipboard size={14} />
                {hasCopiedTask && copiedTask ? (
                  <Text title={`Paste "${copiedTask.originalName}"`}>
                    Paste "
                    {copiedTask.originalName.length > 20
                      ? `${copiedTask.originalName.substring(0, 20)}...`
                      : copiedTask.originalName}
                    "
                  </Text>
                ) : (
                  <Text>Paste Task</Text>
                )}
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Separator />

            {/* Delete Task */}
            {onDeleteTask && (
              <DropdownMenu.Item
                onClick={onDeleteTask}
                className="flex items-center gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 size={14} />
                <Text>Delete</Text>
              </DropdownMenu.Item>
            )}
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
