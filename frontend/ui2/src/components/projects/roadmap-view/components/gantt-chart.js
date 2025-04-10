"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Button, Flex, Grid, Heading, IconButton, ScrollArea, Select, Text, } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, SlidersHorizontal, } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { CalendarHeader } from "./calendar-header";
import EditDropdown from "./edit-dropdown";
import { TaskBar } from "./task-bar";
export function GanttChart({ projectTasks, className }) {
    const [tasks, setTasks] = useState(projectTasks);
    const [view, setView] = useState("month");
    const [currentDate, setCurrentDate] = useState(DateTime.now());
    const [dates, setDates] = useState([]);
    const [expandedProjects, setExpandedProjects] = useState({});
    // Generate dates based on the selected view
    useEffect(() => {
        const generateDates = () => {
            const newDates = [];
            let startDate;
            let endDate;
            switch (view) {
                case "week":
                    startDate = currentDate.startOf("week");
                    endDate = currentDate.endOf("week");
                    break;
                case "month":
                    startDate = currentDate.startOf("month");
                    endDate = currentDate.endOf("month");
                    break;
                case "quarter":
                    startDate = currentDate.startOf("quarter");
                    endDate = currentDate.endOf("quarter");
                    break;
                case "year":
                    startDate = currentDate.startOf("year");
                    endDate = currentDate.endOf("year");
                    // For year view, we'll show months instead of days
                    for (let i = 0; i <= endDate.diff(startDate, "months").months; i++) {
                        newDates.push(startDate.plus({ months: i }));
                    }
                    setDates(newDates);
                    return;
            }
            // For week, month, and quarter views, we'll show days
            for (let i = 0; i <= endDate.diff(startDate, "days").days; i++) {
                newDates.push(startDate.plus({ days: i }));
            }
            setDates(newDates);
        };
        generateDates();
    }, [currentDate, view]);
    const handlePrevious = () => {
        switch (view) {
            case "week":
                setCurrentDate(currentDate.minus({ weeks: 1 }));
                break;
            case "month":
                setCurrentDate(currentDate.minus({ months: 1 }));
                break;
            case "quarter":
                setCurrentDate(currentDate.minus({ months: 3 }));
                break;
            case "year":
                setCurrentDate(currentDate.minus({ years: 1 }));
                break;
        }
    };
    const handleNext = () => {
        switch (view) {
            case "week":
                setCurrentDate(currentDate.plus({ weeks: 1 }));
                break;
            case "month":
                setCurrentDate(currentDate.plus({ months: 1 }));
                break;
            case "quarter":
                setCurrentDate(currentDate.plus({ months: 3 }));
                break;
            case "year":
                setCurrentDate(currentDate.plus({ years: 1 }));
                break;
        }
    };
    const handleViewChange = (value) => {
        setView(value);
    };
    const toggleProjectExpand = (projectId) => {
        setExpandedProjects((prev) => ({
            ...prev,
            [projectId]: !prev[projectId],
        }));
    };
    const getColumnWidth = () => {
        switch (view) {
            case "week":
                return "w-24";
            case "month":
                return "w-20";
            case "quarter":
                return "w-16";
            case "year":
                return "w-28";
            default:
                return "w-20";
        }
    };
    return (_jsxs(Grid, { className: cn("w-full", className), children: [_jsxs(Flex, { justify: "between", gap: "4", className: "mb-4", children: [_jsxs(Flex, { align: "center", gap: "2", children: [_jsx(Button, { variant: "soft", onClick: handlePrevious, "aria-label": "Previous period", children: _jsx(ChevronLeft, { className: `${iconSize}` }) }), _jsx(Button, { variant: "soft", onClick: handleNext, "aria-label": "Next period", children: _jsx(ChevronRight, { className: `${iconSize}` }) })] }), _jsxs(Heading, { size: "4", className: "ml-2 font-semibold ", children: [view === "week" &&
                                `Week of ${currentDate.startOf("week").toFormat("LLL d, yyyy")}`, view === "month" && currentDate.toFormat("LLLL yyyy"), view === "quarter" &&
                                `Q${Math.ceil(currentDate.month / 3)} ${currentDate.year}`, view === "year" && currentDate.year.toString()] }), _jsxs(Flex, { align: "center", children: [_jsxs(Select.Root, { value: view, onValueChange: handleViewChange, defaultValue: "Month", children: [_jsx(Select.Trigger, { className: "w-[120px]", placeholder: "View" }), _jsxs(Select.Content, { children: [_jsx(Select.Item, { value: "week", children: "Week" }), _jsx(Select.Item, { value: "month", children: "Month" }), _jsx(Select.Item, { value: "quarter", children: "Quarter" }), _jsx(Select.Item, { value: "year", children: "Year" })] })] }), _jsxs(Flex, { align: "center", className: "gap-2 pl-2", children: [_jsx(IconButton, { color: "gray", variant: "soft", onClick: () => console.log("Filter functionality coming soon"), className: "h-9 w-9 cursor-pointer", children: _jsx(SlidersHorizontal, { size: 20 }) }), _jsxs(Button, { onClick: () => console.log("Add project functionality coming soon"), variant: "solid", className: "h-9 cursor-pointer", children: [_jsx(Plus, { size: 16 }), "Add Project"] })] })] })] }), _jsx(Box, { className: " overflow-hidden rounded-md border-gray-5 border-x border-t", children: _jsxs(Grid, { columns: "auto 1fr", children: [_jsxs(Box, { className: "w-80 border-gray-5 border-r", children: [_jsx(Flex, { align: "center", className: "h-16 border-gray-5 border-b p-2 px-4", children: _jsx(Text, { as: "span", className: "font-medium", children: "Project Name" }) }), tasks.map((task) => (_jsxs(Box, { children: [_jsxs(Box, { className: cn("relative h-16 w-full cursor-pointer rounded-none border-gray-5 border-b bg-transparent text-gray-11", expandedProjects[task.id] && "bg-gray-3 text-gray-12"), children: [_jsx(Text, { className: "absolute top-0 left-0 h-full w-1.5", style: { background: task.color } }), _jsxs(Button, { onClick: () => toggleProjectExpand(task.id), className: "flex h-full w-full items-center justify-start gap-2 bg-transparent p-2 pl-4 text-gray-12", children: [task.subtasks && task.subtasks.length > 0 ? (_jsx(_Fragment, { children: expandedProjects[task.id] ? (_jsx(ChevronDown, { className: "h-6 w-6" })) : (_jsx(ChevronRight, { className: "h-6 w-6" })) })) : (_jsx(Box, { className: "mr-2 w-6" })), _jsx(Text, { as: "span", className: "truncate font-medium", children: task.name })] }), _jsx(EditDropdown, { tasks: tasks, task: task, setTasks: setTasks })] }), expandedProjects[task.id] &&
                                            task.subtasks?.map((subtask, index) => (_jsx(Box, { className: cn("flex h-16 items-center bg-gray-3 p-2 pl-8", index === (task.subtasks?.length ?? 0) - 1 &&
                                                    "border-gray-5 border-b"), children: _jsx(Text, { as: "span", className: "truncate", children: subtask.name }) }, `subtask-name-${subtask.id}`)))] }, `task-name-${task.id}`)))] }), _jsx(ScrollArea, { type: "always", className: "h-full", scrollbars: "horizontal", children: _jsxs(Box, { className: "min-w-max", children: [_jsx(CalendarHeader, { dates: dates, view: view, columnWidth: getColumnWidth() }), _jsx(Box, { className: "relative", children: tasks.map((task) => (_jsxs(Box, { children: [_jsx(Box, { className: "relative flex h-16 flex-col justify-center border-gray-5 border-b", children: _jsx(TaskBar, { task: task, dates: dates, view: view, columnWidth: getColumnWidth() }) }), expandedProjects[task.id] &&
                                                    task.subtasks?.map((subtask) => (_jsx(Box, { className: "relative flex h-16 flex-col justify-center border-gray-5 border-b", children: _jsx(TaskBar, { task: subtask, dates: dates, view: view, columnWidth: getColumnWidth() }) }, `subtask-bar-${subtask.id}`)))] }, `task-bar-${task.id}`))) })] }) })] }) })] }));
}
//# sourceMappingURL=gantt-chart.js.map