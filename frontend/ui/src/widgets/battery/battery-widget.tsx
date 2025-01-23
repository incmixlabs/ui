"use client";
import { Box } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import { Battery, type BatteryInfo } from "./battery"

type BatteryManagerInfo = BatteryInfo & EventTarget

// The battery API is not part of the standard, and as such, it's not available
// in the Navigator object. Therefore, we need to cast the result of
// navigator.getBattery() to a custom BatteryInfo type.
// See [https://stackoverflow.com/questions/71890251/navigator-getbattery-cannot-be-found].
export async function getBattery(): Promise<BatteryManagerInfo | null> {
  if ("getBattery" in navigator && typeof navigator.getBattery === "function") {
    return (await navigator.getBattery()) as BatteryManagerInfo
  }

  return null
}

export interface BatteryWidgetProps {
  className?: string
}

export function BatteryWidget({ className }: BatteryWidgetProps) {
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo | null>(null)

  useEffect(() => {
    const setupBatteryListeners = async () => {
      try {
        const battery = await getBattery()

        setBatteryInfo(battery)

        battery?.addEventListener("levelchange", () => setBatteryInfo(battery))
        battery?.addEventListener("chargingchange", () =>
          setBatteryInfo(battery)
        )
        battery?.addEventListener("chargingtimechange", () =>
          setBatteryInfo(battery)
        )
        battery?.addEventListener("dischargingtimechange", () =>
          setBatteryInfo(battery)
        )
      } catch (error) {
        console.error("Battery API not supported", error)
      }
    }

    setupBatteryListeners()
  }, [])

  return (
    <Box>
      <Battery className={className} batteryInfo={batteryInfo} />
    </Box>
  )
}
