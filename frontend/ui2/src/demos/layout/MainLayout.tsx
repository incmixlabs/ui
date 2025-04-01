import { useNavigate } from "@tanstack/react-router"
import React, { useEffect } from "react"
import { Sidebar } from "./sidebar"

interface MainLayoutProps {
  children: React.ReactNode
  activeComponent?: string
  onComponentChange?: (id: string) => void
}
const shadcnComponents = [
  { id: "accordion", label: "Accordion" },

  { id: "radix-avatar", label: "Avatar" },
  { id: "badge", label: "Badge" },
  { id: "button", label: "Button" },
  { id: "radix-button", label: "Button" },
  { id: "calendar", label: "Calendar" },
  { id: "card", label: "Card" },
  { id: "command", label: "Command" },
  { id: "dialog", label: "Dialog" },
  { id: "dropdown", label: "Dropdown" },
  { id: "form", label: "Form" },
  { id: "pagination", label: "Pagination" },
  { id: "radio", label: "Radio" },
  { id: "separator", label: "Separator" },

]

const radixComponents = [
  { id: "radix-button", label: "Button" },
  { id: "radix-avatar", label: "Avatar" },
]
export function MainLayout({
  children,
  activeComponent,
  onComponentChange,
}: MainLayoutProps) {
  const navigate = useNavigate()
  const [_isCollapsed, _setIsCollapsed] = React.useState(false)
  const [activeComponentItems, setActiveComponentItems] =
    React.useState(shadcnComponents)

  // Determine which component list to show based on active component

  const handleItemClick = (id: string) => {
    if (id === "shadcn") {
      setActiveComponentItems(shadcnComponents)
      navigate({ to: "/shadcn" })
    } else if (id === "radixui") {
      setActiveComponentItems(radixComponents)
      navigate({ to: "/radixui" })
    } else {
      onComponentChange?.(id)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        items={activeComponentItems}
        activeItem={activeComponent}
        onItemClick={handleItemClick}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
