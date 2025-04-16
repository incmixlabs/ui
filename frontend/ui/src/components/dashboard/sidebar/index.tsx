"use client"

import { Box, Grid, dashboardImg } from "@incmix/ui"
import {
  ActiveTask,
  NewTasks,
  PostingTask,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
} from "@incmix/ui"
import { useState } from "react"
import { DraggableComponent } from "./draggable-component"

// Define and export the available components so they can be used elsewhere
export const sidebarComponents = [
  {
    slotId: "h",
    component: <NewTasks />,
    compImage: dashboardImg?.newTaskImg,
    title: "New Tasks",
  },
  {
    slotId: "i",
    component: <TotalTasks />,
    compImage: dashboardImg?.totalTaskImg,
    title: "Total Tasks",
  },
  {
    slotId: "j",
    component: <ProjectWidgets2 />,
    compImage: dashboardImg?.ProjectImg,
    title: "Project Widgets",
  },
  {
    slotId: "k",
    component: <StatisticWidgets2 />,
    compImage: dashboardImg?.statisticsImg,
    title: "Statistic Widgets",
  },
  {
    slotId: "l",
    component: <ActiveTask />,
    compImage: dashboardImg?.activeTaskImg,
    title: "Active Task",
  },
  {
    slotId: "m",
    component: <TotalProject />,
    compImage: dashboardImg?.totalProjectImg,
    title: "Total Project",
  },
  {
    slotId: "n",
    component: <PostingTask />,
    compImage: dashboardImg?.postingTaskImg,
    title: "Posting Task",
  },
]

interface DashboardSidebarProps {
  isEditing?: boolean
}

export function DashboardSidebar({ isEditing = true }: DashboardSidebarProps) {
  const [availableComponents] = useState(sidebarComponents)
  const [_draggingComponentId, setDraggingComponentId] = useState<
    string | null
  >(null)

  const handleDragStart = (componentId: string) => {
    setDraggingComponentId(componentId)
  }

  const handleDragEnd = () => {
    setDraggingComponentId(null)
  }

  return (
    <Box className="p-2">
      <h1 className="py-2 font-semibold text-lg">Drag Components</h1>
      <Grid columns={"2"} gap="2">
        {availableComponents?.map((comp) => (
          <DraggableComponent
            key={comp.slotId}
            id={comp.slotId}
            title={comp.title}
            image={comp.compImage}
            component={comp.component}
            disabled={!isEditing}
            onDragStart={() => handleDragStart(comp.slotId)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Grid>
    </Box>
  )
}
