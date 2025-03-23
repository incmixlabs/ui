import { Box } from "@incmix/ui"
import { cn } from "@utils"
import { lazy, useEffect, useState } from "react"

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

  /**
   * Color for this task status
   */
  color: string
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
   * @default "#F2F4F7"
   */
  trackBackground?: string

  /**
   * Show labels below the chart
   * @default true
   */
  showLabels?: boolean
}

export default function RadialTaskStatusChart({
  tasks = [
    { name: "Ongoing", value: 420, color: "#FF9D66" },
    { name: "Hold", value: 210, color: "#3366FF" },
    { name: "Done", value: 200, color: "#FFCC33" },
  ],
  startAngle = -135,
  endAngle = 135,
  hollowSize = "40%",
  className,
  trackBackground = "#F2F4F7",
}: RadialTaskStatusChartProps) {
  const [mounted, setMounted] = useState(false)

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
    colors: tasks.map((item) => item.color),
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
