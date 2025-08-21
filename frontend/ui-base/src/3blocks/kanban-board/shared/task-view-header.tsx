// components/shared/task-view-header.tsx - Reusable header for all task views

import {
  Badge,
  Box,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
  TextField,
  Tooltip,
} from "@/base"
import { Heading } from "@/base"
import { useProjectStore } from "@incmix/store"
import {
  Download,
  MoreVertical,
  RefreshCw,
  Search,
  Settings,
} from "lucide-react"
import { type ReactNode, useCallback, useState } from "react"

export interface TaskViewHeaderProps {
  // Search functionality
  searchQuery: string
  onSearchChange: (query: string) => void
  searchPlaceholder?: string

  // Project statistics
  stats: {
    totalStatusLabels?: number
    totalTasks: number
    completedTasks: number
    overdueTasks?: number
    urgentTasks?: number
    totalLabels?: number // For table view
  }

  // Actions
  onRefresh: () => void
  onExportCSV?: () => void
  showExportCSV?: boolean

  // View-specific content
  leftActions?: ReactNode // For view-specific buttons/actions on the left
  rightActions?: ReactNode // For view-specific buttons/actions on the right

  // Selected tasks (for bulk operations like in list view)
  selectedTasksCount?: number
  selectedTasksActions?: ReactNode
  onClearSelection?: () => void

  // Additional stats row (for table view)
  additionalStatsContent?: ReactNode

  // Custom heading override (defaults to project name)
  customHeading?: string

  // Loading states
  isLoading?: boolean
}

export function TaskViewHeader({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search tasks...",
  stats,
  onRefresh,
  onExportCSV,
  showExportCSV = false,
  leftActions,
  rightActions,
  selectedTasksCount = 0,
  selectedTasksActions,
  onClearSelection,
  additionalStatsContent,
  customHeading,
  isLoading = false,
}: TaskViewHeaderProps) {
  const { selectedProject } = useProjectStore()

  // Determine the heading text
  const headingText = customHeading || selectedProject?.name || "Project Tasks"

  // Handle refresh
  const handleRefresh = useCallback(() => {
    onRefresh()
  }, [onRefresh])

  return (
    <Box className="flex-shrink-0 border-gray-4 border-b bg-gray-1 dark:border-gray-5 dark:bg-gray-2">
      <Flex direction="column" gap="4" className="p-4">
        {/* Main header row */}
        <Flex justify="between" align="center">
          <Flex align="center" gap="4">
            <Heading
              size="5"
              className="font-semibold text-gray-12 dark:text-gray-11"
            >
              {headingText}
            </Heading>
            {leftActions}
          </Flex>

          <Flex align="center" gap="2">
            {/* Selected Tasks Actions */}
            {selectedTasksCount > 0 && (
              <>
                <Flex align="center" gap="2" className="mr-2">
                  <Badge
                    variant="solid"
                    color="blue"
                    size="1"
                    className="px-2 py-0.5"
                  >
                    {selectedTasksCount}
                  </Badge>
                  <Text size="2" className="font-medium text-blue-11">
                    {selectedTasksCount === 1 ? "task" : "tasks"} selected
                  </Text>
                </Flex>

                {selectedTasksActions}

                {onClearSelection && (
                  <Button
                    variant="outline"
                    color="gray"
                    size="2"
                    className="shadow-sm transition-all duration-150 hover:bg-gray-3 hover:shadow-md"
                    onClick={onClearSelection}
                  >
                    Clear
                  </Button>
                )}
              </>
            )}

            {/* View-specific right actions */}
            {rightActions}

            {/* Common actions */}
            {showExportCSV && onExportCSV && (
              <Tooltip content="Export to CSV">
                <Button
                  variant="outline"
                  size="2"
                  className="flex items-center gap-1 shadow-sm transition-all duration-150 hover:shadow-md"
                  onClick={onExportCSV}
                  disabled={isLoading || stats.totalTasks === 0}
                  aria-label="Export tasks to CSV"
                >
                  <Download size={14} />
                  Export CSV
                </Button>
              </Tooltip>
            )}

            <Tooltip content="Refresh">
              <IconButton
                variant="soft"
                size="1"
                className="transition-all duration-150 hover:shadow-sm"
                onClick={handleRefresh}
                disabled={isLoading}
                aria-label="Refresh"
              >
                <RefreshCw
                  size={14}
                  className={isLoading ? "animate-spin" : ""}
                />
              </IconButton>
            </Tooltip>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger aria-label="More options">
                <IconButton
                  variant="soft"
                  size="1"
                  className="transition-all duration-150 hover:shadow-sm"
                >
                  <MoreVertical size={14} />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Group>
                  <DropdownMenu.Item onClick={handleRefresh}>
                    <Flex align="center" gap="2">
                      <RefreshCw size={14} className="text-gray-11" />
                      <Text size="2">Refresh</Text>
                    </Flex>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Flex align="center" gap="2">
                      <Settings size={14} className="text-gray-11" />
                      <Text size="2">Settings</Text>
                    </Flex>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Flex>

        {/* Search and Stats row */}
        <Flex justify="between" align="center" gap="4">
          <Box className="relative max-w-md flex-1">
            <Search
              size={16}
              className="absolute top-2.5 left-3 text-gray-9"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 w-full rounded-md border border-gray-6 bg-gray-1 px-3 py-2 pl-9 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-5"
              aria-label="Search tasks"
            />
          </Box>

          {/* Stats display */}
          <Flex gap="6" className="text-gray-10">
            {stats.totalStatusLabels !== undefined && (
              <Text size="1">
                {stats.totalStatusLabels} column
                {stats.totalStatusLabels !== 1 ? "s" : ""}
              </Text>
            )}
            {stats.totalLabels !== undefined && (
              <Text size="1">{stats.totalLabels} labels</Text>
            )}
            <Text size="1">
              {stats.totalTasks} task{stats.totalTasks !== 1 ? "s" : ""}
            </Text>
            <Text size="1">{stats.completedTasks} completed</Text>
            {stats.overdueTasks !== undefined && stats.overdueTasks > 0 && (
              <Text size="1" className="text-red-9">
                {stats.overdueTasks} overdue
              </Text>
            )}
            {stats.urgentTasks !== undefined && stats.urgentTasks > 0 && (
              <Text size="1" className="text-orange-9">
                {stats.urgentTasks} urgent
              </Text>
            )}
          </Flex>
        </Flex>

        {/* Additional stats content (for table view badges) */}
        {additionalStatsContent && (
          <Flex justify="end" align="center">
            {additionalStatsContent}
          </Flex>
        )}
      </Flex>
    </Box>
  )
}
