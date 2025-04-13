import {
  Box,
  CardContainer,
  Flex,
  Grid,
  Heading,
  IconButton,
  RadialBarChart,
  Text,
  dashboardColorValues,
} from "@incmix/ui"
import { Ellipsis } from "lucide-react"
import React from "react"
// Colors for the chart segments
const ongoingColor = dashboardColorValues.color3
const onHoldColor = dashboardColorValues.color2
const completedColor = dashboardColorValues.color1

const stats = [
  { label: "Ongoing", value: 420, color: dashboardColorValues.color3 },
  { label: "Hold", value: 210, color: dashboardColorValues.color2 },
  { label: "Done", value: 200, color: dashboardColorValues.color1 },
]

export function ProjectWidgets() {
  return (
    <CardContainer>
      <Flex justify={"between"} align={"center"}>
        <Heading className="font-poppins text-[20px]">Projects</Heading>
        <IconButton
          variant="ghost"
          className="m-0 flex cursor-pointer flex-row items-center p-0"
        >
          <Ellipsis />
        </IconButton>
      </Flex>
      <RadialBarChart
        colors={[ongoingColor, onHoldColor, completedColor]}
        labels={["Ongoing", "Hold", "Done"]}
        series={[420, 210, 200]}
      />
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
            <Text className="text-gray-10 text-sm">{stat.label}</Text>
          </div>
        ))}
      </Grid>
    </CardContainer>
  )
}
