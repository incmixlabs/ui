import { TaskChart } from "./task-chart"
const DEFAULT_NEW_TASKS_DATA = [
    {value:25},{value:30},{value:35},{value:25},{value:45},
    {value:75},{value:55},{value:25},{value:30},{value:25}
];
  
export function NewTasksChart() {
  return (
    <TaskChart
      title="New Tasks"
      data={DEFAULT_NEW_TASKS_DATA}
      total={820}
      color="var(--dashboard-color-2)"
      label="New Task"
      />
  )
}
