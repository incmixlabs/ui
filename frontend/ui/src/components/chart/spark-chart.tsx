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
