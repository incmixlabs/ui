"use client"

import { useAuth } from "@auth"
import type { TaskCollections } from "@incmix/store"
import {
  Button,
  Dialog,
  Flex,
  ReactiveButton,
  Select,
  TextField,
  toast,
} from "@incmix/ui/base"
import type { Task, TaskStatus } from "@incmix/utils/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { nanoid } from "nanoid"
import type React from "react"
import { useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

interface CreateTaskProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  projectId: string
  onSuccess?: (data: Task) => void
}

export function CreateTaskForm({
  onSuccess,
  projectId,
  ...props
}: CreateTaskProps) {
  const { authUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const db: RxDatabase<TaskCollections> = useRxDB()
  const columnsQuery = useQuery({
    queryKey: ["columns", projectId],
    queryFn: () => {
      return db.columns
        .find({
          selector: {
            projectId,
          },
        })
        .exec()
    },
    refetchOnMount: true,
  })

  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: (data: {
      content: string
      projectId: string
      columnId: string
      taskOrder: number
      assignedTo: string
      status: TaskStatus
    }) => {
      return db.tasks.insert({
        id: nanoid(7),
        content: data.content,
        projectId: data.projectId,
        columnId: data.columnId,
        taskOrder: data.taskOrder,
        assignedTo: data.assignedTo,
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: authUser?.id ?? "",
        updatedBy: authUser?.id ?? "",
      })
    },
    onSuccess: (data) => {
      setIsOpen(false)
      if (onSuccess)
        onSuccess({
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    if (authUser)
      mutate({
        assignedTo: authUser.id,
        columnId: formdata.get("columnId") as string,
        content: formdata.get("content") as string,
        projectId,
        status: "todo",
        taskOrder: 0,
      })
  }

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
        <Button>Add Task</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Add New Task</Dialog.Title>
          <Dialog.Description>Add New Task to Board</Dialog.Description>
        </Dialog.Header>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <TextField.Root name="content" placeholder="Task Title" />
            <Select.Root name="columnId">
              <Select.Trigger
                className="w-full max-w-96"
                placeholder={
                  columnsQuery.isLoading ? "Loading" : "Select Column"
                }
              />
              <Select.Content>
                {columnsQuery.isLoading && <div>Loading...</div>}
                {columnsQuery.isError && <div>Error fetching columns</div>}
                <Select.Item value={"none"}>None</Select.Item>
                {columnsQuery.data?.map((c) => (
                  <Select.Item key={`column_${c.id}`} value={c.id}>
                    {c.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

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
