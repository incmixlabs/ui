import {
  Box,
  CardContainer,
  type ExtendedColorType,
  Flex,
  Heading,
  IconButton,
  Progress,
  Text,
} from "@incmix/ui"
import type { BadgeProps } from "@radix-ui/themes"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
interface ProgressItem {
  category: string
  value: number
  maxValue: number
  color: ExtendedColorType
}

export function TotalProject() {
  const [progressItems, _setProgressItems] = useState<ProgressItem[]>([
    {
      category: "Product Design",
      value: 87,
      maxValue: 120,
      color: "indigo",
    },
    {
      category: "Graphic Design",
      value: 108,
      maxValue: 120,
      color: "orange",
    },
    {
      category: "iOS Apps",
      value: 100,
      maxValue: 120,
      color: "yellow",
    },
    {
      category: "Android Apps",
      value: 24,
      maxValue: 120,
      color: "green",
    },
  ])
  return (
    <CardContainer className="col-span-5 h-full 2xl:col-span-4">
      <Flex justify={"between"} align={"center"}>
        <Heading className="font-poppins text-[20px]">Total Projects</Heading>
        <IconButton
          variant="ghost"
          className="m-0 flex cursor-pointer flex-row items-center p-0"
        >
          <Ellipsis />
        </IconButton>
      </Flex>
      <Box className="space-y-4 pt-10">
        {progressItems.map((item, index) => (
          <Box key={index} className="space-y-2">
            <Flex justify={"between"}>
              <Text className="font-medium text-gray-700 text-sm">
                {item.category}
              </Text>
              <Text className="font-medium text-gray-900 text-sm">
                {item.value}
              </Text>
            </Flex>
            <Progress
              value={Math.min((item.value / item.maxValue) * 100, 100)}
              className="h-2 bg-gray-100"
              color={item.color as BadgeProps["color"]}
            />
          </Box>
        ))}
      </Box>
    </CardContainer>
  )
}
