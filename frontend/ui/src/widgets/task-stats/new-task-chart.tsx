import { TaskChart } from "./task-chart"

export function NewTasksChart() {
  return (
    <TaskChart
      title="New Tasks"
      data={[25, 30, 35, 25, 45, 75, 55, 25, 30, 25]}
      total={820}
      color="bg-orange-3"
      label="New Task"
      />
  )
}
