"use client";
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState, useQueryStates, } from "nuqs";
import * as React from "react";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { getSortingStateParser } from "../lib/parsers";
export function useDataTable({ pageCount = -1, filterFields = [], enableAdvancedFilter = false, history = "replace", scroll = false, shallow = true, throttleMs = 50, debounceMs = 300, clearOnDefault = false, startTransition, initialState, ...props }) {
    const queryStateOptions = React.useMemo(() => {
        return {
            history,
            scroll,
            shallow,
            throttleMs,
            debounceMs,
            clearOnDefault,
            startTransition,
        };
    }, [
        history,
        scroll,
        shallow,
        throttleMs,
        debounceMs,
        clearOnDefault,
        startTransition,
    ]);
    const [rowSelection, setRowSelection] = React.useState(initialState?.rowSelection ?? {});
    const [columnVisibility, setColumnVisibility] = React.useState(initialState?.columnVisibility ?? {});
    const [page, setPage] = useQueryState("page", parseAsInteger.withOptions(queryStateOptions).withDefault(1));
    const [perPage, setPerPage] = useQueryState("pageSize", parseAsInteger
        .withOptions(queryStateOptions)
        .withDefault(initialState?.pagination?.pageSize ?? 10));
    const [sorting, setSorting] = useQueryState("sort", getSortingStateParser()
        .withOptions(queryStateOptions)
        .withDefault(initialState?.sorting ?? []));
    // Create parsers for each filter field
    const filterParsers = React.useMemo(() => {
        return filterFields.reduce((acc, field) => {
            if (field.options) {
                // Faceted filter
                acc[field.id] = parseAsArrayOf(parseAsString, ",").withOptions(queryStateOptions);
            }
            else {
                // Search filter
                acc[field.id] = parseAsString.withOptions(queryStateOptions);
            }
            return acc;
        }, {});
    }, [filterFields, queryStateOptions]);
    const [filterValues, setFilterValues] = useQueryStates(filterParsers);
    const debouncedSetFilterValues = useDebouncedCallback(setFilterValues, debounceMs);
    // Paginate
    const pagination = {
        pageIndex: page - 1, // zero-based index -> one-based index
        pageSize: perPage,
    };
    function onPaginationChange(updaterOrValue) {
        if (typeof updaterOrValue === "function") {
            const newPagination = updaterOrValue(pagination);
            void setPage(newPagination.pageIndex + 1);
            void setPerPage(newPagination.pageSize);
        }
        else {
            void setPage(updaterOrValue.pageIndex + 1);
            void setPerPage(updaterOrValue.pageSize);
        }
    }
    // Sort
    function onSortingChange(updaterOrValue) {
        if (typeof updaterOrValue === "function") {
            const newSorting = updaterOrValue(sorting);
            void setSorting(newSorting);
        }
    }
    // Filter
    const initialColumnFilters = React.useMemo(() => {
        return enableAdvancedFilter
            ? []
            : Object.entries(filterValues).reduce((filters, [key, value]) => {
                if (value !== null) {
                    filters.push({
                        id: key,
                        value: Array.isArray(value) ? value : [value],
                    });
                }
                return filters;
            }, []);
    }, [filterValues, enableAdvancedFilter]);
    const [columnFilters, setColumnFilters] = React.useState(initialColumnFilters);
    // Memoize computation of searchableColumns and filterableColumns
    const { searchableColumns, filterableColumns } = React.useMemo(() => {
        return enableAdvancedFilter
            ? { searchableColumns: [], filterableColumns: [] }
            : {
                searchableColumns: filterFields.filter((field) => !field.options),
                filterableColumns: filterFields.filter((field) => field.options),
            };
    }, [filterFields, enableAdvancedFilter]);
    const onColumnFiltersChange = React.useCallback((updaterOrValue) => {
        // Don't process filters if advanced filtering is enabled
        if (enableAdvancedFilter)
            return;
        setColumnFilters((prev) => {
            const next = typeof updaterOrValue === "function"
                ? updaterOrValue(prev)
                : updaterOrValue;
            const filterUpdates = next.reduce((acc, filter) => {
                if (searchableColumns.find((col) => col.id === filter.id)) {
                    // For search filters, use the value directly
                    acc[filter.id] = filter.value;
                }
                else if (filterableColumns.find((col) => col.id === filter.id)) {
                    // For faceted filters, use the array of values
                    acc[filter.id] = filter.value;
                }
                return acc;
            }, {});
            prev.forEach((prevFilter) => {
                if (!next.some((filter) => filter.id === prevFilter.id)) {
                    filterUpdates[prevFilter.id] = null;
                }
            });
            void setPage(1);
            debouncedSetFilterValues(filterUpdates);
            return next;
        });
    }, [
        debouncedSetFilterValues,
        enableAdvancedFilter,
        filterableColumns,
        searchableColumns,
        setPage,
    ]);
    const table = useReactTable({
        ...props,
        initialState,
        pageCount,
        state: {
            pagination,
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters: enableAdvancedFilter ? [] : columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange,
        onSortingChange,
        onColumnFiltersChange,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: enableAdvancedFilter
            ? undefined
            : getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: enableAdvancedFilter ? undefined : getFacetedRowModel(),
        getFacetedUniqueValues: enableAdvancedFilter
            ? undefined
            : getFacetedUniqueValues(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
    });
    return { table };
}
//# sourceMappingURL=use-data-table.js.map