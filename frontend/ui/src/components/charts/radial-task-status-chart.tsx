import { Box, Text } from "@incmix/ui"
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
}

export function RadialTaskStatusChart({
  tasks = [
    { name: "Ongoing", value: 45, fill: 'var(--indigo-9)' },
    { name: "Hold", value: 55, fill: 'var(--orange-9)' },
    { name: "Done", value: 55, fill: 'var(--green-9)' },
  ],
  startAngle = 180,
  endAngle = 0,
  className,
}: RadialTaskStatusChartProps) {

 

  return (
    <>
      <Box className={cn("w-full relative h-72",className)}>
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
            <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "var(--gray-5)" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
      <Box className="absolute inset-0 top-12 flex flex-col items-center justify-center">
      <Text size="8" className="font-bold text-gray-12">{tasks.reduce((sum, task) => sum + task.value, 0).toLocaleString()}</Text>
        <Text size="3" className="text-gray-11 mt-1">Visitors</Text>
      </Box>
    </Box>
    </>
  )
}