import { DateTime } from "luxon";
import type { ViewType } from "./gantt-chart";
interface CalendarHeaderProps {
    dates: DateTime[];
    view: ViewType;
    columnWidth: string;
}
export declare function CalendarHeader({ dates, view, columnWidth, }: CalendarHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=calendar-header.d.ts.map