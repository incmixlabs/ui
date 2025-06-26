// components/table/table-columns-config.tsx
import React from "react"
import { Badge, Avatar, Flex, Checkbox, Text } from "@incmix/ui"
import { CalendarDays, Clock, AlertCircle, Flag } from "lucide-react"
import { TableTask } from "../types"

// Priority configuration
export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "#6b7280", icon: Clock },
  { value: "medium", label: "Medium", color: "#3b82f6", icon: Clock },
  { value: "high", label: "High", color: "#f59e0b", icon: Flag },
  { value: "urgent", label: "Urgent", color: "#ef4444", icon: AlertCircle },
]

// Helper function to get priority info
export const getPriorityInfo = (priority: string) => {
  return PRIORITY_OPTIONS.find(p => p.value === priority) || PRIORITY_OPTIONS[1] // default to medium
}

// Helper function to format date
export const formatDate = (dateString: string | undefined): { text: string; className: string } => {
  if (!dateString) return { text: "", className: "text-gray-400" }
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  const formatted = date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
  })
  
  if (diffDays < 0) return { text: formatted, className: "text-red-600" }
  if (diffDays === 0) return { text: "Today", className: "text-orange-600" }
  if (diffDays <= 3) return { text: formatted, className: "text-yellow-600" }
  return { text: formatted, className: "text-gray-600" }
}

// Custom cell renderers
export const TaskNameCell: React.FC<{ value: string; row: TableTask }> = ({ value, row }) => (
  <Flex align="center" gap="3" className="min-w-0">
    <Checkbox
      checked={row.completed}
      size="1"
      className="flex-shrink-0"
    />
    <div className="min-w-0 flex-1">
      <Text 
        size="2" 
        weight="medium" 
        className={`truncate max-w-[200px] ${row.completed ? "line-through text-gray-500" : ""}`}
        title={value} // Show full title on hover
      >
        {value}
      </Text>
      {(row.totalSubTasks || 0) > 0 && (
        <Text size="1" className="text-gray-500">
          {row.completedSubTasks || 0}/{row.totalSubTasks || 0} subtasks
        </Text>
      )}
    </div>
  </Flex>
)

export const StatusCell: React.FC<{ value: string; row: TableTask }> = ({ value, row }) => (
  <Badge
    variant="soft"
    style={{
      backgroundColor: `${row.statusColor}20`,
      color: row.statusColor,
      borderColor: `${row.statusColor}40`
    }}
  >
    {row.statusLabel}
  </Badge>
)

export const PriorityCell: React.FC<{ value: string }> = ({ value }) => {
  const priorityInfo = getPriorityInfo(value)
  const Icon = priorityInfo.icon
  
  return (
    <Flex align="center" gap="2">
      <Icon size={14} style={{ color: priorityInfo.color }} />
      <Text size="2" style={{ color: priorityInfo.color }}>
        {priorityInfo.label}
      </Text>
    </Flex>
  )
}

export const DateCell: React.FC<{ value: string | undefined; isOverdue?: boolean }> = ({ 
  value, 
  isOverdue = false 
}) => {
  const dateInfo = formatDate(value)
  
  if (!dateInfo.text) {
    return <Text size="2" className="text-gray-400">-</Text>
  }
  
  return (
    <Flex align="center" gap="2">
      <CalendarDays size={14} className={dateInfo.className} />
      <Text size="2" className={dateInfo.className}>
        {dateInfo.text}
      </Text>
      {isOverdue && <Badge color="red" size="1">Overdue</Badge>}
    </Flex>
  )
}

export const AssignedToCell: React.FC<{ value: TableTask['assignedTo'] }> = ({ value }) => {
  if (!value || value.length === 0) {
    return <Text size="2" className="text-gray-400">Unassigned</Text>
  }

  return (
    <Flex align="center" gap="1">
      <div className="flex -space-x-1">
        {value.slice(0, 3).map((user, index) => (
          <Avatar
            key={user.id}
            src={user.avatar}
            name={user.name}
            className="w-6 h-6 border border-white"
            style={{ zIndex: 3 - index }}
          />
        ))}
        {value.length > 3 && (
          <div className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs font-medium">
            +{value.length - 3}
          </div>
        )}
      </div>
      {value.length <= 2 && (
        <Text size="1" className="text-gray-600 ml-2">
          {value.map(u => u.name).join(", ")}
        </Text>
      )}
    </Flex>
  )
}

export const DescriptionCell: React.FC<{ value: string | undefined }> = ({ value }) => {
  if (!value) return <Text size="2" className="text-gray-400">No description</Text>
  
  return (
    <Text size="2" className="text-gray-600 line-clamp-2 max-w-xs">
      {value}
    </Text>
  )
}

// Table column definitions
export const TASK_TABLE_COLUMNS = [
  {
    headingName: "Task",
    type: "String" as const,
    accessorKey: "name" as const,
    id: "name",
    enableSorting: true,
    enableInlineEdit: true,
    renderer: (value: string, row: TableTask) => <TaskNameCell value={value} row={row} />
  },
  {
    headingName: "Status",
    type: "Dropdown" as const,
    accessorKey: "columnId" as const,
    id: "status",
    enableSorting: true,
    enableInlineEdit: true,
    renderer: (value: string, row: TableTask) => <StatusCell value={value} row={row} />
  },
  {
    headingName: "Priority",
    type: "Dropdown" as const,
    accessorKey: "priority" as const,
    id: "priority",
    enableSorting: true,
    enableInlineEdit: true,
    meta: {
      dropdownOptions: PRIORITY_OPTIONS,
      strictDropdown: true
    },
    renderer: (value: string) => <PriorityCell value={value} />
  },
  {
    headingName: "Start Date",
    type: "Date" as const,
    accessorKey: "startDate" as const,
    id: "startDate",
    enableSorting: true,
    enableInlineEdit: true,
    renderer: (value: string | undefined) => <DateCell value={value} />
  },
  {
    headingName: "Due Date",
    type: "Date" as const,
    accessorKey: "endDate" as const,
    id: "endDate",
    enableSorting: true,
    enableInlineEdit: true,
    renderer: (value: string | undefined, row: TableTask) => <DateCell value={value} isOverdue={row.isOverdue} />
  },
  {
    headingName: "Assigned To",
    type: "String" as const,
    accessorKey: "assignedToNames" as const,
    id: "assignedTo",
    renderer: (value: string | undefined, row: TableTask) => <AssignedToCell value={row.assignedTo} />
  },
  {
    headingName: "Created",
    type: "Date" as const,
    accessorKey: "createdAt" as const,
    id: "createdAt",
    enableSorting: true,
    renderer: (value: number) => <DateCell value={new Date(value).toISOString()} />
  }
] as const