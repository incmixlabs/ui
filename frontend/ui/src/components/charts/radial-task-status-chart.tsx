import { Box, Flex, Heading, Text } from "@incmix/ui"
import { cn } from "@utils"
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"

export interface TaskItem {
  name: string
  value: number
  fill: string
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
   * Show labels below the chart
   * @default true
   */
  showLabels?: boolean
}


export function RadialTaskStatusChart({
  tasks = [
    { name: "Ongoing", value: 420,fill: "var(--indigo-9)" },
    { name: "Hold", value: 210,fill: "var(--orange-9)" },
    { name: "Done", value: 200,fill: "var(--green-9)" },
  ],
  startAngle = 180,
  endAngle = 0,
  className,
}: RadialTaskStatusChartProps) {

    const totalVisitors = tasks.reduce((sum, task) => sum + task.value, 0)
  return (
    <>
      <Box className={cn("w-full relative h-72", className)}>
      <Box className="xl:h-[28rem] h-full ">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            barSize={20}
            data={tasks}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} tickLine={false} />
            <RadialBar dataKey="value" cornerRadius={4} fill="#f3f4f61d" background={{ fill: "#f3f4f61f" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
      <Flex justify="center" align="center" className="absolute inset-0 top-12 flex-col">
          <Heading size="8">{totalVisitors}</Heading>
          <Text className="text-gray-11 mt-1">Visitors</Text>
        </Flex>

    </Box>

    </>
  )
}
