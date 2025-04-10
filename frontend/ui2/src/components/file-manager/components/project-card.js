import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex } from "@/components";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ProjectActionsMenu } from "./project-actions-menu";
export default function ProjectCard({ file, onClick, viewMode, isSelected = false, }) {
    const isTabet = useMediaQuery("(min-width: 768px)");
    const IconComponent = isSelected
        ? file.openIcon
        : file.closeIcon;
    return (_jsxs(Box, { className: cn("group aspect relative cursor-pointer overflow-hidden rounded-md border border-gray-5 hover:border-sidebar-secondary-active/30 hover:bg-sidebar-secondary-active/5 md:border-gray-1", viewMode === "grid"
            ? "flex flex-col items-center py-10 "
            : "flex items-center p-3 ", isSelected &&
            "border border-sidebar-secondary-active/30 bg-sidebar-secondary-active/5"), onClick: onClick, children: [_jsxs(Box, { className: `
          ${viewMode === "grid" ? "flex flex-col items-center" : "flex items-center gap-3"}
          ${viewMode === "grid" ? "w-full" : "flex-1"}
        `, children: [_jsx(Box, { className: `${viewMode === "grid" ? "mb-3" : ""}`, children: IconComponent && (_jsx(IconComponent, { className: `${file.type === "folder" ? "" : "text-gray-500"} ${viewMode === "grid" ? "h-16 w-16" : "h-10 w-10"}` })) }), _jsxs(Box, { className: `${viewMode === "grid" ? "text-center" : "flex-1"}`, children: [_jsx("h3", { className: cn("truncate font-medium", viewMode === "grid" ? "text-center" : ""), children: file.name }), viewMode === "list" && (_jsxs(Flex, { align: "center", gap: "4", className: "text-muted-foreground text-sm ", children: [_jsx("span", { children: file.modified }), _jsxs("span", { children: [file.size.value, " ", file.size.unit] })] })), viewMode === "grid" && (_jsxs(Flex, { align: "center", justify: "center", gap: "4", className: "mt-1 text-muted-foreground text-sm", children: [file.size.value, " ", file.size.unit] }))] })] }), isTabet && (_jsx(Box, { className: "absolute top-3 right-5 opacity-0 transition-opacity group-hover:opacity-100", onClick: (e) => e.stopPropagation(), children: _jsx(ProjectActionsMenu, { projectId: file.id, className: "h-6 w-6 cursor-pointer bg-sidebar-secondary-active/20 dark:bg-sidebar-secondary-active/20 dark:text-white " }) }))] }));
}
//# sourceMappingURL=project-card.js.map