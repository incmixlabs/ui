import type { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic"
import type { FC } from "react"

// Import ApexCharts dynamically to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})

interface RadialBarChartProps {
  value: number
  total?: number
  label?: string
  title?: string
  colors?: string[]
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeConfig = {
  sm: {
    height: 200,
    fontSize: {
      title: "14px",
      value: "24px",
    },
  },
  md: {
    height: 250,
    fontSize: {
      title: "16px",
      value: "30px",
    },
  },
  lg: {
    height: 300,
    fontSize: {
      title: "18px",
      value: "36px",
    },
  },
}

export const RadialBarChart: FC<RadialBarChartProps> = ({
  value,
  total = 100,
  label = "%",
  title = "Progress",
  colors = ["#00E396", "#ABE5A1"],
  size = "md",
  className = "",
}) => {
  const percentage = Math.round((value / total) * 100)
  const config = sizeConfig[size]

  const chartOptions: ApexOptions = {
    chart: {
      height: config.height,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: false,
          },
        },
        dataLabels: {
          name: {
            show: true,
            color: "#888",
            fontSize: config.fontSize.title,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: config.fontSize.value,
            color: "#111",
            offsetY: 0,
            formatter: (val: number) => `${val}${label}`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [colors[1]],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: colors[0],
          },
          {
            offset: 100,
            color: colors[1],
          },
        ],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [title],
  }

  const series = [percentage]

  return (
    <div className={className}>
      {/* @ts-ignore */}
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="radialBar"
        height={config.height}
      />
    </div>
  )
}

export default RadialBarChart
