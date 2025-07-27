// components/table/table-view.tsx
import { useState, useCallback, useMemo } from "react"
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
import { TanstackDataTable } from "../../tanstack-table/components/DataTable"
import {
  Search,
  Layers as LayersIcon,
  LayoutGrid as LayoutGridIcon,
  RefreshCw,
  Settings,
  MoreVertical,
  Download,
  ChevronDown,
  Check,
} from "lucide-react"

import type { TableTask } from "../types"
import type { LabelSchema, TaskDataSchema } from "@incmix/utils/schema"
// import { useAIFeaturesStore } from "@incmix/store" // Commented out as not used
import { KeyboardShortcutsHelp } from "../../tanstack-table/components/KeyboardShortcutsHelp"
import { useTableView } from "../hooks/use-table-view"
import { TASK_TABLE_COLUMNS } from "./table-columns-config"
import { TableRowActions } from "./table-row-actions"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import { DataTableColumn } from "@/components/tanstack-table/types"
import { StatusDropdownCell, PriorityDropdownCell } from "./custom-dropdown-columns"
import { User } from "../../tanstack-table/cell-renderers"

// Sample users for task assignment (in a real app, this would come from a user store/API)
const SAMPLE_USERS: User[] = [
  {
    id: "user1",
    name: "John Smith",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "john.smith@example.com"
  },
  {
    id: "user2",
    name: "Jane Cooper",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "jane.cooper@example.com"
  },
  {
    id: "user3",
    name: "Alicia Keys",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    email: "alicia.keys@example.com"
  },
  {
    id: "user4",
    name: "Michael Jordan",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "michael.jordan@example.com"
  }
];

interface TableViewProps {
  projectId?: string
}

export function TableView({ projectId = "default-project" }: TableViewProps) {
  // Get AI features state - commented out as not used
  // const { useAI } = useAIFeaturesStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false)

  // State for grouping - default to status grouping
  const [groupByField, setGroupByField] = useState<'statusLabel' | 'priorityLabel'>('statusLabel')
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    status: true,
    priority: true,
    startDate: true,
    endDate: true,
    assignedTo: true,
    createdAt: false,
    actions: true
  })

  // Use the table view hook
  const {
    tasks,
    labels,
    isLoading,
    error,
    // createTask, // Commented out as not used
    updateTask,
    deleteTask,
    moveTaskToStatus,
    refetch,
    clearError,
    projectStats
  } = useTableView(projectId)
  // Handle selection changes from the table
  const handleSelectionChange = (selectedRows: TableTask[]) => {
    // For debugging - log selected tasks
    if (selectedRows.length > 0) {
      console.log('Selected tasks:', selectedRows.map(row => ({ id: row.id, name: row.name })));
    }
  };

  // Enhanced columns with row actions
  const enhancedColumns = useMemo((): DataTableColumn<TableTask>[] => {
    // Convert task statuses to dropdown options for status column
    const statusOptions = (labels as unknown as LabelSchema[])
      .filter(label => label.type === "status")
      .map(status => ({
        value: status.id,
        label: status.name,
        color: status.color
      }))

    // Convert priority labels to dropdown options
    const priorityOptions = (labels as unknown as LabelSchema[])
      .filter(label => label.type === "priority")
      .map(priority => ({
        value: priority.id,
        label: priority.name,
        color: priority.color
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
      switch (column.id) {
        case "name":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = true;
          baseColumn.type = "String";
          break;
        case "status":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = false; // Handled by custom dropdown
          baseColumn.type = "Dropdown";
          baseColumn.meta = {
            dropdownOptions: statusOptions,
            strictDropdown: true
          };
          break;
        case "priority":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = false; // Handled by custom dropdown
          baseColumn.type = "Dropdown";
          baseColumn.meta = {
            dropdownOptions: priorityOptions,
            strictDropdown: true
          };
          break;
        case "startDate":
        case "endDate":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = true;
          baseColumn.type = "Date";
          baseColumn.format = {
            dateFormat: "YYYY-MM-DD"
          };
          // Custom accessor function to convert timestamp to ISO date string for EditableDateCell
          baseColumn.accessorFn = (row: TableTask) => {
            const dateValue = column.id === "startDate" ? row.startDate : row.endDate;
            if (!dateValue) return '';
            
            // Convert timestamp to YYYY-MM-DD format for date input
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) return '';
            
            // Return in YYYY-MM-DD format (what HTML date input expects)
            return date.toISOString().split('T')[0];
          };
          break;
        case "assignedTo":
          baseColumn.enableSorting = false;
          baseColumn.enableInlineEdit = true;
          baseColumn.type = "People";
          baseColumn.accessorKey = "assignedTo"; // Use the User[] array directly
          baseColumn.meta = {
            availableUsers: SAMPLE_USERS,
            maxDisplay: 3,
            maxSelections: 10
          };
          // Ensure we access the assignedTo array directly
          baseColumn.accessorFn = (row: TableTask) => row.assignedTo || [];
          break;
        case "createdAt":
          baseColumn.enableSorting = true;
          baseColumn.enableInlineEdit = false;
          baseColumn.type = "Date";
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
      renderer: () => (
        <TableRowActions
          task={{} as TableTask} // This will be properly populated by the table
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

  // Handle cell edit - enhanced to support all data types
  const handleCellEdit = useCallback(async (rowData: TableTask, columnId: string, newValue: any) => {
    if (!rowData.id) {
      console.error("Task ID is missing")
      return
    }



    try {
      // Validation for title field - prevent empty titles
      if (columnId === 'name') {
        const trimmedValue = typeof newValue === 'string' ? newValue.trim() : String(newValue).trim();
        if (!trimmedValue) {
          console.warn('Title cannot be empty');
          return; // Don't save empty titles
        }
        await updateTask(rowData.id, { name: trimmedValue });
        return;
      }

      // Handle date fields - convert date strings back to timestamps
      if (columnId === 'startDate' || columnId === 'endDate') {
        if (typeof newValue === 'string' && newValue.trim()) {
          // Handle both YYYY-MM-DD format (from date input) and ISO format
          let dateValue: Date;
          
          if (newValue.includes('T')) {
            // ISO format: 2024-01-15T00:00:00.000Z
            dateValue = new Date(newValue);
          } else {
            // YYYY-MM-DD format: 2024-01-15
            // Create date at midnight in local timezone to avoid timezone issues
            dateValue = new Date(newValue + 'T00:00:00');
          }
          
          if (!isNaN(dateValue.getTime())) {
            const timestamp = dateValue.getTime();
            await updateTask(rowData.id, { [columnId]: timestamp });
          } else {
            console.warn('Invalid date value:', newValue);
            return;
          }
        } else if (newValue === '' || newValue === null || newValue === undefined) {
          // Handle clearing the date
          await updateTask(rowData.id, { [columnId]: undefined });
        }
        return;
      }

      // Handle assigned users - newValue should be User[] from PeopleCellEditor
      if (columnId === 'assignedTo') {
        if (Array.isArray(newValue)) {
          // newValue is User[] from EditablePeopleCell
          // Convert User[] to the format expected by updateTask
          const assignedUsers = newValue.map(user => ({
            id: user.id,
            name: user.name,
            avatar: user.image, // Map image to avatar for compatibility
            email: user.email
          }));
          await updateTask(rowData.id, { assignedTo: assignedUsers });
        } else {
          console.warn('Invalid assignedTo value - expected array:', newValue);
        }
        return;
      }

      // Special handling for status changes (though this should be handled by custom dropdown)
      if (columnId === "status") {
        const validStatus = (labels as unknown as LabelSchema[]).some(label =>
          label.type === "status" && label.id === newValue
        );
        if (!validStatus) {
          console.error(`Invalid status ID: ${newValue}`);
          return;
        }
        await moveTaskToStatus(rowData.id, newValue);
        return;
      }

      // Special handling for priority changes (though this should be handled by custom dropdown)
      if (columnId === "priority") {
        const validPriority = (labels as unknown as LabelSchema[]).some(label =>
          label.type === "priority" && label.id === newValue
        );
        if (!validPriority) {
          console.error(`Invalid priority ID: ${newValue}`);
          return;
        }
        await updateTask(rowData.id, { priorityId: newValue });
        return;
      }

      // Default handling for other fields
      const fieldMap: Record<string, string> = {
        description: "description",
      };

      const field = fieldMap[columnId] || columnId;
      await updateTask(rowData.id, { [field]: newValue });

    } catch (error) {
      console.error(`Failed to update ${columnId}:`, error);
    }
  }, [updateTask, moveTaskToStatus, labels])



  // Helper function to convert hex to rgba for group header colors
  const hexToRgba = (hex: string, alpha: number = 0.3) => {
    // Handle case where hex might not be valid
    if (!hex || typeof hex !== 'string' || !hex.startsWith('#') || hex.length !== 7) {
      return `rgba(128, 128, 128, ${alpha})`; // Default gray if invalid color
    }

    try {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } catch (e) {
      console.error('Invalid color format:', hex);
      return `rgba(128, 128, 128, ${alpha})`; // Default gray on error
    }
  };



  // Create dynamic color mapping for group headers based on the currently selected grouping type
  const categoryMapping = useMemo(() => {
    const mapping: Record<string, {
      color: string,       // Text/accent color
      backgroundColor: string // Background color
    }> = {};

    // Add the colors for each label of the selected type
    const labelsData = labels as unknown as LabelSchema[];
    const targetLabels = labelsData.filter(label => {
      return groupByField === 'statusLabel'
        ? label.type === 'status'
        : label.type === 'priority';
    });

    targetLabels.forEach(label => {
      // For dark mode support, we use the original color for text and a semi-transparent version for background
      const originalColor = label.color;
      const bgColor = hexToRgba(originalColor, 0.3); // Using 0.3 alpha for better visibility (70% transparent)

      // Map by name for the UI display, which is what the grouping shows
      mapping[label.name] = {
        color: originalColor,
        backgroundColor: bgColor
      };
    });

    return mapping;
  }, [labels, groupByField]);

  // Toggle between grouping by status or priority
  const toggleGrouping = useCallback(() => {
    setGroupByField(prev => prev === 'statusLabel' ? 'priorityLabel' : 'statusLabel');
  }, []);

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
              {/* Grouping toggle button */}
              <Button
                variant="outline"
                onClick={toggleGrouping}
                className="flex items-center gap-1"
                size="2"
              >
                {groupByField === 'statusLabel' ? (
                  <>
                    <LayersIcon size={14} />
                    <span>Group by Status</span>
                  </>
                ) : (
                  <>
                    <LayoutGridIcon size={14} />
                    <span>Group by Priority</span>
                  </>
                )}
              </Button>
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
      <Box className=" px-4">
        <TanstackDataTable
          columns={enhancedColumns}
          data={filteredTasks}
          enableRowSelection={true}
          enableSorting={true}
          enablePagination={true}
          enableColumnVisibility={false} /* Disabled internal column visibility dropdown */
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          enableFiltering={false} /* Hide filter input field */
          facets={tableFacets}
          isPaginationLoading={isLoading}
          hideMainHeader={true} // Hide the main header to show column headers only within groups

          // Inline editing functionality - ENABLED for full editing capabilities
          enableInlineCellEdit={true}
          // Define which columns support inline editing
          inlineEditableColumns={["name", "startDate", "endDate", "assignedTo"]} // Status and priority handled by custom components
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
