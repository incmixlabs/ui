import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { PlusCircleIcon } from "lucide-react"
import { z } from "zod"

import { Button, Dialog, Flex, Form, ReactiveButton, toast } from "@incmix/ui"
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
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
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
      <Dialog.Trigger asChild>
        <Button size="2">
          <PlusCircleIcon /> Add New Role
        </Button>
      </Dialog.Trigger>
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
                <Form.Field
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
