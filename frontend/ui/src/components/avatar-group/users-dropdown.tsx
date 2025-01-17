import { Flex, Popover, ScrollArea, Text } from "@radix-ui/themes"
import type React from "react"

import { Avatar } from "../avatar"
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
            <Flex key={user.fullName} align="center" gap="2">
              <Avatar
                size={size}
                imageUrl={user.imageUrl}
                fullName={user.fullName}
              />
              <Text size={size}>{user.fullName}</Text>
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    </Popover.Content>
  )
}
