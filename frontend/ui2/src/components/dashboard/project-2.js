import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Box, Button, Calendar, CardContainer, Checkbox, Flex, Grid, Heading, IconButton, Progress, ScrollArea, Text, } from "@/components/base";
import { dashboardColorValues } from "@/lib/utils/colors";
import { Clipboard, Ellipsis, EllipsisVertical, Settings } from "lucide-react";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { motion } from "motion/react";
import { useState } from "react";
import { SparkChart, WeeklyActivityChart } from "@/components/chart";
import RadialTaskStatusChart from "../chart/radial-task-status-chart";
import { KanbanImages } from "../kanban-board/images";
import { revisionData } from "./data";
import PostingCalendar from "./posting-calendar";
import RecentActivity from "./recent-activity";
const stats = [
    { label: "Ongoing", value: 420, color: dashboardColorValues.color1 },
    { label: "Hold", value: 210, color: dashboardColorValues.color2 },
    { label: "Done", value: 200, color: dashboardColorValues.color3 },
];
export function Project2() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [progressItems, _setProgressItems] = useState([
        {
            category: "Product Design",
            value: 87,
            maxValue: 120,
            color: "indigo",
        },
        {
            category: "Graphic Design",
            value: 108,
            maxValue: 120,
            color: "orange",
        },
        {
            category: "iOS Apps",
            value: 100,
            maxValue: 120,
            color: "yellow",
        },
        {
            category: "Android Apps",
            value: 24,
            maxValue: 120,
            color: "green",
        },
    ]);
    const [activeTab, setActiveTab] = useState("month");
    const [revisions, setRevisions] = useState(revisionData);
    const handleFilterRevision = (tab) => {
        setActiveTab(tab);
        setRevisions(revisionData.filter((revision) => revision.type === tab));
    };
    return (_jsx("div", { children: _jsxs(Flex, { gap: "6", children: [_jsx(Box, { className: "w-full", children: _jsxs(Box, { className: "grid grid-cols-12 gap-4 2xl:gap-8 ", children: [_jsxs(Box, { className: "col-span-2 flex flex-col gap-4", children: [_jsxs(CardContainer, { className: "h-fit space-y-2 text-center", children: [_jsx(SparkChart, { title: "On Hold", className: "h-24", data: [25, 30, 35, 25, 45, 75, 55, 25, 30, 25], color: dashboardColorValues.color2 }), _jsx(Text, { className: "inline-block text-gray-10", children: "Total Task" }), _jsx(Heading, { size: "8", children: "820" })] }), _jsxs(CardContainer, { className: "h-fit space-y-2 text-center", children: [_jsx(SparkChart, { title: "Ongoing", className: "h-24", data: [25, 30, 35, 25, 45, 75, 55, 25, 30, 25], color: dashboardColorValues.color1 }), _jsx(Text, { className: "inline-block text-gray-10", children: "Total Task" }), _jsx(Heading, { size: "8", children: "540" })] })] }), _jsxs(CardContainer, { className: "col-span-5 2xl:col-span-5", children: [_jsxs(Flex, { align: "center", gap: "2", justify: "between", children: [_jsx(Heading, { size: "5", children: "Projects" }), _jsx(IconButton, { children: _jsx(Ellipsis, { size: 16 }) })] }), _jsx(RadialTaskStatusChart, { className: "h-72" }), _jsx(Grid, { columns: "3", gap: "4", className: "mt-2", children: stats.map((stat) => (_jsxs("div", { className: `border-gray-5 border-l text-center ${stat.label === "Ongoing" && "border-none"}`, children: [_jsx(Box, { className: "mx-auto mb-1 h-2 w-2 rounded-lg", style: { backgroundColor: stat.color } }), _jsx(Text, { as: "p", className: "text-2xl", children: stat.value }), _jsx(Text, { className: "text-gray-10", children: stat.label })] }, stat.label))) })] }), _jsxs(CardContainer, { className: "col-span-5 2xl:col-span-5", children: [_jsxs(Flex, { align: "center", gap: "2", justify: "between", children: [_jsx(Heading, { size: "5", children: "Statistics" }), _jsx(IconButton, { children: _jsx(Ellipsis, { size: 16 }) })] }), _jsx(WeeklyActivityChart, { className: "h-72" }), _jsxs(Flex, { align: "center", gap: "2", justify: "between", className: "border-gray-5 border-t pt-2", children: [_jsxs(Flex, { align: "center", gap: "2", children: [_jsx(IconButton, { children: _jsx(Clipboard, { size: 16 }) }), _jsxs(Box, { children: [_jsx(Text, { as: "p", children: "Completed Project" }), _jsx(Text, { className: "text-gray-10", children: "Current Week" })] })] }), _jsx(Heading, { size: "5", className: "font-medium", children: "874" })] })] }), _jsxs(CardContainer, { className: "col-span-7 2xl:col-span-8", children: [_jsxs(Flex, { justify: "between", align: "center", className: "pb-4", children: [_jsx(Heading, { size: "5", children: "Active Tasks" }), _jsx(Flex, { align: "center", gap: "2", className: "rounded-xl border border-gray-5 p-2 px-3", children: ["month", "week", "day"].map((tab) => (_jsxs(Button, { variant: "ghost", onClick: () => {
                                                        handleFilterRevision(tab);
                                                    }, className: `relative inline-block flex-1 cursor-pointer rounded-xl px-4 py-1.5 font-medium text-sm transition-colors ${activeTab === tab ? "text-white" : ""}`, children: [activeTab === tab && (_jsx(motion.span, { layoutId: "tab-indicator", className: "absolute inset-0 inline-block h-full w-full rounded-xl bg-indigo-9" })), _jsx("span", { className: "relative z-10 capitalize", children: tab })] }, tab))) })] }), _jsx(Box, { className: "space-y-3", children: revisions.length === 0 ? (_jsx(Text, { className: "text-gray-8 text-sm", children: "No revisions found" })) : (_jsxs(_Fragment, { children: [" ", revisions.map((revision) => (_jsxs(Flex, { align: "center", className: "relative rounded-lg border border-gray-5 p-3", style: {
                                                        borderLeftWidth: "4px",
                                                        borderLeftColor: revision.color,
                                                    }, children: [_jsx(Box, { className: "mr-3 flex-shrink-0", children: _jsx(Checkbox, { size: "3", className: "h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white " }) }), _jsxs(Box, { className: "min-w-0 flex-1", children: [_jsx(Text, { as: "p", className: "font-medium text-sm", children: revision.recipient || "Regina Cooper" }), _jsxs(Text, { className: "truncate text-gray-10 text-sm", children: ["Sending project", " ", _jsxs("span", { className: "text-blue-600", children: ["#", revision.projectNumber] }), " ", "for revision to ", revision.recipient] })] }), _jsx(IconButton, { variant: "ghost", className: "ml-2 flex-shrink-0 cursor-pointer", children: _jsx(EllipsisVertical, { className: "h-5 w-5" }) })] }, revision.id)))] })) })] }), _jsxs(CardContainer, { className: "col-span-5 2xl:col-span-4", children: [_jsxs(Flex, { justify: "between", align: "center", children: [_jsx(Heading, { className: "font-poppins text-[20px]", children: "Total Projects" }), _jsx(IconButton, { variant: "ghost", className: "m-0 flex cursor-pointer flex-row items-center p-0", children: _jsx(Ellipsis, {}) })] }), _jsx(Box, { className: "space-y-4 pt-10", children: progressItems.map((item, index) => (_jsxs(Box, { className: "space-y-2", children: [_jsxs(Flex, { justify: "between", children: [_jsx(Text, { className: "font-medium text-gray-700 text-sm", children: item.category }), _jsx(Text, { className: "font-medium text-gray-900 text-sm", children: item.value })] }), _jsx(Progress, { value: (item.value / item.maxValue) * 100, className: "h-2 bg-gray-100", color: item.color })] }, index))) })] }), _jsx(CardContainer, { className: "col-span-12", children: _jsx(PostingCalendar, {}) })] }) }), _jsx(Box, { className: " sticky top-0 h-screen w-80 shrink-0 rounded-xl border border-gray-5 bg-white dark:bg-gray-2 ", children: _jsxs(ScrollArea, { className: "h-full", children: [_jsxs(Flex, { justify: "between", align: "center", className: "w-full border-gray-5 border-b p-4", children: [_jsxs(Flex, { gap: "3", align: "center", children: [_jsx(Avatar, { src: KanbanImages?.user1, name: "A" }), _jsxs(Box, { className: "space-y-0", children: [_jsx(Text, { as: "p", className: "font-medium text-gray-12", children: "ArtTemplate" }), _jsx(Text, { className: "text-gray-9", children: "example@mail.com" })] })] }), _jsx(IconButton, { variant: "ghost", className: "cursor-pointer", children: _jsx(Settings, {}) })] }), _jsx(Box, { className: "w-full border-gray-5 border-b p-4", children: _jsx(Calendar, { id: "calendar", mode: "single", className: "w-full", initialFocus: true }) }), _jsx(Box, { className: "p-8 ", children: _jsx(RecentActivity, {}) })] }) })] }) }));
}
//# sourceMappingURL=project-2.js.map