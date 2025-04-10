import type { AutoFormInputComponentProps } from "../types";
/**
 * Renders a date input field with validation and ISO formatting for form integration.
 *
 * This component displays a labeled date input using a smart datetime picker. It converts the provided
 * field value to a Date object if necessary, filters out invalid dates, and only uses a valid date for display.
 * When a new date is selected, the component converts it to an ISO string before invoking the change handler,
 * ensuring compatibility with JSON schema validation.
 *
 * @param label - The text label displayed above the date input.
 * @param isRequired - Whether the date field is mandatory.
 * @param field - An object containing the current date value and a change handler.
 * @param fieldProps - Optional properties to customize the input, such as placeholder text, time picker options, and styling.
 *
 * @returns A React element that includes the label, date input, and associated form message.
 */
export default function AutoFormDate({ label, isRequired, field, fieldProps, }: AutoFormInputComponentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=date.d.ts.map