import { DateTime } from "luxon";
export interface CalendarEvent {
    id: string;
    eventName: string;
    calendar: string;
    color: "blue" | "orange" | "green" | "yellow";
    date: DateTime;
}
interface CalendarProps {
    className?: string;
    events?: CalendarEvent[];
    onAddEvent?: (date: DateTime) => void;
    onRemoveEvent?: (event: CalendarEvent) => void;
    onEditEvent?: (event: CalendarEvent, newName: string) => void;
}
export declare function Calendar({ className, events, onAddEvent, onRemoveEvent, onEditEvent, }: CalendarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=calendar.d.ts.map