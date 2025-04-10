import { DateTime } from "luxon";
export declare const getDate: (timezone?: string) => {
    time: string;
    date: string;
};
export declare const getWeekDay: (dateTime: string | Date) => string | null;
export declare const getRelativeTime: (dateTime: string | Date, format?: string) => string | null;
export declare function formatDTDate(date: DateTime, format?: string): string;
export declare function formatDate(date: Date | string | number, opts?: Intl.DateTimeFormatOptions): string;
export declare function calculateDaysRemaining(endDate: DateTime): number;
export declare function calculateDaysElapsed(startDate: DateTime): number;
export declare function calculateTotalDuration(startDate: DateTime, endDate: DateTime): number;
export declare function calculateProgressPercentage(startDate: DateTime, endDate: DateTime): number;
//# sourceMappingURL=date.d.ts.map