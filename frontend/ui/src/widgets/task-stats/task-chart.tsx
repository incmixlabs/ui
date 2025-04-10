import {
  CardContainer,
  Heading,
  SparkChart,
  Text,
  dashboardColorValues,
} from "@incmix/ui"

export function TaskChart({
  title = "On Hold",
  data = [25, 30, 35, 25, 45, 75, 55, 25, 30, 25],
  total = 820,
  color = dashboardColorValues.color2,
  label = "Total Task",
}) {
  return (
    <CardContainer className="h-full space-y-2 text-center">
      <SparkChart title={title} className="h-24" data={data} color={color} />
      <Text className="inline-block text-gray-10">{label}</Text>
      <Heading size={"8"}>{total}</Heading>
    </CardContainer>
  )
}
