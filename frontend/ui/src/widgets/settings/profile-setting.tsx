import { KanbanImages } from "@components/kanban-board/images"
import { Avatar, Box, Flex, Icon, IconButton, Text } from "@incmix/ui"
export function ProfileSettings() {
  return (
    <>
      <Flex
        justify={"between"}
        align={"center"}
        className="w-full border-gray-5 border-b p-4"
      >
        <Flex gap={"3"} align={"center"}>
          <Avatar src={KanbanImages?.user1} name="A" />
          <Box className="space-y-0">
            <Text as="p" className="font-medium text-gray-12">
              User
            </Text>
            <Text className="text-gray-9">uincmix@gmail.com</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" className="cursor-pointer">
          <Icon name="Settings" />
        </IconButton>
      </Flex>
    </>
  )
}
