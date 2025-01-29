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
import type { Board, Column } from "@incmix/utils/types"
import { Button, Flex, Select, TextField } from "@radix-ui/themes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type React from "react"
import { useMemo, useState } from "react"
import { createColumn, getColumns } from "./actions"
import { nanoid } from "nanoid"
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
  const [isOpen, setIsOpen] = useState(false)
  const [parentId, setParentId] = useState<string>("")

  const columnsQuery = useQuery({
    queryKey: ["columns", projectId],
    queryFn: () => getColumns(projectId),
  })
  const columnOrderQuery = useQuery({
    queryKey: ["columns", parentId, projectId],
    queryFn: () => getColumns(projectId, parentId),
  })

  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: (data: {
      label: string
      projectId: string
      parentId?: string
      columnOrder: number
    }) => {
      return createColumn(data)
    },
    onSettled: () => {
      columnsQuery.refetch()
      columnOrderQuery.refetch()
      queryClient
        .invalidateQueries({ queryKey: ["board", projectId] })
        .then(() => setIsOpen(false))
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

  const defaultOrder = useMemo(() => {
    if (!columnOrderQuery.data) return 0
    if (columnOrderQuery.data.length === 1) return 1
    return columnOrderQuery.data.length
  }, [columnOrderQuery.data])

  return (
    <Dialog
      {...props}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        reset()
      }}
    >
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
              <Select.Root
                name="columnOrder"
                defaultValue={String(defaultOrder)}
              >
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
