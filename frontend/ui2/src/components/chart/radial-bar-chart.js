import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, useMemo, useState } from "react";
const Chart = lazy(() => import("react-apexcharts"));
import { useThemeContext } from "@radix-ui/themes";
export const RadialBarChart = ({ series = [44, 55, 90], labels = ["Ongoing", "Hold", "Done"], colors = ["var(--orange-9)", "var(--indigo-9)", "var(--amber-9)"], }) => {
    const [_series] = useState(series);
    const { appearance } = useThemeContext();
    const isDarkMode = appearance === "dark";
    // Memoize chart options to prevent unnecessary re-renders
    const _options = useMemo(() => ({
        chart: {
            width: 100,
            type: "donut",
            animations: {
                enabled: true,
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                },
            },
            background: "transparent",
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        stroke: {
            width: 0,
            colors: ["hsl(var(--foreground))"],
        },
        fill: {
            colors: colors,
            opacity: 1,
            type: "solid",
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: "14px",
                            fontFamily: "Poppins",
                            color: "hsl(var(--foreground))",
                        },
                        value: {
                            show: true,
                            fontSize: "24px",
                            fontFamily: "Poppins",
                            color: "hsl(var(--foreground))",
                            formatter: (val) => `${val}`,
                        },
                    },
                },
            },
        },
        labels: labels,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 20,
                    },
                },
            },
        ],
        theme: {
            mode: isDarkMode ? "dark" : "light",
        },
    }), [colors, isDarkMode, labels]);
    return (_jsx("figure", { "aria-label": `Donut chart showing ${labels.join(", ")} statistics`, children: _jsx("div", { className: "custom-chart-container", children: _jsx(Chart, { options: _options, series: _series, type: "donut" }) }) }));
};
//# sourceMappingURL=radial-bar-chart.js.map