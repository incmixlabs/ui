import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box } from "@/components/base";
import { cn } from "@/lib/utils";
import { lazy } from "react";
const ReactApexChart = lazy(() => import("react-apexcharts"));
export function SparkChart({ title, data, color, className }) {
    const chartData = {
        series: [
            {
                name: title,
                data: data,
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 40,
                sparkline: {
                    enabled: true,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: [color],
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                    borderRadius: 2,
                },
            },
            tooltip: {
                enabled: false,
            },
            xaxis: {
                crosshairs: {
                    width: 1,
                },
            },
            stroke: {
                width: 0,
            },
        },
    };
    return (_jsx(_Fragment, { children: _jsx(Box, { className: cn("", className), children: typeof window !== "undefined" && (_jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: "bar", height: "100%" })) }) }));
}
//# sourceMappingURL=spark-chart.js.map