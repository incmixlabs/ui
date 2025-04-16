import { useThemeContext } from "@radix-ui/themes"
import { dashboardColorValues } from "@utils/colors"
import { Suspense, lazy } from "react"

const ReactApexChart = lazy(() => import("react-apexcharts"))

interface StatisticsBarChartViewProps {
  /** Title of the chart */
  title?: string
  /** Categories for x-axis (e.g. months) */
  categories?: string[]
  /** Data for new tasks */
  newTasksData?: number[]
  /** Data for in progress tasks */
  inProgressData?: number[]
  /** Color for new tasks bars */
  newTasksColor?: string
  /** Color for in progress tasks bars */
  inProgressColor?: string
}

export const StatisticsBarChartView: React.FC<StatisticsBarChartViewProps> = ({
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  newTasksData = [160, 240, 80, 200, 160, 140, 100],
  inProgressData = [50, 70, 40, 100, 40, 0, 110],
}) => {
  const { appearance } = useThemeContext()
  const isDarkMode = appearance === "dark"
  const textColor = "hsl(var(--foreground))"

  const chartData = {
    series: [
      {
        name: "New Tasks",
        data: newTasksData,
      },
      {
        name: "In Progress",
        data: inProgressData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
        foreColor: textColor,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 6,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
      yaxis: {
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          right: 0,
          bottom: -8,
          left: 12,
        },
      },
      colors: [dashboardColorValues.color5, dashboardColorValues.color3],
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 0.1,
          },
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "right",
        offsetX: 0,
        labels: {
          colors: textColor,
        },
        markers: {
          radius: 50,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: isDarkMode ? "dark" : "light",
        style: {
          fontSize: "14px",
        },
        y: {
          formatter: (val: number) => `${val} tasks`,
        },
      },
    },
    // options: {
    //   chart: {
    //     type: "bar" as const,
    //     height: 340,
    //     stacked: true,
    //     toolbar: {
    //       show: false,
    //     },
    //     foreColor: textColor, // Default text color for the chart
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: "55%",
    //       endingShape: "rounded",
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     show: true,
    //     width: 2,
    //     colors: ["transparent"],
    //   },
    //   xaxis: {
    //     categories: categories,
    //     labels: {
    //       style: {
    //         colors: textColor,
    //       },
    //     },
    //   },
    //   yaxis: {
    //     title: {
    //       text: "Tasks",
    //       style: {
    //         color: textColor,
    //       },
    //     },
    //     labels: {
    //       style: {
    //         colors: textColor,
    //       },
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   legend: {
    //     show: false, // Completely hide the legend
    //   },
    //   tooltip: {
    //     theme: isDarkMode ? "dark" : "light",
    //     y: {
    //       formatter: (val: number) => `${val}`,
    //     },
    //   },
    // },
  }

  return (
    <>
      <Suspense
        fallback={<div className="h-[260px] animate-pulse bg-gray-50" />}
      >
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={260}
        />
      </Suspense>
    </>
  )
}
