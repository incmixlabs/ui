interface StatisticsBarChartViewProps {
    /** Title of the chart */
    title?: string;
    /** Categories for x-axis (e.g. months) */
    categories?: string[];
    /** Data for new tasks */
    newTasksData?: number[];
    /** Data for in progress tasks */
    inProgressData?: number[];
    /** Color for new tasks bars */
    newTasksColor?: string;
    /** Color for in progress tasks bars */
    inProgressColor?: string;
}
export declare const StatisticsBarChartView: React.FC<StatisticsBarChartViewProps>;
export {};
//# sourceMappingURL=statistic-bar-chart.d.ts.map