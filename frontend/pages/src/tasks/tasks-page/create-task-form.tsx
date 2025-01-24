"use client"

import { useAuth } from "@auth"
import { usePGlite } from "@electric-sql/pglite-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ReactiveButton,
  toast,
} from "@incmix/ui"
import type { Task, TaskStatus } from "@incmix/utils/types"
import { Button, Flex, Select, TextField } from "@radix-ui/themes"
import { useMutation, useQuery } from "@tanstack/react-query"
import type React from "react"
import { createTask, getColumns } from "./actions"

interface CreateTaskProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  projectId: string
  onSuccess?: (data: Task) => void
}

export function CreateTaskForm({
  onSuccess,
  projectId,
  ...props
}: CreateTaskProps) {
  const columnsQuery = useQuery({
    queryKey: ["columns", projectId],
    queryFn: () => getColumns(projectId),
  })
  const db = usePGlite()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: {
      content: string
      projectId: string
      columnId: string
      taskOrder: number
      assignedTo: string
      status: TaskStatus
    }) => {
      return createTask(data, db)
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const { authUser } = useAuth()
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
    <Dialog {...props}>
      <DialogTrigger>
        <Button>Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Add New Task to Board</DialogDescription>
        </DialogHeader>

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
