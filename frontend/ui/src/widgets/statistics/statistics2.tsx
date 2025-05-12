import {
  Box,
  CardContainer,
  Flex,
  Heading,
  IconButton,
  Text,
  WeeklyActivityChart,
} from "@incmix/ui"
import { Clipboard, Ellipsis } from "lucide-react"

export function StatisticWidgets2({
  title = "Statistics",
  completedProjects = 874,
  chartValues = [30, 65, 45, 80, 55, 40, 65],
  chartDays = ["M", "T", "W", "T", "F", "S", "S"],
  primaryColor = "var(--color-blue)",
  highlightColor = "var(--color-ongoing)",
  highlightDay = 3,
  onMoreOptionsClick,
  onClipboardClick,
}: {
  title?: string
  completedProjects?: number
  chartValues?: number[]
  chartDays?: string[]
  primaryColor?: string
  highlightColor?: string
  highlightDay?: number
  onMoreOptionsClick?: () => void
  onClipboardClick?: () => void
}) {
  return (
    <>
      <CardContainer className="h-full">
        <Flex align={"center"} gap={"2"} justify={"between"}>
          <Heading size="5">{title}</Heading>
          <IconButton onClick={onMoreOptionsClick}>
            <Ellipsis size={16} />
          </IconButton>
        </Flex>
        <WeeklyActivityChart
          className="h-72"
          values={chartValues}
          days={chartDays}
          primaryColor={primaryColor}
          highlightColor={highlightColor}
          highlightDay={highlightDay}
        />
        <Flex
          align={"center"}
          gap={"2"}
          justify={"between"}
          className="border-gray-5 border-t pt-2"
        >
          <Flex align={"center"} gap={"2"}>
            <IconButton onClick={onClipboardClick}>
              <Clipboard size={16} />
            </IconButton>
            <Box>
              <Text as="p">Completed Project</Text>
              <Text className="text-gray-10">Current Week</Text>
            </Box>
          </Flex>
          <Heading size="5" className="font-medium">
            {completedProjects}
          </Heading>
        </Flex>
      </CardContainer>
    </>
  )
}
