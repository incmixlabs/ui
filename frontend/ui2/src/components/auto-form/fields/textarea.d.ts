import type { AutoFormInputComponentProps } from "../types";
/**
 * Renders a styled textarea input field with an optional label and error message for forms.
 *
 * The component displays a label above the textarea when enabled via the fieldProps value,
 * defaulting to visible if not specified. The textarea uses a provided placeholder or defaults to a prompt based on the label.
 *
 * @param label - The text used for the textarea label.
 * @param isRequired - Determines if the field is marked as required.
 * @param fieldProps - Additional properties for the textarea. This can include a flag "showLabel" to control whether the label is rendered and a "placeholder" for input guidance.
 *
 * @returns A JSX element representing the textarea input field with its associated label and error message.
 */
export default function AutoFormTextarea({ label, isRequired, fieldProps, }: AutoFormInputComponentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=textarea.d.ts.map