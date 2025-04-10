import {
  Box,
  CardContainer,
  Flex,
  Grid,
  Heading,
  IconButton,
  RadialTaskStatusChart,
  Text,
  dashboardColorValues,
} from "@incmix/ui"
import { Ellipsis } from "lucide-react"

const stats = [
  { label: "Ongoing", value: 420, color: dashboardColorValues.color1 },
  { label: "Hold", value: 210, color: dashboardColorValues.color2 },
  { label: "Done", value: 200, color: dashboardColorValues.color3 },
]

export function ProjectWidgets2() {
  return (
    <>
      <CardContainer className="h-full">
        <Flex align={"center"} gap={"2"} justify={"between"}>
          <Heading size="5">Projects</Heading>
          <IconButton>
            <Ellipsis size={16} />
          </IconButton>
        </Flex>
        <RadialTaskStatusChart className="h-72" />
        <Grid columns={"3"} gap="4" className="mt-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`border-gray-5 border-l text-center ${stat.label === "Ongoing" && "border-none"}`}
            >
              <Box
                className="mx-auto mb-1 h-2 w-2 rounded-lg"
                style={{ backgroundColor: stat.color }}
              />
              <Text as="p" className="text-2xl">
                {stat.value}
              </Text>
              <Text className="text-gray-10">{stat.label}</Text>
            </div>
          ))}
        </Grid>
      </CardContainer>
    </>
  )
}
