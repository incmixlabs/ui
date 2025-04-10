"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@/components/base";
import { cn } from "@/lib/utils";
import { lazy, useEffect, useState } from "react";
const ReactApexChart = lazy(() => import("react-apexcharts"));
export function WeeklyActivityChart({ values = [30, 65, 45, 80, 55, 40, 65], days = ["M", "T", "W", "T", "F", "S", "S"], primaryColor = "#3366FF", highlightColor = "#FF9D66", highlightDay = 3, barWidth = "40%", borderRadius = 10, className, }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    // Create colors array with the highlighted day
    const colors = days.map((_, index) => index === highlightDay ? highlightColor : primaryColor);
    // Chart options
    const options = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius,
                columnWidth: barWidth,
                distributed: true,
                endingShape: "rounded",
            },
        },
        colors: colors,
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: days,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: Array(days.length).fill("#9CA3AF"),
                    fontSize: "14px",
                },
            },
        },
        yaxis: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                },
            },
            active: {
                filter: {
                    type: "none",
                },
            },
        },
    };
    const series = [
        {
            name: "Activity",
            data: values,
        },
    ];
    return (_jsx(Box, { className: cn("w-full", className), children: mounted && (_jsx(ReactApexChart, { options: options, series: series, type: "bar", height: "100%" })) }));
}
//# sourceMappingURL=statisic-weekly-active-chart.js.map