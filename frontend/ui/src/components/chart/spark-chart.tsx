import { Box } from "@incmix/ui"
import { cn } from "@utils"
import { lazy } from "react"
const ReactApexChart = lazy(() => import("react-apexcharts"))

// Dynamically import ApexCharts to avoid SSR issues

interface TaskCardProps {
  title: string
  data: number[]
  color: string
  className?: string
}

/**
 * Renders a sparkline bar chart within a styled container.
 *
 * This component configures a bar chart using the provided title, data, and color, and renders it
 * via ReactApexChart on the client side. The chart is displayed as a sparkline with a fixed height,
 * disabled tooltip, and custom bar styling. An optional CSS class name can be applied to the chart container.
 *
 * @param title - The title for the chart series.
 * @param data - An array of numbers representing the data points.
 * @param color - The color used for the chart bars.
 * @param className - Optional additional CSS classes for the chart container.
 */
export default function SparkChart({
  title,
  data,
  color,
  className,
}: TaskCardProps) {
  const chartData = {
    series: [
      {
        name: title,
        data: data,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 40,
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
      },
      colors: [color],
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 2,
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      stroke: {
        width: 0,
      },
    },
  }

  return (
    <>
      <Box className={cn("", className)}>
        {typeof window !== "undefined" && (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={"100%"}
          />
        )}
      </Box>
    </>
  )
}
