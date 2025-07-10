import { TaskChart } from "./task-chart"

export function NewTasksChart() {
  return (
    <TaskChart
      title="New Tasks"
      data={[{value:25},{value:30},{value:35},{value:25},{value:45},{value:75},{value:55},{value:25},{value:30},{value:25}]}
      total={820}
      color="var(--orange-9)"
      label="New Task"
      />
  )
}
