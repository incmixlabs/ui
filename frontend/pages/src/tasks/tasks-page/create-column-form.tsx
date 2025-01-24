"use client"

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
import type { Column } from "@incmix/utils/types"
import { Button, Flex, Select, TextField } from "@radix-ui/themes"
import { useMutation, useQuery } from "@tanstack/react-query"
import type React from "react"
import { useState } from "react"
import { createColumn, getColumns } from "./actions"

interface CreateColumnProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  projectId: string
  onSuccess?: (data: Column) => void
}

export function CreateColumnForm({
  onSuccess,
  projectId,
  ...props
}: CreateColumnProps) {
  const [parentId, setParentId] = useState<string>("")

  const columnsQuery = useQuery({
    queryKey: ["columns", projectId],
    queryFn: () => getColumns(projectId),
  })
  const columnOrderQuery = useQuery({
    queryKey: ["columns", parentId, projectId],
    queryFn: () => getColumns(projectId, parentId),
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: {
      label: string
      projectId: string
      parentId?: string
      columnOrder: number
    }) => {
      return createColumn(data)
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    const columnOrder = formdata.get("columnOrder") as string | null
    const data = {
      label: formdata.get("label") as string,
      projectId: projectId,
      parentId: parentId.length > 0 ? parentId : undefined,
      columnOrder: Number.parseInt(columnOrder ?? "0"),
    }
    mutate(data)
  }

  return (
    <Dialog {...props}>
      <DialogTrigger>
        <Button>Add Column</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>Add New Column to Board</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <TextField.Root name="label" placeholder="Column Label" />
            <Select.Root
              name="parentId"
              value={parentId}
              onValueChange={(v) => setParentId(v === "none" ? "" : v)}
            >
              <Select.Trigger
                className="w-full max-w-96"
                placeholder={
                  columnsQuery.isLoading ? "Loading" : "Select Parent Column"
                }
              />
              <Select.Content>
                {columnsQuery.isLoading && <div>Loading...</div>}
                {columnsQuery.isError && <div>Error fetching columns</div>}
                <Select.Item value={"none"}>None</Select.Item>
                {columnsQuery.data?.map((c) => (
                  <Select.Item key={`parent_${c.id}`} value={c.id}>
                    {c.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            {!!columnOrderQuery.data?.length && (
              <Select.Root name="columnOrder" defaultValue="0">
                <Select.Trigger
                  className="w-full max-w-96"
                  placeholder={
                    columnOrderQuery.isLoading ? "Loading" : "Column Position"
                  }
                />
                <Select.Content>
                  {columnOrderQuery.isLoading && <div>Loading...</div>}
                  {columnOrderQuery.isError && (
                    <div>Error fetching columns</div>
                  )}
                  <Select.Item value={String(0)}>
                    Before {columnOrderQuery.data?.[0].label}
                  </Select.Item>
                  {columnOrderQuery.data?.map((c) => (
                    <Select.Item key={c.id} value={String(c.columnOrder + 1)}>
                      After {c.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
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
