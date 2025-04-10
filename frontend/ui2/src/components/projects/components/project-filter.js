import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Search } from "lucide-react";
import { useState } from "react";
import { Box, Button, Flex, Input, Select } from "@/components/base";
import { SmartDatetimeInput } from "@/components/datetime-picker";
import MultipleSelector from "@/components/multiple-selector/multiple-selector";
import { members } from "../data";
export function ProjectFilter({ onApplyFilters, onResetFilters, }) {
    const [search, setSearch] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [dueDate, setDueDate] = useState(undefined);
    const [status, setStatus] = useState("started");
    const handleApplyFilters = () => {
        onApplyFilters({
            search,
            members: selectedMembers
                .map((member) => member.id)
                .filter((id) => id !== undefined),
            dueDate: dueDate ? dueDate.toISOString() : "",
            status,
        });
    };
    const handleResetFilters = () => {
        setSearch("");
        setSelectedMembers([]);
        setDueDate(undefined);
        setStatus("started");
        onResetFilters();
    };
    return (_jsxs(Flex, { className: "flex-col py-4", gap: "4", children: [_jsx(Box, { children: _jsxs(Box, { className: "space-y-4", children: [_jsxs(Box, { className: "relative ", children: [_jsx(Search, { className: "absolute top-3 left-2.5", size: 20 }), _jsx(Input, { placeholder: "Search Projects...", value: search, onChange: (e) => setSearch(e.target.value), className: "h-12 w-full pl-9 " })] }), _jsxs(Box, { children: [_jsx("label", { htmlFor: "members", className: "mb-2 block font-medium text-gray-11 text-sm", children: "Members" }), _jsx(MultipleSelector, { value: selectedMembers, onChange: setSelectedMembers, defaultColor: "gray", defaultOptions: members, placeholder: "Select members", className: "border-1 bg-gray-1", emptyIndicator: _jsx("p", { className: "text-center text-gray-600 text-lg leading-10 dark:text-gray-400", children: "No results found." }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "due-date", className: "mb-2 block font-medium text-gray-11 text-sm", children: "Due Date" }), _jsx(SmartDatetimeInput, { value: dueDate, onValueChange: setDueDate, className: "w-full bg-gray-1" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "status", className: "mb-2 block font-medium text-gray-11 text-sm", children: "Status" }), _jsxs(Select.Root, { defaultValue: "started", value: status, onValueChange: setStatus, children: [_jsx(Select.Trigger, { className: "h-11 w-full" }), _jsxs(Select.Content, { className: "mx-auto w-[95%]", children: [_jsx(Select.Item, { value: "started", children: "Started" }), _jsx(Select.Item, { value: "on-hold", children: "On Hold" }), _jsx(Select.Item, { value: "completed", children: "Completed" })] })] })] })] }) }), _jsxs(Flex, { align: "center", gap: "4", className: "mt-auto", children: [_jsx(Button, { onClick: handleApplyFilters, variant: "classic", className: "h-10 w-40 cursor-pointer", children: "Apply Filters" }), _jsx(Button, { onClick: handleResetFilters, variant: "soft", className: "h-10 w-full flex-1 cursor-pointer underline", children: "Reset all filters" })] })] }));
}
//# sourceMappingURL=project-filter.js.map