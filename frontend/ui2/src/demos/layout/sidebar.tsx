import { Button } from "@/components/radixui/button"
import { Separator } from "@/components/radixui/separator"
import { Accordion } from "@/components/shadcn/accordion"
import { cn } from "@/lib/utils"
import {
  PanelLeft,
  PanelLeftClose,
} from "lucide-react"
import React, { useState } from "react"

interface SidebarItem {
  id: string
  label: string
  children?: SidebarItem[]
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarItem[]
  activeItem?: string
  onItemClick?: (id: string) => void
  defaultCollapsed?: boolean
}

function SidebarGroup({
  item,
  activeItem,
  onItemClick,
  level = 0,
}: {
  item: SidebarItem
  activeItem?: string
  onItemClick?: (id: string) => void
  level?: number
}) {
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <Accordion.Item value={item.id} className="border-none">
        <Accordion.Trigger
          className={cn(
            "py-2",
            activeItem === item.id ? "bg-accent" : "",
            level === 1
              ? "pl-8"
              : level === 2
                ? "pl-12"
                : level === 3
                  ? "pl-16"
                  : ""
          )}
        >
          {item.label}
        </Accordion.Trigger>
        <Accordion.Content className="pt-0 pb-0">
          <div className="ml-2">
            {item.children?.map((child) => (
              <SidebarGroup
                key={child.id}
                item={child}
                activeItem={activeItem}
                onItemClick={onItemClick}
                level={level + 1}
              />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    )
  }

  return (
    <div className="space-y-1 pl-4">
      <Button
        variant={activeItem === item.id ? "solid" : "ghost"}
        className={cn("w-full justify-start")}
        onClick={() => onItemClick?.(item.id)}
      >
        <span>{item.label}</span>
      </Button>
    </div>
  )
}

export function Sidebar({
  className,
  items = [],
  activeItem,
  onItemClick,
  defaultCollapsed = false,
  ...props
}: SidebarProps) {
  console.log(items)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between px-3 py-4">
        {!collapsed && (
          <h2 className="px-4 font-semibold text-lg tracking-tight">
            Components
          </h2>
        )}
        <Button
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!collapsed && (
        <>
          <div className="py-2">
            <div className="space-y-1">
              <div className="space-y-3">
                <div
                  className="mb-1 ml-4 cursor-pointer font-medium text-sm hover:text-primary"
                  onClick={() => {
                    // Toggle all top-level groups to collapse
                    const event = new CustomEvent("collapse-all-groups")
                    document.dispatchEvent(event)
                  }}
                >
                  Component Libraries
                </div>
                <div className="space-y-1">
                  <Button
                    variant={activeItem === "shadcn" ? "solid" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onItemClick?.("shadcn")}
                  >
                    <span>Shadcn</span>
                  </Button>
                  <Button
                    variant={activeItem === "radixui" ? "solid" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onItemClick?.("radixui")}
                  >
                    <span>RadixUI</span>
                  </Button>
                </div>
              </div>
              <Accordion.Root
                type="multiple"
                defaultValue={items
                  .filter((item) => item.children?.length)
                  .map((item) => item.id)}
                className="mt-4 space-y-1"
              >
                {items.map((item) => (
                  <SidebarGroup
                    key={item.id}
                    item={item}
                    activeItem={activeItem}
                    onItemClick={onItemClick}
                  />
                ))}
              </Accordion.Root>
            </div>
          </div>
          <Separator />
          <div className="flex-1" />
          <div className="p-4">
            <p className="text-muted-foreground text-xs">
              UI component showcase
            </p>
          </div>
        </>
      )}

      {collapsed && (
        <div className="flex flex-col items-center space-y-4 py-4">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "solid" : "ghost"}
              title={item.label}
              onClick={() => onItemClick?.(item.id)}
              className="h-10 w-10"
            >
              {item.label.charAt(0)}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
