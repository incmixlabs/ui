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
    <CardContainer>
      <Box className="pb-2">
        <Flex align={"center"} justify={"between"}>
          <Heading size="6" className="font-medium">Monthly Budget</Heading>
          <Button variant="ghost" size="2">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </Flex>
      </Box>
        <Box className="h-40 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                fill="url(#budgetGradient)"
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#22c55e" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Text size="2" className="text-gray-11">
          Last month you had $2.42 expense transactions, 12 savings entries and 4 bills.
        </Text>
    </CardContainer>
  )
}
