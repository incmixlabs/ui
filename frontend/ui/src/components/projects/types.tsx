import type { Option } from "../multiple-selector/multiple-selector"

export interface Member {
  id: string
  name: string
  avatar: string
  color?: string
  label?: string
  value?: string
}

export interface Project {
  id: string
  name: string
  company: string
  logo: string
  description: string
  progress: number
  timeLeft: string
  timeType: "week" | "days"
  members: Option[]
  status: "all" | "started" | "on-hold" | "completed"
  startDate?: number
  endDate?: number
  budget?: number
  fileData?: File | null
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}
