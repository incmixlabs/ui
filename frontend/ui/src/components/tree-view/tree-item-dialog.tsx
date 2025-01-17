"use client"

import {
  Button,
  Flex,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from "@radix-ui/themes"
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog"
import { useTreeViewContext } from "./tree-view-context"

type FormData = Record<string, string>

type TreeItemDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (
    data: FormData,
    type: "file" | "folder",
    position: "above" | "below" | "inside"
  ) => void
  type: "file" | "folder"
  position: "above" | "below" | "inside"
  initialData?: Record<string, string>
}

export function TreeItemDialog({
  open,
  onOpenChange,
  onSubmit,
  type,
  position,
  initialData,
}: TreeItemDialogProps) {
  const { descriptions, fileFields, folderFields } = useTreeViewContext()
  const fields = type === "file" ? fileFields : folderFields

  const [formData, setFormData] = React.useState<FormData>({})

  React.useEffect(() => {
    if (open && initialData) {
      setFormData(initialData)
    } else if (!open) {
      setFormData({})
    }
  }, [open, initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData, type, position)
    setFormData({})
    onOpenChange(false)
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const isValid = fields.every(
    (field) =>
      !field.required ||
      (formData[field.name] && formData[field.name].trim() !== "")
  )

  const isEditing = !!initialData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <VisuallyHidden asChild>
          <DialogDescription>
            {isEditing
              ? type === "file"
                ? descriptions.editFileTitle
                : descriptions.editFolderTitle
              : type === "file"
                ? descriptions.newFileTitle
                : descriptions.newFolderTitle}
          </DialogDescription>
        </VisuallyHidden>
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? type === "file"
                ? descriptions.editFileTitle
                : descriptions.editFolderTitle
              : type === "file"
                ? descriptions.newFileTitle
                : descriptions.newFolderTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            {fields.map((field) => (
              <Flex key={field.name} direction="column" gap="1">
                <Text as="label" size="2">
                  {field.label}
                </Text>
                {field.type === "textarea" ? (
                  <TextArea
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                  />
                ) : (
                  <TextField.Root
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                  />
                )}
              </Flex>
            ))}
          </Flex>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="soft"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              {isEditing ? "Save" : `Add ${type}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
