import { Flex } from "@radix-ui/themes"
import type React from "react"
import { Avatar } from "../../avatar"
import { stackBorderWidths, stackOffsets } from "../constants"
import type { AvatarGroupProps } from "../types"
import { getVisibleCount } from "../utils"

export const StackLayout: React.FC<AvatarGroupProps> = ({
  users,
  maxVisible = 5,
  size = "3",
  direction = "left",
  stackOrder = "descending",
}) => {
  const { visibleCount, remainingCount } = getVisibleCount(users, maxVisible)
  const visibleUsers = users.slice(0, visibleCount)
  const flipOrder =
    (direction === "left" && stackOrder === "descending") ||
    (direction === "right" && stackOrder === "ascending")

  const getStackStyles = (index: number) => ({
    marginLeft:
      direction === "left" ? (index === 0 ? "0" : stackOffsets[size]) : "0",
    marginRight:
      direction === "right" ? (index === 0 ? "0" : stackOffsets[size]) : "0",
    zIndex: flipOrder ? visibleCount - index : index + 1,
    boxShadow: `0 0 0 ${stackBorderWidths[size]} var(--color-background)`,
  })

  const sortedUsers =
    direction === "right" ? [...visibleUsers].reverse() : visibleUsers

  return (
    <Flex
      align="center"
      direction={direction === "right" ? "row-reverse" : "row"}
    >
      {sortedUsers.map((user, index) => (
        <Avatar
          key={user.fullName}
          size={size}
          imageUrl={user.imageUrl}
          fullName={user.fullName}
          variant="solid"
          style={getStackStyles(index)}
        />
      ))}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          fullName={`+${remainingCount}`}
          variant="solid"
          style={getStackStyles(visibleCount)}
        />
      )}
    </Flex>
  )
}
