import { Box } from "@incmix/ui";
import { cn } from "@utils";
import { useThemeStore } from "@incmix/store";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface WeeklyActivityChartProps {
  /**
   * Array of day labels
   */
  statisticdata?: { id: string; name: string; value: number }[];

  /**
   * Primary color for bars
   */
  primaryColor?: string;

  /**
   * Highlight color for the specified day
   */
  highlightColor?: string;

  /**
   * Border radius of the bars
   */
  borderRadius?: number;
  className?: string;
  colors?: string[];
}

// const data = [
//   { id: 'M', name: 'Mon', value: 45 },
//   { id: 'T', name: 'Tue', value: 85 },
//   { id: 'W', name: 'Wed', value: 65 },
//   { id: 'T', name: 'Thu', value: 95 },
//   { id: 'F', name: 'Fri', value: 75 },
//   { id: 'S', name: 'Sat', value: 55 },
//   { id: 'S', name: 'Sun', value: 80 }
// ];



export function WeeklyActivityChart({
  statisticdata = [
    { id: "M", name: "Mon", value: 45 },
    { id: "T", name: "Tue", value: 85 },
    { id: "W", name: "Wed", value: 65 },
    { id: "T", name: "Thu", value: 95 },
    { id: "F", name: "Fri", value: 75 },
    { id: "S", name: "Sat", value: 55 },
    { id: "S", name: "Sun", value: 80 },
  ],
  colors = [
    "var(--dashboard-color-1)",
    "var(--dashboard-color-1)",
    "var(--dashboard-color-1)",
    "var(--dashboard-color-2)",
    "var(--dashboard-color-1)",
    "var(--dashboard-color-1)",
    "var(--dashboard-color-1)",
  ],
  className,
}: WeeklyActivityChartProps) {

  return (
    <Box className={cn("w-full @sm:h-72 h-60", className)}>
      <ResponsiveContainer width="100%" height={"100%"} className={"h-full w-full"}>
        <BarChart
          data={statisticdata}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <Tooltip
            cursor={{ fill: "var(--gray-3)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, value } = payload[0].payload;
                return (
                  <div
                    style={{
                      background: "var(--gray-2)",
                      border: "1px solid var(--gray-5)",
                      padding: "10px",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <p>
                      <strong>{name}</strong>
                    </p>
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
            tick={{ fill: "var(--gray-11)", fontSize: 12 }}
          />
          <Bar dataKey="value" radius={[5, 5, 5, 5]} barSize={24}>
            {statisticdata.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
