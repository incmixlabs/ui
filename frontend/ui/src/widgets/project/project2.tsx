import { useThemeStore } from "@incmix/store/use-settings-store"
import {
  Box,
  CardContainer,
  Flex,
  Grid,
  Heading,
  IconButton,
  RadialTaskStatusChart,
  Text,
} from "@incmix/ui"
import { Ellipsis } from "lucide-react"

let stats = [
  { label: "Ongoing", value: 420, color: "blue" },
  { label: "Hold", value: 210, color: "orange" },
  { label: "Done", value: 200, color: "green" },
]

export function ProjectWidgets2() {
  const { getIndicatorColors } = useThemeStore()
  const colors = getIndicatorColors()
  stats = stats.map((stat) => ({
    ...stat,
    color:
      stat.label === "Ongoing"
        ? colors.info
        : stat.label === "Hold"
          ? colors.warning
          : stat.label === "Done"
            ? colors.success
            : colors.default, // Fallback color
  }))
  return (
    <>
      <CardContainer className="h-full">
        <Flex align={"center"} gap={"2"} justify={"between"}>
          <Heading size="5">Projects</Heading>
          <IconButton>
            <Ellipsis size={16} />
          </IconButton>
        </Flex>
        <RadialTaskStatusChart className="mx-auto h-72 w-fit" />
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

