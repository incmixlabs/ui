import React from "react";
/**
 * Utility function that parses dates.
 * Parses a given date string using the `chrono-node` library.
 *
 * @param str - A string representation of a date and time.
 * @returns A `Date` object representing the parsed date and time, or `null` if the string could not be parsed.
 */
export declare const parseDateTime: (str: Date | string) => Date | null;
/**
 * Converts a given timestamp or the current date and time to a string representation in the local time zone.
 * format: `HH:mm`, adjusted for the local time zone.
 *
 * @param timestamp {Date | string}
 * @returns A string representation of the timestamp
 */
export declare const getDateTimeLocal: (timestamp?: Date) => string;
interface SmartDatetimeInputProps {
    value?: Date;
    onValueChange: (date: Date) => void;
    showCalendar?: boolean;
    removeInput?: boolean;
    showTimePicker?: boolean;
}
export declare const SmartDatetimeInput: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "ref" | "onBlur" | "type" | "value"> & SmartDatetimeInputProps & React.RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=datetime-picker.d.ts.map