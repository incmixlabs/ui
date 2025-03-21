import { cn } from "@utils/cn"
import React from "react"

export type FieldGroupLayout = "row" | "column" | "grid"

interface FieldGroupProps {
  children: React.ReactNode
  layout?: FieldGroupLayout
  className?: string
  columns?: number // For grid layout
  gap?: number // Gap between items
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
export default function FieldGroup({
  children,
  layout = "column",
  className,
  columns = 2,
  gap = 4,
}: FieldGroupProps) {
  // Convert gap number to Tailwind class (gap-2, gap-4, etc.)
  const gapClass = `gap-${gap}`

  // Determine layout classes
  const layoutClasses = {
    row: "flex flex-row flex-wrap items-start",
    column: "flex flex-col",
    grid: `grid grid-cols-1 sm:grid-cols-${columns}`,
  }

  return (
    <div className={cn(layoutClasses[layout], gapClass, "w-full", className)}>
      {React.Children.map(children, (child) => {
        if (!child) return null

        // For row layout, wrap each child in a div with appropriate width
        if (layout === "row" && React.isValidElement(child)) {
          return <div className="min-w-[200px] flex-1">{child}</div>
        }

        return child
      })}
    </div>
  )
}
