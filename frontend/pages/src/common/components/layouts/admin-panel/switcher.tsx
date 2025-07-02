import { ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { useOrganizationStore } from "@incmix/store"
import { Box, DropdownMenu, Text } from "@incmix/ui"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@incmix/ui/sidebar"
import { Item } from "@radix-ui/themes/components/dropdown-menu"
import { useTranslation } from "react-i18next"
export type SwitcherItem = {
  id: string
  name: string
  [key: string]: any
}
export type SwitcherProps = {
  items: SwitcherItem[]
  switchedItem: SwitcherItem | null
  setSwitchedItem: (id: string | null) => void
  title: string
}
export function Switcher({
  switchedItem,
  items,
  setSwitchedItem,
  title,
}: SwitcherProps) {
  const { isMobile } = useSidebar()
  const { t } = useTranslation(["common", "sidebar"])
  const [selectedItem, setSelectedItem] = React.useState<SwitcherItem | null>(
    switchedItem
  )
  React.useEffect(() => {
    if (!switchedItem || !items?.length) {
      setSelectedItem(items?.[0] || null)
    } else {
      const found = items?.find((o) => o.id === switchedItem.id)
      if (found) {
        setSelectedItem(found)
      } else {
        setSelectedItem(items?.[0] || null)
      }
    }
  }, [switchedItem, items])

  if (!selectedItem) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Box className="grid flex-1 text-left text-sm leading-tight">
                <Text size="2" as="span" className="truncate font-semibold">
                  {selectedItem.name}
                </Text>
              </Box>
              <ChevronsUpDown className="ml-auto scale-icon" />
            </SidebarMenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenu.Label className="font-bold text-lg capitalize">
              {t(title)}
            </DropdownMenu.Label>
            {items.map((item) => (
              <DropdownMenu.Item
                key={item.id}
                onClick={() => setSwitchedItem(item.id)}
                className="ml-6 gap-2 p-2"
              >
                <Text size="2" as="span">
                  {item.name}
                </Text>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
