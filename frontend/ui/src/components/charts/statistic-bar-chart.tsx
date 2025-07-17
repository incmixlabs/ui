import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CardContainer } from "../radixui";
import { Flex } from "@incmix/ui";

interface StatisticsBarChartViewProps {
  statisticData?: { name: string; newTasks: number; inProgress: number }[];
  newTaskColor?: string;
  inProgressColor?: string;
}

export const StatisticsBarChartView: React.FC<StatisticsBarChartViewProps> = ({
  statisticData = [
    { name: "Mon", newTasks: 90, inProgress: 0 },
    { name: "Tue", newTasks: 170, inProgress: 50 },
    { name: "Wed", newTasks: 260, inProgress: 60 },
    { name: "Thu", newTasks: 0, inProgress: 110 },
    { name: "Fri", newTasks: 170, inProgress: 30 },
    { name: "Sat", newTasks: 150, inProgress: 0 },
    { name: "Sun", newTasks: 110, inProgress: 100 },
  ],
  newTaskColor = "var(--dashboard-color-2)",
  inProgressColor = "var(--dashboard-color-3)",
}) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={"100%"} className={"@md:h-80 pb-6"}>
        <BarChart
          data={statisticData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--gray-11)", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "var(--gray-6)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, newTasks, inProgress } = payload[0].payload;
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
                    <p>New Tasks: {newTasks}</p>
                    <p>In Progress: {inProgress}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--gray-11)", fontSize: 12 }}
          />
          <Bar
            dataKey="newTasks"
            stackId="a"
            fill={newTaskColor}
            radius={[0, 0, 10, 10]}
          />
          <Bar
            dataKey="inProgress"
            stackId="a"
            fill={inProgressColor}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
