import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, Heading, Text } from "@/components";
import { formatDTDate } from "@/lib/utils/date";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { DateTime } from "luxon";
import { getColorClass, getLightColorClass } from "../../project-utils";
export function ProjectTimeline({ project, detailed = false, }) {
    const now = DateTime.now();
    const { startDate, endDate, progress, color } = project;
    // Calculate the position of today's marker
    const totalDays = endDate.diff(startDate, "days").days;
    const elapsedDays = now.diff(startDate, "days").days;
    const todayPosition = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);
    // Determine if today is within the project timeline
    const isTodayInRange = now >= startDate && now <= endDate;
    const baseColor = getColorClass(color);
    return (_jsxs(Box, { className: "space-y-4", children: [_jsxs(Box, { className: "relative pt-6", children: [_jsx(Box, { className: "h-3 overflow-hidden rounded-full bg-gray-200", children: _jsx(Box, { className: `h-full ${baseColor}`, style: { width: `${progress}%` } }) }), _jsxs(Box, { className: "-translate-x-1/2 absolute top-0 left-0 transform", children: [_jsx(Box, { className: "h-3 w-3 rounded-full bg-gray-400" }), _jsx(Box, { className: "mt-1 whitespace-nowrap text-gray-500 text-xs", children: formatDTDate(startDate) })] }), _jsxs(Box, { className: "absolute top-0 right-0 translate-x-1/2 transform", children: [_jsx(Box, { className: "h-3 w-3 rounded-full bg-gray-400" }), _jsx(Box, { className: "mt-1 whitespace-nowrap text-gray-500 text-xs", children: formatDTDate(endDate) })] }), isTodayInRange && (_jsxs(Box, { className: "-translate-x-1/2 absolute top-0 transform", style: { left: `${todayPosition}%` }, children: [_jsx(Box, { className: "h-3 w-3 rounded-full bg-blue-500" }), _jsx(Box, { className: "mt-1 whitespace-nowrap text-blue-500 text-xs", children: "Today" })] }))] }), detailed && project.subProjects && project.subProjects.length > 0 && (_jsxs(Box, { className: "mt-8 space-y-6", children: [_jsx(Heading, { className: "font-medium text-lg", children: "Sub-Projects Timeline" }), _jsx(Box, { className: "space-y-6", children: project.subProjects.map((subProject) => (_jsxs(Box, { className: "space-y-2", children: [_jsxs(Flex, { align: "center", justify: "between", children: [_jsx(Heading, { className: "font-medium", children: subProject.name }), _jsxs(Text, { as: "span", className: "text-gray-500 text-sm", children: [subProject.progress, "%"] })] }), _jsx(Box, { className: "relative h-8 overflow-hidden rounded-md bg-gray-100", children: (() => {
                                        const parentDuration = project.endDate.diff(project.startDate, "days").days;
                                        const subStartOffset = subProject.startDate.diff(project.startDate, "days").days;
                                        const subDuration = subProject.endDate.diff(subProject.startDate, "days").days;
                                        const startPercent = (subStartOffset / parentDuration) * 100;
                                        const widthPercent = (subDuration / parentDuration) * 100;
                                        const subBaseColor = getColorClass(subProject.color);
                                        const subLightColor = getLightColorClass(subProject.color);
                                        return (_jsxs(Box, { className: `absolute h-full ${subLightColor} flex items-center px-2`, style: {
                                                left: `${startPercent}%`,
                                                width: `${widthPercent}%`,
                                            }, children: [_jsx(Box, { className: `h-full ${subBaseColor}`, style: { width: `${subProject.progress}%` } }), _jsx(Text, { className: "absolute ml-2 max-w-[90%] truncate font-medium text-white text-xs", children: subProject.name })] }));
                                    })() })] }, subProject.id))) })] }))] }));
}
//# sourceMappingURL=project-timeline.js.map