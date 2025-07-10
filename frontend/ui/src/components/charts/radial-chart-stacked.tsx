
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./shadcn-chart"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"


const chartData = [{ month: "january", desktop: 1260, mobile: 570 }]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--blue-9)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--orange-9)",
  },
} satisfies ChartConfig


export function RadialBarChartStacked() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 items-center pb-0 h-72">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] h-72"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

