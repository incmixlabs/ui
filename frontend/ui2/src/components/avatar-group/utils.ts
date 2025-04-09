import type { AvatarProps } from "@/components/radixui/avatar"

export const getVisibleCount = (users: AvatarProps[], maxVisible: number) => {
  const visibleCount = users.length > maxVisible ? maxVisible - 1 : users.length
  const remainingCount = users.length - visibleCount

  return {
    visibleCount,
    remainingCount,
  }
}
