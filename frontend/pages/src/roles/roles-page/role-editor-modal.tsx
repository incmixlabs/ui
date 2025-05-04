import AutoForm from "@incmix/ui/auto-form"
import { Button, Dialog, Flex, ReactiveButton, toast } from "@incmix/ui/base"
import { useMutation } from "@tanstack/react-query"
import { PlusCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { createRole, updateRole } from "./actions"
import { roleFormSchema } from "./role-form-schema"

type RoleEditorModalProps = {
  role?: { id: number; name: string }
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  showTrigger?: boolean
  onSuccess?: () => void
}

const RoleEditorModal = ({
  role,
  open,
  onOpenChange,
  title,
  showTrigger,
  onSuccess,
}: RoleEditorModalProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    name: role?.name ?? "",
  })

  // Update form data when role prop changes
  useEffect(() => {
    if (role) {
      setFormData({ name: role.name })
    } else {
      setFormData({ name: "" })
    }
  }, [role])

  const createRoleMutation = useMutation({
    mutationFn: (name: string) => createRole(name),
    onSuccess: () => {
      toast.success("Role created")
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      toast.success("Role updated")
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // Handle form values change
  const handleValuesChange = (values: any) => {
    setFormData(values)
  }

  // Handle form submission
  const handleSubmit = (data: any) => {
    if (role) {
      updateRoleMutation.mutate({ id: role.id, name: data.name })
    } else if (data.name.length > 0) {
      createRoleMutation.mutate(data.name)
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        onOpenChange?.(open)
        if (!open) {
          // Reset form when dialog closes
          setFormData({ name: role?.name ?? "" })
        }
      }}
    >
      {showTrigger && (
        <Dialog.Trigger>
          <Button variant="outline">
            <PlusCircleIcon /> Add New Role
          </Button>
        </Dialog.Trigger>
      )}
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description className="sr-only">{title}</Dialog.Description>
        </Dialog.Header>

        <Flex direction="column" gap="4">
          <AutoForm
            formSchema={roleFormSchema.formSchema}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}
            values={formData}
            fieldConfig={roleFormSchema.fieldConfig}
          >
            <ReactiveButton
              type="submit"
              color="blue"
              loading={
                createRoleMutation.isPending || updateRoleMutation.isPending
              }
              className="w-full"
            >
              {role ? "Update" : "Create"}
            </ReactiveButton>
          </AutoForm>
        </Flex>

        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default RoleEditorModal
