import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Ellipsis, EllipsisVertical, Settings } from "lucide-react";
import { motion } from "motion/react";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
import { Avatar, Box, Button, Calendar, CardContainer, Checkbox, Flex, Grid, Heading, IconButton, ScrollArea, Text, } from "@/components/base";
import { RadialBarChart, StatisticsBarChartView, StatsCard, } from "@/components/chart";
import { dashboardColorValues } from "@/lib/utils/colors";
import { SmartDatetimeInput } from "@/components/datetime-picker";
import { KanbanImages } from "@/components/kanban-board/images";
import { revisionData, taskStats } from "./data";
import PostingCalendar from "./posting-calendar";
import RecentActivity from "./recent-activity";
const stats = [
    { label: "Ongoing", value: 420, color: dashboardColorValues.color1 },
    { label: "Hold", value: 210, color: dashboardColorValues.color2 },
    { label: "Done", value: 200, color: dashboardColorValues.color3 },
];
// Colors for the chart segments
const ongoingColor = dashboardColorValues.color1;
const onHoldColor = dashboardColorValues.color2;
const completedColor = dashboardColorValues.color3;
export function Project1() {
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [activeTab, setActiveTab] = useState("month");
    const [revisions, setRevisions] = useState(revisionData);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleFilterRevision = (tab) => {
        setActiveTab(tab);
        setRevisions(revisionData.filter((revision) => revision.type === tab));
    };
    return (_jsx("div", { children: _jsxs(Flex, { gap: "6", children: [_jsx(Box, { className: "w-full", children: _jsxs(Box, { className: "grid grid-cols-12 gap-8 ", children: [_jsx(Grid, { columns: "2", gap: "4", className: "col-span-5 2xl:col-span-4", children: taskStats.map((stat, _index) => (_jsx(StatsCard, { count: stat.count, label: stat.label, iconClassName: stat.backgroundColorClass, icon: stat.icon }, stat.label))) }), _jsxs(CardContainer, { className: "col-span-7 2xl:col-span-8", children: [_jsxs(Flex, { justify: "between", children: [_jsx(Heading, { size: "5", className: "pb-4", children: "Statistics" }), _jsx(Box, { className: "w-40", children: _jsx(SmartDatetimeInput, { className: "bg-gray-2", showTimePicker: false, value: selectedDate, onValueChange: handleDateChange, placeholder: "Enter a date" }) })] }), _jsx(StatisticsBarChartView, {})] }), _jsxs(CardContainer, { className: "col-span-5 2xl:col-span-4", children: [_jsxs(Flex, { justify: "between", align: "center", children: [_jsx(Heading, { className: "font-poppins text-[20px]", children: "Projects" }), _jsx(IconButton, { variant: "ghost", className: "m-0 flex cursor-pointer flex-row items-center p-0", children: _jsx(Ellipsis, {}) })] }), _jsx(RadialBarChart, { colors: [ongoingColor, onHoldColor, completedColor], labels: ["Ongoing", "Hold", "Done"], series: [420, 210, 200] }), _jsx(Grid, { columns: "3", gap: "4", className: "mt-2", children: stats.map((stat) => (_jsxs("div", { className: `border-gray-5 border-l text-center ${stat.label === "Ongoing" && "border-none"}`, children: [_jsx(Box, { className: "mx-auto mb-1 h-2 w-2 rounded-lg", style: { backgroundColor: stat.color } }), _jsx(Text, { as: "p", className: "text-2xl", children: stat.value }), _jsx(Text, { className: "text-gray-10 text-sm", children: stat.label })] }, stat.label))) })] }), _jsxs(CardContainer, { className: "col-span-7 2xl:col-span-8", children: [_jsxs(Flex, { justify: "between", align: "center", className: "pb-4", children: [_jsx(Heading, { size: "5", children: "Active Tasks" }), _jsx(Flex, { align: "center", gap: "2", className: "rounded-xl border border-gray-5 p-2 px-3", children: ["month", "week", "day"].map((tab) => (_jsxs(Button, { variant: "ghost", onClick: () => {
                                                        handleFilterRevision(tab);
                                                    }, className: `relative inline-block flex-1 cursor-pointer rounded-xl px-4 py-1.5 font-medium text-sm transition-colors ${activeTab === tab ? "text-white" : ""}`, children: [activeTab === tab && (_jsx(motion.span, { layoutId: "tab-indicator", className: "absolute inset-0 inline-block h-full w-full rounded-xl bg-indigo-9" })), _jsx("span", { className: "relative z-10 capitalize", children: tab })] }, tab))) })] }), _jsx(Box, { className: "space-y-3", children: revisions.length === 0 ? (_jsx(Text, { className: "text-gray-8 text-sm", children: "No revisions found" })) : (_jsxs(_Fragment, { children: [" ", revisions.map((revision) => (_jsxs(Flex, { align: "center", className: "relative rounded-lg border border-gray-5 p-3", style: {
                                                        borderLeftWidth: "4px",
                                                        borderLeftColor: revision.color,
                                                    }, children: [_jsx(Box, { className: "mr-3 flex-shrink-0", children: _jsx(Checkbox, { size: "3", className: "h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white " }) }), _jsxs(Box, { className: "min-w-0 flex-1", children: [_jsx(Text, { as: "p", className: "font-medium text-sm", children: revision.recipient || "Regina Cooper" }), _jsxs(Text, { className: "truncate text-gray-8 text-sm", children: ["Sending project", " ", _jsxs("span", { className: "text-blue-600", children: ["#", revision.projectNumber] }), " ", "for revision to ", revision.recipient] })] }), _jsx(IconButton, { variant: "ghost", className: "ml-2 flex-shrink-0 cursor-pointer", children: _jsx(EllipsisVertical, { className: "h-5 w-5" }) })] }, revision.id)))] })) })] }), _jsx(CardContainer, { className: "col-span-12", children: _jsx(PostingCalendar, {}) })] }) }), _jsx(Box, { className: " sticky top-0 h-screen w-80 shrink-0 rounded-xl border border-gray-5 bg-white dark:bg-gray-2 ", children: _jsxs(ScrollArea, { className: "h-full", children: [_jsxs(Flex, { justify: "between", align: "center", className: "w-full border-gray-5 border-b p-4", children: [_jsxs(Flex, { gap: "3", align: "center", children: [_jsx(Avatar, { src: KanbanImages?.user1, name: "A" }), _jsxs(Box, { className: "space-y-0", children: [_jsx(Text, { as: "p", className: "font-medium text-gray-12", children: "ArtTemplate" }), _jsx(Text, { className: "text-gray-9", children: "example@mail.com" })] })] }), _jsx(IconButton, { variant: "ghost", className: "cursor-pointer", children: _jsx(Settings, {}) })] }), _jsx(Box, { className: "w-full border-gray-5 border-b p-4", children: _jsx(Calendar, { id: "calendar", mode: "single", className: "w-full", initialFocus: true }) }), _jsx(Box, { className: "p-8 ", children: _jsx(RecentActivity, {}) })] }) })] }) }));
}
//# sourceMappingURL=project-1.js.map