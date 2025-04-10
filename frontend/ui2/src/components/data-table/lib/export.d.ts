import type { Table } from "@tanstack/react-table";
export declare function exportTableToCSV<TData>(
/**
 * The table to export.
 * @type Table<TData>
 */
table: Table<TData>, opts?: {
    /**
     * The filename for the CSV file.
     * @default "table"
     * @example "tasks"
     */
    filename?: string;
    /**
     * The columns to exclude from the CSV file.
     * @default []
     * @example ["select", "actions"]
     */
    excludeColumns?: (keyof TData | "select" | "actions")[];
    /**
     * Whether to export only the selected rows.
     * @default false
     */
    onlySelected?: boolean;
}): void;
//# sourceMappingURL=export.d.ts.map