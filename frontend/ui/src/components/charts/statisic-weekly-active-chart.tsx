"use client"

import { Box } from "@incmix/ui"
import { cn } from "@utils"
import { lazy, useEffect, useState } from "react"
import { useThemeStore } from "@incmix/store"
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
   * @default dashboardColorValues.color2
   */
  primaryColor?: string

  /**
   * Highlight color for the specified day
   * @default dashboardColorValues.color3
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

export function WeeklyActivityChart({
  values = [30, 65, 45, 80, 55, 40, 65],
  days = ["M", "T", "W", "T", "F", "S", "S"],
  highlightDay = 3,
  barWidth = "40%",
  highlightColor,
  primaryColor,
  borderRadius = 10,
  className,
}: WeeklyActivityChartProps) {
  const [mounted, setMounted] = useState(false)
  const { getDashboardColors } = useThemeStore()
  const dashboardColorValues = getDashboardColors()
  highlightColor = highlightColor?? dashboardColorValues.color3
  primaryColor = primaryColor?? dashboardColorValues.color1

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
          colors: Array(days.length).fill("var(--color-muted)"),
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
