import { filterParser, sortParser } from "@incmix/utils/data-table"
import type { Row } from "@tanstack/react-table"

import { createParser } from "nuqs/server"
import type { ExtendedSortingState, Filter } from "./types"

/**
 * Creates a parser for TanStack Table sorting state.
 * @param originalRow The original row data to validate sorting keys against.
 * @returns A parser for TanStack Table sorting state.
 */
export const getSortingStateParser = <TData>(
  originalRow?: Row<TData>["original"]
) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  return createParser<ExtendedSortingState<TData>>({
    parse: (value) => sortParser<ExtendedSortingState<TData>>(value, validKeys),
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc
      ),
  })
}

/**
 * Create a parser for data table filters.
 * @param originalRow The original row data to create the parser for.
 * @returns A parser for data table filters state.
 */
export const getFiltersStateParser = <T>(originalRow?: Row<T>["original"]) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  return createParser<Filter<T>[]>({
    parse: (value) => filterParser<Filter<T>[]>(value, validKeys),
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (filter, index) =>
          filter.id === b[index]?.id &&
          filter.value === b[index]?.value &&
          filter.type === b[index]?.type &&
          filter.operator === b[index]?.operator
      ),
  })
}
