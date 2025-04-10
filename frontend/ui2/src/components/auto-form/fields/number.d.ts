import type { AutoFormInputComponentProps } from "../types";
/**
 * Renders a number input field with optional label and currency formatting.
 *
 * This component conditionally displays a label (enabled by default unless overridden by `fieldProps.showLabel`)
 * and a number input that adapts its styling when currency formatting is enabled (i.e., when `fieldProps.currency`
 * is not explicitly set to false). If currency formatting is active, a dollar sign ('$') is rendered within the input
 * and the input's padding is adjusted. The component also reserves a fixed space for error messages to prevent layout shifts.
 *
 * @param label The text label for the input field.
 * @param isRequired Indicates whether the input is required.
 * @param fieldProps Additional configuration for the input field, such as toggling label display, enabling currency styling,
 *                   and specifying a custom placeholder (defaulting to "0.00").
 */
export default function AutoFormNumber({ label, isRequired, fieldProps, }: AutoFormInputComponentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=number.d.ts.map