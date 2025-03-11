import { ClipBoard } from "./icons/clipboard"
import { ClipBoardAdd } from "./icons/clipboard-add"
import { ClipBoardCheck } from "./icons/clipboard-check"
import { ClipBoardStatus } from "./icons/clipboard-status"
import { SingleTaskView } from "./single-task-view"

interface TaskStat {
  count: number
  label: string
  icon: React.ReactNode
  backgroundColorClass: string
}

export const StatsCard = () => {
  const taskStats: TaskStat[] = [
    {
      count: 780,
      label: "Total Tasks",
      icon: (
        <ClipBoard size="20" className="fill-[#376CFB] dark:fill-[#81A1FB]" />
      ),
      backgroundColorClass: "bg-[#e9edff20] dark:bg-[#2D3748]",
    },
    {
      count: 136,
      label: "New Tasks",
      icon: (
        <ClipBoardAdd
          size="20"
          className="fill-[#376CFB] dark:fill-[#81A1FB]"
        />
      ),
      backgroundColorClass: "bg-[#FFF1ED] dark:bg-[#3D3741]",
    },
    {
      count: 324,
      label: "In Progress",
      icon: (
        <ClipBoardStatus
          size="20"
          className="fill-[#376CFB] dark:fill-[#81A1FB]"
        />
      ),
      backgroundColorClass: "bg-[#FFF6ED] dark:bg-[#3D3641]",
    },
    {
      count: 215,
      label: "Done Tasks",
      icon: (
        <ClipBoardCheck
          size="20"
          className="fill-[#376CFB] dark:fill-[#81A1FB]"
        />
      ),
      backgroundColorClass: "bg-[#EDFCF3] dark:bg-[#2D3D36]",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {taskStats.slice(0, 2).map((stat, _index) => (
          <SingleTaskView
            key={stat.label}
            count={stat.count}
            label={stat.label}
            backgroundColorClass={stat.backgroundColorClass}
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
            backgroundColorClass={stat.backgroundColorClass}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default StatsCard
