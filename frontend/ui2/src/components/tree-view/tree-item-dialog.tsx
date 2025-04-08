"use client"

import { Button, Dialog, Flex, Text, VisuallyHidden } from "@/components/base"
import { useForm } from "@tanstack/react-form"
import type { FieldApi } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { z } from "zod"

import { FormField } from "../form/form-field"
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

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
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
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: field.required
                    ? z.string().min(1, "This field is required")
                    : undefined,
                }}
              >
                {(fieldApi) => (
                  <FormField
                    name={field.name}
                    label={field.label}
                    type={field.type === "textarea" ? "textarea" : "text"}
                    field={fieldApi}
                  />
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
