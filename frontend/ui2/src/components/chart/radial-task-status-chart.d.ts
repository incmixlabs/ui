export interface TaskItem {
    /**
     * Name of the task status
     */
    name: string;
    /**
     * Value/count of tasks in this status
     */
    value: number;
    /**
     * Color for this task status
     */
    color: string;
}
interface RadialTaskStatusChartProps {
    /**
     * Array of task data items
     * @default Default task data (Ongoing, Hold, Done)
     */
    tasks?: TaskItem[];
    className?: string;
    /**
     * Start angle for the radial chart
     * @default -135
     */
    startAngle?: number;
    /**
     * End angle for the radial chart
     * @default 135
     */
    endAngle?: number;
    /**
     * Size of the hollow center as percentage
     * @default "40%"
     */
    hollowSize?: string;
    /**
     * Track background color
     * @default "#F2F4F7"
     */
    trackBackground?: string;
    /**
     * Show labels below the chart
     * @default true
     */
    showLabels?: boolean;
}
export default function RadialTaskStatusChart({ tasks, startAngle, endAngle, hollowSize, className, trackBackground, }: RadialTaskStatusChartProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=radial-task-status-chart.d.ts.map