import type { filterSchema } from "@incmix/utils/data-table"
import type { ColumnSort, Row } from "@tanstack/react-table"
import type { z } from "zod"
import type { DataTableConfig } from "./config"

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type StringKeyOf<TData> = Extract<keyof TData, string>

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: StringKeyOf<TData>
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[]

export type ColumnType = DataTableConfig["columnTypes"][number]

export type FilterOperator = DataTableConfig["operators"][number]

export type JoinOperator = DataTableConfig["joinOperators"][number]["value"]

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>
  label: string
  placeholder?: string
  options?: Option[]
}

export interface DataTableAdvancedFilterField<TData>
  extends DataTableFilterField<TData> {
  type: ColumnType
}

export type Filter<TData> = Prettify<
  Omit<z.infer<typeof filterSchema>, "id"> & {
    id: StringKeyOf<TData>
  }
>

export interface DataTableRowAction<TData> {
  row: Row<TData>
  type: "update" | "delete" | "changePassword"
}

export interface QueryBuilderOpts {
  where?: string
  orderBy?: string
  distinct?: boolean
  nullish?: boolean
}

export type { ColumnDef } from "@tanstack/react-table"
