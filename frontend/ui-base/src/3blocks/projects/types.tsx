import type { Option } from "../../2elements/multi-select"

export interface Member {
  id: string
  name: string
  avatar: string
  color?: string
  label?: string
  value?: string
}

export type CreateProject = Omit<
  Project,
  | "id"
  | "createdBy"
  | "updatedBy"
  | "timeLeft"
  | "timeType"
  | "progress"
  | "createdAt"
  | "updatedAt"
>
export interface Project {
  id: string
  name: string
  company: string
  logo?: string
  orgId: string
  description: string
  progress: number
  timeLeft: string
  timeType: "week" | "days"
  members: Option[]
  status: "all" | "started" | "on-hold" | "completed"
  startDate: number
  endDate: number
  budget?: number
  fileData?: File | null
  createdAt: Date
  updatedAt: Date
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}
