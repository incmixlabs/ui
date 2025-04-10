// components/NewTasks.tsx
import { StatsCard } from "@components"
import { ClipBoardAdd } from "@incmix/ui"

export function NewTasks() {
  return (
    <StatsCard
      count={136}
      label="New Tasks"
      iconClassName="bg-orange-3"
      icon={<ClipBoardAdd size="20" />}
    />
  )
}
