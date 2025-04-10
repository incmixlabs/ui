import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, Text } from "@/components/base";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
export function CalendarHeader({ dates, view, columnWidth, }) {
    const today = DateTime.now();
    const getDayName = (date) => {
        return date.toFormat("ccc").toUpperCase();
    };
    const isToday = (date) => {
        return date.hasSame(today, "day");
    };
    return (_jsx(Box, { className: "sticky top-0 z-20 h-16 border-gray-5 border-b", children: _jsx(Grid, { height: "full", columns: "min-content", flow: "column", children: view === "year"
                ? dates.map((date) => (_jsx(Box, { className: cn("flex h-full flex-col items-center justify-center border-gray-5 border-r py-1", columnWidth, date.month === today.month && date.year === today.year
                        ? "bg-blue-500 text-white"
                        : ""), children: _jsx(Text, { as: "span", className: "font-medium", children: date.toFormat("MMM") }) }, `year-${date.toISODate()}`)))
                : dates.map((date) => (_jsxs(Box, { className: cn("flex h-full flex-col items-center justify-center border-gray-5 border-r py-1", columnWidth), children: [_jsx(Text, { as: "span", className: "text-gray-500 text-xs", children: getDayName(date) }), _jsx(Box, { className: cn("mt-1 flex h-8 w-8 items-center justify-center rounded-full font-medium", isToday(date) ? "bg-blue-500 text-white" : ""), children: date.day })] }, `year-${date.toISODate()}`))) }) }));
}
//# sourceMappingURL=calendar-header.js.map