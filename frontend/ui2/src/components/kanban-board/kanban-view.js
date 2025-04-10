import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clock } from "lucide-react";
import { Box, Flex, Text } from "@/components/radixui";
import { Image } from "@/components/radixui/card/flow-card";
export const KanbanView = ({ task }) => {
    const daysLeft = `\u00A0 ${task.daysLeft} days left`;
    return (_jsxs(Box, { className: "mb-4 w-[28rem] cursor-grab rounded-lg bg-white p-5 shadow dark:bg-gray-800", children: [_jsx(Flex, { align: "center", justify: "between", className: "pb-4", children: _jsx("div", { className: "font-semibold text-base text-gray-900 dark:text-white", children: task.name }) }), _jsxs(Flex, { direction: "column", children: [!!task.attachment && (_jsx(Box, { className: "relative mb-3 aspect-video w-full", children: _jsx(Image, { imgAlt: "", 
                            // fill
                            imgSrc: task.attachment, className: "rounded-lg" }) })), _jsx(Text, { as: "p", className: "pb-4 font-normal text-gray-700 text-sm dark:text-gray-400", children: task.description }), _jsxs(Flex, { justify: "between", children: [_jsx(Flex, { align: "center", justify: "start" }), _jsxs(Flex, { justify: "center", align: "center", className: "rounded-lg bg-purple-100 px-3 font-medium text-purple-800 text-sm dark:bg-purple-200", children: [_jsx(Clock, { width: "12px", height: "12px" }), " ", daysLeft] })] })] })] }, task.id));
};
//# sourceMappingURL=kanban-view.js.map