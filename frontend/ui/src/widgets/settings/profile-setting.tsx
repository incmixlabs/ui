import { KanbanImages } from "@components/kanban-board/images"
import { Avatar, Box, Flex, IconButton, Text } from "@incmix/ui"
import { Settings } from "lucide-react"
export function ProfileSettings() {
  return (
    <>
      <Flex
        justify={"between"}
        align={"center"}
        className="w-full border-gray-5 border-b p-4"
      >
        <Flex gap={"3"} align={"center"}>
          <Avatar src={KanbanImages?.user1} fallback="A" />
          <Box className="space-y-0">
            <Text as="p" className="font-medium text-gray-12">
              User
            </Text>
            <Text className="text-gray-9">uincmix@gmail.com</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" className="cursor-pointer">
          <Settings />
        </IconButton>
      </Flex>
    </>
  )
}
