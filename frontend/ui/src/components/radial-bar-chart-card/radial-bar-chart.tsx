import type React from "react"
import { useState } from "react"
import Chart from "react-apexcharts"

interface RadialBarChartProps {
  series?: number[]
  labels?: string[]
  colors?: string[]
}

const RadialBarChart: React.FC<RadialBarChartProps> = ({
  series = [44, 55, 13, 33],
  labels = ["Apple", "Mango", "Banana", "Orange"],
  colors = ["#f4a77d", "#4361ee", "#ffd166", "#6c757d"],
}) => {
  const [_series, _setSeries] = useState<number[]>(series)

  const _options: ApexCharts.ApexOptions = {
    chart: {
      width: 100,
      type: "donut",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 10,
      colors: ["#fff"], // ✅ White stroke around segments
    },
    fill: {
      colors: colors,
      opacity: 1,
      type: "solid",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#4361ee",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontFamily: "Poppins",
              color: "#4361ee",
              formatter: (val) => `${val}%`,
            },
          },
        },
      },
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 20,
          },
        },
      },
    ],
  }

  return (
    <div className="flex flex-col items-center">
      <div className="absolute inset-0 rounded-full" />

      <div className="custom-chart-container">
        <Chart options={_options} series={_series} type="donut" />
      </div>

      <style>
        {`
    .custom-chart-container .apexcharts-datalabels text {
      font-size: 16px !important;
      font-weight: bold;
      fill: #fff !important;
    }

    .custom-chart-container .apexcharts-tooltip {
      background: #000 !important;
      color: white !important;
      border-radius: 8px !important;
    }
  `}
      </style>
    </div>
  )
}

export default RadialBarChart
