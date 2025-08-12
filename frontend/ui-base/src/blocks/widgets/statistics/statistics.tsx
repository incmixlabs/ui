import {
  Box,
  CardContainer,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  WeeklyActivityChart,
} from "@incmix/ui"

export function StatisticWidgets() {
  const onMoreOptionsClick = ()=>{
    console.log("More Options Clicked")
  }
  const onClipboardClick = ()=>{
    console.log("Clipboard Clicked")
  }
  return (
    <>
      <CardContainer className="h-full @container">
        <Flex align={"center"} gap={"2"} justify={"between"}>
          <Heading weight={"medium"}>Statistics</Heading>
          <IconButton onClick={onMoreOptionsClick}>
            <Icon name="Ellipsis" size={16} />
          </IconButton>
        </Flex>
        <WeeklyActivityChart
          statisticdata={[
            { id: "M", name: "Mon", value: 45 },
            { id: "T", name: "Tue", value: 85 },
            { id: "W", name: "Wed", value: 65 },
            { id: "T", name: "Thu", value: 95 },
            { id: "F", name: "Fri", value: 75 },
            { id: "S", name: "Sat", value: 55 },
            { id: "S", name: "Sun", value: 80 },
          ]}
        />
        <Flex
          align={"center"}
          gap={"2"}
          justify={"between"}
          className="border-gray-5 border-t pt-2"
        >
          <Flex align={"center"} gap={"2"}>
            <IconButton onClick={onClipboardClick}>
              <Icon name="Clipboard" />
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
