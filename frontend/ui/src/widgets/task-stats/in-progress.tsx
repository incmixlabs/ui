// components/InProgress.tsx
import { StatsCard } from "@components"
import { ClipBoardStatus } from "@incmix/ui"

export function InProgressTask() {
  return (
    <StatsCard
      count={324}
      label="In Progress"
      iconClassName="bg-amber-3"
      icon={<ClipBoardStatus size="20" />}
    />
  )
}
