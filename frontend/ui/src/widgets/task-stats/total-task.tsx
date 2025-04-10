import { StatsCard } from "@components"
import { ClipBoard } from "@incmix/ui"

export function TotalTasks() {
  return (
    <StatsCard
      count={780}
      label="Total Tasks"
      iconClassName="bg-indigo-3"
      icon={<ClipBoard size="20" />}
    />
  )
}
