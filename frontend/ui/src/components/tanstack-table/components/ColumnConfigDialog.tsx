"use client"

import React, { useState, useEffect } from "react"
import { Dialog, Flex, Box, Text, Button, Select } from "@radix-ui/themes"
import { X } from "lucide-react"
import { DropdownOption } from "../cell-renderers"
import DropdownOptionsEditor from "./DropdownOptionsEditor"

// Available column types
const COLUMN_TYPES = [
  { value: "String", label: "Text" },
  { value: "Number", label: "Number" },
  { value: "Currency", label: "Currency" },
  { value: "Date", label: "Date" },
  { value: "Boolean", label: "Boolean" },
  { value: "Tag", label: "Tags" },
  { value: "Status", label: "Status" },
  { value: "Rating", label: "Rating" },
  { value: "Dropdown", label: "Dropdown" }
]

export interface ColumnConfig {
  id: string
  headingName: string
  type: "String" | "Number" | "Currency" | "Date" | "Boolean" | "Tag" | "Status" | "Rating" | "Dropdown"
  meta?: {
    dropdownOptions?: DropdownOption[]
    editable?: boolean
    // Other metadata can be added here in the future
  }
  // Additional properties will be added in future
}

interface ColumnConfigDialogProps {
  isOpen: boolean
  onClose: () => void
  column: ColumnConfig | null
  onSave: (columnId: string, updates: Partial<ColumnConfig>) => void
  // Values currently used in the table (can't be deleted from dropdown options)
  tableData?: any[]
}

export const ColumnConfigDialog: React.FC<ColumnConfigDialogProps> = ({
  isOpen,
  onClose,
  column,
  onSave,
  tableData = []
}) => {
  // Local state for form values
  const [headingName, setHeadingName] = useState("")
  const [columnType, setColumnType] = useState<ColumnConfig["type"]>("String")
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([])

  // Initialize form when column changes
  useEffect(() => {
    if (column) {
      setHeadingName(column.headingName || "")
      setColumnType(column.type || "String")
      
      // Initialize dropdown options if available
      if (column.meta?.dropdownOptions) {
        setDropdownOptions(column.meta.dropdownOptions)
      } else if (column.type === "Dropdown") {
        // Default options if none are set - use standard todo/doing/done values
        setDropdownOptions([
          { value: "todo", label: "To Do", color: "#93c5fd" },  // Light blue
          { value: "doing", label: "Doing", color: "#fcd34d" }, // Light yellow
          { value: "done", label: "Done", color: "#86efac" }    // Light green
        ])
      }
    }
  }, [column])

  // Get values currently in use in the table (to prevent deletion)
  const getValuesInUse = (): string[] => {
    if (!column || !tableData.length) return []
    
    // Extract all unique values used for this column in the table data
    const valuesSet = new Set<string>()
    tableData.forEach(row => {
      const value = row[column.id]
      if (value !== undefined && value !== null) {
        valuesSet.add(value.toString())
      }
    })
    
    return Array.from(valuesSet)
  }

  // Handle save
  const handleSave = () => {
    if (!column) return
    
    const updates: Partial<ColumnConfig> = {
      headingName,
      type: columnType
    }

    // Add dropdown options for dropdown columns
    if (columnType === "Dropdown") {
      updates.meta = {
        ...column.meta,
        dropdownOptions
      }
    }

    onSave(column.id, updates)
    onClose()
  }

  // Handle input change with proper type
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeadingName(event.target.value)
  }

  // If no column is selected, don't render anything
  if (!column) return null

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title className="font-medium">Configure Column</Dialog.Title>
        
        <Flex direction="column" gap="4" py="4">
          {/* Column Name */}
          <Flex direction="column" gap="2">
            <Text as="label" size="2" weight="medium">
              Column Name
            </Text>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={headingName} 
              onChange={handleInputChange} 
              placeholder="Enter column name"
            />
          </Flex>
          
          {/* Column Type */}
          <Flex direction="column" gap="2">
            <Text as="label" size="2" weight="medium">
              Column Type
            </Text>
            <Select.Root value={columnType} onValueChange={(value) => {
              // Type guard to ensure value is a valid column type
              if (['String', 'Number', 'Currency', 'Date', 'Boolean', 'Tag', 'Status', 'Rating'].includes(value)) {
                setColumnType(value as ColumnConfig['type']);
              }
            }}>
              <Select.Trigger placeholder="Select column type" />
              <Select.Content>
                {COLUMN_TYPES.map((type) => (
                  <Select.Item key={type.value} value={type.value}>
                    {type.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          {/* Dropdown Options Editor - only show for Dropdown type */}
          {columnType === "Dropdown" && (
            <DropdownOptionsEditor
              options={dropdownOptions}
              onChange={setDropdownOptions}
              valuesInUse={getValuesInUse()}
            />
          )}
        </Flex>
        
        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
