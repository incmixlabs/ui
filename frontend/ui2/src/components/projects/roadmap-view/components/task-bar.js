import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Badge, Box, Flex, HoverCard, Text } from "@/components/radixui";
import { CalendarDays, Clipboard, User } from "lucide-react";
import { ProjectsImages } from "../../images";
export function TaskBar({ task, dates, view, columnWidth }) {
    if (!dates.length)
        return null;
    const getTaskPosition = () => {
        const startDate = task.startDate;
        const endDate = task.endDate;
        // If dates array is empty or task dates are outside the visible range, don't show the task
        if (dates.length === 0)
            return { visible: false, left: 0, width: 0 };
        // Check if the task is completely outside the visible date range
        const firstVisibleDate = dates[0];
        const lastVisibleDate = dates[dates.length - 1];
        // For year view, we need to compare by month and year
        if (view === "year") {
            const isBeforeVisibleRange = endDate.year < firstVisibleDate.year ||
                (endDate.year === firstVisibleDate.year &&
                    endDate.month < firstVisibleDate.month);
            const isAfterVisibleRange = startDate.year > lastVisibleDate.year ||
                (startDate.year === lastVisibleDate.year &&
                    startDate.month > lastVisibleDate.month);
            if (isBeforeVisibleRange || isAfterVisibleRange) {
                return { visible: false, left: 0, width: 0 };
            }
        }
        else {
            // For other views, compare by day, month, and year
            const isBeforeVisibleRange = endDate < firstVisibleDate.startOf("day");
            const isAfterVisibleRange = startDate > lastVisibleDate.endOf("day");
            if (isBeforeVisibleRange || isAfterVisibleRange) {
                return { visible: false, left: 0, width: 0 };
            }
        }
        // Find the indices of the start and end dates in the dates array
        let startIndex = -1;
        let endIndex = -1;
        if (view === "year") {
            // For year view, we need to calculate based on months
            startIndex =
                startDate.month - 1 + (startDate.year - firstVisibleDate.year) * 12;
            endIndex = endDate.month - 1 + (endDate.year - firstVisibleDate.year) * 12;
            // Adjust if the task starts before the visible range
            if (startIndex < 0)
                startIndex = 0;
            // Adjust if the task ends after the visible range
            if (endIndex >= dates.length)
                endIndex = dates.length - 1;
            // Check if the task is completely outside the visible range
            if (endIndex < 0 || startIndex >= dates.length) {
                return { visible: false, left: 0, width: 0 };
            }
        }
        else {
            // For other views, match by day
            // Find the closest date for start
            startIndex = dates.findIndex((date) => date.hasSame(startDate, "day") || date > startDate);
            if (startIndex === -1)
                startIndex = 0;
            // Find the closest date for end
            for (let i = 0; i < dates.length; i++) {
                if (dates[i].hasSame(endDate, "day") || dates[i] > endDate) {
                    endIndex = i > 0 ? i - 1 : 0;
                    break;
                }
            }
            if (endIndex === -1)
                endIndex = dates.length - 1;
        }
        // Calculate the width based on column width
        const columnWidthValue = Number.parseInt(columnWidth.replace("w-", "")) * 4;
        const width = (endIndex - startIndex + 1) * columnWidthValue;
        return {
            visible: true,
            left: startIndex * columnWidthValue,
            width: view === "year" ? columnWidthValue : Math.max(width, columnWidthValue), // Ensure minimum width
        };
    };
    const { visible, left, width } = getTaskPosition();
    // If the task is not visible in the current date range, don't render it
    if (!visible)
        return null;
    const getTaskColor = () => {
        // Get the base color from task.color or default to "blue"
        const baseColor = `${task.color}-10` || "blue";
        // For the light version, append "7" to the color name
        const lightColor = `${task.color}-7`;
        return {
            base: baseColor,
            light: lightColor,
        };
    };
    const { base, light } = getTaskColor();
    return (_jsx(_Fragment, { children: _jsxs(HoverCard.Root, { openDelay: 200, children: [_jsx(HoverCard.Trigger, { className: "group absolute flex h-10 cursor-pointer items-center rounded-md transition-all hover:brightness-95", style: {
                        left: `${left}px`,
                        width: `${width}px`,
                        background: `linear-gradient(to right, var(--${base}) ${task.progress}%, var(--${light}) ${task.progress}%)`,
                    }, children: _jsxs("div", { className: "flex w-full items-center justify-between px-3", children: [_jsx("span", { className: "truncate font-medium text-sm text-white group-hover:text-white/90", children: task.name }), _jsxs("span", { className: "rounded px-2 py-0.5 font-medium text-sm text-white/90", children: [task.progress, "%"] })] }) }), _jsxs(HoverCard.Content, { className: "z-50 w-fit space-y-3 p-3 font-medium text-gray-11", children: [_jsxs(Flex, { align: "center", gap: "3", children: [_jsx(Box, { className: "w-6", children: _jsx(Badge, { variant: "solid", color: task.color, className: "h-5 w-5" }) }), _jsx(Text, { as: "p", className: "text-gray-12", children: task.name })] }), _jsxs(Flex, { align: "center", gap: "3", children: [_jsx(Box, { className: "w-6", children: _jsx(CalendarDays, { className: "h-5 w-5" }) }), _jsxs(Text, { as: "p", children: [task.startDate.toFormat("MMM d, yyyy"), " -", " ", task.endDate.toFormat("MMM d, yyyy")] })] }), _jsxs(Flex, { align: "center", gap: "3", children: [_jsx(Box, { className: "w-6", children: _jsx(Clipboard, { className: "h-5 w-5" }) }), _jsx(Text, { as: "p", children: "task 3/3" })] }), _jsxs(Flex, { align: "center", gap: "3", children: [_jsx(Box, { className: "w-6", children: _jsx(User, { className: " h-5 w-5" }) }), _jsxs(Flex, { align: "center", gap: "2", children: [_jsx("img", { src: ProjectsImages.user, className: "h-8 w-8 rounded-full", alt: "task-assigned-image" }), _jsx("img", { src: ProjectsImages.user, className: "h-8 w-8 rounded-full", alt: "task-assigned-image" }), _jsx("img", { src: ProjectsImages.user, className: "h-8 w-8 rounded-full", alt: "task-assigned-image" })] })] })] })] }) }));
}
//# sourceMappingURL=task-bar.js.map