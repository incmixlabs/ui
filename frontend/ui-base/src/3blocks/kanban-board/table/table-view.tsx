import { Box, Button, DropdownMenu, Flex, Text, Tooltip } from "@/base"
import { generateUniqueDropdownColor } from "@incmix/store/color"
import type { TaskDataSchema } from "@incmix/utils/schema"
import {
  Check,
  ChevronDown,
  Flag,
  Layers as LayersIcon,
  LayoutGrid as LayoutGridIcon,
  RefreshCw,
} from "lucide-react"
// components/table/table-view.tsx
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  TanstackDataTable,
  createEnhancedDropdownColumn,
} from "../../tanstack-table"
import type { User } from "../../tanstack-table/cell-renderers"
// import { useAIFeaturesStore } from "@incmix/store" // Commented out as not used
import { KeyboardShortcutsHelp } from "../../tanstack-table/components/KeyboardShortcutsHelp"
import { useTableView } from "../hooks/use-table-view"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import { TaskViewHeader } from "../shared/task-view-header"
import type { ListColumn, TableTask } from "../types"
import { exportAllTasksToCSV } from "../utils/csv-export"
import { StatusColumnConfigDialog } from "./status-column-config-dialog"
import { TableRowActions } from "./table-row-actions"

// Sample users for task assignment (in a real app, this would come from a user store/API)
const SAMPLE_USERS: User[] = [
  {
    id: "user1",
    name: "John Smith",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "john.smith@example.com",
  },
  {
    id: "user2",
    name: "Jane Cooper",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "jane.cooper@example.com",
  },
  {
    id: "user3",
    name: "Alicia Keys",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    email: "alicia.keys@example.com",
  },
  {
    id: "user4",
    name: "Michael Jordan",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "michael.jordan@example.com",
  },
]

interface TableViewProps {
  projectId?: string

  // Optional override props for Storybook/testing
  mockData?: {
    tasks: TableTask[]
    statusLabels: Array<{
      id: string
      name: string
      color: string
    }>
    priorityLabels: Array<{
      id: string
      name: string
      color: string
    }>
    projectStats: {
      totalTasks: number
      completedTasks: number
      totalLabels: number
      overdueTasks: number
      urgentTasks: number
    }
  }
  mockOperations?: {
    onUpdateTask?: (id: string, updates: Partial<TableTask>) => Promise<void>
    onDeleteTask?: (id: string) => Promise<void>
    onMoveTaskToStatus?: (taskId: string, statusId: string) => Promise<void>
    onCreateLabel?: (
      type: string,
      name: string,
      color?: string,
      description?: string
    ) => Promise<string>
    onUpdateLabel?: (
      id: string,
      updates: { name?: string; color?: string; description?: string }
    ) => Promise<void>
    onDeleteLabel?: (id: string) => Promise<void>
    onRefetch?: () => void
  }
}

export function TableView({
  projectId = "default-project",
  mockData,
  mockOperations,
}: TableViewProps) {
  // Get AI features state - commented out as not used
  // const { useAI } = useAIFeaturesStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [_isMoreMenuOpen, _setIsMoreMenuOpen] = useState(false)
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false)
  const [isStatusConfigOpen, setIsStatusConfigOpen] = useState(false)
  const [allowCustomStatusValues, setAllowCustomStatusValues] = useState(false)
  const [hideStatusBackgroundColor, setHideStatusBackgroundColor] =
    useState(false)

  // State for grouping - default to status grouping
  const [groupByField, setGroupByField] = useState<
    "statusLabel" | "priorityLabel"
  >("statusLabel")

  // Initial column visibility - we'll hide the status column by default since we're grouping by status
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    name: true,
    status: false, // Hidden initially since we group by status by default
    priority: true,
    startDate: true,
    endDate: true,
    assignedTo: true,
    createdAt: false,
    actions: true,
  })

  // State for mock data operations
  const [mockTasks, setMockTasks] = useState<TableTask[]>([])
  const [mockStatusLabels, setMockStatusLabels] = useState<
    Array<{ id: string; name: string; color: string }>
  >([])
  const [mockPriorityLabels, setMockPriorityLabels] = useState<
    Array<{ id: string; name: string; color: string }>
  >([])
  const [mockError, setMockError] = useState<string | null>(null)

  // Use the table view hook only when not using mock data
  const hookData = useTableView(mockData ? undefined : projectId)

  // Determine data source - mock data takes precedence
  const tasks = mockData ? mockTasks : hookData.tasks
  const statusLabels = mockData ? mockStatusLabels : hookData.statusLabels
  const priorityLabels = mockData ? mockPriorityLabels : hookData.priorityLabels
  const isLoading = mockData ? false : hookData.isLoading
  const error = mockData ? mockError : hookData.error
  const projectStats = mockData ? mockData.projectStats : hookData.projectStats

  // Initialize mock data when provided
  useEffect(() => {
    if (mockData) {
      setMockTasks(mockData.tasks || [])
      setMockStatusLabels(mockData.statusLabels || [])
      setMockPriorityLabels(mockData.priorityLabels || [])
    }
  }, [mockData])

  // Mock operations - in-memory CRUD operations
  const updateTask = mockData
    ? async (id: string, updates: Partial<TaskDataSchema>) => {
        try {
          if (mockOperations?.onUpdateTask) {
            // Convert TaskDataSchema updates to TableTask updates for mock operations
            const tableTaskUpdates: Partial<TableTask> = {}

            if (updates.name !== undefined) tableTaskUpdates.name = updates.name
            if (updates.description !== undefined)
              tableTaskUpdates.description = updates.description
            if (updates.statusId !== undefined)
              tableTaskUpdates.statusId = updates.statusId
            if (updates.priorityId !== undefined)
              tableTaskUpdates.priorityId = updates.priorityId
            if (updates.completed !== undefined)
              tableTaskUpdates.completed = updates.completed
            if (updates.endDate !== undefined)
              tableTaskUpdates.endDate = updates.endDate
            if (updates.startDate !== undefined)
              tableTaskUpdates.startDate = updates.startDate
            if (updates.assignedTo !== undefined)
              tableTaskUpdates.assignedTo = updates.assignedTo
            if (updates.labelsTags !== undefined)
              tableTaskUpdates.labelsTags = updates.labelsTags
            if (updates.attachments !== undefined)
              tableTaskUpdates.attachments = updates.attachments

            await mockOperations.onUpdateTask(id, tableTaskUpdates)
          }

          setMockTasks((prev) =>
            prev.map((task) =>
              task.id === id
                ? { ...task, ...updates, updatedAt: Date.now() }
                : task
            )
          )
        } catch (error) {
          console.error("Mock update task error:", error)
          setMockError(
            error instanceof Error ? error.message : "Failed to update task"
          )
        }
      }
    : hookData.updateTask

  const deleteTask = mockData
    ? async (id: string) => {
        try {
          if (mockOperations?.onDeleteTask) {
            await mockOperations.onDeleteTask(id)
          }

          setMockTasks((prev) => prev.filter((task) => task.id !== id))
        } catch (error) {
          console.error("Mock delete task error:", error)
          setMockError(
            error instanceof Error ? error.message : "Failed to delete task"
          )
        }
      }
    : hookData.deleteTask

  const moveTaskToStatus = mockData
    ? async (taskId: string, statusId: string) => {
        try {
          if (mockOperations?.onMoveTaskToStatus) {
            await mockOperations.onMoveTaskToStatus(taskId, statusId)
          }

          setMockTasks((prev) =>
            prev.map((task) =>
              task.id === taskId
                ? { ...task, statusId, updatedAt: Date.now() }
                : task
            )
          )
        } catch (error) {
          console.error("Mock move task error:", error)
          setMockError(
            error instanceof Error ? error.message : "Failed to move task"
          )
        }
      }
    : hookData.moveTaskToStatus

  const createLabel = mockData
    ? async (
        type: string,
        name: string,
        color?: string,
        description?: string
      ) => {
        try {
          if (mockOperations?.onCreateLabel) {
            return await mockOperations.onCreateLabel(
              type,
              name,
              color,
              description
            )
          }

          const newLabel = {
            id: `temp-${Date.now()}-${Math.random()}`,
            name,
            color: color || "#93c5fd",
          }

          if (type === "status") {
            setMockStatusLabels((prev) => [...prev, newLabel])
          } else if (type === "priority") {
            setMockPriorityLabels((prev) => [...prev, newLabel])
          }

          return newLabel.id
        } catch (error) {
          console.error("Mock create label error:", error)
          setMockError(
            error instanceof Error ? error.message : "Failed to create label"
          )
          throw error
        }
      }
    : hookData.createLabel

  const updateLabel = mockData
    ? async (
        id: string,
        updates: { name?: string; color?: string; description?: string }
      ) => {
        try {
          if (mockOperations?.onUpdateLabel) {
            await mockOperations.onUpdateLabel(id, updates)
          }

          setMockStatusLabels((prev) =>
            prev.map((label) =>
              label.id === id ? { ...label, ...updates } : label
            )
          )
          setMockPriorityLabels((prev) =>
            prev.map((label) =>
              label.id === id ? { ...label, ...updates } : label
            )
          )
        } catch (error) {
          console.error("Mock update label error:", error)
          setMockError(
            error instanceof Error ? error.message : "Failed to update label"
          )
        }
      }
    : hookData.updateLabel

  const deleteLabel = mockData
    ? async (id: string) => {
        try {
          if (mockOperations?.onDeleteLabel) {
            await mockOperations.onDeleteLabel(id)
          }

          setMockStatusLabels((prev) => prev.filter((label) => label.id !== id))
          setMockPriorityLabels((prev) =>
            prev.filter((label) => label.id !== id)
          )
        } catch (error) {
          console.error("Mock delete label error:", error)
          setMockError(
            error instanceof Error ? error.message : "Failed to delete label"
          )
        }
      }
    : hookData.deleteLabel

  const refetch = mockData
    ? mockOperations?.onRefetch || (() => {})
    : hookData.refetch

  const clearError = mockData ? () => setMockError(null) : hookData.clearError
  // Handle selection changes from the table
  const handleSelectionChange = (selectedRows: TableTask[]) => {
    // For debugging - log selected tasks
    if (selectedRows.length > 0) {
      console.log(
        "Selected tasks:",
        selectedRows.map((row) => ({ id: row.id, name: row.name }))
      )
    }
  }

  // Handle status column header double-click
  const handleStatusColumnDoubleClick = useCallback(() => {
    setIsStatusConfigOpen(true)
  }, [])

  // Enhanced columns with row actions using the new enhanced dropdown system
  const enhancedColumns = useMemo(() => {
    // Convert task statuses to dropdown options for status column
    const statusOptions =
      statusLabels.length > 0
        ? statusLabels.map((status) => ({
            value: status.id,
            label: status.name,
            color: status.color,
          }))
        : [
            // Fallback options if labels are not loaded yet
            { value: "todo", label: "To Do", color: "#93c5fd" },
            { value: "in_progress", label: "In Progress", color: "#fcd34d" },
            { value: "done", label: "Done", color: "#86efac" },
          ]

    // Priority options from priorityLabels
    const priorityOptions =
      priorityLabels.length > 0
        ? priorityLabels.map((priority) => ({
            value: priority.id,
            label: priority.name,
            color: priority.color,
          }))
        : [
            // Fallback options if priority labels are not loaded yet
            { value: "low", label: "Low", color: "#6b7280" },
            { value: "medium", label: "Medium", color: "#3b82f6" },
            { value: "high", label: "High", color: "#f59e0b" },
            { value: "urgent", label: "Urgent", color: "#ef4444" },
          ]

    const columns = [
      // Task Name Column
      {
        headingName: "Task",
        type: "String" as const,
        accessorKey: "name" as const,
        id: "name",
        enableSorting: true,
        enableInlineEdit: true,
      },

      // Enhanced Status Column - replaces your custom StatusDropdownCell
      createEnhancedDropdownColumn<TableTask>({
        headingName: (
          <Box
            onDoubleClick={handleStatusColumnDoubleClick}
            style={{ cursor: "pointer" }}
            title={`Double-click to configure status options${allowCustomStatusValues ? " • Custom values allowed" : " • Only predefined values"}${hideStatusBackgroundColor ? " • Background colors hidden" : ""}`}
            className="flex w-full items-center gap-1"
          >
            Status
            {allowCustomStatusValues && (
              <span className="text-blue-600 text-xs dark:text-blue-400">
                *
              </span>
            )}
            {hideStatusBackgroundColor && (
              <span className="text-gray-600 text-xs dark:text-gray-400">
                (plain)
              </span>
            )}
          </Box>
        ),
        accessorKey: "statusId",
        id: "status",
        options: statusOptions,
        displayStyle: hideStatusBackgroundColor ? "minimal" : "button", // Use minimal style when hideBackgroundColor is true
        enableColorPicker: true, // Your color picker feature
        showCreateButton: true, // Your create functionality
        createButtonText: "Create & Select",
        strictDropdown: !allowCustomStatusValues,
        onCreateOption: async (name: string, color?: string) => {
          const uniqueColor =
            color ||
            generateUniqueDropdownColor(
              statusOptions.map((opt) => opt.color).filter(Boolean) as string[]
            )
          const newStatusId = await createLabel("status", name, uniqueColor)
          refetch() // Refresh to show the new status in all dropdowns
          return newStatusId
        },
        enableSorting: true,
        enableInlineEdit: true,
      }),

      // Enhanced Priority Column - replaces your custom PriorityDropdownCell
      createEnhancedDropdownColumn<TableTask>({
        headingName: "Priority",
        accessorKey: "priorityId",
        id: "priority",
        options: priorityOptions,
        displayStyle: "button", // Button style like status
        strictDropdown: true, // Only predefined priorities
        enableSorting: true,
        enableInlineEdit: true,
        // Use renderer to customize the cell appearance with a flag icon
        renderer: (value, _row) => {
          const option = priorityOptions.find((opt) => opt.value === value)
          if (!option) return null

          return (
            <Box className="flex items-center gap-1.5">
              <Flag size={14} style={{ color: option.color }} />
              <span>{option.label}</span>
            </Box>
          )
        },
      }),

      // Start Date Column
      {
        headingName: "Start Date",
        type: "Date" as const,
        accessorKey: "startDate" as const,
        id: "startDate",
        enableSorting: true,
        enableInlineEdit: true,
        format: {
          dateFormat: "YYYY-MM-DD",
        },
        // Custom accessor function to convert timestamp to ISO date string
        accessorFn: (row: TableTask) => {
          if (!row.startDate) return ""
          const date = new Date(row.startDate)
          if (Number.isNaN(date.getTime())) return ""
          return date.toISOString().split("T")[0]
        },
      },

      // End Date Column
      {
        headingName: "Due Date",
        type: "Date" as const,
        accessorKey: "endDate" as const,
        id: "endDate",
        enableSorting: true,
        enableInlineEdit: true,
        format: {
          dateFormat: "YYYY-MM-DD",
        },
        // Custom accessor function to convert timestamp to ISO date string
        accessorFn: (row: TableTask) => {
          if (!row.endDate) return ""
          const date = new Date(row.endDate)
          if (Number.isNaN(date.getTime())) return ""
          return date.toISOString().split("T")[0]
        },
      },

      // Assigned To Column
      {
        headingName: "Assigned To",
        type: "People" as const,
        accessorKey: "assignedTo" as const,
        id: "assignedTo",
        enableSorting: false,
        enableInlineEdit: true,
        meta: {
          availableUsers: SAMPLE_USERS,
          maxDisplay: 3,
          maxSelections: 10,
        },
        // Ensure we access the assignedTo array directly
        accessorFn: (row: TableTask) => row.assignedTo || [],
      },

      // Created At Column
      {
        headingName: "Created",
        type: "Date" as const,
        accessorKey: "createdAt" as const,
        id: "createdAt",
        enableSorting: true,
        enableInlineEdit: false,
      },

      // Actions Column
      {
        headingName: "Actions",
        type: "String" as const,
        accessorKey: "id" as const,
        id: "actions",
        enableSorting: false,
        enableInlineEdit: false,
        renderer: (_value: any, row: TableTask) => (
          <TableRowActions
            task={row} // Pass the actual row data instead of an empty object
            taskStatuses={[
              // Include status labels
              ...statusLabels.map((label) => ({
                id: label.id,
                name: label.name,
                color: label.color || "#6b7280", // Fallback to gray if color is undefined
                type: "status",
              })),
              // Include priority labels
              ...priorityLabels.map((label) => ({
                id: label.id,
                name: label.name,
                color: label.color || "#6b7280", // Fallback to gray if color is undefined
                type: "priority",
              })),
            ]}
            onUpdateTask={async (
              taskId: string,
              updates: Partial<TableTask>
            ) => {
              // Convert TableTask updates to TaskDataSchema updates
              const schemaUpdates: Partial<TaskDataSchema> = {}

              // Copy only properties that exist on TaskDataSchema
              if (updates.name !== undefined) schemaUpdates.name = updates.name
              if (updates.description !== undefined)
                schemaUpdates.description = updates.description
              if (updates.statusId !== undefined)
                schemaUpdates.statusId = updates.statusId
              if (updates.priorityId !== undefined)
                schemaUpdates.priorityId = updates.priorityId
              if (updates.completed !== undefined)
                schemaUpdates.completed = updates.completed
              if (updates.endDate !== undefined)
                schemaUpdates.endDate = updates.endDate
              if (updates.startDate !== undefined)
                schemaUpdates.startDate = updates.startDate

              // Handle subTasks with special mapping to ensure order property
              if (updates.subTasks !== undefined) {
                schemaUpdates.subTasks = updates.subTasks.map(
                  (subTask: any, index: number) => ({
                    id: subTask.id || "",
                    name: subTask.name,
                    completed: subTask.completed,
                    order: index, // Use index as order if not provided
                  })
                )
              }

              if (updates.assignedTo !== undefined)
                schemaUpdates.assignedTo = updates.assignedTo
              if (updates.labelsTags !== undefined)
                schemaUpdates.labelsTags = updates.labelsTags
              if (updates.attachments !== undefined)
                schemaUpdates.attachments = updates.attachments

              return updateTask(taskId, schemaUpdates)
            }}
            onDeleteTask={deleteTask}
            onMoveTaskToStatus={moveTaskToStatus}
          />
        ),
      },
    ]

    return columns
  }, [
    statusLabels,
    priorityLabels,
    allowCustomStatusValues,
    handleStatusColumnDoubleClick,
    createLabel,
    refetch,
    updateTask,
    deleteTask,
    moveTaskToStatus,
    hideStatusBackgroundColor,
  ])

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(
      (task) =>
        task.name?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        // Find status label name from statusLabels using task.statusId
        statusLabels
          .find((s) => s.id === task.statusId)
          ?.name?.toLowerCase()
          .includes(query) ||
        task.assignedToNames?.toLowerCase().includes(query) ||
        false
    )
  }, [tasks, searchQuery, statusLabels])

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetch()
  }, [refetch])

  // CSV export handler for all tasks
  const handleExportAllCSV = useCallback(() => {
    try {
      // Convert filtered table tasks to column format for CSV export
      const columnsForExport = statusLabels.map((status) => {
        const statusTasks = filteredTasks.filter(
          (task) => task.statusId === status.id
        )

        return {
          id: status.id,
          name: status.name,
          projectId: projectId,
          color: status.color || "#6B7280",
          order: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: { id: "system", name: "System" },
          updatedBy: { id: "system", name: "System" },
          taskCount: statusTasks.length,
          completedTasksCount: statusTasks.filter((task) => task.completed)
            .length,
          totalTasksCount: statusTasks.length,
          progressPercentage:
            statusTasks.length > 0
              ? (statusTasks.filter((task) => task.completed).length /
                  statusTasks.length) *
                100
              : 0,
          tasks: statusTasks,
        }
      })

      // Convert priorityLabels to LabelSchema format
      const priorityLabelsForExport = priorityLabels.map((priority) => ({
        id: priority.id,
        name: priority.name,
        type: "priority" as const,
        color: priority.color,
      }))

      exportAllTasksToCSV(columnsForExport as any, priorityLabelsForExport, {
        includeSubtasks: true,
        includeMetadata: true,
        includeTimestamps: true,
      })
    } catch (error) {
      console.error("Failed to export CSV:", error)
    }
  }, [filteredTasks, statusLabels, priorityLabels, projectId])

  // Simplified cell edit handler - the enhanced dropdown handles creation internally
  const handleCellEdit = useCallback(
    async (rowData: TableTask, columnId: string, newValue: any) => {
      if (!rowData.id) {
        console.error("Task ID is missing")
        return
      }

      try {
        // Simple field mapping - the enhanced dropdown handles status creation internally
        if (columnId === "name") {
          const trimmedValue =
            typeof newValue === "string"
              ? newValue.trim()
              : String(newValue).trim()
          if (!trimmedValue) {
            console.warn("Title cannot be empty")
            return // Don't save empty titles
          }
          await updateTask(rowData.id, { name: trimmedValue })
        } else if (columnId === "status" || columnId === "statusId") {
          // Enhanced dropdown handles creation, we just need to move the task
          await moveTaskToStatus(rowData.id, newValue)
        } else if (columnId === "priority" || columnId === "priorityId") {
          await updateTask(rowData.id, { priorityId: newValue })
        } else if (columnId === "startDate" || columnId === "endDate") {
          // Handle date conversion
          if (typeof newValue === "string" && newValue.trim()) {
            let dateValue: Date
            if (newValue.includes("T")) {
              dateValue = new Date(newValue)
            } else {
              dateValue = new Date(`${newValue}T00:00:00`)
            }
            if (!Number.isNaN(dateValue.getTime())) {
              await updateTask(rowData.id, { [columnId]: dateValue.getTime() })
            }
          } else {
            await updateTask(rowData.id, { [columnId]: undefined })
          }
        } else if (columnId === "assignedTo") {
          if (Array.isArray(newValue)) {
            const assignedUsers = newValue.map((user) => ({
              id: user.id,
              name: user.name,
              avatar: user.image,
              email: user.email,
            }))
            await updateTask(rowData.id, { assignedTo: assignedUsers })
          }
        } else {
          // Generic field update
          await updateTask(rowData.id, { [columnId]: newValue })
        }
      } catch (error) {
        console.error(`Failed to update ${columnId}:`, error)
      }
    },
    [updateTask, moveTaskToStatus]
  )

  // Helper function to convert hex to rgba for group header colors
  const hexToRgba = (hex: string, alpha = 0.3) => {
    // Handle case where hex might not be valid
    if (
      !hex ||
      typeof hex !== "string" ||
      !hex.startsWith("#") ||
      hex.length !== 7
    ) {
      return `rgba(128, 128, 128, ${alpha})` // Default gray if invalid color
    }

    try {
      const r = Number.parseInt(hex.slice(1, 3), 16)
      const g = Number.parseInt(hex.slice(3, 5), 16)
      const b = Number.parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    } catch (_e) {
      console.error("Invalid color format:", hex)
      return `rgba(128, 128, 128, ${alpha})` // Default gray on error
    }
  }

  // Create dynamic color mapping for group headers based on the currently selected grouping type
  const categoryMapping = useMemo(() => {
    const mapping: Record<
      string,
      {
        color: string // Text/accent color
        backgroundColor: string // Background color
      }
    > = {}

    // Add the colors for each label of the selected type
    const targetLabels =
      groupByField === "statusLabel"
        ? statusLabels // Status labels for status grouping
        : priorityLabels // Priority labels for priority grouping

    targetLabels.forEach((label) => {
      // For dark mode support, we use the original color for text and a semi-transparent version for background
      const originalColor = label.color || "#6b7280" // Fallback to gray if color is undefined
      const bgColor = hexToRgba(originalColor, 0.3) // Using 0.3 alpha for better visibility (70% transparent)

      // Map by name for the UI display, which is what the grouping shows
      mapping[label.name] = {
        color: originalColor,
        backgroundColor: bgColor,
      }
    })

    return mapping
  }, [statusLabels, priorityLabels, groupByField])

  // Toggle between grouping by status or priority and update column visibility accordingly
  const toggleGrouping = useCallback(() => {
    setGroupByField((prev) => {
      const newGroupByField =
        prev === "statusLabel" ? "priorityLabel" : "statusLabel"

      // Update column visibility based on new grouping field
      setColumnVisibility((currentVisibility) => ({
        ...currentVisibility,
        // Hide the column we're grouping by and show the other one
        status: newGroupByField !== "statusLabel", // Hide status column when grouping by status
        priority: newGroupByField !== "priorityLabel", // Hide priority column when grouping by priority
      }))

      return newGroupByField
    })
  }, [])

  // Table facets for filtering
  const tableFacets = useMemo(
    () => [
      {
        column: "statusId",
        title: "Status",
        options: statusLabels.map((status) => ({
          label: status.name,
          value: status.id,
          color: status.color || "#6b7280",
        })),
      },
      {
        column: "priorityId",
        title: "Priority",
        options: priorityLabels.map((priority) => ({
          label: priority.name,
          value: priority.id,
          color: priority.color || "#6b7280",
        })),
      },
      {
        column: "completed",
        title: "Completion",
        options: [
          { label: "Completed", value: true },
          { label: "Pending", value: false },
        ],
      },
    ],
    [statusLabels, priorityLabels]
  )

  if (isLoading) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <Box>Loading tasks...</Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <Flex direction="column" align="center" gap="4">
          <Box className="text-red-500">Error: {error}</Box>
          <Button
            onClick={() => {
              clearError()
              refetch()
            }}
            variant="outline"
          >
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <>
      {/* Header: Using reusable task view header */}
      <TaskViewHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search tasks..."
        stats={{
          totalTasks: projectStats.totalTasks,
          completedTasks: projectStats.completedTasks,
          totalStatusLabels: projectStats.totalLabels,
          overdueTasks: projectStats.overdueTasks,
          urgentTasks: projectStats.urgentTasks,
        }}
        onRefresh={handleRefresh}
        showExportCSV={true}
        onExportCSV={handleExportAllCSV}
        leftActions={
          <Button
            variant="outline"
            onClick={toggleGrouping}
            className="flex items-center gap-1"
            size="2"
          >
            {groupByField === "statusLabel" ? (
              <>
                <LayoutGridIcon size={14} />
                <span>Switch to Priority</span>
              </>
            ) : (
              <>
                <LayersIcon size={14} />
                <span>Switch to Status</span>
              </>
            )}
          </Button>
        }
        rightActions={
          <>
            {/* Keyboard shortcuts help */}
            <Box>
              <Tooltip content="Keyboard Shortcuts">
                <Box>
                  <KeyboardShortcutsHelp />
                </Box>
              </Tooltip>
            </Box>

            {/* Column visibility dropdown */}
            <DropdownMenu.Root
              open={isColumnsMenuOpen}
              onOpenChange={setIsColumnsMenuOpen}
            >
              <DropdownMenu.Trigger>
                <Button variant="ghost" className="flex items-center gap-1">
                  Columns
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {enhancedColumns.map((column) => {
                  // Disable toggling for the column we're currently grouping by
                  const isGroupedColumn =
                    (groupByField === "statusLabel" &&
                      column.id === "status") ||
                    (groupByField === "priorityLabel" &&
                      column.id === "priority")

                  return (
                    <DropdownMenu.Item
                      key={column.id}
                      onClick={() => {
                        // Don't allow changing visibility of grouped column
                        if (isGroupedColumn) return

                        // Make sure column.id is a string to avoid TypeScript errors
                        const columnId = String(column.id)
                        setColumnVisibility((prev) => ({
                          ...prev,
                          [columnId]: !prev[columnId],
                        }))
                      }}
                    >
                      <Flex align="center" gap="2">
                        <Box className="mr-2 h-4 w-4">
                          {columnVisibility[String(column.id)] &&
                            !isGroupedColumn && (
                              <Check size={16} className="h-4 w-4" />
                            )}
                        </Box>
                        <Text>
                          {column.headingName}
                          {isGroupedColumn && (
                            <span className="ml-2 text-gray-500 text-xs">
                              (grouped)
                            </span>
                          )}
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                  )
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        }
        isLoading={isLoading}
      />

      {/* Main Content */}
      <Box className=" px-4">
        <TanstackDataTable
          key={`table-${hideStatusBackgroundColor ? "plain" : "colored"}`}
          columns={enhancedColumns}
          data={filteredTasks}
          enableRowSelection={true}
          enableSorting={true}
          enablePagination={true}
          enableColumnVisibility={
            false
          } /* Disabled internal column visibility dropdown */
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          enableFiltering={false} /* Hide filter input field */
          facets={tableFacets}
          isPaginationLoading={isLoading}
          hideMainHeader={true} // Hide the main header to show column headers only within groups
          // Inline editing functionality - ENABLED for full editing capabilities
          enableInlineCellEdit={true}
          // Define which columns support inline editing
          inlineEditableColumns={[
            "name",
            "status",
            "priority",
            "startDate",
            "endDate",
            "assignedTo",
          ]} // Include all editable columns for keyboard navigation
          onCellEdit={handleCellEdit}
          // Track selection changes
          onSelectionChange={handleSelectionChange}
          // Row grouping configuration with dynamic color mapping
          enableRowGrouping={true}
          rowGrouping={{
            groupByColumn: groupByField,
            initiallyCollapsed: false,
            toggleOnClick: true,
            categoryMapping,
            // Group header rendering configuration handled by DataTable internally
            // with our categoryMapping colors
          }}
          // Additional configuration

          // Additional table settings
          pageSize={50}
          className="mt-4"
        />

        {filteredTasks.length === 0 && searchQuery && (
          <Box className="py-12 text-center">
            <Text className="text-gray-500">
              No tasks found matching "{searchQuery}"
            </Text>
          </Box>
        )}

        {tasks.length === 0 && !searchQuery && (
          <Flex direction="column" align="center" className="space-y-4 py-12">
            <Text className="text-gray-500">
              No tasks found. Use the Board or List view to add tasks.
            </Text>
          </Flex>
        )}
      </Box>

      {/* Status Column Configuration Dialog */}
      <StatusColumnConfigDialog
        isOpen={isStatusConfigOpen}
        onClose={() => setIsStatusConfigOpen(false)}
        statusLabels={statusLabels as unknown as ListColumn[]}
        tasks={filteredTasks}
        onCreateStatus={async (
          name: string,
          color?: string,
          description?: string
        ) => {
          return await createLabel("status", name, color, description)
        }}
        onUpdateStatus={async (
          id: string,
          updates: { name?: string; color?: string; description?: string }
        ) => {
          await updateLabel(id, updates)
        }}
        onDeleteStatus={async (id: string) => {
          await deleteLabel(id)
        }}
        onRefresh={refetch}
        allowCustomValues={allowCustomStatusValues}
        onAllowCustomValuesChange={setAllowCustomStatusValues}
        hideBackgroundColor={hideStatusBackgroundColor}
        onHideBackgroundColorChange={setHideStatusBackgroundColor}
      />

      {/* Task Detail Drawer */}
      <TaskCardDrawer viewType="list" projectId={projectId} />
    </>
  )
}
