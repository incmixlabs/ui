import {
  CardContainer,
  Heading,
  SparkChart,
  Text,
  dashboardColorValues,
} from "@incmix/ui"

export function TotalTasksChart() {
  return (
    <CardContainer className="h-full space-y-2 text-center">
      <SparkChart
        title="On Hold"
        className="h-24"
        data={[25, 30, 35, 25, 45, 75, 55, 25, 30, 25]}
        color={dashboardColorValues.color2}
      />
      <Text className="inline-block text-gray-10">Total Task</Text>
      <Heading size={"8"}>820</Heading>
    </CardContainer>
  )
}
