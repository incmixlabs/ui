import { type TableOptions, type TableState } from "@tanstack/react-table";
import * as React from "react";
import type { DataTableFilterField, ExtendedSortingState } from "../lib/types";
interface UseDataTableProps<TData> extends Omit<TableOptions<TData>, "state" | "pageCount" | "getCoreRowModel" | "manualFiltering" | "manualPagination" | "manualSorting">, Required<Pick<TableOptions<TData>, "pageCount">> {
    /**
     * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
     * - Faceted filters are rendered when `options` are provided for a filter field.
     * - Otherwise, search filters are rendered.
     *
     * The indie filter field `value` represents the corresponding column name in the database table.
     * @default []
     * @type { label: string, value: keyof TData, placeholder?: string, options?: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[] }[]
     * @example
     * ```ts
     * // Render a search filter
     * const filterFields = [
     *   { label: "Title", value: "title", placeholder: "Search titles" }
     * ];
     * // Render a faceted filter
     * const filterFields = [
     *   {
     *     label: "Status",
     *     value: "status",
     *     options: [
     *       { label: "Todo", value: "todo" },
     *       { label: "In Progress", value: "in-progress" },
     *     ]
     *   }
     * ];
     * ```
     */
    filterFields?: DataTableFilterField<TData>[];
    /**
     * Determines how query updates affect history.
     * `push` creates a new history entry; `replace` (default) updates the current entry.
     * @default "replace"
     */
    history?: "push" | "replace";
    /**
     * Indicates whether the page should scroll to the top when the URL changes.
     * @default false
     */
    scroll?: boolean;
    /**
     * Shallow mode keeps query states client-side, avoiding server calls.
     * Setting to `false` triggers a network request with the updated querystring.
     * @default true
     */
    shallow?: boolean;
    /**
     * Maximum time (ms) to wait between URL query string updates.
     * Helps with browser rate-limiting. Minimum effective value is 50ms.
     * @default 50
     */
    throttleMs?: number;
    /**
     * Debounce time (ms) for filter updates to enhance performance during rapid input.
     * @default 300
     */
    debounceMs?: number;
    /**
     * Observe Server Component loading states for non-shallow updates.
     * Pass `startTransition` from `React.useTransition()`.
     * Sets `shallow` to `false` automatically.
     * So shallow: true` and `startTransition` cannot be used at the same time.
     * @see https://react.dev/reference/react/useTransition
     */
    startTransition?: React.TransitionStartFunction;
    /**
     * Clear URL query key-value pair when state is set to default.
     * Keep URL meaning consistent when defaults change.
     * @default false
     */
    clearOnDefault?: boolean;
    /**
     * Enable notion like column filters.
     * Advanced filters and column filters cannot be used at the same time.
     * @default false
     * @type boolean
     */
    enableAdvancedFilter?: boolean;
    initialState?: Omit<Partial<TableState>, "sorting"> & {
        sorting?: ExtendedSortingState<TData>;
    };
}
export declare function useDataTable<TData>({ pageCount, filterFields, enableAdvancedFilter, history, scroll, shallow, throttleMs, debounceMs, clearOnDefault, startTransition, initialState, ...props }: UseDataTableProps<TData>): {
    table: import("@tanstack/table-core").Table<TData>;
};
export {};
//# sourceMappingURL=use-data-table.d.ts.map