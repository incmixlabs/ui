import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function Root({ className, ...props }) {
    return (_jsx("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: _jsx("table", { "data-slot": "table", className: cn("w-full caption-bottom text-sm", className), ...props }) }));
}
function Header({ className, ...props }) {
    return (_jsx("thead", { "data-slot": "table-header", className: cn("[&_tr]:border-b", className), ...props }));
}
function Body({ className, ...props }) {
    return (_jsx("tbody", { "data-slot": "table-body", className: cn("[&_tr:last-child]:border-0", className), ...props }));
}
function Footer({ className, ...props }) {
    return (_jsx("tfoot", { "data-slot": "table-footer", className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props }));
}
function Row({ className, ...props }) {
    return (_jsx("tr", { "data-slot": "table-row", className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className), ...props }));
}
function Head({ className, ...props }) {
    return (_jsx("th", { "data-slot": "table-head", className: cn("h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className), ...props }));
}
function Cell({ className, ...props }) {
    return (_jsx("td", { "data-slot": "table-cell", className: cn("whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className), ...props }));
}
function Caption({ className, ...props }) {
    return (_jsx("caption", { "data-slot": "table-caption", className: cn("mt-4 text-muted-foreground text-sm", className), ...props }));
}
export const Table = {
    Root,
    Header,
    Body,
    Footer,
    RowHeaderCell: Head,
    ColumnHeaderCell: Head,
    Row,
    Cell,
    Caption,
};
//# sourceMappingURL=table.js.map