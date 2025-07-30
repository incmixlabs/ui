
import { useState } from "react"
import { Input,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Popover,
  Select,
  Text,
  CardContainer} from "@base"
import ColorPicker from "@components/color-picker"
import { KanbanImages } from "@components/kanban-board/images"
import { iconSize } from "@components/common"

export const themeData = [
  {
    value: "dark",
    label: "Dark",
    avatarSrc: KanbanImages.user1,
  },
  {
    value: "light",
    label: "Light",
    avatarSrc: KanbanImages.user2,
  },
]

const resolveColorVariable = (colorVar: string) => {
  if (colorVar.startsWith("var(")) {
    const variableName = colorVar.match(/var\((--[^)]+)\)/)?.[1]
    if (variableName && typeof document !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim()
    }
  }
  return colorVar
}

export function PropertySheet() {
  const [color, setColor] = useState("#F76B15")

  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(480)
  const [dataUrl, setDataUrl] = useState("https://incmixlabs.com/data")

  const [propertyType, setPropertyType] = useState("json")
  const [position, setPosition] = useState("right")
  const [theme, setTheme] = useState<string>("dark")

  const handleColorChange = (newColor: {
    hex: string
  }) => {
    const resolvedColor = resolveColorVariable(newColor.hex)
    setColor(resolvedColor)
  }

  return (
    <CardContainer className="p-1 h-full">
      <Box>
        <Heading as="h3" className="bg-gray-2 p-2 font-medium">
          Layout
        </Heading>
        <Box className="border-gray-4 border-y">
          <Flex align={"center"} className="border-gray-4 border-b">
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">Width</Text>
            <Box className="w-full ">
              <Input
                placeholder="200"
                type="number"
                min="0"
                className="rounded-none border-none"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </Box>
          </Flex>
          <Flex align={"center"}>
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">
              Height
            </Text>
            <Box className="w-full ">
              <Input
                placeholder="480"
                type="number"
                min="0"
                className="rounded-none border-none"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Heading as="h3" className="bg-gray-2 p-2 font-medium">
          Data loading
        </Heading>
        <Box className="border-gray-4 border-y">
          <Flex align={"center"} className="border-gray-4 border-b">
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">
              Data url
            </Text>
            <Box className="w-full ">
              <Input
                placeholder="Data URL"
                className="rounded-none border-none"
                value={dataUrl}
                onChange={(e) => setDataUrl(e.target.value)}
              />
            </Box>
          </Flex>
          <Flex align={"center"} className="border-gray-4 border-b">
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">Type</Text>
            {/* <Text className="w-full p-2 px-3 ">json</Text> */}

            <Box className="w-full">
              <Select.Root
                value={propertyType}
                defaultValue="json"
                onValueChange={(value) => setPropertyType(value)}
              >
                <Select.Trigger/>
                <Select.Content className="border-gray-5">
                  <Select.Item value="json">json</Select.Item>
                  <Select.Item value="xml">xml</Select.Item>
                  <Select.Item value="csv">csv</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
          <Flex align={"center"}>
            <Text className="w-44 border-gray-4 border-r p-2 px-3">
              Use JSONP
            </Text>
            <Box className="w-full p-2 px-3">
              <Flex align="center" gap="1">
                <Checkbox id="jsonp-checkbox" />
                <label htmlFor="jsonp-checkbox" className="sr-only text-sm">
                  Enable JSONP
                </label>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Heading as="h3" className="bg-gray-2 p-2 font-medium">
          Styling
        </Heading>
        <Box className="border-gray-4 border-y">
          <Flex align={"center"} className="border-gray-4 border-b">
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">
              Position
            </Text>
            <Box className="w-full">
              <Select.Root
                value={position}
                defaultValue="left"
                onValueChange={(value) => setPosition(value)}
              >
                <Select.Trigger className="border-none shadow-none"/>

                <Select.Content className="border-gray-5">
                  <Select.Item value="left">left</Select.Item>
                  <Select.Item value="right">right</Select.Item>
                  <Select.Item value="top">top</Select.Item>
                  <Select.Item value="bottom">bottom</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
          <Flex align={"center"}>
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">Theme</Text>
            <Box className="relative w-full">
              <Select.Root value={theme} defaultValue="light" onValueChange={(value) => setTheme(value)}>
                <Select.Trigger className="border-none shadow-none"/>

                <Select.Content className="border-gray-5">
                  <Select.Item value="dark">dark</Select.Item>
                  <Select.Item value="light">light</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box className="rounded-b bg-gray-2 ">
        <Flex align={"center"} className="border-gray-4 border-b">
          <Text className="w-44 border-gray-4 border-r p-2 px-3">
            Main Color
          </Text>
          <Flex
            className="w-full p-2 pl-1 pr-3 "
            justify={"between"}
            align={"center"}
          >
            <Input
              type="text"
              value={color}
              className="w-24"
              onChange={(e) => setColor(e.target.value)}
            />

            <Popover.Root>
              <Popover.Trigger>
                <Button
                  variant="soft"
                  className={`color-swatch ${iconSize} cursor-pointer rounded-sm border border-gray-4`}
                  style={{ backgroundColor: color }}
                  aria-label="Open color picker"
                />
              </Popover.Trigger>
              <Popover.Content
                alignOffset={-125}
                width="320px"
                className="overflow-hidden p-0"
              >
                <Box className="w-full">
                  <ColorPicker onColorSelect={handleColorChange} />
                </Box>
              </Popover.Content>
            </Popover.Root>
          </Flex>
        </Flex>
      </Box>
    </CardContainer>
  )
}
