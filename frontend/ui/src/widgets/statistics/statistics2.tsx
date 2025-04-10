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

export function StatisticWidgets2() {
  return (
    <>
      <CardContainer className="h-full">
        <Flex align={"center"} gap={"2"} justify={"between"}>
          <Heading size="5">Statistics</Heading>
          <IconButton>
            <Ellipsis size={16} />
          </IconButton>
        </Flex>
        <WeeklyActivityChart className="h-72" />
        <Flex
          align={"center"}
          gap={"2"}
          justify={"between"}
          className="border-gray-5 border-t pt-2"
        >
          <Flex align={"center"} gap={"2"}>
            <IconButton>
              <Clipboard size={16} />
            </IconButton>
            <Box>
              <Text as="p">Completed Project</Text>
              <Text className="text-gray-10">Current Week</Text>
            </Box>
          </Flex>
          <Heading size="5" className="font-medium">
            874
          </Heading>
        </Flex>
      </CardContainer>
    </>
  )
}
