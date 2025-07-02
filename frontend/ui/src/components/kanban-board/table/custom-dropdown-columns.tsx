// components/table/custom-dropdown-columns.tsx
import React, { useState, useRef, useEffect } from "react"
import { Badge, Flex, Text, DropdownMenu, IconButton } from "@incmix/ui"
import { ChevronDown, Flag, Circle } from "lucide-react"
import { TableTask } from "../types"


interface StatusDropdownCellProps {
  value: string
  row: TableTask
  taskStatuses: Array<{ id: string; name: string; color: string }>
  onStatusChange: (taskId: string, newStatusId: string) => Promise<void>
  disabled?: boolean
}

export const StatusDropdownCell: React.FC<StatusDropdownCellProps> = ({
  value,
  row,
  taskStatuses,
  onStatusChange,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const currentStatus = taskStatuses.find(status => status.id === value)
  
  const handleStatusChange = async (newStatusId: string) => {
    if (newStatusId === value || !row.id || isLoading) return
    
    setIsLoading(true)
    try {
      await onStatusChange(row.id, newStatusId)
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger >
        <button
          className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
            transition-all duration-200 cursor-pointer
            hover:opacity-80 hover:scale-105
            ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{
            backgroundColor: `${currentStatus?.color}20`,
            color: currentStatus?.color,
            border: `1px solid ${currentStatus?.color}40`
          }}
          disabled={disabled || isLoading}
          onClick={(e) => e.stopPropagation()}
        >
          <Circle 
            size={8} 
            fill={currentStatus?.color} 
            color={currentStatus?.color}
          />
          {currentStatus?.name || "Unknown"}
          <ChevronDown size={12} />
        </button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Content align="start" className="w-56">
        <DropdownMenu.Label>Change Status</DropdownMenu.Label>
        <DropdownMenu.Separator />
        
        {taskStatuses.map((status) => {
          const isCurrentStatus = status.id === value
          
          return (
            <DropdownMenu.Item
              key={status.id}
              onClick={() => handleStatusChange(status.id)}
              className={`
                flex items-center gap-3 px-3 py-2 cursor-pointer
                ${isCurrentStatus ? 'bg-accent' : ''}
              `}
            >
              <Circle 
                size={8} 
                fill={status.color} 
                color={status.color}
              />
              <Text size="2">{status.name}</Text>
              {isCurrentStatus && (
                <Text size="1" className="text-muted-foreground ml-auto">
                  Current
                </Text>
              )}
            </DropdownMenu.Item>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

interface PriorityDropdownCellProps {
  value: PriorityType | string
  row: TableTask
  onPriorityChange: (taskId: string, newPriorityId: PriorityType) => Promise<void>
  disabled?: boolean
}

export type PriorityType = "low" | "medium" | "high" | "urgent";

const PRIORITY_CONFIG: Record<PriorityType, { label: string, color: string, bgColor: string }> = {
  low: { label: "Low", color: "#6b7280", bgColor: "#f9fafb" },
  medium: { label: "Medium", color: "#3b82f6", bgColor: "#eff6ff" },
  high: { label: "High", color: "#f59e0b", bgColor: "#fffbeb" },
  urgent: { label: "Urgent", color: "#ef4444", bgColor: "#fef2f2" },
}

export const PriorityDropdownCell: React.FC<PriorityDropdownCellProps> = ({
  value,
  row,
  onPriorityChange,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  // Ensure value is a valid priority type or default to medium
  const safeValue = (Object.keys(PRIORITY_CONFIG).includes(value as string) ? value : "medium") as PriorityType
  const currentPriority = PRIORITY_CONFIG[safeValue]
  
  const handlePriorityChange = async (newPriorityId: PriorityType) => {
    if (newPriorityId === value || !row.id || isLoading) return
    
    setIsLoading(true)
    try {
      await onPriorityChange(row.id, newPriorityId)
    } catch (error) {
      console.error("Failed to update priority:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger >
        <button
          className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
            transition-all duration-200 cursor-pointer
            hover:opacity-80 hover:scale-105
            ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{
            backgroundColor: currentPriority.bgColor,
            color: currentPriority.color,
            border: `1px solid ${currentPriority.color}40`
          }}
          disabled={disabled || isLoading}
          onClick={(e) => e.stopPropagation()}
        >
          <Flag size={12} color={currentPriority.color} />
          {currentPriority.label}
          <ChevronDown size={12} />
        </button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Content align="start" className="w-48">
        <DropdownMenu.Label>Set Priority</DropdownMenu.Label>
        <DropdownMenu.Separator />
        
        {Object.entries(PRIORITY_CONFIG).map(([key, config]) => {
          const isCurrentPriority = key === safeValue
          
          return (
            <DropdownMenu.Item
              key={key}
              onClick={() => handlePriorityChange(key as PriorityType)}
              className={`
                flex items-center gap-3 px-3 py-2 cursor-pointer
                ${isCurrentPriority ? 'bg-accent' : ''}
              `}
            >
              <Flag size={12} color={config.color} />
              <Text size="2">{config.label}</Text>
              {isCurrentPriority && (
                <Text size="1" className="text-muted-foreground ml-auto">
                  Current
                </Text>
              )}
            </DropdownMenu.Item>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

// Enhanced column definitions using custom dropdown components
export const createEnhancedTaskTableColumns = (
  taskStatuses: Array<{ id: string; name: string; color: string }>,
  onStatusChange: (taskId: string, statusId: string) => Promise<void>,
  onPriorityChange: (taskId: string, priorityId: string) => Promise<void>
) => {
  return [
    // ... other columns (same as before)
    
    {
      headingName: "Status",
      type: "String" as const, // Using String since we're handling the dropdown ourselves
      accessorKey: "statusId",
      id: "status",
      enableSorting: true,
      enableInlineEdit: false, // Disable inline edit since we're using custom dropdown
      renderer: (value: string, row: TableTask) => (
        <StatusDropdownCell
          value={value}
          row={row}
          taskStatuses={taskStatuses}
          onStatusChange={onStatusChange}
        />
      )
    },
    {
      headingName: "Priority",
      type: "String" as const,
      accessorKey: "priorityId",
      id: "priority",
      enableSorting: true,
      enableInlineEdit: false,
      renderer: (value: string, row: TableTask) => (
        <PriorityDropdownCell
          value={value}
          row={row}
          onPriorityChange={onPriorityChange}
        />
      )
    }
    
    // ... rest of columns
  ]
}