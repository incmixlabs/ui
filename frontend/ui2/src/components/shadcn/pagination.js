import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon, } from "lucide-react";
import { cn } from "@/lib/utils";
// biome-ignore lint/style/useImportType: <explanation>
import { buttonVariants } from "./button";
function Root({ className, ...props }) {
    return (_jsx("nav", { "aria-label": "pagination", "data-slot": "pagination", className: cn("mx-auto flex w-full justify-center", className), ...props }));
}
function Content({ className, ...props }) {
    return (_jsx("ul", { "data-slot": "pagination-content", className: cn("flex flex-row items-center gap-1", className), ...props }));
}
function Item({ ...props }) {
    return _jsx("li", { "data-slot": "pagination-item", ...props });
}
function Link({ className, isActive, size = "icon", ...props }) {
    return (_jsx("a", { "aria-current": isActive ? "page" : undefined, "data-slot": "pagination-link", "data-active": isActive, className: cn(buttonVariants({
            variant: isActive ? "outline" : "ghost",
            size,
        }), className), ...props }));
}
function Previous({ className, ...props }) {
    return (_jsxs(Link, { "aria-label": "Go to previous page", className: cn("gap-1 px-2.5 sm:pl-2.5", className), ...props, children: [_jsx(ChevronLeftIcon, {}), _jsx("span", { className: "hidden sm:block", children: "Previous" })] }));
}
function Next({ className, ...props }) {
    return (_jsxs(Link, { "aria-label": "Go to next page", className: cn("gap-1 px-2.5 sm:pr-2.5", className), ...props, children: [_jsx("span", { className: "hidden sm:block", children: "Next" }), _jsx(ChevronRightIcon, {})] }));
}
function Ellipsis({ className, ...props }) {
    return (_jsxs("span", { "aria-hidden": true, "data-slot": "pagination-ellipsis", className: cn("flex size-9 items-center justify-center", className), ...props, children: [_jsx(MoreHorizontalIcon, { className: "size-4" }), _jsx("span", { className: "sr-only", children: "More pages" })] }));
}
export const Pagination = {
    Root,
    Content,
    Link,
    Item,
    Previous,
    Next,
    Ellipsis,
};
//# sourceMappingURL=pagination.js.map