import { useThemeStore } from "@incmix/store/use-settings-store"
import {
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
  data?: number[];
  /** Total value to display */
  total?: number;
  /** Color for the chart bars */
  color?: string;
  /** Label text to display under the chart */
  label?: string;
}

export function TaskChart({
  title = "On Hold",
  data = [25, 30, 35, 25, 45, 75, 55, 25, 30, 25],
  total = 820,
  label = "Total Task",
}: TaskChartProps) {
  const { getDashboardColors } = useThemeStore()
  const dashboardColors = getDashboardColors()
  const color = dashboardColors.color1
  
  return (
    <CardContainer className="h-full space-y-2 text-center">
      <SparkChart title={title} className="h-24" data={data} color={color} />
      <Text className="inline-block text-gray-10">{label}</Text>
      <Heading size={"8"}>{total}</Heading>
    </CardContainer>
  )
}
