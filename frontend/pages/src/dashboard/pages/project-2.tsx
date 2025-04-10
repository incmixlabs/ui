import { LoadingPage } from "@common"
import {
  Avatar,
  Box,
  CardContainer,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Project1,
  Project2,
  ScrollArea,
  SwapyExclude,
  SwapyLayout,
  SwapySlot,
  Text,
  dashboardColorValues,
} from "@incmix/ui"
import {
  ActiveTask,
  BatteryWidget,
  CalendarWidget,
  ClockWidget,
  ImageGrid,
  NewsWidget,
  PostingTask,
  ProjectWidgets,
  ProjectWidgets2,
  PropertySheet,
  RecentActivity,
  StatisticWidgets,
  StatisticWidgets2,
  TaskChart,
  TotalProject,
  TotalTasks,
  WeatherWidget,
  getBattery,
} from "@incmix/ui/widgets"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Settings } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar } from "../../../../ui/src/components/calendar"
import { KanbanImages } from "../../../../ui/src/components/kanban-board/images"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"
type Widget = {
  id: string
  type:
    | "task-stats"
    | "statistic-widgets"
    | "project-widgets"
    | "active-task"
    | "total-project"
    | "posting-task"
}

const INITIAL_WIDGETS: Widget[] = [
  { id: "task-stats", type: "task-stats" },
  { id: "statistic-widgets", type: "statistic-widgets" },
  { id: "project-widgets", type: "project-widgets" },
  { id: "active-task", type: "active-task" },
  { id: "total-project", type: "total-project" },
  { id: "posting-task", type: "posting-task" },
]

const INITIAL_SLOT_ITEMS = [
  {
    slotId: "slot1",
    colSpan: "col-span-2 flex flex-col gap-4",
    itemId: "task-stats",
  },
  {
    slotId: "slot2",
    colSpan: "col-span-5 2xl:col-span-5",
    className: "bg-gray-2 ",
    itemId: "project-widgets",
  },
  {
    slotId: "slot3",
    colSpan: "col-span-5 2xl:col-span-5",
    className: "bg-gray-2 ",
    itemId: "statistic-widgets",
  },
  {
    slotId: "slot4",
    colSpan: "col-span-7 2xl:col-span-7",
    className: "bg-gray-2 ",
    itemId: "active-task",
  },
  {
    slotId: "slot5",
    colSpan: "col-span-5 2xl:col-span-5",
    className: "bg-gray-2 ",
    itemId: "total-project",
  },
  {
    slotId: "slot6",
    colSpan: "col-span-12",
    className: "bg-gray-2 ",
    itemId: "posting-task",
  },
]
const TaskStats = () => {
  return (
    <Grid gap={"5"}>
      <TaskChart
        title="On Hold"
        color={dashboardColorValues.color2}
        total={820}
      />{" "}
      <TaskChart
        title="Ongoing"
        color={dashboardColorValues.color1}
        total={520}
      />
    </Grid>
  )
}
const renderWidget = (widget: Widget) => {
  switch (widget.type) {
    case "task-stats":
      return <TaskStats />
    case "project-widgets":
      return <ProjectWidgets2 />
    case "statistic-widgets":
      return <StatisticWidgets2 />
    case "active-task":
      return <ActiveTask />
    case "total-project":
      return <TotalProject />
    case "posting-task":
      return <PostingTask />
    default:
      return null
  }
}

const DashboardProject2: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [slotItemsMap, setSlotItemsMap] = useState<typeof INITIAL_SLOT_ITEMS>(
    []
  )

  const slottedWidgets = useMemo(() => {
    return slotItemsMap.map(({ slotId, itemId, colSpan, className }) => ({
      slotId,
      itemId,
      colSpan,
      className,
      widget: widgets.find((w) => w.id === itemId),
    }))
  }, [widgets, slotItemsMap])

  useEffect(() => {
    const availableWidgets = INITIAL_WIDGETS
    const availableSlotItems = INITIAL_SLOT_ITEMS.filter((item) =>
      availableWidgets.some((widget) => widget.id === item.itemId)
    )

    setWidgets(availableWidgets)
    setSlotItemsMap(availableSlotItems)
  }, [])

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  return (
    <DashboardLayout
      breadcrumbItems={[]}
      navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
    >
      <Box as="div" className="container mx-auto overflow-x-hidden">
        <Heading size="6" className="pb-4">
          {t("dashboard:title")}
        </Heading>
        <Flex gap={"5"} className="w-full">
          {slottedWidgets.length > 0 && (
            <SwapyLayout
              id="dashboard-container"
              enable={isEditing}
              config={{ swapMode: "hover" }}
            >
              <Grid gap="5" columns="12" className="w-full">
                {slottedWidgets.map(
                  ({ slotId, colSpan, className, widget }) => (
                    <SwapySlot
                      className={`${colSpan} rounded-xl bg-gray-4 dark:bg-gray-2`}
                      key={slotId}
                      id={slotId}
                      showHandle={isEditing}
                    >
                      {widget && (
                        <Box className={`relative h-full w-full ${className}`}>
                          {renderWidget(widget)}
                        </Box>
                      )}
                    </SwapySlot>
                  )
                )}
              </Grid>
            </SwapyLayout>
          )}

          <Box className=" sticky top-0 h-screen w-80 shrink-0 rounded-xl border border-gray-5 bg-white dark:bg-gray-2 ">
            <ScrollArea className="h-full">
              <Flex
                justify={"between"}
                align={"center"}
                className="w-full border-gray-5 border-b p-4"
              >
                <Flex gap={"3"} align={"center"}>
                  <Avatar src={KanbanImages?.user1} fallback="A" />
                  <Box className="space-y-0">
                    <Text as="p" className="font-medium text-gray-12">
                      {authUser?.email || "User"}
                    </Text>
                    <Text className="text-gray-9">
                      {authUser?.email || "No email provided"}
                    </Text>
                  </Box>
                </Flex>
                <IconButton variant="ghost" className="cursor-pointer">
                  <Settings />
                </IconButton>
              </Flex>
              <Box className="w-full border-gray-5 border-b p-4">
                <Calendar
                  id={"calendar"}
                  mode="single"
                  className="w-full"
                  initialFocus
                />
              </Box>
              <Box className="p-8 ">
                <RecentActivity />
              </Box>
            </ScrollArea>
          </Box>
        </Flex>
        {/* <Project2/> */}
      </Box>
    </DashboardLayout>
  )
}

export default DashboardProject2
