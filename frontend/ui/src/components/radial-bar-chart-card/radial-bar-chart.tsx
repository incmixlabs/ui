import { useThemeContext } from "@radix-ui/themes"
import type React from "react"
import { useMemo, useState } from "react"
import Chart from "react-apexcharts"

interface RadialBarChartProps {
  series?: number[]
  labels?: string[]
  colors?: string[]
}

const RadialBarChart: React.FC<RadialBarChartProps> = ({
  series = [44, 55, 90],
  labels = ["Ongoing", "Hold", "Done"],
  colors = ["var(--orange-9)", "var(--indigo-9)", "var(--amber-9)"],
}) => {
  const [_series] = useState<number[]>(series)
  const { appearance } = useThemeContext()
  const isDarkMode = appearance === "dark"

  // Memoize chart options to prevent unnecessary re-renders
  const _options = useMemo<ApexCharts.ApexOptions>(
    () => ({
      chart: {
        width: 100,
        type: "donut",
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        width: 0,
        colors: ["hsl(var(--foreground))"],
      },
      fill: {
        colors: colors,
        opacity: 1,
        type: "solid",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "14px",
                fontFamily: "Poppins",
                color: "hsl(var(--foreground))",
              },
              value: {
                show: true,
                fontSize: "24px",
                fontFamily: "Poppins",
                color: "hsl(var(--foreground))",
                formatter: (val) => `${val}`,
              },
            },
          },
        },
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 20,
            },
          },
        },
      ],
      theme: {
        mode: isDarkMode ? "dark" : "light",
      },
    }),
    [colors, isDarkMode, labels]
  )

  return (
    <div className="flex flex-col items-center">
      <div className="absolute inset-0 rounded-full" />

      <div className="custom-chart-container">
        <Chart options={_options} series={_series} type="donut" />
      </div>
    </div>
  )
}

export default RadialBarChart
