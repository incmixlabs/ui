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
