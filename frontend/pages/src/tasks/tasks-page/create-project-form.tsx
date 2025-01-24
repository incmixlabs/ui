"use client"

import { useOrganizationStore } from "@incmix/store"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormField,
  ReactiveButton,
  toast,
} from "@incmix/ui"
import type { Project } from "@jsprt/utils/types/tasks"
import { Button, Flex } from "@radix-ui/themes"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { z } from "zod"
import { createProject } from "./actions"

interface CreateProjectProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  onSuccess?: (data: Project) => void
}

export function CreateProjectForm({ onSuccess, ...props }: CreateProjectProps) {
  const { selectedOrganisation } = useOrganizationStore()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ name, orgId }: { name: string; orgId: string }) => {
      return createProject({ name, orgId })
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: ({ value }) => {
      if (selectedOrganisation) {
        mutate({ name: value.name, orgId: selectedOrganisation.id })
      }
    },
  })

  return (
    <Dialog {...props}>
      <DialogTrigger>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new project.
          </DialogDescription>
        </DialogHeader>
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
                onChange: z.string().min(1, "Name is Required"),
              }}
            >
              {(field) => (
                <FormField name="name" label="Project Name" field={field} />
              )}
            </form.Field>
            <DialogClose>
              <ReactiveButton
                type="submit"
                color="blue"
                loading={isPending}
                success={isSuccess}
                className="w-full"
              >
                Create
              </ReactiveButton>
            </DialogClose>
          </Flex>
        </form>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
