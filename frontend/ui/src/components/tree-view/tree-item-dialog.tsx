"use client"

import {
  Button,
  Flex,
  Text,
  TextArea,
  TextField,
  VisuallyHidden,
} from "@radix-ui/themes"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
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

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors ? (
        <Text color="red" size="1">
          {field.state.meta.errors}
        </Text>
      ) : null}
    </>
  )
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

  const form = useForm({
    defaultValues:
      initialData ||
      Object.fromEntries(fields.map((field) => [field.name, ""])),
    onSubmit: ({ value }) => {
      onSubmit(value, type, position)
      onOpenChange(false)
    },
  })

  React.useEffect(() => {
    if (open && initialData) {
      form.reset(initialData)
    } else if (!open) {
      form.reset()
    }
  }, [open, initialData, form])

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
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Flex direction="column" gap="3">
            {fields.map((field) => (
              <form.Field
                key={field.name}
                name={field.name}
                validators={{
                  onChange: ({ value }) =>
                    field.required && (!value || value.trim() === "")
                      ? "This field is required"
                      : undefined,
                }}
              >
                {(fieldApi) => (
                  <Flex direction="column" gap="1">
                    <Text as="label" size="2" htmlFor={fieldApi.name}>
                      {field.label}
                    </Text>
                    {field.type === "textarea" ? (
                      <TextArea
                        id={fieldApi.name}
                        placeholder={field.placeholder}
                        value={fieldApi.state.value}
                        onBlur={fieldApi.handleBlur}
                        onChange={(e) => fieldApi.handleChange(e.target.value)}
                      />
                    ) : (
                      <TextField.Root
                        id={fieldApi.name}
                        placeholder={field.placeholder}
                        value={fieldApi.state.value}
                        onBlur={fieldApi.handleBlur}
                        onChange={(e) => fieldApi.handleChange(e.target.value)}
                      />
                    )}
                    <FieldInfo field={fieldApi} />
                  </Flex>
                )}
              </form.Field>
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
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "..." : isEditing ? "Save" : `Add ${type}`}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
