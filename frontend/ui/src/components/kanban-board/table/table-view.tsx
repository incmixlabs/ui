// components/table/table-view.tsx
import { useState, useCallback, useMemo } from "react"
import {
  Box,
  Flex,
  Button,
  IconButton,
  TextField,
  Text,
  Badge,
  DropdownMenu,
  Tooltip,
} from "@base"
import { TanstackDataTable, createEnhancedDropdownColumn, generateUniqueDropdownColor } from "../../tanstack-table"
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
  Flag,
} from "lucide-react"
import {Heading} from "@incmix/ui"
import type { TableTask, ListColumn } from "../types"
import type { TaskDataSchema } from "@incmix/utils/schema"
// import { useAIFeaturesStore } from "@incmix/store" // Commented out as not used
import { KeyboardShortcutsHelp } from "../../tanstack-table/components/KeyboardShortcutsHelp"
import { useTableView } from "../hooks/use-table-view"
import { TableRowActions } from "./table-row-actions"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import { User } from "../../tanstack-table/cell-renderers"
import { StatusColumnConfigDialog } from "./status-column-config-dialog"

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
  const [isStatusConfigOpen, setIsStatusConfigOpen] = useState(false)
  const [allowCustomStatusValues, setAllowCustomStatusValues] = useState(false)
  const [hideStatusBackgroundColor, setHideStatusBackgroundColor] = useState(false)

  // State for grouping - default to status grouping
  const [groupByField, setGroupByField] = useState<'statusLabel' | 'priorityLabel'>('statusLabel')
  
  // Initial column visibility - we'll hide the status column by default since we're grouping by status
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    status: false, // Hidden initially since we group by status by default
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
    statusLabels, // Updated from 'labels' to 'statusLabels'
    priorityLabels, // New property for priority labels
    isLoading,
    error,
    // createTask, // Commented out as not used
    updateTask,
    deleteTask,
    moveTaskToStatus,
    refetch,
    clearError,
    projectStats,
    // Status management functions
    createLabel,
    updateLabel,
    deleteLabel
  } = useTableView(projectId)
  // Handle selection changes from the table
  const handleSelectionChange = (selectedRows: TableTask[]) => {
    // For debugging - log selected tasks
    if (selectedRows.length > 0) {
      console.log('Selected tasks:', selectedRows.map(row => ({ id: row.id, name: row.name })));
    }
  };

  // Handle status column header double-click
  const handleStatusColumnDoubleClick = useCallback(() => {
    setIsStatusConfigOpen(true)
  }, [])



  // Enhanced columns with row actions using the new enhanced dropdown system
  const enhancedColumns = useMemo(() => {
    // Convert task statuses to dropdown options for status column
    const statusOptions = statusLabels.length > 0 ? statusLabels.map(status => ({
      value: status.id,
      label: status.name,
      color: status.color
    })) : [
      // Fallback options if labels are not loaded yet
      { value: "todo", label: "To Do", color: "#93c5fd" },
      { value: "in_progress", label: "In Progress", color: "#fcd34d" },
      { value: "done", label: "Done", color: "#86efac" },
    ]

    // Priority options from priorityLabels
    const priorityOptions = priorityLabels.length > 0 ? priorityLabels.map(priority => ({
      value: priority.id,
      label: priority.name,
      color: priority.color
    })) : [
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
          <div
            onDoubleClick={handleStatusColumnDoubleClick}
            style={{ cursor: 'pointer' }}
            title={`Double-click to configure status options${allowCustomStatusValues ? ' • Custom values allowed' : ' • Only predefined values'}${hideStatusBackgroundColor ? ' • Background colors hidden' : ''}`}
            className="w-full flex items-center gap-1"
          >
            Status
            {allowCustomStatusValues && (
              <span className="text-xs text-blue-600 dark:text-blue-400">*</span>
            )}
            {hideStatusBackgroundColor && (
              <span className="text-xs text-gray-600 dark:text-gray-400">(plain)</span>
            )}
          </div>
        ),
        accessorKey: "statusId",
        id: "status",
        options: statusOptions,
        displayStyle: hideStatusBackgroundColor ? 'minimal' : 'button', // Use minimal style when hideBackgroundColor is true
        enableColorPicker: true, // Your color picker feature
        showCreateButton: true, // Your create functionality
        createButtonText: "Create & Select",
        strictDropdown: !allowCustomStatusValues,
        onCreateOption: async (name: string, color?: string) => {
          const uniqueColor = color || generateUniqueDropdownColor(
            statusOptions.map(opt => opt.color).filter(Boolean) as string[]
          );
          const newStatusId = await createLabel("status", name, uniqueColor);
          refetch(); // Refresh to show the new status in all dropdowns
          return newStatusId;
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
        displayStyle: 'button', // Button style like status
        strictDropdown: true, // Only predefined priorities
        enableSorting: true,
        enableInlineEdit: true,
        // Use renderer to customize the cell appearance with a flag icon
        renderer: (value, row) => {
          const option = priorityOptions.find(opt => opt.value === value);
          if (!option) return null;
          
          return (
            <div className="flex items-center gap-1.5">
              <Flag size={14} style={{ color: option.color }} />
              <span>{option.label}</span>
            </div>
          );
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
          dateFormat: "YYYY-MM-DD"
        },
        // Custom accessor function to convert timestamp to ISO date string
        accessorFn: (row: TableTask) => {
          if (!row.startDate) return '';
          const date = new Date(row.startDate);
          if (isNaN(date.getTime())) return '';
          return date.toISOString().split('T')[0];
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
          dateFormat: "YYYY-MM-DD"
        },
        // Custom accessor function to convert timestamp to ISO date string
        accessorFn: (row: TableTask) => {
          if (!row.endDate) return '';
          const date = new Date(row.endDate);
          if (isNaN(date.getTime())) return '';
          return date.toISOString().split('T')[0];
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
          maxSelections: 10
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
        renderer: (value: any, row: TableTask) => (
          <TableRowActions
            task={row} // Pass the actual row data instead of an empty object
            taskStatuses={[
              // Include status labels
              ...statusLabels.map(label => ({
                id: label.id,
                name: label.name,
                color: label.color,
                type: "status"
              })),
              // Include priority labels
              ...priorityLabels.map(label => ({
                id: label.id,
                name: label.name,
                color: label.color,
                type: "priority"
              }))
            ]}
            onUpdateTask={async (taskId: string, updates: Partial<TableTask>) => {
              // Convert TableTask updates to TaskDataSchema updates
              const schemaUpdates: Partial<TaskDataSchema> = {};

              // Copy only properties that exist on TaskDataSchema
              if (updates.name !== undefined) schemaUpdates.name = updates.name;
              if (updates.description !== undefined) schemaUpdates.description = updates.description;
              if (updates.statusId !== undefined) schemaUpdates.statusId = updates.statusId;
              if (updates.priorityId !== undefined) schemaUpdates.priorityId = updates.priorityId;
              if (updates.completed !== undefined) schemaUpdates.completed = updates.completed;
              if (updates.endDate !== undefined) schemaUpdates.endDate = updates.endDate;
              if (updates.startDate !== undefined) schemaUpdates.startDate = updates.startDate;

              // Handle subTasks with special mapping to ensure order property
              if (updates.subTasks !== undefined) {
                schemaUpdates.subTasks = updates.subTasks.map((subTask: any, index: number) => ({
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
    ]

    return columns
  }, [statusLabels, priorityLabels, allowCustomStatusValues, handleStatusColumnDoubleClick, createLabel, refetch, updateTask, deleteTask, moveTaskToStatus, hideStatusBackgroundColor])

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(task =>
      task.name?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      // Find status label name from statusLabels using task.statusId
      statusLabels.find(s => s.id === task.statusId)?.name?.toLowerCase().includes(query) ||
      task.assignedToNames?.toLowerCase().includes(query) || false
    )
  }, [tasks, searchQuery, statusLabels])

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetch()
  }, [refetch])

  // Simplified cell edit handler - the enhanced dropdown handles creation internally
  const handleCellEdit = useCallback(async (rowData: TableTask, columnId: string, newValue: any) => {
    if (!rowData.id) {
      console.error("Task ID is missing")
      return
    }

    try {
      // Simple field mapping - the enhanced dropdown handles status creation internally
      if (columnId === 'name') {
        const trimmedValue = typeof newValue === 'string' ? newValue.trim() : String(newValue).trim();
        if (!trimmedValue) {
          console.warn('Title cannot be empty');
          return; // Don't save empty titles
        }
        await updateTask(rowData.id, { name: trimmedValue });
      } else if (columnId === 'status' || columnId === 'statusId') {
        // Enhanced dropdown handles creation, we just need to move the task
        await moveTaskToStatus(rowData.id, newValue);
      } else if (columnId === 'priority' || columnId === 'priorityId') {
        await updateTask(rowData.id, { priorityId: newValue });
      } else if (columnId === 'startDate' || columnId === 'endDate') {
        // Handle date conversion
        if (typeof newValue === 'string' && newValue.trim()) {
          let dateValue: Date;
          if (newValue.includes('T')) {
            dateValue = new Date(newValue);
          } else {
            dateValue = new Date(newValue + 'T00:00:00');
          }
          if (!isNaN(dateValue.getTime())) {
            await updateTask(rowData.id, { [columnId]: dateValue.getTime() });
          }
        } else {
          await updateTask(rowData.id, { [columnId]: undefined });
        }
      } else if (columnId === 'assignedTo') {
        if (Array.isArray(newValue)) {
          const assignedUsers = newValue.map(user => ({
            id: user.id,
            name: user.name,
            avatar: user.image,
            email: user.email
          }));
          await updateTask(rowData.id, { assignedTo: assignedUsers });
        }
      } else {
        // Generic field update
        await updateTask(rowData.id, { [columnId]: newValue });
      }
    } catch (error) {
      console.error(`Failed to update ${columnId}:`, error);
    }
  }, [updateTask, moveTaskToStatus])



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
    const targetLabels = groupByField === 'statusLabel'
      ? statusLabels // Status labels for status grouping
      : priorityLabels; // Priority labels for priority grouping

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
  }, [statusLabels, priorityLabels, groupByField]);

  // Toggle between grouping by status or priority and update column visibility accordingly
  const toggleGrouping = useCallback(() => {
    setGroupByField(prev => {
      const newGroupByField = prev === 'statusLabel' ? 'priorityLabel' : 'statusLabel';
      
      // Update column visibility based on new grouping field
      setColumnVisibility(currentVisibility => ({
        ...currentVisibility,
        // Hide the column we're grouping by and show the other one
        status: newGroupByField !== 'statusLabel', // Hide status column when grouping by status
        priority: newGroupByField !== 'priorityLabel' // Hide priority column when grouping by priority
      }));
      
      return newGroupByField;
    });
  }, []);

  // Table facets for filtering
  const tableFacets = useMemo(() => [
    {
      column: "statusId",
      title: "Status",
      options: statusLabels.map(status => ({
        label: status.name,
        value: status.id,
        color: status.color
      }))
    },
    {
      column: "priorityId",
      title: "Priority",
      options: priorityLabels.map(priority => ({
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
  ], [statusLabels, priorityLabels])

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
                  {enhancedColumns.map((column) => {
                    // Disable toggling for the column we're currently grouping by
                    const isGroupedColumn = 
                      (groupByField === 'statusLabel' && column.id === 'status') || 
                      (groupByField === 'priorityLabel' && column.id === 'priority');
                      
                    return (
                      <DropdownMenu.Item 
                        key={column.id}
                        onClick={() => {
                          // Don't allow changing visibility of grouped column
                          if (isGroupedColumn) return;
                          
                          // Make sure column.id is a string to avoid TypeScript errors
                          const columnId = String(column.id);
                          setColumnVisibility(prev => ({
                            ...prev,
                            [columnId]: !prev[columnId]
                          }));
                        }}
                      >
                        <Flex align="center" gap="2">
                          <div className="mr-2 h-4 w-4">
                            {columnVisibility[String(column.id)] && !isGroupedColumn && (
                              <Check size={16} className="h-4 w-4" />
                            )}
                          </div>
                          <Text>
                            {column.headingName}
                            {isGroupedColumn && (
                              <span className="ml-2 text-xs text-gray-500">(grouped)</span>
                            )}
                          </Text>
                        </Flex>
                      </DropdownMenu.Item>
                    );
                  })}
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
          key={`table-${hideStatusBackgroundColor ? 'plain' : 'colored'}`}
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
          inlineEditableColumns={["name", "status", "priority", "startDate", "endDate", "assignedTo"]} // Include all editable columns for keyboard navigation
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

      {/* Status Column Configuration Dialog */}
      <StatusColumnConfigDialog
        isOpen={isStatusConfigOpen}
        onClose={() => setIsStatusConfigOpen(false)}
        statusLabels={statusLabels as unknown as ListColumn[]}
        tasks={filteredTasks}
        onCreateStatus={async (name: string, color?: string, description?: string) => {
          return await createLabel("status", name, color, description)
        }}
        onUpdateStatus={async (id: string, updates: { name?: string; color?: string; description?: string }) => {
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
