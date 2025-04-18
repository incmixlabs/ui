"use client"

import { useAuth } from "@auth"
import { type ProjectDocType, useOrganizationStore } from "@incmix/store"
import {
  Button,
  Dialog,
  Flex,
  FormField,
  ReactiveButton,
  toast,
} from "@incmix/ui/base"
import type { Project } from "@incmix/utils/types"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { nanoid } from "nanoid"
import { useState } from "react"
import { useRxCollection } from "rxdb-hooks"
import { z } from "zod"

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
    <Dialog.Root
      {...props}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        reset()
      }}
    >
      <Dialog.Trigger>
        <Button>Create Project</Button>
      </Dialog.Trigger>
      <Dialog.Content className="border border-gray-4">
        <Dialog.Header>
          <Dialog.Title>Create New Project</Dialog.Title>
          <Dialog.Description>
            Fill out the form to create a new project.
          </Dialog.Description>
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
                onChange: z.string().min(1, "Name is Required"),
              }}
            >
              {(field) => (
                <FormField name="name" label="Project Name" field={field} />
              )}
            </form.Field>

            <ReactiveButton
              type="submit"
              color="blue"
              loading={isPending}
              success={isSuccess}
              className="w-full"
            >
              Create
            </ReactiveButton>
          </Flex>
        </form>
        <Dialog.Footer className="gap-2 sm:space-x-0">
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
