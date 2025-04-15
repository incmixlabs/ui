// import { StatsCard } from "@components"
// import {
//   ClipBoard,
//   ClipBoardAdd,
//   ClipBoardCheck,
//   ClipBoardStatus,
//   Grid,
// } from "@incmix/ui"
// interface TaskStat {
//   count: number
//   label: string
//   icon: React.ReactNode
//   backgroundColorClass: string
// }
// export const taskStats: TaskStat[] = [
//   {
//     count: 780,
//     label: "Total Tasks",
//     icon: <ClipBoard size="20" />,
//     backgroundColorClass: "bg-indigo-3",
//   },
//   {
//     count: 136,
//     label: "New Tasks",
//     icon: <ClipBoardAdd size="20" />,
//     backgroundColorClass: "bg-orange-3",
//   },
//   {
//     count: 324,
//     label: "In Progress",
//     icon: <ClipBoardStatus size="20" />,
//     backgroundColorClass: "bg-amber-3",
//   },
//   {
//     count: 215,
//     label: "Done Tasks",
//     icon: <ClipBoardCheck size="20" />,
//     backgroundColorClass: "bg-green-3",
//   },
// ]
// export function TaskStats() {
//   return (
//     <>
//       <Grid columns={"2"} gap="4" className="relative">
//         {taskStats.map((stat, _index) => (
//           <StatsCard
//             key={stat.label}
//             count={stat.count}
//             label={stat.label}
//             iconClassName={stat.backgroundColorClass}
//             icon={stat.icon}
//           />
//         ))}
//       </Grid>
//     </>
//   )
// }

export { DoneTasks } from "./done-task"
export { InProgressTask } from "./in-progress"
export { NewTasks } from "./new-task"
export { TotalTasks } from "./total-task"
export { TaskChart } from "./task-chart"
