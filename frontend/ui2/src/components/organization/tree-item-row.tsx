"use client"

import { forwardRef, useImperativeHandle, useState } from "react"
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react"

import type { TreeDataItem } from "@/types"
import {
  Button,
  Checkbox,
  Dialog,
  DropdownMenu,
  Input,
  Label,
  TextArea
} from "@/components/base"
import { TableCell, TableRow } from "@/components/table"
interface TreeItemRowProps {
  item: TreeDataItem
  level: number
  onToggleExpand: (itemId: string) => void
  onEdit: (item: TreeDataItem) => void
  onDelete: (itemId: string) => void
  onCreateItem: (
    item: TreeDataItem,
    type: "file" | "folder",
    position: "above" | "below" | "inside",
    formData: Record<string, string>
  ) => void
}

export interface TreeItemRowRef {
  openEditDialog: () => void
  openCreateDialog: (
    type: "file" | "folder",
    position: "above" | "below" | "inside"
  ) => void
}

export const TreeItemRow = forwardRef<TreeItemRowRef, TreeItemRowProps>(
  ({ item, level, onToggleExpand, onEdit, onDelete, onCreateItem }, ref) => {
    // Local state for dialog management
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState<"file" | "folder">("file")
    const [dialogPosition, setDialogPosition] = useState<
      "above" | "below" | "inside"
    >("below")
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<Record<string, string>>({
      name: "",
      value: "",
      notes: "",
    })

    // Handle opening the dialog for editing
    const handleOpenEditDialog = () => {
      setDialogType(item.type)
      setIsEditing(true)
      setFormData({
        name: item.name,
        value: item.data?.value || "",
        notes: item.data?.notes || "",
      })
      setDialogOpen(true)
    }

    // Handle opening the dialog for creating items
    const handleOpenCreateDialog = (
      type: "file" | "folder",
      position: "above" | "below" | "inside"
    ) => {
      setDialogType(type)
      setDialogPosition(position)
      setIsEditing(false)
      setFormData({ name: "", value: "", notes: "" })
      setDialogOpen(true)
    }

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      openEditDialog: handleOpenEditDialog,
      openCreateDialog: handleOpenCreateDialog,
    }))

    // Handle form submission
    const handleSubmit = () => {
      if (isEditing) {
        onEdit({
          ...item,
          name: formData.name,
          data: {
            ...item.data,
            name: formData.name,
            value: formData.value,
            notes: formData.notes,
          },
        })
      } else {
        // Pass the form data to the parent component
        onCreateItem(item, dialogType, dialogPosition, formData)
      }

      // Close the dialog and reset form
      setDialogOpen(false)
      setIsEditing(false)
      setFormData({ name: "", value: "", notes: "" })
    }

    // Determine which fields to show based on dialog type
    const dialogFields =
      dialogType === "file"
        ? [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "value", label: "Value", type: "text", required: true },
            {
              name: "notes",
              label: "Notes",
              type: "textarea",
              required: false,
            },
          ]
        : [
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "notes",
              label: "Notes",
              type: "textarea",
              required: false,
            },
          ]

    return (
      <TableRow>
        <TableCell className="w-12 border border-gray-200">
          <Checkbox />
        </TableCell>
        <TableCell className="border border-gray-200">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${level * 24}px` }}
          >
            {item.type === "folder" && (
              <button
                type="button" //
                onClick={() => onToggleExpand(item.id)}
                className="mr-2 focus:outline-none"
              >
                {item.expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            {item.type === "file" && <div className="w-6" />}
            <span className={item.type === "folder" ? "font-medium" : ""}>
              {item.name}
            </span>
          </div>
        </TableCell>
        <TableCell className="max-w-xs border border-gray-200">
          {item.type === "file" && item.data?.value ? (
            <div className="truncate" title={item.data.value}>
              {item.data.value}
            </div>
          ) : (
            ""
          )}
        </TableCell>
        <TableCell className="border border-gray-200">
          {/* Created on would go here */}
        </TableCell>
        <TableCell className="border border-gray-200">
          {/* Created by would go here */}
        </TableCell>
        <TableCell className="w-10 border border-gray-200">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button
                type="button"
                className="rounded-md p-1 hover:bg-gray-100 focus:outline-none"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item onClick={handleOpenEditDialog}>
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>
                  Create Variable
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item
                    onClick={() => handleOpenCreateDialog("file", "above")}
                  >
                    Above
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => handleOpenCreateDialog("file", "below")}
                  >
                    Below
                  </DropdownMenu.Item>
                  {item.type === "folder" && (
                    <DropdownMenu.Item
                      onClick={() => handleOpenCreateDialog("file", "inside")}
                    >
                      Inside
                    </DropdownMenu.Item>
                  )}
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Create Folder</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item
                    onClick={() => handleOpenCreateDialog("folder", "above")}
                  >
                    Above
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => handleOpenCreateDialog("folder", "below")}
                  >
                    Below
                  </DropdownMenu.Item>
                  {item.type === "folder" && (
                    <DropdownMenu.Item
                      onClick={() => handleOpenCreateDialog("folder", "inside")}
                    >
                      Inside
                    </DropdownMenu.Item>
                  )}
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                className="text-red-600"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </TableCell>

        {/* Dialog */}
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {isEditing
                  ? `Edit ${dialogType === "file" ? "Variable" : "Folder"}`
                  : `New ${dialogType === "file" ? "Variable" : "Folder"}`}
              </Dialog.Title>
              <Dialog.Description>
                {isEditing
                  ? `Edit the ${dialogType === "file" ? "variable" : "folder"} details below.`
                  : `Add a new ${dialogType === "file" ? "variable" : "folder"} ${dialogPosition} the selected item.`}
              </Dialog.Description>
            </Dialog.Header>

            <div className="space-y-4 py-4">
              {dialogFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <TextArea
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>

            <Dialog.Footer>
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false)
                  setIsEditing(false)
                  setFormData({ name: "", value: "", notes: "" })
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.name || (dialogType === "file" && !formData.value)
                }
              >
                {isEditing
                  ? "Save"
                  : `Add ${dialogType === "file" ? "Variable" : "Folder"}`}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </TableRow>
    )
  }
)

// Add display name for better debugging
TreeItemRow.displayName = "TreeItemRow"
