import type { ButtonProps } from "@radix-ui/themes";
import { DateTime } from "luxon";
export type ExtendedColorType = ButtonProps["color"];
export type ViewType = "week" | "month" | "quarter" | "year";
export interface Task {
    id: string;
    name: string;
    startDate: DateTime;
    endDate: DateTime;
    progress: number;
    color?: ExtendedColorType;
    subtasks?: Task[];
}
interface GanttChartProps {
    projectTasks: Task[];
    className?: string;
}
export declare function GanttChart({ projectTasks, className }: GanttChartProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=gantt-chart.d.ts.map