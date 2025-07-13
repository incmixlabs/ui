import { Box } from "@incmix/ui"
import { cn } from "@utils"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

interface SparkChartProps {
  title: string
  data: {value:number}[]
  color: string
  className?: string
}

export function SparkChart({ title, data, color, className }: SparkChartProps) {

  return (
    <>
      <Box className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={"100%"}>
         <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Bar 
               dataKey="value" 
              fill={color} 
              radius={[2, 2, 2, 2]}
              width={8}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  )
}
