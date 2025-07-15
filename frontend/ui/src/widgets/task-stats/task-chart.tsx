import { useThemeStore } from "@incmix/store/use-settings-store"
import {
  Box,
  CardContainer,
  Heading,
  SparkChart,
  Text,
} from "@incmix/ui"
import { Task } from "@incmix/utils/types";
interface TaskChartProps {
    /** Title for the chart */
  title?: string;
  /** Data points for the sparkline chart */
  data?: {value:number}[];
  /** Total value to display */
  total?: number;
  /** Color for the chart bars */
  color: string;
  /** Label text to display under the chart */
  label?: string;
}

export function TaskChart({
  title = "On Hold",
  data = [{value:25},{value:30},{value:35},{value:25},{value:45},{value:75},{value:55},{value:25},{value:30},{value:25}],
  total = 820,
  label = "Total Task",
  color = "var(--blue-9)"
}: TaskChartProps) {
  const { getDashboardColors } = useThemeStore()
  // const dashboardColors = getDashboardColors()
  // const color = dashboardColors.color1
  
  return (
    <CardContainer className="h-full space-y-2 text-center w-full">
      <Box className="flex flex-col items-center justify-center w-full h-full">
      <SparkChart className="h-24 w-full" data={data} color={color} />
      <Heading size={"8"}>{total}</Heading>
      <Text className="inline-block text-gray-10">{label}</Text>
      </Box>
    </CardContainer>
  )
}
