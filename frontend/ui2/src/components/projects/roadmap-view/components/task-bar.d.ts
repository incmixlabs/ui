import type { DateTime } from "luxon";
import type { Task, ViewType } from "./gantt-chart";
interface TaskBarProps {
    task: Task;
    dates: DateTime[];
    view: ViewType;
    columnWidth: string;
}
export declare function TaskBar({ task, dates, view, columnWidth }: TaskBarProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=task-bar.d.ts.map