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
  series = [44, 55, 13, 33],
  labels = ["Apple", "Mango", "Banana", "Orange"],
  colors = ["#f4a77d", "#4361ee", "#ffd166", "#6c757d"],
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
        colors: [isDarkMode ? "#1e293b" : "#fff"],
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
                color: isDarkMode ? "#e2e8f0" : "#4361ee",
              },
              value: {
                show: true,
                fontSize: "24px",
                fontFamily: "Poppins",
                color: isDarkMode ? "#e2e8f0" : "#4361ee",
                formatter: (val) => `${val}%`,
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

      <style>
        {`
        .custom-chart-container .apexcharts-datalabels text {
          font-size: 16px !important;
          font-weight: bold;
          fill: ${isDarkMode ? "#e2e8f0" : "#4361ee"} !important;
        }

        .custom-chart-container .apexcharts-tooltip {
          background: ${isDarkMode ? "rgba(30, 41, 59, 0.9)" : "rgba(0, 0, 0, 0.8)"} !important;
          color: ${isDarkMode ? "#e2e8f0" : "white"} !important;
          border-radius: 8px !important;
        }
        `}
      </style>
    </div>
  )
}

export default RadialBarChart
