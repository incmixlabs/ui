import { Button, Dialog } from "@incmix/ui"
import { Input } from "../form"
import { Label } from "../label"
import { Textarea } from "../textarea"

interface TreeItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "file" | "folder"
  position: "above" | "below" | "inside"
  isEditing: boolean
  formData: Record<string, string>
  setFormData: (data: Record<string, string>) => void
  onSubmit: () => void
  onCancel: () => void
}

export function TreeItemDialog({
  open,
  onOpenChange,
  type,
  position,
  isEditing,
  formData,
  setFormData,
  onSubmit,
  onCancel,
}: TreeItemDialogProps) {
  // Determine which fields to show based on dialog type
  const dialogFields =
    type === "file"
      ? [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "value", label: "Value", type: "text", required: true },
          { name: "notes", label: "Notes", type: "textarea", required: false },
        ]
      : [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "notes", label: "Notes", type: "textarea", required: false },
        ]

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>
          {isEditing
            ? `Edit ${type === "file" ? "Variable" : "Folder"}`
            : `New ${type === "file" ? "Variable" : "Folder"}`}
        </Dialog.Title>
        <Dialog.Description>
          {isEditing
            ? `Edit the ${type === "file" ? "variable" : "folder"} details below.`
            : `Add a new ${type === "file" ? "variable" : "folder"} ${position} the selected item.`}
        </Dialog.Description>

        <div className="space-y-4 py-4">
          {dialogFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : (
                <Input
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>

        <Dialog.Close>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!formData.name || (type === "file" && !formData.value)}
          >
            {isEditing
              ? "Save"
              : `Add ${type === "file" ? "Variable" : "Folder"}`}
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
