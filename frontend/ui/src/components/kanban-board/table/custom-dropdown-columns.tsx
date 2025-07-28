// components/table/custom-dropdown-columns.tsx
import React, { useState, useRef, useEffect } from "react"
import { Flex, Text, DropdownMenu, TextField, Button } from "@base"
import { ChevronDown, Flag, Circle, Plus } from "lucide-react"
import { TableTask } from "../types"

// Color picker component for inline status creation
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  size?: 'sm' | 'md';
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, size = 'md' }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Color palette for status creation
  const colorPalette = [
    '#93c5fd', '#fcd34d', '#86efac', '#f9a8d4', '#c4b5fd', '#a5b4fc',
    '#fdba74', '#67e8f9', '#d8b4fe', '#f87171', '#fde68a', '#6ee7b7'
  ];

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    setShowPicker(false);
  };

  // Position popup relative to button
  useEffect(() => {
    if (showPicker && buttonRef.current && popupRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      popupRef.current.style.top = `${rect.bottom + window.scrollY + 5}px`;
      popupRef.current.style.left = `${rect.left + window.scrollX - 5}px`;
    }
  }, [showPicker]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && popupRef.current) {
        if (!buttonRef.current.contains(e.target as Node) &&
          !popupRef.current.contains(e.target as Node)) {
          setShowPicker(false);
        }
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside, { capture: true });
    }

    return () => document.removeEventListener('mousedown', handleClickOutside, { capture: true });
  }, [showPicker]);

  const sizeClass = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';

  return (
    <div className="relative inline-block">
      <div
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(!showPicker);
        }}
        className={`${sizeClass} border border-gray-300 rounded cursor-pointer bg-gray-200`}
        style={{ backgroundColor: color }}
      />

      {showPicker && (
        <div
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
          className="fixed top-0 left-0 p-3 bg-white rounded-xl shadow-lg border border-gray-200 z-[9999] w-[200px]"
        >
          <div className="flex gap-2.5 justify-between mb-2.5">
            {colorPalette.slice(0, 6).map((c, i) => (
              <div
                key={`color-row1-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorSelect(c);
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 ease-in-out ${c === color ? 'border-2 border-black' : 'border border-gray-300'
                  } ${hoveredColor === c ? 'scale-115' : 'scale-100'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="flex gap-2.5 justify-between">
            {colorPalette.slice(6).map((c, i) => (
              <div
                key={`color-row2-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorSelect(c);
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 ease-in-out ${c === color ? 'border-2 border-black' : 'border border-gray-300'
                  } ${hoveredColor === c ? 'scale-115' : 'scale-100'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


interface StatusDropdownCellProps {
  value: string
  row: TableTask
  taskStatuses: Array<{ id: string; name: string; color: string }>
  onStatusChange: (taskId: string, newStatusId: string) => Promise<void>
  onCreateStatus?: (name: string, color: string) => Promise<string>
  allowCustomValues?: boolean
  disabled?: boolean
}

export const StatusDropdownCell: React.FC<StatusDropdownCellProps> = ({
  value,
  row,
  taskStatuses,
  onStatusChange,
  onCreateStatus,
  allowCustomValues = false,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [newStatusName, setNewStatusName] = useState("")
  const [newStatusColor, setNewStatusColor] = useState("#93c5fd")
  const [isCreatingStatus, setIsCreatingStatus] = useState(false)

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

  const handleCreateNewStatus = async () => {
    if (!newStatusName.trim() || !onCreateStatus || isCreatingStatus || !row.id) return

    // Check for duplicate names
    const nameExists = taskStatuses.some(status =>
      status.name.toLowerCase() === newStatusName.trim().toLowerCase()
    )
    if (nameExists) {
      console.error("A status with this name already exists")
      return
    }

    setIsCreatingStatus(true)
    try {
      const newStatusId = await onCreateStatus(newStatusName.trim(), newStatusColor)

      // Automatically select the newly created status
      if (row.id) {
        await onStatusChange(row.id, newStatusId)
      }

      // Reset form
      setNewStatusName("")
      setNewStatusColor(generateUniqueColor())
    } catch (error) {
      console.error("Failed to create new status:", error)
    } finally {
      setIsCreatingStatus(false)
    }
  }

  const generateUniqueColor = () => {
    const existingColors = taskStatuses.map(status => status.color).filter(Boolean)
    const colorPalette = [
      '#93c5fd', '#fcd34d', '#86efac', '#f9a8d4', '#c4b5fd', '#a5b4fc',
      '#fdba74', '#67e8f9', '#d8b4fe', '#f87171', '#fde68a', '#6ee7b7'
    ]

    const unusedColor = colorPalette.find(color => !existingColors.includes(color))
    return unusedColor || '#93c5fd'
  }

  // Set a unique color when component mounts
  useEffect(() => {
    if (allowCustomValues) {
      setNewStatusColor(generateUniqueColor())
    }
  }, [allowCustomValues, taskStatuses])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger >
        <button
          className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
            transition-all duration-200 cursor-pointer
            hover:opacity-80 hover:scale-105
            ${disabled || isLoading || isCreatingStatus ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{
            backgroundColor: `${currentStatus?.color}20`,
            color: currentStatus?.color,
            border: `1px solid ${currentStatus?.color}40`
          }}
          disabled={disabled || isLoading || isCreatingStatus}
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

      <DropdownMenu.Content align="start" className="w-64">
        <DropdownMenu.Label>Change Status</DropdownMenu.Label>
        <DropdownMenu.Separator />

        {/* Existing Status Options */}
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

        {/* Add New Status Section - Only show if custom values are allowed */}
        {allowCustomValues && onCreateStatus && (
          <>
            <DropdownMenu.Separator />
            <div className="px-3 py-2">
              <Text size="1" className="text-muted-foreground mb-2 block">
                Create New Status
              </Text>

              <div className="flex items-center gap-2 mb-2">
                <ColorPicker
                  color={newStatusColor}
                  onChange={setNewStatusColor}
                  size="sm"
                />
                <TextField.Root
                  value={newStatusName}
                  onChange={(e) => setNewStatusName(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation()
                    if (e.key === 'Enter') {
                      handleCreateNewStatus()
                    }
                  }}
                  placeholder="Status name"
                  className="flex-1 text-sm"
                  disabled={isCreatingStatus}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleCreateNewStatus()
                }}
                disabled={!newStatusName.trim() || isCreatingStatus}
                size="1"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs"
              >
                {isCreatingStatus ? (
                  <Flex align="center" gap="1">
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </Flex>
                ) : (
                  <Flex align="center" gap="1">
                    <Plus size={12} />
                    Create & Select
                  </Flex>
                )}
              </Button>
            </div>
          </>
        )}
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

// Configuration for both light and dark modes
const PRIORITY_CONFIG: Record<PriorityType, { 
  label: string, 
  color: { light: string, dark: string }, 
  bgColor: { light: string, dark: string }
}> = {
  low: { 
    label: "Low", 
    color: { light: "#6b7280", dark: "#9ca3af" },
    bgColor: { light: "#f9fafb", dark: "#374151" }
  },
  medium: { 
    label: "Medium", 
    color: { light: "#3b82f6", dark: "#60a5fa" }, 
    bgColor: { light: "#eff6ff", dark: "#1e3a8a" }
  },
  high: { 
    label: "High", 
    color: { light: "#f59e0b", dark: "#fbbf24" }, 
    bgColor: { light: "#fffbeb", dark: "#783c00" }
  },
  urgent: { 
    label: "Urgent", 
    color: { light: "#ef4444", dark: "#f87171" }, 
    bgColor: { light: "#fef2f2", dark: "#7f1d1d" }
  },
}

export const PriorityDropdownCell: React.FC<PriorityDropdownCellProps> = ({
  value,
  row,
  onPriorityChange,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  // Detect dark mode using a data attribute on document.documentElement
  // This checks for the common dark mode implementation with data-theme="dark"
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check for various dark mode indicators
      const htmlEl = document.documentElement;
      return (
        htmlEl.classList.contains('dark') ||
        htmlEl.dataset.theme === 'dark' ||
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
        document.body.classList.contains('dark-theme')
      );
    }
    return false;
  });

  // Set up listener for theme changes
  useEffect(() => {
    const updateTheme = () => {
      if (typeof window !== 'undefined') {
        const htmlEl = document.documentElement;
        setIsDarkMode(
          htmlEl.classList.contains('dark') ||
          htmlEl.dataset.theme === 'dark' ||
          window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
          document.body.classList.contains('dark-theme')
        );
      }
    };

    // Listen for theme changes (common implementations)
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (mediaQuery) {
      mediaQuery.addEventListener('change', updateTheme);
    }

    // Check for theme changes via mutations
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      mediaQuery?.removeEventListener('change', updateTheme);
      observer.disconnect();
    };
  }, []);

  // Ensure value is a valid priority type or default to medium
  const safeValue = (Object.keys(PRIORITY_CONFIG).includes(value as string) ? value : "medium") as PriorityType
  const currentPriority = PRIORITY_CONFIG[safeValue]

  // Get the appropriate colors based on the current theme
  const themeMode = isDarkMode ? 'dark' : 'light';
  const priorityColor = currentPriority.color[themeMode];
  const priorityBgColor = currentPriority.bgColor[themeMode];

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
            backgroundColor: priorityBgColor,
            color: priorityColor,
            border: `1px solid ${priorityColor}40`
          }}
          disabled={disabled || isLoading}
          onClick={(e) => e.stopPropagation()}
        >
          <Flag size={12} color={priorityColor} />
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
              <Flag size={12} color={config.color[themeMode]} />
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
  onPriorityChange: (taskId: string, priorityId: PriorityType) => Promise<void>
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