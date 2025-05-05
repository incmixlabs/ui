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
export const sidebarComponents = [
  {
    slotId: "i",
    component: <NewTasks />,
    compImage: dashboardImg?.newTaskImg,
    title: "New Tasks",
    layouts: {
      lg: { w: 3, h: 14 },
      md: { w: 3, h: 14 },
      sm: { w: 3, h: 14 },
      xs: { w: 3, h: 14 },
      xxs: { w: 3, h: 14 },
    },
  },
  {
    slotId: "h",
    component: <TotalTasks />,
    compImage: dashboardImg?.totalTaskImg,
    title: "Total Tasks",
    layouts: {
      lg: { w: 3, h: 14 },
      md: { w: 3, h: 14 },
      sm: { w: 3, h: 14 },
      xs: { w: 3, h: 14 },
      xxs: { w: 3, h: 14 },
    },
  },
  {
    slotId: "j",
    component: <ProjectWidgets2 />,
    compImage: dashboardImg?.ProjectImg,
    title: "Project Widgets",
    layouts: {
      lg: { w: 5, h: 24 },
      md: { w: 5, h: 24 },
      sm: { w: 5, h: 24 },
      xs: { w: 5, h: 24 },
      xxs: { w: 5, h: 24 },
    },
  },
  {
    slotId: "k",
    component: <StatisticWidgets2 />,
    compImage: dashboardImg?.statisticsImg,
    title: "Statistic Widgets",
    layouts: {
      lg: { w: 4, h: 22 },
      md: { w: 4, h: 22 },
      sm: { w: 4, h: 22 },
      xs: { w: 4, h: 22 },
      xxs: { w: 4, h: 22 },
    },
  },
  {
    slotId: "l",
    component: <ActiveTask />,
    compImage: dashboardImg?.activeTaskImg,
    title: "Active Task",
    layouts: {
      lg: { w: 4, h: 22 },
      md: { w: 4, h: 22 },
      sm: { w: 4, h: 22 },
      xs: { w: 4, h: 22 },
      xxs: { w: 4, h: 22 },
    },
  },
  {
    slotId: "m",
    component: <TotalProject />,
    compImage: dashboardImg?.totalProjectImg,
    title: "Total Project",
    layouts: {
      lg: { w: 4, h: 22 },
      md: { w: 4, h: 22 },
      sm: { w: 4, h: 22 },
      xs: { w: 4, h: 22 },
      xxs: { w: 4, h: 22 },
    },
  },
  {
    slotId: "n",
    component: <PostingTask />,
    compImage: dashboardImg?.postingTaskImg,
    title: "Posting Task",
    layouts: {
      lg: { w: 12, h: 25 },
      md: { w: 12, h: 25 },
      sm: { w: 12, h: 25 },
      xs: { w: 12, h: 25 },
      xxs: { w: 12, h: 25 },
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
