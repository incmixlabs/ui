import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box } from "@/components/base";
import { cn } from "@/lib/utils";
import { dashboardColorValues } from "@/lib/utils/colors";
import { lazy, useEffect, useState } from "react";
// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = lazy(() => import("react-apexcharts"));
export default function RadialTaskStatusChart({ tasks = [
    { name: "Ongoing", value: 420, color: dashboardColorValues.color3 },
    { name: "Hold", value: 210, color: dashboardColorValues.color2 },
    { name: "Done", value: 200, color: dashboardColorValues.color1 },
], startAngle = -135, endAngle = 135, hollowSize = "40%", className, trackBackground = dashboardColorValues.color4, }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    // Calculate total for percentages
    const total = tasks.reduce((acc, item) => acc + item.value, 0);
    // Create series data for the chart
    const series = tasks.map((item) => Math.round((item.value / total) * 100));
    // Chart options
    const options = {
        chart: {
            type: "radialBar",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle,
                endAngle,
                hollow: {
                    size: hollowSize,
                },
                track: {
                    background: trackBackground,
                    strokeWidth: "100%",
                    margin: 5,
                },
                dataLabels: {
                    show: false,
                },
            },
        },
        colors: tasks.map((item) => item.color),
        stroke: {
            lineCap: "round",
        },
        labels: tasks.map((item) => item.name),
    };
    return (_jsx(_Fragment, { children: mounted && (_jsx(Box, { className: cn("h-56 w-full", className), children: _jsx(ReactApexChart, { options: options, series: series, type: "radialBar", height: "100%" }) })) }));
}
//# sourceMappingURL=radial-task-status-chart.js.map