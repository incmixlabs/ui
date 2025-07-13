import { Box } from "@incmix/ui"
import { cn } from "@utils"
import { lazy, useEffect, useState } from "react"
import { useThemeStore } from "@incmix/store"
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts"

interface WeeklyActivityChartProps {
  /**
   * Array of values for each day
   * @default [30, 65, 45, 80, 55, 40, 65]
   */
  values?: number[]

  /**
   * Array of day labels
   * @default ["M", "T", "W", "T", "F", "S", "S"]
   */
  days?: string[]

  /**
   * Primary color for bars
   * @default dashboardColorValues.color2
   */
  primaryColor?: string

  /**
   * Highlight color for the specified day
   * @default dashboardColorValues.color3
   */
  highlightColor?: string

  /**
   * Index of the day to highlight (0-based)
   * @default 3
   */
  highlightDay?: number

  /**
   * Height of the chart
   * @default 250
   */
  height?: number

  /**
   * Width of the bars (as percentage)
   * @default "40%"
   */
  barWidth?: string

  /**
   * Border radius of the bars
   * @default 10
   */
  borderRadius?: number
  className?: string
}

const data = [
  { id: 'M', name: 'Mon', value: 45 },
  { id: 'T', name: 'Tue', value: 85 },
  { id: 'W', name: 'Wed', value: 65 },
  { id: 'T', name: 'Thu', value: 95 },
  { id: 'F', name: 'Fri', value: 75 },
  { id: 'S', name: 'Sat', value: 55 },
  { id: 'S', name: 'Sun', value: 80 }
];

const colors = ['var(--indigo-9)', 'var(--indigo-9)', 'var(--indigo-9)', 'var(--orange-9)', 'var(--indigo-9)', 'var(--indigo-9)', 'var(--indigo-9)'];
export function WeeklyActivityChart({
  values = [30, 65, 45, 80, 55, 40, 65],
  days = ["M", "T", "W", "T", "F", "S", "S"],
  highlightDay = 3,
  barWidth = "40%",
  highlightColor,
  primaryColor,
  borderRadius = 10,
  className,
}: WeeklyActivityChartProps) {
  const { getDashboardColors } = useThemeStore()
  const dashboardColorValues = getDashboardColors()
  highlightColor = highlightColor?? dashboardColorValues.color3
  primaryColor = primaryColor?? dashboardColorValues.color1


  return (
    <Box className={cn("w-full h-fit", className)}>
       <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
       
          <Tooltip
          cursor={{fill:"var(--gray-3)"}}
        content={({ active, payload }) => {
         if (active && payload && payload.length) {
          const { name, value } = payload[0].payload;
          return (
            <div style={{
              background: 'var(--gray-2)',
              border: '1px solid var(--gray-5)',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              <p><strong>{name}</strong></p>
              <p>Value: {value}</p>
            </div>
          );
        }
        return null;
      }}
    />
       <XAxis
            dataKey="id" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--gray-11)', fontSize: 12 }}
          />
          <Bar dataKey="value" radius={[5, 5, 5, 5]} barSize={24}>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
