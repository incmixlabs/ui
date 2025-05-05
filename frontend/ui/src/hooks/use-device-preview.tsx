
import { useState } from "react"
import { Laptop, Monitor, Tablet } from "lucide-react"
import type { btnItem } from "@incmix/ui"

export function useDevicePreview() {
  const [activeDevice, setActiveDevice] = useState("desktop")

  // Device tabs using lucide icons
  const deviceTabs: btnItem[] = [
    {
      id: "desktop",
      label: "Desktop",
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      id: "laptop",
      label: "Laptop",
      icon: <Laptop className="h-4 w-4" />,
    },
    {
      id: "tablet",
      label: "Tablet",
      icon: <Tablet className="h-4 w-4" />,
    },
  ]

  const getViewportWidth = () => {
    switch (activeDevice) {
      case "desktop":
        return "100%"
      case "laptop":
        return "1005px"
      case "tablet":
        return "776px"
      default:
        return "100%"
    }
  }

  return {
    activeDevice,
    setActiveDevice,
    deviceTabs,
    getViewportWidth,
  }
}
