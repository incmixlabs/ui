import { LoadingPage } from "@common"

import {
  CardContainer,
  Overview,
  SwapyExclude,
  SwapyLayout,
  SwapySlot,
} from "@incmix/ui"
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
import { Flex, Heading, Switch, Text } from "@radix-ui/themes"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { createSwapy } from "swapy"
import { useAuth } from "../auth"

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
  { id: "news", type: "news" },
  { id: "battery", type: "battery" },
  { id: "image-grid", type: "image-grid" },
  { id: "calendar", type: "calendar" },
]

const INITIAL_SLOT_ITEMS = [
  { slotId: "slot1", itemId: "weather" },
  { slotId: "slot2", itemId: "clock" },
  { slotId: "slot3", itemId: "battery" },
  { slotId: "slot4", itemId: "news" },
  { slotId: "slot5", itemId: "image-grid" },
  { slotId: "slot6", itemId: "calendar" },
]

const EditWidgetsControl: React.FC<{
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
    case "news":
      return <NewsWidget country="us" />
    case "battery":
      return <BatteryWidget />
    case "image-grid":
      return <ImageGrid />
    case "calendar":
      return <CalendarWidget storageKey={"calendar_events_dashboard"} />
    default:
      return null
  }
}

const DashboardPage: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const swapyRef = useRef<ReturnType<typeof createSwapy> | null>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [slotItemsMap, setSlotItemsMap] = useState<typeof INITIAL_SLOT_ITEMS>(
    []
  )

  const slottedWidgets = useMemo(() => {
    return slotItemsMap.map(({ slotId, itemId }) => ({
      slotId,
      itemId,
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

  useEffect(() => {
    const container = document.querySelector("#dashboard-container")
    if (!container) return

    swapyRef.current = createSwapy(container, {
      manualSwap: true,
      swapMode: "drop",
    })

    swapyRef.current.onSwap(({ data }) => {
      setSlotItemsMap(
        data.array.filter(
          (item): item is { slotId: string; itemId: string } =>
            item.itemId !== null
        )
      )
    })

    return () => {
      swapyRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    swapyRef.current?.setData({ array: slotItemsMap })
  }, [slotItemsMap])

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  return (
    <DashboardLayout
      breadcrumbItems={[]}
      navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
    >
      <Flex direction="column" gap="6">
        <Heading size="6">{t("dashboard:title")}</Heading>
        <Overview />

        {/* <RadialBarChartCard /> */}
        <Flex direction="column" gap="6">
          {slottedWidgets.length && (
            <SwapyLayout
              id="dashboard-container"
              enable={isEditing}
              config={{ swapMode: "drop" }}
            >
              <Flex direction="row" gap="4" wrap="wrap">
                {slottedWidgets.map(({ slotId, widget }) => (
                  <SwapySlot key={slotId} id={slotId} showHandle={isEditing}>
                    {widget && (
                      <CardContainer>
                        <SwapyExclude id={widget.id}>
                          {renderWidget(widget)}
                        </SwapyExclude>
                      </CardContainer>
                    )}
                  </SwapySlot>
                ))}
              </Flex>
            </SwapyLayout>
          )}
        </Flex>
      </Flex>
    </DashboardLayout>
  )
}

export default DashboardPage
