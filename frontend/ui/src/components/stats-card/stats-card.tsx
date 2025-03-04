import { ClipBoard } from "./icons/clipboard"
import { ClipBoardAdd } from "./icons/clipboard-add"
import { ClipBoardCheck } from "./icons/clipboard-check"
import { ClipBoardStatus } from "./icons/clipboard-status"
import { SingleTaskView } from "./single-task-view"

interface TaskStat {
  count: number
  label: string
  icon: React.ReactNode
  backgroundColor: string
}

export const StatsCard = () => {
  const taskStats: TaskStat[] = [
    {
      count: 780,
      label: "Total Tasks",
      icon: <ClipBoard size="20" style={{ fill: "#376CFB" }} />,
      backgroundColor: "#EEF1FF",
    },
    {
      count: 136,
      label: "New Tasks",
      icon: <ClipBoardAdd size="20" style={{ fill: "#376CFB" }} />,
      backgroundColor: "#FFF1ED",
    },
    {
      count: 324,
      label: "In Progress",
      icon: <ClipBoardStatus size="20" style={{ fill: "#376CFB" }} />,
      backgroundColor: "#FFF6ED",
    },
    {
      count: 215,
      label: "Done Tasks",
      icon: <ClipBoardCheck size="20" style={{ fill: "#376CFB" }} />,
      backgroundColor: "#EDFCF3",
    },
  ]

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex gap-4">
        {taskStats.slice(0, 2).map((stat, _index) => (
          <SingleTaskView
            key={stat.label}
            count={stat.count}
            label={stat.label}
            backgroundColor={stat.backgroundColor}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="flex gap-4 ">
        {taskStats.slice(2, 4).map((stat, _index) => (
          <SingleTaskView
            key={stat.label}
            count={stat.count}
            label={stat.label}
            backgroundColor={stat.backgroundColor}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default StatsCard
