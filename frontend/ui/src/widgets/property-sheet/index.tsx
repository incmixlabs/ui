import { useState } from "react"
import {
  Box,
  Button,
  Card,
  Checkbox,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  Popover,
  Text,
} from "@radix-ui/themes"
import { Input } from "@components"
import CompactColorPicker from "./color-picker"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/select"
import { KanbanImages } from "@components/kanban-board/images"

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
    const variableName = colorVar.match(/var\((--[^)]+)\)/)?.[1];
    if (variableName) {
      return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }
  }
  return colorVar;
};


export function PropertySheet() {
  const [color, setColor] = useState("#f76b15")

  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(480)
  const [dataUrl, setDataUrl] = useState("https://incmixlabs.com/data")

  const [propertyType, setPropertyType] = useState("json")
  const [position, setPosition] = useState("right")
  const [theme, setTheme] = useState<string>("dark")

  const handleColorChange = (newColor: {
    hex: string
  }) => {
    const resolvedColor = resolveColorVariable(newColor.hex);
    setColor(resolvedColor);
  }

  return (
    <Card className="w-96 rounded-none p-0 ">
      <Box>
        <Heading as="h2" className="bg-gray-2 p-2 font-medium">
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
        <Heading as="h2" className="bg-gray-2 p-2 font-medium">
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
              <Select
                value={propertyType}
                onValueChange={(value) => setPropertyType(value)}
              >
                <SelectTrigger className="border-none shadow-none">
                  <SelectValue placeholder="json" />
                </SelectTrigger>
                <SelectContent className="border-gray-5">
                  <SelectItem value="json">json</SelectItem>
                  <SelectItem value="xml">xml</SelectItem>
                  <SelectItem value="csv">csv</SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </Flex>
          <Flex align={"center"}>
            <Text className="w-44 border-gray-4 border-r p-2 px-3">
              Use JSONP
            </Text>
            <Box className="w-full p-2 px-3">
              <Flex align="center" gap="1">
                <Checkbox id="jsonp-checkbox" />
                <label htmlFor="jsonp-checkbox" className="sr-only text-sm">Enable JSONP</label>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Heading as="h2" className="bg-gray-2 p-2 font-medium">
          Styling
        </Heading>
        <Box className="border-gray-4 border-y">
          <Flex align={"center"} className="border-gray-4 border-b">
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">
              Position
            </Text>
            <Box className="w-full">
              <Select
                value={position}
                onValueChange={(value) => setPosition(value)}
              >
                <SelectTrigger className="border-none shadow-none">
                  <SelectValue placeholder="Left" />
                </SelectTrigger>
                <SelectContent className="border-gray-5">
                  <SelectItem value="left">left</SelectItem>
                  <SelectItem value="right">right</SelectItem>
                  <SelectItem value="top">top</SelectItem>
                  <SelectItem value="bottom">bottom</SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </Flex>
          <Flex align={"center"}>
            <Text className="w-44 border-gray-4 border-r py-2 pl-3">Theme</Text>
            <Box className="relative w-full">
              <Select value={theme} onValueChange={(value) => setTheme(value)}>
                <SelectTrigger className="border-none shadow-none">
                  <SelectValue placeholder="light" />
                </SelectTrigger>
                <SelectContent className="border-gray-5">
                  <SelectItem value="dark">dark</SelectItem>
                  <SelectItem value="light">light</SelectItem>
                </SelectContent>
              </Select>
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
            className="w-full p-2 px-3 "
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
                  className="color-swatch h-4·w-4 cursor-pointer rounded-sm border border-gray-4"
                  style={{ backgroundColor: color }}
                />
              </Popover.Trigger>
              <Popover.Content
                alignOffset={-125}
                width="320px"
                className="overflow-hidden p-0"
              >
                <Box className="w-full">
                  <CompactColorPicker onColorSelect={handleColorChange} />
                </Box>
              </Popover.Content>
            </Popover.Root>
          </Flex>
        </Flex>
      </Box>
    </Card>
  )
}
