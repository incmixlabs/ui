import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from "@/components/base";
import { getColorClass } from "../../project-utils";
export function ProjectProgressBar({ project, compact = false, showDetails = false, }) {
    const { progress, color } = project;
    const baseColor = getColorClass(color);
    return (_jsxs(Box, { className: `${compact ? "" : "py-2"}`, children: [_jsxs(Box, { className: "mb-1 flex items-center justify-between", children: [showDetails && (_jsx(Text, { as: "span", className: "font-medium ", children: project.name })), _jsxs(Text, { as: "span", className: "font-medium", children: [progress, "%"] })] }), _jsx(Box, { className: "h-4 w-full overflow-hidden rounded-full bg-gray-200", children: _jsx(Box, { className: `h-full rounded-full ${baseColor}`, style: { width: `${progress}%` } }) })] }));
}
//# sourceMappingURL=project-progress-bar.js.map