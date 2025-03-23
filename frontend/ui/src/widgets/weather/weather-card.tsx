import { Box, Flex, Text } from "@incmix/ui"
import { getWeekDay } from "@incmix/utils/date"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import type React from "react"
import {
  Clouds,
  CloudsSun,
  Drizzle,
  Fog,
  FreezingRain,
  HeavyRain,
  type IconProps,
  Rain,
  Snow,
  Sun,
  Thunderstorm,
} from "./icons"
import "./weather.css"

export type WeatherCardProps = {
  location?: string
  temperatureUnit?: "C" | "F"
  days: {
    time: string
    temperatureAvg: number
    temperatureMax: number
    temperatureMin: number
    weatherCode: number
  }[]
}

export const WeatherCodes: Record<
  number,
  { name: string; Icon: (props: IconProps) => React.ReactNode }
> = {
  0: { name: "Unknown", Icon: Sun },
  1000: { name: "Clear", Icon: Sun },
  1100: { name: "Mostly Clear", Icon: Sun },
  1101: { name: "Partly Cloudy", Icon: CloudsSun },
  1102: { name: "Mostly Cloudy", Icon: Clouds },
  1001: { name: "Cloudy", Icon: Clouds },
  2000: { name: "Fog", Icon: Fog },
  2100: { name: "Light Fog", Icon: Fog },
  4000: { name: "Drizzle", Icon: Drizzle },
  4001: { name: "Rain", Icon: Rain },
  4200: { name: "Light Rain", Icon: Rain },
  4201: { name: "Heavy Rain", Icon: HeavyRain },
  5000: { name: "Snow", Icon: Snow },
  5001: { name: "Flurries", Icon: Snow },
  5100: { name: "Light Snow", Icon: Snow },
  5101: { name: "Heavy Snow", Icon: Snow },
  6000: { name: "Freezing Drizzle", Icon: FreezingRain },
  6001: { name: "Freezing Rain", Icon: FreezingRain },
  6200: { name: "Light Freezing Rain", Icon: FreezingRain },
  6201: { name: "Heavy Freezing Rain", Icon: FreezingRain },
  7000: { name: "Ice Pellets", Icon: FreezingRain },
  7101: { name: "Heavy Ice Pellets", Icon: FreezingRain },
  7102: { name: "Light Ice Pellets", Icon: FreezingRain },
  8000: { name: "Thunderstorm", Icon: Thunderstorm },
}

export function WeatherCard({ days, location }: WeatherCardProps) {
  const [today, ...rest] = days

  const TodayIcon = WeatherCodes[today.weatherCode].Icon
  return (
    <Flex gap="1" direction="column" className="weather-container space-y-3">
      <Flex align="start" justify="between">
        <Box>
          <Flex gap="2" align="center">
            <Text size="2" weight="medium" className="capitalize">
              {location ?? "Unknown"}
            </Text>
            <Text>
              <PaperPlaneIcon className="location-icon" width="12" />
            </Text>
          </Flex>
          <Text size="8">{formatTemp(today.temperatureAvg)}</Text>
        </Box>
        <Flex direction="column" align="end" gap="1">
          <TodayIcon size="12" />
          <Flex direction="column">
            <Text weight="medium" size="1">
              H:{formatTemp(today.temperatureMax)}
            </Text>
            <Text weight="medium" size="1">
              L:{formatTemp(today.temperatureMin)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column">
        {rest.map((d) => {
          const Icon = WeatherCodes[d.weatherCode].Icon
          return (
            <Flex key={d.time} justify="between" align="center">
              <Flex align="center" gap="1">
                <Box minWidth="1.6rem">
                  <Text weight="medium" size="1">
                    {getWeekDay(d.time)}
                  </Text>
                </Box>
                <Icon size="16" />
              </Flex>
              <Flex gap="1">
                <Text size="1" weight="medium" className="transparent">
                  {formatTemp(d.temperatureMin, true)}
                </Text>
                <Text size="1" weight="medium">
                  {formatTemp(d.temperatureMax)}
                </Text>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

function formatTemp(temperature: number, ignoreDegree = false): string {
  return `${temperature.toFixed(0)}${!ignoreDegree ? "°" : ""}`
}
