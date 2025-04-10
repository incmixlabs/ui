interface WeeklyActivityChartProps {
    /**
     * Array of values for each day
     * @default [30, 65, 45, 80, 55, 40, 65]
     */
    values?: number[];
    /**
     * Array of day labels
     * @default ["M", "T", "W", "T", "F", "S", "S"]
     */
    days?: string[];
    /**
     * Primary color for bars
     * @default "#4361EE"
     */
    primaryColor?: string;
    /**
     * Highlight color for the specified day
     * @default "#FF9D66"
     */
    highlightColor?: string;
    /**
     * Index of the day to highlight (0-based)
     * @default 3
     */
    highlightDay?: number;
    /**
     * Height of the chart
     * @default 250
     */
    height?: number;
    /**
     * Width of the bars (as percentage)
     * @default "40%"
     */
    barWidth?: string;
    /**
     * Border radius of the bars
     * @default 10
     */
    borderRadius?: number;
    className?: string;
}
export declare function WeeklyActivityChart({ values, days, primaryColor, highlightColor, highlightDay, barWidth, borderRadius, className, }: WeeklyActivityChartProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=statisic-weekly-active-chart.d.ts.map