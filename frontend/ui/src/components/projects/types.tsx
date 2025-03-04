export interface Member {
  id: string
  name: string
  avatar: string
  color?: string
}

export interface Project {
  id: string
  title: string
  company: string
  logo: string
  description: string
  progress: number
  timeLeft: string
  timeType: "week" | "days"
  members: Member[]
  status: "all" | "started" | "on-hold" | "completed"
  startDate?: string
  endDate?: string
  budget?: number
}
