import { Ellipsis } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/card"
import RadialBarChart from "./radial-bar-chart"

export const RadialBarChartCard: React.FC = () => {
  // Project stats
  const ongoingProjects = 420
  const onHoldProjects = 210
  const completedProjects = 200

  // Colors for the chart segments
  const ongoingColor = "var(--orange-9)"
  const onHoldColor = "var(--indigo-9)"
  const completedColor = "var(--amber-9)"

  return (
    <Card className="max-w-[350px] p-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-poppins text-[20px]">Projects</CardTitle>
        <CardDescription className="m-0 flex cursor-pointer flex-row items-center p-0">
          <Ellipsis />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <RadialBarChart />
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex flex-col items-center">
            <div
              className="mb-2 h-[6px] w-[6px] rounded-sm"
              style={{ backgroundColor: ongoingColor }}
            />
            <CardTitle className="font-medium font-poppins text-[32px] leading-[48px] tracking-[0px]">
              {ongoingProjects}
            </CardTitle>
            <CardDescription>Ongoing</CardDescription>
          </div>
          <div className="h-[75px] w-[1px] bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center">
            <div
              className="mb-2 h-[6px] w-[6px] rounded-sm"
              style={{ backgroundColor: onHoldColor }}
            />
            <CardTitle className="font-medium font-poppins text-[32px] leading-[48px] tracking-[0px]">
              {onHoldProjects}
            </CardTitle>
            <CardDescription>Hold</CardDescription>
          </div>
          <div className="h-[75px] w-[1px] bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center">
            <div
              className="mb-2 h-[6px] w-[6px] rounded-sm"
              style={{ backgroundColor: completedColor }}
            />

            <CardTitle className="font-medium font-poppins text-[32px] leading-[48px] tracking-[0px]">
              {completedProjects}
            </CardTitle>
            <CardDescription>Done</CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RadialBarChartCard
