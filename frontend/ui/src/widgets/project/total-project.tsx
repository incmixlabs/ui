import {
  Box,
  CardContainer,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@incmix/ui"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
interface ProgressItem {
  category: string
  value: number
  color: string
}

export function TotalProject() {
  const [progressItems, _setProgressItems] = useState<ProgressItem[]>([
    {
      category: "Product Design",
      value: 87,
      color: "var(--dashboard-color-1)",
    },
    {
      category: "Graphic Design",
      value: 50,
      color: "var(--dashboard-color-2)",
    },
    {
      category: "iOS Apps",
      value: 100,
      color : "var(--dashboard-color-3)",
    },
    {
      category: "Android Apps",
      value: 24,
      color: "var(--dashboard-color-4)",
    },
  ])
  return (
    <CardContainer className="col-span-5 h-full 2xl:col-span-4">
      <Flex justify={"between"} align={"center"}>
        <Heading weight={"medium"}>Total Projects</Heading>
        <IconButton
          variant="ghost"
          className="m-0 flex cursor-pointer flex-row items-center p-0"
        >
          <Icon name="Ellipsis"/>
        </IconButton>
      </Flex>
      <Box className="space-y-4 pt-10">
        {progressItems.map((item, index) => (
          <Box key={index} className="space-y-2">
            <Flex justify={"between"}>
              <Text className="font-medium text-gray-12 text-sm">
                {item.category}
              </Text>
              <Text className="font-medium text-gray-11 text-sm">
                {item.value}%
              </Text>
            </Flex>
            <Box 
              className="h-2 relative w-full rounded-lg bg-gray-7"
              role="progressbar"
              aria-valuenow={item.value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${item.category} progress`}
            >
              <Box 
                className="h-full transition-all duration-300 absolute inset-0 rounded-lg" 
                style={{width: `${item.value}%`, backgroundColor: item.color}}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </CardContainer>
  )
}
