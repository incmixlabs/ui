import { LoadingPage } from "@common"
import { Flex, Heading, Project1, Switch, Text } from "@incmix/ui"
import { getBattery } from "@incmix/ui/widgets"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { createSwapy } from "swapy"
import { useAuth } from "../../auth"

type Widget = {
  id: string
  type: "weather" | "clock" | "news" | "battery" | "image-grid" | "calendar"
}

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

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const swapyRef = useRef<ReturnType<typeof createSwapy> | null>(null)

  const [_isEditing, setIsEditing] = useState(false)
  const [_widgets, setWidgets] = useState<Widget[]>([])
  const [slotItemsMap, setSlotItemsMap] = useState<typeof INITIAL_SLOT_ITEMS>(
    []
  )

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
        <Project1 />
      </Flex>
    </DashboardLayout>
  )
}

export default DashboardProject1
