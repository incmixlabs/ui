import {
  Box,
  CardContainer,
  Flex,
  Heading,
  StatisticsBarChartView,
  Text,
} from "@incmix/ui";

export function BarStatisticWidgets() {
  return (
    <>
      <CardContainer className="h-full @container">
        <Flex justify="between" className="mb-6">
          <Heading weight={"medium"}>Statistics</Heading>
          <Flex gap="2" align="center" className="space-x-4">
            <Flex gap="2" align="center" className="space-x-2">
              <Box className="w-3 h-3 bg-[var(--dashboard-color-2)] rounded-full"></Box>
              <Text size="2" className="text-gray-12">
                New Tasks
              </Text>
            </Flex>
            <Flex gap="2" align="center" className="space-x-2">
              <Box className="w-3 h-3 bg-[var(--dashboard-color-3)] rounded-full"></Box>
              <Text size="2" className="text-gray-12">
                In Progress
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <StatisticsBarChartView
          statisticData={[
            { name: "Mon", newTasks: 45, inProgress: 0 },
            { name: "Tue", newTasks: 85, inProgress: 50 },
            { name: "Wed", newTasks: 65, inProgress: 60 },
            { name: "Thu", newTasks: 95, inProgress: 110 },
            { name: "Fri", newTasks: 75, inProgress: 30 },
            { name: "Sat", newTasks: 55, inProgress: 0 },
            { name: "Sun", newTasks: 80, inProgress: 100 },
          ]}
          newTaskColor="var(--dashboard-color-2)"
          inProgressColor="var(--dashboard-color-3)"
        />
      </CardContainer>
    </>
  );
}
