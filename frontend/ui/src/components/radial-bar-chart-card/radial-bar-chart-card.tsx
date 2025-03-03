import type { FC } from "react"
import { RadialBarChart } from "./radial-bar-chart"

interface RadialBarChartCardProps {
  title?: string
  value: number
  total?: number
  label?: string
  className?: string
  size?: "sm" | "md" | "lg"
  colors?: string[]
}

export const RadialBarChartCard: FC<RadialBarChartCardProps> = ({
  title = "Progress",
  value,
  total = 100,
  label = "%",
  className = "",
  size = "md",
  colors,
}) => {
  return (
    <div className={`rounded-lg bg-white p-4 shadow-sm ${className}`}>
      <RadialBarChart
        value={value}
        total={total}
        label={label}
        title={title}
        size={size}
        colors={colors}
      />
    </div>
  )
}

export default RadialBarChartCard
