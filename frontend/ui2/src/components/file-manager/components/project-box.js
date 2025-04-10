import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Button, Flex, IconButton, Input } from "@/components/base";
import { FilterIcon } from "@/components/icons/filter";
import { MotionSheet } from "@/components/custom-sheet";
import { iconSize } from "@/components/icons/icon";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ChevronLeft, Columns2, LayoutGrid, List, Plus, Search, Upload, } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { projectFolders } from "../data";
import ProjectCard from "./project-card";
import { ProjectDetails } from "./project-details";
import { ProjectListView } from "./project-list";
const ProjectBox = ({ title }) => {
    const isDesktop = useMediaQuery("(min-width: 1536px)");
    const isMobile = useMediaQuery("(min-width: 640px)");
    const [selectedProjectId, setSelectedProjectId] = useQueryState("projectId", {
        defaultValue: "",
    });
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [projectSearchQuery, setProjectSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(projectFolders.length / itemsPerPage);
    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projectFolders.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }
        else {
            pageNumbers.push(1);
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);
            if (currentPage <= 2) {
                endPage = 4;
            }
            else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 3;
            }
            if (startPage > 2) {
                pageNumbers.push("ellipsis1");
            }
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            if (endPage < totalPages - 1) {
                pageNumbers.push("ellipsis2");
            }
            pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };
    const handleFileClick = (file) => {
        setSelectedProjectId(file.id === selectedProjectId ? null : file.id);
    };
    const handleCloseDetails = () => {
        setSelectedProjectId("");
    };
    return (_jsxs(Flex, { className: "w-full overflow-x-hidden", gap: "5", children: [_jsxs(Box, { className: "flex-1 rounded-lg border border-gray-5 transition-all ", children: [_jsxs(Flex, { className: "border-gray-5 border-b px-8 py-4 font-medium text-gray-10", gap: "1", children: [_jsx(IconButton, { className: `mr-2 rounded-full ${iconSize}`, onClick: () => {
                                    /* Add navigation logic here */
                                }, children: _jsx(ChevronLeft, {}) }), _jsx("span", { children: "File Manager" }), " /", " ", _jsx("span", { className: "text-blue-10", children: title })] }), _jsxs(Box, { className: "p-4 sm:p-8 ", children: [_jsxs(Flex, { align: "center", justify: "between", className: "mb-4 gap-4 ", children: [isMobile && (_jsxs(Box, { className: "relative flex h-11 w-full items-center rounded-md bg-gray-3", children: [_jsx(Search, { className: "ml-3 h-5 w-5 text-gray-10" }), _jsx(Input, { placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "absolute top-0 left-0 h-full w-full rounded-md bg-transparent pl-10" })] })), _jsxs(Button, { variant: "solid", className: "h-11", children: [_jsx(Plus, {}), " Add Folder"] }), _jsxs(Button, { variant: "solid", className: "h-11", children: [_jsx(Upload, {}), " Upload"] })] }), _jsxs(Flex, { align: "center", justify: "between", className: "mb-4", children: [_jsx("h2", { className: "font-semibold text-xl sm:text-2xl", children: title }), _jsxs(Flex, { align: "center", gap: "2", children: [_jsxs(Flex, { align: "center", justify: "between", gap: "2", className: "w-full", children: [_jsxs(Box, { className: "relative flex h-9 w-10 cursor-pointer items-center rounded-lg border border-gray-5 md:w-64 md:cursor-default md:border-none", children: [_jsx(Search, { className: "ml-2 h-5 w-5 text-gray-10" }), _jsx(Input, { placeholder: "Search files...", value: projectSearchQuery, onChange: (e) => setProjectSearchQuery(e.target.value), className: "absolute top-0 left-0 hidden h-full w-full bg-transparent md:block md:pl-8" })] }), _jsx(Box, { className: "h-9 w-9 rounded-md border border-gray-5", children: _jsx(IconButton, { className: cn("grid h-full w-full cursor-pointer place-content-center border-none bg-transparent"), onClick: () => setViewMode("grid"), children: _jsx(FilterIcon, { className: "h-5 w-5 stroke-gray-8" }) }) })] }), _jsxs(Flex, { align: "center", gap: "1", className: "h-9 rounded-md border border-gray-5 p-1", children: [_jsx(IconButton, { className: cn(" h-7 cursor-pointer border-none ", viewMode === "list"
                                                            ? "bg-sidebar-secondary-active dark:bg-sidebar-secondary-active/20 "
                                                            : "bg-transparent text-gray-10"), onClick: () => setViewMode("list"), children: _jsx(List, { className: "h-5 w-5" }) }), _jsx(IconButton, { className: cn(" h-7 cursor-pointer border-none", viewMode === "grid"
                                                            ? "bg-sidebar-secondary-active dark:bg-sidebar-secondary-active/20 "
                                                            : "bg-transparent text-gray-10"), onClick: () => setViewMode("grid"), children: _jsx(LayoutGrid, { className: cn("h-5 w-5") }) }), isMobile && (_jsx(IconButton, { className: cn(" h-7 cursor-pointer border-none", viewMode === "side"
                                                            ? "bg-sidebar-secondary-active dark:bg-sidebar-secondary-active/20 "
                                                            : "bg-transparent text-gray-10"), onClick: () => setViewMode("side"), children: _jsx(Columns2, { className: cn("h-5 w-5") }) }))] })] })] }), _jsx(Box, { className: "w-full", children: projectFolders.length === 0 ? (_jsx(Flex, { direction: "column", align: "center", justify: "center", className: "h-64 text-muted-foreground", children: _jsx("p", { children: "No files found" }) })) : (_jsx(_Fragment, { children: viewMode === "grid" ? (_jsx(Box, { className: `grid pb-10 ${!selectedProjectId && isDesktop
                                            ? "grid-cols-3 gap-5 2xl:grid-cols-4"
                                            : "grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3"} gap-4 border-gray-5 border-t pt-5`, children: currentItems.map((item) => (_jsx(ProjectCard, { file: item, onClick: () => handleFileClick(item), viewMode: viewMode, isSelected: selectedProjectId === item.id }, item.id))) })) : (_jsx(Box, { className: "border-gray-5 border-t pt-5", children: _jsx(ProjectListView, { files: currentItems, onFileClick: handleFileClick, selectedProjectId: selectedProjectId }) })) })) }), projectFolders.length > 0 && (_jsxs(Flex, { align: "center", justify: "between", gap: "2", className: "border-gray-5 border-t py-8", children: [!isMobile && (_jsx(Box, { className: "w-full font-medium", children: _jsxs("span", { children: ["Page", " ", _jsx("span", { className: "font-semibold italic", children: currentPage }), " ", "of ", totalPages] }) })), _jsxs(Button, { onClick: () => currentPage > 1 && paginate(currentPage - 1), variant: currentPage === 1 ? "outline" : "solid", className: "flex cursor-pointer items-center gap-1 rounded-md p-2 font-medium text-sm transition-colors", disabled: currentPage === 1, children: [_jsx(ChevronLeft, { className: `${iconSize}` }), "Previous"] }), isMobile && (_jsx(Flex, { gap: "2", align: "center", children: getPageNumbers().map((page) => page === "ellipsis1" || page === "ellipsis2" ? (_jsx("span", { className: "px-2", children: "..." }, `ellipsis-${page}`)) : (_jsx(Button, { variant: currentPage === page ? "solid" : "outline", onClick: () => paginate(page), className: "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md font-medium text-sm transition-colors", children: page }, page))) })), _jsxs(Button, { onClick: () => currentPage < totalPages && paginate(currentPage + 1), variant: currentPage === totalPages ? "outline" : "solid", className: "flex cursor-pointer items-center gap-1 rounded-md p-2 font-medium text-sm transition-colors", disabled: currentPage === totalPages, children: ["Next", _jsx(ChevronLeft, { className: `${iconSize} rotate-180` })] })] }))] })] }), _jsx(MotionSheet, { open: Boolean(selectedProjectId), onOpenChange: handleCloseDetails, showCloseButton: false, side: "right", isFilterClassName: "w-80 h-full", isFilter: Boolean(isDesktop), className: "w-80 p-0 ", shadow: "0 0 10px rgba(0, 0, 0, 0)", children: _jsx(Box, { className: cn("slide-in-from-right h-full w-full animate-in rounded-md border border-gray-4"), children: _jsx(ProjectDetails, { projectId: selectedProjectId, onClose: handleCloseDetails }) }) })] }));
};
export default ProjectBox;
//# sourceMappingURL=project-box.js.map