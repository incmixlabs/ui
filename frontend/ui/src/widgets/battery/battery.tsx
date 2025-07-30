import { Box, Flex, Icon, Text } from "@incmix/ui"
import { cn } from "@utils/cn"

function LowBatteryWarning() {
  return (
    <Icon name="BatteryCharging"
      className="h-6 w-6 text-red-9"
      aria-label="Low Battery Warning"
    />
  )
}

function ChargingIndicator() {
  return (
    <Icon name="BatteryCharging"
      className="h-6 w-6 text-gray-12"
      aria-label="Charging Indicator"
    />
  )
}

function BatteryStriketrough() {
  return (
    <Box className="relative h-6 w-6">
      <Box
        className="absolute h-[250%] w-0.5 origin-center rotate-[20deg] bg-gray-12"
        style={{ top: "-75%", left: "50%" }}
      />
    </Box>
  )
}

export type BatteryInfo = {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

export interface BatteryProps {
  className?: string
  batteryInfo: BatteryInfo | null
}

export function Battery({ className, batteryInfo }: BatteryProps) {
  const getBatteryColor = () => {
    if (!batteryInfo) return "bg-gray-12"

    const level = batteryInfo.level * 100
    if (level <= 10) return "bg-red-9"
    if (level <= 20) return "bg-yellow-9"
    return "bg-green-9"
  }

  const getBatteryWidth = () => {
    if (!batteryInfo) return "0%"

    return `${Math.max(batteryInfo.level * 100, 5)}%`
  }

  return (
    <Box className={cn("w-full", className)}>
      <Flex className="relative w-full my-1 rounded border-2 border-gray-9 shadow">
        <Box className="absolute z-10 mt-2 -right-2 flex h-6 rounded-r border-gray-9 border-r-8" />
        <Flex
          align="center"
          justify="center"
          className={cn(
            "m-1 cursor-default py-4 text-center font-semibold text-12 text-base leading-none",
            getBatteryColor()
          )}
          style={{ width: getBatteryWidth() }}
        >
          <Box className="absolute left-0 mx-8">
            {!batteryInfo ? (
              <BatteryStriketrough />
            ) : batteryInfo.charging ? (
              <ChargingIndicator />
            ) : batteryInfo.level <= 0.1 ? (
              <LowBatteryWarning />
            ) : (
              <Text className="text-gray-12">
                {Math.round(batteryInfo.level * 100)}%
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
