import { Box, CardContainer } from "@incmix/ui"
import { cn } from "@utils"
import { lazy, useEffect, useState } from "react"
import { useThemeStore,useAppearanceStore } from "@incmix/store/use-settings-store"
import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
// Dynamically import ApexCharts to avoid SSR issues
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./shadcn-chart"
export interface TaskItem {
  /**
   * Name of the task status
   */
  name: string

  /**
   * Value/count of tasks in this status
   */
  value: number


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
   * @default var(--color-track)
   */
  trackBackground?: string

  /**
   * Show labels below the chart
   * @default true
   */
  showLabels?: boolean
}
const data = [
  {
    name: "ongoing",
    value: 45,
    fill: "var(--indigo-9)",
  },
  {
    name: "hold",
    value: 55,
    fill: "var(--orange-9)", 
  },
  {
    name: "done",
    value: 55,
    fill: "var(--green-9)", 
  },
]
export const description = "A radial chart with stacked sections"
const chartData = [{ month: "january", ongoing: 1260, hold: 570, done: 570 }]
const chartConfig = {
  ongoing: {
    label: "Ongoing",
    color: "var(--indigo-9)",
  },
  hold: {
    label: "Hold",
    color: "var(--orange-9)",
  },
  done: {
    label: "Done",
    color: "var(--green-9)",
  },
} satisfies ChartConfig
export function RadialTaskStatusChart({
  // tasks = [
  //   { name: "Ongoing", value: 420, color: 'pink' },
  //   { name: "Hold", value: 210, color: 'yellow' },
  //   { name: "Done", value: 200, color: 'purple' },
  // ],
  startAngle = -135,
  endAngle = 135,
  hollowSize = "40%",
  className,
  trackBackground ,
}: RadialTaskStatusChartProps) {

 
  const totalVisitors = chartData[0].ongoing + chartData[0].hold + chartData[0].done

  return (
    <>
      <div className="w-full relative h-72">
      <div className="xl:h-[28rem] h-full ">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            barSize={20}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} tickLine={false} />
            <RadialBar dataKey="value" cornerRadius={4} fill="#f3f4f61d" background={{ fill: "#f3f4f61f" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 top-12 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-12">1,830</div>
          <div className="text-sm text-gray-11 mt-1">Visitors</div>
        </div>

    </div>

    </>
  )
}
