import { LoadingPage } from "@common"

import { useEditingStore } from "@incmix/store"
import {
  Box,
  CreateProjectModal,
  Grid,
  SwapyExclude,
  SwapyLayout,
  SwapySlot,
} from "@incmix/ui"
import { Flex, Heading, Switch, Text } from "@incmix/ui"
import {
  BatteryWidget,
  CalendarWidget,
  ClockWidget,
  ImageGrid,
  NewsWidget,
  WeatherWidget,
  getBattery,
} from "@incmix/ui/widgets"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../auth"

type Widget = {
  id: string
  type: "weather" | "clock" | "news" | "battery" | "image-grid" | "calendar"
}

const MOCK_WEATHER_DATA = {
  lat: "40.730610",
  lon: "-73.935242",
}

const MOCK_CLOCK_DATA = [
  { city: "New York", timeZone: "America/New_York" },
  { city: "London", timeZone: "Europe/London" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
]

const INITIAL_WIDGETS: Widget[] = [
  { id: "weather", type: "weather" },
  { id: "clock", type: "clock" },
  { id: "calendar", type: "calendar" },
  { id: "news", type: "news" },
  { id: "battery", type: "battery" },
  { id: "image-grid", type: "image-grid" },
]

const INITIAL_SLOT_ITEMS = [
  {
    slotId: "slot1",
    colSpan: "xl:col-span-2 col-span-2 2xl:col-span-2",
    itemId: "weather",
  },
  {
    slotId: "slot2",
    colSpan: "xl:col-span-4 col-span-4 2xl:col-span-4",
    className: "bg-gray-2",
    itemId: "clock",
  },
  {
    slotId: "slot3",
    colSpan: "xl:col-span-1 col-span-1 2xl:col-span-1",
    className: "bg-gray-2",
    itemId: "battery",
  },
  {
    slotId: "slot4",
    colSpan: "xl:col-span-5 col-span-5 2xl:col-span-5",
    className: "bg-gray-2",
    itemId: "calendar",
  },
  {
    slotId: "slot5",
    colSpan: "col-span-6",
    className: "bg-gray-2",
    itemId: "news",
  },
  {
    slotId: "slot6",
    colSpan: "col-span-6",
    className: "bg-gray-2",
    itemId: "image-grid",
  },
]

export const EditWidgetsControl: React.FC<{
  onEditChange: (checked: boolean) => void
}> = ({ onEditChange }) => {
  const { t } = useTranslation(["dashboard", "common"])

  return (
    <Flex align="center" gap="2" className="ml-4">
      <Text size="2" color="gray">
        {t("dashboard:editMode")}
      </Text>
      <Switch onCheckedChange={onEditChange} />
    </Flex>
  )
}

const renderWidget = (widget: Widget) => {
  switch (widget.type) {
    case "weather":
      return <WeatherWidget location={MOCK_WEATHER_DATA} />
    case "clock":
      return <ClockWidget flip clocks={MOCK_CLOCK_DATA} size="1" />
    case "calendar":
      return <CalendarWidget storageKey={"calendar_events_dashboard"} />
    case "news":
      return <NewsWidget country="us" />
    case "battery":
      return <BatteryWidget />
    case "image-grid":
      return <ImageGrid />

    default:
      return null
  }
}

const DashboardHomePage: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const { isEditing, setIsEditing } = useEditingStore()

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
    const initializeWidgets = async () => {
      const battery = await getBattery()

      const availableWidgets = INITIAL_WIDGETS.filter(
        (widget) => widget.type !== "battery" || battery !== null
      )

      const availableSlotItems = INITIAL_SLOT_ITEMS.filter((item) =>
        availableWidgets.some((widget) => widget.id === item.itemId)
      )

      setWidgets(availableWidgets)
      setSlotItemsMap(availableSlotItems)
    }

    initializeWidgets()
  }, [])

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  return (
    <DashboardLayout
      breadcrumbItems={[]}
      navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
    >
      <Box className="container mx-auto overflow-x-hidden">
        <Heading size="6" className="pb-4">
          {t("dashboard:title")}
        </Heading>
        <CreateProjectModal />

        <Flex direction="column" gap="6">
          {slottedWidgets.length && (
            <SwapyLayout
              id="dashboard-container"
              enable={isEditing}
              config={{ swapMode: "hover" }}
            >
              <Grid gap="5" columns="12" className="w-full">
                {slottedWidgets.map(
                  ({ slotId, colSpan, className, widget }) => (
                    <SwapySlot
                      className={`${colSpan} h-fit rounded-xl bg-gray-4 dark:bg-gray-2`}
                      key={slotId}
                      id={slotId}
                      showHandle={isEditing}
                    >
                      {widget && (
                        <Box
                          className={`relative h-full w-full rounded-xl ${className}`}
                        >
                          <SwapyExclude id={widget.id}>
                            {renderWidget(widget)}
                          </SwapyExclude>
                        </Box>
                      )}
                    </SwapySlot>
                  )
                )}
              </Grid>
            </SwapyLayout>
          )}
        </Flex>
      </Box>
    </DashboardLayout>
  )
}

export default DashboardHomePage
