"use client"

import { useOrganizationStore } from "@incmix-fe/store"
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
} from "@incmix-fe/ui"
import { Button, Flex } from "@radix-ui/themes"
import type { Project } from "@jsprtmnn/utils/types"
import { useMutation } from "@tanstack/react-query"
import { Form } from "houseform"
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
        <Form
          onSubmit={(values) => {
            if (selectedOrganisation)
              mutate({ name: values.name, orgId: selectedOrganisation.id })
          }}
        >
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <Flex direction="column" gap="4">
                <FormField
                  name="name"
                  label={"Project Name"}
                  validation={z.string().min(1, "Name is Required")}
                />
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
          )}
        </Form>
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
