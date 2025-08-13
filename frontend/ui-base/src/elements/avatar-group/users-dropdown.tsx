import {
  Avatar,
  type AvatarProps,
  Flex,
  Popover,
  ScrollArea,
  Text,
} from "@/base"
import type { ExtendSize } from "@/src/types"

type UsersDropdownProps = {
  users: AvatarProps[]
  size: ExtendSize
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
              <Avatar
                size={size}
                src={user.src ?? undefined}
                name={user.name}
              />
              <Text size={size}>{user.name}</Text>
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    </Popover.Content>
  )
}
