import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { Box, Button,CardContainer, Flex, Heading, Text } from "@incmix/ui"
import { MoreHorizontal } from "lucide-react"

const data = [
  { value: 20 },
  { value: 45 },
  { value: 35 },
  { value: 55 },
  { value: 45 },
  { value: 65 },
  { value: 55 },
  { value: 75 },
  { value: 65 },
  { value: 85 },
  { value: 95 },
  { value: 100 },
]

export function MonthlyBudget() {
  return (
    <CardContainer className="h-full flex flex-col justify-center @container">
      <Box className="pb-2">
        <Flex align={"center"} justify={"between"}>
          <Heading size="6" className="font-medium">Monthly Budget</Heading>
          <Button variant="ghost" size="2">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </Flex>
      </Box>
        <Box className="h-40 mb-2" aria-label="Monthly budget chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} aria-label="Monthly budget chart">
              <defs>
                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--dashboard-color-2)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--dashboard-color-2)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--dashboard-color-2)"
                strokeWidth={3}
                fill="url(#budgetGradient)"
                dot={{ fill: "var(--dashboard-color-2)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "var(--dashboard-color-2)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Text className="text-gray-11 @md:text-base text-xs" aria-label="Monthly budget description">
          Last month you had 12 expense transactions, 8 savings entries and 4 bills.
        </Text>
    </CardContainer>
  )
}
