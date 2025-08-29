"use client"

import {
  Box,
  Button,
  Dialog,
  Flex,
  Input,
  Label,
  Select,
  Switch,
  Text,
} from "@/src/1base"
import { useEffect, useState } from "react"
import type { DropdownOption } from "../cell-renderers"
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
  { value: "Dropdown", label: "Dropdown" },
]

export interface ColumnConfig {
  id: string
  headingName: string
  type:
    | "String"
    | "Number"
    | "Currency"
    | "Date"
    | "Boolean"
    | "Tag"
    | "Status"
    | "Rating"
    | "Dropdown"
  meta?: {
    dropdownOptions?: DropdownOption[]
    strictDropdown?: boolean // Controls whether only predefined dropdown values are allowed
    cellDisplayStyle?: "badge" | "full-cell" // Controls how dropdown/status cells are displayed
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
  tableData = [],
}) => {
  // Local state for form values
  const [headingName, setHeadingName] = useState("")
  const [columnType, setColumnType] = useState<ColumnConfig["type"]>("String")
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([])
  const [strictDropdown, setStrictDropdown] = useState(true)
  const [cellDisplayStyle, setCellDisplayStyle] = useState<
    "badge" | "full-cell"
  >("badge")

  // Initialize form when column changes
  useEffect(() => {
    if (column) {
      setHeadingName(column.headingName || "")
      setColumnType(column.type || "String")

      // Initialize strictDropdown setting
      if (column.meta?.strictDropdown !== undefined) {
        setStrictDropdown(column.meta.strictDropdown)
      } else {
        setStrictDropdown(true) // Default to true if not specified
      }

      // Initialize cellDisplayStyle setting
      if (column.meta?.cellDisplayStyle !== undefined) {
        setCellDisplayStyle(column.meta.cellDisplayStyle)
      } else {
        setCellDisplayStyle("badge") // Default to badge style
      }

      // Initialize dropdown options if available
      if (column.meta?.dropdownOptions) {
        setDropdownOptions(column.meta.dropdownOptions)
      } else if (column.type === "Dropdown") {
        // Default options if none are set - use standard todo/doing/done values
        setDropdownOptions([
          { value: "todo", label: "To Do", color: "var(--blue-5)" },
          { value: "doing", label: "Doing", color: "var(--yellow-5)" },
          { value: "done", label: "Done", color: "var(--green-5)" },
        ])
      }
    } else {
      // Reset form for new columns
      setHeadingName("")
      setColumnType("String")
      setDropdownOptions([])
      setStrictDropdown(true)
      setCellDisplayStyle("badge")
    }
  }, [column])

  // Get values currently in use in the table (to prevent deletion)
  const getValuesInUse = (): string[] => {
    if (!column || !tableData.length) return []

    // Extract all unique values used for this column in the table data
    const valuesSet = new Set<string>()
    tableData.forEach((row) => {
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
      type: columnType,
    }

    // Add dropdown options for dropdown columns
    if (columnType === "Dropdown") {
      updates.meta = {
        dropdownOptions,
        strictDropdown,
        cellDisplayStyle,
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
            <Input
              type="text"
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
            <Select.Root
              value={columnType}
              onValueChange={(value) => {
                // Type guard to ensure value is a valid column type
                if (
                  [
                    "String",
                    "Number",
                    "Currency",
                    "Date",
                    "Boolean",
                    "Tag",
                    "Status",
                    "Rating",
                    "Dropdown",
                  ].includes(value)
                ) {
                  setColumnType(value as ColumnConfig["type"])
                }
              }}
            >
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

          {/* Dropdown options editor (only visible for Dropdown type) */}
          {columnType === "Dropdown" && (
            <Box className="space-y-4">
              <Flex justify="between" align="center">
                <Text as="label" size="2" weight="medium">
                  Dropdown Options
                </Text>
                <Flex justify="between" align="center" gap="2">
                  <Text as="label" size="2" weight="medium">
                    {strictDropdown
                      ? "Only predefined values"
                      : "Allow custom values"}
                  </Text>
                  <Label className="flex cursor-pointer items-center gap-2">
                    <Switch
                      checked={strictDropdown}
                      onCheckedChange={setStrictDropdown}
                      aria-label="Toggle strict dropdown mode"
                    />
                  </Label>
                </Flex>
              </Flex>
              <DropdownOptionsEditor
                options={dropdownOptions}
                onChange={setDropdownOptions}
                valuesInUse={getValuesInUse()}
              />

              {/* Cell Display Style */}
              <Flex direction="column" gap="2">
                <Text as="label" size="2" weight="medium">
                  Cell Display Style
                </Text>
                <Select.Root
                  value={cellDisplayStyle}
                  onValueChange={(value) => {
                    if (value === "badge" || value === "full-cell") {
                      setCellDisplayStyle(value)
                    }
                  }}
                >
                  <Select.Trigger placeholder="Select display style" />
                  <Select.Content>
                    <Select.Item value="badge">Badge (current)</Select.Item>
                    <Select.Item value="full-cell">Full Cell Color</Select.Item>
                  </Select.Content>
                </Select.Root>
                <Text size="1" color="gray">
                  {cellDisplayStyle === "badge"
                    ? "Shows colored badge with rounded corners"
                    : "Fills entire cell with background color"}
                </Text>
              </Flex>
            </Box>
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
