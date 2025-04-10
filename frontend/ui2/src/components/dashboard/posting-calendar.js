import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useMemo } from "react";
import { Box, Flex, Grid, Heading, IconButton, Text, Tooltip, } from "@/components/radixui";
import { cn } from "@/lib/utils";
import { Ellipsis, Zap } from "lucide-react";
export default function PostingCalendar() {
    const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const hoursOfDay = [
        "12AM",
        "1AM",
        "2AM",
        "3AM",
        "4AM",
        "5AM",
        "6AM",
        "7AM",
        "8AM",
        "9AM",
        "10AM",
        "11AM",
        "12PM",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM",
        "6PM",
        "7PM",
        "8PM",
        "9PM",
        "10PM",
        "11PM",
    ];
    const tasks = [
        {
            day: "TU",
            time: "2AM",
            hasLightning: false,
            description: "Schedule social media posts",
        },
        {
            day: "TU",
            time: "9AM",
            hasLightning: true,
            description: "Urgent: Team meeting",
        },
        {
            day: "TU",
            time: "3PM",
            hasLightning: false,
            description: "Review content drafts",
        },
        {
            day: "TU",
            time: "5PM",
            hasLightning: false,
            description: "Send weekly newsletter",
        },
        {
            day: "TU",
            time: "8PM",
            hasLightning: true,
            description: "Urgent: Publish press release",
        },
        {
            day: "WE",
            time: "11AM",
            hasLightning: false,
            description: "Content planning session",
        },
        {
            day: "WE",
            time: "5PM",
            hasLightning: true,
            description: "Urgent: Client deliverable",
        },
        {
            day: "WE",
            time: "10PM",
            hasLightning: false,
            description: "Schedule weekend posts",
        },
        {
            day: "TH",
            time: "3AM",
            hasLightning: false,
            description: "International market posts",
        },
        {
            day: "TH",
            time: "10AM",
            hasLightning: false,
            description: "Team check-in",
        },
        {
            day: "TH",
            time: "1PM",
            hasLightning: false,
            description: "Content review",
        },
        {
            day: "TH",
            time: "6PM",
            hasLightning: true,
            description: "Urgent: Crisis response",
        },
        {
            day: "FR",
            time: "2AM",
            hasLightning: true,
            description: "Urgent: International launch",
        },
        {
            day: "FR",
            time: "10AM",
            hasLightning: true,
            description: "Urgent: Executive review",
        },
        {
            day: "FR",
            time: "12PM",
            hasLightning: false,
            description: "Weekly report",
        },
        {
            day: "FR",
            time: "6PM",
            hasLightning: false,
            description: "Weekend content prep",
        },
        {
            day: "SA",
            time: "4AM",
            hasLightning: false,
            description: "Scheduled post",
        },
        {
            day: "SA",
            time: "10AM",
            hasLightning: false,
            description: "Weekend engagement",
        },
        {
            day: "SA",
            time: "4PM",
            hasLightning: false,
            description: "Performance review",
        },
        {
            day: "SA",
            time: "10PM",
            hasLightning: false,
            description: "Sunday prep",
        },
        {
            day: "SU",
            time: "12PM",
            hasLightning: false,
            description: "Weekly content plan",
        },
        { day: "SU", time: "5PM", hasLightning: false, description: "Monday prep" },
    ];
    const getTasksAtTime = (day, time) => {
        return tasks.filter((task) => task.day === day && task.time === time);
    };
    const _getDayName = (shortDay) => {
        const dayMap = {
            MO: "Monday",
            TU: "Tuesday",
            WE: "Wednesday",
            TH: "Thursday",
            FR: "Friday",
            SA: "Saturday",
            SU: "Sunday",
        };
        return dayMap[shortDay] || shortDay;
    };
    const immediateTasksSorted = useMemo(() => {
        return tasks
            .filter((task) => task.hasLightning)
            .sort((a, b) => {
            const dayOrder = daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
            if (dayOrder !== 0)
                return dayOrder;
            return hoursOfDay.indexOf(a.time) - hoursOfDay.indexOf(b.time);
        })
            .slice(0, 2);
    }, [tasks]);
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { justify: "between", align: "center", className: "mb-4", children: [_jsx(Heading, { size: "5", children: "Posting Tasks" }), _jsx(IconButton, { variant: "ghost", children: _jsx(Ellipsis, {}) })] }), _jsxs(Text, { as: "p", children: ["Immediate tasks:", " ", immediateTasksSorted.length > 0 ? (immediateTasksSorted.map((task, index) => (_jsxs(React.Fragment, { children: [_jsxs(Text, { className: "underline", children: [_getDayName(task.day), " at ", task.time] }), index < immediateTasksSorted.length - 1 && " / "] }, `${task.day}-${task.time}-${task.description}`)))) : (_jsx(Text, { children: "None" }))] }), _jsx(Box, { className: "relative overflow-x-auto", children: _jsxs(Grid, { className: "grid grid-cols-[auto_repeat(24,minmax(40px,1fr))] gap-1", children: [_jsx(Box, { className: "h-10" }), hoursOfDay.map((hour) => (_jsx(Flex, { align: "end", justify: "center", className: " h-10 pb-1 text-center text-gray-10 text-xs", children: hour }, hour))), daysOfWeek.map((day) => (_jsxs(React.Fragment, { children: [_jsx(Flex, { align: "center", justify: "end", className: "h-10 pr-2 text-gray-10 text-sm", children: day }), hoursOfDay.map((time) => {
                                    const tasksAtTime = getTasksAtTime(day, time);
                                    const hasTask = tasksAtTime.length > 0;
                                    const hasLightning = hasTask && tasksAtTime.some((task) => task.hasLightning);
                                    return (_jsx(Tooltip, { content: hasTask
                                            ? tasksAtTime.map((task) => (_jsxs("div", { className: "py-1", children: [task.description, task.hasLightning && " (Urgent)"] }, `${task.day}-${task.time}-${task.description}`)))
                                            : "No tasks scheduled", side: "top", children: _jsx(Box, { className: cn("flex h-10 w-full cursor-pointer items-center justify-center rounded", hasTask
                                                ? "bg-dashboard-orange/30"
                                                : "bg-gray-3 hover:bg-gray-5", hasLightning &&
                                                "bg-dashboard-orange/80 hover:bg-dashboard-orange"), children: hasLightning && (_jsx(Zap, { size: 16, className: "fill-white stroke-white" })) }) }, `${day}-${time}`));
                                })] }, day)))] }) })] }));
}
//# sourceMappingURL=posting-calendar.js.map