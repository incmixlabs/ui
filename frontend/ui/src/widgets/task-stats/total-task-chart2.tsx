import { CardContainer, Heading, Text, dashboardColorValues,SparkChart } from "@incmix/ui"

export function TotalTasksChart2() {
  return (
    <CardContainer className="h-full space-y-2 text-center">
      <SparkChart
        title="Ongoing"
        className="h-24"
        data={[25, 30, 35, 25, 45, 75, 55, 25, 30, 25]}
        color={dashboardColorValues.color1}
      />
      <Text className="inline-block text-gray-10">Total Task</Text>
      <Heading size={"8"}>540</Heading>
    </CardContainer>
  )
}
