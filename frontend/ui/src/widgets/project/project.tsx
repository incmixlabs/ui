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
  { label: "Ongoing", value: 420, color: "var(--indicator-info)" },
  { label: "Hold", value: 210, color: "var(--indicator-warning)" },
  { label: "Done", value: 200, color: "var(--indicator-success)" },
]

export function ProjectWidgets() {

  return (
    <>
      <CardContainer className="h-full">
        <Flex align={"center"} gap={"2"} justify={"between"}>
          <Heading size="5">Projects</Heading>
          <IconButton>
            <Ellipsis size={16} />
          </IconButton>
        </Flex>
        <RadialTaskStatusChart 
         tasks={stats.map(stat => ({
             name: stat.label,
             value: stat.value,
             fill: stat.color,
           }))} 
        />
        {/* <RadialBarChartStacked/> */}
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

