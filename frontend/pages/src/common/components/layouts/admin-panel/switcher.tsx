import { ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { useOrganizationStore } from "@incmix/store"
import { DropdownMenu } from "@incmix/ui"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@incmix/ui/sidebar"
import { useTranslation } from "react-i18next"
import { Item } from "@radix-ui/themes/components/dropdown-menu"
export type SwitcherItem = {
  id: string,
  name: string,
  [key:string]: any
}
export type SwitcherProps = {
  items: SwitcherItem[],
  switchedItem: SwitcherItem | null,
  setSwitchedItem: (id:string | null) => void,
  title: string
}
export function Switcher({switchedItem, items,  setSwitchedItem, title} : SwitcherProps) {
  const { isMobile } = useSidebar()
  const { t } = useTranslation(["common", "sidebar"])
  const [selectedItem, setSelectedItem ] = React.useState<SwitcherItem| null>(switchedItem)
  React.useEffect(() => {
    if (!switchedItem) {
      setSelectedItem(items?.[0] || null)
    }
    else {
      const found = items?.find((o) => o.id === selectedItem?.id)
      if (!found)  setSelectedItem(items?.[0])
    }
  }, [selectedItem, items, setSelectedItem])

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
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {selectedItem.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
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
                {item.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
