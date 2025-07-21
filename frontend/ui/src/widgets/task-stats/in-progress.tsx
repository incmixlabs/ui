import { StatsCard } from "@components"
import { ClipBoardStatus } from "@incmix/ui"

export function InProgressTask({ count = 324 }: { count?: number }) {
  return (
    <StatsCard
    className="h-full"
      count={count}
      label="In Progress"
      iconClassName="bg-gray-3"
      icon={<ClipBoardStatus size="20" color="var(--indicator-default)" />}
    />
  )
}
