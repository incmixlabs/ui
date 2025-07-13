import { TaskChart } from "./task-chart"

export function TotalTasksChart() {
  return (
    <TaskChart
      title="Total Tasks"
      data={[{value:25},{value:30},{value:35},{value:25},{value:45},{value:75},{value:55},{value:25},{value:30},{value:25}]}
      total={820}
      color="var(--indigo-9)"
      label="Total Task"
    />
  )
}
