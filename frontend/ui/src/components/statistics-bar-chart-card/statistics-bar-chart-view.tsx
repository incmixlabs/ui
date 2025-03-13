import { useThemeContext } from "@radix-ui/themes"
import { Suspense, lazy } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card/card"

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

const StatisticsBarChartView: React.FC<StatisticsBarChartViewProps> = ({
  title = "Statistics",
  categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  newTasksData = [44, 55, 57, 56, 61, 58, 63, 60, 66],
  inProgressData = [35, 41, 36, 26, 45, 48, 52, 53, 41],
  newTasksColor = "var(--indigo-9)",
  inProgressColor = "var(--amber-9)",
}) => {
  const { appearance } = useThemeContext()
  const isDarkMode = appearance === "dark"
  const textColor = "hsl(var(--foreground))"

  const chartData = {
    series: [
      {
        name: "New Tasks",
        data: newTasksData,
        color: newTasksColor,
      },
      {
        name: "In Progress",
        data: inProgressData,
        color: inProgressColor,
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 340,
        stacked: true,
        toolbar: {
          show: false,
        },
        foreColor: textColor, // Default text color for the chart
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
      yaxis: {
        title: {
          text: "Tasks",
          style: {
            color: textColor,
          },
        },
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: false, // Completely hide the legend
      },
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    },
  }

  return (
    <Card className="flex-2 flex-grow p-0">
      <CardHeader>
        <CardTitle className="font-poppins text-[20px]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <Suspense
          fallback={<div className="h-[260px] animate-pulse bg-gray-100" />}
        >
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={260}
          />
        </Suspense>
      </CardContent>
      <CardFooter className="flex flex-row justify-end gap-4 ">
        <div className="flex flex-row items-center gap-2">
          <div
            className=" h-[8px] w-[8px] rounded-full"
            style={{ backgroundColor: newTasksColor }}
          />
          <CardDescription>New Tasks</CardDescription>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div
            className=" h-[8px] w-[8px] rounded-full"
            style={{ backgroundColor: inProgressColor }}
          />
          <CardDescription>In Progress</CardDescription>
        </div>
      </CardFooter>
    </Card>
  )
}

export default StatisticsBarChartView
