import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { Box, CardContainer, Flex, Heading } from "@incmix/ui"
import { TrendingUp } from "lucide-react"

const data = [
  { value: 45 },
  { value: 75 },
  { value: 65 },
  { value: 35 },
  { value: 15 },
  { value: 55 },
  { value: 25 },
  { value: 85 },
  { value: 70 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 75 },
]

const calculateTrend = (data: {value: number}[]): string => {
  if (data.length < 6) return "0.0";
  const recent = data.slice(-3).reduce((sum, item) => sum + item.value, 0);
  const previous = data.slice(-6, -3).reduce((sum, item) => sum + item.value, 0);
  return previous > 0 ? ((recent - previous) / previous * 100).toFixed(1) : "0.0";
};

export function LiveVisitors() {
  const trend = calculateTrend(data);
  return (
    <CardContainer>
      <Box className="pb-2">
        <Flex align={"center"} justify={"between"}>
          <Heading size="6" className="font-medium">Live Visitors</Heading>
          <Flex align={"center"} gap={"1"} className="text-green-9" aria-label="Visitor trend">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{trend}%
          </Flex>
        </Flex>
      </Box>
        <Box className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%" aria-label="Live visitors chart">
              <Bar dataKey="value" fill="var(--dashboard-color-1)" radius={[2, 2, 0, 0]} maxBarSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
    </CardContainer>
  )
}
