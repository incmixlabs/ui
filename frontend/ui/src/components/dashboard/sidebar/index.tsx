import { useState } from "react"

import {
  ActiveTask,
  Box,
  CalendarWidget,
  DoneTasks,
  Grid,
  GridLayoutExample,
  Heading,
  InProgressTask,
  NewTasks,
  PostingTask,
  ProfileSettings,
  ProjectWidgets,
  ProjectWidgets2,
  RecentActivity,
  SortableItem,
  StatisticWidgets,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
  dashboardImg,
  isRectDifferent,
} from "@incmix/ui"

export function DashboardSidebar() {
  const [availableComponents, _setAvailableComponents] = useState([
    {
      slotId: "newTasks",
      component: <NewTasks />,
      compImage: dashboardImg?.newTaskImg,
      title: "New Tasks",
    },
    {
      slotId: "totalTasks",
      component: <TotalTasks />,
      compImage: dashboardImg?.totalTaskImg,
      title: "Total Tasks",
    },
    {
      slotId: "projectWidgets",
      component: <ProjectWidgets2 />,
      compImage: dashboardImg?.ProjectImg,
      title: "Project Widgets",
    },
    {
      slotId: "statisticWidgets",
      component: <StatisticWidgets2 />,
      compImage: dashboardImg?.statisticsImg,
      title: "Statistic Widgets",
    },
    {
      slotId: "activeTask",
      component: <ActiveTask />,
      compImage: dashboardImg?.activeTaskImg,
      title: "Active Task",
    },
    {
      slotId: "totalProject",
      component: <TotalProject />,
      compImage: dashboardImg?.totalProjectImg,

      title: "Total Project",
    },
    {
      slotId: "postingTask",
      component: <PostingTask />,
      compImage: dashboardImg?.postingTaskImg,

      title: "Posting Task",
    },
  ])
  return (
    <Box className="p-2">
        <h1 className="text-lg font-semibold py-2">Drag Components</h1>
      <Grid columns={"2"} gap="2">
        {availableComponents?.map((comp) => {
          return (
            <Box key={comp?.slotId} className="border border-gray-5 shadow rounded-lg">
              <img
                src={comp.compImage}
                alt={comp.title}
                className="h-full w-full rounded-lg"
              />
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}
