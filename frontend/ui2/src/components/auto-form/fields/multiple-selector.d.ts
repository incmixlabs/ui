import type { AutoFormInputComponentProps } from "../types";
/**
 * Renders a multiple selection form field.
 *
 * This component displays a selector that allows the user to choose multiple options. It pulls available options and styling
 * information from the configuration props, defaulting to "gray" if necessary. The field label is conditionally rendered based
 * on provided configuration, and a validation message placeholder is included.
 *
 * @param props - Properties for configuring the multiple selection field:
 *   - field: An object representing the form field, including its current value and change handler.
 *   - fieldConfigItem: Configuration data for the field, providing input properties such as options, placeholder, CSS class.
 *   - label: The label text to display alongside the field.
 *   - isRequired: A flag indicating whether the field is mandatory.
 *
 * @returns A JSX element containing the complete multiple selection form field.
 */
export default function MultipleSelectorField({ field, fieldConfigItem, label, isRequired, }: AutoFormInputComponentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=multiple-selector.d.ts.map