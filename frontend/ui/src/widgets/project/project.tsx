import React from "react"
import { Ellipsis } from "lucide-react"
import { useThemeStore } from "@incmix/store/use-settings-store"
import {
  Box,
  CardContainer,
  Flex,
  Grid,
  Heading,
  IconButton,
  RadialBarChart,
  Text,
} from "@incmix/ui"
// Colors for the chart segments
const ongoingColor = "blue"
const onHoldColor = "orange"
const completedColor = "green"

let stats = [
  { label: "Ongoing", value: 420, color: ongoingColor },
  { label: "Hold", value: 210, color: onHoldColor },
  { label: "Done", value: 200, color: completedColor},
]

export function ProjectWidgets() {
  const { getDashboardColors}= useThemeStore()
  const dashboardColors = getDashboardColors()
  stats = stats.map((stat) => ({
    ...stat,
    color: stat.label === "Ongoing" ? dashboardColors.info
      : stat.label === "Hold" ? dashboardColors.warning
      : stat.label === "Done" ? dashboardColors.success
      : dashboardColors.default, // Fallback color
  }))
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
        colors={[dashboardColors.info, dashboardColors.warning, dashboardColors.success]}
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
