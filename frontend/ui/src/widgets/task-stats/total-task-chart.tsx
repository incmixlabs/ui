import { TaskChart } from "./task-chart"

export function TotalTasksChart() {
  return (
    <TaskChart
      title="Total Tasks"
      data={[25, 30, 35, 25, 45, 75, 55, 25, 30, 25]}
      total={820}
      color="bg-indigo-3"
      label="Total Task"
    />
  )
}
