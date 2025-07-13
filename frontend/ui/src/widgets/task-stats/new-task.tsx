import { StatsCard } from "@incmix/ui/charts"
import { CardContainer, ClipBoardAdd } from "@incmix/ui"

export function NewTasks() {
  return (
    <>
    <StatsCard
      count={136}
      label="New Tasks"
      iconClassName="bg-orange-3"
      className="h-full"
      icon={<ClipBoardAdd size="20" />}
      />
    </>
  )
}
