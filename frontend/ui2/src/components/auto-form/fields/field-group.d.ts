import React from "react";
export type FieldGroupLayout = "row" | "column" | "grid";
interface FieldGroupProps {
    children: React.ReactNode;
    layout?: FieldGroupLayout;
    className?: string;
    columns?: number;
    gap?: number;
}
/**
 * Renders a group of fields using a specified layout.
 *
 * This component arranges its children using one of three layout types:
 * - **row**: Applies a flex layout where each valid child is wrapped in a container with a minimum width for proper spacing.
 * - **column**: Stacks children vertically using a flex layout.
 * - **grid**: Uses a responsive grid layout with the number of columns controlled by the {@link columns} prop.
 *
 * The {@link gap} prop is used to generate a corresponding Tailwind CSS class for spacing between items.
 *
 * @param children - The React nodes to be displayed.
 * @param layout - The layout type for arranging children. Defaults to "column".
 * @param className - Additional CSS classes to apply to the container.
 * @param columns - Number of columns for grid layout. Defaults to 2.
 * @param gap - Gap between elements, which maps to a Tailwind CSS gap class. Defaults to 4.
 *
 * @returns A JSX element that renders the arranged children.
 */
export default function FieldGroup({ children, layout, className, columns, gap, }: FieldGroupProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=field-group.d.ts.map