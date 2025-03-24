"use client"

import { Box } from "@incmix/ui"
import { cn } from "@utils"
import { lazy, useEffect, useState } from "react"

const ReactApexChart = lazy(() => import("react-apexcharts"))

interface WeeklyActivityChartProps {
  /**
   * Array of values for each day
   * @default [30, 65, 45, 80, 55, 40, 65]
   */
  values?: number[]

  /**
   * Array of day labels
   * @default ["M", "T", "W", "T", "F", "S", "S"]
   */
  days?: string[]

  /**
   * Primary color for bars
   * @default "#4361EE"
   */
  primaryColor?: string

  /**
   * Highlight color for the specified day
   * @default "#FF9D66"
   */
  highlightColor?: string

  /**
   * Index of the day to highlight (0-based)
   * @default 3
   */
  highlightDay?: number

  /**
   * Height of the chart
   * @default 250
   */
  height?: number

  /**
   * Width of the bars (as percentage)
   * @default "40%"
   */
  barWidth?: string

  /**
   * Border radius of the bars
   * @default 10
   */
  borderRadius?: number
  className?: string
}

/**
 * Renders a bar chart displaying weekly activity data.
 *
 * The component leverages ReactApexChart to generate a customizable bar chart, where a specific day can be highlighted by applying a distinct color. The chart is rendered only after the component has mounted, ensuring compatibility with server-side rendering environments.
 *
 * @param values - Activity values for each day of the week. Defaults to [30, 65, 45, 80, 55, 40, 65].
 * @param days - Labels for each day displayed on the chart's x-axis. Defaults to ["M", "T", "W", "T", "F", "S", "S"].
 * @param primaryColor - The default color for the bars. Defaults to "#3366FF".
 * @param highlightColor - The color applied to the bar corresponding to the highlighted day. Defaults to "#FF9D66".
 * @param highlightDay - The zero-based index indicating which day to highlight. Defaults to 3.
 * @param barWidth - The width of each bar as a percentage (e.g., "40%"). Defaults to "40%".
 * @param borderRadius - The border radius applied to the bars. Defaults to 10.
 * @param className - Additional CSS classes for styling the chart container.
 *
 * @returns A React element containing the rendered weekly activity bar chart.
 */
export default function WeeklyActivityChart({
  values = [30, 65, 45, 80, 55, 40, 65],
  days = ["M", "T", "W", "T", "F", "S", "S"],
  primaryColor = "#3366FF",
  highlightColor = "#FF9D66",
  highlightDay = 3,
  barWidth = "40%",
  borderRadius = 10,
  className,
}: WeeklyActivityChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Create colors array with the highlighted day
  const colors = days.map((_, index) =>
    index === highlightDay ? highlightColor : primaryColor
  )

  // Chart options
  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius,
        columnWidth: barWidth,
        distributed: true,
        endingShape: "rounded",
      },
    },
    colors: colors,
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: days,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: Array(days.length).fill("#9CA3AF"),
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
  }

  const series = [
    {
      name: "Activity",
      data: values,
    },
  ]

  return (
    <Box className={cn("w-full", className)}>
      {mounted && (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={"100%"}
        />
      )}
    </Box>
  )
}
