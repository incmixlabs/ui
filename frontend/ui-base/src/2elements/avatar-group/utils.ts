import type { AvatarProps as User } from "@/src/1base"

export const getVisibleCount = (users: User[], maxVisible: number) => {
  const visibleCount = users.length > maxVisible ? maxVisible - 1 : users.length
  const remainingCount = users.length - visibleCount

  return {
    visibleCount,
    remainingCount,
  }
}
