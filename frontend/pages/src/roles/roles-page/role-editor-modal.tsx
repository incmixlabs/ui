import { Button, Dialog, toast } from "@incmix/ui/base"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { PlusCircleIcon } from "lucide-react"
import { z } from "zod"
import { createRole, updateRole } from "./actions"

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

  const form = useForm({
    defaultValues: {
      name: role?.name ?? "",
    },
    onSubmit: ({ value }) => {
      if (role) {
        updateRoleMutation.mutate({ id: role.id, name: value.name })
      } else if (value.name.length > 0) {
        createRoleMutation.mutate(value.name)
      }
    },
  })

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        onOpenChange?.(open)
        if (!open) {
          form.reset()
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

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Flex direction="column" gap="4">
            <form.Field
              name="name"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z.string().min(1, "Role Name is required"),
              }}
            >
              {(field) => (
                <FormField
                  name="name"
                  label="Role Name"
                  type="text"
                  field={field}
                />
              )}
            </form.Field>

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
          </Flex>
        </form>
        <DialogFooter className="mt-4 gap-2 sm:space-x-0">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </DialogFooter>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default RoleEditorModal
