import { Avatar, Badge, Checkbox, Flex, Text } from "@/base"
import { AlertCircle, CalendarDays, Clock, Flag } from "lucide-react"
// components/table/table-columns-config.tsx
import type React from "react"
import type { TableTask } from "../types"

// Priority configuration
export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "#6b7280", icon: Clock },
  { value: "medium", label: "Medium", color: "#3b82f6", icon: Clock },
  { value: "high", label: "High", color: "#f59e0b", icon: Flag },
  { value: "urgent", label: "Urgent", color: "#ef4444", icon: AlertCircle },
]

// Helper function to get priority info
export const getPriorityInfo = (priority: string) => {
  return (
    PRIORITY_OPTIONS.find((p) => p.value === priority) || PRIORITY_OPTIONS[1]
  ) // default to medium
}

// Helper function to format date
export const formatDate = (
  dateString: string | undefined
): { text: string; className: string } => {
  if (!dateString) return { text: "", className: "text-gray-400" }

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  })

  if (diffDays < 0) return { text: formatted, className: "text-red-600" }
  if (diffDays === 0) return { text: "Today", className: "text-orange-600" }
  if (diffDays <= 3) return { text: formatted, className: "text-yellow-600" }
  return { text: formatted, className: "text-gray-600" }
}

// Custom cell renderers
export const TaskNameCell: React.FC<{ value: string; row: TableTask }> = ({
  value,
  row,
}) => (
  <Flex align="center" gap="3" className="min-w-0">
    <div className="min-w-0 flex-1">
      <Text
        size="2"
        weight="medium"
        className={`max-w-[200px] truncate ${row.completed ? "text-gray-500 line-through" : ""}`}
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

export const StatusCell: React.FC<{ value: string; row: TableTask }> = ({
  row,
}) => (
  <Badge
    variant="soft"
    style={{
      backgroundColor: `${row.statusColor}20`,
      color: row.statusColor,
      borderColor: `${row.statusColor}40`,
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

export const DateCell: React.FC<{
  value: string | undefined
  isOverdue?: boolean
}> = ({ value, isOverdue = false }) => {
  const dateInfo = formatDate(value)

  if (!dateInfo.text) {
    return (
      <Text size="2" className="text-gray-400">
        -
      </Text>
    )
  }

  return (
    <Flex align="center" gap="2">
      <CalendarDays size={14} className={dateInfo.className} />
      <Text size="2" className={dateInfo.className}>
        {dateInfo.text}
      </Text>
      {isOverdue && (
        <Badge color="red" size="1">
          Overdue
        </Badge>
      )}
    </Flex>
  )
}

export const AssignedToCell: React.FC<{ value: TableTask["assignedTo"] }> = ({
  value,
}) => {
  if (!value || value.length === 0) {
    return (
      <Text size="2" className="text-gray-400 dark:text-gray-500">
        Unassigned
      </Text>
    )
  }

  // Get color for user based on user ID - consistent coloring
  const getColorForUser = (userId: string) => {
    const colors = [
      "bg-blue-9",
      "bg-amber-9",
      "bg-green-9",
      "bg-purple-9",
      "bg-pink-9",
      "bg-orange-9",
    ]

    const hash = userId.split("").reduce((acc, char) => {
      return (acc << 5) - acc + char.charCodeAt(0)
    }, 0)

    return colors[Math.abs(hash) % colors.length]
  }

  // Generate initials from name
  const getInitials = (name: string): string => {
    if (!name) return ""
    const nameParts = name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <Flex align="center" gap="1">
      <div className="-space-x-2 flex">
        {value.slice(0, 3).map((user, index) => (
          <div
            key={user.id}
            className="h-7 w-7 overflow-hidden rounded-full border-2 border-white dark:border-background"
            style={{ zIndex: 30 - index }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`h-full w-full rounded-full ${getColorForUser(user.id)} flex items-center justify-center`}
              >
                <span className="font-medium text-[10px] text-white">
                  {getInitials(user.name)}
                </span>
              </div>
            )}
          </div>
        ))}
        {value.length > 3 && (
          <div
            className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-9 dark:border-background"
            style={{ zIndex: 30 - 3 }}
          >
            <span className="font-medium text-[10px] text-white">
              +{value.length - 3}
            </span>
          </div>
        )}

        {/* Add the "+" button just like in the second screenshot */}
        <div
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-3 hover:bg-gray-4 dark:border-background dark:bg-gray-5 dark:hover:bg-gray-6"
          style={{
            zIndex: 30 - value.slice(0, 3).length - (value.length > 3 ? 1 : 0),
          }}
        >
          <span className="font-medium text-[10px] text-gray-11">+</span>
        </div>
      </div>

      {value.length <= 2 && (
        <Text size="1" className="ml-2 text-gray-600 dark:text-gray-400">
          {value.map((u) => u.name).join(", ")}
        </Text>
      )}
    </Flex>
  )
}

export const DescriptionCell: React.FC<{ value: string | undefined }> = ({
  value,
}) => {
  if (!value)
    return (
      <Text size="2" className="text-gray-400">
        No description
      </Text>
    )

  return (
    <Text size="2" className="line-clamp-2 max-w-xs text-gray-600">
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
    renderer: (value: string, row: TableTask) => (
      <TaskNameCell value={value} row={row} />
    ),
  },
  {
    headingName: "Status",
    type: "Dropdown" as const,
    accessorKey: "columnId" as const,
    id: "status",
    enableSorting: true,
    enableInlineEdit: true,
    renderer: (value: string, row: TableTask) => (
      <StatusCell value={value} row={row} />
    ),
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
      strictDropdown: true,
    },
    renderer: (value: string) => <PriorityCell value={value} />,
  },
  {
    headingName: "Start Date",
    type: "Date" as const,
    accessorKey: "startDate" as const,
    id: "startDate",
    enableSorting: true,
    enableInlineEdit: true,
    renderer: (value: string | undefined) => <DateCell value={value} />,
  },
  {
    headingName: "Due Date",
    type: "Date" as const,
    accessorKey: "endDate" as const,
    id: "endDate",
    enableSorting: true,
    enableInlineEdit: true,
    renderer: (value: string | undefined, row: TableTask) => (
      <DateCell value={value} isOverdue={row.isOverdue} />
    ),
  },
  {
    headingName: "Assigned To",
    type: "String" as const,
    accessorKey: "assignedToNames" as const,
    id: "assignedTo",
    renderer: (_value: string | undefined, row: TableTask) => (
      <AssignedToCell value={row.assignedTo} />
    ),
  },
  {
    headingName: "Created",
    type: "Date" as const,
    accessorKey: "createdAt" as const,
    id: "createdAt",
    enableSorting: true,
    renderer: (value: number) => (
      <DateCell value={new Date(value).toISOString()} />
    ),
  },
] as const
