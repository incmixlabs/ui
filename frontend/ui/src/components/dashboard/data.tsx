import {
  ClipBoard,
  ClipBoardAdd,
  ClipBoardCheck,
  ClipBoardStatus,
} from "@incmix/ui"
interface TaskStat {
  count: number
  label: string
  icon: React.ReactNode
  backgroundColorClass: string
}
interface ActivityItem {
  id: string
  time: string
  user: string
  action: string
  projectNumber: string
  color: string
}

interface ActivityGroup {
  date: string
  activities: ActivityItem[]
}
export const taskStats: TaskStat[] = [
  {
    count: 780,
    label: "Total Tasks",
    icon: <ClipBoard size="20" />,
    backgroundColorClass: "bg-indigo-3",
  },
  {
    count: 136,
    label: "New Tasks",
    icon: <ClipBoardAdd size="20" />,
    backgroundColorClass: "bg-orange-3",
  },
  {
    count: 324,
    label: "In Progress",
    icon: <ClipBoardStatus size="20" />,
    backgroundColorClass: "bg-amber-3",
  },
  {
    count: 215,
    label: "Done Tasks",
    icon: <ClipBoardCheck size="20" />,
    backgroundColorClass: "bg-green-3",
  },
]

export const revisionData = [
  {
    id: "1",
    type: "month",
    projectNumber: "783",
    recipient: "Leslie Miles",
    checked: false,
    color: "var(--blue-9)", // blue
  },
  {
    id: "2",
    type: "month",
    projectNumber: "675",
    recipient: "Kristin Edwards",
    checked: true,
    color: "var(--purple-9)", // purple
  },
  {
    id: "3",
    type: "month",

    projectNumber: "788",
    recipient: "Regina Warren",
    checked: false,
    color: "var(--green-9)", // green
  },
  {
    id: "4",
    type: "month",

    projectNumber: "543",
    recipient: "Stella Penas",
    checked: false,
    color: "var(--yellow-9)", // yellow
  },
]

export const activityGroups: ActivityGroup[] = [
  {
    date: "12 September",
    activities: [
      {
        id: "1",
        time: "08:30",
        user: "Regina Cooper",
        action: "Added new project",
        projectNumber: "443",
        color: "#4263eb", // blue
      },
      {
        id: "2",
        time: "15:00",
        user: "Kristin Edwards",
        action: "Updated project",
        projectNumber: "488",
        color: "#f59f00", // yellow
      },
      {
        id: "3",
        time: "17:20",
        user: "Regina Cooper",
        action: "Closed project",
        projectNumber: "129",
        color: "#fd7e14", // orange
      },
    ],
  },
  {
    date: "11 September",
    activities: [
      {
        id: "4",
        time: "14:00",
        user: "Jorge Robertson",
        action: "Completed project",
        projectNumber: "389",
        color: "#37b24d", // green
      },
      {
        id: "5",
        time: "15:20",
        user: "Regina Cooper",
        action: "Closed project",
        projectNumber: "401",
        color: "#fd7e14", // orange
      },
      {
        id: "6",
        time: "14:00",
        user: "Stella Pena",
        action: "Added new project",
        projectNumber: "442",
        color: "#4263eb", // blue
      },
      {
        id: "7",
        time: "15:20",
        user: "Priscilla Russell",
        action: "Updated project",
        projectNumber: "324",
        color: "#f59f00", // yellow
      },
    ],
  },
  {
    date: "10 September",
    activities: [
      {
        id: "8",
        time: "14:00",
        user: "Leslie Miles",
        action: "Added new project",
        projectNumber: "441",
        color: "#4263eb", // blue
      },
      {
        id: "9",
        time: "15:20",
        user: "Regina Cooper",
        action: "Added new project",
        projectNumber: "440",
        color: "#4263eb", // blue
      },
      {
        id: "10",
        time: "14:00",
        user: "Regina Warren",
        action: "Updated project",
        projectNumber: "274",
        color: "#f59f00", // yellow
      },
    ],
  },
]
