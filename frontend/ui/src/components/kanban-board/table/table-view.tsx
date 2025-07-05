// components/table/table-view.tsx
import React, { useState, useCallback, useMemo } from "react"
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  TextField,
  Text,
  Badge,
  DropdownMenu,
  Tooltip,
} from "@base"
import { TanstackDataTable } from "../../tanstack-table"
import {
  Plus,
  Search,
  RefreshCw,
  Settings,
  MoreVertical,
  Download,
  ChevronDown,
  Check,
  HelpCircle as HelpCircleIcon
} from "lucide-react"

import type { TableTask } from "../types"
import type { LabelSchema, TaskDataSchema } from "@incmix/utils/schema"
import { useAIFeaturesStore } from "@incmix/store"
import { KeyboardShortcutsHelp } from "../../tanstack-table/components/KeyboardShortcutsHelp"
import { useTableView } from "../hooks/use-table-view"
import { TASK_TABLE_COLUMNS } from "./table-columns-config"
import { TableRowActions } from "./table-row-actions"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import { CreateTaskDialog } from "./create-task-dialog"
import { DataTableColumn } from "@/components/tanstack-table/types"
import { StatusDropdownCell, PriorityDropdownCell, createEnhancedTaskTableColumns } from "./custom-dropdown-columns"

interface TableViewProps {
  projectId?: string
}

export function TableView({ projectId = "default-project" }: TableViewProps) {
  // Get AI features state
  const { useAI } = useAIFeaturesStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false)

  // Use the table view hook
  const {
    tasks,
    labels,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTaskToStatus,
    refetch,
    clearError,
    projectStats
  } = useTableView(projectId)

  // Enhanced columns with row actions
  const enhancedColumns = useMemo((): DataTableColumn<TableTask>[] => {
    // Convert task statuses to dropdown options for status column
    const statusOptions = (labels as unknown as LabelSchema[]).map(status => ({
      value: status.id,
      label: status.name,
      color: status.color
    }))

    // Convert our column config to DataTable format with explicit mapping
    const columns: DataTableColumn<TableTask>[] = TASK_TABLE_COLUMNS.map(column => {
      // Create a base column with required properties
      const baseColumn: DataTableColumn<TableTask> = {
        headingName: column.headingName,
        type: column.type,
        accessorKey: column.accessorKey as string,
        id: column.id,
        renderer: column.renderer
      }

      // Apply optional properties based on the column type
      // We need to use type assertion to handle each column type properly
      switch(column.id) {
        case "name":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = true;
          break;
        case "status":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = true;
          break;
        case "priority":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = true;
          break;
        case "startDate":
        case "endDate":
        case "createdAt":
          baseColumn.enableSorting = true;
          if (column.id !== "createdAt") {
            baseColumn.enableInlineEdit = true;
          }
          break;
      }

      // For columns that need dropdown options (like status), we'll handle this with cell properties
      if (column.id === "status") {
        // For status column, we use our custom StatusDropdownCell component
        baseColumn.cell = (info) => {
          const task = info.row.original as TableTask;
          return (
            <StatusDropdownCell
              value={task.statusId || ''}
              row={task}
              taskStatuses={(labels as unknown as LabelSchema[]).filter(status => status.type === "status")}
              onStatusChange={(taskId, newStatusId) => moveTaskToStatus(taskId, newStatusId)}
            />
          );
        };

        // Disable inline editing since we're handling it via the dropdown component
        baseColumn.enableInlineEdit = false;
      }

      // For priority column, use our custom PriorityDropdownCell component
      if (column.id === "priority") {
        baseColumn.cell = (info) => {
          const task = info.row.original as TableTask;
          return (
            <PriorityDropdownCell
              value={task.priorityId || ''}
              row={task}
              onPriorityChange={(taskId, newPriorityId) => {
                return updateTask(taskId, { priorityId: newPriorityId });
              }}
            />
          );
        };

        // Disable inline editing since we're handling it via the dropdown component
        baseColumn.enableInlineEdit = false;
      }

      return baseColumn
    })

    // Add the actions column
    const actionsColumn: DataTableColumn<TableTask> = {
      headingName: "Actions",
      type: "String",
      accessorKey: "id", // Use a valid accessor key
      id: "actions",
      enableSorting: false,
      enableInlineEdit: false,
      renderer: (value: any, row: TableTask) => (
        <TableRowActions
          task={row}
          taskStatuses={labels as unknown as LabelSchema[]}
          onUpdateTask={async (taskId, updates) => {
            // Convert TableTask updates to TaskDataSchema updates
            const schemaUpdates: Partial<TaskDataSchema> = {};
            
            // Copy only properties that exist on TaskDataSchema
            // Handle known properties specially
            if (updates.name !== undefined) schemaUpdates.name = updates.name;
            if (updates.description !== undefined) schemaUpdates.description = updates.description;
            if (updates.statusId !== undefined) schemaUpdates.statusId = updates.statusId;
            if (updates.priorityId !== undefined) schemaUpdates.priorityId = updates.priorityId;
            if (updates.completed !== undefined) schemaUpdates.completed = updates.completed;
            if (updates.endDate !== undefined) schemaUpdates.endDate = updates.endDate;
            if (updates.startDate !== undefined) schemaUpdates.startDate = updates.startDate;
            
            // Handle subTasks with special mapping to ensure order property
            if (updates.subTasks !== undefined) {
              schemaUpdates.subTasks = updates.subTasks.map((subTask, index) => ({
                id: subTask.id || '',
                name: subTask.name,
                completed: subTask.completed,
                order: index // Use index as order if not provided
              }));
            }
            
            if (updates.assignedTo !== undefined) schemaUpdates.assignedTo = updates.assignedTo;
            if (updates.labelsTags !== undefined) schemaUpdates.labelsTags = updates.labelsTags;
            if (updates.attachments !== undefined) schemaUpdates.attachments = updates.attachments;
            
            return updateTask(taskId, schemaUpdates);
          }}
          onDeleteTask={deleteTask}
          onMoveTaskToStatus={moveTaskToStatus}
        />
      )
    }

    return [...columns, actionsColumn]
  }, [labels, updateTask, deleteTask, moveTaskToStatus])

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(task =>
      task.name?.toLowerCase().includes(query) || 
      task.description?.toLowerCase().includes(query) ||
      // Find status label name from labels using task.statusId
      (labels as unknown as LabelSchema[]).find(s => s.id === task.statusId)?.name?.toLowerCase().includes(query) ||
      task.assignedToNames?.toLowerCase().includes(query) || false
    )
  }, [tasks, searchQuery, labels])

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetch()
  }, [refetch])

  // Handle cell edit
  const handleCellEdit = useCallback(async (rowData: TableTask, columnId: string, newValue: any) => {
    if (!rowData.id) {
      console.error("Task ID is missing")
      return
    }

    try {
      // Special handling for status changes
      if (columnId === "status") {
        // Validate that the status exists
        const validStatus = (labels as unknown as LabelSchema[]).some(label =>
          label.type === "status" && label.id === newValue
        );
        if (!validStatus) {
          console.error(`Invalid status ID: ${newValue}`);
          return;
        }
        // Use rowData.id for consistency with other operations
        await moveTaskToStatus(rowData.id, newValue)
      } else {
        // Map column IDs to task properties
        const fieldMap: Record<string, string> = {
          name: "name",
          description: "description",
          priority: "priorityId",
          startDate: "startDate",
          endDate: "endDate"
        }

        const field = fieldMap[columnId] || columnId
        await updateTask(rowData.id, { [field]: newValue })
      }
    } catch (error) {
      console.error(`Failed to update ${columnId}:`, error)
    }
  }, [updateTask, moveTaskToStatus])

  // Table facets for filtering
  const tableFacets = useMemo(() => [
    {
      column: "statusId",
      title: "Status",
      options: (labels as unknown as LabelSchema[])
        .filter(status => status.type === "status")
        .map(status => ({
          label: status.name,
          value: status.id,
          color: status.color
        }))
    },
    {
      column: "priorityId",
      title: "Priority",
      options: (labels as unknown as LabelSchema[])
        .filter(status => status.type === "priority")
        .map(priority => ({
          label: priority.name,
          value: priority.id,
          color: priority.color
        }))
    },
    {
      column: "completed",
      title: "Completion",
      options: [
        { label: "Completed", value: true },
        { label: "Pending", value: false }
      ]
    }
  ], [labels])

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <div>Loading tasks...</div>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center h-64">
        <Flex direction="column" align="center" gap="4">
          <div className="text-red-500">Error: {error}</div>
          <Button onClick={() => { clearError(); refetch(); }} variant="outline">
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <>
      {/* Header */}
      <Box className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Flex direction="column" gap="4" className="p-4">
          <Flex justify="between" align="center">
            <Heading size="6">Task Table</Heading>

            <Flex align="center" gap="2">
              <Tooltip content="Refresh">
                <IconButton variant="ghost" onClick={handleRefresh}>
                  <RefreshCw size={16} />
                </IconButton>
              </Tooltip>
              
              {/* Keyboard shortcuts help */}
              <div>
                <Tooltip content="Keyboard Shortcuts">
                  <div>
                    <KeyboardShortcutsHelp />
                  </div>
                </Tooltip>
              </div>
              
              {/* Column visibility dropdown */}
              <DropdownMenu.Root open={isColumnsMenuOpen} onOpenChange={setIsColumnsMenuOpen}>
                <DropdownMenu.Trigger>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Columns
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  {enhancedColumns.map((column) => (
                    <DropdownMenu.Item key={column.id}>
                      <Flex align="center" gap="2">
                        <div className="mr-2 h-4 w-4">
                          <Check size={16} className="h-4 w-4" />
                        </div>
                        <Text>{column.headingName}</Text>
                      </Flex>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              <DropdownMenu.Root open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost">
                    <MoreVertical size={16} />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <Flex align="center" gap="2">
                      <Download size={16} />
                      <Text>Download</Text>
                    </Flex>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Flex align="center" gap="2">
                      <Settings size={16} />
                      <Text>Settings</Text>
                    </Flex>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
          </Flex>

          {/* Search and Stats */}
          <Flex justify="between" align="center" gap="4">
            <Box className="flex-1 relative max-w-md">
              <Search size={20} className="absolute top-3 left-3 text-gray-400" />
              <TextField.Root
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="pl-10 h-12"
              />
            </Box>

            <Flex gap="6" className="text-sm text-gray-600 dark:text-gray-400">
              <span>{projectStats.totalTasks} tasks</span>
              <span>{projectStats.completedTasks} completed</span>
              <span>{projectStats.totalLabels} labels</span>
              {projectStats.overdueTasks > 0 && (
                <Badge color="red" variant="soft">
                  {projectStats.overdueTasks} overdue
                </Badge>
              )}
              {projectStats.urgentTasks > 0 && (
                <Badge color="orange" variant="soft">
                  {projectStats.urgentTasks} urgent
                </Badge>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box className="flex-1 p-4">
        <TanstackDataTable
          columns={enhancedColumns}
          data={filteredTasks}
          enableRowSelection={true}
          enableSorting={true}
          enablePagination={true}
          enableColumnVisibility={false} /* Hide column visibility dropdown */
          enableFiltering={false} /* Hide filter input field */
          facets={tableFacets}
          isPaginationLoading={isLoading}

          // Inline editing functionality - disabled to hide keyboard shortcuts icon
          enableInlineCellEdit={false}
          // Still provide columns and handler in case inline editing is needed elsewhere
          inlineEditableColumns={["name", "startDate", "endDate"]} // Status and priority handled by custom components
          onCellEdit={handleCellEdit}

          // Additional table settings
          pageSize={50}
          className="mt-4"
        />

        {filteredTasks.length === 0 && searchQuery && (
          <Box className="text-center py-12">
            <Text className="text-gray-500">No tasks found matching "{searchQuery}"</Text>
          </Box>
        )}

        {tasks.length === 0 && !searchQuery && (
          <Flex direction="column" align="center" className="py-12 space-y-4">
            <Text className="text-gray-500">No tasks found. Use the Board or List view to add tasks.</Text>
          </Flex>
        )}
      </Box>

      {/* Task Detail Drawer */}
      <TaskCardDrawer viewType="list" projectId={projectId} />
    </>
  )
}
