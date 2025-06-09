"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import {
  Box,
  Flex,
  TextField,
  Button,
  DropdownMenu,
  Badge,
  Text,
  Select,
  Checkbox,
  Separator,
  IconButton,
} from "@base"
import {
  Search,
  Filter,
  X,
  Calendar,
  User,
  Tag,
  AlertCircle,
  Clock,
  CheckSquare,
  RotateCcw,
} from "lucide-react"
import { KanbanColumn } from "@incmix/store"

interface FilterOptions {
  search: string
  assignees: string[]
  labels: string[]
  priorities: string[]
  dueDateRange: "all" | "overdue" | "today" | "week" | "month"
  completed: "all" | "completed" | "incomplete"
  hasSubtasks: "all" | "with" | "without"
}

interface KanbanSearchFilterProps {
  columns: KanbanColumn[]
  onFilterChange: (filteredColumns: KanbanColumn[]) => void
  className?: string
}

const defaultFilters: FilterOptions = {
  search: "",
  assignees: [],
  labels: [],
  priorities: [],
  dueDateRange: "all",
  completed: "all",
  hasSubtasks: "all",
}

export function KanbanSearchFilter({
  columns,
  onFilterChange,
  className,
}: KanbanSearchFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const allTasks = columns.flatMap(col => col.tasks)
    
    const assignees = Array.from(
      new Set(
        allTasks.flatMap(task => 
          task.assignedTo?.map(user => ({ id: user.id, name: user.name })) || []
        )
      )
    )
    
    const labels = Array.from(
      new Set(
        allTasks.flatMap(task => 
          task.labelsTags?.map(label => ({ value: label.value, label: label.label, color: label.color })) || []
        )
      )
    )
    
    const priorities = ["low", "medium", "high", "urgent"]
    
    return { assignees, labels, priorities }
  }, [columns])

  // Filter tasks based on current filters
  const filteredColumns = useMemo(() => {
    if (
      !filters.search &&
      filters.assignees.length === 0 &&
      filters.labels.length === 0 &&
      filters.priorities.length === 0 &&
      filters.dueDateRange === "all" &&
      filters.completed === "all" &&
      filters.hasSubtasks === "all"
    ) {
      return columns
    }

    return columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => {
        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          const matchesSearch = 
            task.name.toLowerCase().includes(searchLower) ||
            task.description?.toLowerCase().includes(searchLower) ||
            task.labelsTags?.some(label => 
              label.label.toLowerCase().includes(searchLower)
            )
          if (!matchesSearch) return false
        }

        // Assignee filter
        if (filters.assignees.length > 0) {
          const hasMatchingAssignee = task.assignedTo?.some(user => 
            filters.assignees.includes(user.id)
          )
          if (!hasMatchingAssignee) return false
        }

        // Label filter
        if (filters.labels.length > 0) {
          const hasMatchingLabel = task.labelsTags?.some(label => 
            filters.labels.includes(label.value)
          )
          if (!hasMatchingLabel) return false
        }

        // Priority filter
        if (filters.priorities.length > 0) {
          if (!task.priority || !filters.priorities.includes(task.priority)) {
            return false
          }
        }

        // Due date filter
        if (filters.dueDateRange !== "all" && task.startDate) {
          const dueDate = new Date(task.startDate)
          const now = new Date()
          const diffTime = dueDate.getTime() - now.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          switch (filters.dueDateRange) {
            case "overdue":
              if (diffDays >= 0) return false
              break
            case "today":
              if (diffDays !== 0) return false
              break
            case "week":
              if (diffDays < 0 || diffDays > 7) return false
              break
            case "month":
              if (diffDays < 0 || diffDays > 30) return false
              break
          }
        }

        // Completion filter
        if (filters.completed !== "all") {
          const isCompleted = task.completed === true
          if (filters.completed === "completed" && !isCompleted) return false
          if (filters.completed === "incomplete" && isCompleted) return false
        }

        // Subtasks filter
        if (filters.hasSubtasks !== "all") {
          const hasSubtasks = task.subTasks && task.subTasks.length > 0
          if (filters.hasSubtasks === "with" && !hasSubtasks) return false
          if (filters.hasSubtasks === "without" && hasSubtasks) return false
        }

        return true
      })
    }))
  }, [columns, filters])

  // Update parent when filtered data changes
  useEffect(() => {
    onFilterChange(filteredColumns)
  }, [filteredColumns, onFilterChange])

  const updateFilter = useCallback((key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search ||
      filters.assignees.length > 0 ||
      filters.labels.length > 0 ||
      filters.priorities.length > 0 ||
      filters.dueDateRange !== "all" ||
      filters.completed !== "all" ||
      filters.hasSubtasks !== "all"
    )
  }, [filters])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    if (filters.assignees.length > 0) count++
    if (filters.labels.length > 0) count++
    if (filters.priorities.length > 0) count++
    if (filters.dueDateRange !== "all") count++
    if (filters.completed !== "all") count++
    if (filters.hasSubtasks !== "all") count++
    return count
  }, [filters])

  return (
    <Box className={className}>
      <Flex gap="2" align="center" className="mb-4">
        {/* Search Input */}
        <Box className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <TextField.Root
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search tasks, descriptions, labels..."
            className="pl-10"
          />
          {filters.search && (
            <IconButton
              size="1"
              variant="ghost"
              onClick={() => updateFilter("search", "")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <X size={14} />
            </IconButton>
          )}
        </Box>

        {/* Filter Button */}
        <DropdownMenu.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenu.Trigger>
            <Button variant="outline" className="relative">
              <Filter size={16} />
              Filters
              {activeFilterCount > 0 && (
                <Badge 
                  size="1" 
                  color="blue"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Content className="w-80 p-4" align="end">
            <Flex justify="between" align="center" className="mb-4">
              <Text className="font-semibold">Filter Tasks</Text>
              {hasActiveFilters && (
                <Button size="1" variant="ghost" onClick={clearFilters}>
                  <RotateCcw size={14} />
                  Clear
                </Button>
              )}
            </Flex>

            <Box className="space-y-4">
              {/* Assignees */}
              <Box>
                <Text size="2" className="font-medium mb-2 flex items-center gap-1">
                  <User size={14} />
                  Assignees
                </Text>
                <Box className="space-y-2 max-h-32 overflow-y-auto">
                  {filterOptions.assignees.map((assignee) => (
                    <label key={assignee.id} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.assignees.includes(assignee.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFilter("assignees", [...filters.assignees, assignee.id])
                          } else {
                            updateFilter("assignees", filters.assignees.filter(id => id !== assignee.id))
                          }
                        }}
                      />
                      <Text size="2">{assignee.name}</Text>
                    </label>
                  ))}
                  {filterOptions.assignees.length === 0 && (
                    <Text size="2" className="text-gray-500">No assignees found</Text>
                  )}
                </Box>
              </Box>

              <Separator />

              {/* Labels */}
              <Box>
                <Text size="2" className="font-medium mb-2 flex items-center gap-1">
                  <Tag size={14} />
                  Labels
                </Text>
                <Box className="space-y-2 max-h-32 overflow-y-auto">
                  {filterOptions.labels.map((label) => (
                    <label key={label.value} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.labels.includes(label.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFilter("labels", [...filters.labels, label.value])
                          } else {
                            updateFilter("labels", filters.labels.filter(l => l !== label.value))
                          }
                        }}
                      />
                      <Badge
                        size="1"
                        style={{ backgroundColor: label.color + "20", color: label.color }}
                      >
                        {label.label}
                      </Badge>
                    </label>
                  ))}
                  {filterOptions.labels.length === 0 && (
                    <Text size="2" className="text-gray-500">No labels found</Text>
                  )}
                </Box>
              </Box>

              <Separator />

              {/* Priority */}
              <Box>
                <Text size="2" className="font-medium mb-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  Priority
                </Text>
                <Box className="space-y-2">
                  {filterOptions.priorities.map((priority) => (
                    <label key={priority} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.priorities.includes(priority)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFilter("priorities", [...filters.priorities, priority])
                          } else {
                            updateFilter("priorities", filters.priorities.filter(p => p !== priority))
                          }
                        }}
                      />
                      <Badge
                        size="1"
                        color={
                          priority === "urgent" ? "red" :
                          priority === "high" ? "orange" :
                          priority === "medium" ? "blue" : "gray"
                        }
                        variant="soft"
                      >
                        {priority}
                      </Badge>
                    </label>
                  ))}
                </Box>
              </Box>

              <Separator />

              {/* Due Date */}
              <Box>
                <Text size="2" className="font-medium mb-2 flex items-center gap-1">
                  <Calendar size={14} />
                  Due Date
                </Text>
                <Select.Root
                  value={filters.dueDateRange}
                  onValueChange={(value) => updateFilter("dueDateRange", value)}
                >
                  <Select.Trigger className="w-full">
                    {filters.dueDateRange === 'all' ? 'All dates' :
                     filters.dueDateRange === 'overdue' ? 'Overdue' :
                     filters.dueDateRange === 'today' ? 'Due today' :
                     filters.dueDateRange === 'week' ? 'Due this week' :
                     'Due this month'}
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="all">All dates</Select.Item>
                    <Select.Item value="overdue">Overdue</Select.Item>
                    <Select.Item value="today">Due today</Select.Item>
                    <Select.Item value="week">Due this week</Select.Item>
                    <Select.Item value="month">Due this month</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>

              <Separator />

              {/* Completion Status */}
              <Box>
                <Text size="2" className="font-medium mb-2 flex items-center gap-1">
                  <CheckSquare size={14} />
                  Status
                </Text>
                <Select.Root
                  value={filters.completed}
                  onValueChange={(value) => updateFilter("completed", value)}
                >
                  <Select.Trigger className="w-full">
                    {filters.completed === 'all' ? 'All tasks' :
                     filters.completed === 'incomplete' ? 'Incomplete' :
                     'Completed'}
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="all">All tasks</Select.Item>
                    <Select.Item value="incomplete">Incomplete</Select.Item>
                    <Select.Item value="completed">Completed</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>

              <Separator />

              {/* Subtasks */}
              <Box>
                <Text size="2" className="font-medium mb-2">
                  Subtasks
                </Text>
                <Select.Root
                  value={filters.hasSubtasks}
                  onValueChange={(value) => updateFilter("hasSubtasks", value)}
                >
                  <Select.Trigger className="w-full">
                    {filters.hasSubtasks === 'all' ? 'All tasks' :
                     filters.hasSubtasks === 'with' ? 'With subtasks' :
                     'Without subtasks'}
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="all">All tasks</Select.Item>
                    <Select.Item value="with">With subtasks</Select.Item>
                    <Select.Item value="without">Without subtasks</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>
            </Box>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button size="2" variant="ghost" onClick={clearFilters}>
            <X size={16} />
            Clear ({activeFilterCount})
          </Button>
        )}
      </Flex>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Flex gap="2" wrap="wrap" className="mb-4">
          {filters.search && (
            <Badge variant="soft" className="flex items-center gap-1">
              <Search size={12} />
              "{filters.search}"
              <IconButton
                size="1"
                variant="ghost"
                onClick={() => updateFilter("search", "")}
                className="h-4 w-4 p-0"
              >
                <X size={10} />
              </IconButton>
            </Badge>
          )}
          
          {filters.assignees.length > 0 && (
            <Badge variant="soft" className="flex items-center gap-1">
              <User size={12} />
              {filters.assignees.length} assignee{filters.assignees.length > 1 ? "s" : ""}
              <IconButton
                size="1"
                variant="ghost"
                onClick={() => updateFilter("assignees", [])}
                className="h-4 w-4 p-0"
              >
                <X size={10} />
              </IconButton>
            </Badge>
          )}
          
          {filters.labels.length > 0 && (
            <Badge variant="soft" className="flex items-center gap-1">
              <Tag size={12} />
              {filters.labels.length} label{filters.labels.length > 1 ? "s" : ""}
              <IconButton
                size="1"
                variant="ghost"
                onClick={() => updateFilter("labels", [])}
                className="h-4 w-4 p-0"
              >
                <X size={10} />
              </IconButton>
            </Badge>
          )}
          
          {filters.priorities.length > 0 && (
            <Badge variant="soft" className="flex items-center gap-1">
              <AlertCircle size={12} />
              {filters.priorities.length} priorit{filters.priorities.length > 1 ? "ies" : "y"}
              <IconButton
                size="1"
                variant="ghost"
                onClick={() => updateFilter("priorities", [])}
                className="h-4 w-4 p-0"
              >
                <X size={10} />
              </IconButton>
            </Badge>
          )}
        </Flex>
      )}
    </Box>
  )
}