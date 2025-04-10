import type { Row } from "@tanstack/react-table";
import type { ExtendedSortingState } from "./types";
/**
 * Creates a parser for TanStack Table sorting state.
 * @param originalRow The original row data to validate sorting keys against.
 * @returns A parser for TanStack Table sorting state.
 */
export declare const getSortingStateParser: <TData>(originalRow?: Row<TData>["original"]) => import("nuqs").ParserBuilder<ExtendedSortingState<TData>>;
/**
 * Create a parser for data table filters.
 * @param originalRow The original row data to create the parser for.
 * @returns A parser for data table filters state.
 */
export declare const getFiltersStateParser: <T>(originalRow?: Row<T>["original"]) => import("nuqs").ParserBuilder<{
    type: "number" | "boolean" | "date" | "text" | "select" | "multi-select";
    operator: "iLike" | "notILike" | "eq" | "ne" | "isEmpty" | "isNotEmpty" | "lt" | "lte" | "gt" | "gte" | "isBetween" | "isRelativeToToday" | "and" | "or";
    value: string | string[];
    rowId: string;
    id: Extract<keyof T, string>;
}[]>;
//# sourceMappingURL=parsers.d.ts.map