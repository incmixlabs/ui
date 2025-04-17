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

export const sidebarComponents = [
  {
    slotId: "h",
    component: <NewTasks />,
    compImage: dashboardImg?.newTaskImg,
    title: "New Tasks",
    layouts: {
      lg: { w: 2, h: 6 },
      md: { w: 2, h: 6 },
      sm: { w: 3, h: 6 },
      xs: { w: 4, h: 6 },
      xxs: { w: 2, h: 6 },
    },
  },
  {
    slotId: "i",
    component: <TotalTasks />,
    compImage: dashboardImg?.totalTaskImg,
    title: "Total Tasks",
    layouts: {
      lg: { w: 2, h: 6 },
      md: { w: 2, h: 6 },
      sm: { w: 3, h: 6 },
      xs: { w: 4, h: 6 },
      xxs: { w: 2, h: 6 },
    },
  },
  {
    slotId: "j",
    component: <ProjectWidgets2 />,
    compImage: dashboardImg?.ProjectImg,
    title: "Project Widgets",
    layouts: {
      lg: { w: 3, h: 12 },
      md: { w: 4, h: 12 },
      sm: { w: 6, h: 6 },
      xs: { w: 6, h: 6 },
      xxs: { w: 6, h: 6 },
    },
  },
  {
    slotId: "k",
    component: <StatisticWidgets2 />,
    compImage: dashboardImg?.statisticsImg,
    title: "Statistic Widgets",
    layouts: {
      lg: { w: 5, h: 12 },
      md: { w: 4, h: 12 },
      sm: { w: 6, h: 6 },
      xs: { w: 6, h: 6 },
      xxs: { w: 6, h: 6 },
    },
  },
  {
    slotId: "l",
    component: <ActiveTask />,
    compImage: dashboardImg?.activeTaskImg,
    title: "Active Task",
    layouts: {
      lg: { w: 5, h: 12 },
      md: { w: 5, h: 12 },
      sm: { w: 6, h: 6 },
      xs: { w: 6, h: 6 },
      xxs: { w: 6, h: 6 },
    },
  },
  {
    slotId: "m",
    component: <TotalProject />,
    compImage: dashboardImg?.totalProjectImg,
    title: "Total Project",
    layouts: {
      lg: { w: 5, h: 12 },
      md: { w: 5, h: 12 },
      sm: { w: 6, h: 6 },
      xs: { w: 6, h: 6 },
      xxs: { w: 6, h: 6 },
    },
  },
  {
    slotId: "n",
    component: <PostingTask />,
    compImage: dashboardImg?.postingTaskImg,
    title: "Posting Task",
    layouts: {
      lg: { w: 10, h: 13 },
      md: { w: 10, h: 13 },
      sm: { w: 6, h: 8 },
      xs: { w: 6, h: 8 },
      xxs: { w: 6, h: 8 },
    },
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
