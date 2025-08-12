// components/DoneTasks.tsx
import { StatsCard } from "@components"
import { ClipBoardCheck } from "@incmix/ui"

export function DoneTasks() {
  return (
    <StatsCard
    className="h-full"
      count={215}
      label="Done Tasks"
      iconClassName="bg-green-3"
      icon={<ClipBoardCheck size="20" color="var(--indicator-success)" />}
    />
  )
}
