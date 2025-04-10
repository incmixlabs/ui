/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarIcon, Check, ChevronsUpDown, ListFilter, Trash2, } from "lucide-react";
import { customAlphabet } from "nanoid";
import { parseAsStringEnum, useQueryState } from "nuqs";
import * as React from "react";
import { useDebouncedCallback } from "@/hooks";
import { cn } from "@/lib/utils";
import { Badge } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { dataTableConfig } from "./lib/config";
import { getDefaultFilterOperator, getFilterOperators } from "./lib/data-table";
import { getFiltersStateParser } from "./lib/parsers";
import { Calendar, Command, Input, Popover, Select } from "@/components/base";
import { formatDate } from "@/lib/utils/date";
import { FacetedFilter, FacetedFilterContent, FacetedFilterEmpty, FacetedFilterGroup, FacetedFilterInput, FacetedFilterItem, FacetedFilterList, FacetedFilterTrigger, } from "./faceted-filter";
export function DataTableFilterList({ table, filterFields, debounceMs, shallow, }) {
    const id = React.useId();
    const [filters, setFilters] = useQueryState("filters", getFiltersStateParser(table.getRowModel().rows[0]?.original)
        .withDefault([])
        .withOptions({
        clearOnDefault: true,
        shallow,
    }));
    const [joinOperator, setJoinOperator] = useQueryState("joinOperator", parseAsStringEnum(["and", "or"]).withDefault("and").withOptions({
        clearOnDefault: true,
        shallow,
    }));
    const debouncedSetFilters = useDebouncedCallback(setFilters, debounceMs);
    function addFilter() {
        const filterField = filterFields[0];
        if (!filterField)
            return;
        void setFilters([
            ...filters,
            {
                id: filterField.id,
                value: "",
                type: filterField.type,
                operator: getDefaultFilterOperator(filterField.type),
                rowId: customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 6)(),
            },
        ]);
    }
    function updateFilter({ rowId, field, debounced = false, }) {
        const updateFunction = debounced ? debouncedSetFilters : setFilters;
        updateFunction((prevFilters) => {
            const updatedFilters = prevFilters.map((filter) => {
                if (filter.rowId === rowId) {
                    return { ...filter, ...field };
                }
                return filter;
            });
            return updatedFilters;
        });
    }
    function removeFilter(rowId) {
        const updatedFilters = filters.filter((filter) => filter.rowId !== rowId);
        void setFilters(updatedFilters);
    }
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    function moveFilter(activeIndex, overIndex) {
        void setFilters((prevFilters) => {
            const newFilters = [...prevFilters];
            const [removed] = newFilters.splice(activeIndex, 1);
            if (!removed)
                return prevFilters;
            newFilters.splice(overIndex, 0, removed);
            return newFilters;
        });
    }
    function renderFilterInput({ filter, inputId, }) {
        const filterField = filterFields.find((f) => f.id === filter.id);
        if (!filterField)
            return null;
        if (filter.operator === "isEmpty" || filter.operator === "isNotEmpty") {
            return (_jsx("div", { id: inputId, role: "status", "aria-live": "polite", "aria-label": `${filterField.label} filter is ${filter.operator === "isEmpty" ? "empty" : "not empty"}`, className: "h-8 w-full rounded border border-dashed" }));
        }
        switch (filter.type) {
            case "text":
            case "number":
                return (_jsx(Input, { id: inputId, type: filter.type, "aria-label": `${filterField.label} filter value`, "aria-describedby": `${inputId}-description`, placeholder: filterField.placeholder ?? "Enter a value...", className: "h-8 w-full rounded", defaultValue: typeof filter.value === "string" ? filter.value : undefined, onChange: (event) => updateFilter({
                        rowId: filter.rowId,
                        field: { value: event.target.value },
                        debounced: true,
                    }) }));
            case "select":
                return (_jsxs(FacetedFilter, { children: [_jsx(FacetedFilterTrigger, { children: _jsx(Button, { id: inputId, variant: "outline", size: "1", "aria-label": `${filterField.label} filter value`, "aria-controls": `${inputId}-listbox`, className: "h-8 w-full justify-start gap-2 rounded px-1.5 text-left text-muted-foreground hover:text-muted-foreground", children: filter.value && typeof filter.value === "string" ? (_jsx(Badge, { className: "rounded-sm px-1 font-normal", children: filterField?.options?.find((option) => option.value === filter.value)?.label || filter.value })) : (_jsxs(_Fragment, { children: [filterField.placeholder ?? "Select an option...", _jsx(ChevronsUpDown, { className: "size-4", "aria-hidden": "true" })] })) }) }), _jsxs(FacetedFilterContent, { id: `${inputId}-listbox`, className: "w-[12.5rem] origin-[var(--radix-popover-content-transform-origin)]", children: [_jsx(FacetedFilterInput, { placeholder: filterField?.label ?? "Search options...", "aria-label": `Search ${filterField?.label} options` }), _jsxs(FacetedFilterList, { children: [_jsx(FacetedFilterEmpty, { children: "No options found." }), _jsx(FacetedFilterGroup, { children: filterField?.options?.map((option) => (_jsx(FacetedFilterItem, { value: option.value, selected: filter.value === option.value, onSelect: (value) => {
                                                    updateFilter({ rowId: filter.rowId, field: { value } });
                                                    setTimeout(() => {
                                                        document.getElementById(inputId)?.click();
                                                    }, 0);
                                                }, children: _jsxs(_Fragment, { children: [option.icon && (_jsx(option.icon, { className: "mr-2 size-4 text-muted-foreground", "aria-hidden": "true" })), _jsx("span", { children: option.label }), option.count && (_jsx("span", { className: "ml-auto flex size-4 items-center justify-center font-mono text-xs", children: option.count }))] }) }, option.value))) })] })] })] }));
            case "multi-select": {
                const selectedValues = new Set(Array.isArray(filter.value) ? filter.value : []);
                return (_jsxs(FacetedFilter, { children: [_jsx(FacetedFilterTrigger, { children: _jsxs(Button, { id: inputId, variant: "outline", size: "1", "aria-label": `${filterField.label} filter values`, "aria-controls": `${inputId}-listbox`, className: "h-8 w-full justify-start gap-2 rounded px-1.5 text-left text-muted-foreground hover:text-muted-foreground", children: [selectedValues.size === 0 && (_jsxs(_Fragment, { children: [filterField.placeholder ?? " Select options...", _jsx(ChevronsUpDown, { className: "size-4", "aria-hidden": "true" })] })), selectedValues?.size > 0 && (_jsxs("div", { className: "flex items-center", children: [_jsx(Badge, { className: "rounded-sm px-1 font-normal lg:hidden", children: selectedValues.size }), _jsx("div", { className: "hidden min-w-0 gap-1 lg:flex", children: selectedValues.size > 2 ? (_jsxs(Badge, { className: "rounded-sm px-1 font-normal", children: [selectedValues.size, " selected"] })) : (filterField?.options
                                                    ?.filter((option) => selectedValues.has(option.value))
                                                    .map((option) => (_jsx(Badge, { className: "truncate rounded-sm px-1 font-normal", children: option.label }, option.value)))) })] }))] }) }), _jsxs(FacetedFilterContent, { id: `${inputId}-listbox`, className: "w-[12.5rem] origin-[var(--radix-popover-content-transform-origin)]", children: [_jsx(FacetedFilterInput, { "aria-label": `Search ${filterField?.label} options`, placeholder: filterField?.label ?? "Search options..." }), _jsxs(FacetedFilterList, { children: [_jsx(FacetedFilterEmpty, { children: "No options found." }), _jsx(FacetedFilterGroup, { children: filterField?.options?.map((option) => (_jsxs(FacetedFilterItem, { value: option.value, selected: selectedValues.has(option.value), onSelect: (value) => {
                                                    const currentValue = Array.isArray(filter.value)
                                                        ? filter.value
                                                        : [];
                                                    const newValue = currentValue.includes(value)
                                                        ? currentValue.filter((v) => v !== value)
                                                        : [...currentValue, value];
                                                    updateFilter({
                                                        rowId: filter.rowId,
                                                        field: { value: newValue },
                                                    });
                                                }, children: [option.icon && (_jsx(option.icon, { className: "mr-2 size-4 text-muted-foreground", "aria-hidden": "true" })), _jsx("span", { children: option.label }), option.count && (_jsx("span", { className: "ml-auto flex size-4 items-center justify-center font-mono text-xs", children: option.count }))] }, option.value))) })] })] })] }));
            }
            case "date": {
                const dateValue = Array.isArray(filter.value)
                    ? filter.value.filter(Boolean)
                    : [filter.value, filter.value].filter(Boolean);
                const displayValue = filter.operator === "isBetween" && dateValue.length === 2
                    ? `${formatDate(dateValue[0] ?? new Date())} - ${formatDate(dateValue[1] ?? new Date())}`
                    : dateValue[0]
                        ? formatDate(dateValue[0])
                        : "Pick a date";
                return (_jsxs(Popover.Root, { children: [_jsx(Popover.Trigger, { children: _jsxs(Button, { id: inputId, variant: "outline", size: "1", "aria-label": `${filterField.label} date filter`, "aria-controls": `${inputId}-calendar`, className: cn("h-8 w-full justify-start gap-2 rounded text-left font-normal", !filter.value && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "size-3.5 shrink-0", "aria-hidden": "true" }), _jsx("span", { className: "truncate", children: displayValue })] }) }), _jsx(Popover.Content, { id: `${inputId}-calendar`, align: "start", className: "w-auto p-0", children: filter.operator === "isBetween" ? (_jsx(Calendar, { id: `${inputId}-calendar`, mode: "range", "aria-label": `Select ${filterField.label} date range`, selected: dateValue.length === 2
                                    ? {
                                        from: new Date(dateValue[0] ?? ""),
                                        to: new Date(dateValue[1] ?? ""),
                                    }
                                    : {
                                        from: new Date(),
                                        to: new Date(),
                                    }, onSelect: (date) => {
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
                                    });
                                }, initialFocus: true, numberOfMonths: 1 })) : (_jsx(Calendar, { id: `${inputId}-calendar`, mode: "single", "aria-label": `Select ${filterField.label} date`, selected: dateValue[0] ? new Date(dateValue[0]) : undefined, onSelect: (date) => {
                                    updateFilter({
                                        rowId: filter.rowId,
                                        field: { value: date?.toISOString() ?? "" },
                                    });
                                    setTimeout(() => {
                                        document.getElementById(inputId)?.click();
                                    }, 0);
                                }, autoFocus: true })) })] }));
            }
            case "boolean": {
                if (Array.isArray(filter.value))
                    return null;
                return (_jsxs(Select.Root, { value: filter.value, onValueChange: (value) => updateFilter({ rowId: filter.rowId, field: { value } }), children: [_jsx(Select.Trigger, { id: inputId, "aria-label": `${filterField.label} boolean filter`, "aria-controls": `${inputId}-listbox`, className: "h-8 w-full rounded bg-transparent" }), _jsxs(Select.Content, { id: `${inputId}-listbox`, children: [_jsx(Select.Item, { value: "true", children: "True" }), _jsx(Select.Item, { value: "false", children: "False" })] })] }));
            }
            default:
                return null;
        }
    }
    return (_jsxs(Popover.Root, { children: [_jsx(Popover.Trigger, { children: _jsxs(Button, { variant: "outline", size: "1", className: "gap-2", "aria-label": "Open filters", "aria-controls": `${id}-filter-dialog`, children: [_jsx(ListFilter, { className: "size-3", "aria-hidden": "true" }), "Filters", filters.length > 0 && (_jsx(Badge, { className: "h-[1.14rem] rounded-[0.2rem] px-[0.32rem] font-mono font-normal text-[0.65rem]", children: filters.length }))] }) }), _jsxs(Popover.Content, { id: `${id}-filter-dialog`, align: "start", collisionPadding: 16, className: cn("flex w-[calc(100vw-theme(spacing.12))] min-w-64 max-w-none origin-[var(--radix-popover-content-transform-origin)] flex-col p-4 sm:w-[36rem]", filters.length > 0 ? "gap-3.5" : "gap-2"), children: [filters.length > 0 ? (_jsx("h4", { className: "font-medium leading-none", children: "Filters" })) : (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h4", { className: "font-medium leading-none", children: "No filters applied" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Add filters to refine your results." })] })), _jsx("div", { className: "flex max-h-40 flex-col gap-2 overflow-y-auto py-0.5 pr-1", children: filters.map((filter, index) => {
                            const filterId = `${id}-filter-${filter.rowId}`;
                            const joinOperatorListboxId = `${filterId}-join-operator-listbox`;
                            const fieldListboxId = `${filterId}-field-listbox`;
                            const fieldTriggerId = `${filterId}-field-trigger`;
                            const operatorListboxId = `${filterId}-operator-listbox`;
                            const inputId = `${filterId}-input`;
                            return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "min-w-[4.5rem] text-center", children: index === 0 ? (_jsx("span", { className: "text-muted-foreground text-sm", children: "Where" })) : index === 1 ? (_jsxs(Select.Root, { value: joinOperator, onValueChange: (value) => setJoinOperator(value), children: [_jsx(Select.Trigger, { "aria-label": "Select join operator", "aria-controls": joinOperatorListboxId, className: "h-8 rounded lowercase" }), _jsx(Select.Content, { id: joinOperatorListboxId, position: "popper", className: "z-50 min-w-[var(--radix-select-trigger-width)] lowercase", children: dataTableConfig.joinOperators.map((op) => (_jsx(Select.Item, { value: op.value, children: op.label }, op.value))) })] })) : (_jsx("span", { className: "text-muted-foreground text-sm", children: joinOperator })) }), _jsxs(Popover.Root, { modal: true, children: [_jsx(Popover.Trigger, { children: _jsxs(Button, { id: fieldTriggerId, variant: "outline", size: "1", "aria-label": "Select filter field", "aria-controls": fieldListboxId, className: "h-8 w-32 justify-between gap-2 rounded focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-0", children: [_jsx("span", { className: "truncate", children: filterFields.find((field) => field.id === filter.id)
                                                                ?.label ?? "Select field" }), _jsx(ChevronsUpDown, { className: "size-4 shrink-0 opacity-50" })] }) }), _jsx(Popover.Content, { id: fieldListboxId, align: "start", className: "w-40 p-0", onCloseAutoFocus: () => document.getElementById(fieldTriggerId)?.focus({
                                                    preventScroll: true,
                                                }), children: _jsxs(Command.Root, { children: [_jsx(Command.Input, { placeholder: "Search fields..." }), _jsxs(Command.List, { children: [_jsx(Command.Empty, { children: "No fields found." }), _jsx(Command.Group, { children: filterFields.map((field) => (_jsxs(Command.Item, { value: field.id, onSelect: (value) => {
                                                                            const filterField = filterFields.find((col) => col.id === value);
                                                                            if (!filterField)
                                                                                return;
                                                                            updateFilter({
                                                                                rowId: filter.rowId,
                                                                                field: {
                                                                                    id: value,
                                                                                    type: filterField.type,
                                                                                    operator: getDefaultFilterOperator(filterField.type),
                                                                                    value: "",
                                                                                },
                                                                            });
                                                                            document.getElementById(fieldTriggerId)?.click();
                                                                        }, children: [_jsx("span", { className: "mr-1.5 truncate", children: field.label }), _jsx(Check, { className: cn("ml-auto size-4 shrink-0", field.id === filter.id
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0") })] }, field.id))) })] })] }) })] }), _jsxs(Select.Root, { value: filter.operator, onValueChange: (value) => updateFilter({
                                            rowId: filter.rowId,
                                            field: {
                                                operator: value,
                                                value: value === "isEmpty" || value === "isNotEmpty"
                                                    ? ""
                                                    : filter.value,
                                            },
                                        }), children: [_jsx(Select.Trigger, { "aria-label": "Select filter operator", "aria-controls": operatorListboxId, className: "h-8 w-32 truncate rounded" }), _jsx(Select.Content, { id: operatorListboxId, position: "popper", className: "z-50", children: getFilterOperators(filter.type).map((op) => (_jsx(Select.Item, { value: op.value, children: op.label }, op.value))) })] }), _jsx("div", { className: "min-w-36 flex-1", children: renderFilterInput({ filter, inputId }) }), _jsx(Button, { variant: "outline", size: "1", "aria-label": `Remove filter ${index + 1}`, className: "size-8 shrink-0 rounded", onClick: () => removeFilter(filter.rowId), children: _jsx(Trash2, { className: "size-3.5", "aria-hidden": "true" }) })] }, filter.rowId));
                        }) }), _jsxs("div", { className: "flex w-full items-center gap-2", children: [_jsx(Button, { size: "1", className: "h-[1.85rem] rounded", onClick: addFilter, children: "Add filter" }), filters.length > 0 ? (_jsx(Button, { size: "1", variant: "outline", className: "rounded", onClick: () => {
                                    void setFilters(null);
                                    void setJoinOperator("and");
                                }, children: "Reset filters" })) : null] })] })] }));
}
//# sourceMappingURL=data-table-filter-list.js.map