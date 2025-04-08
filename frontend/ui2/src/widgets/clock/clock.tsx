"use client"

import { useEffect, useState } from "react"
import RClock from "react-clock"
import "react-clock/dist/Clock.css"
import { useThemeStore } from "@incmix/store"
export { Clock as Icon } from "lucide-react"
import { Flex, Text } from "@/components/radixui"
import { CardContainer } from "@/components/radixui/card"
import { Theme } from "@/components/radixui/theme"
import { getDate } from "@incmix/utils/date"
import type { TextProps } from "@radix-ui/themes"

import "./clock.css"

export type ClockSize = "1" | "2" | "3"
export type Clock = {
  city: string
  timeZone: string
}
export type ClockProps = {
  clocks?: Clock[]
  size?: ClockSize
  flip?: boolean
}
export type ClockOutput = Clock & {
  time: Date
  date: string
}
function tzDate(clock: Clock[]): ClockOutput[] {
  return clock.map((c) => {
    const dt = getDate(c.timeZone)
    return {
      ...c,
      time: new Date(`${dt.date} ${dt.time}`),
      date: dt.date,
    }
  })
}

const clockSizeMap: Record<ClockSize, number> = {
  "1": 100,
  "2": 150,
  "3": 200,
}

const textSizeMap: Record<ClockSize, TextProps["size"]> = {
  "1": "2",
  "2": "4",
  "3": "6",
}

export function ClockWidget({ clocks, size = "2", flip = false }: ClockProps) {
  const { theme } = useThemeStore()
  clocks = clocks || [{ city: "New York", timeZone: "America/New_York" }]
  const date = tzDate(clocks)
  const [values, setValues] = useState(date)

  function invertTheme() {
    return theme === "dark" ? "light" : "dark"
  }

  useEffect(() => {
    const interval = setInterval(() => setValues(tzDate(clocks)), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [clocks])

  return (
    <Flex direction="row" gap="4">
      {values.map((value: ClockOutput) => (
        <Theme
          appearance={flip ? invertTheme() : theme}
          key={value.city}
          className="bg-transparent"
        >
          <CardContainer key={value.city}>
            <RClock
              key={value.city}
              value={value.time}
              size={clockSizeMap[size]}
            />
            <Flex align="center" justify="center" mt="2">
              <Text as="span" size={textSizeMap[size]}>
                {value.city}
              </Text>
            </Flex>
          </CardContainer>
        </Theme>
      ))}
    </Flex>
  )
}
