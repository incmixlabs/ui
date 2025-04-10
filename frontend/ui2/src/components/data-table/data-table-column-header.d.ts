import type { Column } from "@tanstack/react-table";
interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}
export declare function DataTableColumnHeader<TData, TValue>({ column, title, className, }: DataTableColumnHeaderProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-column-header.d.ts.map