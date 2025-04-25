import { Avatar, Flex } from "@base"
import { gaps } from "../constants"
import type { AvatarGroupProps } from "../types"
import { getVisibleCount } from "../utils"

export const SpreadLayout: React.FC<AvatarGroupProps> = ({
  users,
  maxVisible = 5,
  size = "3",
  direction = "left",
}) => {
  // @ts-ignore
  // TBD - UseProfile and AvatarProps mapping
  const { visibleCount, remainingCount } = getVisibleCount(mappedUsers, maxVisible)
  const visibleUsers = users.slice(0, visibleCount)

  const sortedUsers =
    direction === "right" ? [...visibleUsers].reverse() : visibleUsers

  return (
    <Flex
      align="center"
      gap={gaps[size]}
      direction={direction === "right" ? "row-reverse" : "row"}
    >
      {sortedUsers.map((user) => (
        <Avatar
          key={user.id}
          id={user.id}
          size={size}
          src={user.src}
          name={user.name}
        />
      ))}
      {remainingCount > 0 && <Avatar size={size} name={`+${remainingCount}`} />}
    </Flex>
  )
}
