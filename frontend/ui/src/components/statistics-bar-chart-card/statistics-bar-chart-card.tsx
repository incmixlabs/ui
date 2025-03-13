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

const StatisticsBarChartCard: React.FC = () => {
  const { appearance } = useThemeContext()
  const isDarkMode = appearance === "dark"
  const textColor = "hsl(var(--foreground))"

  const chartData = {
    series: [
      {
        name: "Tasks",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 350,
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
        labels: {
          style: {
            colors: textColor,
          },
        },
      },
      yaxis: {
        title: {
          text: "Tasks ($)",
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
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
        y: {
          formatter: (val: number) => `$ ${val} tasks`,
        },
      },
    },
  }

  const _onHoldColor = "var(--indigo-9)"
  const completedColor = "var(--amber-9)"

  return (
    <Card className="flex-2 flex-grow p-0">
      <CardHeader>
        <CardTitle className="font-poppins text-[20px]">Statistics</CardTitle>
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
            style={{ backgroundColor: _onHoldColor }}
          />
          <CardDescription>New Tasks</CardDescription>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div
            className=" h-[8px] w-[8px] rounded-full"
            style={{ backgroundColor: completedColor }}
          />
          <CardDescription>In Progress</CardDescription>
        </div>
      </CardFooter>
    </Card>
  )
}

export default StatisticsBarChartCard
