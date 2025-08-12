import { Flex, Popover, ScrollArea, Text, Avatar } from "@/base"
import type { Sizes, User } from "./types"

type UsersDropdownProps = {
  users: User[]
  size: Sizes
}

export const UsersDropdown: React.FC<UsersDropdownProps> = ({
  users,
  size,
}) => {
  return (
    <Popover.Content>
      <ScrollArea
        type="hover"
        scrollbars="vertical"
        style={{ height: "300px" }}
      >
        <Flex direction="column" gap="2">
          {users.map((user) => (
            <Flex key={user.name} align="center" gap="2">
              <Avatar size={size} src={user.avatar??undefined} name={user.name} />
              <Text size={size}>{user.name}</Text>
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    </Popover.Content>
  )
}
