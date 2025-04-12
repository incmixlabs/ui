import { DoneTasks, InProgressTask, NewTasks, TotalTasks } from "@incmix/ui"
import type { ComponentType } from "react"
export type Epic = "cleaning" | "meals" | "yard work"

export const tasks: {
  title: string
  id: string
  epic: Epic
  assignee: string
  component: ComponentType
  className: string
}[] = [
  {
    id: "1",
    title: "Clean the shed",
    epic: "yard work",
    assignee: "Lucy",
    component: TotalTasks,
    className: "bg-blue-500",
  },
  {
    id: "2",
    title: "Wash the car",
    epic: "cleaning",
    assignee: "Jack",
    component: NewTasks,
    className: "bg-green-500",
  },
  {
    id: "3",
    title: "Weed the garden",
    epic: "yard work",
    assignee: "Bandit",
    component: InProgressTask,
    className: "bg-yellow-500",
  },
  {
    id: "4",
    title: "Mow the lawn",
    epic: "yard work",
    assignee: "Socks",
    component: DoneTasks,
    className: "bg-red-500",
  },
]

export const epicMap = {
  cleaning: "moved",
  meals: "new",
  "yard work": "success",
}
