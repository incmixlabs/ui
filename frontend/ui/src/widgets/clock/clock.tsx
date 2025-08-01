import { useEffect, useState } from "react"
import RClock from "react-clock"
export { Clock as ClockIcon } from "lucide-react"
import { CardContainer } from "@components/card/card-container"
import { Flex, Text, Box } from "@incmix/ui"
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
  clocks = clocks || [{ city: "New York", timeZone: "America/New_York" }]
  const date = tzDate(clocks)
  const [values, setValues] = useState(date)

  useEffect(() => {
    const interval = setInterval(() => setValues(tzDate(clocks)), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [clocks])

  return (
    <Box>
      {values.map((value: ClockOutput) => (
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
      ))}
    </Box>
  )
}
