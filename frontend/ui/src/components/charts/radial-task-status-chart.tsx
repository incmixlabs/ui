import { Box } from "@incmix/ui"
import { cn } from "@utils"
import { lazy, useEffect, useState } from "react"
import { useThemeStore,useAppearanceStore } from "@incmix/store/use-settings-store"
// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = lazy(() => import("react-apexcharts"))

export interface TaskItem {
  /**
   * Name of the task status
   */
  name: string

  /**
   * Value/count of tasks in this status
   */
  value: number


}

interface RadialTaskStatusChartProps {
  /**
   * Array of task data items
   * @default Default task data (Ongoing, Hold, Done)
   */
  tasks?: TaskItem[]

  className?: string
  /**
   * Start angle for the radial chart
   * @default -135
   */
  startAngle?: number

  /**
   * End angle for the radial chart
   * @default 135
   */
  endAngle?: number

  /**
   * Size of the hollow center as percentage
   * @default "40%"
   */
  hollowSize?: string

  /**
   * Track background color
   * @default var(--color-track)
   */
  trackBackground?: string

  /**
   * Show labels below the chart
   * @default true
   */
  showLabels?: boolean
}

export function RadialTaskStatusChart({
  tasks = [
    { name: "Ongoing", value: 420, color: 'pink' },
    { name: "Hold", value: 210, color: 'yellow' },
    { name: "Done", value: 200, color: 'purple' },
  ],
  startAngle = -135,
  endAngle = 135,
  hollowSize = "40%",
  className,
  trackBackground ,
}: RadialTaskStatusChartProps) {
  const [mounted, setMounted] = useState(false)
  const { getIndicatorColors} = useThemeStore()
  const indicatorColors = getIndicatorColors()
  trackBackground = trackBackground || indicatorColors.success
  tasks = tasks.map((item) => {
    return {
      ...item,
      color: item.name === "Ongoing" ? indicatorColors.info
        : item.name === "Hold" ? indicatorColors.warning
        : item.name === "Done" ? indicatorColors.success
        : indicatorColors.default, // Fallback color
    }
  })
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate total for percentages
  const total = tasks.reduce((acc, item) => acc + item.value, 0)

  // Create series data for the chart
  const series = tasks.map((item) => Math.round((item.value / total) * 100))

  // Chart options
  const options = {
    chart: {
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle,
        endAngle,
        hollow: {
          size: hollowSize,
        },
        track: {
          background: trackBackground,
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          show: false,
        },
      },
    },
    colors: tasks.map((item) => item.color?? indicatorColors.default),
    stroke: {
      lineCap: "round",
    },
    labels: tasks.map((item) => item.name),
  }

  return (
    <>
      {mounted && (
        <Box className={cn("h-56 w-full", className)}>
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height="100%"
          />
        </Box>
      )}
    </>
  )
}
