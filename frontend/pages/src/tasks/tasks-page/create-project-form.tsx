"use client"

import { useAuth } from "@auth"
import { type ProjectDocType, useOrganizationStore } from "@incmix/store"
import AutoForm from "@incmix/ui/auto-form"
import { Button, Dialog, Flex, ReactiveButton, toast } from "@incmix/ui/base"
import type { Project } from "@incmix/utils/types"
import { useMutation } from "@tanstack/react-query"
import { nanoid } from "nanoid"
import { useState } from "react"
import { useRxCollection } from "rxdb-hooks"
import { createProjectFormSchema } from "./create-project-schema"

interface CreateProjectProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  onSuccess?: (data: Project) => void
}

export function CreateProjectForm({ onSuccess, ...props }: CreateProjectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedOrganisation } = useOrganizationStore()

  const collection = useRxCollection<ProjectDocType>("projects")
  const { authUser } = useAuth()

  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: ({ name, orgId }: { name: string; orgId: string }) => {
      if (!authUser) return Promise.reject(new Error("Not authenticated"))
      if (!selectedOrganisation)
        return Promise.reject(new Error("No organisation selected"))
      if (!collection)
        return Promise.reject(new Error("Database not initialized"))
      return collection.insert({
        name,
        orgId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: authUser.id,
        id: nanoid(7),
        updatedBy: authUser.id,
      })
    },
    onSuccess: (data) => {
      if (onSuccess)
        onSuccess({
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        })
      setIsOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (values: { [key: string]: any }) => {
    if (selectedOrganisation) {
      mutate({ name: values.name as string, orgId: selectedOrganisation.id })
    }
  }

  return (
    <>
      <Dialog.Root
        {...props}
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          reset()
        }}
      >
        <Dialog.Trigger>
          <Button className="inline-flex h-[35px] select-none items-center justify-center rounded bg-violet4 px-[15px] font-medium text-violet11 leading-none outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6">
            Create Project
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className="border border-gray-4">
          <Dialog.Header>
            <Dialog.Title>Create New Project</Dialog.Title>
            <Dialog.Description>
              Fill out the form to create a new project.
            </Dialog.Description>
          </Dialog.Header>
          <AutoForm
            formSchema={createProjectFormSchema.formSchema}
            fieldConfig={createProjectFormSchema.fieldConfig}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <ReactiveButton
              type="submit"
              color="blue"
              loading={isPending}
              success={isSuccess}
              className="w-full"
            >
              Create
            </ReactiveButton>
          </AutoForm>
          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
