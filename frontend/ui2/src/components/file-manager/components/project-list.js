import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox, ScrollArea } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { Table } from "@/components/shadcn/table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { getBytes } from "@/lib/utils/getBytes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ProjectActionsMenu } from "./project-actions-menu";
export function ProjectListView({ files, onFileClick, selectedProjectId, }) {
    const isMobile = useMediaQuery("(min-width: 640px)");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        }
        else {
            setSortField(field);
            setSortDirection("asc");
        }
    };
    const sortedFiles = [...files].sort((a, b) => {
        let comparison = 0;
        if (sortField === "name") {
            comparison = a.name.localeCompare(b.name);
        }
        else if (sortField === "modified") {
            try {
                const dateA = new Date(a.modified).getTime();
                const dateB = new Date(b.modified).getTime();
                if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
                    comparison = 0;
                }
                else {
                    comparison = dateA - dateB;
                }
            }
            catch (error) {
                console.error("Error parsing dates:", error);
                comparison = 0;
            }
        }
        else if (sortField === "size") {
            try {
                comparison = getBytes(a) - getBytes(b);
            }
            catch (error) {
                console.error("Error comparing file sizes:", error);
                comparison = 0;
            }
        }
        return sortDirection === "asc" ? comparison : -comparison;
    });
    const toggleSelectAll = () => {
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        }
        else {
            setSelectedFiles(files.map((file) => file.id));
        }
    };
    const getSortIcon = (field) => {
        if (sortField !== field)
            return null;
        return sortDirection === "asc" ? (_jsx(ChevronUp, { className: `${iconSize}` })) : (_jsx(ChevronDown, { className: `${iconSize}` }));
    };
    return (_jsx(ScrollArea, { className: "w-full rounded-md border border-gray-5", scrollbars: "horizontal", children: _jsxs(Table.Root, { className: "w-full overflow-hidden", children: [_jsx(Table.Header, { className: "bg-gray-3", children: _jsxs(Table.Row, { className: "border-gray-5 ", children: [_jsx(Table.ColumnHeaderCell, { className: "w-8 md:w-12", children: _jsx(Checkbox, { checked: selectedFiles.length === files.length && files.length > 0, onCheckedChange: toggleSelectAll, "aria-label": "Select all files" }) }), _jsx(Table.ColumnHeaderCell, { className: "cursor-pointer", onClick: () => handleSort("name"), children: _jsxs("div", { className: "flex items-center gap-2", children: ["Files ", getSortIcon("name")] }) }), isMobile && (_jsxs(_Fragment, { children: [_jsx(Table.ColumnHeaderCell, { className: "cursor-pointer text-right", onClick: () => handleSort("modified"), children: _jsxs("div", { className: "flex items-center justify-end gap-2", children: ["Date ", getSortIcon("modified")] }) }), _jsx(Table.ColumnHeaderCell, { className: "cursor-pointer text-right", onClick: () => handleSort("size"), children: _jsxs("div", { className: "flex items-center justify-end gap-2", children: ["Size ", getSortIcon("size")] }) })] })), _jsx(Table.ColumnHeaderCell, { className: "w-10 text-right md:w-20 lg:w-32", children: "Action" })] }) }), _jsx(Table.Body, { className: "px-2", children: sortedFiles.map((file) => {
                        const IconComponent = selectedProjectId === file.id
                            ? file.openIcon || null
                            : file.closeIcon || null;
                        return (_jsxs(Table.Row, { className: cn("h-14 cursor-pointer border-gray-5 border-t hover:bg-sidebar-secondary-active/15 ", selectedProjectId === file.id &&
                                "bg-sidebar-secondary-active/15"), onClick: () => onFileClick(file), children: [_jsx(Table.Cell, { className: "w-8 px-2 md:w-12", onClick: (e) => e.stopPropagation(), children: _jsx(Checkbox, { checked: selectedFiles.includes(file.id), onCheckedChange: () => {
                                            setSelectedFiles((prev) => prev.includes(file.id)
                                                ? prev.filter((id) => id !== file.id)
                                                : [...prev, file.id]);
                                        }, "aria-label": `Select ${file.name}` }) }), _jsx(Table.Cell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [IconComponent && (_jsx(IconComponent, { className: cn("h-5 w-5", file.type !== "folder" && "text-gray-500") })), _jsx("span", { className: "font-medium", children: file.name })] }) }), isMobile && (_jsxs(_Fragment, { children: [_jsx(Table.Cell, { className: "text-right text-muted-foreground", children: file.modified }), _jsxs(Table.Cell, { className: "text-right text-muted-foreground", children: [file.size.value, " ", file.size.unit] })] })), _jsx(Table.Cell, { className: "w-10 text-right md:w-20 lg:w-32", onClick: (e) => e.stopPropagation(), children: _jsx(ProjectActionsMenu, { projectId: file?.id, className: "mr-1 h-5 w-5 cursor-pointer sm:mr-2 sm:h-6 sm:w-6" }) })] }, file.id));
                    }) })] }) }));
}
//# sourceMappingURL=project-list.js.map