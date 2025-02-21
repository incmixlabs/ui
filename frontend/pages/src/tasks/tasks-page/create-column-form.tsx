"use client"

import { useAuth } from "@auth"
import type { TaskCollections } from "@incmix/store"
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
import { nanoid } from "nanoid"
import type React from "react"
import { useMemo, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"
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
  const [isOpen, setIsOpen] = useState(false)
  const [parentId, setParentId] = useState<string>("")
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
  })
  const columnOrderQuery = useQuery({
    queryKey: ["columns", parentId, projectId],
    queryFn: () => {
      if (!parentId.length)
        return db.columns
          .find({
            selector: {
              projectId,
            },
            sort: [{ columnOrder: "asc" }],
          })
          .exec()
      return db.columns
        .find({
          selector: {
            projectId,
            parentId,
          },
          sort: [{ columnOrder: "asc" }],
        })
        .exec()
    },
  })

  const queryClient = useQueryClient()
  const { authUser } = useAuth()
  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: (data: {
      label: string
      projectId: string
      parentId?: string
      columnOrder: number
    }) => {
      return db.columns.insert({
        id: nanoid(7),
        label: data.label,
        projectId: data.projectId,
        parentId: data.parentId ?? null,
        columnOrder: data.columnOrder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: authUser?.id ?? "",
        updatedBy: authUser?.id ?? "",
      })
    },
    onSuccess: async (data) => {
      await db.columns
        .find({
          selector: {
            projectId,
            id: { $ne: data.id },
            columnOrder: { $gte: data.columnOrder },
          },
        })
        .update({ $inc: { columnOrder: 1 } })
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
    const order = Number.parseInt(
      formdata.get("columnOrder")?.toString() ?? "-1"
    )
    const columnOrder =
      order < 0
        ? (columnOrderQuery.data?.length.toString() ?? "0")
        : (formdata.get("columnOrder")?.toString() ?? "0")
    const data = {
      label: formdata.get("label")?.toString() ?? "",
      projectId: projectId,
      parentId: parentId.length > 0 ? parentId : undefined,
      columnOrder: Number.parseInt(columnOrder),
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
                    <Select.Item
                      key={`order_${c.id}`}
                      value={String(c.columnOrder + 1)}
                    >
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
