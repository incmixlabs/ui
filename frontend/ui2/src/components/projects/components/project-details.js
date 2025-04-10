import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CalendarDays, DollarSign } from "lucide-react";
import { Box, Flex, Heading, Text } from "@/components/base";
import { ProjectsImages } from "../images";
const projectDetails = [
    {
        label: "Budget",
        value: "2.500.00",
        icon: _jsx(DollarSign, {}),
        bgColor: "bg-green-3",
        textColor: "text-green-8",
    },
    {
        label: "Start Date",
        value: "17 Jun, 2020",
        icon: _jsx(CalendarDays, {}),
        bgColor: "bg-blue-3",
        textColor: "text-blue-8",
    },
    {
        label: "End Date",
        value: "04 Jul, 2020",
        icon: _jsx(CalendarDays, {}),
        bgColor: "bg-orange-3",
        textColor: "text-orange-8",
    },
];
function ProjectDetails() {
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { align: "center", gap: "3", children: [_jsx(Box, { className: "relative grid h-14 w-14 place-content-center rounded-xl border-2 border-gray-4 p-2", children: _jsx("img", { src: ProjectsImages.dropbox, alt: "dropbox", width: 48, height: 48, className: "object-contain" }) }), _jsxs(Box, { children: [_jsx(Heading, { as: "h3", className: "font-medium text-gray-12", size: "4", children: "App Development" }), _jsx(Text, { as: "p", className: "text-gray-11", children: "Dropbox, Inc." })] })] }), _jsxs(Box, { className: "space-y-2 py-6 pt-4", children: [_jsx(Heading, { size: "4", className: "font-medium text-gray-11", children: "DETAILS" }), _jsx(Flex, { justify: "between", className: "pt-1", children: projectDetails.map((detail) => (_jsxs(Flex, { gap: "3", children: [_jsx(Box, { className: `grid h-10 w-10 place-content-center rounded-lg ${detail.bgColor} ${detail.textColor}`, children: detail.icon }), _jsxs(Box, { children: [_jsx(Text, { as: "span", className: "text-gray-11 text-sm", children: detail.label }), _jsx(Text, { as: "p", className: "text-sm", children: detail.value })] })] }, detail.label))) })] }), _jsxs(Box, { className: "space-y-2 py-6 pt-4", children: [_jsx(Heading, { size: "4", className: "font-medium text-gray-11", children: "DESCRIPTION" }), _jsx(Text, { as: "p", className: "text-gray-10 leading-[120%]", children: "We need to develop several options (Inbox template, Chat template, tasks template, Projects template) of cool user interface design templates - to carefully work out the smallest details." })] })] }));
}
export default ProjectDetails;
//# sourceMappingURL=project-details.js.map