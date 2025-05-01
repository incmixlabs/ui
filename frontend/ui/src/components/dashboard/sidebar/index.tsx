import { Box, Grid, Heading, LayoutPresetsSection, dashboardImg,    useSelectionStore } from "@incmix/ui"
import {
  ActiveTask,
  NewTasks,
  PostingTask,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
} from "@incmix/ui/widgets"
import { useEffect, useState } from "react"
import { DraggableComponent } from "./draggable-component"
import { presetLayouts } from "../data"
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
  const { selectedWidgets, setSelectedWidgets, clearSelection } =
  useSelectionStore();
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
      <Heading className="py-2 font-semibold text-lg">Drag Components</Heading>
      <Grid columns={"2"} gap="2"  className="relative">
        {availableComponents?.map((comp) => (
          <DraggableComponent
            key={comp.slotId}
            id={comp.slotId}
            title={comp.title}
            image={comp.compImage}
            component={comp.component}
            disabled={!isEditing || selectedWidgets.length > 0}
            onDragStart={() => handleDragStart(comp.slotId)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Grid>
      <LayoutPresetsSection />
    </Box>
  )
}
