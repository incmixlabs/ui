"use client"

import type { Table } from "@tanstack/react-table"
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  ListFilter,
  Trash2,
} from "lucide-react"
import { customAlphabet } from "nanoid"
import { parseAsStringEnum, useQueryState } from "nuqs"
import * as React from "react"

import type {
  DataTableAdvancedFilterField,
  Filter,
  FilterOperator,
  JoinOperator,
  StringKeyOf,
} from "./lib/types"

import { Badge, Button, Select,  Calendar, Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, Input, Popover, PopoverContent, PopoverTrigger } from "@base"
import { cn } from "@utils/cn"
import { useDebouncedCallback } from "./hooks"
import { dataTableConfig } from "./lib/config"
import { getDefaultFilterOperator, getFilterOperators } from "./lib/data-table"
import { getFiltersStateParser } from "./lib/parsers"

import {
  FacetedFilter,
  FacetedFilterContent,
  FacetedFilterEmpty,
  FacetedFilterGroup,
  FacetedFilterInput,
  FacetedFilterItem,
  FacetedFilterList,
  FacetedFilterTrigger,
} from "./faceted-filter"
import { formatDate } from "./lib/utils"

interface DataTableFilterListProps<TData> {
  table: Table<TData>
  filterFields: DataTableAdvancedFilterField<TData>[]
  debounceMs: number
  shallow?: boolean
}

export function DataTableFilterList<TData>({
  table,
  filterFields,
  debounceMs,
  shallow,
}: DataTableFilterListProps<TData>) {
  const id = React.useId()
  const [filters, setFilters] = useQueryState(
    "filters",
    getFiltersStateParser(table.getRowModel().rows[0]?.original)
      .withDefault([])
      .withOptions({
        clearOnDefault: true,
        shallow,
      })
  )

  const [joinOperator, setJoinOperator] = useQueryState(
    "joinOperator",
    parseAsStringEnum(["and", "or"]).withDefault("and").withOptions({
      clearOnDefault: true,
      shallow,
    })
  )

  const debouncedSetFilters = useDebouncedCallback(setFilters, debounceMs)

  function addFilter() {
    const filterField = filterFields[0]

    if (!filterField) return

    void setFilters([
      ...filters,
      {
        id: filterField.id,
        value: "",
        type: filterField.type,
        operator: getDefaultFilterOperator(filterField.type),
        rowId: customAlphabet(
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
          6
        )(),
      },
    ])
  }

  function updateFilter({
    rowId,
    field,
    debounced = false,
  }: {
    rowId: string
    field: Omit<Partial<Filter<TData>>, "rowId">
    debounced?: boolean
  }) {
    const updateFunction = debounced ? debouncedSetFilters : setFilters
    updateFunction((prevFilters) => {
      const updatedFilters = prevFilters.map((filter) => {
        if (filter.rowId === rowId) {
          return { ...filter, ...field }
        }
        return filter
      })
      return updatedFilters
    })
  }

  function removeFilter(rowId: string) {
    const updatedFilters = filters.filter((filter) => filter.rowId !== rowId)
    void setFilters(updatedFilters)
  }

  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  function moveFilter(activeIndex: number, overIndex: number) {
    void setFilters((prevFilters) => {
      const newFilters = [...prevFilters]
      const [removed] = newFilters.splice(activeIndex, 1)
      if (!removed) return prevFilters
      newFilters.splice(overIndex, 0, removed)
      return newFilters
    })
  }

  function renderFilterInput({
    filter,
    inputId,
  }: {
    filter: Filter<TData>
    inputId: string
  }) {
    const filterField = filterFields.find((f) => f.id === filter.id)

    if (!filterField) return null

    if (filter.operator === "isEmpty" || filter.operator === "isNotEmpty") {
      return (
        <div
          id={inputId}
          role="status"
          aria-live="polite"
          aria-label={`${filterField.label} filter is ${filter.operator === "isEmpty" ? "empty" : "not empty"}`}
          className="h-8 w-full rounded border border-dashed"
        />
      )
    }

    switch (filter.type) {
      case "text":
      case "number":
        return (
          <Input
            id={inputId}
            type={filter.type}
            aria-label={`${filterField.label} filter value`}
            aria-describedby={`${inputId}-description`}
            placeholder={filterField.placeholder ?? "Enter a value..."}
            className="h-8 w-full rounded"
            defaultValue={
              typeof filter.value === "string" ? filter.value : undefined
            }
            onChange={(event: any) =>
              updateFilter({
                rowId: filter.rowId,
                field: { value: event.target.value },
                debounced: true,
              })
            }
          />
        )
      case "select":
        return (
          <FacetedFilter>
            <FacetedFilterTrigger>
              <Button
                id={inputId}
                variant="outline"
                size="1"
                aria-label={`${filterField.label} filter value`}
                aria-controls={`${inputId}-listbox`}
                className="h-8 w-full justify-start gap-2 rounded px-1.5 text-left text-muted-foreground hover:text-muted-foreground"
              >
                {filter.value && typeof filter.value === "string" ? (
                  <Badge className="rounded-sm px-1 font-normal">
                    {filterField?.options?.find(
                      (option) => option.value === filter.value
                    )?.label || filter.value}
                  </Badge>
                ) : (
                  <>
                    {filterField.placeholder ?? "Select an option..."}
                    <ChevronsUpDown className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </FacetedFilterTrigger>
            <FacetedFilterContent
              id={`${inputId}-listbox`}
              className="w-[12.5rem] origin-[var(--radix-popover-content-transform-origin)]"
            >
              <FacetedFilterInput
                placeholder={filterField?.label ?? "Search options..."}
                aria-label={`Search ${filterField?.label} options`}
              />
              <FacetedFilterList>
                <FacetedFilterEmpty>No options found.</FacetedFilterEmpty>
                <FacetedFilterGroup>
                  {filterField?.options?.map((option) => (
                    <FacetedFilterItem
                      key={option.value}
                      value={option.value}
                      selected={filter.value === option.value}
                      onSelect={(value) => {
                        updateFilter({ rowId: filter.rowId, field: { value } })
                        setTimeout(() => {
                          document.getElementById(inputId)?.click()
                        }, 0)
                      }}
                    >
                      {option.icon && (
                        <option.icon
                          className="mr-2 size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      )}
                      <span>{option.label}</span>
                      {option.count && (
                        <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                          {option.count}
                        </span>
                      )}
                    </FacetedFilterItem>
                  ))}
                </FacetedFilterGroup>
              </FacetedFilterList>
            </FacetedFilterContent>
          </FacetedFilter>
        )
      case "multi-select": {
        const selectedValues = new Set(
          Array.isArray(filter.value) ? filter.value : []
        )

        return (
          <FacetedFilter>
            <FacetedFilterTrigger>
              <Button
                id={inputId}
                variant="outline"
                size="1"
                aria-label={`${filterField.label} filter values`}
                aria-controls={`${inputId}-listbox`}
                className="h-8 w-full justify-start gap-2 rounded px-1.5 text-left text-muted-foreground hover:text-muted-foreground"
              >
                {selectedValues.size === 0 && (
                  <>
                    {filterField.placeholder ?? " Select options..."}
                    <ChevronsUpDown className="size-4" aria-hidden="true" />
                  </>
                )}
                {selectedValues?.size > 0 && (
                  <div className="flex items-center">
                    <Badge className="rounded-sm px-1 font-normal lg:hidden">
                      {selectedValues.size}
                    </Badge>
                    <div className="hidden min-w-0 gap-1 lg:flex">
                      {selectedValues.size > 2 ? (
                        <Badge className="rounded-sm px-1 font-normal">
                          {selectedValues.size} selected
                        </Badge>
                      ) : (
                        filterField?.options
                          ?.filter((option) => selectedValues.has(option.value))
                          .map((option) => (
                            <Badge
                              key={option.value}
                              className="truncate rounded-sm px-1 font-normal"
                            >
                              {option.label}
                            </Badge>
                          ))
                      )}
                    </div>
                  </div>
                )}
              </Button>
            </FacetedFilterTrigger>
            <FacetedFilterContent
              id={`${inputId}-listbox`}
              className="w-[12.5rem] origin-[var(--radix-popover-content-transform-origin)]"
            >
              <FacetedFilterInput
                aria-label={`Search ${filterField?.label} options`}
                placeholder={filterField?.label ?? "Search options..."}
              />
              <FacetedFilterList>
                <FacetedFilterEmpty>No options found.</FacetedFilterEmpty>
                <FacetedFilterGroup>
                  {filterField?.options?.map((option) => (
                    <FacetedFilterItem
                      key={option.value}
                      value={option.value}
                      selected={selectedValues.has(option.value)}
                      onSelect={(value) => {
                        const currentValue = Array.isArray(filter.value)
                          ? filter.value
                          : []
                        const newValue = currentValue.includes(value)
                          ? currentValue.filter((v) => v !== value)
                          : [...currentValue, value]
                        updateFilter({
                          rowId: filter.rowId,
                          field: { value: newValue },
                        })
                      }}
                    >
                      {option.icon && (
                        <option.icon
                          className="mr-2 size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      )}
                      <span>{option.label}</span>
                      {option.count && (
                        <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                          {option.count}
                        </span>
                      )}
                    </FacetedFilterItem>
                  ))}
                </FacetedFilterGroup>
              </FacetedFilterList>
            </FacetedFilterContent>
          </FacetedFilter>
        )
      }
      case "date": {
        const dateValue = Array.isArray(filter.value)
          ? filter.value.filter(Boolean)
          : [filter.value, filter.value].filter(Boolean)

        const displayValue =
          filter.operator === "isBetween" && dateValue.length === 2
            ? `${formatDate(dateValue[0] ?? new Date())} - ${formatDate(
                dateValue[1] ?? new Date()
              )}`
            : dateValue[0]
              ? formatDate(dateValue[0])
              : "Pick a date"

        return (
          <Popover>
            <PopoverTrigger>
              <Button
                id={inputId}
                variant="outline"
                size="1"
                aria-label={`${filterField.label} date filter`}
                aria-controls={`${inputId}-calendar`}
                className={cn(
                  "h-8 w-full justify-start gap-2 rounded text-left font-normal",
                  !filter.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{displayValue}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              id={`${inputId}-calendar`}
              align="start"
              className="w-auto p-0"
            >
              {filter.operator === "isBetween" ? (
                <Calendar
                  id={`${inputId}-calendar`}
                  mode="range"
                  aria-label={`Select ${filterField.label} date range`}
                  selected={
                    dateValue.length === 2
                      ? {
                          from: new Date(dateValue[0] ?? ""),
                          to: new Date(dateValue[1] ?? ""),
                        }
                      : {
                          from: new Date(),
                          to: new Date(),
                        }
                  }
                  onSelect={(date) => {
                    updateFilter({
                      rowId: filter.rowId,
                      field: {
                        value: date
                          ? [
                              date.from?.toISOString() ?? "",
                              date.to?.toISOString() ?? "",
                            ]
                          : [],
                      },
                    })
                  }}
                  initialFocus
                  numberOfMonths={1}
                />
              ) : (
                <Calendar
                  id={`${inputId}-calendar`}
                  mode="single"
                  aria-label={`Select ${filterField.label} date`}
                  selected={dateValue[0] ? new Date(dateValue[0]) : undefined}
                  onSelect={(date) => {
                    updateFilter({
                      rowId: filter.rowId,
                      field: { value: date?.toISOString() ?? "" },
                    })

                    setTimeout(() => {
                      document.getElementById(inputId)?.click()
                    }, 0)
                  }}
                  autoFocus
                />
              )}
            </PopoverContent>
          </Popover>
        )
      }
      case "boolean": {
        if (Array.isArray(filter.value)) return null

        return (
          <Select.Root
            value={filter.value}
            onValueChange={(value) =>
              updateFilter({ rowId: filter.rowId, field: { value } })
            }
          >
            <Select.Trigger
              id={inputId}
              aria-label={`${filterField.label} boolean filter`}
              aria-controls={`${inputId}-listbox`}
              className="h-8 w-full rounded bg-transparent"
            />

            <Select.Content id={`${inputId}-listbox`}>
              <Select.Item value="true">True</Select.Item>
              <Select.Item value="false">False</Select.Item>
            </Select.Content>
          </Select.Root>
        )
      }
      default:
        return null
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          size="1"
          className="gap-2"
          aria-label="Open filters"
          aria-controls={`${id}-filter-dialog`}
        >
          <ListFilter className="size-3" aria-hidden="true" />
          Filters
          {filters.length > 0 && (
            <Badge className="h-[1.14rem] rounded-[0.2rem] px-[0.32rem] font-mono font-normal text-[0.65rem]">
              {filters.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={`${id}-filter-dialog`}
        align="start"
        collisionPadding={16}
        className={cn(
          "flex w-[calc(100vw-theme(spacing.12))] min-w-64 max-w-none origin-[var(--radix-popover-content-transform-origin)] flex-col p-4 sm:w-[36rem]",
          filters.length > 0 ? "gap-3.5" : "gap-2"
        )}
      >
        {filters.length > 0 ? (
          <h4 className="font-medium leading-none">Filters</h4>
        ) : (
          <div className="flex flex-col gap-1">
            <h4 className="font-medium leading-none">No filters applied</h4>
            <p className="text-muted-foreground text-sm">
              Add filters to refine your results.
            </p>
          </div>
        )}
        <div className="flex max-h-40 flex-col gap-2 overflow-y-auto py-0.5 pr-1">
          {filters.map((filter, index) => {
            const filterId = `${id}-filter-${filter.rowId}`
            const joinOperatorListboxId = `${filterId}-join-operator-listbox`
            const fieldListboxId = `${filterId}-field-listbox`
            const fieldTriggerId = `${filterId}-field-trigger`
            const operatorListboxId = `${filterId}-operator-listbox`
            const inputId = `${filterId}-input`

            return (
              <div key={filter.rowId} className="flex items-center gap-2">
                <div className="min-w-[4.5rem] text-center">
                  {index === 0 ? (
                    <span className="text-muted-foreground text-sm">Where</span>
                  ) : index === 1 ? (
                    <Select.Root
                      value={joinOperator}
                      onValueChange={(value: JoinOperator) =>
                        setJoinOperator(value)
                      }
                    >
                      <Select.Trigger
                        aria-label="Select join operator"
                        aria-controls={joinOperatorListboxId}
                        className="h-8 rounded lowercase"
                      />

                      <Select.Content
                        id={joinOperatorListboxId}
                        position="popper"
                        className="z-50 min-w-[var(--radix-select-trigger-width)] lowercase"
                      >
                        {dataTableConfig.joinOperators.map((op) => (
                          <Select.Item key={op.value} value={op.value}>
                            {op.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {joinOperator}
                    </span>
                  )}
                </div>
                <Popover modal>
                  <PopoverTrigger>
                    <Button
                      id={fieldTriggerId}
                      variant="outline"
                      size="1"
                      aria-label="Select filter field"
                      aria-controls={fieldListboxId}
                      className="h-8 w-32 justify-between gap-2 rounded focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-0"
                    >
                      <span className="truncate">
                        {filterFields.find((field) => field.id === filter.id)
                          ?.label ?? "Select field"}
                      </span>
                      <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    id={fieldListboxId}
                    align="start"
                    className="w-40 p-0"
                    onCloseAutoFocus={() =>
                      document.getElementById(fieldTriggerId)?.focus({
                        preventScroll: true,
                      })
                    }
                  >
                    <Command>
                      <CommandInput placeholder="Search fields..." />
                      <CommandList>
                        <CommandEmpty>No fields found.</CommandEmpty>
                        <CommandGroup>
                          {filterFields.map((field) => (
                            <CommandItem
                              key={field.id}
                              value={field.id}
                              onSelect={(value) => {
                                const filterField = filterFields.find(
                                  (col) => col.id === value
                                )

                                if (!filterField) return

                                updateFilter({
                                  rowId: filter.rowId,
                                  field: {
                                    id: value as StringKeyOf<TData>,
                                    type: filterField.type,
                                    operator: getDefaultFilterOperator(
                                      filterField.type
                                    ),
                                    value: "",
                                  },
                                })

                                document.getElementById(fieldTriggerId)?.click()
                              }}
                            >
                              <span className="mr-1.5 truncate">
                                {field.label}
                              </span>
                              <Check
                                className={cn(
                                  "ml-auto size-4 shrink-0",
                                  field.id === filter.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Select.Root
                  value={filter.operator}
                  onValueChange={(value: FilterOperator) =>
                    updateFilter({
                      rowId: filter.rowId,
                      field: {
                        operator: value,
                        value:
                          value === "isEmpty" || value === "isNotEmpty"
                            ? ""
                            : filter.value,
                      },
                    })
                  }
                >
                  <Select.Trigger
                    aria-label="Select filter operator"
                    aria-controls={operatorListboxId}
                    className="h-8 w-32 truncate rounded"
                  />

                  <Select.Content
                    id={operatorListboxId}
                    position="popper"
                    className="z-50"
                  >
                    {getFilterOperators(filter.type).map((op) => (
                      <Select.Item key={op.value} value={op.value}>
                        {op.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                <div className="min-w-36 flex-1">
                  {renderFilterInput({ filter, inputId })}
                </div>
                <Button
                  variant="outline"
                  size="1"
                  aria-label={`Remove filter ${index + 1}`}
                  className="size-8 shrink-0 rounded"
                  onClick={() => removeFilter(filter.rowId)}
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
            )
          })}
        </div>
        <div className="flex w-full items-center gap-2">
          <Button size="1" className="h-[1.85rem] rounded" onClick={addFilter}>
            Add filter
          </Button>
          {filters.length > 0 ? (
            <Button
              size="1"
              variant="outline"
              className="rounded"
              onClick={() => {
                void setFilters(null)
                void setJoinOperator("and")
              }}
            >
              Reset filters
            </Button>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  )
}
