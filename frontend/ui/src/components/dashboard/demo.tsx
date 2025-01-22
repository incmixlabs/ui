"use client"
import { clx } from "@utils/clx/clx-merge"

export function DemoDashboard() {
  const Dashboard = clx.div("flex flex-1")
  const DashboardHeader = clx.div("flex gap-2")
  const DashboardCell = clx.div(
    "size-full rounded-lg bg-secondary animate-pulse"
  )
  const DashboardBody = clx.div("flex flex-1 gap-2")
  const DashboardContainer = clx.div(
    "flex flex-col flex-1 size-full gap-2 p-2 bg-card border md:p-10 rounded-tl-2xl"
  )

  return (
    <Dashboard>
      <DashboardContainer>
        <DashboardHeader>
          {[...new Array(4)].map((i) => (
            <DashboardCell key={`first-array${i}`} className="h-20" />
          ))}
        </DashboardHeader>
        <DashboardBody>
          {[...new Array(2)].map((i) => (
            <DashboardCell key={`second-array${i}`} />
          ))}
        </DashboardBody>
      </DashboardContainer>
    </Dashboard>
  )
}
